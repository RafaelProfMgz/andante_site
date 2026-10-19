"use client"

import { useEffect, useRef } from "react"
import { FastForwardIcon, MaximizeIcon, PlayIcon, RotateCcwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { AsciiLogo } from "@/components/site/ascii-logo"
import { onStartRequest } from "./terminal-events"
import { useAndante } from "./use-andante"
import { cn } from "@/lib/utils"

const TOUCH_KEYS = [
  { label: "1", key: "1" }, { label: "2", key: "2" }, { label: "3", key: "3" },
  { label: "F", key: "F" }, { label: "H", key: "H" }, { label: "Q", key: "q" }, { label: "ESC", key: "\x1b" },
  { label: "+", key: "+" }, { label: "−", key: "-" }, { label: "ENTER", key: "\r", wide: true },
]

export function GameTerminal() {
  const screen = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const { phase, status, justSaved, start, send, focus } = useAndante(screen)

  useEffect(
    () =>
      onStartRequest(({ argv, onlyIfRunning }) => {
        if (onlyIfRunning && phase === "off") return
        if (!onlyIfRunning && !argv && phase !== "off") return // já ligado: só rola até aqui
        start(argv)
      }),
    [phase, start]
  )

  const fullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else frame.current?.requestFullscreen?.().catch(() => {})
    setTimeout(focus, 200)
  }

  const live = phase === "running" || phase === "loading"

  return (
    <div
      ref={frame}
      className="overflow-hidden rounded-xl border bg-terminal shadow-[0_40px_100px_-40px_#000,0_0_60px_-20px_color-mix(in_oklch,var(--gold)_25%,transparent)] fullscreen:flex fullscreen:flex-col fullscreen:rounded-none"
    >
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b bg-secondary px-3 py-2">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <p className="truncate text-center text-xs text-muted-foreground max-sm:invisible">andante — python3 andante.py</p>
        <div className="flex items-center gap-1">
          <Badge
            variant="outline"
            className={cn("border-success/40 text-success transition-opacity duration-500", justSaved ? "opacity-100 duration-100" : "opacity-0")}
            aria-live="polite"
          >
            ● salvo
          </Badge>
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="ghost" size="icon-sm" aria-label="Reiniciar o jogo" disabled={!live} onClick={() => start()} />}
            >
              <RotateCcwIcon />
            </TooltipTrigger>
            <TooltipContent>Reiniciar (o save é mantido)</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Tela cheia" onClick={fullscreen} />}>
              <MaximizeIcon />
            </TooltipTrigger>
            <TooltipContent>Tela cheia</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="relative h-[min(640px,78vh)] py-2.5 pr-1 pl-3 max-sm:h-[72vh] max-sm:pl-1.5 in-fullscreen:h-auto in-fullscreen:flex-1">
        <div ref={screen} className="size-full" />

        {phase !== "running" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-terminal bg-[radial-gradient(500px_260px_at_50%_40%,color-mix(in_oklch,var(--gold)_11%,transparent),transparent_70%)] p-6 text-center">
            <AsciiLogo className="text-[min(4.4vw,30px)]" />
            {phase === "off" && (
              <>
                <p className="max-w-[46ch] text-sm text-muted-foreground">
                  Primeira vez? O terminal baixa ~10&nbsp;MB de Python e fica em cache.
                </p>
                <div className="flex flex-wrap justify-center gap-2.5">
                  <Button size="lg" onClick={() => start()}>
                    <PlayIcon data-icon="inline-start" /> Ligar o terminal
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => start(["--idle"])}>
                    <FastForwardIcon data-icon="inline-start" /> Direto no idle
                  </Button>
                </div>
              </>
            )}
            {phase === "loading" && (
              <p className="flex items-center gap-2 text-sm" role="status">
                <Spinner className="text-primary" /> {status}
              </p>
            )}
            {phase === "error" && (
              <>
                <p className="max-w-[52ch] text-sm text-destructive" role="alert">Algo deu errado: {status}</p>
                <Button onClick={() => start()}>Tentar de novo</Button>
              </>
            )}
            {phase === "unsupported" && (
              <>
                <p className="max-w-[52ch] text-sm text-muted-foreground" role="alert">
                  Este navegador bloqueou a memória compartilhada que o terminal precisa. Use Chrome, Edge ou Firefox
                  atualizados — ou <a className="text-primary underline" href="#baixar">baixe o jogo</a>.
                </p>
                <Button onClick={() => location.reload()}>Recarregar</Button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="hidden flex-wrap gap-1.5 border-t bg-secondary p-2 pointer-coarse:flex">
        {TOUCH_KEYS.map(({ label, key, wide }) => (
          <Button
            key={label}
            variant="outline"
            className={cn("h-9 flex-[1_0_34px] font-semibold text-gold-soft", wide && "flex-[2_0_80px]")}
            disabled={phase !== "running"}
            onClick={() => { send(key); focus() }}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  )
}
