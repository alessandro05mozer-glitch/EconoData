// Confere os exercícios de Python das lições com o Pyodide real (no Node):
// a solução precisa passar nos testes e o código inicial precisa falhar.
// Uso:  npm i --no-save pyodide@314.0.8 && node scripts/check-exercises.mjs
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'
import { loadPyodide } from 'pyodide'

const ROOT = new URL('../src/content/lessons/', import.meta.url).pathname
const PRELUDE = `
__tests__ = []
def check(name, cond, msg=""):
    __tests__.append({"name": str(name), "passed": bool(cond), "message": str(msg)})
`
const py = await loadPyodide()

async function run(code, tests) {
  const g = py.globals.get('dict')()
  try {
    await py.runPythonAsync(PRELUDE, { globals: g })
    await py.runPythonAsync(code, { globals: g })
    await py.runPythonAsync(tests, { globals: g })
    const raw = g.get('__tests__')
    const list = raw.toJs({ dict_converter: Object.fromEntries })
    raw.destroy()
    return { ok: true, list }
  } catch (e) {
    return { ok: false, error: String(e.message).split('\n').slice(-2).join(' ') }
  } finally {
    g.destroy()
  }
}

let failures = 0
let count = 0
for (const dir of readdirSync(ROOT)) {
  for (const file of readdirSync(join(ROOT, dir))) {
    const src = readFileSync(join(ROOT, dir, file), 'utf8')
    for (const m of src.matchAll(/```exercise\n([\s\S]*?)\n```/g)) {
      const y = parse(m[1])
      if (y.lang !== 'python') continue
      count++
      const good = await run(y.solution, y.tests)
      const goodOk = good.ok && good.list.length > 0 && good.list.every((t) => t.passed)
      const bad = await run(y.starter, y.tests)
      const badPasses = bad.ok && bad.list.length > 0 && bad.list.every((t) => t.passed)
      const status = goodOk && !badPasses ? 'OK ' : 'ERRO'
      if (!(goodOk && !badPasses)) failures++
      console.log(`${status} ${file}/${y.id}`, goodOk ? '' : `solução falhou: ${JSON.stringify(good)}`, badPasses ? 'código inicial passou nos testes!' : '')
    }
  }
}
console.log(`\n${count} exercícios Python, ${failures} com problema`)
process.exit(failures ? 1 : 0)
