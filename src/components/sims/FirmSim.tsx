import { useState } from 'react'
import { avgCost, avgVariableCost, marginalCost, minAverageCost, optimalQuantity, profit } from '../../lib/sim/firm'
import { FigureFrame, Slider, Stat } from './FigureFrame'
import { curvePath, Plot } from './Plot'

export function FirmSim() {
  const [F, setF] = useState(100)
  const [c, setC] = useState(2)
  const [d, setD] = useState(0.5)
  const [p, setP] = useState(20)
  const f = { F, c, d }
  const q = optimalQuantity(f, p)
  const lucro = profit(f, p, q)
  const min = minAverageCost(f)
  const status = q === 0 ? 'fecha (p abaixo do CVMe mínimo)' : lucro > 1e-6 ? 'lucro' : lucro < -1e-6 ? (p >= avgVariableCost(f, q) ? 'prejuízo, mas produz' : 'fecha') : 'lucro zero'

  return (
    <FigureFrame
      title="custos e decisão da firma competitiva"
      hint="O retângulo é o lucro: (preço − CMe) × q. Suba o preço até a linha tocar o mínimo do CMe; ali o lucro é zero, que é o preço de longo prazo."
    >
      <div className="grid gap-5 md:grid-cols-[1fr_15rem]">
        <Plot xDomain={[0, 40]} yDomain={[0, 40]} xLabel="Quantidade q" yLabel="Preço e custos" ariaLabel="Curvas de custo e lucro da firma" height={330}>
          {(s) => {
            const cme = (v: number) => avgCost(f, v)
            const cmg = (v: number) => marginalCost(f, v)
            const cvm = (v: number) => avgVariableCost(f, v)
            return (
              <g>
                {q > 0 && (
                  <rect
                    x={s.x(0)}
                    y={s.y(Math.max(p, cme(q)))}
                    width={s.x(q) - s.x(0)}
                    height={Math.abs(s.y(p) - s.y(cme(q)))}
                    fill={lucro >= 0 ? 'var(--green)' : 'var(--red)'}
                    opacity="0.3"
                  />
                )}
                <path d={curvePath(cmg, 0, 40, s)} fill="none" stroke="var(--supply)" strokeWidth="2.6" />
                <path d={curvePath(cme, 0.6, 40, s)} fill="none" stroke="var(--demand)" strokeWidth="2.6" />
                <path d={curvePath(cvm, 0, 40, s)} fill="none" stroke="var(--demand)" strokeWidth="1.6" strokeDasharray="5 3" />
                <line x1={s.left} x2={s.right} y1={s.y(p)} y2={s.y(p)} stroke="var(--text)" strokeWidth="1.8" />
                {q > 0 && <circle cx={s.x(q)} cy={s.y(p)} r="5" fill="var(--text)" />}
                <circle cx={s.x(min.q)} cy={s.y(min.ac)} r="4" fill="none" stroke="var(--green)" strokeWidth="2" />
                <text x={s.x(36)} y={s.y(cmg(36)) - 8} textAnchor="end" fontSize="12" fontWeight="600" fill="var(--supply)">CMg</text>
                <text x={s.x(36)} y={s.y(cme(36)) + 16} textAnchor="end" fontSize="12" fontWeight="600" fill="var(--demand)">CMe</text>
                <text x={s.x(36)} y={s.y(cvm(36)) - 7} textAnchor="end" fontSize="12" fill="var(--demand)">CVMe</text>
                <text x={s.right - 4} y={s.y(p) - 6} textAnchor="end" fontSize="12" fontWeight="600" fill="var(--text)">preço = receita marginal</text>
              </g>
            )
          }}
        </Plot>
        <div className="space-y-2.5">
          <Slider id="fi-p" label="Preço de mercado p" value={p} min={1} max={38} step={1} onChange={setP} />
          <Slider id="fi-F" label="Custo fixo F" value={F} min={20} max={300} step={10} onChange={setF} />
          <Slider id="fi-c" label="c, custo marginal inicial" value={c} min={0} max={10} step={0.5} onChange={setC} />
          <Slider id="fi-d" label="d, curvatura do custo" value={d} min={0.25} max={1} step={0.05} onChange={setD} format={(v) => v.toFixed(2)} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="Quantidade ótima" value={q.toFixed(1)} />
        <Stat label="Lucro" value={lucro.toFixed(1)} tone={lucro > 1e-6 ? 'ok' : lucro < -1e-6 ? 'bad' : undefined} />
        <Stat label="Situação" value={status} />
        <Stat label="CMe mínimo" value={`${min.ac.toFixed(1)} em q = ${min.q.toFixed(1)}`} />
      </div>
    </FigureFrame>
  )
}
