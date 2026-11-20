import { create } from 'zustand'
import { todayISO } from './dates'
import * as P from './progress'
import { LocalAdapter, type StorageAdapter } from './storage'
import { newSrsState } from './srs'
import type { Card, CardSeed, Level, ProgressState, Settings } from './types'
import { emptyProgress } from './types'
import type { Grade } from './srs'

// Para ligar login e banco depois, troque `adapter` por outra implementação de StorageAdapter.
const adapter: StorageAdapter = new LocalAdapter()

interface Store {
  ready: boolean
  p: ProgressState
  init(): Promise<void>
  openLesson(lessonId: string): void
  completeLesson(lesson: { id: string; track: string; cards: CardSeed[] }, level: Level): void
  recordExercise(exerciseId: string, trackId: string, passed: boolean): void
  recordQuiz(quizId: string, trackId: string, score: number): void
  addErrorCards(cards: Array<Pick<Card, 'id' | 'lessonId' | 'trackId' | 'front' | 'back'>>): void
  reviewCard(cardId: string, grade: Grade): void
  setSettings(s: Partial<Settings>): void
  replaceAll(state: ProgressState): void
  reset(): void
}

let saveTimer: ReturnType<typeof setTimeout> | undefined

export const useStore = create<Store>((set, get) => {
  const apply = (fn: (s: ProgressState) => ProgressState) => {
    set((st) => ({ p: fn(st.p) }))
    scheduleSave()
  }
  const scheduleSave = () => {
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(flush, 400)
  }
  const flush = () => {
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = undefined
    const { ready, p } = get()
    if (ready) void adapter.save(p)
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('pagehide', flush)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flush()
    })
  }

  return {
    ready: false,
    p: emptyProgress(),
    async init() {
      if (get().ready) return
      const loaded = await adapter.load()
      set({ p: loaded, ready: true })
    },
    openLesson: (id) => apply((s) => P.openLesson(s, id, todayISO())),
    completeLesson: (lesson, level) => apply((s) => P.completeLesson(s, lesson, level, todayISO())),
    recordExercise: (id, track, passed) => apply((s) => P.recordExercise(s, id, track, passed, todayISO())),
    recordQuiz: (id, track, score) => apply((s) => P.recordQuiz(s, id, track, score, todayISO())),
    addErrorCards: (cards) =>
      apply((s) =>
        P.addCards(
          s,
          cards.map((c) => ({
            ...newSrsState(todayISO()),
            ...c,
            origin: 'error' as const,
            createdAt: todayISO(),
          })),
        ),
      ),
    reviewCard: (id, grade) => apply((s) => P.reviewCard(s, id, grade, todayISO())),
    setSettings: (partial) => apply((s) => ({ ...s, settings: { ...s.settings, ...partial } })),
    replaceAll: (state) => apply(() => state),
    reset: () => apply(() => emptyProgress()),
  }
})
