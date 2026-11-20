import { useState } from 'react'
import { levelCrossings, optimum } from '../../lib/sim/lagrange'
import { FigureFrame, Slider, Stat } from './FigureFrame'
import { curvePath, Plot } from './Plot'

export function LagrangeSim() {
  const [mult, setMult] = useState(0.5)
  const [px, setPx] = useState(2)
  const [py, setPy] = useState(4)
  const [m, setM] = useState(80)
  const par = { px, py, m }
  const opt = optimum(par)
  const tangent = Math.abs(mult - 1) < 1e-9
  const k = mult * opt.k
  const pts = tangent ? [{ x: opt.x, y: opt.y }] : levelCrossings(par, k)
  const xMax = m / px
  const yMax = m / py

  return (
    <FigureFrame
      title="Lagrange como tangência"
      hint="Aumente o nível k da curva xy = k. Enquanto ela cruza a restrição em dois pontos, dá para subir mais. No instante em que só encosta, é o máximo; acima disso, a curva não cabe no orçamento."
    >
      <div className="grid gap-5 md:grid-cols-[1fr_15rem]">
        <Plot xDomain={[0, xMax * 1.15]} yDomain={[0, yMax * 1.15]} xLabel="x" yLabel="y" ariaLabel="Curva de nível xy igual a k e a restrição orçamentária" height={320}>
          {(s) => (
            <g>
              <polygon points={`${s.x(0)},${s.y(0)} ${s.x(xMax)},${s.y(0)} ${s.x(0)},${s.y(yMax)}`} fill="var(--supply)" opacity="0.07" />
              <line x1={s.x(0)} y1={s.y(yMax)} x2={s.x(xMax)} y2={s.y(0)} stroke="var(--supply)" strokeWidth="2.6" />
              <path d={curvePath((v) => k / v, xMax * 0.01, xMax * 1.15, s, 200)} fill="none" stroke={mult > 1 ? 'var(--red)' : 'var(--demand)'} strokeWidth="2.6" />
              <path d={curvePath((v) => opt.k / v, xMax * 0.01, xMax * 1.15, s, 200)} fill="none" stroke="var(--green)" strokeWidth="1.4" strokeDasharray="5 3" opacity="0.8" />
              {pts.map((pt, i) => (
                <circle key={i} cx={s.x(pt.x)} cy={s.y(pt.y)} r="5.5" fill="var(--text)" />
              ))}
              <text x={s.x(xMax) - 4} y={s.y(0) - 8} textAnchor="end" fontSize="12" fontWeight="600" fill="var(--supply)">restrição</text>
            </g>
          )}
        </Plot>
        <div className="space-y-2.5">
          <Slider id="lg-k" label="Nível k, em múltiplos do máximo" value={mult} min={0.1} max={1.4} step={0.05} onChange={(v) => setMult(Math.abs(v - 1) < 0.026 ? 1 : v)} format={(v) => `${v.toFixed(2)} × k*`} />
          <Slider id="lg-px" label="Preço de x" value={px} min={1} max={6} step={0.5} onChange={setPx} />
          <Slider id="lg-py" label="Preço de y" value={py} min={1} max={8} step={0.5} onChange={setPy} />
          <Slider id="lg-m" label="Renda m" value={m} min={40} max={160} step={10} onChange={setM} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="Nível k = xy" value={k.toFixed(1)} />
        <Stat label="Pontos em comum" value={mult > 1 ? '0, inviável' : tangent ? '1, tangência' : '2'} tone={tangent ? 'ok' : mult > 1 ? 'bad' : undefined} />
        <Stat label="Máximo k*" value={opt.k.toFixed(1)} />
        <Stat label="Solução (x*, y*)" value={`${opt.x.toFixed(1)}, ${opt.y.toFixed(1)}`} />
      </div>
    </FigureFrame>
  )
}
