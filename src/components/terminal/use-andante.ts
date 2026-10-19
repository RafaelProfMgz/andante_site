"use client"

// Liga o xterm.js ao worker que roda o andante.py no Pyodide (public/terminal/worker.js).
// O teclado vai por um SharedArrayBuffer (o worker fica bloqueado em input()/sleep);
// a saída e os saves voltam por postMessage.
import { useCallback, useEffect, useRef, useState } from "react"
import type { Terminal } from "@xterm/xterm"
import type { FitAddon } from "@xterm/addon-fit"

import { allSaves, writeSave } from "@/lib/saves"

const RING_SIZE = 8192
const encoder = new TextEncoder()

export type Phase = "off" | "loading" | "running" | "error" | "unsupported"

type WorkerMessage =
  | { type: "out"; text: string }
  | { type: "status"; text: string }
  | { type: "ready" }
  | { type: "save"; name: string; text: string }
  | { type: "error"; text: string }

export function useAndante(container: React.RefObject<HTMLDivElement | null>) {
  const [phase, setPhase] = useState<Phase>("off")
  const [status, setStatus] = useState("")
  const [justSaved, setJustSaved] = useState(false)
  const savedTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const term = useRef<Terminal | null>(null)
  const fit = useRef<FitAddon | null>(null)
  const worker = useRef<Worker | null>(null)
  const ctrl = useRef<Int32Array | null>(null)
  const ring = useRef<Uint8Array | null>(null)
  const head = useRef(0)

  const send = useCallback((text: string) => {
    const c = ctrl.current
    const r = ring.current
    if (!c || !r) return
    const tail = Atomics.load(c, 2)
    for (const byte of encoder.encode(text)) {
      if (head.current - tail >= RING_SIZE) break // anel cheio: descarta o excesso
      r[head.current % RING_SIZE] = byte
      head.current++
    }
    Atomics.store(c, 1, head.current)
    Atomics.add(c, 0, 1)
    Atomics.notify(c, 0)
  }, [])

  const reportSize = useCallback(() => {
    if (!ctrl.current || !term.current) return
    Atomics.store(ctrl.current, 4, term.current.cols)
    Atomics.store(ctrl.current, 5, term.current.rows)
  }, [])

  const ensureTerminal = useCallback(async () => {
    if (term.current || !container.current) return
    const [{ Terminal }, { FitAddon }, { Unicode11Addon }] = await Promise.all([
      import("@xterm/xterm"),
      import("@xterm/addon-fit"),
      import("@xterm/addon-unicode11"),
    ])
    const t = new Terminal({
      fontFamily: getComputedStyle(document.body).fontFamily,
      fontSize: window.innerWidth < 640 ? 11 : 14,
      lineHeight: 1.12,
      cursorBlink: true,
      convertEol: true,
      allowProposedApi: true,
      scrollback: 2000,
      theme: {
        background: "#0a0c0f",
        foreground: "#d9dccf",
        cursor: "#f2b544",
        cursorAccent: "#0a0c0f",
        selectionBackground: "#f2b54455",
        black: "#14171c", red: "#ff6b5b", green: "#7bd88f", yellow: "#f2b544",
        blue: "#6aa8ff", magenta: "#d58cff", cyan: "#5fd4d4", white: "#d9dccf",
        brightBlack: "#5c6370", brightRed: "#ff8a7d", brightGreen: "#9ff0b0", brightYellow: "#ffd27a",
        brightBlue: "#94c1ff", brightMagenta: "#e5b0ff", brightCyan: "#8ff0f0", brightWhite: "#ffffff",
      },
    })
    const f = new FitAddon()
    t.loadAddon(f)
    t.loadAddon(new Unicode11Addon())
    t.unicode.activeVersion = "11"
    t.open(container.current)
    f.fit()
    t.onData(send)
    t.onResize(reportSize)
    new ResizeObserver(() => {
      try { f.fit() } catch {}
    }).observe(container.current)
    term.current = t
    fit.current = f
  }, [container, send, reportSize])

  const start = useCallback(
    async (argv: string[] = []) => {
      if (!window.crossOriginIsolated || typeof SharedArrayBuffer === "undefined") {
        setPhase("unsupported")
        return
      }
      setPhase("loading")
      setStatus("acordando o andante…")
      await ensureTerminal()
      worker.current?.terminate()

      const sab = new SharedArrayBuffer(32 + RING_SIZE)
      ctrl.current = new Int32Array(sab, 0, 8)
      ring.current = new Uint8Array(sab, 32)
      head.current = 0
      reportSize()
      term.current?.reset()

      const w = new Worker("/terminal/worker.js")
      w.onmessage = ({ data }: MessageEvent<WorkerMessage>) => {
        switch (data.type) {
          case "out":
            term.current?.write(data.text)
            break
          case "status":
            setStatus(data.text)
            break
          case "ready":
            setPhase("running")
            term.current?.focus()
            break
          case "save":
            if (writeSave(data.name, data.text)) {
              setJustSaved(true)
              clearTimeout(savedTimer.current)
              savedTimer.current = setTimeout(() => setJustSaved(false), 1200)
            }
            break
          case "error":
            setStatus(data.text)
            setPhase("error")
            break
        }
      }
      w.postMessage({ type: "start", sab, saves: allSaves(), argv })
      worker.current = w
    },
    [ensureTerminal, reportSize]
  )

  useEffect(
    () => () => {
      worker.current?.terminate()
      clearTimeout(savedTimer.current)
    },
    []
  )

  const focus = useCallback(() => term.current?.focus(), [])

  return { phase, status, justSaved, start, send, focus }
}
