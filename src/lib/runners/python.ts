import { RUN_TIMEOUT_MS } from './cdn'
import { failedRun, type RunResult, type StatusFn } from './types'

type Msg =
  | { id: number; type: 'status'; text: string }
  | { id: number; type: 'ready' }
  | { id: number; type: 'result'; result: RunResult }
  | { id: number; type: 'error'; message: string }

class PythonRunner {
  private worker: Worker | null = null
  private ready: Promise<void> | null = null
  private nextId = 1
  private handlers = new Map<number, (m: Msg) => void>()

  private spawn(): Worker {
    const w = new Worker(new URL('./python.worker.ts', import.meta.url), { type: 'module' })
    w.onmessage = (ev: MessageEvent<Msg>) => this.handlers.get(ev.data.id)?.(ev.data)
    w.onerror = (ev) => {
      const text = ev.message || 'erro desconhecido no executor de Python'
      for (const h of this.handlers.values()) h({ id: 0, type: 'error', message: text })
    }
    return w
  }

  private call(msg: { type: 'init' } | { type: 'run'; code: string; tests?: string }, onStatus?: StatusFn, timeoutMs?: number): Promise<Msg> {
    if (!this.worker) this.worker = this.spawn()
    const id = this.nextId++
    return new Promise<Msg>((resolve) => {
      let timer: ReturnType<typeof setTimeout> | undefined
      const done = (m: Msg) => {
        if (timer) clearTimeout(timer)
        this.handlers.delete(id)
        resolve(m)
      }
      this.handlers.set(id, (m) => {
        if (m.type === 'status') onStatus?.(m.text)
        else done(m)
      })
      if (timeoutMs) {
        timer = setTimeout(() => {
          // Laço infinito ou código muito lento: derruba o executor e recomeça limpo.
          this.reset()
          done({ id, type: 'error', message: `Tempo esgotado (${timeoutMs / 1000} s). Procure um laço infinito ou uma conta muito pesada.` })
        }, timeoutMs)
      }
      this.worker!.postMessage({ id, ...msg })
    })
  }

  reset() {
    this.worker?.terminate()
    this.worker = null
    this.ready = null
  }

  private ensureReady(onStatus?: StatusFn): Promise<void> {
    if (!this.ready) {
      this.ready = this.call({ type: 'init' }, onStatus).then((m) => {
        if (m.type === 'error') {
          this.reset()
          throw new Error(m.message)
        }
      })
    }
    return this.ready
  }

  async run(code: string, tests: string | undefined, onStatus?: StatusFn): Promise<RunResult> {
    try {
      await this.ensureReady(onStatus)
    } catch (e) {
      return failedRun(
        `Não consegui iniciar o Python: ${e instanceof Error ? e.message : String(e)}\nConfira a conexão com a internet e tente de novo.`,
      )
    }
    const m = await this.call({ type: 'run', code, tests }, onStatus, RUN_TIMEOUT_MS)
    if (m.type === 'result') return m.result
    if (m.type === 'error') return failedRun(m.message)
    return failedRun('Resposta inesperada do executor de Python.')
  }
}

export const pythonRunner = new PythonRunner()
