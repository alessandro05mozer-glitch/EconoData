import { useState } from 'react'
import { gini, lorenz, topShare } from '../../lib/sim/lorenz'
import { FigureFrame, Slider, Stat } from './FigureFrame'
import { Plot } from './Plot'

export function LorenzSim() {
  const [k, setK] = useState(2.2)
  const G = gini(k)
  return (
    <FigureFrame title="curva de Lorenz e índice de Gini" hint="A diagonal é a igualdade perfeita. Quanto mais a curva se afasta dela, maior a área entre as duas e maior o Gini (área entre a curva e a diagonal, dividida por 1/2). Esta família de curvas é didática, não os dados de nenhum país.">
      <div className="grid gap-5 md:grid-cols-[1fr_14rem]">
        <Plot xDomain={[0, 1]} yDomain={[0, 1]} xLabel="Fração acumulada da população (mais pobres primeiro)" yLabel="Renda acumulada" ariaLabel="Curva de Lorenz e diagonal de igualdade" height={320}>
          {(s) => {
            const pts = Array.from({ length: 51 }, (_, i) => [i / 50, lorenz(i / 50, k)] as const)
            const curve = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${s.x(x).toFixed(1)},${s.y(y).toFixed(1)}`).join('')
            return (
              <g>
                <path d={`M${s.x(0)},${s.y(0)}L${s.x(1)},${s.y(1)}${[...pts].reverse().map(([x, y]) => `L${s.x(x).toFixed(1)},${s.y(y).toFixed(1)}`).join('')}Z`} fill="var(--accent)" opacity="0.2" />
                <line x1={s.x(0)} y1={s.y(0)} x2={s.x(1)} y2={s.y(1)} stroke="var(--muted)" strokeWidth="1.6" strokeDasharray="5 4" />
                <path d={curve} fill="none" stroke="var(--accent)" strokeWidth="2.8" />
                <text x={s.x(0.3)} y={s.y(0.55)} fontSize="12" fill="var(--muted)">Igualdade</text>
                <text x={s.x(0.62)} y={s.y(0.22)} fontSize="12" fontWeight="600" fill="var(--text)">Área A</text>
              </g>
            )
          }}
        </Plot>
        <div className="space-y-3">
          <Slider id="lo-k" label="Desigualdade (curvatura k)" value={k} min={1} max={6} step={0.1} onChange={setK} />
          <Stat label="Gini" value={G.toFixed(3)} tone="mark" />
          <Stat label="Renda dos 10% mais ricos" value={`${(topShare(0.1, k) * 100).toFixed(1)}%`} />
          <Stat label="Renda dos 50% mais pobres" value={`${(lorenz(0.5, k) * 100).toFixed(1)}%`} />
        </div>
      </div>
    </FigureFrame>
  )
}
