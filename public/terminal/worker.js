// Worker que roda o andante.py dentro do Pyodide.
// O teclado chega por um SharedArrayBuffer (o worker fica bloqueado em input()/sleep
// e não consegue receber postMessage); a saída sai por postMessage em lotes.
//
// Layout do SharedArrayBuffer:
//   Int32[0] contador de avisos (Atomics.notify)   Int32[1] bytes escritos (head)
//   Int32[2] bytes lidos (tail)                    Int32[3] usado só para dormir
//   Int32[4] colunas                               Int32[5] linhas
//   bytes 32.. anel de teclas (UTF-8)
const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.27.2/full/";
importScripts(PYODIDE_URL + "pyodide.js");

let ctrl, anel, tail = 0, saida = "";
const decoder = new TextDecoder();

const webterm = {
  write(s) {
    saida += s;
    if (saida.length > 16384) webterm.flush();
  },
  flush() {
    if (saida) {
      postMessage({ type: "out", text: saida });
      saida = "";
    }
  },
  sleep(ms) {
    Atomics.wait(ctrl, 3, 0, ms);
  },
  read_keys() {
    const head = Atomics.load(ctrl, 1);
    if (head === tail) return "";
    const bytes = new Uint8Array(head - tail);
    for (let i = 0; tail < head; i++, tail++) bytes[i] = anel[tail % anel.length];
    Atomics.store(ctrl, 2, tail);
    return decoder.decode(bytes, { stream: true });
  },
  wait_key(ms) {
    webterm.flush();
    const aviso = Atomics.load(ctrl, 0);
    if (Atomics.load(ctrl, 1) !== tail) return;
    Atomics.wait(ctrl, 0, aviso, ms);
  },
  cols: () => Atomics.load(ctrl, 4),
  rows: () => Atomics.load(ctrl, 5),
  persist(nome, texto) {
    postMessage({ type: "save", name: nome, text: texto });
  },
};

onmessage = async ({ data }) => {
  if (data.type !== "start") return;
  ctrl = new Int32Array(data.sab, 0, 8);
  anel = new Uint8Array(data.sab, 32);
  try {
    postMessage({ type: "status", text: "baixando o Python (WebAssembly)…" });
    const py = await loadPyodide({ indexURL: PYODIDE_URL });
    postMessage({ type: "status", text: "abrindo a torre…" });

    const [jogo, runtime] = await Promise.all(
      ["../game/andante.py", "web_runtime.py"].map((u) =>
        fetch(new URL(u, self.location.href)).then((r) => {
          if (!r.ok) throw new Error(`não consegui baixar ${u} (${r.status})`);
          return r.text();
        })
      )
    );
    py.FS.mkdirTree("/andante");
    py.FS.writeFile("/andante/andante.py", jogo);
    for (const [nome, texto] of Object.entries(data.saves || {})) {
      py.FS.writeFile(`/andante/${nome}`, texto);
    }
    py.registerJsModule("webterm", webterm);
    py.runPython(runtime);
    postMessage({ type: "ready" });
    py.globals.get("iniciar")(py.toPy(data.argv || []));
  } catch (e) {
    webterm.flush();
    postMessage({ type: "error", text: String(e && e.message ? e.message : e) });
  }
};
