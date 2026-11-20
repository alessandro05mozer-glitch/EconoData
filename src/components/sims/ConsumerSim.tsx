import { useState } from 'react'
import { budgetY, indifferenceY, mrs, optimalBundle, utility } from '../../lib/sim/consumer'
import { FigureFrame, Slider, Stat } from './FigureFrame'
import { curvePath, Plot } from './Plot'

export function ConsumerSim() {
  const [alpha, setAlpha] = useState(0.5)
  const [m, setM] = useState(100)
  const [px, setPx] = useState(2)
  const [py, setPy] = useState(4)
  const [t, setT] = useState(0.3)

  const par = { alpha, m, px, py }
  const opt = optimalBundle(par)
  const xMax = m / px
  const yMax = m / py
  const x = Math.max(0.02, t) * xMax
  const y = budgetY(par, x)
  const u = utility(alpha, x, y)
  const near = Math.abs(x - opt.x) / xMax < 0.02
  const rate = mrs(alpha, x, y)

  return (
    <FigureFrame
      title="a escolha ótima do consumidor"
      hint="Deslize o ponto ao longo da reta de orçamento. A utilidade sobe até a curva de indiferença tangenciar a reta: ali a taxa de substituição iguala a razão de preços."
    >
      <div className="grid gap-5 md:grid-cols-[1fr_15rem]">
        <Plot xDomain={[0, xMax * 1.15]} yDomain={[0, yMax * 1.15]} xLabel="Bem x" yLabel="Bem y" ariaLabel="Curvas de indiferença e reta de orçamento" height={330}>
          {(s) => {
            const x0 = xMax * 0.015
            const x1 = xMax * 1.15
            return (
              <g>
                {[0.5, 1.5].map((k) => (
                  <path key={k} d={curvePath((v) => indifferenceY(alpha, opt.u * k, v), x0, x1, s, 160)} fill="none" stroke="var(--demand)" strokeWidth="1.3" opacity="0.4" />
                ))}
                <path d={curvePath((v) => indifferenceY(alpha, opt.u, v), x0, x1, s, 160)} fill="none" stroke="var(--demand)" strokeWidth="2" opacity="0.85" strokeDasharray="5 3" />
                <path d={curvePath((v) => indifferenceY(alpha, u, v), x0, x1, s, 160)} fill="none" stroke="var(--demand)" strokeWidth="2.6" />
                <line x1={s.x(0)} y1={s.y(yMax)} x2={s.x(xMax)} y2={s.y(0)} stroke="var(--supply)" strokeWidth="2.6" />
                <circle cx={s.x(opt.x)} cy={s.y(opt.y)} r="7" fill="none" stroke="var(--green)" strokeWidth="2" />
                <circle cx={s.x(x)} cy={s.y(y)} r="5.5" fill="var(--text)" />
                <text x={s.x(xMax) - 4} y={s.y(0) - 8} textAnchor="end" fontSize="12" fontWeight="600" fill="var(--supply)">Orçamento</text>
                <text x={s.x(opt.x) + 11} y={s.y(opt.y) - 9} fontSize="12" fontWeight="600" fill="var(--green)">ótimo</text>
              </g>
            )
          }}
        </Plot>
        <div className="space-y-2.5">
          <Slider id="co-t" label="Posição na reta de orçamento" value={t} min={0.02} max={0.98} step={0.01} onChange={setT} format={(v) => `${Math.round(v * 100)}%`} />
          <button type="button" onClick={() => setT(alpha)} className="rounded-md border border-line px-3 py-1.5 text-sm font-medium hover:bg-surface2">Ir para o ótimo</button>
          <Slider id="co-a" label="α, peso do bem x" value={alpha} min={0.1} max={0.9} step={0.05} onChange={setAlpha} format={(v) => v.toFixed(2)} />
          <Slider id="co-m" label="Renda m" value={m} min={40} max={200} step={10} onChange={setM} />
          <Slider id="co-px" label="Preço de x" value={px} min={1} max={8} step={0.5} onChange={setPx} />
          <Slider id="co-py" label="Preço de y" value={py} min={1} max={8} step={0.5} onChange={setPy} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="Cesta (x, y)" value={`${x.toFixed(1)}, ${y.toFixed(1)}`} />
        <Stat label="Utilidade" value={u.toFixed(1)} tone={near ? 'ok' : undefined} />
        <Stat label="TMS" value={rate.toFixed(2)} />
        <Stat label="Razão de preços px/py" value={(px / py).toFixed(2)} />
      </div>
      <p className="mt-3 text-sm text-muted">
        Cesta ótima: ({opt.x.toFixed(1)}, {opt.y.toFixed(1)}), utilidade {opt.u.toFixed(1)}. {near ? 'Você está nela: TMS = px/py.' : 'Fora do ótimo, uma curva mais alta ainda cabe no orçamento.'}
      </p>
    </FigureFrame>
  )
}
