// XP e níveis. O XP vem de aprendizado comprovado (teste passado, quiz melhorado,
// revisão feita), nunca de apenas abrir uma lição.

export const XP = {
  lessonQuick: 20,
  lessonFull: 50,
  exercisePassed: 30,
  exerciseFirstTry: 10,
  quizMax: 20, // multiplicado pelo resultado da questão (0 a 1)
  cardReview: 3,
} as const

/** XP necessário para ALCANÇAR o nível n: 50 * n * (n - 1). Nível 1 = 0, 2 = 100, 3 = 300, 4 = 600. */
export function xpForLevel(n: number): number {
  return 50 * n * (n - 1)
}

export interface LevelInfo {
  level: number
  xpIntoLevel: number
  xpForNext: number
  progress: number // 0 a 1
}

export function levelFromXp(xp: number): LevelInfo {
  const safe = Math.max(0, xp)
  let level = Math.floor((1 + Math.sqrt(1 + safe / 12.5)) / 2)
  // Ajuste fino contra erros de ponto flutuante nas fronteiras.
  while (xpForLevel(level + 1) <= safe) level += 1
  while (level > 1 && xpForLevel(level) > safe) level -= 1
  const base = xpForLevel(level)
  const next = xpForLevel(level + 1)
  return {
    level,
    xpIntoLevel: safe - base,
    xpForNext: next - base,
    progress: (safe - base) / (next - base),
  }
}
