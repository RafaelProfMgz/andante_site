import { DownloadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AsciiLogo } from "./ascii-logo"
import { IdlePanel } from "./idle-panel"
import { PlayCta } from "./play-cta"

export function Hero() {
  return (
    <section className="grid items-center gap-[clamp(28px,5vw,64px)] py-[clamp(48px,9vw,110px)] md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      <div className="min-w-0">
        <p className="mb-5 text-xs tracking-[0.08em] text-info uppercase">rpg idle · roda no terminal · python puro</p>
        <AsciiLogo className="mb-6 text-[min(4.9vw,32px)]" />
        <h1 className="mb-5 font-pixel text-[clamp(26px,3.6vw,40px)] leading-[1.15]">
          A torre que se sobe <em className="text-gold not-italic">sozinha</em>.
        </h1>
        <p className="mb-7 max-w-[52ch] text-[15px] leading-relaxed text-foreground/75">
          Cinco andares. Cinco chefes. Um andante que luta, forja, sobe e recomeça mais forte — com você olhando ou
          não. Feche o jogo e ele continua andando.
        </p>
        <div className="flex flex-wrap gap-3">
          <PlayCta />
          <Button size="lg" variant="outline" nativeButton={false} render={<a href="/game/andante.py" download />}>
            <DownloadIcon data-icon="inline-start" /> Baixar andante.py
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Sem cadastro. Sem instalar nada. Seu progresso fica salvo neste navegador.</p>
      </div>
      <IdlePanel />
    </section>
  )
}
