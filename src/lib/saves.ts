// Saves do Andante no localStorage. O texto é idêntico aos .txt do jogo de terminal.
// Toda leitura/escrita fica em try/catch: modo privado ou site data bloqueado não podem quebrar a página.

const PREFIX = "andante:"
export const SAVE_FILES = ["save_auto_idle.txt", "save_idle.txt"] as const
export const AUTO_SAVE = SAVE_FILES[0]
const CHANGE_EVENT = "andante:saves"

export function readSave(name: string): string | null {
  try {
    return localStorage.getItem(PREFIX + name)
  } catch {
    return null
  }
}

export function writeSave(name: string, text: string): boolean {
  try {
    localStorage.setItem(PREFIX + name, text)
    window.dispatchEvent(new Event(CHANGE_EVENT))
    return true
  } catch {
    return false
  }
}

export function clearSaves() {
  try {
    for (const name of SAVE_FILES) localStorage.removeItem(PREFIX + name)
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function allSaves(): Record<string, string> {
  const saves: Record<string, string> = {}
  for (const name of SAVE_FILES) {
    const text = readSave(name)
    if (text) saves[name] = text
  }
  return saves
}

export function looksLikeSave(text: string) {
  return /^Nome:/m.test(text) && /^Classe:/m.test(text)
}

export type SaveSummary = { nome: string; classe: string; volta: string; andar: string; nivel: string }

export function summarize(text: string | null): SaveSummary | null {
  if (!text) return null
  const field = (key: string) => text.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]?.trim() ?? "?"
  return { nome: field("Nome"), classe: field("Classe"), volta: field("Volta"), andar: field("Andar"), nivel: field("Nivel") }
}

/** Para useSyncExternalStore: muda quando o jogo grava ou o jogador importa/apaga. */
export function subscribeSaves(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback)
  window.addEventListener("storage", callback)
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback)
    window.removeEventListener("storage", callback)
  }
}
