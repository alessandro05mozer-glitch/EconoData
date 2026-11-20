import { useRef, useState } from 'react'
import { rng, roll, SUMS, theoretical } from '../../lib/sim/dice'
import { FigureFrame, Stat } from './FigureFrame'
import { Plot } from './Plot'

export function DiceSim() {
  const rand = useRef(rng(2026))
  const [counts, setCounts] = useState<Record<number, number>>(() => Object.fromEntries(SUMS.map((s) => [s, 0])))
  const th = theoretical()
  const n = SUMS.reduce((a, s) => a + counts[s], 0)

  const add = (times: number) => {
    const next = { ...counts }
    for (let i = 0; i < times; i++) next[roll(rand.current) + roll(rand.current)] += 1
    setCounts(next)
  }
  const reset = () => setCounts(Object.fromEntries(SUMS.map((s) => [s, 0])))
  const mean = n ? SUMS.reduce((a, s) => a + s * counts[s], 0) / n : 0
  const maxDev = n ? Math.max(...SUMS.map((s) => Math.abs(counts[s] / n - th[s]))) : 0

  return (
    <FigureFrame
      title="lei dos grandes números com dois dados"
      hint="As barras são a frequência observada; os pontos, a probabilidade teórica. Com poucas jogadas a diferença é grande; com milhares, as barras encostam nos pontos."
    >
      <div className="mb-3 flex flex-wrap gap-2">
        {[1, 10, 100, 1000].map((k) => (
          <button key={k} type="button" onClick={() => add(k)} className="rounded-md border border-line px-3 py-1.5 text-sm font-medium hover:bg-surface2">
            Jogar {k === 1 ? '1 vez' : `${k} vezes`}
          </button>
        ))}
        <button type="button" onClick={reset} className="rounded-md px-3 py-1.5 text-sm text-muted hover:bg-surface2">Zerar</button>
      </div>
      <Plot xDomain={[1, 13]} yDomain={[0, 0.2]} xLabel="Soma dos dois dados" yLabel="Frequência relativa" ariaLabel="Histograma da soma de dois dados comparado à probabilidade teórica" height={300} hideXTicks overlay={(s) => (<g>{SUMS.map((v) => (<text key={v} x={s.x(v + 0.5)} y={s.bottom + 16} textAnchor="middle" fontSize="12" fill="var(--muted)">{v}</text>))}</g>)}>
        {(s) => (
          <g>
            {SUMS.map((v) => {
              const f = n ? counts[v] / n : 0
              const w = (s.x(2) - s.x(1)) * 0.6
              return (
                <g key={v}>
                  <rect x={s.x(v + 0.5) - w / 2} y={s.y(f)} width={w} height={s.bottom - s.y(f)} rx="2" fill="var(--demand)" opacity="0.8">
                    <title>{`Soma ${v}: ${n ? (f * 100).toFixed(1) : 0}% observado, ${(th[v] * 100).toFixed(1)}% teórico (${counts[v]} jogadas)`}</title>
                  </rect>
                  <circle cx={s.x(v + 0.5)} cy={s.y(th[v])} r="4.5" fill="var(--supply)" stroke="var(--surface)" strokeWidth="2" />
                </g>
              )
            })}
          </g>
        )}
      </Plot>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="Jogadas" value={String(n)} />
        <Stat label="Média observada" value={n ? mean.toFixed(3) : '—'} />
        <Stat label="Média teórica" value="7.000" />
        <Stat label="Maior diferença" value={n ? `${(maxDev * 100).toFixed(2)} pontos %` : '—'} tone="mark" />
      </div>
    </FigureFrame>
  )
}
