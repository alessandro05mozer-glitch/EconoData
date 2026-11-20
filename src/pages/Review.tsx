import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Markdown } from '../components/Markdown'
import { todayISO } from '../lib/dates'
import { dueCards } from '../lib/progress'
import type { Grade } from '../lib/srs'
import { useStore } from '../lib/store'

const GRADES: { g: Grade; label: string; cls: string }[] = [
  { g: 'again', label: 'Errei', cls: 'bg-badsoft text-bad' },
  { g: 'hard', label: 'Difícil', cls: 'bg-warnsoft text-warn' },
  { g: 'good', label: 'Bom', cls: 'bg-brandsoft text-brand' },
  { g: 'easy', label: 'Fácil', cls: 'bg-oksoft text-ok' },
]

export function Review() {
  const p = useStore((s) => s.p)
  const reviewCard = useStore((s) => s.reviewCard)
  const [flipped, setFlipped] = useState(false)
  const [reviewed, setReviewed] = useState(0)
  const due = useMemo(() => dueCards(p, todayISO()), [p])
  const total = Object.keys(p.cards).length
  const card = due[0]

  if (!card) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-semibold" style={{ fontFamily: 'var(--font-serif)' }}>Revisão espaçada</h1>
        <p className="mt-4 text-lg">{reviewed > 0 ? `Pronto! Você revisou ${reviewed} ${reviewed === 1 ? 'cartão' : 'cartões'} hoje.` : total === 0 ? 'Ainda não há cartões.' : 'Nada para revisar agora.'}</p>
        <p className="mt-2 text-muted">
          {total === 0
            ? 'Cartões surgem quando você conclui uma lição e quando guarda um exercício que errou.'
            : `Você tem ${total} ${total === 1 ? 'cartão' : 'cartões'} no total. Eles voltam no dia certo.`}
        </p>
        <Link to="/" className="mt-4 inline-block rounded-md bg-brand px-5 py-2.5 font-semibold text-paper">Estudar uma lição</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-semibold" style={{ fontFamily: 'var(--font-serif)' }}>Revisão espaçada</h1>
      <p className="text-sm text-muted">{due.length} para revisar agora</p>
      <div className="mt-4 rounded-lg border border-line bg-surface p-5">
        <p className="mb-2 text-sm font-semibold text-muted">Pergunta</p>
        <Markdown text={card.front} />
        {flipped ? (
          <>
            <hr className="my-4 border-line" />
            <p className="mb-2 text-sm font-semibold text-muted">Resposta</p>
            <Markdown text={card.back} />
          </>
        ) : (
          <button onClick={() => setFlipped(true)} className="mt-4 w-full rounded-md bg-brand py-2.5 font-semibold text-paper">
            Mostrar resposta
          </button>
        )}
      </div>
      {flipped && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {GRADES.map((g) => (
            <button
              key={g.g}
              onClick={() => {
                reviewCard(card.id, g.g)
                setFlipped(false)
                setReviewed((n) => n + 1)
              }}
              className={`rounded-md py-2.5 text-sm font-semibold ${g.cls}`}
            >
              {g.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
