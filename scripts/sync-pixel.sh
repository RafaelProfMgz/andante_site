#!/usr/bin/env bash
# Empacota a versão gráfica (Pyxel) do jogo para o site: public/pixel/andante.pyxapp
# Usa o andante.py + andante_gui.py + assets/ de ../terminal e o pyxel do .venv de lá.
set -euo pipefail
cd "$(dirname "$0")/.."
JOGO="$(cd ../terminal && pwd)"
PYXEL="$JOGO/.venv/bin/pyxel"
[ -x "$PYXEL" ] || { echo "Falta o Pyxel em $JOGO/.venv (python3 -m venv .venv && .venv/bin/pip install pyxel)"; exit 1; }
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$TMP/andante/assets"
cp "$JOGO/andante.py" "$JOGO/andante_gui.py" "$TMP/andante/"
cp "$JOGO"/assets/*.ttf "$TMP/andante/assets/"
(cd "$TMP" && "$PYXEL" package andante andante/andante_gui.py >/dev/null)
cp "$TMP/andante.pyxapp" public/pixel/andante.pyxapp
echo "public/pixel/andante.pyxapp ($(du -h public/pixel/andante.pyxapp | cut -f1))"
