import { parse as parseYaml } from 'yaml'
import type {
  CalloutVariant,
  CardSeed,
  ExerciseSpec,
  Lang,
  Lesson,
  QuizASpec,
  QuizBSpec,
  Segment,
} from './types'

// Formato de uma lição (arquivo .md):
//
//   ---
//   id: sql-01-select
//   track: sql
//   title: ...
//   order: 1
//   seq: 3
//   minutes: { quick: 20, full: 75 }
//   objectives: [ ... ]
//   cards: [ { front: ..., back: ... } ]
//   ---
//   texto em markdown (com $latex$), blocos especiais abaixo,
//   e a linha  <!--full-->  separa o que só aparece na versão completa.
//
//   ```exercise   YAML de um exercício de código (python, sql ou r)
//   ```quiz-a     YAML de uma questão Tipo A (afirmativas certo/errado)
//   ```quiz-b     YAML de uma questão Tipo B (resposta numérica de 0 a 99)
//   ```sim        YAML com o id do simulador (ilustração interativa)
//
//   Blocos de destaque, escritos entre linhas ::: (conteúdo em Markdown):
//     :::definicao Título        definição formal
//     :::intuicao Título         a ideia por trás da fórmula
//     :::atencao Título          erro comum
//     :::resumo Título           o que levar da seção
//     :::nota Título             observação
//     :::exemplo Título          exemplo resolvido: enunciado, e cada passo separado por uma linha ---
//     :::pense Título            pergunta, uma linha ---, e a resposta (aparece ao clicar)
//
// Exercícios aparecem só na versão completa, a menos que tenham `quick: true`.

const FULL_MARKER = '<!--full-->'
const SPECIAL = new Set(['exercise', 'quiz-a', 'quiz-b', 'sim'])
const CALLOUTS = new Set<string>(['definicao', 'intuicao', 'atencao', 'resumo', 'nota'])

/** Divide o texto nas linhas que contêm só --- */
function splitByRule(text: string): string[] {
  return text
    .split(/\n[ \t]*---[ \t]*\n/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0)
}
const LANGS: Lang[] = ['python', 'sql', 'r']

export class LessonError extends Error {
  constructor(lessonId: string, msg: string) {
    super(`Lição "${lessonId}": ${msg}`)
  }
}

function splitFrontmatter(src: string, where: string): { meta: Record<string, unknown>; body: string } {
  const m = src.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!m) throw new LessonError(where, 'faltou o cabeçalho entre --- no começo do arquivo.')
  const meta = parseYaml(m[1])
  if (!meta || typeof meta !== 'object') throw new LessonError(where, 'cabeçalho vazio ou inválido.')
  return { meta: meta as Record<string, unknown>, body: m[2] }
}

function req<T>(obj: Record<string, unknown>, key: string, lessonId: string): T {
  const v = obj[key]
  if (v === undefined || v === null) throw new LessonError(lessonId, `faltou o campo "${key}".`)
  return v as T
}

function toExercise(y: Record<string, unknown>, lessonId: string): ExerciseSpec {
  const lang = req<string>(y, 'lang', lessonId) as Lang
  if (!LANGS.includes(lang)) throw new LessonError(lessonId, `linguagem desconhecida "${lang}".`)
  const id = req<string>(y, 'id', lessonId)
  const spec: ExerciseSpec = {
    id,
    lang,
    prompt: req<string>(y, 'prompt', lessonId),
    starter: String(y.starter ?? ''),
    dataset: y.dataset ? String(y.dataset) : undefined,
    solution: String(y.solution ?? ''),
    ordered: Boolean(y.ordered),
    tests: y.tests ? String(y.tests) : undefined,
    hints: Array.isArray(y.hints) ? y.hints.map(String) : [],
  }
  if (lang === 'sql' && !spec.solution.trim()) {
    throw new LessonError(lessonId, `exercício "${id}" de SQL precisa de "solution".`)
  }
  if (lang !== 'sql' && !spec.tests?.trim()) {
    throw new LessonError(lessonId, `exercício "${id}" precisa de "tests".`)
  }
  return spec
}

function toQuizA(y: Record<string, unknown>, lessonId: string): QuizASpec {
  const items = req<Array<{ t: string; c: boolean }>>(y, 'items', lessonId)
  if (!Array.isArray(items) || items.length < 2 || items.length > 5) {
    throw new LessonError(lessonId, 'uma questão Tipo A tem de 2 a 5 afirmativas.')
  }
  return {
    id: req<string>(y, 'id', lessonId),
    stem: req<string>(y, 'stem', lessonId),
    items: items.map((it) => ({ t: String(it.t), c: Boolean(it.c) })),
    explanation: String(y.explanation ?? ''),
  }
}

