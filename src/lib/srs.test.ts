import { describe, expect, it } from 'vitest'
import { isDue, MIN_EASE, newSrsState, review } from './srs'

const TODAY = '2026-11-20'

describe('review (SM-2)', () => {
  it('primeira revisão boa marca 1 dia, a segunda 6 dias', () => {
    const s1 = review(newSrsState(TODAY), 'good', TODAY)
    expect(s1.interval).toBe(1)
    expect(s1.due).toBe('2026-11-21')
    const s2 = review(s1, 'good', '2026-11-21')
    expect(s2.interval).toBe(6)
    expect(s2.due).toBe('2026-11-27')
  })

  it('a partir da terceira, o intervalo cresce pelo fator de facilidade', () => {
    let s = newSrsState(TODAY)
    s = review(s, 'good', TODAY)
    s = review(s, 'good', TODAY)
    const before = s
    s = review(s, 'good', TODAY)
    expect(s.interval).toBe(Math.round(before.interval * before.ease))
  })

  it('errar zera as repetições, marca 1 dia e conta uma falha', () => {
    let s = newSrsState(TODAY)
    s = review(s, 'good', TODAY)
    s = review(s, 'good', TODAY)
    s = review(s, 'again', TODAY)
    expect(s.reps).toBe(0)
    expect(s.interval).toBe(1)
    expect(s.lapses).toBe(1)
  })

  it('a facilidade nunca cai abaixo do mínimo', () => {
    let s = newSrsState(TODAY)
    for (let i = 0; i < 30; i++) s = review(s, 'again', TODAY)
    expect(s.ease).toBeGreaterThanOrEqual(MIN_EASE)
  })

  it('"fácil" aumenta a facilidade e "difícil" diminui', () => {
    const base = newSrsState(TODAY)
    expect(review(base, 'easy', TODAY).ease).toBeGreaterThan(base.ease)
    expect(review(base, 'hard', TODAY).ease).toBeLessThan(base.ease)
  })
})

describe('isDue', () => {
  it('vence no dia marcado e depois', () => {
    const s = { ...newSrsState(TODAY), due: '2026-11-20' }
    expect(isDue(s, '2026-11-19')).toBe(false)
    expect(isDue(s, '2026-11-20')).toBe(true)
    expect(isDue(s, '2026-11-25')).toBe(true)
  })
})
