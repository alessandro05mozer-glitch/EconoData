import { describe, expect, it } from 'vitest'
import { LessonError, parseLesson, visibleSegments } from './lessonParser'

const HEAD = `---
id: t-01
track: sql
title: Teste
order: 1
seq: 3
minutes: { quick: 10, full: 40 }
objectives: [a, b]
cards:
  - front: F
    back: B
---
`

describe('parseLesson', () => {
  it('lê o cabeçalho e separa o texto em segmentos', () => {
    const l = parseLesson(`${HEAD}# Título\n\nTexto.\n`, 't.md')
    expect(l.id).toBe('t-01')
    expect(l.track).toBe('sql')
    expect(l.seq).toBe(3)
    expect(l.minutes).toEqual({ quick: 10, full: 40 })
    expect(l.objectives).toEqual(['a', 'b'])
    expect(l.cards).toEqual([{ front: 'F', back: 'B' }])
    expect(l.segments).toHaveLength(1)
    expect(l.segments[0]).toMatchObject({ kind: 'md', full: false })
  })

  it('a marca <!--full--> separa a versão completa', () => {
    const l = parseLesson(`${HEAD}Rápido\n\n<!--full-->\n\nSó completo\n`, 't.md')
    expect(l.segments.map((s) => s.full)).toEqual([false, true])
    expect(visibleSegments(l, 'quick')).toHaveLength(1)
    expect(visibleSegments(l, 'full')).toHaveLength(2)
  })

  it('exercício aparece só no completo, a menos que tenha quick: true', () => {
    const body = `${HEAD}\`\`\`exercise
id: e1
lang: python
prompt: faça
starter: "x = 1"
tests: |
  check("ok", True)
\`\`\`

\`\`\`exercise
id: e2
lang: python
quick: true
prompt: faça
tests: |
  check("ok", True)
\`\`\`
`
    const l = parseLesson(body, 't.md')
    const ex = l.segments.filter((s) => s.kind === 'exercise')
    expect(ex.map((s) => s.full)).toEqual([true, false])
  })

  it('blocos de código comuns ficam dentro do texto', () => {
    const l = parseLesson(`${HEAD}Veja:\n\n\`\`\`python\nprint(1)\n\`\`\`\n`, 't.md')
    expect(l.segments).toHaveLength(1)
    expect(l.segments[0].kind === 'md' && l.segments[0].text).toContain('print(1)')
  })

  it('lê quiz Tipo A e Tipo B', () => {
    const body = `${HEAD}\`\`\`quiz-a
id: qa
stem: Enunciado
items:
  - { t: um, c: true }
  - { t: dois, c: false }
explanation: porque
\`\`\`

<!--full-->

\`\`\`quiz-b
id: qb
stem: Quanto?
answer: 7
explanation: assim
\`\`\`
`
    const l = parseLesson(body, 't.md')
    expect(l.segments[0]).toMatchObject({ kind: 'quizA', full: false })
    expect(l.segments[1]).toMatchObject({ kind: 'quizB', full: true })
  })

  it('recusa Tipo B fora de 0 a 99', () => {
    const body = `${HEAD}\`\`\`quiz-b\nid: qb\nstem: x\nanswer: 100\n\`\`\`\n`
    expect(() => parseLesson(body, 't.md')).toThrow(LessonError)
  })

  it('recusa Tipo A com menos de 2 ou mais de 5 afirmativas', () => {
    const body = `${HEAD}\`\`\`quiz-a\nid: qa\nstem: x\nitems:\n  - { t: um, c: true }\n\`\`\`\n`
    expect(() => parseLesson(body, 't.md')).toThrow(LessonError)
  })

  it('exige solution em SQL e tests em Python/R', () => {
    const sql = `${HEAD}\`\`\`exercise\nid: e\nlang: sql\nprompt: x\n\`\`\`\n`
    expect(() => parseLesson(sql, 't.md')).toThrow(/solution/)
    const py = `${HEAD}\`\`\`exercise\nid: e\nlang: python\nprompt: x\n\`\`\`\n`
    expect(() => parseLesson(py, 't.md')).toThrow(/tests/)
  })

  it('recusa ids repetidos, bloco sem fechamento e arquivo sem cabeçalho', () => {
    const dup = `${HEAD}\`\`\`quiz-b\nid: q\nstem: x\nanswer: 1\n\`\`\`\n\n\`\`\`quiz-b\nid: q\nstem: y\nanswer: 2\n\`\`\`\n`
    expect(() => parseLesson(dup, 't.md')).toThrow(/repetido/)
    expect(() => parseLesson(`${HEAD}\`\`\`quiz-b\nid: q\n`, 't.md')).toThrow(/fechamento/)
    expect(() => parseLesson('# sem cabeçalho', 't.md')).toThrow(/cabeçalho/)
  })

  it('recusa linguagem desconhecida', () => {
    const body = `${HEAD}\`\`\`exercise\nid: e\nlang: cobol\nprompt: x\ntests: y\n\`\`\`\n`
    expect(() => parseLesson(body, 't.md')).toThrow(/linguagem/)
  })
})
