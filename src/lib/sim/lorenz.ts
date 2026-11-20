// Curva de Lorenz paramétrica L(p) = p^k (k ≥ 1). Gini = (k − 1)/(k + 1).
export const lorenz = (p: number, k: number) => Math.pow(p, k)
export const gini = (k: number) => (k - 1) / (k + 1)
/** Parcela da renda recebida pelos `share` mais ricos. */
export const topShare = (share: number, k: number) => 1 - lorenz(1 - share, k)
/** Gini numérico por trapézios, para conferir a fórmula. */
export function giniNumeric(k: number, n = 2000): number {
  let area = 0
  for (let i = 0; i < n; i++) area += (lorenz(i / n, k) + lorenz((i + 1) / n, k)) / 2 / n
  return 1 - 2 * area
}
