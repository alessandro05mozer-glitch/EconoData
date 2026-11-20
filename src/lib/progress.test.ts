import { describe, expect, it } from 'vitest'
import {
  achievements,
  awardXp,
  completeLesson,
  dueCards,
  recordExercise,
  recordQuiz,
  reviewCard,
  weeklyXp,
} from './progress'
import { emptyProgress } from './types'
import { parseImport, exportProgress, migrate } from './storage'
import { XP } from './xp'

const D1 = '2026-11-20' // sexta
const D2 = '2026-11-21'
const lesson = {
  id: 'sql-01',
  track: 'sql',
  cards: [
    { front: 'Q1', back: 'A1' },
    { front: 'Q2', back: 'A2' },
  ],
}

describe('awardXp', () => {
  it('soma XP, atribui à trilha e marca o dia de estudo', () => {
    const s = awardXp(emptyProgress(), 30, 'sql', D1)
    expect(s.xp).toBe(30)
    expect(s.xpByTrack.sql).toBe(30)
    expect(s.activity[D1]).toBe(30)
    expect(s.studyDays).toEqual([D1])
  })

  it('XP zero não muda nada', () => {
    const s0 = emptyProgress()
    expect(awardXp(s0, 0, 'sql', D1)).toBe(s0)
  })

  it('não duplica o dia de estudo', () => {
    let s = awardXp(emptyProgress(), 10, 'sql', D1)
    s = awardXp(s, 10, 'sql', D1)
    expect(s.studyDays).toEqual([D1])
    expect(s.activity[D1]).toBe(20)
  })
})

describe('completeLesson', () => {
  it('paga XP uma única vez por versão e cria os cartões de revisão', () => {
    let s = completeLesson(emptyProgress(), lesson, 'quick', D1)
    expect(s.xp).toBe(XP.lessonQuick)
    expect(Object.keys(s.cards)).toHaveLength(2)
    expect(s.cards['sql-01#0'].trackId).toBe('sql')

    const again = completeLesson(s, lesson, 'quick', D2)
    expect(again.xp).toBe(XP.lessonQuick) // sem XP repetido
    s = completeLesson(s, lesson, 'full', D2)
    expect(s.xp).toBe(XP.lessonQuick + XP.lessonFull)
  })

  it('não reinicia cartões que já existem', () => {
    let s = completeLesson(emptyProgress(), lesson, 'quick', D1)
    s = reviewCard(s, 'sql-01#0', 'good', D1)
    const before = s.cards['sql-01#0']
    s = completeLesson(s, lesson, 'full', D2)
    expect(s.cards['sql-01#0']).toEqual(before)
  })
})

describe('recordExercise', () => {
  it('paga ao passar pela primeira vez, com bônus se foi de primeira', () => {
    const s = recordExercise(emptyProgress(), 'ex1', 'sql', true, D1)
    expect(s.xp).toBe(XP.exercisePassed + XP.exerciseFirstTry)
    expect(s.exercises.ex1).toEqual({ attempts: 1, passed: true, passedAt: D1 })
  })

  it('sem bônus se passou na segunda tentativa, e não paga de novo depois', () => {
    let s = recordExercise(emptyProgress(), 'ex1', 'sql', false, D1)
    expect(s.xp).toBe(0)
    s = recordExercise(s, 'ex1', 'sql', true, D1)
    expect(s.xp).toBe(XP.exercisePassed)
    s = recordExercise(s, 'ex1', 'sql', true, D2)
    expect(s.xp).toBe(XP.exercisePassed)
    expect(s.exercises.ex1.attempts).toBe(3)
  })
})

describe('recordQuiz', () => {
  it('paga proporcional ao resultado e depois só a melhora', () => {
    let s = recordQuiz(emptyProgress(), 'q1', 'micro', 0.5, D1)
    expect(s.xp).toBe(10)
    s = recordQuiz(s, 'q1', 'micro', 0.5, D1)
    expect(s.xp).toBe(10) // repetir o mesmo resultado não paga
    s = recordQuiz(s, 'q1', 'micro', 1, D1)
    expect(s.xp).toBe(20) // paga só os 10 que faltavam
    s = recordQuiz(s, 'q1', 'micro', -0.5, D1)
    expect(s.xp).toBe(20) // piorar não tira XP
    expect(s.quizzes.q1.best).toBe(1)
    expect(s.quizzes.q1.attempts).toBe(4)
  })

  it('resultado negativo não rende XP', () => {
    const s = recordQuiz(emptyProgress(), 'q1', 'micro', -1, D1)
    expect(s.xp).toBe(0)
    expect(s.quizzes.q1.best).toBe(-1)
  })
})

describe('revisão de cartões', () => {
  it('cartões novos vencem hoje; depois de revisar, saem da fila', () => {
    let s = completeLesson(emptyProgress(), lesson, 'quick', D1)
    expect(dueCards(s, D1)).toHaveLength(2)
    s = reviewCard(s, 'sql-01#0', 'good', D1)
    expect(dueCards(s, D1)).toHaveLength(1)
    expect(dueCards(s, D2)).toHaveLength(2) // o revisado volta amanhã
  })

  it('revisar rende XP para a trilha do cartão', () => {
    let s = completeLesson(emptyProgress(), lesson, 'quick', D1)
    const before = s.xpByTrack.sql
    s = reviewCard(s, 'sql-01#0', 'easy', D1)
    expect(s.xpByTrack.sql).toBe(before + XP.cardReview)
  })

  it('cartão inexistente não muda o estado', () => {
    const s0 = emptyProgress()
    expect(reviewCard(s0, 'nada', 'good', D1)).toBe(s0)
  })
})

describe('meta semanal e conquistas', () => {
  it('soma só o XP da semana corrente (segunda a hoje)', () => {
    let s = awardXp(emptyProgress(), 40, 'sql', '2026-11-13') // semana anterior
    s = awardXp(s, 50, 'sql', '2026-11-16') // segunda
    s = awardXp(s, 25, 'sql', D1)
    expect(weeklyXp(s, D1)).toBe(75)
  })

  it('conquistas destravam pelo progresso', () => {
    const none = achievements(emptyProgress(), D1)
    expect(none.every((a) => !a.unlocked)).toBe(true)
    const s = completeLesson(emptyProgress(), lesson, 'quick', D1)
    expect(achievements(s, D1).find((a) => a.id === 'first-lesson')?.unlocked).toBe(true)
  })
})

describe('backup', () => {
  it('exporta e importa sem perder nada', () => {
    let s = completeLesson(emptyProgress(), lesson, 'full', D1)
    s = recordQuiz(s, 'q1', 'micro', 1, D1)
    const back = parseImport(exportProgress(s))
    expect(back).toEqual(s)
  })

  it('recusa arquivo que não é backup do EconoData', () => {
    expect(() => parseImport('não é json')).toThrow()
    expect(() => parseImport(JSON.stringify({ app: 'outro', state: {} }))).toThrow()
  })

  it('migrate devolve estado vazio para dados desconhecidos', () => {
    expect(migrate(null)).toEqual(emptyProgress())
    expect(migrate({ version: 99 })).toEqual(emptyProgress())
  })
})
