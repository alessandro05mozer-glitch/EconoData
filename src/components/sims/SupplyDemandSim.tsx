import { useState } from 'react'
import { solveSupplyDemand } from '../../lib/sim/supplyDemand'
import { FigureFrame, Slider, Stat } from './FigureFrame'
import { Plot } from './Plot'

const fmt = (x: number) => (Math.abs(x) >= 100 ? x.toFixed(0) : x.toFixed(1))

export function SupplyDemandSim() {
  const [a, setA] = useState(100)
  const [b, setB] = useState(2)
  const [d, setD] = useState(3)
  const [p0, setP0] = useState(5)
  const [t, setT] = useState(6)

  const r = solveSupplyDemand({ a, b, d, p0, t })
  const pMax = a / b
  const trade = r.qStar > 0
  const taxed = r.qTax > 0
  const share = t > 0 && trade ? (r.pBuyer - r.pStar) / t : null

  return (
    <FigureFrame
      title="oferta, demanda e imposto"
      hint="Experimente: aumente d (oferta mais sensível ao preço) e veja o consumidor pagar uma parcela maior do imposto. Depois dobre t e confira se a perda de peso morto quadruplica."
    >
      <div className="grid gap-5 md:grid-cols-[1fr_15rem]">
        <Plot xDomain={[0, a]} yDomain={[0, pMax]} xLabel="Quantidade" yLabel="Preço" ariaLabel="Curvas de oferta e demanda com imposto" height={330}>
          {(s) => {
            const pt = (q: number, p: number) => `${s.x(q)},${s.y(p)}`
            const supplyAt = (shift: number, q: number) => p0 + shift + q / d
            return (
              <g>
                {trade && taxed && (
                  <>
                    <polygon points={`${pt(0, pMax)} ${pt(0, r.pBuyer)} ${pt(r.qTax, r.pBuyer)}`} fill="var(--demand)" opacity="0.22" />
                    <polygon points={`${pt(0, p0)} ${pt(0, r.pSeller)} ${pt(r.qTax, r.pSeller)}`} fill="var(--supply)" opacity="0.22" />
                    <polygon points={`${pt(0, r.pBuyer)} ${pt(r.qTax, r.pBuyer)} ${pt(r.qTax, r.pSeller)} ${pt(0, r.pSeller)}`} fill="var(--mark)" opacity="0.9" />
                    <polygon points={`${pt(r.qTax, r.pBuyer)} ${pt(r.qTax, r.pSeller)} ${pt(r.qStar, r.pStar)}`} fill="var(--red)" opacity="0.65" />
                  </>
                )}
                <line x1={s.x(0)} y1={s.y(pMax)} x2={s.x(a)} y2={s.y(0)} stroke="var(--demand)" strokeWidth="2.6" />
                <line x1={s.x(0)} y1={s.y(p0)} x2={s.x(a)} y2={s.y(supplyAt(0, a))} stroke="var(--supply)" strokeWidth="2.6" />
                {t > 0 && <line x1={s.x(0)} y1={s.y(p0 + t)} x2={s.x(a)} y2={s.y(supplyAt(t, a))} stroke="var(--supply)" strokeWidth="2" strokeDasharray="6 4" />}
                {trade && <circle cx={s.x(r.qStar)} cy={s.y(r.pStar)} r="4.5" fill="var(--text)" />}
                <text x={s.x(a) - 6} y={s.y(0) - 8} textAnchor="end" fontSize="12" fontWeight="600" fill="var(--demand)">Demanda</text>
                <text x={s.x(a * 0.62)} y={s.y(supplyAt(0, a * 0.62)) + 17} fontSize="12" fontWeight="600" fill="var(--supply)">Oferta</text>
              </g>
            )
          }}
        </Plot>
        <div className="space-y-2.5">
          <Slider id="sd-a" label="a, tamanho da demanda" value={a} min={50} max={200} step={5} onChange={setA} />
          <Slider id="sd-b" label="b, sensibilidade da demanda" value={b} min={0.5} max={5} step={0.5} onChange={setB} />
          <Slider id="sd-d" label="d, sensibilidade da oferta" value={d} min={0.5} max={6} step={0.5} onChange={setD} />
          <Slider id="sd-p0" label="p₀, preço mínimo de oferta" value={p0} min={0} max={20} step={1} onChange={setP0} />
          <Slider id="sd-t" label="t, imposto por unidade" value={t} min={0} max={30} step={1} onChange={setT} />
        </div>
      </div>

      {!trade ? (
        <p className="mt-4 rounded-md bg-warnsoft p-3 text-sm">Sem troca: o menor preço que o vendedor aceita é maior que o máximo que o consumidor paga.</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label="Preço de equilíbrio" value={fmt(r.pStar)} />
          <Stat label="Quantidade de equilíbrio" value={fmt(r.qStar)} />
          <Stat label="Consumidor paga" value={taxed ? fmt(r.pBuyer) : '—'} />
          <Stat label="Vendedor recebe" value={taxed ? fmt(r.pSeller) : '—'} />
          <Stat label="Quantidade com imposto" value={fmt(r.qTax)} />
          <Stat label="Arrecadação" value={fmt(r.revenue)} tone="mark" />
          <Stat label="Perda de peso morto" value={fmt(r.deadweightLoss)} tone="bad" />
          <Stat label="Parcela do consumidor" value={share === null ? '—' : `${Math.round(share * 100)}%`} />
        </div>
      )}
      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        <span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-[var(--demand)] opacity-40" />excedente do consumidor</span>
        <span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-[var(--supply)] opacity-40" />excedente do produtor</span>
        <span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-mark" />arrecadação</span>
        <span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-[var(--red)] opacity-70" />perda de peso morto</span>
      </p>
    </FigureFrame>
  )
}
