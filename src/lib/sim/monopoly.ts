// Monopólio com demanda linear P = a − bQ e custo marginal constante c.
export interface Mono { a: number; b: number; c: number }

export const demandP = (m: Mono, q: number) => m.a - m.b * q
export const marginalRevenue = (m: Mono, q: number) => m.a - 2 * m.b * q

/** Quantidade que iguala RMg e CMg (zero se c ≥ a). */
export function monopolyQ(m: Mono): number {
  return Math.max(0, (m.a - m.c) / (2 * m.b))
}
export function competitiveQ(m: Mono): number {
  return Math.max(0, (m.a - m.c) / m.b)
}
export function monopolyPrice(m: Mono): number {
  return demandP(m, monopolyQ(m))
}
export function monopolyProfit(m: Mono): number {
  const q = monopolyQ(m)
  return (demandP(m, q) - m.c) * q
}
/** Perda de peso morto: triângulo entre a demanda e o CMg, de Qm a Qc. */
export function deadweightLoss(m: Mono): number {
  return 0.5 * (competitiveQ(m) - monopolyQ(m)) * (monopolyPrice(m) - m.c)
}
/** Índice de Lerner: (P − CMg)/P. Igual a 1/|elasticidade| no ótimo. */
export function lerner(m: Mono): number {
  const p = monopolyPrice(m)
  return p > 0 ? (p - m.c) / p : 0
}
