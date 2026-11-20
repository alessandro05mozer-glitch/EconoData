import { useState } from 'react'
import { IPCA_ANUAL } from '../../lib/data/brasil'
import { FigureFrame } from './FigureFrame'

type Kind = 'monetaria' | 'fiscal' | 'inflacao'
const KINDS: { id: Kind; label: string; color: string }[] = [
  { id: 'monetaria', label: 'Regime monetário e cambial', color: 'var(--demand)' },
  { id: 'fiscal', label: 'Regras fiscais', color: 'var(--supply)' },
  { id: 'inflacao', label: 'Inflação medida (IPCA)', color: 'var(--red)' },
]
const fmt = (y: number) => `${String(IPCA_ANUAL[y]).replace('.', ',')}%`
const EVENTS: { when: string; kind: Kind; title: string; text: string }[] = [
  { when: 'Mar/1994', kind: 'monetaria', title: 'URV', text: 'A Unidade Real de Valor passa a ser a referência de preços e contratos, enquanto o cruzeiro real seguia inflacionando. Foi a ponte entre o caos e a moeda nova.' },
  { when: 'Jul/1994', kind: 'monetaria', title: 'Nasce o real', text: 'O real substitui o cruzeiro real. A âncora é o câmbio, com apoio de juros altos e restrição de crédito.' },
  { when: '1995', kind: 'inflacao', title: `IPCA ${fmt(1995)}`, text: 'Primeiro ano cheio do real. Ainda alta pelos padrões atuais, mas muito abaixo da escalada de antes.' },
  { when: 'Jan/1999', kind: 'monetaria', title: 'Câmbio flutuante', text: 'O Brasil abandona a âncora cambial depois de pressão sobre as reservas. O real se desvaloriza fortemente.' },
  { when: 'Jun/1999', kind: 'monetaria', title: 'Metas de inflação', text: 'Passa a valer o regime de metas: o Banco Central persegue um número de inflação anunciado, usando a Selic.' },
  { when: 'Mai/2000', kind: 'fiscal', title: 'Lei de Responsabilidade Fiscal', text: 'Limites para despesa com pessoal e endividamento dos entes da federação, e metas fiscais anuais.' },
  { when: '2002', kind: 'inflacao', title: `IPCA ${fmt(2002)}`, text: 'Pico do período pós-1999, em ano de forte desvalorização cambial e incerteza eleitoral.' },
  { when: '2015', kind: 'inflacao', title: `IPCA ${fmt(2015)}`, text: 'Reajuste de preços administrados e câmbio em meio à recessão: inflação de dois dígitos de novo.' },
  { when: 'Dez/2016', kind: 'fiscal', title: 'Teto de gastos', text: 'A Emenda Constitucional 95 limita o crescimento da despesa primária federal à inflação do ano anterior.' },
  { when: '2021', kind: 'inflacao', title: `IPCA ${fmt(2021)}`, text: 'Choques de energia, alimentos e combustíveis, com cadeias globais desorganizadas, levam o IPCA de volta a dois dígitos.' },
  { when: 'Fev/2021', kind: 'monetaria', title: 'Autonomia do Banco Central', text: 'A Lei Complementar 179 dá mandatos fixos à diretoria do Banco Central, desvinculados do mandato presidencial.' },
  { when: '2025', kind: 'inflacao', title: `IPCA ${fmt(2025)}`, text: 'Acima do centro da meta (3%), mas ainda dentro da banda de tolerância, que vai até 4,5%.' },
]

export function RealTimeline() {
  const [on, setOn] = useState<Record<Kind, boolean>>({ monetaria: true, fiscal: true, inflacao: true })
  const list = EVENTS.filter((e) => on[e.kind])
  return (
    <FigureFrame title="linha do tempo: do Plano Real às metas de inflação" hint="Filtre por tipo de evento. Os valores de inflação são o IPCA do ano (IBGE).">
      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filtrar eventos">
        {KINDS.map((k) => (
          <button key={k.id} type="button" aria-pressed={on[k.id]} onClick={() => setOn({ ...on, [k.id]: !on[k.id] })} className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium ${on[k.id] ? 'border-ink bg-surface2' : 'border-line text-muted line-through'}`}>
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: k.color }} />
            {k.label}
          </button>
        ))}
      </div>
      <ol className="relative ml-2 border-l-2 border-line pl-5">
        {list.map((e) => {
          const k = KINDS.find((x) => x.id === e.kind)!
          return (
            <li key={e.when + e.title} className="relative pb-4 last:pb-0">
              <span className="absolute -left-[1.72rem] top-1.5 h-3 w-3 rounded-full border-2 border-surface" style={{ background: k.color }} />
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-mono text-sm font-semibold">{e.when}</span>
                <span className="font-semibold">{e.title}</span>
              </div>
              <p className="text-sm text-muted">{e.text}</p>
            </li>
          )
        })}
      </ol>
    </FigureFrame>
  )
}