function toQuizB(y: Record<string, unknown>, lessonId: string): QuizBSpec {
  const answer = req<number>(y, 'answer', lessonId)
  if (!Number.isInteger(answer) || answer < 0 || answer > 99) {
    throw new LessonError(lessonId, 'a resposta do Tipo B é um inteiro de 0 a 99.')
  }
  return {
    id: req<string>(y, 'id', lessonId),
    stem: req<string>(y, 'stem', lessonId),
    answer,
    explanation: String(y.explanation ?? ''),
  }
}

export function parseLesson(src: string, fileName: string): Lesson {
  const { meta, body } = splitFrontmatter(src, fileName)
  const id = req<string>(meta, 'id', fileName)
  const minutes = (meta.minutes ?? {}) as { quick?: number; full?: number }

  const segments: Segment[] = []
  let full = false
  let buf: string[] = []
  const flush = () => {
    const text = buf.join('\n').trim()
    if (text) segments.push({ kind: 'md', text, full })
    buf = []
  }

  const lines = body.replace(/\r\n/g, '\n').split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.trim() === FULL_MARKER) {
      flush()
      full = true
      continue
    }
    const dir = line.match(/^:::(\w+)[ \t]*(.*)$/)
    if (dir) {
      const name = dir[1]
      const title = dir[2].trim()
      if (CALLOUTS.has(name) || name === 'exemplo' || name === 'pense') {
        const content: string[] = []
        i += 1
        while (i < lines.length && lines[i].trim() !== ':::') {
          content.push(lines[i])
          i += 1
        }
        if (i >= lines.length) throw new LessonError(id, `bloco ":::${name}" sem fechamento (falta uma linha :::).`)
        flush()
        const text = content.join('\n').trim()
        if (!text) throw new LessonError(id, `bloco ":::${name}" vazio.`)
        if (name === 'exemplo') {
          const parts = splitByRule(text)
          if (parts.length < 2) throw new LessonError(id, 'bloco ":::exemplo" precisa de enunciado e ao menos um passo, separados por ---.')
          segments.push({ kind: 'steps', title, problem: parts[0], steps: parts.slice(1), full })
        } else if (name === 'pense') {
          const parts = splitByRule(text)
          if (parts.length !== 2) throw new LessonError(id, 'bloco ":::pense" precisa de pergunta e resposta separadas por uma linha ---.')
          segments.push({ kind: 'think', title, question: parts[0], answer: parts[1], full })
        } else {
          segments.push({ kind: 'callout', variant: name as CalloutVariant, title, text, full })
        }
        continue
      }
    }
    const open = line.match(/^```([\w-]+)\s*$/)
    if (open && SPECIAL.has(open[1])) {
      const kind = open[1]
      const content: string[] = []
      i += 1
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        content.push(lines[i])
        i += 1
      }
      if (i >= lines.length) throw new LessonError(id, `bloco "${kind}" sem fechamento.`)
      flush()
      const y = parseYaml(content.join('\n')) as Record<string, unknown>
      if (!y || typeof y !== 'object') throw new LessonError(id, `bloco "${kind}" vazio.`)
      if (kind === 'exercise') {
        segments.push({ kind: 'exercise', spec: toExercise(y, id), full: full || !y.quick })
      } else if (kind === 'quiz-a') {
        segments.push({ kind: 'quizA', spec: toQuizA(y, id), full })
      } else if (kind === 'quiz-b') {
        segments.push({ kind: 'quizB', spec: toQuizB(y, id), full })
      } else {
        segments.push({ kind: 'sim', sim: req<string>(y, 'id', id), full })
      }
      continue
    }
    buf.push(line)
  }
  flush()

  const cards = Array.isArray(meta.cards)
    ? (meta.cards as CardSeed[]).map((c) => ({ front: String(c.front), back: String(c.back) }))
    : []

  const lesson: Lesson = {
    id,
    track: req<string>(meta, 'track', id),
    title: req<string>(meta, 'title', id),
    order: Number(meta.order ?? 0),
    seq: Number(meta.seq ?? meta.order ?? 0),
    minutes: { quick: Number(minutes.quick ?? 15), full: Number(minutes.full ?? 60) },
    objectives: Array.isArray(meta.objectives) ? meta.objectives.map(String) : [],
    cards,
    segments,
  }

  // ids de blocos interativos precisam ser únicos dentro da lição
  const seen = new Set<string>()
  for (const s of segments) {
    const bid = s.kind === 'exercise' || s.kind === 'quizA' || s.kind === 'quizB' ? s.spec.id : null
    if (bid) {
      if (seen.has(bid)) throw new LessonError(id, `id de bloco repetido: "${bid}".`)
      seen.add(bid)
    }
  }
  return lesson
}

export function visibleSegments(lesson: Lesson, level: 'quick' | 'full'): Segment[] {
  return lesson.segments.filter((s) => level === 'full' || !s.full)
}
