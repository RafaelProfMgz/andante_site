import { CLASSES } from "@/lib/game-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeading } from "./section-heading"

export function Classes() {
  return (
    <section className="py-[clamp(40px,7vw,80px)]">
      <SectionHeading title="Escolha seu andante" />
      <div className="grid gap-3.5 md:grid-cols-3">
        {CLASSES.map((c) => (
          <Card key={c.name} className="transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:ring-gold/60">
            <CardContent>
              <pre aria-hidden className="m-0 font-mono text-xl leading-tight font-semibold text-gold">{c.figure}</pre>
            </CardContent>
            <CardHeader>
              <CardTitle className="text-xl">{c.name}</CardTitle>
              <CardDescription className="text-foreground/75">{c.pitch}</CardDescription>
            </CardHeader>
            <CardFooter className="flex-wrap gap-1.5 border-t bg-transparent">
              {c.spells.map((s) => <Badge key={s} variant="outline">{s}</Badge>)}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
