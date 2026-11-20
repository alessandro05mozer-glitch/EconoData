import { currentStreak, todayISO, weekStart } from './dates'
import { newSrsState, isDue, review, type Grade } from './srs'
import type { Card, CardSeed, Level, ProgressState } from './types'
import { XP } from './xp'

// Funções puras: recebem o estado e devolvem um estado novo. O store só as encadeia.

export function awardXp(
  state: ProgressState,
  amount: number,
  trackId: string | undefined,
  today: string,
): ProgressState {
  if (amount <= 0) return state
  return {
    ...state,
    xp: state.xp + amount,
    xpByTrack: trackId
      ? { ...state.xpByTrack, [trackId]: (state.xpByTrack[trackId] ?? 0) + amount }
      : state.xpByTrack,
    activity: { ...state.activity, [today]: (state.activity[today] ?? 0) + amount },
    studyDays: state.studyDays.includes(today) ? state.studyDays : [...state.studyDays, today],
  }
}

export function openLesson(state: ProgressState, lessonId: string, today: string): ProgressState {
  const prev = state.lessons[lessonId] ?? {}
  return { ...state, lessons: { ...state.lessons, [lessonId]: { ...prev, openedAt: today } } }
}

export function makeLessonCards(
  lessonId: string,
  trackId: string,
  seeds: CardSeed[],
  today: string,
): Card[] {
  return seeds.map((s, i) => ({
    ...newSrsState(today),
    id: `${lessonId}#${i}`,
    lessonId,
    trackId,
    front: s.front,
    back: s.back,
    origin: 'lesson' as const,
    createdAt: today,
  }))
}

export function addCards(state: ProgressState, cards: Card[]): ProgressState {
  const next = { ...state.cards }
  for (const c of cards) if (!next[c.id]) next[c.id] = c // não reinicia cartões que já existem
  return { ...state, cards: next }
}

export function completeLesson(
  state: ProgressState,
  lesson: { id: string; track: string; cards: CardSeed[] },
  level: Level,
  today: string,
): ProgressState {
  const prev = state.lessons[lesson.id] ?? {}
  const key = level === 'quick' ? 'quickDone' : 'fullDone'
  if (prev[key]) return state // já concluída nesta versão: sem XP repetido
  let next: ProgressState = {
    ...state,
    lessons: { ...state.lessons, [lesson.id]: { ...prev, [key]: today } },
  }
  next = awardXp(next, level === 'quick' ? XP.lessonQuick : XP.lessonFull, lesson.track, today)
  next = addCards(next, makeLessonCards(lesson.id, lesson.track, lesson.cards, today))
  return next
}

export function recordExercise(
  state: ProgressState,
  exerciseId: string,
  trackId: string,
  passed: boolean,
  today: string,
): ProgressState {
  const prev = state.exercises[exerciseId] ?? { attempts: 0, passed: false }
  const attempts = prev.attempts + 1
  let next: ProgressState = {
    ...state,
    exercises: {
      ...state.exercises,
      [exerciseId]: {
        attempts,
        passed: prev.passed || passed,
        passedAt: prev.passedAt ?? (passed ? today : undefined),
      },
    },
  }
  if (passed && !prev.passed) {
    const bonus = attempts === 1 ? XP.exerciseFirstTry : 0
    next = awardXp(next, XP.exercisePassed + bonus, trackId, today)
  }
  return next
}

/** score: de -1 a 1 (Tipo A) ou 0/1 (Tipo B). O XP paga só a melhora sobre o melhor resultado anterior. */
export function recordQuiz(
  state: ProgressState,
  quizId: string,
  trackId: string,
  score: number,
  today: string,
): ProgressState {
  const prev = state.quizzes[quizId]
  const oldBest = prev ? Math.max(0, prev.best) : 0
  const newBest = Math.max(0, score)
  let next: ProgressState = {
    ...state,
    quizzes: {
      ...state.quizzes,
      [quizId]: {
        attempts: (prev?.attempts ?? 0) + 1,
        best: prev ? Math.max(prev.best, score) : score,
        last: score,
      },
    },
  }
  const gain = Math.round(XP.quizMax * (newBest - oldBest))
  return awardXp(next, gain, trackId, today) // não paga nada se não melhorou
}

export function reviewCard(
  state: ProgressState,
  cardId: string,
  grade: Grade,
  today: string,
): ProgressState {
  const card = state.cards[cardId]
  if (!card) return state
  const srs = review(card, grade, today)
  const next: ProgressState = { ...state, cards: { ...state.cards, [cardId]: { ...card, ...srs } } }
  return awardXp(next, XP.cardReview, card.trackId, today)
}

export function dueCards(state: ProgressState, today: string): Card[] {
  return Object.values(state.cards)
    .filter((c) => isDue(c, today))
    .sort((a, b) => (a.due === b.due ? a.createdAt.localeCompare(b.createdAt) : a.due.localeCompare(b.due)))
}

export function weeklyXp(state: ProgressState, today: string): number {
  const start = weekStart(today)
  return Object.entries(state.activity)
    .filter(([day]) => day >= start && day <= today)
    .reduce((sum, [, xp]) => sum + xp, 0)
}

export function streak(state: ProgressState, today: string = todayISO()): number {
  return currentStreak(state.studyDays, today)
}

/* ---------- Conquistas (calculadas, não armazenadas) ---------- */

export interface Achievement {
  id: string
  title: string
  description: string
  unlocked: boolean
}

export function achievements(state: ProgressState, today: string): Achievement[] {
  const lessonsDone = Object.values(state.lessons).filter((l) => l.quickDone || l.fullDone).length
  const exercisesPassed = Object.values(state.exercises).filter((e) => e.passed).length
  const reviews = Object.values(state.cards).reduce((n, c) => n + c.reps + c.lapses, 0)
  const perfectQuiz = Object.values(state.quizzes).some((q) => q.best >= 1)
  const days = streak(state, today)
  return [
    { id: 'first-lesson', title: 'Primeiro passo', description: 'Conclua uma lição.', unlocked: lessonsDone >= 1 },
    { id: 'five-lessons', title: 'Ritmo de estudo', description: 'Conclua 5 lições.', unlocked: lessonsDone >= 5 },
    { id: 'first-code', title: 'Mão na massa', description: 'Passe nos testes de um exercício de código.', unlocked: exercisesPassed >= 1 },
    { id: 'ten-code', title: 'Programador em formação', description: 'Passe em 10 exercícios de código.', unlocked: exercisesPassed >= 10 },
    { id: 'perfect', title: 'Questão perfeita', description: 'Acerte todas as afirmativas de uma questão.', unlocked: perfectQuiz },
    { id: 'reviews', title: 'Memória treinada', description: 'Faça 25 revisões de cartões.', unlocked: reviews >= 25 },
    { id: 'streak3', title: 'Três dias seguidos', description: 'Estude 3 dias seguidos.', unlocked: days >= 3 },
    { id: 'streak7', title: 'Semana completa', description: 'Estude 7 dias seguidos.', unlocked: days >= 7 },
  ]
}
