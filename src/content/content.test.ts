import { describe, expect, it } from 'vitest'
import { parseLesson } from '../lib/lessonParser'
import { TRACK_BY_ID } from './tracks'

// Em ambiente de teste o Vite entrega os arquivos .md como texto, então validamos todas as lições.
const files = import.meta.glob('./lessons/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

describe('lições do conteúdo', () => {
  const lessons = Object.entries(files).map(([path, src]) => parseLesson(src, path))

  it('há lições e todas passam pela validação', () => {
    expect(lessons.length).toBeGreaterThan(0)
  })

  it('ids de lição são únicos e as trilhas existem', () => {
    const ids = lessons.map((l) => l.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const l of lessons) expect(TRACK_BY_ID[l.track], `${l.id} → trilha ${l.track}`).toBeDefined()
  })

  it('seq é único (a ordem intercalada não pode ter empates)', () => {
    const seqs = lessons.map((l) => l.seq)
    expect(new Set(seqs).size).toBe(seqs.length)
  })

  it('toda lição tem cartões de revisão e objetivos', () => {
    for (const l of lessons) {
      expect(l.cards.length, l.id).toBeGreaterThan(0)
      expect(l.objectives.length, l.id).toBeGreaterThan(0)
    }
  })
})
