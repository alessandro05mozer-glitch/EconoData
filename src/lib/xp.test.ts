import { describe, expect, it } from 'vitest'
import { currentStreak, diffDays, weekStart } from './dates'
import { levelFromXp, xpForLevel } from './xp'

describe('levelFromXp', () => {
  it('limiares: 0, 100, 300, 600', () => {
    expect(xpForLevel(1)).toBe(0)
    expect(xpForLevel(2)).toBe(100)
    expect(xpForLevel(3)).toBe(300)
    expect(xpForLevel(4)).toBe(600)
  })

  it('classifica nas fronteiras', () => {
    expect(levelFromXp(0).level).toBe(1)
    expect(levelFromXp(99).level).toBe(1)
    expect(levelFromXp(100).level).toBe(2)
    expect(levelFromXp(299).level).toBe(2)
    expect(levelFromXp(300).level).toBe(3)
    expect(levelFromXp(599).level).toBe(3)
    expect(levelFromXp(600).level).toBe(4)
  })

  it('progresso dentro do nível vai de 0 a 1', () => {
    const l = levelFromXp(200)
    expect(l.level).toBe(2)
    expect(l.xpIntoLevel).toBe(100)
    expect(l.xpForNext).toBe(200)
    expect(l.progress).toBeCloseTo(0.5)
  })

  it('XP negativo é tratado como zero', () => {
    expect(levelFromXp(-50).level).toBe(1)
  })

  it('é monótono em uma faixa grande', () => {
    let prev = 1
    for (let xp = 0; xp <= 20000; xp += 7) {
      const { level } = levelFromXp(xp)
      expect(level).toBeGreaterThanOrEqual(prev)
      prev = level
    }
  })
})

describe('datas e sequência', () => {
  it('diffDays e weekStart', () => {
    expect(diffDays('2026-11-20', '2026-11-18')).toBe(2)
    expect(weekStart('2026-11-20')).toBe('2026-11-16') // sexta -> segunda
    expect(weekStart('2026-11-16')).toBe('2026-11-16')
    expect(weekStart('2026-11-22')).toBe('2026-11-16') // domingo
  })

  it('sequência conta dias seguidos até hoje ou ontem', () => {
    const days = ['2026-11-17', '2026-11-18', '2026-11-19', '2026-11-20']
    expect(currentStreak(days, '2026-11-20')).toBe(4)
    expect(currentStreak(days, '2026-11-21')).toBe(4) // ainda vale se estudou ontem
    expect(currentStreak(days, '2026-11-22')).toBe(0) // quebrou
  })

  it('um buraco interrompe a contagem', () => {
    expect(currentStreak(['2026-11-15', '2026-11-19', '2026-11-20'], '2026-11-20')).toBe(2)
  })

  it('sem dias de estudo, a sequência é zero', () => {
    expect(currentStreak([], '2026-11-20')).toBe(0)
  })
})
