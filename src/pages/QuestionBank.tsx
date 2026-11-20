import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { QuizA, QuizB } from '../components/Quiz'
import { LESSONS } from '../content/content'
import { TRACK_BY_ID } from '../content/tracks'
import { useStore } from '../lib/store'
import type { QuizASpec, QuizBSpec } from '../lib/types'

interface Q {
  key: string
  lessonId: string
  lessonTitle: string
  track: string
  kind: 'A' | 'B'
  spec: QuizASpec | QuizBSpec
}

function collect(): Q[] {
  const out: Q[] = []
  const seen = new Set<string>()
  for (const l of LESSONS) {
    for (const s of l.segments) {
      if (s.kind !== 'quizA' && s.kind !== 'quizB') continue
      const key = `${l.id}:${s.spec.id}`
      if (seen.has(key)) continue
      seen.add(key)
      out.push({ key, lessonId: l.id, lessonTitle: l.title, track: l.track, kind: s.kind === 'quizA' ? 'A' : 'B', spec: s.spec })
    }
  }
  return out
}

const ALL = collect()

function shuffled<T>(xs: T[], seed: number): T[] {
  const a = [...xs]
  let t = seed >>> 0
  for (let i = a.length - 1; i > 0; i--) {
    t = (Math.imul(t, 1664525) + 1013904223) >>> 0
    const j = t % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function QuestionBank() {
  const quizzes = useStore((s) => s.p.quizzes)
  const [track, setTrack] = useState<string>('todas')
  const [kind, setKind] = useState<'todas' | 'A' | 'B'>('todas')
  const [seed, setSeed] = useState(0)
  const [idx, setIdx] = useState(0)

  const tracks = useMemo(() => {
    const ids = [...new Set(ALL.map((q) => q.track))]
    return ids.map((id) => ({ id, n: ALL.filter((q) => q.track === id).length })).sort((a, b) => (TRACK_BY_ID[a.id]?.order ?? 99) - (TRACK_BY_ID[b.id]?.order ?? 99))
  }, [])

  const pool = useMemo(() => {
    const f = ALL.filter((q) => (track === 'todas' || q.track === track) && (kind === 'todas' || q.kind === kind))
    return seed ? shuffled(f, seed) : f
  }, [track, kind, seed])

  const done = pool.filter((q) => quizzes[q.key]?.best !== undefined).length
  const q = pool[Math.min(idx, Math.max(0, pool.length - 1))]
  const chip = (on: boolean) => `rounded-full border px-3 py-1 text-sm font-medium ${on ? 'border-ink bg-surface2' : 'border-line text-muted hover:bg-surface2'}`

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por trilha">
        <button type="button" className={chip(track === 'todas')} aria-pressed={track === 'todas'} onClick={() => { setTrack('todas'); setIdx(0) }}>Todas ({ALL.length})</button>
        {tracks.map((t) => (
          <button key={t.id} type="button" className={chip(track === t.id)} aria-pressed={track === t.id} onClick={() => { setTrack(t.id); setIdx(0) }}>{TRACK_BY_ID[t.id]?.short ?? t.id} ({t.n})</button>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por tipo">
        {([['todas', 'Todos os tipos'], ['A', 'Tipo A (certo/errado)'], ['B', 'Tipo B (numérica)']] as const).map(([k, label]) => (
          <button key={k} type="button" className={chip(kind === k)} aria-pressed={kind === k} onClick={() => { setKind(k); setIdx(0) }}>{label}</button>
        ))}
        <button type="button" className="ml-auto rounded-md border border-line px-3 py-1 text-sm font-medium hover:bg-surface2" onClick={() => { setSeed((s) => s + 1); setIdx(0) }}>Embaralhar</button>
      </div>

      {!q ? (
        <p className="mt-6 rounded-lg border border-dashed border-line bg-surface p-5 text-muted">Nenhuma questão com esses filtros.</p>
      ) : (
        <div data-track={q.track} className="mt-5">
          <div className="mb-1 flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
            <span>Questão {Math.min(idx, pool.length - 1) + 1} de {pool.length}. Você já respondeu {done}.</span>
            <Link to={`/licao/${q.lessonId}`} className="text-brand underline underline-offset-4">Lição: {q.lessonTitle}</Link>
          </div>
          {q.kind === 'A' ? (
            <QuizA key={q.key} lessonId={q.lessonId} trackId={q.track} spec={q.spec as QuizASpec} />
          ) : (
            <QuizB key={q.key} lessonId={q.lessonId} trackId={q.track} spec={q.spec as QuizBSpec} />
          )}
          <div className="flex gap-2">
            <button type="button" disabled={idx === 0} onClick={() => setIdx(idx - 1)} className="rounded-md border border-line px-4 py-2 text-sm font-semibold disabled:opacity-40">Anterior</button>
            <button type="button" disabled={idx >= pool.length - 1} onClick={() => setIdx(idx + 1)} className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-paper disabled:opacity-40">Próxima</button>
          </div>
        </div>
      )}
    </div>
  )
}
