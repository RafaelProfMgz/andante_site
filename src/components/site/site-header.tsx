import { PlayCta } from "./play-cta"

const LINKS = [
  { href: "#torre", label: "a torre" },
  { href: "#sistemas", label: "sistemas" },
  { href: "#baixar", label: "baixar" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <a href="#" className="font-pixel text-lg text-gold">▲ andante</a>
        <nav className="flex items-center gap-6 text-sm">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-muted-foreground transition-colors hover:text-gold max-sm:hidden">
              {l.label}
            </a>
          ))}
          <PlayCta size="sm">Jogar</PlayCta>
        </nav>
      </div>
    </header>
  )
}
