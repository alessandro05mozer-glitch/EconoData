// Soma de dois dados honestos.

export const SUMS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export function theoretical(): Record<number, number> {
  const out: Record<number, number> = {}
  for (const s of SUMS) out[s] = 0
  for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) out[a + b] += 1 / 36
  return out
}

/** Gerador pseudoaleatório pequeno e reproduzível (mulberry32), para testes e para repetir uma simulação. */
export function rng(seed: number): () => number {
  let t = seed >>> 0
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

export function roll(rand: () => number): number {
  return 1 + Math.floor(rand() * 6)
}
