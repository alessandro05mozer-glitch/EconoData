import { useState } from 'react'
import { FigureFrame, Slider, Stat } from './FigureFrame'
import { Plot } from './Plot'

// Demanda Q = a - bP (a muda com a renda); oferta Q = d (P - p0) (p0 muda com o custo dos insumos).
const B = 2
const D = 3
const A0 = 100
const P00 = 5

function eq(a: number, p0: number) {
  const p = (a + D * p0) / (B + D)
  return { p, q: a - B * p }
}

const arrow = (from: number, to: number) => (Math.abs(to - from) < 0.05 ? 'não muda' : to > from ? 'sobe' : 'cai')

export function ShiftsSim() {
  const [da, setDa] = useState(30)
  const [dp, setDp] = useState(0)
  const a1 = A0 + da
  const p01 = P00 + dp
  const e0 = eq(A0, P00)
  const e1 = eq(a1, p01)

  return (
    <FigureFrame
      title="deslocamentos das curvas"
      hint="Mova só a renda e depois só o custo dos insumos. Cada choque desloca uma curva diferente, e o efeito sobre preço e quantidade muda de acordo."
    >
      <div className="grid gap-5 md:grid-cols-[1fr_15rem]">
        <Plot xDomain={[0, 140]} yDomain={[0, 70]} xLabel="Quantidade" yLabel="Preço" ariaLabel="Deslocamento das curvas de oferta e demanda" height={320}>
          {(s) => (
            <g>
              <line x1={s.x(0)} y1={s.y(A0 / B)} x2={s.x(A0)} y2={s.y(0)} stroke="var(--demand)" strokeWidth="1.8" strokeDasharray="5 4" opacity="0.55" />
              <line x1={s.x(0)} y1={s.y(P00)} x2={s.x(140)} y2={s.y(P00 + 140 / D)} stroke="var(--supply)" strokeWidth="1.8" strokeDasharray="5 4" opacity="0.55" />
              <line x1={s.x(0)} y1={s.y(a1 / B)} x2={s.x(a1)} y2={s.y(0)} stroke="var(--demand)" strokeWidth="2.6" />
              <line x1={s.x(0)} y1={s.y(p01)} x2={s.x(140)} y2={s.y(p01 + 140 / D)} stroke="var(--supply)" strokeWidth="2.6" />
              <circle cx={s.x(e0.q)} cy={s.y(e0.p)} r="4.5" fill="none" stroke="var(--text)" strokeWidth="1.5" />
              <circle cx={s.x(e1.q)} cy={s.y(e1.p)} r="5" fill="var(--text)" />
              <text x={s.x(a1) - 4} y={s.y(0) - 8} textAnchor="end" fontSize="12" fontWeight="600" fill="var(--demand)">Demanda</text>
              <text x={s.x(105)} y={s.y(p01 + 105 / D) + 17} fontSize="12" fontWeight="600" fill="var(--supply)">Oferta</text>
            </g>
          )}
        </Plot>
        <div className="space-y-3">
          <Slider id="sh-a" label="Renda dos consumidores (desloca a demanda)" value={da} min={-40} max={60} step={5} onChange={setDa} format={(v) => (v > 0 ? `+${v}` : String(v))} />
          <Slider id="sh-p" label="Custo dos insumos (desloca a oferta)" value={dp} min={-4} max={12} step={1} onChange={setDp} format={(v) => (v > 0 ? `+${v}` : String(v))} />
          <p className="text-xs text-muted">Linhas tracejadas: situação inicial. Círculo vazado: equilíbrio inicial.</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="Preço antes" value={e0.p.toFixed(1)} />
        <Stat label="Preço depois" value={`${e1.p.toFixed(1)}, ${arrow(e0.p, e1.p)}`} tone="mark" />
        <Stat label="Quantidade antes" value={e0.q.toFixed(1)} />
        <Stat label="Quantidade depois" value={`${e1.q.toFixed(1)}, ${arrow(e0.q, e1.q)}`} tone="mark" />
      </div>
    </FigureFrame>
  )
}
