import { describe, expect, it } from 'vitest'
import { budgetY, indifferenceY, mrs, optimalBundle, utility } from './consumer'
import { SUMS, rng, roll, theoretical } from './dice'
import { elasticity, revenue, revenueMaxPrice } from './elasticity'
import { avgCost, cost, marginalCost, minAverageCost, optimalQuantity, profit } from './firm'
import { levelCrossings, optimum } from './lagrange'
import { solve2x2 } from './linear'

describe('consumidor Cobb-Douglas', () => {
  const p = { alpha: 0.4, m: 120, px: 4, py: 3 }
  it('demandas e orçamento', () => {
    const o = optimalBundle(p)
    expect(o.x).toBeCloseTo(12)
    expect(o.y).toBeCloseTo(24)
    expect(p.px * o.x + p.py * o.y).toBeCloseTo(p.m)
  })
  it('no ótimo a TMS iguala a razão de preços e a curva de indiferença passa pela cesta', () => {
    const o = optimalBundle(p)
    expect(mrs(p.alpha, o.x, o.y)).toBeCloseTo(p.px / p.py)
    expect(indifferenceY(p.alpha, o.u, o.x)).toBeCloseTo(o.y)
    expect(budgetY(p, o.x)).toBeCloseTo(o.y)
  })
  it('nenhuma outra cesta do orçamento dá utilidade maior', () => {
    const o = optimalBundle(p)
    for (let x = 1; x < 29; x += 0.5) expect(utility(p.alpha, x, budgetY(p, x))).toBeLessThanOrEqual(o.u + 1e-9)
  })
})

describe('firma', () => {
  const f = { F: 36, c: 10, d: 1 }
  it('p=30: q=10, lucro 64', () => {
    const q = optimalQuantity(f, 30)
    expect(q).toBe(10)
    expect(profit(f, 30, q)).toBe(64)
    expect(marginalCost(f, q)).toBe(30)
  })
  it('custo médio mínimo em q=6 vale 22 e CMg=CMe aí', () => {
    const m = minAverageCost(f)
    expect(m.q).toBe(6)
    expect(m.ac).toBe(22)
    expect(marginalCost(f, 6)).toBe(avgCost(f, 6))
    expect(cost(f, 6)).toBe(132)
  })
  it('abaixo do custo variável mínimo não produz e perde o custo fixo', () => {
    expect(optimalQuantity(f, 5)).toBe(0)
    expect(profit(f, 5, 0)).toBe(-36)
  })
})

describe('Lagrange', () => {
  const p = { px: 2, py: 1, m: 20 }
  it('ótimo de max xy s.a. 2x+y=20 é (5,10) com k=50', () => {
    const o = optimum(p)
    expect([o.x, o.y, o.k]).toEqual([5, 10, 50])
  })
  it('curvas de nível: duas interseções abaixo de k*, uma em k*, nenhuma acima', () => {
    expect(levelCrossings(p, 30)).toHaveLength(2)
    expect(levelCrossings(p, 50)).toHaveLength(1)
    expect(levelCrossings(p, 60)).toHaveLength(0)
    for (const pt of levelCrossings(p, 30)) {
      expect(p.px * pt.x + p.py * pt.y).toBeCloseTo(p.m)
      expect(pt.x * pt.y).toBeCloseTo(30)
    }
  })
})

describe('sistema linear 2x2', () => {
  it('solução única', () => {
    const r = solve2x2({ a: 2, b: 1, c: 7 }, { a: 1, b: 3, c: 9 })
    expect(r.kind).toBe('unica')
    if (r.kind === 'unica') {
      expect(r.x).toBeCloseTo(2.4)
      expect(r.y).toBeCloseTo(2.2)
      expect(r.det).toBe(5)
    }
  })
  it('paralelas e coincidentes', () => {
    expect(solve2x2({ a: 1, b: 2, c: 3 }, { a: 2, b: 4, c: 7 }).kind).toBe('nenhuma')
    expect(solve2x2({ a: 1, b: 2, c: 3 }, { a: 2, b: 4, c: 6 }).kind).toBe('infinitas')
  })
})

