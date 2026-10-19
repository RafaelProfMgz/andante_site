import { Kbd } from "@/components/ui/kbd"
import { GameTerminal } from "@/components/terminal/game-terminal"
import { SavePanel } from "@/components/terminal/save-panel"
import { SectionHeading } from "./section-heading"

const HINTS = [
  { keys: ["ENTER"], label: "modo idle" },
  { keys: ["Q"], label: "sai do idle" },
  { keys: ["+", "−"], label: "velocidade" },
  { keys: ["ESC"], label: "volta" },
  { keys: ["E"], label: "equipamento" },
  { keys: ["H"], label: "habilidades" },
  { keys: ["S"], label: "sino do porto" },
]

export function PlaySection() {
  return (
    <section id="jogar" className="scroll-mt-16 py-[clamp(40px,7vw,80px)]">
      <SectionHeading title="Jogar agora">
        O jogo de verdade — o mesmo <code className="text-gold-soft">andante.py</code>, rodando em Python dentro do seu navegador.
        Os menus respondem a uma tecla, sem ENTER.
      </SectionHeading>
      <GameTerminal />
      <SavePanel />
      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-muted-foreground">
        {HINTS.map(({ keys, label }) => (
          <li key={label} className="flex items-center gap-1.5">
            {keys.map((k) => <Kbd key={k} className="font-semibold text-gold-soft">{k}</Kbd>)}
            {label}
          </li>
        ))}
      </ul>
    </section>
  )
}
