# -*- coding: utf-8 -*-
"""
Adaptador do Andante para o navegador (Pyodide + xterm.js).

Roda o andante.py original sem alterações: só troca as peças que dependem
de um terminal de verdade (stdout, input, ler_tecla/termios, clear, sleep) por versões
que conversam com o xterm.js através do módulo JS `webterm` (ver worker.js).
Os saves continuam sendo os mesmos .txt — cada gravação é copiada para o
localStorage do navegador.
"""
import builtins, os, sys, time, shutil, traceback
import webterm

PASTA = "/andante"
_sobra = ""  # teclas que chegaram junto com o ENTER e ainda não foram lidas


class Saida:
    encoding = "utf-8"
    errors = "replace"

    def write(self, s):
        webterm.write(s)
        return len(s)

    def flush(self):
        webterm.flush()

    def isatty(self):
        return True

    def reconfigure(self, **_):
        pass


sys.stdout = sys.stderr = Saida()


def _sleep(segundos):
    webterm.flush()
    if segundos > 0:
        webterm.sleep(segundos * 1000)


time.sleep = _sleep


def _tamanho(fallback=(80, 24)):
    return os.terminal_size((webterm.cols() or fallback[0], webterm.rows() or fallback[1]))


shutil.get_terminal_size = _tamanho


def _teclas():
    """Tudo o que foi digitado desde a última leitura, sem esperar."""
    global _sobra
    t, _sobra = _sobra + webterm.read_keys(), ""
    return t


def _pular_escape(t, i):
    """Pula uma sequência de escape (setas, F1...) começando em t[i] == ESC."""
    i += 1
    if i < len(t) and t[i] in "[O":
        i += 1
        while i < len(t) and not ("@" <= t[i] <= "~"):
            i += 1
    return i + 1


def _input(prompt=""):
    """input() com edição de linha: eco, Backspace, Enter, Ctrl+C."""
    global _sobra
    sys.stdout.write(str(prompt))
    webterm.flush()
    linha = []
    while True:
        t = _teclas()
        if not t:
            webterm.wait_key(1000)
            continue
        i = 0
        while i < len(t):
            ch = t[i]
            if ch in "\r\n":
                _sobra = t[i + 1:].lstrip("\n")
                webterm.write("\r\n")
                webterm.flush()
                return "".join(linha)
            if ch in "\x7f\b":
                if linha:
                    linha.pop()
                    webterm.write("\b \b")
            elif ch == "\x03":
                webterm.write("^C\r\n")
                webterm.flush()
                raise KeyboardInterrupt
            elif ch == "\x1b":
                i = _pular_escape(t, i)
                continue
            elif ch >= " ":
                linha.append(ch)
                webterm.write(ch)
            i += 1
        webterm.flush()


builtins.input = _input


def _ler_tecla(prompt=" Escolha: "):
    """Uma tecla, sem ENTER — substitui o ler_tecla() do jogo (que usa termios).
    Devolve em MAIÚSCULA: "" = ENTER, "0" = ESC, setas = W/A/S/D."""
    global _sobra
    sys.stdout.write(str(prompt))
    webterm.flush()
    while True:
        t = _teclas()
        if not t:
            webterm.wait_key(1000)
            continue
        ch, resto = t[0], t[1:]
        if ch == "\x03":
            webterm.write("^C\r\n")
            raise KeyboardInterrupt
        if ch == "\x1b":
            fim = _pular_escape(t, 0)
            seq, resto = t[:fim], t[fim:]
            ch = _SETAS.get(seq, "0" if seq == "\x1b" else None)
        elif ch in "\r\n":
            ch, resto = "", resto.lstrip("\n")
        elif ch in "\x7f\b" or ch < " ":
            ch = None
        _sobra = resto
        if ch is None:   # tecla sem significado (F1, Backspace...): espera outra
            continue
        webterm.write((ch if ch.strip() else "") + "\r\n")
        webterm.flush()
        return ch.upper()


_SETAS = {"\x1b[A": "W", "\x1b[B": "S", "\x1b[C": "D", "\x1b[D": "A",
          "\x1bOA": "W", "\x1bOB": "S", "\x1bOC": "D", "\x1bOD": "A"}


class LeitorWeb:
    """Substitui o LeitorTecla (termios/msvcrt) do jogo."""

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        pass

    def ler(self):
        t = _teclas()
        if "\x03" in t:
            raise KeyboardInterrupt
        return t


def _limpar():
    webterm.write("\x1b[H\x1b[2J\x1b[3J")


def iniciar(argv):
    sys.argv = ["andante.py"] + list(argv)
    sys.path.insert(0, PASTA)
    import andante

    andante.LeitorTecla = LeitorWeb
    andante.limpar = _limpar
    if hasattr(andante, "ler_tecla"):   # menus de uma tecla (versão do jogo com ler_tecla)
        andante.ler_tecla = _ler_tecla
    gravar_original = andante.gravar_save

    def gravar_save(jogador, caminho, titulo):
        gravar_original(jogador, caminho, titulo)
        with open(caminho, encoding="utf-8") as f:
            webterm.persist(os.path.basename(caminho), f.read())

    andante.gravar_save = gravar_save

    while True:
        try:
            andante.menu(iniciar_idle="--idle" in sys.argv)
        except KeyboardInterrupt:
            print("\nSaindo...")
        except Exception:
            print(f"\n{andante.RD}[erro inesperado]{andante.RESET}")
            traceback.print_exc(file=sys.stdout)
        sys.argv = ["andante.py"]
        print(f"\n{andante.DIM}── sessão encerrada · o progresso ficou salvo neste navegador ──{andante.RESET}")
        try:
            input(f" {andante.YW}ENTER{andante.RESET} para jogar de novo ")
        except KeyboardInterrupt:
            pass