describe('dois dados', () => {
  it('distribuição teórica soma 1 e a soma 7 vale 1/6', () => {
    const t = theoretical()
    expect(SUMS.reduce((s, k) => s + t[k], 0)).toBeCloseTo(1)
    expect(t[7]).toBeCloseTo(1 / 6)
    expect(t[2]).toBeCloseTo(1 / 36)
  })
  it('o gerador é reproduzível e os dados ficam entre 1 e 6', () => {
    const a = rng(42)
    const b = rng(42)
    for (let i = 0; i < 100; i++) {
      const x = roll(a)
      expect(x).toBe(roll(b))
      expect(x).toBeGreaterThanOrEqual(1)
      expect(x).toBeLessThanOrEqual(6)
    }
  })
  it('a frequência da soma 7 em muitas rodadas fica perto de 1/6', () => {
    const r = rng(7)
    let n7 = 0
    const N = 60000
    for (let i = 0; i < N; i++) if (roll(r) + roll(r) === 7) n7++
    expect(Math.abs(n7 / N - 1 / 6)).toBeLessThan(0.01)
  })
})

describe('elasticidade da demanda linear', () => {
  const d = { a: 100, b: 2 }
  it('em P=30 vale -1,5 e em P=25 vale -1 (receita máxima)', () => {
    expect(elasticity(d, 30)).toBeCloseTo(-1.5)
    expect(elasticity(d, 25)).toBeCloseTo(-1)
    expect(revenueMaxPrice(d)).toBe(25)
  })
  it('a receita é máxima em P=25', () => {
    for (const p of [10, 20, 24, 26, 30, 40]) expect(revenue(d, p)).toBeLessThan(revenue(d, 25))
  })
})

import { IPCA_ANUAL, ipcaAccumulated, purchasingPower, correctedValue } from '../data/brasil'
import { competitiveQ, deadweightLoss, lerner, monopolyPrice, monopolyProfit, monopolyQ, marginalRevenue, demandP } from './monopoly'
import { pureNash, socialOptimum, type Payoffs } from './game'
import { compound, doublingTime, realRateApprox, realRateExact, rule70 } from './fisher'
import { histogram, sampleMeans } from './clt'
import { ols } from './ols'
import { equilibrium, isCurveI, lmCurveI } from './islm'
import { gini, giniNumeric, topShare } from './lorenz'

describe('IPCA real', () => {
  it('séries conferidas', () => {
    expect(IPCA_ANUAL[2024]).toBe(4.83)
    expect(IPCA_ANUAL[2021]).toBe(10.06)
    expect(Object.keys(IPCA_ANUAL).length).toBe(32)
  })
  it('acumulado compõe as taxas', () => {
    expect(ipcaAccumulated(2023, 2024)).toBeCloseTo((1.0462 * 1.0483 - 1) * 100, 6)
    expect(ipcaAccumulated(2024, 2024)).toBeCloseTo(4.83)
    expect(ipcaAccumulated(2025, 2024)).toBe(0)
  })
  it('poder de compra é o inverso da correção', () => {
    expect(purchasingPower(1995, 2025) * (correctedValue(1995, 2025) / 100)).toBeCloseTo(100)
    expect(correctedValue(1995, 2025)).toBeGreaterThan(400)
  })
})

describe('monopólio', () => {
  const m = { a: 100, b: 1, c: 20 }
  it('RMg = CMg em Qm=40, P=60, lucro 1600', () => {
    expect(monopolyQ(m)).toBe(40)
    expect(marginalRevenue(m, 40)).toBe(20)
    expect(monopolyPrice(m)).toBe(60)
    expect(monopolyProfit(m)).toBe(1600)
  })
  it('concorrência: P = CMg em Q=80; peso morto 800; Lerner = 1/|ε|', () => {
    expect(competitiveQ(m)).toBe(80)
    expect(demandP(m, 80)).toBe(20)
    expect(deadweightLoss(m)).toBe(800)
    const eps = (1 / m.b) * (monopolyPrice(m) / monopolyQ(m))
    expect(lerner(m)).toBeCloseTo(1 / eps)
  })
})

