import { addDays } from './dates'

// Revisão espaçada no estilo SM-2. As notas dos botões seguem a escala 0 a 5 do algoritmo.
export type Grade = 'again' | 'hard' | 'good' | 'easy'

export const GRADE_Q: Record<Grade, number> = { again: 1, hard: 3, good: 4, easy: 5 }

export interface SrsState {
  ease: number
  interval: number // em dias
  reps: number
  lapses: number
  due: string // AAAA-MM-DD
}

export const INITIAL_EASE = 2.5
export const MIN_EASE = 1.3

export function newSrsState(today: string): SrsState {
  return { ease: INITIAL_EASE, interval: 0, reps: 0, lapses: 0, due: today }
}

export function review(state: SrsState, grade: Grade, today: string): SrsState {
  const q = GRADE_Q[grade]
  let { ease, interval, reps, lapses } = state

  if (q < 3) {
    reps = 0
    interval = 1
    lapses += 1
  } else {
    if (reps === 0) interval = 1
    else if (reps === 1) interval = 6
    else interval = Math.max(1, Math.round(interval * ease))
    reps += 1
  }

  ease = Math.max(MIN_EASE, ease + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  return { ease, interval, reps, lapses, due: addDays(today, interval) }
}

export function isDue(state: SrsState, today: string): boolean {
  return state.due <= today
}
