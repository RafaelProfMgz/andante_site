import { LOGO } from "@/lib/game-data"
import { cn } from "@/lib/utils"

/** O logo em blocos do andante.py (logo_ascii). */
export function AsciiLogo({ className }: { className?: string }) {
  return (
    <pre aria-label="Andante" className={cn("m-0 font-mono leading-[1.02] font-extrabold text-gold glow-gold", className)}>
      {LOGO}
    </pre>
  )
}
