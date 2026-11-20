// Firma competitiva com custo C(q) = F + c*q + d*q^2 (d > 0).

export interface FirmParams {
  F: number
  c: number
  d: number
}

export const cost = ({ F, c, d }: FirmParams, q: number) => F + c * q + d * q * q
export const marginalCost = ({ c, d }: FirmParams, q: number) => c + 2 * d * q
export const avgCost = (f: FirmParams, q: number) => cost(f, q) / q
export const avgVariableCost = ({ c, d }: FirmParams, q: number) => c + d * q

/** Quantidade que maximiza o lucro ao preço p: p = CMg, ou zero se p não cobre o custo variável */
export function optimalQuantity(f: FirmParams, p: number): number {
  return Math.max(0, (p - f.c) / (2 * f.d))
}

export function profit(f: FirmParams, p: number, q: number): number {
  return p * q - cost(f, q)
}

/** Escala eficiente (CMe mínimo) e o custo médio mínimo, que é o preço de longo prazo. */
export function minAverageCost({ F, c, d }: FirmParams) {
  const q = Math.sqrt(F / d)
  return { q, ac: c + 2 * Math.sqrt(F * d) }
}
