import { Separator } from "@/components/ui/separator"

export function SiteFooter() {
  return (
    <footer className="mt-10 pb-12 text-center text-sm text-muted-foreground">
      <Separator className="mb-14" />
      <pre aria-hidden className="mb-2 font-mono text-base font-extrabold text-muted-foreground/30">▄▀█ █▄ █ █▀▄ ▄▀█ █▄ █ ▀█▀ █▀▀</pre>
      <p>Andante · um idle de terminal feito em Python.</p>
    </footer>
  )
}
