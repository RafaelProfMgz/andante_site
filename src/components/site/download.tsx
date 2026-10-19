import { DownloadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SectionHeading } from "./section-heading"

export function Download() {
  return (
    <section id="baixar" className="scroll-mt-16 py-[clamp(40px,7vw,80px)]">
      <SectionHeading title="Jogar no seu terminal" />
      <div className="grid items-center gap-7 md:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col items-start gap-5">
          <p>
            É um arquivo só. Precisa apenas de <b>Python 3.8+</b> — Linux, macOS ou Windows, sem instalar nada.
          </p>
          <Button size="lg" nativeButton={false} render={<a href="/game/andante.py" download />}>
            <DownloadIcon data-icon="inline-start" /> Baixar andante.py
          </Button>
        </div>
        <pre className="m-0 overflow-x-auto rounded-lg border bg-terminal p-5 text-[13.5px] leading-loose text-success">
          <span className="text-muted-foreground">$</span> python3 andante.py          <span className="text-muted-foreground"># Windows: python andante.py</span>
          {"\n"}
          <span className="text-muted-foreground">$</span> python3 andante.py --idle   <span className="text-muted-foreground"># direto no modo idle</span>
        </pre>
      </div>
    </section>
  )
}
