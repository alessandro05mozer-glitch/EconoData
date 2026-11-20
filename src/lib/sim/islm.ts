// IS–LM linear. IS: Y = c0 + c(Y − T) + I0 − b·i + G.  LM: M/P = k·Y − h·i.
export interface IsLm { c0: number; c: number; T: number; I0: number; b: number; G: number; k: number; h: number; MP: number }

/** Renda de equilíbrio e juros de equilíbrio. */
export function equilibrium(p: IsLm): { Y: number; i: number } {
  const A = p.c0 - p.c * p.T + p.I0 + p.G // autônomos
  // IS: (1−c)Y = A − b·i ;  LM: i = (k·Y − MP)/h
  const Y = (A + (p.b * p.MP) / p.h) / (1 - p.c + (p.b * p.k) / p.h)
  const i = (p.k * Y - p.MP) / p.h
  return { Y, i }
}
export const isCurveI = (p: IsLm, Y: number) => (p.c0 - p.c * p.T + p.I0 + p.G - (1 - p.c) * Y) / p.b
export const lmCurveI = (p: IsLm, Y: number) => (p.k * Y - p.MP) / p.h
