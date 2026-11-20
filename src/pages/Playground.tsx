import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CodeEditor } from '../components/CodeEditor'
import { runOnly, type RunResult } from '../lib/runners'
import type { Lang } from '../lib/types'

const SQL_DATA = `CREATE TABLE municipios (id INTEGER PRIMARY KEY, nome TEXT, uf TEXT, populacao INTEGER, pib_milhoes REAL);
INSERT INTO municipios VALUES
 (1,'Vila Azul','SP',120000,3400.5),(2,'Campo Verde','SP',45000,900.0),
 (3,'Porto Seco','MG',80000,1500.2),(4,'Serra Alta','MG',30000,410.7),
 (5,'Lagoa Clara','BA',150000,2100.0),(6,'Morro Novo','BA',22000,250.3),
 (7,'Rio Manso','SP',300000,9800.9),(8,'Pedra Fina','RS',60000,1700.0);`

const START: Record<Lang, string> = {
  python: '# Python roda aqui, de verdade.\nvalores = [3, 5, 8, 13]\nprint(sum(valores) / len(valores))\n',
  sql: '-- A tabela municipios (dados fictícios) já existe.\nSELECT uf, COUNT(*) AS n, SUM(populacao) AS pop\nFROM municipios\nGROUP BY uf\nORDER BY pop DESC;\n',
  r: '# R roda aqui, de verdade.\nx <- c(2, 4, 6, 8)\nmean(x)\nsummary(x)\n',
}
const LABEL: Record<Lang, string> = { python: 'Python', sql: 'SQL', r: 'R' }

export function Playground() {
  const [lang, setLang] = useState<Lang>('python')
  const [codes, setCodes] = useState<Record<Lang, string>>(START)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  const [res, setRes] = useState<RunResult | null>(null)

  async function run() {
    setBusy(true)
    setRes(null)
    try {
      setRes(await runOnly(lang, codes[lang], lang === 'sql' ? SQL_DATA : undefined, setStatus))
    } finally {
      setBusy(false)
      setStatus('')
    }
  }

  return (
    <div className="mx-auto max-w-4xl" data-kind="code">
      <Link to="/laboratorio" className="text-sm text-brand underline underline-offset-4">Laboratório</Link>
      <h1 className="mt-2 text-[2rem] font-semibold leading-tight tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>Editor livre</h1>
      <p className="mt-1 text-muted">Sem exercício, sem nota. Seu código de cada linguagem fica guardado enquanto você troca de aba.</p>

      <div className="mt-5 inline-flex rounded-md border border-line bg-surface p-1" role="tablist" aria-label="Linguagem">
        {(Object.keys(LABEL) as Lang[]).map((l) => (
          <button key={l} role="tab" aria-selected={lang === l} onClick={() => { setLang(l); setRes(null) }}
            className={`rounded px-4 py-1.5 text-sm font-semibold ${lang === l ? 'bg-ink text-paper' : 'text-muted'}`}>
            {LABEL[l]}
          </button>
        ))}
      </div>

      <div className="mt-3 overflow-hidden rounded-md border border-line">
        <CodeEditor lang={lang} value={codes[lang]} onChange={(v) => setCodes((c) => ({ ...c, [lang]: v }))} minHeight="14rem" />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button onClick={run} disabled={busy} className="rounded-md bg-brand px-5 py-2 text-sm font-semibold text-paper">{busy ? 'Executando' : 'Executar'}</button>
        {busy && status && <span className="text-sm text-muted" role="status">{status}</span>}
        {res && <span className="text-xs text-muted">{Math.round(res.ms)} ms</span>}
      </div>

      {res && (
        <div className="mt-4 space-y-3" aria-live="polite">
          {!res.ok && <pre className="whitespace-pre-wrap rounded-md bg-badsoft p-3 text-sm text-bad">{res.stderr || 'Erro ao executar.'}</pre>}
          {res.table && (
            <div className="overflow-x-auto rounded-md border border-line bg-surface">
              <table className="w-full text-sm">
                <thead className="bg-surface2"><tr>{res.table.columns.map((c) => <th key={c} className="px-3 py-1.5 text-left font-semibold">{c}</th>)}</tr></thead>
                <tbody>{res.table.rows.slice(0, 100).map((r, i) => <tr key={i} className="border-t border-line">{r.map((v, j) => <td key={j} className="px-3 py-1 font-mono">{v === null ? 'NULL' : String(v)}</td>)}</tr>)}</tbody>
              </table>
            </div>
          )}
          {res.stdout && <pre className="whitespace-pre-wrap rounded-md border border-line bg-surface p-3 font-mono text-sm">{res.stdout}</pre>}
          {res.ok && res.stderr && <pre className="whitespace-pre-wrap rounded-md bg-warnsoft p-3 text-xs text-warn">{res.stderr}</pre>}
          {res.ok && !res.stdout && !res.table && !res.stderr && <p className="text-sm text-muted">O código rodou e não imprimiu nada. Use print() em Python ou deixe um valor na última linha em R.</p>}
        </div>
      )}
    </div>
  )
}
