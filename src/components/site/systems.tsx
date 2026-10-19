import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Kbd } from "@/components/ui/kbd"
import { cn } from "@/lib/utils"
import { SectionHeading } from "./section-heading"

const SYSTEMS = [
  { icon: "⚒", title: "Forja do Porto", text: "Ouro vira poder: Lâmina, Armadura, Amuleto, Moeda da Sorte, Diário de Bordo e Botas Ligeiras. Ligue a auto-compra e ela investe sozinha." },
  { icon: "✦", title: "Altar dos Fragmentos", text: "Cada chefe deixa um fragmento. No altar eles viram bênçãos permanentes — e essa decisão é só sua." },
  { icon: "🔥", title: "Magia", text: "Bola de Fogo, Cura, Escudo Arcano, Impulso e Restauração. A mana cresce com Inteligência, nível e andar." },
  { icon: "🏆", title: "Conquistas & títulos", text: "8 conquistas, 5 títulos com bônus de ATQ e DEF, passivas que destravam pelo caminho." },
]

function Icon({ children }: { children: string }) {
  return <span className="inline-grid size-8 place-items-center rounded-md bg-accent text-base text-gold">{children}</span>
}

export function Systems() {
  return (
    <section id="sistemas" className="scroll-mt-16 py-[clamp(40px,7vw,80px)]">
      <SectionHeading title="Como funciona" />
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="ring-gold/30 bg-[linear-gradient(160deg,color-mix(in_oklch,var(--gold)_8%,transparent),var(--card)_50%)] sm:col-span-2 lg:col-span-1 lg:row-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2.5 font-sans text-lg font-semibold"><Icon>⏳</Icon> Idle de verdade</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-foreground/75">
            <p>
              Aperte <Kbd className="text-gold-soft">3</Kbd> e solte o controle. O andante batalha, conversa, trabalha, compra
              melhorias e enfrenta chefes sozinho. Perdeu? Ele recua, treina e tenta de novo.
            </p>
            <p className="text-muted-foreground">
              Fechou o jogo? Ao voltar você recebe o que ele conquistou enquanto você estava fora — até 12h.
            </p>
          </CardContent>
        </Card>
        {SYSTEMS.map((s) => (
          <Card key={s.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2.5 font-sans font-semibold"><Icon>{s.icon}</Icon> {s.title}</CardTitle>
              <CardDescription className="pt-1 text-foreground/70">{s.text}</CardDescription>
            </CardHeader>
          </Card>
        ))}
        <Card className={cn("sm:col-span-2 lg:col-span-3")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2.5 font-sans font-semibold"><Icon>📜</Icon> Save que você pode editar</CardTitle>
            <CardDescription className="pt-1 text-foreground/70">
              O progresso é um <code className="text-gold-soft">.txt</code> legível. Troque <code className="text-gold-soft">[ ]</code> por{" "}
              <code className="text-gold-soft">[x]</code>, mude o andar — o jogo aceita.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  )
}
