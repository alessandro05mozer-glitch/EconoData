import { useState } from 'react'
import { competitiveQ, deadweightLoss, demandP, lerner, marginalRevenue, monopolyPrice, monopolyProfit, monopolyQ } from '../../lib/sim/monopoly'
import { FigureFrame, Slider, Stat } from './FigureFrame'
import { Plot } from './Plot'

export function MonopolySim() {
  const [a, setA] = useState(100)
  const [c, setC] = useState(20)
  const m = { a, b: 1, c }
  const qm = monopolyQ(m)
  const qc = competitiveQ(m)
  const pm = monopolyPrice(m)
  return (
    <FigureFrame
      title="monopólio: onde RMg encontra CMg"
      hint="O monopolista produz onde a receita marginal iguala o custo marginal, mas cobra o preço que a demanda aceita nessa quantidade. O triângulo cinza é a perda de peso morto: trocas que valeriam a pena e não acontecem."
    >
      <div className="grid gap-5 md:grid-cols-[1fr_14rem]">
        <Plot xDomain={[0, 110]} yDomain={[0, 110]} xLabel="Quantidade" yLabel="Preço" ariaLabel="Demanda, receita marginal e custo marginal de um monopolista" height={320}>
          {(s) => (
            <g>
              <polygon points={`${s.x(qm)},${s.y(pm)} ${s.x(qc)},${s.y(c)} ${s.x(qm)},${s.y(c)}`} fill="var(--muted)" opacity="0.35" />
              <rect x={s.x(0)} y={s.y(pm)} width={s.x(qm) - s.x(0)} height={Math.max(0, s.y(c) - s.y(pm))} fill="var(--accent)" opacity="0.22" />
              <line x1={s.x(0)} y1={s.y(a)} x2={s.x(a)} y2={s.y(0)} stroke="var(--demand)" strokeWidth="2.4" />
              <line x1={s.x(0)} y1={s.y(marginalRevenue(m, 0))} x2={s.x(a / 2)} y2={s.y(0)} stroke="var(--demand)" strokeWidth="2" strokeDasharray="6 4" />
              <line x1={s.left} y1={s.y(c)} x2={s.right} y2={s.y(c)} stroke="var(--supply)" strokeWidth="2.4" />
              <line x1={s.x(qm)} y1={s.y(0)} x2={s.x(qm)} y2={s.y(pm)} stroke="var(--text)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1={s.x(0)} y1={s.y(pm)} x2={s.x(qm)} y2={s.y(pm)} stroke="var(--text)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx={s.x(qm)} cy={s.y(pm)} r="5" fill="var(--accent)" stroke="var(--surface)" strokeWidth="2" />
              <circle cx={s.x(qc)} cy={s.y(demandP(m, qc))} r="4.5" fill="var(--text)" stroke="var(--surface)" strokeWidth="2" />
              <text x={s.x(a * 0.62)} y={s.y(a * 0.38) - 8} fontSize="12" fontWeight="600" fill="var(--demand)">Demanda</text>
              <text x={s.x(a * 0.2)} y={s.y(a * 0.2) + 14} fontSize="12" fontWeight="600" fill="var(--demand)">RMg</text>
              <text x={s.right - 6} y={s.y(c) - 6} textAnchor="end" fontSize="12" fontWeight="600" fill="var(--supply)">CMg = CMe</text>
            </g>
          )}
        </Plot>
        <div className="space-y-3">
          <Slider id="mo-a" label="Tamanho do mercado (intercepto)" value={a} min={60} max={105} step={1} onChange={setA} />
          <Slider id="mo-c" label="Custo marginal" value={c} min={0} max={Math.min(a - 5, 80)} step={1} onChange={setC} />
          <Stat label="Monopólio: Q e P" value={`${qm.toFixed(1)} a R$ ${pm.toFixed(1)}`} tone="mark" />
          <Stat label="Concorrência: Q e P" value={`${qc.toFixed(1)} a R$ ${c.toFixed(1)}`} />
          <Stat label="Lucro do monopolista" value={monopolyProfit(m).toFixed(0)} tone="ok" />
          <Stat label="Peso morto" value={deadweightLoss(m).toFixed(0)} tone="bad" />
          <Stat label="Índice de Lerner (P − CMg)/P" value={lerner(m).toFixed(2)} />
        </div>
      </div>
    </FigureFrame>
  )
}
