// Jogo 2×2 em forma normal. Cada célula é [pagamento do jogador de linha, pagamento do de coluna].
export type Payoffs = [[ [number, number], [number, number] ], [ [number, number], [number, number] ]]

/** Melhor resposta (índices de linha) do jogador de linha, dada a coluna escolhida pelo outro. */
export function rowBest(p: Payoffs, col: 0 | 1): number[] {
  const a = p[0][col][0]
  const b = p[1][col][0]
  return a > b ? [0] : b > a ? [1] : [0, 1]
}
export function colBest(p: Payoffs, row: 0 | 1): number[] {
  const a = p[row][0][1]
  const b = p[row][1][1]
  return a > b ? [0] : b > a ? [1] : [0, 1]
}
/** Equilíbrios de Nash em estratégias puras: pares (linha, coluna) em que cada um responde otimamente ao outro. */
export function pureNash(p: Payoffs): [number, number][] {
  const out: [number, number][] = []
  for (const r of [0, 1] as const)
    for (const c of [0, 1] as const)
      if (rowBest(p, c).includes(r) && colBest(p, r).includes(c)) out.push([r, c])
  return out
}
/** Soma dos pagamentos máxima entre as células (o ótimo social). */
export function socialOptimum(p: Payoffs): [number, number] {
  let best: [number, number] = [0, 0]
  let v = -Infinity
  for (const r of [0, 1] as const)
    for (const c of [0, 1] as const) {
      const s = p[r][c][0] + p[r][c][1]
      if (s > v) { v = s; best = [r, c] }
    }
  return best
}
