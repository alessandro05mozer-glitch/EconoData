// Demanda linear Q = a - b*P.

export interface DemandParams {
  a: number
  b: number
}

export const quantity = ({ a, b }: DemandParams, p: number) => a - b * p
export const revenue = (d: DemandParams, p: number) => p * quantity(d, p)

/** Elasticidade-preço no ponto P: (dQ/dP) * P/Q = -b*P/Q. Indefinida quando Q = 0. */
export function elasticity(d: DemandParams, p: number): number {
  const q = quantity(d, p)
  return q === 0 ? -Infinity : (-d.b * p) / q
}

/** Preço que maximiza a receita: onde |elasticidade| = 1, a/(2b). */
export const revenueMaxPrice = ({ a, b }: DemandParams) => a / (2 * b)
