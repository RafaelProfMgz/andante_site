import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Kbd } from "@/components/ui/kbd"
import { cn } from "@/lib/utils"
import { SectionHeading } from "./section-heading"

const SYSTEMS = [
  { icon: "💠", title: "Loot com raridade", text: "Do Comum ao Mítico, com afixos, conjuntos e Lendários únicos que têm história. O idle equipa o melhor; o resto vira pó de forja." },
  { icon: "🔔", title: "Sino do Porto", text: "Doze companheiros com lore própria — Maré, o Primeiro Andante, o Rei sem Coroa... Repetidos viram Memórias: capítulos novos da história." },
  { icon: "📜", title: "Missões com escolhas", text: "O Mar Escuro, as Páginas do Manuscrito, a Padeira e o Guardião. O que você escolhe ecoa depois. Contratos do Porto para o dia a dia." },
  { icon: "🌿", title: "Habilidades", text: "Três ramos por classe, ativas que sobem de rank com o uso, elementos, subclasse no nível 30 e níveis até 120 — depois, Maestria." },
  { icon: "⚒", title: "Forja & Altar", text: "Ouro vira melhorias (com auto-compra); fragmentos dos chefes viram bênçãos permanentes — essa decisão é só sua." },
  { icon: "🏆", title: "Conquistas & segredos", text: "Quase 30 conquistas com Pontos de Lenda, títulos, bestiário e recordes. E o menu esconde ??? que só aparecem conforme você sobe." },
]

function Icon({ children }: { children: string }) {
  return <span className="inline-grid size-8 place-items-center rounded-md bg-accent text-base text-gold">{children}</span>
}

export function Systems() {
  return (
    <section id="sistemas" className="scroll-mt-16 py-[clamp(40px,7vw,80px)]">
      <SectionHeading title="Como funciona" />
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="ring-gold/30 bg-[linear-gradient(160deg,color-mix(in_oklch,var(--gold)_8%,transparent),var(--card)_50%)] sm:col-span-2 lg:col-span-1 lg:row-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2.5 font-sans text-lg font-semibold"><Icon>⏳</Icon> Idle de verdade</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-foreground/75">
            <p>
              Aperte <Kbd className="text-gold-soft">ENTER</Kbd> e solte o controle. O andante batalha, conversa, trabalha, compra
              melhorias, cumpre contratos e enfrenta chefes sozinho. Perdeu? Ele recua, treina e tenta de novo.
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
