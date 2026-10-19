# Site do Andante

Landing page + terminal online do jogo, em **Next.js 16** (App Router, Tailwind v4, shadcn/ui com Base UI).
O terminal roda o **`public/game/andante.py` original** no navegador: Pyodide (Python em WebAssembly) num Web Worker + xterm.js.

```bash
npm install
npm run dev          # http://localhost:3004
npm run build && npm start
npm run sync:game    # copia ../terminal/andante.py para public/game/
```

## Como o terminal funciona
- `src/components/terminal/use-andante.ts` — cria o xterm, o worker e o `SharedArrayBuffer` do teclado
- `public/terminal/worker.js` — carrega o Pyodide (CDN jsDelivr) e o jogo
- `public/terminal/web_runtime.py` — troca `input`, `time.sleep`, `LeitorTecla` e `limpar` do jogo por versões para o navegador e manda cada save para a página
- `src/lib/saves.ts` — saves no localStorage (`andante:save_auto_idle.txt`, `andante:save_idle.txt`), mesmo texto dos `.txt`
- `next.config.ts` — headers COOP/COEP (sem eles não existe `SharedArrayBuffer`)

## Landing
`src/app/page.tsx` compõe as seções de `src/components/site/`. Textos dos andares/classes em `src/lib/game-data.ts`.

## Deploy
Vercel: `vercel deploy --prod` (os headers vêm do `next.config.ts`).
# andante_site
