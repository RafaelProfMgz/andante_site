"use client"

import { PlayIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { requestStart } from "@/components/terminal/terminal-events"

/** Rola até o terminal e liga o jogo. */
export function PlayCta({ children = "Jogar no navegador", size = "lg" }: { children?: React.ReactNode; size?: "lg" | "sm" }) {
  return (
    <Button
      size={size}
      nativeButton={false}
      render={<a href="#jogar" />}
      onClick={() => requestStart()}
      className="shadow-[0_6px_24px_-8px_var(--gold)]"
    >
      <PlayIcon data-icon="inline-start" />
      {children}
    </Button>
  )
}
