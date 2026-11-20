import { rng } from './dice'

/** Amostra de uma exponencial com média 1 (distribuição assimétrica). */
export const expSample = (rand: () => number) => -Math.log(1 - rand())

/** Médias de `reps` amostras de tamanho `n`. */
export function sampleMeans(n: number, reps: number, seed: number): number[] {
  const rand = rng(seed)
  const out: number[] = []
  for (let r = 0; r < reps; r++) {
    let s = 0
    for (let i = 0; i < n; i++) s += expSample(rand)
    out.push(s / n)
  }
  return out
}
export const normalPdf = (x: number, mu: number, sigma: number) =>
  Math.exp(-0.5 * ((x - mu) / sigma) ** 2) / (sigma * Math.sqrt(2 * Math.PI))

export function histogram(xs: number[], lo: number, hi: number, bins: number): number[] {
  const h = new Array(bins).fill(0)
  for (const x of xs) {
    if (x < lo || x >= hi) continue
    h[Math.floor(((x - lo) / (hi - lo)) * bins)]++
  }
  return h
}
