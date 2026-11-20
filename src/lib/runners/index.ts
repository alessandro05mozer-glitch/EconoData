import type { ExerciseSpec, Lang } from '../types'
import { pythonRunner } from './python'
import { rRunner } from './r'
import { runSqlCode } from './sql'
import type { RunResult, StatusFn } from './types'

export { allPassed } from './types'
export type { RunResult, TestResult } from './types'

/** Roda o código do aluno e confere com os testes do exercício. */
export function runExercise(spec: ExerciseSpec, code: string, onStatus?: StatusFn): Promise<RunResult> {
  switch (spec.lang) {
    case 'python':
      return pythonRunner.run(code, spec.tests, onStatus)
    case 'r':
      return rRunner.run(code, spec.tests, onStatus)
    case 'sql':
      return runSqlCode(spec, spec.dataset, code)
  }
}

/** Só executa, sem testes (botão "Executar"). */
export function runOnly(lang: Lang, code: string, dataset: string | undefined, onStatus?: StatusFn): Promise<RunResult> {
  switch (lang) {
    case 'python':
      return pythonRunner.run(code, undefined, onStatus)
    case 'r':
      return rRunner.run(code, undefined, onStatus)
    case 'sql':
      return runSqlCode(null, dataset, code)
  }
}

export function resetRunners() {
  pythonRunner.reset()
}
