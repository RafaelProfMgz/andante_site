// Ponte entre botões espalhados pela página (hero, painel de saves) e o terminal.
const START = "andante:start"

export type StartDetail = { argv?: string[]; onlyIfRunning?: boolean }

export function requestStart(detail: StartDetail = {}) {
  window.dispatchEvent(new CustomEvent<StartDetail>(START, { detail }))
}

export function onStartRequest(handler: (detail: StartDetail) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<StartDetail>).detail ?? {})
  window.addEventListener(START, listener)
  return () => window.removeEventListener(START, listener)
}
