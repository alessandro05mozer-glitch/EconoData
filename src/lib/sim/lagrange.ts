// max x*y sujeito a px*x + py*y = m, e as curvas de nível x*y = k.

export interface LgParams {
  px: number
  py: number
  m: number
}

export function optimum({ px, py, m }: LgParams) {
  const x = m / (2 * px)
  const y = m / (2 * py)
  return { x, y, k: x * y, lambdaTimesPx: y } // no ótimo, y = lambda*px
}

/** Pontos em que a curva de nível x*y = k cruza a restrição (0, 1 ou 2 pontos). */
export function levelCrossings({ px, py, m }: LgParams, k: number): Array<{ x: number; y: number }> {
  // px*x + py*k/x = m  =>  px*x^2 - m*x + py*k = 0
  const disc = m * m - 4 * px * py * k
  if (disc < 0) return []
  const r = Math.sqrt(disc)
  const xs = r === 0 ? [m / (2 * px)] : [(m - r) / (2 * px), (m + r) / (2 * px)]
  return xs.map((x) => ({ x, y: k / x }))
}
