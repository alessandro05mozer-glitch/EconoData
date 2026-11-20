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
