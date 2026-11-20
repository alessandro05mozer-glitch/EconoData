export interface TestResult {
  name: string
  passed: boolean
  message?: string
}

export interface ResultTable {
  columns: string[]
  rows: unknown[][]
}

export interface RunResult {
  /** O código rodou sem erro de execução */
  ok: boolean
  stdout: string
  stderr: string
  /** Resultado tabular (SQL) */
  table?: ResultTable
  tests: TestResult[]
  ms: number
}

export type StatusFn = (text: string) => void

export function allPassed(r: RunResult): boolean {
  return r.ok && r.tests.length > 0 && r.tests.every((t) => t.passed)
}

export function failedRun(message: string, ms = 0): RunResult {
  return { ok: false, stdout: '', stderr: message, tests: [], ms }
}
