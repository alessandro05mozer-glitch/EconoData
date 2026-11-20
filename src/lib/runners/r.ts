import { WEBR_URL } from './cdn'
import { failedRun, type RunResult, type StatusFn, type TestResult } from './types'

// R roda por WebR (R compilado para WebAssembly). Ele já usa um Worker próprio.

interface ShelterLike {
  captureR(code: string, opts?: unknown): Promise<{ output: Array<{ type: string; data: unknown }> }>
  purge(): Promise<void>
}
interface WebRLike {
  init(): Promise<void>
  installPackages(pkgs: string[], opts?: unknown): Promise<void>
  interrupt(): void
  Shelter: new () => Promise<ShelterLike>
}

const PRELUDE = `
check <- function(name, cond, msg = "") {
  ok <- isTRUE(as.logical(cond))
  cat("@@CHECK@@", if (ok) "1" else "0", "\\t", gsub("[\\t\\n]", " ", name), "\\t", gsub("[\\t\\n]", " ", msg), "\\n", sep = "")
  invisible(NULL)
}
`

const BASE_PACKAGES = new Set(['stats', 'utils', 'methods', 'graphics', 'grDevices', 'datasets', 'base', 'tools', 'parallel', 'grid'])
const RUN_TIMEOUT_MS = 30_000

function packagesUsed(code: string): string[] {
  const found = new Set<string>()
  for (const m of code.matchAll(/(?:library|require)\(\s*["']?([A-Za-z][\w.]*)["']?\s*[,)]/g)) found.add(m[1])
  for (const m of code.matchAll(/\b([A-Za-z][\w.]*)::/g)) found.add(m[1])
  return [...found].filter((p) => !BASE_PACKAGES.has(p))
}

class RRunner {
  private ready: Promise<WebRLike> | null = null

  private init(onStatus?: StatusFn): Promise<WebRLike> {
    if (!this.ready) {
      this.ready = (async () => {
        onStatus?.('Baixando o R (só na primeira vez, pode levar um minuto)…')
        const mod = (await import(/* @vite-ignore */ `${WEBR_URL}webr.mjs`)) as {
          WebR: new (o: { baseUrl: string }) => WebRLike
        }
        const w = new mod.WebR({ baseUrl: WEBR_URL })
        await w.init()
        return w
      })().catch((e) => {
        this.ready = null
        throw e
      })
    }
    return this.ready
  }

  async run(code: string, tests: string | undefined, onStatus?: StatusFn): Promise<RunResult> {
    let w: WebRLike
    try {
      w = await this.init(onStatus)
    } catch (e) {
      return failedRun(
        `Não consegui iniciar o R: ${e instanceof Error ? e.message : String(e)}\nConfira a conexão com a internet e tente de novo.`,
      )
    }

    const t0 = performance.now()
    const stdout: string[] = []
    const stderr: string[] = []
    const results: TestResult[] = []
    let ok = true
    const shelter = await new w.Shelter()

    const exec = async (src: string, capture: boolean) => {
      const r = await shelter.captureR(src, { withAutoprint: true, captureStreams: true })
      for (const o of r.output) {
        const text = typeof o.data === 'string' ? o.data : String(o.data)
        if (o.type === 'stdout' || o.type === 'stderr') {
          if (!capture) continue
          for (const line of text.split('\n')) {
            const m = line.match(/^@@CHECK@@([01])\t([^\t]*)\t(.*)$/)
            if (m) results.push({ name: m[2], passed: m[1] === '1', message: m[3] || undefined })
            else if (line) (o.type === 'stdout' ? stdout : stderr).push(line)
          }
        }
      }
    }

    const timer = setTimeout(() => {
      w.interrupt()
      stderr.push(`Tempo esgotado (${RUN_TIMEOUT_MS / 1000} s). Procure um laço infinito.`)
    }, RUN_TIMEOUT_MS)

    try {
      const pkgs = packagesUsed(`${code}\n${tests ?? ''}`)
      if (pkgs.length) {
        onStatus?.(`Instalando pacotes: ${pkgs.join(', ')}…`)
        await w.installPackages(pkgs, { quiet: true })
      }
      await exec('rm(list = ls(all.names = TRUE))', false)
      await exec(PRELUDE, false)
      await exec(code, true)
    } catch (e) {
      ok = false
      stderr.push(e instanceof Error ? e.message : String(e))
    }

    if (ok && tests) {
      try {
        await exec(tests, true)
      } catch (e) {
        results.push({ name: 'Os testes rodaram sem erro', passed: false, message: e instanceof Error ? e.message : String(e) })
      }
    }
    clearTimeout(timer)
    try {
      await shelter.purge()
    } catch {
      /* ignora */
    }

    return { ok, stdout: stdout.join('\n'), stderr: stderr.join('\n'), tests: results, ms: Math.round(performance.now() - t0) }
  }
}

export const rRunner = new RRunner()
