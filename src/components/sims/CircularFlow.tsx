import { useState } from 'react'
import { FigureFrame } from './FigureFrame'

const STAGES = [
  { id: 0, label: 'Economia simples', note: 'Famílias vendem trabalho, terra e capital e recebem renda; gastam toda ela em bens e serviços. A renda de uns é a receita de outros, por isso Produto = Renda = Despesa.' },
  { id: 1, label: '+ Governo', note: 'Impostos retiram renda das famílias e das empresas; o governo devolve em gastos (G) e transferências. O governo também compra bens das empresas.' },
  { id: 2, label: '+ Sistema financeiro', note: 'O que as famílias não consomem (poupança) vai para os bancos e mercados, que o emprestam às empresas para investir (I). Poupança = Investimento nos fechamentos de contas.' },
  { id: 3, label: '+ Exterior', note: 'Exportações (X) trazem demanda de fora; importações (M) vazam renda para fora. Fecha a identidade Y = C + I + G + X − M.' },
] as const

const Box = ({ x, y, w = 120, h = 46, t, accent }: { x: number; y: number; w?: number; h?: number; t: string; accent?: boolean }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="8" fill={accent ? 'var(--accent)' : 'var(--surface-2)'} stroke="var(--border)" />
    <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={accent ? 'var(--surface)' : 'var(--text)'}>{t}</text>
  </g>
)
const Arrow = ({ d, label, lx, ly, color = 'var(--text)', dash }: { d: string; label: string; lx: number; ly: number; color?: string; dash?: boolean }) => (
  <g>
    <path d={d} fill="none" stroke={color} strokeWidth="2.2" strokeDasharray={dash ? '6 4' : undefined} markerEnd="url(#cf-arrow)" />
    <text x={lx} y={ly} textAnchor="middle" fontSize="12" fill="var(--text)" paintOrder="stroke" stroke="var(--surface)" strokeWidth="4">{label}</text>
  </g>
)

export function CircularFlow() {
  const [st, setSt] = useState(0)
  return (
    <FigureFrame title="fluxo circular da renda" hint="Avance os estágios para ver cada setor entrar no circuito. As setas mostram o sentido do dinheiro; os mercados no centro mostram o que é trocado.">
      <div className="mb-3 flex flex-wrap gap-2">
        {STAGES.map((s) => (
          <button key={s.id} type="button" aria-pressed={st === s.id} onClick={() => setSt(s.id)} className={`rounded-md border px-3 py-1.5 text-sm font-medium ${st === s.id ? 'border-brand bg-brandsoft text-brand' : 'border-line hover:bg-surface2'}`}>{s.label}</button>
        ))}
      </div>
      <svg viewBox="0 0 560 340" role="img" aria-label="Diagrama do fluxo circular da renda entre famílias, empresas, governo, sistema financeiro e exterior" className="w-full" style={{ fontFamily: 'var(--font-sans)' }}>
        <defs>
          <marker id="cf-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="var(--text)" /></marker>
        </defs>
        <Box x={20} y={147} t="Famílias" accent />
        <Box x={420} y={147} t="Empresas" accent />
        <Box x={200} y={142} w={160} h={56} t="Mercados" />
        <text x={280} y={187} textAnchor="middle" fontSize="11" fill="var(--muted)">bens · trabalho · capital</text>
        <Arrow d="M80,147 C80,60 200,40 250,40 L350,40 C430,40 480,80 480,147" label="Gasto em consumo (C) → receita" lx={280} ly={32} color="var(--demand)" />
        <Arrow d="M480,193 C480,280 360,300 300,300 L260,300 C150,300 80,260 80,193" label="Salários, aluguéis, lucros (renda)" lx={280} ly={322} color="var(--supply)" />
        {st >= 1 && (<g><Box x={230} y={72} w={100} h={40} t="Governo" /><Arrow d="M110,147 L232,100" label="impostos" lx={150} ly={108} dash /><Arrow d="M330,92 L430,147" label="G" lx={398} ly={106} /></g>)}
        {st >= 2 && (<g><Box x={230} y={238} w={100} h={40} t="Bancos" /><Arrow d="M90,193 L232,252" label="poupança" lx={145} ly={236} dash /><Arrow d="M330,252 L450,193" label="crédito → I" lx={405} ly={248} /></g>)}
        {st >= 3 && (<g><Box x={470} y={8} w={80} h={36} t="Exterior" /><Arrow d="M510,44 L480,147" label="X" lx={512} ly={96} /><Arrow d="M450,147 L470,48" label="M" lx={432} ly={96} dash color="var(--red)" /></g>)}
      </svg>
      <p className="mt-2 text-sm">{STAGES[st].note}</p>
    </FigureFrame>
  )
}
