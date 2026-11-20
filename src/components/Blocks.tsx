import { useState } from 'react'
import type { CalloutVariant } from '../lib/types'
import { Markdown } from './Markdown'

const STYLE: Record<CalloutVariant, { label: string; box: string; bar: string; head: string }> = {
  definicao: { label: 'Definição', box: 'bg-surface', bar: 'border-l-ink', head: 'text-ink' },
  intuicao: { label: 'Intuição', box: 'bg-brandsoft', bar: 'border-l-brand', head: 'text-brand' },
  atencao: { label: 'Atenção', box: 'bg-warnsoft', bar: 'border-l-warn', head: 'text-warn' },
  resumo: { label: 'Para levar', box: 'bg-mark text-markink', bar: 'border-l-markink', head: 'text-markink' },
  nota: { label: 'Nota', box: 'bg-surface2', bar: 'border-l-muted', head: 'text-muted' },
}

export function Callout({ variant, title, text }: { variant: CalloutVariant; title: string; text: string }) {
  const s = STYLE[variant]
  return (
    <aside className={`my-5 max-w-[46rem] rounded-r-md border-l-4 px-5 py-4 ${s.box} ${s.bar} ${variant === 'definicao' ? 'border-y border-r border-y-line border-r-line' : ''}`}>
      <p className={`mb-1.5 text-[0.95rem] font-semibold ${s.head}`}>
        {s.label}
        {title ? <span className="font-normal">. {title}</span> : null}
      </p>
      <Markdown text={text} compact />
    </aside>
  )
}

export function Steps({ title, problem, steps }: { title: string; problem: string; steps: string[] }) {
  const [shown, setShown] = useState(0)
  const all = shown >= steps.length
  return (
    <section className="my-6 max-w-[46rem] overflow-hidden rounded-lg border border-line bg-surface" aria-label={`Exemplo resolvido: ${title}`}>
      <div className="border-b border-line bg-surface2 px-5 py-3">
        <p className="text-[0.95rem] font-semibold">
          Exemplo resolvido{title ? <span className="font-normal">. {title}</span> : null}
        </p>
      </div>
      <div className="px-5 py-4">
        <Markdown text={problem} compact />
      </div>
      {steps.length > 0 && (
        <ol className="border-t border-line">
          {steps.slice(0, shown).map((t, i) => (
            <li key={i} className="flex gap-4 border-b border-line px-5 py-4 last:border-b-0">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-semibold text-paper">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <Markdown text={t} compact />
              </div>
            </li>
          ))}
        </ol>
      )}
      <div className="flex flex-wrap items-center gap-3 border-t border-line px-5 py-3">
        {!all ? (
          <>
            <button onClick={() => setShown((n) => n + 1)} className="rounded-md bg-ink px-4 py-1.5 text-sm font-semibold text-paper">
              {shown === 0 ? 'Mostrar o primeiro passo' : `Mostrar o passo ${shown + 1} de ${steps.length}`}
            </button>
            <button onClick={() => setShown(steps.length)} className="text-sm text-muted underline underline-offset-4">
              Mostrar tudo
            </button>
            <span className="text-xs text-muted">Tente resolver sozinho antes de abrir cada passo.</span>
          </>
        ) : (
          <button onClick={() => setShown(0)} className="text-sm text-muted underline underline-offset-4">
            Esconder os passos e tentar de novo
          </button>
        )}
      </div>
    </section>
  )
}

export function Think({ title, question, answer }: { title: string; question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <section className="my-6 max-w-[46rem] rounded-lg border-2 border-dashed border-brand bg-surface px-5 py-4" aria-label="Pause e pense">
      <p className="mb-1.5 text-[0.95rem] font-semibold text-brand">
        Pause e pense{title ? <span className="font-normal">. {title}</span> : null}
      </p>
      <Markdown text={question} compact />
      {open ? (
        <div className="mt-4 border-t border-line pt-3">
          <p className="mb-1 text-sm font-semibold">Resposta</p>
          <Markdown text={answer} compact />
        </div>
      ) : (
        <button onClick={() => setOpen(true)} className="mt-3 rounded-md border border-brand px-4 py-1.5 text-sm font-semibold text-brand">
          Mostrar a resposta
        </button>
      )}
    </section>
  )
}
