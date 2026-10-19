import { FLOORS, type Floor } from "@/lib/game-data"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { SectionHeading } from "./section-heading"

const TONE: Record<Floor["tone"], string> = {
  success: "[--tone:var(--success)]",
  gold: "[--tone:var(--gold)]",
  destructive: "[--tone:var(--destructive)]",
  info: "[--tone:var(--info)]",
  arcane: "[--tone:var(--arcane)]",
}

// Cada andar abaixo fica um pouco mais largo: a torre afina para cima.
const INSET = ["sm:mx-0", "sm:mx-[2%]", "sm:mx-[4%]", "sm:mx-[6%]", "sm:mx-[8%]"]

export function Tower() {
  return (
    <section id="torre" className="scroll-mt-16 py-[clamp(40px,7vw,80px)]">
      <SectionHeading title="A torre">
        Cada andar tem um chefe e uma condição. Vença o Rei das Sombras e a torre recomeça — mais dura, mais generosa.
      </SectionHeading>
      <ol className="mx-auto flex max-w-3xl flex-col gap-1.5">
        {FLOORS.map((f, i) => (
          <li
            key={f.n}
            className={cn(
              TONE[f.tone],
              INSET[i],
              "grid grid-cols-[40px_1fr] items-center gap-x-4 gap-y-2 rounded-lg border border-l-[3px] border-l-(--tone) py-4 pr-4 transition-transform duration-200 hover:translate-x-1.5 sm:grid-cols-[56px_1fr_auto] sm:pr-5",
              "bg-[linear-gradient(90deg,color-mix(in_oklch,var(--tone)_10%,transparent),var(--card)_40%)]"
            )}
          >
            <span className="text-center font-pixel text-2xl text-(--tone) sm:text-3xl">{f.n}</span>
            <div>
              <h3 className="font-semibold">{f.name}</h3>
              <p className="text-sm text-muted-foreground">{f.line}</p>
            </div>
            <div className="col-start-2 flex flex-col gap-1 sm:col-start-3 sm:items-end sm:text-right">
              <span className="text-[11px] tracking-widest text-muted-foreground uppercase">chefe</span>
              <span className="font-semibold">{f.boss}</span>
              <span className="flex flex-wrap gap-1.5 sm:justify-end">
                <Badge variant="outline">nível {f.level}</Badge>
                <Badge variant="secondary">★ {f.reward}</Badge>
              </span>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-center text-muted-foreground">
        ↺ Volta 2, 3, 4… inimigos e recompensas <b className="text-gold">×1,5</b> por volta.
      </p>
    </section>
  )
}
