"use client"

import { useRef, useState } from "react"
import { Gamepad2Icon, MaximizeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { SectionHeading } from "./section-heading"

const HINTS = [
  { keys: ["ESPAÇO"], label: "pausa" },
  { keys: ["+", "−"], label: "velocidade" },
  { keys: ["1", "2"], label: "responde escolhas" },
  { keys: ["Q"], label: "salva" },
]

/** Versão gráfica (Pyxel) num iframe: public/pixel/index.html roda o andante.pyxapp (npm run sync:pixel).
 *  Só carrega quando o jogador pede — são alguns MB de Python + Pyxel na primeira vez. */
export function PixelSection() {
  const [aberto, setAberto] = useState(false)
  const moldura = useRef<HTMLDivElement>(null)

  const telaCheia = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else moldura.current?.requestFullscreen?.().catch(() => {})
  }

  return (
    <section id="grafico" className="scroll-mt-16 py-[clamp(40px,7vw,80px)]">
      <SectionHeading title="Versão gráfica">
        O mesmo andante, agora com pixel art: cenário de cada andar, chefes, companheiros e baús. Feita com Pyxel e usando
        o <b>mesmo save</b> do terminal acima.
      </SectionHeading>
      <div
        ref={moldura}
        className="overflow-hidden rounded-xl border bg-terminal shadow-[0_40px_100px_-40px_#000,0_0_60px_-20px_color-mix(in_oklch,var(--arcane)_25%,transparent)] fullscreen:flex fullscreen:flex-col fullscreen:rounded-none"
      >
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b bg-secondary px-3 py-2">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <p className="truncate text-center text-xs text-muted-foreground max-sm:invisible">andante — versão gráfica (Pyxel)</p>
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="ghost" size="icon-sm" aria-label="Tela cheia" disabled={!aberto} onClick={telaCheia} />}
            >
              <MaximizeIcon />
            </TooltipTrigger>
            <TooltipContent>Tela cheia</TooltipContent>
          </Tooltip>
        </div>
        <div className="mx-auto aspect-[4/3] w-full max-w-[min(100%,960px)] in-fullscreen:max-w-none in-fullscreen:flex-1">
          {aberto ? (
            <iframe src="/pixel/index.html" title="Andante, versão gráfica" className="size-full" allow="fullscreen; autoplay" />
          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-5 bg-[radial-gradient(500px_260px_at_50%_40%,color-mix(in_oklch,var(--arcane)_14%,transparent),transparent_70%)] p-6 text-center">
              <p className="font-pixel text-2xl text-gold">▲ andante</p>
              <p className="max-w-[46ch] text-sm text-muted-foreground">
                Na primeira vez o navegador baixa o Python e o Pyxel (alguns MB, depois fica em cache). Clique na tela do
                jogo para começar.
              </p>
              <Button size="lg" onClick={() => setAberto(true)}>
                <Gamepad2Icon data-icon="inline-start" /> Abrir versão gráfica
              </Button>
            </div>
          )}
        </div>
      </div>
      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-muted-foreground">
        {HINTS.map(({ keys, label }) => (
          <li key={label} className="flex items-center gap-1.5">
            {keys.map((k) => <Kbd key={k} className="font-semibold text-gold-soft">{k}</Kbd>)}
            {label}
          </li>
        ))}
        <li className="text-muted-foreground/80">Use uma versão de cada vez: as duas gravam o mesmo save.</li>
      </ul>
    </section>
  )
}
