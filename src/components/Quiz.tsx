import { useState } from 'react'
import { scoreTipoA, scoreTipoB, type Marking } from '../lib/anpec'
import { useStore } from '../lib/store'
import type { QuizASpec, QuizBSpec } from '../lib/types'
import { Markdown } from './Markdown'

const OPTIONS: { v: Marking; label: string }[] = [
  { v: true, label: 'Certo' },
  { v: false, label: 'Errado' },
  { v: null, label: 'Em branco' },
]

export function QuizA({ lessonId, trackId, spec }: { lessonId: string; trackId: string; spec: QuizASpec }) {
  const key = `${lessonId}:${spec.id}`
  const best = useStore((s) => s.p.quizzes[key]?.best)
  const recordQuiz = useStore((s) => s.recordQuiz)
  const [answers, setAnswers] = useState<Marking[]>(() => spec.items.map(() => null))
  const [done, setDone] = useState(false)

  const score = done ? scoreTipoA(spec.items.map((i) => ({ correct: i.c })), answers) : null

  return (
    <section className="my-6 max-w-[46rem] rounded-lg border border-line bg-surface p-5" aria-label="Questão Tipo A">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="text-[0.95rem] font-semibold">Questão no formato ANPEC<span className="font-normal">. Tipo A, certo ou errado</span></span>
        {best !== undefined && <span className="text-xs text-muted">melhor resultado: {best.toFixed(2)}</span>}
      </div>
      <Markdown text={spec.stem} />
      <p className="mt-2 text-xs text-muted">Acerto vale +1, erro vale −1 e em branco vale 0. O resultado é a soma dividida pelo número de itens.</p>
      <ol className="mt-3 space-y-3">
        {spec.items.map((it, i) => {
          const r = score?.perItem[i]
          return (
            <li key={i} className="rounded-md border border-line p-3">
              <div className="flex gap-2">
                <span className="font-bold">{String(i).padStart(2, '0')}.</span>
                <div className="flex-1">
                  <Markdown text={it.t} />
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label={`Item ${i}`}>
                {OPTIONS.map((o) => (
                  <button
                    key={o.label}
                    role="radio"
                    aria-checked={answers[i] === o.v}
                    disabled={done}
                    onClick={() => setAnswers((a) => a.map((x, j) => (j === i ? o.v : x)))}
                    className={`rounded-lg border px-3 py-1 text-sm ${
                      answers[i] === o.v ? 'border-brand bg-brandsoft font-semibold' : 'border-line'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
              {done && (
                <p className={`mt-2 text-sm font-semibold ${r === 'right' ? 'text-ok' : r === 'wrong' ? 'text-bad' : 'text-muted'}`}>
                  {r === 'right' ? '✓ Acertou (+1)' : r === 'wrong' ? '✗ Errou (−1)' : 'Em branco (0)'}. Gabarito: {it.c ? 'Certo' : 'Errado'}
                </p>
              )}
            </li>
          )
        })}
      </ol>
      {!done ? (
        <button
          onClick={() => {
            const s = scoreTipoA(spec.items.map((i) => ({ correct: i.c })), answers)
            setDone(true)
            recordQuiz(key, trackId, s.rq)
          }}
          className="mt-4 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-paper"
        >
          Corrigir
        </button>
      ) : (
        <div className="mt-4 space-y-3">
          <p className="rounded-lg bg-surface2 p-3 font-semibold">
            Resultado da questão: {score!.points >= 0 ? '+' : ''}
            {score!.points}/{score!.valid} = {score!.rq.toFixed(2)}
          </p>
          {spec.explanation && <Markdown text={spec.explanation} />}
          <button
            onClick={() => {
              setAnswers(spec.items.map(() => null))
              setDone(false)
            }}
            className="rounded-lg border border-line px-3 py-1.5 text-sm"
          >
            Tentar de novo
          </button>
        </div>
      )}
    </section>
  )
}

export function QuizB({ lessonId, trackId, spec }: { lessonId: string; trackId: string; spec: QuizBSpec }) {
  const key = `${lessonId}:${spec.id}`
  const recordQuiz = useStore((s) => s.recordQuiz)
  const [text, setText] = useState('')
  const [done, setDone] = useState(false)
  const parsed = /^\d{1,2}$/.test(text.trim()) ? Number(text) : null
  const ok = done && scoreTipoB(spec.answer, parsed).rq === 1

  return (
    <section className="my-6 max-w-[46rem] rounded-lg border border-line bg-surface p-5" aria-label="Questão Tipo B">
      <span className="text-[0.95rem] font-semibold">Questão no formato ANPEC<span className="font-normal">. Tipo B, resposta numérica</span></span>
      <div className="mt-2">
        <Markdown text={spec.stem} />
      </div>
      <p className="mt-2 text-xs text-muted">Resposta: um número inteiro de 00 a 99.</p>
      <div className="mt-3 flex gap-2">
        <input
          inputMode="numeric"
          value={text}
          onChange={(e) => setText(e.target.value.replace(/\D/g, '').slice(0, 2))}
          disabled={done}
          aria-label="Resposta de 00 a 99"
          className="w-24 rounded-lg border border-line bg-surface px-3 py-2 font-mono text-lg"
        />
        {!done ? (
          <button
            disabled={parsed === null}
            onClick={() => {
              setDone(true)
              recordQuiz(key, trackId, scoreTipoB(spec.answer, parsed).rq)
            }}
            className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-paper"
          >
            Corrigir
          </button>
        ) : (
          <button
            onClick={() => {
              setText('')
              setDone(false)
            }}
            className="rounded-lg border border-line px-3 py-2 text-sm"
          >
            Tentar de novo
          </button>
        )}
      </div>
      {done && (
        <div className="mt-3 space-y-2">
          <p className={`font-semibold ${ok ? 'text-ok' : 'text-bad'}`}>
            {ok ? '✓ Correto!' : `✗ Não foi dessa vez. Gabarito: ${String(spec.answer).padStart(2, '0')}`}
          </p>
          {spec.explanation && <Markdown text={spec.explanation} />}
        </div>
      )}
    </section>
  )
}
