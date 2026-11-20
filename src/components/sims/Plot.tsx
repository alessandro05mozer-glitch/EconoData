import { useId, type ReactNode } from 'react'

export interface Scale {
  x: (v: number) => number
  y: (v: number) => number
  /** Limites da área de desenho em pixels do viewBox */
  left: number
  right: number
  top: number
  bottom: number
}

export function niceTicks(min: number, max: number, target = 5): number[] {
  const span = max - min
  if (span <= 0) return [min]
  const raw = span / target
  const pow = Math.pow(10, Math.floor(Math.log10(raw)))
  const f = raw / pow
  const step = (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * pow
  const out: number[] = []
  for (let v = Math.ceil(min / step) * step; v <= max + step * 1e-9; v += step) out.push(Math.round(v / step) * step)
  return out
}

const fmtTick = (v: number) => String(+v.toFixed(2))

export function Plot({
  xDomain,
  yDomain,
  xLabel,
  yLabel,
  width = 480,
  height = 340,
  ariaLabel,
  hideXTicks = false,
  overlay,
  children,
}: {
  xDomain: [number, number]
  yDomain: [number, number]
  xLabel: string
  yLabel: string
  width?: number
  height?: number
  ariaLabel: string
  /** Esconde grade e rótulos do eixo x (para eixos de categorias desenhados à mão) */
  hideXTicks?: boolean
  /** Desenhado por cima, sem recorte (rótulos de categorias abaixo do eixo) */
  overlay?: (s: Scale) => ReactNode
  children: (s: Scale) => ReactNode
}) {
  const clipId = useId()
  const m = { l: 46, r: 14, t: 26, b: 38 }
  const left = m.l
  const right = width - m.r
  const top = m.t
  const bottom = height - m.b
  const x = (v: number) => left + ((v - xDomain[0]) / (xDomain[1] - xDomain[0])) * (right - left)
  const y = (v: number) => bottom - ((v - yDomain[0]) / (yDomain[1] - yDomain[0])) * (bottom - top)
  const scale: Scale = { x, y, left, right, top, bottom }
  const xt = hideXTicks ? [] : niceTicks(xDomain[0], xDomain[1], 6)
  const yt = niceTicks(yDomain[0], yDomain[1], 5)
  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={ariaLabel} className="w-full select-none" style={{ fontFamily: 'var(--font-sans)' }}>
      <defs>
        <clipPath id={clipId}>
          <rect x={left} y={top} width={right - left} height={bottom - top} />
        </clipPath>
      </defs>
      {xt.map((t) => (
        <g key={`x${t}`}>
          <line x1={x(t)} x2={x(t)} y1={top} y2={bottom} stroke="var(--border)" strokeWidth="0.8" opacity="0.6" />
          <text x={x(t)} y={bottom + 15} textAnchor="middle" fontSize="12" fill="var(--muted)">{fmtTick(t)}</text>
        </g>
      ))}
      {yt.map((t) => (
        <g key={`y${t}`}>
          <line x1={left} x2={right} y1={y(t)} y2={y(t)} stroke="var(--border)" strokeWidth="0.8" opacity="0.6" />
          <text x={left - 7} y={y(t) + 4} textAnchor="end" fontSize="12" fill="var(--muted)">{fmtTick(t)}</text>
        </g>
      ))}
      <line x1={left} x2={right} y1={bottom} y2={bottom} stroke="var(--text)" strokeWidth="1.2" />
      <line x1={left} x2={left} y1={top} y2={bottom} stroke="var(--text)" strokeWidth="1.2" />
      <text x={right} y={height - 6} textAnchor="end" fontSize="13" fill="var(--text)">{xLabel}</text>
      <text x={left - 36} y={top - 10} fontSize="13" fill="var(--text)">{yLabel}</text>
      <g clipPath={`url(#${clipId})`}>{children(scale)}</g>
      {overlay?.(scale)}
    </svg>
  )
}

/** Caminho de uma função amostrada em n pontos, ignorando valores não finitos. */
export function curvePath(f: (t: number) => number, a: number, b: number, s: Scale, n = 120): string {
  let d = ''
  let pen = false
  for (let i = 0; i <= n; i++) {
    const t = a + ((b - a) * i) / n
    const v = f(t)
    if (!Number.isFinite(v)) {
      pen = false
      continue
    }
    d += `${pen ? 'L' : 'M'}${s.x(t).toFixed(1)},${s.y(v).toFixed(1)}`
    pen = true
  }
  return d
}
