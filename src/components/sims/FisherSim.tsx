import { useState } from 'react'
import { compound, realRateApprox, realRateExact } from '../../lib/sim/fisher'
import { FigureFrame, Slider, Stat } from './FigureFrame'
import { Plot } from './Plot'

export function FisherSim() {
  const [i, setI] = useState(14)
  const [pi, setPi] = useState(5)
  const [yrs, setYrs] = useState(10)
  const r = realRateExact(i, pi)
  const nominal = compound(1000, i, yrs)
  const real = compound(1000, r, yrs)
  const top = Math.max(nominal, 1000) * 1.05
  return (
    <FigureFrame title="juro real: o que sobra depois da inflação" hint="Aplique R$ 1.000. A linha azul é o saldo em reais correntes; a laranja, o mesmo saldo em poder de compra de hoje. Quando a inflação é alta, a aproximação i − π erra mais.">
      <div className="grid gap-5 md:grid-cols-[1fr_14rem]">
        <Plot xDomain={[0, yrs]} yDomain={[0, top]} xLabel="Anos" yLabel="R$" ariaLabel="Saldo nominal e real de uma aplicação de mil reais" height={300}>
          {(s) => {
            const pts = (f: (t: number) => number) => Array.from({ length: 41 }, (_, k) => { const t = (yrs * k) / 40; return `${k ? 'L' : 'M'}${s.x(t).toFixed(1)},${s.y(f(t)).toFixed(1)}` }).join('')
            return (
              <g>
                <line x1={s.left} x2={s.right} y1={s.y(1000)} y2={s.y(1000)} stroke="var(--muted)" strokeDasharray="4 4" />
                <path d={pts((t) => compound(1000, i, t))} fill="none" stroke="var(--demand)" strokeWidth="2.6" />
                <path d={pts((t) => compound(1000, r, t))} fill="none" stroke="var(--supply)" strokeWidth="2.6" />
                <text x={s.right - 4} y={s.y(nominal) - 7} textAnchor="end" fontSize="12" fontWeight="600" fill="var(--demand)">Nominal</text>
                <text x={s.right - 4} y={s.y(real) + (real < 1000 ? 16 : -7)} textAnchor="end" fontSize="12" fontWeight="600" fill="var(--supply)">Real</text>
              </g>
            )
          }}
        </Plot>
        <div className="space-y-3">
          <Slider id="fi-i" label="Juro nominal ao ano" value={i} min={0} max={25} step={0.5} onChange={setI} format={(v) => `${v}%`} />
          <Slider id="fi-p" label="Inflação ao ano" value={pi} min={0} max={25} step={0.5} onChange={setPi} format={(v) => `${v}%`} />
          <Slider id="fi-y" label="Prazo" value={yrs} min={1} max={30} step={1} onChange={setYrs} format={(v) => `${v} anos`} />
          <Stat label="Juro real exato" value={`${r.toFixed(2)}%`} tone="mark" />
          <Stat label="Aproximação i − π" value={`${realRateApprox(i, pi).toFixed(2)}%`} />
          <Stat label="Saldo final: nominal | real" value={`${Math.round(nominal)} | ${Math.round(real)}`} tone={r < 0 ? 'bad' : 'ok'} />
        </div>
      </div>
    </FigureFrame>
  )
}
