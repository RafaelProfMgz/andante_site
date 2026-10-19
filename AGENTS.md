<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Projeto: site do Andante
- Next.js 16 + Tailwind v4 + shadcn/ui (**Base UI**: use `render`, não `asChild`; toast via `toast.add()` de `@/components/ui/toast`).
- Site sempre escuro; cores do jogo em tokens (`text-gold`, `text-success`, `text-info`, `text-arcane`, `bg-terminal`) — veja `src/app/globals.css`.
- O terminal depende dos headers COOP/COEP em `next.config.ts`. Recursos de outra origem precisam de CORS/CORP (jsDelivr tem).
- Não edite `public/game/andante.py` aqui: o jogo vive em `../terminal/`; rode `npm run sync:game`.
- Idem `public/pixel/andante.pyxapp` (versão gráfica): é gerado por `npm run sync:pixel` a partir de `../terminal/andante_gui.py`.
- O jogo do terminal usa `ler_tecla()` (uma tecla, termios); `public/terminal/web_runtime.py` troca por uma versão que lê do xterm.
- Skills do projeto em `.agents/skills/` (links em `.claude/skills/`): shadcn, next-best-practices, next-cache-components, vercel-react-best-practices, vercel-composition-patterns, building-components, web-design-guidelines, frontend-design, agent-browser, vercel-cli, deploy-to-vercel.
