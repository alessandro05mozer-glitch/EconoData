import { describe, expect, it } from 'vitest'
import { scoreProva, scoreTipoA, scoreTipoB } from './anpec'

// Os três exemplos abaixo vêm do Manual do Candidato do Exame ANPEC 2027.
describe('scoreTipoA', () => {
  it('exemplo (a): +1 -1 +1 0 +1 = 2, NI = 5, RQ = 2/5 = 0,40', () => {
    // O manual imprime "RQ = +2/5 = +0,20", mas 2/5 é 0,40. Os passos 1 e 2 do próprio
    // exemplo (pontos = 2, NI = 5) e a fórmula RQ = (C - E)/NI dão 0,40; o 0,20 é erro de digitação.
    const key = [true, true, false, false, true].map((correct) => ({ correct }))
    const s = scoreTipoA(key, [true, false, false, null, true])
    expect(s.points).toBe(2)
    expect(s.valid).toBe(5)
    expect(s.rq).toBeCloseTo(0.4)
  })

  it('exemplo (b): item anulado sai da conta, NI = 4, RQ = 0,25', () => {
    const key = [
      { correct: true },
      { correct: true, annulled: true },
      { correct: false },
      { correct: false },
      { correct: true },
    ]
    const s = scoreTipoA(key, [true, false, false, null, false])
    expect(s.points).toBe(1)
    expect(s.valid).toBe(4)
    expect(s.rq).toBeCloseTo(0.25)
    expect(s.perItem[1]).toBe('annulled')
  })

  it('exemplo (c): tudo errado dá RQ = -1', () => {
    const key = [true, true, false, false, true].map((correct) => ({ correct }))
    const s = scoreTipoA(key, [false, false, true, true, false])
    expect(s.rq).toBeCloseTo(-1)
  })

  it('tudo em branco dá zero', () => {
    const key = [true, false].map((correct) => ({ correct }))
    expect(scoreTipoA(key, [null, null]).rq).toBe(0)
  })

  it('recusa gabarito e respostas de tamanhos diferentes', () => {
    expect(() => scoreTipoA([{ correct: true }], [true, false])).toThrow()
  })
})

describe('scoreTipoB', () => {
  it('acerto vale 1, erro e branco valem 0', () => {
    expect(scoreTipoB(8, 8).rq).toBe(1)
    expect(scoreTipoB(8, 9).rq).toBe(0)
    expect(scoreTipoB(8, null).rq).toBe(0)
  })

  it('aceita o gabarito 0 (resposta 00)', () => {
    expect(scoreTipoB(0, 0).rq).toBe(1)
  })

  it('recusa gabarito fora de 0 a 99', () => {
    expect(() => scoreTipoB(100, 1)).toThrow()
    expect(() => scoreTipoB(1.5, 1)).toThrow()
  })
})

describe('scoreProva', () => {
  it('soma os resultados das questões', () => {
    expect(scoreProva([1, 0.2, -1, 0.25])).toBeCloseTo(0.45)
  })
})
