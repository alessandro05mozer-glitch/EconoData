import { useState } from 'react'
import { correctedValue, IPCA_ANUAL, IPCA_LAST_YEAR, ipcaAccumulated, purchasingPower } from '../../lib/data/brasil'
import { FigureFrame, Slider, Stat } from './FigureFrame'
import { Plot } from './Plot'

const YEARS = Object.keys(IPCA_ANUAL).map(Number)
const brl = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export function IpcaSim() {
  const [from, setFrom] = useState(2015)
  const [to, setTo] = useState(IPCA_LAST_YEAR)
  const lo = Math.min(from, to)
  const hi = Math.max(from, to)
  const acc = ipcaAccumulated(lo, hi)
  const n = YEARS.length

  return (
    <FigureFrame
      title="inflação anual brasileira (IPCA), dados reais"
      hint="Fonte: IBGE. As barras destacadas são o período escolhido. Note que 1994 cobre só jul–dez (Plano Real). Inflação acumulada não é a soma das taxas: as taxas se compõem."
    >
      <Plot xDomain={[0, n]} yDomain={[0, 24]} xLabel="Ano" yLabel="IPCA no ano (%)" ariaLabel="Barras da inflação anual brasileira de 1994 a 2025" height={290} hideXTicks overlay={(s) => (<g>{YEARS.filter((y) => y % 5 === 0).map((y) => (<text key={y} x={s.x(y - 1994 + 0.5)} y={s.bottom + 16} textAnchor="middle" fontSize="12" fill="var(--muted)">{y}</text>))}</g>)}>
        {(s) => (
          <g>
            {YEARS.map((y, i) => {
              const v = IPCA_ANUAL[y]
              const on = y >= lo && y <= hi
              const w = (s.x(1) - s.x(0)) * 0.72
              return (
                <rect key={y} x={s.x(i + 0.5) - w / 2} y={s.y(v)} width={w} height={s.bottom - s.y(v)} rx="1.5" fill={on ? 'var(--accent)' : 'var(--muted)'} opacity={on ? 0.9 : 0.35}>
                  <title>{`${y}: ${String(v).replace('.', ',')}%`}</title>
                </rect>
              )
            })}
            <text x={s.x(1.5)} y={s.y(22.41) - 6} fontSize="11" fill="var(--text)" fontWeight="600">1995: 22,4%</text>
          </g>
        )}
      </Plot>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Slider id="ip-a" label="De (início do ano)" value={from} min={1995} max={IPCA_LAST_YEAR} step={1} onChange={setFrom} />
        <Slider id="ip-b" label="Até (fim do ano)" value={to} min={1995} max={IPCA_LAST_YEAR} step={1} onChange={setTo} />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label={`Inflação acumulada ${lo}–${hi}`} value={`${acc.toFixed(1).replace('.', ',')}%`} tone="mark" />
        <Stat label={`R$ 100 de ${lo} precisam virar`} value={`R$ ${brl(correctedValue(lo, hi))}`} />
        <Stat label={`R$ 100 de ${lo} valem em poder de compra`} value={`R$ ${brl(purchasingPower(lo, hi))}`} tone="bad" />
      </div>
    </FigureFrame>
  )
}