describe('teoria dos jogos', () => {
  const pd: Payoffs = [[[-1, -1], [-3, 0]], [[0, -3], [-2, -2]]]
  it('dilema dos prisioneiros: único Nash (confessar, confessar), ótimo social é cooperar', () => {
    expect(pureNash(pd)).toEqual([[1, 1]])
    expect(socialOptimum(pd)).toEqual([0, 0])
  })
  const coord: Payoffs = [[[2, 2], [0, 0]], [[0, 0], [1, 1]]]
  it('coordenação tem dois equilíbrios', () => {
    expect(pureNash(coord)).toEqual([[0, 0], [1, 1]])
  })
  const mp: Payoffs = [[[1, -1], [-1, 1]], [[-1, 1], [1, -1]]]
  it('par ou ímpar não tem equilíbrio em estratégias puras', () => {
    expect(pureNash(mp)).toEqual([])
  })
})

describe('Fisher e crescimento', () => {
  it('juro real exato e aproximação', () => {
    expect(realRateExact(15, 5)).toBeCloseTo(9.5238, 3)
    expect(realRateApprox(15, 5)).toBe(10)
    expect(realRateExact(10, 10)).toBeCloseTo(0)
  })
  it('regra dos 70 e duplicação exata', () => {
    expect(doublingTime(7)).toBeCloseTo(10.245, 2)
    expect(rule70(7)).toBe(10)
    expect(compound(100, 7, doublingTime(7))).toBeCloseTo(200)
  })
})

describe('TCL', () => {
  it('médias de n=30 têm média ≈ 1 e desvio ≈ 1/√30', () => {
    const xs = sampleMeans(30, 2000, 7)
    const mean = xs.reduce((a, b) => a + b, 0) / xs.length
    const sd = Math.sqrt(xs.reduce((a, b) => a + (b - mean) ** 2, 0) / xs.length)
    expect(mean).toBeCloseTo(1, 1)
    expect(sd).toBeCloseTo(1 / Math.sqrt(30), 1)
  })
  it('histograma conserva a contagem dentro do intervalo', () => {
    const h = histogram([0.1, 0.2, 0.9, 5], 0, 1, 2)
    expect(h).toEqual([2, 1])
  })
})

describe('MQO', () => {
  it('reta exata', () => {
    const f = ols([{ x: 0, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 5 }])!
    expect(f.a).toBeCloseTo(1)
    expect(f.b).toBeCloseTo(2)
    expect(f.r2).toBeCloseTo(1)
  })
  it('resíduos somam zero e x constante é indefinido', () => {
    const pts = [{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 4 }, { x: 4, y: 3 }]
    const f = ols(pts)!
    expect(pts.reduce((s, p) => s + (p.y - f.a - f.b * p.x), 0)).toBeCloseTo(0)
    expect(ols([{ x: 1, y: 1 }, { x: 1, y: 2 }])).toBeNull()
  })
})

describe('IS–LM', () => {
  const p = { c0: 100, c: 0.75, T: 80, I0: 150, b: 20, G: 100, k: 0.5, h: 25, MP: 200 }
  it('o equilíbrio está nas duas curvas', () => {
    const { Y, i } = equilibrium(p)
    expect(isCurveI(p, Y)).toBeCloseTo(i)
    expect(lmCurveI(p, Y)).toBeCloseTo(i)
  })
  it('mais gasto público aumenta Y e i; mais moeda aumenta Y e reduz i', () => {
    const base = equilibrium(p)
    const fiscal = equilibrium({ ...p, G: p.G + 20 })
    const monet = equilibrium({ ...p, MP: p.MP + 50 })
    expect(fiscal.Y).toBeGreaterThan(base.Y)
    expect(fiscal.i).toBeGreaterThan(base.i)
    expect(monet.Y).toBeGreaterThan(base.Y)
    expect(monet.i).toBeLessThan(base.i)
  })
})

describe('Lorenz e Gini', () => {
  it('fórmula fechada confere com a integral numérica', () => {
    for (const k of [1, 1.5, 2, 3.4]) expect(giniNumeric(k)).toBeCloseTo(gini(k), 3)
  })
  it('igualdade perfeita e parcela do topo', () => {
    expect(gini(1)).toBe(0)
    expect(topShare(0.1, 1)).toBeCloseTo(0.1)
    expect(topShare(0.1, 3)).toBeGreaterThan(0.25)
  })
})
