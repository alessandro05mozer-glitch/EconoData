import type { Database, SqlJsStatic, QueryExecResult } from 'sql.js'
import type { ExerciseSpec } from '../types'
import { failedRun, type ResultTable, type RunResult, type TestResult } from './types'

// Lógica de correção de SQL separada do carregamento do WebAssembly, para poder ser testada.

type Cell = unknown

function lastResult(res: QueryExecResult[]): ResultTable | undefined {
  if (res.length === 0) return undefined
  const r = res[res.length - 1]
  return { columns: r.columns, rows: r.values as Cell[][] }
}

function cellKey(v: Cell): string {
  if (v === null || v === undefined) return '∅'
  if (typeof v === 'number') return `n:${Number.isInteger(v) ? v : v.toFixed(9)}`
  return `s:${String(v)}`
}

function rowKey(row: Cell[]): string {
  return row.map(cellKey).join('\u0001')
}

function freshDb(SQL: SqlJsStatic, dataset?: string): Database {
  const db = new SQL.Database()
  if (dataset?.trim()) db.exec(dataset)
  return db
}

export function runSql(SQL: SqlJsStatic, spec: ExerciseSpec | null, dataset: string | undefined, code: string): RunResult {
  const t0 = performance.now()
  const db = freshDb(SQL, dataset)
  let table: ResultTable | undefined
  try {
    table = lastResult(db.exec(code))
  } catch (e) {
    db.close()
    return failedRun(e instanceof Error ? e.message : String(e), Math.round(performance.now() - t0))
  }
  db.close()

  const tests: TestResult[] = []
  if (spec) {
    let expected: ResultTable | undefined
    const ref = freshDb(SQL, dataset)
    try {
      expected = lastResult(ref.exec(spec.solution))
    } finally {
      ref.close()
    }
    if (!expected) throw new Error(`A solução do exercício "${spec.id}" não devolve resultado.`)

    const hasRows = !!table && table.rows.length > 0
    tests.push({
      name: 'A consulta devolve resultado',
      passed: !!table,
      message: table ? undefined : 'Escreva uma consulta SELECT.',
    })
    const sameCols = !!table && table.columns.length === expected.columns.length
    tests.push({
      name: `O resultado tem ${expected.columns.length} coluna(s)`,
      passed: sameCols,
      message: table ? `Sua consulta devolveu ${table.columns.length}.` : undefined,
    })
    const sameCount = hasRows && table!.rows.length === expected.rows.length
    tests.push({
      name: `O resultado tem ${expected.rows.length} linha(s)`,
      passed: sameCount,
      message: table ? `Sua consulta devolveu ${table.rows.length}.` : undefined,
    })
    let sameValues = false
    if (table && sameCols && sameCount) {
      const mine = table.rows.map(rowKey)
      const want = expected.rows.map(rowKey)
      if (!spec.ordered) {
        mine.sort()
        want.sort()
      }
      sameValues = mine.every((k, i) => k === want[i])
    }
    tests.push({
      name: spec.ordered ? 'Os valores e a ordem das linhas estão corretos' : 'Os valores estão corretos',
      passed: sameValues,
      message: sameValues || !table ? undefined : 'Algum valor ou a ordem das linhas está diferente do esperado.',
    })
  }

  return { ok: true, stdout: '', stderr: '', table, tests, ms: Math.round(performance.now() - t0) }
}
