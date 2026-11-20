import { describe, expect, it } from 'vitest'
import { solveSupplyDemand } from './supplyDemand'

const base = { a: 100, b: 2, d: 3, p0: 5, t: 0 }

describe('solveSupplyDemand', () => {
  it('equilíbrio sem imposto: P* = (a + d*p0)/(b + d)', () => {
    const r = solveSupplyDemand(base)
    expect(r.pStar).toBeCloseTo((100 + 15) / 5) // 23
    expect(r.qStar).toBeCloseTo(100 - 2 * 23) // 54
    // oferta e demanda dão a mesma quantidade no equilíbrio
    expect(3 * (r.pStar - 5)).toBeCloseTo(r.qStar)
  })

  it('sem imposto, não há perda de peso morto nem arrecadação', () => {
    const r = solveSupplyDemand(base)
    expect(r.deadweightLoss).toBeCloseTo(0)
    expect(r.revenue).toBeCloseTo(0)
    expect(r.cs).toBeCloseTo(r.cs0)
    expect(r.ps).toBeCloseTo(r.ps0)
  })

  it('imposto: comprador paga mais, vendedor recebe menos, quantidade cai', () => {
    const r = solveSupplyDemand({ ...base, t: 5 })
    expect(r.pBuyer).toBeGreaterThan(r.pStar)
    expect(r.pSeller).toBeLessThan(r.pStar)
    expect(r.pBuyer - r.pSeller).toBeCloseTo(5)
    expect(r.qTax).toBeLessThan(r.qStar)
  })

  it('o bem-estar total se conserva: CS0 + PS0 = CS + PS + arrecadação + perda de peso morto', () => {
    for (const t of [0, 1, 3, 8, 15]) {
      const r = solveSupplyDemand({ ...base, t })
      expect(r.cs + r.ps + r.revenue + r.deadweightLoss).toBeCloseTo(r.cs0 + r.ps0, 6)
    }
  })

  it('a perda de peso morto cresce com o quadrado do imposto', () => {
    const d1 = solveSupplyDemand({ ...base, t: 2 }).deadweightLoss
    const d2 = solveSupplyDemand({ ...base, t: 4 }).deadweightLoss
    expect(d2 / d1).toBeCloseTo(4, 6)
  })

  it('quem tem a curva menos elástica arca com mais do imposto', () => {
    // demanda mais inclinada em quantidade (b menor) = menos elástica: comprador paga mais
    const r = solveSupplyDemand({ a: 100, b: 1, d: 5, p0: 0, t: 6 })
    expect(r.pBuyer - r.pStar).toBeGreaterThan(r.pStar - r.pSeller)
  })

  it('elasticidades no equilíbrio', () => {
    const r = solveSupplyDemand(base)
    expect(r.elasticityDemand).toBeCloseTo((-2 * 23) / 54)
    expect(r.elasticitySupply).toBeCloseTo((3 * 23) / 54)
  })

  it('recusa inclinações não positivas', () => {
    expect(() => solveSupplyDemand({ ...base, b: 0 })).toThrow()
    expect(() => solveSupplyDemand({ ...base, d: -1 })).toThrow()
  })
})
