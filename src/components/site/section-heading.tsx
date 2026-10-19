/** Título no estilo do secao() do jogo: ── Título ─────── */
export function SectionHeading({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <header className="mb-7 flex flex-col gap-2">
      <h2 className="flex items-center gap-2.5 font-pixel text-[clamp(20px,2.6vw,28px)]">
        <span className="text-gold" aria-hidden>──</span>
        {title}
        <span className="h-px flex-1 bg-linear-to-r from-gold/50 to-transparent" aria-hidden />
      </h2>
      {children && <p className="max-w-[70ch] text-muted-foreground">{children}</p>}
    </header>
  )
}
