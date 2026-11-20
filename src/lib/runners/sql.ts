import initSqlJs, { type SqlJsStatic } from 'sql.js'
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url'
import type { ExerciseSpec } from '../types'
import { runSql } from './sqlCheck'
import { failedRun, type RunResult } from './types'

let sqlPromise: Promise<SqlJsStatic> | null = null

function load(): Promise<SqlJsStatic> {
  if (!sqlPromise) {
    sqlPromise = initSqlJs({ locateFile: () => wasmUrl, useOldExtensionFunctions: false }).catch((e) => {
      sqlPromise = null
      throw e
    })
  }
  return sqlPromise
}

export async function runSqlCode(
  spec: ExerciseSpec | null,
  dataset: string | undefined,
  code: string,
): Promise<RunResult> {
  try {
    return runSql(await load(), spec, dataset, code)
  } catch (e) {
    return failedRun(e instanceof Error ? e.message : String(e))
  }
}
