// Sistema 2x2:  a1*x + b1*y = c1  e  a2*x + b2*y = c2

export interface Line {
  a: number
  b: number
  c: number
}

export function solve2x2(l1: Line, l2: Line) {
  const det = l1.a * l2.b - l1.b * l2.a
  if (Math.abs(det) < 1e-9) {
    // Linhas paralelas ou coincidentes
    const consistent = Math.abs(l1.a * l2.c - l1.c * l2.a) < 1e-9 && Math.abs(l1.b * l2.c - l1.c * l2.b) < 1e-9
    return { det, kind: consistent ? ('infinitas' as const) : ('nenhuma' as const) }
  }
  return {
    det,
    kind: 'unica' as const,
    x: (l1.c * l2.b - l1.b * l2.c) / det,
    y: (l1.a * l2.c - l1.c * l2.a) / det,
  }
}
