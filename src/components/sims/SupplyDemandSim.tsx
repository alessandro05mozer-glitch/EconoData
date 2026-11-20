import { useId, useState } from 'react'
import { solveSupplyDemand } from '../../lib/sim/supplyDemand'

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-mono font-semibold">{value}</span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--brand)]"
      />
    </div>
  )
}

const W = 520
const H = 340
const M = { l: 48, r: 16, t: 30, b: 40 }

const fmt = (x: number) => (Math.abs(x) >= 100 ? x.toFixed(0) : x.toFixed(1))

export function SupplyDemandSim() {
  const [a, setA] = useState(100)
  const [b, setB] = useState(2)
  const [d, setD] = useState(3)
  const [p0, setP0] = useState(5)
  const [t, setT] = useState(6)

  const r = solveSupplyDemand({ a, b, d, p0, t })
  const pMax = a / b
  const qMax = a
  const X = (q: number) => M.l + (q / qMax) * (W - M.l - M.r)
  const Y = (p: number) => H - M.b - (Math.min(p, pMax) / pMax) * (H - M.t - M.b)
  const pt = (q: number, p: number) => `${X(q)},${Y(p)}`

  const trade = r.qStar > 0
  const taxedTrade = r.qTax > 0
  // Reta de oferta P = p0 + q/d, cortada no topo do gráfico
  const supplyEnd = (shift: number) => {
    const q = Math.min(qMax, d * (pMax - p0 - shift))
    return { q: Math.max(0, q), p: p0 + shift + Math.max(0, q) / d }
  }
  const s0 = supplyEnd(0)
  const s1 = supplyEnd(t)

  const buyerShare = t > 0 && trade ? (r.pBuyer - r.pStar) / t : null

  return (
    <section className="my-6 rounded-2xl border border-line bg-surface p-4 shadow-sm" aria-label="Simulador de oferta e demanda com imposto">
      <span className="rounded-full bg-brandsoft px-2.5 py-0.5 text-xs font-bold text-brand">Simulador · oferta, demanda e imposto</span>
      <p className="mt-2 text-sm text-muted">
        Demanda: Q = a − b·P. Oferta: Q = d·(P − p₀). Imposto de t por unidade, cobrado do vendedor. Mexa nos controles e veja quem paga e quanto se perde.
      </p>

      <div className="mt-3 grid gap-4 md:grid-cols-[1fr_16rem]">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Gráfico de oferta e demanda" className="w-full rounded-xl bg-surface2">
          {/* eixos */}
          <line x1={M.l} y1={H - M.b} x2={W - M.r} y2={H - M.b} stroke="var(--muted)" />
          <line x1={M.l} y1={M.t} x2={M.l} y2={H - M.b} stroke="var(--muted)" />
          <text x={W - M.r} y={H - 8} textAnchor="end" fontSize="12" fill="var(--muted)">Quantidade (Q)</text>
          <text x={M.l} y={14} fontSize="12" fill="var(--muted)">Preço (P)</text>

          {taxedTrade && trade && (
            <>
              <polygon points={`${pt(0, pMax)} ${pt(0, r.pBuyer)} ${pt(r.qTax, r.pBuyer)}`} fill="#3b82f6" opacity="0.35" />
              <polygon points={`${pt(0, p0)} ${pt(0, r.pSeller)} ${pt(r.qTax, r.pSeller)}`} fill="#22c55e" opacity="0.35" />
              <polygon points={`${pt(0, r.pBuyer)} ${pt(r.qTax, r.pBuyer)} ${pt(r.qTax, r.pSeller)} ${pt(0, r.pSeller)}`} fill="#f59e0b" opacity="0.45" />
              <polygon points={`${pt(r.qTax, r.pBuyer)} ${pt(r.qTax, r.pSeller)} ${pt(r.qStar, r.pStar)}`} fill="#ef4444" opacity="0.6" />
            </>
          )}

          {/* demanda */}
          <line x1={X(0)} y1={Y(pMax)} x2={X(qMax)} y2={Y(0)} stroke="#2563eb" strokeWidth="2.5" />
          {/* oferta sem e com imposto */}
          <line x1={X(0)} y1={Y(p0)} x2={X(s0.q)} y2={Y(s0.p)} stroke="#16a34a" strokeWidth="2.5" />
          {t > 0 && (
            <line x1={X(0)} y1={Y(p0 + t)} x2={X(s1.q)} y2={Y(s1.p)} stroke="#16a34a" strokeWidth="2" strokeDasharray="6 4" />
          )}
          <text x={X(qMax) - 6} y={Y(0) - 6} textAnchor="end" fontSize="12" fill="#2563eb">Demanda</text>
          <text x={X(s0.q) - 4} y={Y(s0.p) + 14} textAnchor="end" fontSize="12" fill="#16a34a">Oferta</text>

          {trade && (
            <>
              <circle cx={X(r.qStar)} cy={Y(r.pStar)} r="5" fill="var(--text)" />
              <text x={X(r.qStar) + 8} y={Y(r.pStar) - 8} fontSize="12" fill="var(--text)">Equilíbrio (sem imposto)</text>
            </>
          )}
          {/* marcas dos eixos */}
          {[0, 0.5, 1].map((f) => (
            <g key={f}>
              <text x={X(f * qMax)} y={H - M.b + 16} textAnchor="middle" fontSize="11" fill="var(--muted)">{fmt(f * qMax)}</text>
              <text x={M.l - 6} y={Y(f * pMax) + 4} textAnchor="end" fontSize="11" fill="var(--muted)">{fmt(f * pMax)}</text>
            </g>
          ))}
        </svg>

        <div className="space-y-2">
          <Slider label="a (tamanho da demanda)" value={a} min={50} max={200} step={5} onChange={setA} />
          <Slider label="b (sensib. da demanda)" value={b} min={0.5} max={5} step={0.5} onChange={setB} />
          <Slider label="d (sensib. da oferta)" value={d} min={0.5} max={6} step={0.5} onChange={setD} />
          <Slider label="p₀ (preço mínimo de oferta)" value={p0} min={0} max={20} step={1} onChange={setP0} />
          <Slider label="t (imposto por unidade)" value={t} min={0} max={30} step={1} onChange={setT} />
        </div>
      </div>

      {!trade ? (
        <p className="mt-3 rounded-lg bg-warnsoft p-3 text-sm">Com esses valores não há troca: o preço mínimo do vendedor é maior que o máximo que o consumidor paga.</p>
      ) : (
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
          {[
            ['Preço de equilíbrio', fmt(r.pStar)],
            ['Quantidade de equilíbrio', fmt(r.qStar)],
            ['Preço pago (com imposto)', taxedTrade ? fmt(r.pBuyer) : '—'],
            ['Preço recebido', taxedTrade ? fmt(r.pSeller) : '—'],
            ['Quantidade com imposto', fmt(r.qTax)],
            ['Arrecadação', fmt(r.revenue)],
            ['Perda de peso morto', fmt(r.deadweightLoss)],
            ['Consumidor paga do imposto', buyerShare === null ? '—' : `${Math.round(buyerShare * 100)}%`],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-surface2 p-2">
              <div className="text-xs text-muted">{k}</div>
              <div className="font-mono text-base font-semibold">{v}</div>
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-xs text-muted">
        Azul: excedente do consumidor · Verde: excedente do produtor · Laranja: arrecadação do governo · Vermelho: perda de peso morto.
      </p>
    </section>
  )
}
