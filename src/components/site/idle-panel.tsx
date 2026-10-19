"use client"

// Painel decorativo: imita o modo idle do jogo (torre + log rolando).
import { useEffect, useState } from "react"

import { IDLE_LINES } from "@/lib/game-data"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const FLOOR_NAMES = ["Porto", "Castelo", "Caverna", "Templo", "Abismo"]

type State = { tick: number; floor: number; level: number; xp: number; gold: number; log: { id: number; line: [string, string] }[] }

function step(s: State): State {
  const line = IDLE_LINES[s.tick % IDLE_LINES.length]
  const floor = line[1].startsWith("CHEFE") ? (s.floor % 5) + 1 : s.floor
  let xp = s.xp + 9 + ((s.tick * 7) % 14)
  let level = s.level
  if (xp >= 100) { xp -= 100; level++ }
  return {
    tick: s.tick + 1, floor, level, xp,
    gold: s.gold + 20 + ((s.tick * 37) % 90),
    log: [{ id: s.tick, line }, ...s.log].slice(0, 6),
  }
}

const INITIAL: State = Array.from({ length: 5 }).reduce<State>(
  (s) => step(s),
  { tick: 0, floor: 1, level: 7, xp: 40, gold: 12300, log: [] }
)

export function IdlePanel() {
  const [s, setS] = useState(INITIAL)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setS(step), 1600)
    return () => clearInterval(id)
  }, [])

  return (
    <div aria-hidden className="overflow-hidden rounded-xl border bg-card text-xs shadow-[0_30px_80px_-30px_#000]">
      <div className="flex items-center gap-1.5 border-b bg-secondary px-3 py-2.5">
        {[0, 1, 2].map((i) => <span key={i} className="size-2 rounded-full bg-border" />)}
        <span className="ml-auto whitespace-nowrap text-muted-foreground">modo idle · 1,0s/passo</span>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 p-4">
        <div className="leading-[1.75]">
          {FLOOR_NAMES.map((name, k) => ({ name, n: k + 1 })).reverse().map(({ name, n }) => (
            <div
              key={n}
              className={cn(
                "whitespace-nowrap",
                n < s.floor && "text-success",
                n === s.floor && "font-semibold text-gold",
                n > s.floor && "text-muted-foreground/50"
              )}
            >
              <span className="inline-block w-5">{n < s.floor ? "✓" : n === s.floor ? "◆" : "·"}</span>
              {n} {name}
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center gap-1.5">
          <div><span className="text-muted-foreground">Nível</span> <b>{s.level}</b></div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-success transition-[width] duration-700" style={{ width: `${s.xp}%` }} />
          </div>
          <div>
            <span className="text-muted-foreground">Ouro</span>{" "}
            <b className="text-gold">{(s.gold / 1000).toFixed(1).replace(".", ",")}K</b>
          </div>
        </div>
        <Separator className="col-span-2" />
        <ul className="col-span-2 min-h-[9.6em] leading-relaxed">
          {s.log.map(({ id, line: [icon, text] }, i) => (
            <li
              key={id}
              className={cn(
                "truncate animate-in fade-in slide-in-from-top-1 duration-300",
                i === 0 ? "text-foreground" : "text-muted-foreground",
                icon === "★" && "text-gold"
              )}
            >
              <span className="inline-block w-6">{icon}</span>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
