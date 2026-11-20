import { useState } from 'react'
import { elasticity, quantity, revenue, revenueMaxPrice } from '../../lib/sim/elasticity'
import { FigureFrame, Slider, Stat } from './FigureFrame'
import { curvePath, Plot } from './Plot'

export function ElasticitySim() {
  const [a, setA] = useState(100)
  const [b, setB] = useState(2)
  const [p, setP] = useState(30)
  const dem = { a, b }
  const pMax = a / b
  const price = Math.min(p, pMax - 0.5)
  const q = quantity(dem, price)
  const e = elasticity(dem, price)
  const pStar = revenueMaxPrice(dem)
  const label = Math.abs(Math.abs(e) - 1) < 0.03 ? 'unitária' : Math.abs(e) > 1 ? 'elástica' : 'inelástica'
  const rMax = revenue(dem, pStar)

  return (
    <FigureFrame
      title="elasticidade-preço ao longo da demanda"
      hint="A demanda é uma reta, mas a elasticidade muda em cada ponto: alta no topo, baixa na base. A receita (painel da direita) é máxima exatamente onde |ε| = 1."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Plot xDomain={[0, a]} yDomain={[0, pMax]} xLabel="Quantidade" yLabel="Preço" ariaLabel="Demanda linear com o ponto escolhido" height={290} width={440}>
          {(s) => (
            <g>
              <rect x={s.left} y={s.top} width={s.right - s.left} height={s.y(pStar) - s.top} fill="var(--demand)" opacity="0.08" />
              <rect x={s.left} y={s.y(pStar)} width={s.right - s.left} height={s.bottom - s.y(pStar)} fill="var(--supply)" opacity="0.08" />
              <text x={s.right - 6} y={s.top + 16} textAnchor="end" fontSize="11" fill="var(--demand)">elástica</text>
              <text x={s.left + 6} y={s.bottom - 8} fontSize="11" fill="var(--supply)">inelástica</text>
              <line x1={s.x(0)} y1={s.y(pMax)} x2={s.x(a)} y2={s.y(0)} stroke="var(--text)" strokeWidth="2.4" />
              <line x1={s.left} x2={s.x(q)} y1={s.y(price)} y2={s.y(price)} stroke="var(--muted)" strokeDasharray="4 3" />
              <line x1={s.x(q)} x2={s.x(q)} y1={s.y(price)} y2={s.bottom} stroke="var(--muted)" strokeDasharray="4 3" />
              <circle cx={s.x(q)} cy={s.y(price)} r="5.5" fill="var(--mark)" stroke="var(--text)" strokeWidth="1.6" />
            </g>
          )}
        </Plot>
        <Plot xDomain={[0, pMax]} yDomain={[0, (a * a) / (4 * b) * 1.1]} xLabel="Preço" yLabel="Receita" ariaLabel="Receita total em função do preço" height={290} width={440}>
          {(s) => (
            <g>
              <path d={curvePath((x) => revenue(dem, x), 0, pMax, s)} fill="none" stroke="var(--text)" strokeWidth="2.4" />
              <line x1={s.x(pStar)} x2={s.x(pStar)} y1={s.y(rMax)} y2={s.bottom} stroke="var(--green)" strokeDasharray="4 3" />
              <text x={s.x(pStar) + 6} y={s.bottom - 8} fontSize="11" fill="var(--green)">|ε| = 1</text>
              <circle cx={s.x(price)} cy={s.y(revenue(dem, price))} r="5.5" fill="var(--mark)" stroke="var(--text)" strokeWidth="1.6" />
            </g>
          )}
        </Plot>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_15rem]">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label="Preço" value={price.toFixed(1)} />
          <Stat label="Quantidade" value={q.toFixed(1)} />
          <Stat label="Elasticidade ε" value={e.toFixed(2)} tone="mark" />
          <Stat label="Demanda é" value={label} />
        </div>
        <div className="space-y-2.5">
          <Slider id="el-p" label="Preço" value={p} min={1} max={Math.floor(pMax) - 1} step={1} onChange={setP} />
          <Slider id="el-b" label="b, inclinação da demanda" value={b} min={0.5} max={4} step={0.5} onChange={setB} />
          <Slider id="el-a" label="a, tamanho da demanda" value={a} min={60} max={160} step={10} onChange={setA} />
        </div>
      </div>
    </FigureFrame>
  )
}
