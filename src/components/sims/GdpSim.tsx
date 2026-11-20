import { useState } from 'react'
import { FigureFrame, Slider, Stat } from './FigureFrame'
import { Plot } from './Plot'

export function GdpSim() {
  const [C, setC] = useState(60)
  const [I, setI] = useState(18)
  const [G, setG] = useState(20)
  const [X, setX] = useState(14)
  const [M, setM] = useState(12)
  const [nom, setNom] = useState(8)
  const [pr, setPr] = useState(5)
  const Y = C + I + G + X - M
  const top = C + I + G + X
  const real = ((1 + nom / 100) / (1 + pr / 100) - 1) * 100

  const bars = [
    { name: 'C', from: 0, to: C, color: 'var(--demand)' },
    { name: 'I', from: C, to: C + I, color: 'var(--supply)' },
    { name: 'G', from: C + I, to: C + I + G, color: 'var(--green)' },
    { name: 'X', from: C + I + G, to: top, color: 'var(--muted)' },
    { name: '−M', from: top - M, to: top, color: 'var(--red)' },
    { name: 'PIB', from: 0, to: Y, color: 'var(--text)' },
  ]

  return (
    <FigureFrame
      title="PIB pela ótica da despesa e crescimento real"
      hint="O PIB é a soma da despesa final: C + I + G + X − M. Em seguida, tire o efeito dos preços: crescimento real é o nominal descontado da inflação, e não a subtração simples dos dois."
    >
      <div className="grid gap-5 md:grid-cols-[1fr_15rem]">
        <Plot xDomain={[0, 6]} yDomain={[0, Math.max(top, 20) * 1.1]} xLabel="Componentes da despesa" yLabel="Valor" ariaLabel="Cascata dos componentes do PIB" height={300} hideXTicks overlay={(s) => (<g>{bars.map((b, i) => (<text key={b.name} x={s.x(i + 0.5)} y={s.bottom + 16} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text)">{b.name}</text>))}</g>)}>
          {(s) => (
            <g>
              {bars.map((b, i) => {
                const w = (s.x(1) - s.x(0)) * 0.62
                const cx = s.x(i + 0.5)
                return (
                  <g key={b.name}>
                    <rect x={cx - w / 2} y={s.y(b.to)} width={w} height={Math.max(0, s.y(b.from) - s.y(b.to))} rx="2" fill={b.color} opacity={b.name === 'PIB' ? 0.9 : 0.8}>
                      <title>{`${b.name}: ${(b.to - b.from).toFixed(0)}`}</title>
                    </rect>
                  </g>
                )
              })}
              <text x={s.x(5.5)} y={s.y(Y) - 7} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text)">{Y}</text>
            </g>
          )}
        </Plot>
        <div className="space-y-2.5">
          <Slider id="gd-c" label="C, consumo das famílias" value={C} min={0} max={100} step={1} onChange={setC} />
          <Slider id="gd-i" label="I, investimento" value={I} min={0} max={50} step={1} onChange={setI} />
          <Slider id="gd-g" label="G, gastos do governo" value={G} min={0} max={50} step={1} onChange={setG} />
          <Slider id="gd-x" label="X, exportações" value={X} min={0} max={40} step={1} onChange={setX} />
          <Slider id="gd-m" label="M, importações" value={M} min={0} max={40} step={1} onChange={setM} />
        </div>
      </div>
      <div className="mt-5 grid gap-4 border-t border-line pt-4 sm:grid-cols-[1fr_1fr_1.2fr]">
        <Slider id="gd-n" label="Crescimento do PIB nominal" value={nom} min={-5} max={25} step={1} onChange={setNom} format={(v) => `${v}%`} />
        <Slider id="gd-p" label="Inflação (deflator do PIB)" value={pr} min={0} max={25} step={1} onChange={setPr} format={(v) => `${v}%`} />
        <Stat label="Crescimento real = (1 + nominal) ÷ (1 + inflação) − 1" value={`${real.toFixed(2)}%  (a subtração daria ${(nom - pr).toFixed(2)}%)`} tone="mark" />
      </div>
    </FigureFrame>
  )
}
