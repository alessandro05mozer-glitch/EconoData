// Modelo linear de oferta e demanda com imposto unitário sobre o vendedor.
//
//   Demanda:  Q = a - b*P         (a > 0, b > 0)
//   Oferta:   Q = d*(P - p0)      (d > 0, p0 >= 0): ninguém oferta abaixo de p0
//
// Equilíbrio sem imposto:  P* = (a + d*p0) / (b + d),  Q* = a - b*P*
//
// Com imposto t por unidade, o consumidor paga Pb e o vendedor recebe Ps = Pb - t:
//   a - b*Pb = d*(Pb - t - p0)  =>  Pb = (a + d*(p0 + t)) / (b + d)

export interface SdParams {
  a: number
  b: number
  d: number
  p0: number
  t: number
}

export interface SdResult {
  pStar: number
  qStar: number
  pBuyer: number
  pSeller: number
  qTax: number
  /** Excedente do consumidor sem imposto */
  cs0: number
  /** Excedente do produtor sem imposto */
  ps0: number
  cs: number
  ps: number
  revenue: number
  deadweightLoss: number
  /** Elasticidade-preço da demanda no equilíbrio sem imposto (negativa) */
  elasticityDemand: number
  /** Elasticidade-preço da oferta no equilíbrio sem imposto */
  elasticitySupply: number
  /** Preço máximo que o consumidor aceitaria pagar (Q = 0) */
  pMax: number
}

export function solveSupplyDemand({ a, b, d, p0, t }: SdParams): SdResult {
  if (b <= 0 || d <= 0) throw new Error('As inclinações b e d precisam ser positivas.')
  const pStar = (a + d * p0) / (b + d)
  const qStar = a - b * pStar
  const pBuyer = (a + d * (p0 + t)) / (b + d)
  const pSeller = pBuyer - t
  const qTax = Math.max(0, a - b * pBuyer)
  const pMax = a / b

  const cs0 = 0.5 * (pMax - pStar) * qStar
  const ps0 = 0.5 * (pStar - p0) * qStar
  const cs = 0.5 * (pMax - pBuyer) * qTax
  const ps = 0.5 * (pSeller - p0) * qTax
  const revenue = t * qTax
  const deadweightLoss = 0.5 * t * (qStar - qTax)

  return {
    pStar,
    qStar,
    pBuyer,
    pSeller,
    qTax,
    cs0,
    ps0,
    cs,
    ps,
    revenue,
    deadweightLoss,
    elasticityDemand: (-b * pStar) / qStar,
    elasticitySupply: (d * pStar) / qStar,
    pMax,
  }
}
