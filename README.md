# Site do Andante

Landing page + terminal online do jogo, em **Next.js 16** (App Router, Tailwind v4, shadcn/ui com Base UI).
O terminal roda o **`public/game/andante.py` original** no navegador: Pyodide (Python em WebAssembly) num Web Worker + xterm.js.

```bash
npm install
npm run dev          # http://localhost:3004
npm run build && npm start
npm run sync:game    # copia ../terminal/andante.py para public/game/
npm run sync:pixel   # empacota a versão gráfica (Pyxel) em public/pixel/andante.pyxapp
npm run sync         # os dois
```

## Como o terminal funciona
- `src/components/terminal/use-andante.ts` — cria o xterm, o worker e o `SharedArrayBuffer` do teclado
- `public/terminal/worker.js` — carrega o Pyodide (CDN jsDelivr) e o jogo
- `public/terminal/web_runtime.py` — troca `input`, `time.sleep`, `LeitorTecla` e `limpar` do jogo por versões para o navegador e manda cada save para a página
- `src/lib/saves.ts` — saves no localStorage (`andante:save_auto_idle.txt`, `andante:save_idle.txt`), mesmo texto dos `.txt`
- `next.config.ts` — headers COOP/COEP (sem eles não existe `SharedArrayBuffer`)

## Versão gráfica (Pyxel)
- `public/pixel/index.html` — carrega o `pyxel.js` (jsDelivr, mesma versão do Pyxel que empacotou) e roda o `andante.pyxapp`
- `public/pixel/andante.pyxapp` — gerado por `scripts/sync-pixel.sh` a partir de `../terminal/andante.py`, `andante_gui.py` e `assets/` (usa o Pyxel do `../terminal/.venv`)
- `src/components/site/pixel-section.tsx` — a seção "Versão gráfica": iframe que só carrega quando o jogador clica
- O save é o mesmo do terminal: no navegador o `andante_gui.py` lê e grava `localStorage["andante:save_auto_idle.txt"]`

## Landing
`src/app/page.tsx` compõe as seções de `src/components/site/`. Textos dos andares/classes em `src/lib/game-data.ts`.

## Deploy
Vercel: `vercel deploy --prod` (os headers vêm do `next.config.ts`).
# andante_site
