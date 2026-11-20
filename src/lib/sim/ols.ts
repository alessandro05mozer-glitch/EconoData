export interface Pt { x: number; y: number }
export interface Fit { a: number; b: number; r2: number; sse: number }

/** Mínimos quadrados ordinários de y = a + b·x. Retorna null se x não varia. */
export function ols(pts: Pt[]): Fit | null {
  const n = pts.length
  if (n < 2) return null
  const mx = pts.reduce((s, p) => s + p.x, 0) / n
  const my = pts.reduce((s, p) => s + p.y, 0) / n
  const sxx = pts.reduce((s, p) => s + (p.x - mx) ** 2, 0)
  if (sxx < 1e-12) return null
  const sxy = pts.reduce((s, p) => s + (p.x - mx) * (p.y - my), 0)
  const b = sxy / sxx
  const a = my - b * mx
  const sse = pts.reduce((s, p) => s + (p.y - a - b * p.x) ** 2, 0)
  const sst = pts.reduce((s, p) => s + (p.y - my) ** 2, 0)
  return { a, b, sse, r2: sst < 1e-12 ? 0 : 1 - sse / sst }
}
