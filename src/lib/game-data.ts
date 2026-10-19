// Conteúdo da landing tirado do andante.py (ANDARES, CLASSES, FEITICOS_CLASSE, FALAS_IDLE).
// Se o jogo mudar, atualize aqui.

export type Floor = {
  n: number
  name: string
  boss: string
  level: number
  reward: string
  line: string
  tone: "success" | "gold" | "destructive" | "info" | "arcane"
}

export const FLOORS: Floor[] = [
  { n: 5, name: "Abismo", boss: "Rei das Sombras", level: 10, reward: "Cristal da Sombra", line: "Onde a escada termina e a escuridão começa a responder.", tone: "arcane" },
  { n: 4, name: "Templo Antigo", boss: "Cumulador", level: 7, reward: "Relíquia Antiga", line: "À luz das velas, a tinta do manuscrito volta a aparecer.", tone: "info" },
  { n: 3, name: "Caverna do Dragão", boss: "Dragão Antigo", level: 5, reward: "Escama do Dragão", line: "O calor sobe pelas pedras antes mesmo do rugido.", tone: "destructive" },
  { n: 2, name: "Castelo do Rei", boss: "Guardião Real", level: 3, reward: "Coroa do Guardião", line: "Há uma mesa posta para um banquete que nunca começou.", tone: "gold" },
  { n: 1, name: "Porto & Floresta", boss: "Goblin Sombrio", level: 1, reward: "Crista do Goblin", line: "Um caranguejo te encara de lado, ofendido.", tone: "success" },
]

export const CLASSES = [
  { name: "Guerreiro", figure: "  O\n /|\\🗡\n / \\", pitch: "Aguenta o tranco. +40 de vida, +4 ATQ, +4 DEF.", spells: ["Bola de Fogo", "Escudo Arcano"] },
  { name: "Mago", figure: "  O\n /|\\✦\n / \\", pitch: "Frágil e brilhante. +40 de mana, 2 poções extras.", spells: ["Bola de Fogo", "Cura", "Restauração"] },
  { name: "Arqueiro", figure: "  O\n /|)➶\n / \\", pitch: "Equilibrado e prático. +10 de ouro para começar.", spells: ["Bola de Fogo", "Impulso"] },
]

export const IDLE_LINES: [icon: string, text: string][] = [
  ["⚔", "Goblin derrotado. +14 XP"],
  ["🐈", "Um gato rouba um peixe da sua bolsa. Você deixa."],
  ["💰", "Moedas no cais. +22 ouro"],
  ["⚒", "Forja: Lâmina Afiada nv 4"],
  ["🔔", "O sino do porto toca três vezes."],
  ["⚔", "Esqueleto derrotado. +31 XP"],
  ["🛡", "Uma armadura vazia vira a cabeça quando você passa."],
  ["⬆", "Nível 8! Vida e mana restauradas."],
  ["🦀", "Um caranguejo te encara de lado, ofendido."],
  ["★", "CHEFE VENCIDO: Guardião Real"],
  ["🍷", "Uma mesa posta para um banquete que nunca começou."],
  ["✦", "+1 fragmento para o Altar"],
  ["🔥", "Bola de Fogo! 38 de dano"],
  ["🌫", "A névoa sobe do mar e esconde a torre."],
]

export const LOGO = "▄▀█ █▄ █ █▀▄ ▄▀█ █▄ █ ▀█▀ █▀▀\n█▀█ █ ▀█ █▄▀ █▀█ █ ▀█  █  ██▄"
