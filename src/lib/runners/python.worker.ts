/// <reference lib="webworker" />
// Roda o Python (Pyodide) fora da thread da tela, para a página não travar.
import { PY_INDEX_URL } from './cdn'
import type { TestResult } from './types'

type Request =
  | { id: number; type: 'init' }
  | { id: number; type: 'run'; code: string; tests?: string }

// Subconjunto da API do Pyodide que usamos.
interface PyProxyLike {
  get(name: string): unknown
  set(name: string, v: unknown): void
  toJs(opts?: { dict_converter?: (e: Iterable<[string, unknown]>) => unknown }): unknown
  destroy(): void
}
interface PyodideLike {
  globals: PyProxyLike
  runPythonAsync(code: string, opts?: { globals?: PyProxyLike }): Promise<unknown>
  loadPackagesFromImports(code: string): Promise<void>
  setStdout(opts: { batched: (s: string) => void }): void
  setStderr(opts: { batched: (s: string) => void }): void
}

const ctx = self as unknown as DedicatedWorkerGlobalScope
let py: PyodideLike | null = null

const PRELUDE = `
__tests__ = []
def check(name, cond, msg=""):
    __tests__.append({"name": str(name), "passed": bool(cond), "message": str(msg)})
`

function errText(e: unknown): string {
  const msg = e instanceof Error ? e.message : String(e)
  // Mostra só o trecho do aluno e a mensagem final, sem os quadros internos do Pyodide.
  const lines = msg.split('\n').filter((l) => !/pyodide[\\/]|_pyodide|importlib|<frozen/i.test(l))
  return lines.join('\n').trim()
}

async function init(id: number) {
  if (!py) {
    ctx.postMessage({ id, type: 'status', text: 'Baixando o Python (só na primeira vez)…' })
    const mod = (await import(/* @vite-ignore */ `${PY_INDEX_URL}pyodide.mjs`)) as {
      loadPyodide(o: { indexURL: string }): Promise<PyodideLike>
    }
    py = await mod.loadPyodide({ indexURL: PY_INDEX_URL })
  }
  ctx.postMessage({ id, type: 'ready' })
}

async function run(id: number, code: string, tests?: string) {
  if (!py) throw new Error('Python ainda não foi iniciado.')
  const out: string[] = []
  const err: string[] = []
  py.setStdout({ batched: (s) => out.push(s) })
  py.setStderr({ batched: (s) => err.push(s) })

  const t0 = performance.now()
  let ok = true
  const results: TestResult[] = []
  const dictFactory = py.globals.get('dict') as () => PyProxyLike
  const g = dictFactory() // espaço de nomes novo a cada execução

  try {
    ctx.postMessage({ id, type: 'status', text: 'Carregando bibliotecas…' })
    await py.loadPackagesFromImports(`${code}\n${tests ?? ''}`)
    await py.runPythonAsync(PRELUDE, { globals: g })
    await py.runPythonAsync(code, { globals: g })
  } catch (e) {
    ok = false
    err.push(errText(e))
  }

  if (ok && tests) {
    try {
      await py.runPythonAsync(tests, { globals: g })
    } catch (e) {
      results.push({ name: 'Os testes rodaram sem erro', passed: false, message: errText(e) })
    }
    try {
      const raw = g.get('__tests__') as PyProxyLike
      const list = raw.toJs({ dict_converter: Object.fromEntries }) as TestResult[]
      raw.destroy()
      results.unshift(...list)
    } catch {
      /* sem resultados */
    }
  }
  g.destroy()

  ctx.postMessage({
    id,
    type: 'result',
    result: {
      ok,
      stdout: out.join('\n'),
      stderr: err.join('\n'),
      tests: results,
      ms: Math.round(performance.now() - t0),
    },
  })
}

ctx.onmessage = async (ev: MessageEvent<Request>) => {
  const msg = ev.data
  try {
    if (msg.type === 'init') await init(msg.id)
    else await run(msg.id, msg.code, msg.tests)
  } catch (e) {
    ctx.postMessage({ id: msg.id, type: 'error', message: errText(e) })
  }
}
