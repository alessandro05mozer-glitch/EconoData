import initSqlJs, { type SqlJsStatic } from 'sql.js'
import { beforeAll, describe, expect, it } from 'vitest'
import { parseLesson } from '../lib/lessonParser'
import { runSql } from '../lib/runners/sqlCheck'
import type { ExerciseSpec } from '../lib/types'

const files = import.meta.glob('./lessons/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
const exercises: Array<{ lesson: string; spec: ExerciseSpec }> = []
for (const [path, src] of Object.entries(files)) {
  const l = parseLesson(src, path)
  for (const s of l.segments) if (s.kind === 'exercise') exercises.push({ lesson: l.id, spec: s.spec })
}

let SQL: SqlJsStatic
beforeAll(async () => {
  SQL = await initSqlJs()
})

// SQL roda aqui de verdade. Python e R só podem ser conferidos no navegador (ver scripts/check-exercises.mjs para Python).
describe('exercícios SQL das lições', () => {
  for (const { lesson, spec } of exercises.filter((e) => e.spec.lang === 'sql')) {
    it(`${lesson}/${spec.id}: a solução passa e o código inicial não passa`, () => {
      const good = runSql(SQL, spec, spec.dataset, spec.solution)
      expect(good.ok, good.stderr).toBe(true)
      expect(good.tests.every((t) => t.passed), JSON.stringify(good.tests)).toBe(true)
      const bad = runSql(SQL, spec, spec.dataset, spec.starter)
      expect(bad.ok && bad.tests.every((t) => t.passed)).toBe(false)
    })
  }
})

it('todo exercício tem solução, dicas e (Python/R) testes', () => {
  for (const { lesson, spec } of exercises) {
    expect(spec.solution.trim(), `${lesson}/${spec.id}`).not.toBe('')
    expect(spec.hints.length, `${lesson}/${spec.id}`).toBeGreaterThan(0)
    if (spec.lang !== 'sql') expect(spec.tests?.trim(), `${lesson}/${spec.id}`).toBeTruthy()
  }
})
