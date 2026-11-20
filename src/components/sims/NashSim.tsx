import { useState } from 'react'
import { colBest, pureNash, rowBest, socialOptimum, type Payoffs } from '../../lib/sim/game'
import { FigureFrame } from './FigureFrame'

const PRESETS: { name: string; rows: [string, string]; cols: [string, string]; p: Payoffs; note: string }[] = [
  { name: 'Dilema dos prisioneiros', rows: ['Calar', 'Confessar'], cols: ['Calar', 'Confessar'], p: [[[-1, -1], [-3, 0]], [[0, -3], [-2, -2]]], note: 'Confessar é dominante para os dois, mas ambos ficam pior do que se tivessem calado. Equilíbrio individualmente racional, resultado coletivamente ruim.' },
  { name: 'Guerra de preços', rows: ['Preço alto', 'Preço baixo'], cols: ['Preço alto', 'Preço baixo'], p: [[[10, 10], [2, 14]], [[14, 2], [5, 5]]], note: 'Duas empresas: cada uma ganha ao baixar o preço quando a outra mantém, e as duas terminam com lucro menor. É a lógica de cartéis que não param em pé.' },
  { name: 'Coordenação', rows: ['Padrão A', 'Padrão B'], cols: ['Padrão A', 'Padrão B'], p: [[[2, 2], [0, 0]], [[0, 0], [1, 1]]], note: 'Dois equilíbrios: adotar o mesmo padrão. Qual deles acontece depende de expectativas, não do cálculo.' },
  { name: 'Par ou ímpar', rows: ['Par', 'Ímpar'], cols: ['Par', 'Ímpar'], p: [[[1, -1], [-1, 1]], [[-1, 1], [1, -1]]], note: 'Não há equilíbrio em estratégias puras: quem for previsível perde. A solução exige aleatorizar (estratégia mista).' },
]

export function NashSim() {
  const [k, setK] = useState(0)
  const g = PRESETS[k]
  const nash = pureNash(g.p)
  const best = socialOptimum(g.p)
  const isN = (r: number, c: number) => nash.some(([a, b]) => a === r && b === c)
  return (
    <FigureFrame title="teoria dos jogos: ache o equilíbrio de Nash" hint="Em cada coluna, o pagamento do jogador de linha que é melhor resposta fica em negrito sublinhado; em cada linha, o do jogador de coluna. A célula com os dois destacados é um equilíbrio de Nash.">
      <div className="mb-3 flex flex-wrap gap-2">
        {PRESETS.map((x, i) => (
          <button key={x.name} type="button" onClick={() => setK(i)} aria-pressed={i === k} className={`rounded-md border px-3 py-1.5 text-sm font-medium ${i === k ? 'border-brand bg-brandsoft text-brand' : 'border-line hover:bg-surface2'}`}>{x.name}</button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full max-w-[34rem] border-separate border-spacing-1.5 text-center">
          <thead>
            <tr>
              <th className="text-xs font-normal text-muted">Linha ↓ / Coluna →</th>
              {g.cols.map((c) => (<th key={c} className="rounded bg-surface2 px-2 py-1.5 text-sm font-semibold">{c}</th>))}
            </tr>
          </thead>
          <tbody>
            {[0, 1].map((r) => (
              <tr key={r}>
                <th className="rounded bg-surface2 px-2 py-2 text-left text-sm font-semibold">{g.rows[r]}</th>
                {[0, 1].map((c) => {
                  const rb = rowBest(g.p, c as 0 | 1).includes(r)
                  const cb = colBest(g.p, r as 0 | 1).includes(c)
                  const n = isN(r, c)
                  return (
                    <td key={c} className={`rounded-md border-2 px-3 py-3 font-mono text-lg ${n ? 'border-brand bg-brandsoft' : 'border-line bg-surface'}`}>
                      <span className={rb ? 'font-bold underline decoration-2 underline-offset-4' : 'text-muted'}>{g.p[r][c][0]}</span>
                      <span className="text-muted">, </span>
                      <span className={cb ? 'font-bold underline decoration-2 underline-offset-4' : 'text-muted'}>{g.p[r][c][1]}</span>
                      {n && <div className="mt-1 font-sans text-xs font-semibold text-brand">Equilíbrio de Nash</div>}
                      {best[0] === r && best[1] === c && <div className="font-sans text-xs text-muted">Melhor soma dos pagamentos</div>}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm">{nash.length === 0 ? 'Equilíbrios puros: nenhum. ' : nash.length === 1 ? 'Um equilíbrio puro. ' : `${nash.length} equilíbrios puros. `}{g.note}</p>
    </FigureFrame>
  )
}
