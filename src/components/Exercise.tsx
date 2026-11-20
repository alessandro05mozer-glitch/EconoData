import { useState } from 'react'
import { allPassed, runExercise, runOnly, type RunResult } from '../lib/runners'
import { useStore } from '../lib/store'
import type { ExerciseSpec } from '../lib/types'
import { CodeEditor } from './CodeEditor'
import { Markdown } from './Markdown'

const LANG_LABEL = { python: 'Python', sql: 'SQL', r: 'R' } as const

function Table({ columns, rows }: { columns: string[]; rows: unknown[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full text-sm">
        <thead className="bg-surface2">
          <tr>
            {columns.map((c) => (
              <th key={c} className="px-3 py-1.5 text-left font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, 50).map((row, i) => (
            <tr key={i} className="border-t border-line">
              {row.map((v, j) => (
                <td key={j} className="px-3 py-1 font-mono">
                  {v === null ? <span className="text-muted">NULL</span> : String(v)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length > 50 && <p className="px-3 py-1 text-xs text-muted">Mostrando 50 de {rows.length} linhas.</p>}
    </div>
  )
}

export function Exercise({ lessonId, trackId, spec }: { lessonId: string; trackId: string; spec: ExerciseSpec }) {
  const key = `${lessonId}:${spec.id}`
  const progress = useStore((s) => s.p.exercises[key])
  const recordExercise = useStore((s) => s.recordExercise)
  const addErrorCards = useStore((s) => s.addErrorCards)

  const [code, setCode] = useState(spec.starter)
  const [busy, setBusy] = useState<null | 'run' | 'check'>(null)
  const [status, setStatus] = useState('')
  const [result, setResult] = useState<RunResult | null>(null)
  const [hintsShown, setHintsShown] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [saved, setSaved] = useState(false)

  async function run(mode: 'run' | 'check') {
    setBusy(mode)
    setStatus('')
    setSaved(false)
    try {
      const res =
        mode === 'check'
          ? await runExercise(spec, code, setStatus)
          : await runOnly(spec.lang, code, spec.dataset, setStatus)
      setResult(res)
      if (mode === 'check') recordExercise(key, trackId, allPassed(res))
    } finally {
      setBusy(null)
      setStatus('')
    }
  }

  const passed = result ? allPassed(result) : false
  const failedCheck = result && result.tests.length > 0 && !passed

  return (
    <section className="my-6 rounded-2xl border border-line bg-surface p-4 shadow-sm" aria-label="Exercício de código">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-brandsoft px-2.5 py-0.5 text-xs font-bold text-brand">
          Exercício · {LANG_LABEL[spec.lang]}
        </span>
        {progress?.passed && <span className="rounded-full bg-oksoft px-2.5 py-0.5 text-xs font-bold text-ok">✓ resolvido</span>}
      </div>
      <Markdown text={spec.prompt} />

      <div className="mt-3 overflow-hidden rounded-lg border border-line">
        <CodeEditor lang={spec.lang} value={code} onChange={setCode} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={() => run('check')}
          disabled={busy !== null}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white"
        >
          {busy === 'check' ? 'Verificando…' : 'Verificar resposta'}
        </button>
        <button
          onClick={() => run('run')}
          disabled={busy !== null}
          className="rounded-lg border border-line bg-surface2 px-4 py-2 text-sm font-semibold"
        >
          {busy === 'run' ? 'Executando…' : 'Só executar'}
        </button>
        <button
          onClick={() => setCode(spec.starter)}
          disabled={busy !== null}
          className="rounded-lg px-3 py-2 text-sm text-muted underline"
        >
          Recomeçar
        </button>
      </div>
      {busy && status && <p className="mt-2 text-sm text-muted" role="status">{status}</p>}

      {result && (
        <div className="mt-4 space-y-3" aria-live="polite">
          {passed && (
            <p className="rounded-lg bg-oksoft p-3 text-sm font-semibold text-ok">
              Correto! Todos os testes passaram.
            </p>
          )}
          {!result.ok && (
            <pre className="whitespace-pre-wrap rounded-lg bg-badsoft p-3 text-sm text-bad">{result.stderr || 'Erro ao executar.'}</pre>
          )}
          {result.table && <Table columns={result.table.columns} rows={result.table.rows} />}
          {result.stdout && (
            <pre className="whitespace-pre-wrap rounded-lg bg-surface2 p-3 text-sm">{result.stdout}</pre>
          )}
          {result.ok && result.stderr && (
            <pre className="whitespace-pre-wrap rounded-lg bg-warnsoft p-3 text-xs text-warn">{result.stderr}</pre>
          )}
          {result.tests.length > 0 && (
            <ul className="space-y-1 text-sm">
              {result.tests.map((t, i) => (
                <li key={i} className={t.passed ? 'text-ok' : 'text-bad'}>
                  {t.passed ? '✓' : '✗'} {t.name}
                  {!t.passed && t.message ? <span className="text-muted"> — {t.message}</span> : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        {hintsShown < spec.hints.length && (
          <button onClick={() => setHintsShown((n) => n + 1)} className="rounded-lg border border-line px-3 py-1.5">
            💡 Dica {hintsShown + 1} de {spec.hints.length}
          </button>
        )}
        {(progress?.attempts ?? 0) > 0 && !showSolution && (
          <button onClick={() => setShowSolution(true)} className="rounded-lg border border-line px-3 py-1.5">
            Ver solução
          </button>
        )}
        {failedCheck && !saved && (
          <button
            onClick={() => {
              addErrorCards([
                { id: `err:${key}`, lessonId, trackId, front: spec.prompt, back: '```\n' + spec.solution.trim() + '\n```' },
              ])
              setSaved(true)
            }}
            className="rounded-lg border border-line px-3 py-1.5"
          >
            Guardar na revisão
          </button>
        )}
        {saved && <span className="text-muted">Guardado na revisão.</span>}
      </div>
      {spec.hints.slice(0, hintsShown).map((h, i) => (
        <div key={i} className="mt-2 rounded-lg bg-warnsoft p-3 text-sm">
          <Markdown text={h} />
        </div>
      ))}
      {showSolution && (
        <div className="mt-3">
          <p className="mb-1 text-sm font-semibold">Uma solução possível:</p>
          <pre className="overflow-x-auto rounded-lg bg-surface2 p-3 text-sm">{spec.solution.trim()}</pre>
        </div>
      )}
    </section>
  )
}
