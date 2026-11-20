// Escolha do consumidor com utilidade Cobb-Douglas U = x^a * y^(1-a) e orçamento px*x + py*y = m.

export interface ConsumerParams {
  alpha: number
  m: number
  px: number
  py: number
}

export function utility(alpha: number, x: number, y: number): number {
  return Math.pow(x, alpha) * Math.pow(y, 1 - alpha)
}

export function optimalBundle({ alpha, m, px, py }: ConsumerParams) {
  const x = (alpha * m) / px
  const y = ((1 - alpha) * m) / py
  return { x, y, u: utility(alpha, x, y) }
}

/** y da curva de indiferença de utilidade u, em função de x */
export function indifferenceY(alpha: number, u: number, x: number): number {
  return Math.pow(u / Math.pow(x, alpha), 1 / (1 - alpha))
}

/** y sobre a reta de orçamento */
export function budgetY({ m, px, py }: ConsumerParams, x: number): number {
  return (m - px * x) / py
}

/** Taxa marginal de substituição: UMg_x / UMg_y = (a/(1-a)) * (y/x) */
export function mrs(alpha: number, x: number, y: number): number {
  return (alpha / (1 - alpha)) * (y / x)
}
