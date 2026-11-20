import { useState } from 'react'
import { compound, doublingTime, rule70 } from '../../lib/sim/fisher'
import { FigureFrame, Slider, Stat } from './FigureFrame'
import { Plot } from './Plot'

export function GrowthSim() {
  const [g, setG] = useState(3)
  const [yrs, setYrs] = useState(60)
  const [log, setLog] = useState(false)
  const end = compound(100, g, yrs)
  const lin = 100 + 100 * (g / 100) * yrs
  const yHi = log ? Math.log10(Math.max(end, 200)) * 1.05 : Math.max(end, 200) * 1.05
  const yMap = (v: number) => (log ? Math.log10(v) : v)
  return (
    <FigureFrame title="crescimento exponencial e regra dos 70" hint="Pequenas diferenças na taxa viram diferenças enormes em décadas. Na escala logarítmica, crescimento a taxa constante vira reta, e a inclinação é a taxa.">
      <div className="mb-3 flex gap-2" role="group" aria-label="Escala do eixo vertical">
        {[false, true].map((v) => (
          <button key={String(v)} type="button" onClick={() => setLog(v)} aria-pressed={log === v} className={`rounded-md border px-3 py-1.5 text-sm font-medium ${log === v ? 'border-brand bg-brandsoft text-brand' : 'border-line hover:bg-surface2'}`}>{v ? 'Escala log' : 'Escala linear'}</button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_14rem]">
        <Plot xDomain={[0, yrs]} yDomain={[log ? 2 : 0, yHi]} xLabel="Anos" yLabel={log ? 'log₁₀ do nível' : 'Nível (início = 100)'} ariaLabel="Crescimento exponencial comparado ao linear" height={300}>
          {(s) => {
            const path = (f: (t: number) => number) => Array.from({ length: 61 }, (_, k) => { const t = (yrs * k) / 60; return `${k ? 'L' : 'M'}${s.x(t).toFixed(1)},${s.y(yMap(f(t))).toFixed(1)}` }).join('')
            const t2 = doublingTime(g)
            return (
              <g>
                <path d={path((t) => 100 + 100 * (g / 100) * t)} fill="none" stroke="var(--muted)" strokeWidth="2" strokeDasharray="5 4" />
                <path d={path((t) => compound(100, g, t))} fill="none" stroke="var(--accent)" strokeWidth="2.8" />
                {Number.isFinite(t2) && t2 <= yrs && <circle cx={s.x(t2)} cy={s.y(yMap(200))} r="5" fill="var(--accent)" stroke="var(--surface)" strokeWidth="2" />}
              </g>
            )
          }}
        </Plot>
        <div className="space-y-3">
          <Slider id="gr-g" label="Taxa de crescimento ao ano" value={g} min={0.5} max={12} step={0.5} onChange={setG} format={(v) => `${v}%`} />
          <Slider id="gr-y" label="Horizonte" value={yrs} min={10} max={100} step={5} onChange={setYrs} format={(v) => `${v} anos`} />
          <Stat label="Nível ao final (início = 100)" value={end.toFixed(0)} tone="mark" />
          <Stat label="Se fosse linear (juros simples)" value={lin.toFixed(0)} />
          <Stat label="Dobra a cada (exato | regra 70)" value={`${doublingTime(g).toFixed(1)} | ${rule70(g).toFixed(1)} anos`} />
        </div>
      </div>
    </FigureFrame>
  )
}
