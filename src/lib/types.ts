import type { SrsState } from './srs'

export type Lang = 'python' | 'sql' | 'r'
export type Level = 'quick' | 'full'

/* ---------- Conteúdo ---------- */

export type Area = 'base' | 'dados' | 'economia' | 'carreira'

export interface Track {
  id: string
  order: number
  title: string
  short: string
  summary: string
  area: Area
  /** Matéria que faz parte do programa oficial da ANPEC */
  anpec: boolean
  hue: number
  emoji: string
}

export interface ExerciseSpec {
  id: string
  lang: Lang
  prompt: string
  starter: string
  /** SQL: instruções que montam o banco antes da consulta do aluno */
  dataset?: string
  /** SQL: consulta de referência cujo resultado é comparado com o do aluno */
  solution: string
  /** SQL: se a ordem das linhas importa */
  ordered?: boolean
  /** Python/R: código de testes que chama check(nome, condição, mensagem) */
  tests?: string
  hints: string[]
}

export interface QuizAItem {
  t: string
  c: boolean
}

export interface QuizASpec {
  id: string
  stem: string
  items: QuizAItem[]
  explanation: string
}

export interface QuizBSpec {
  id: string
  stem: string
  answer: number
  explanation: string
}

export type Segment =
  | { kind: 'md'; text: string; full: boolean }
  | { kind: 'exercise'; spec: ExerciseSpec; full: boolean }
  | { kind: 'quizA'; spec: QuizASpec; full: boolean }
  | { kind: 'quizB'; spec: QuizBSpec; full: boolean }
  | { kind: 'sim'; sim: string; full: boolean }

export interface CardSeed {
  front: string
  back: string
}

export interface LessonMeta {
  id: string
  track: string
  title: string
  /** Posição dentro da trilha */
  order: number
  /** Posição na sequência global intercalada (dados e economia) */
  seq: number
  minutes: { quick: number; full: number }
  objectives: string[]
  cards: CardSeed[]
}

export interface Lesson extends LessonMeta {
  segments: Segment[]
}

/* ---------- Progresso ---------- */

export interface LessonProgress {
  quickDone?: string
  fullDone?: string
  openedAt?: string
}

export interface ExerciseProgress {
  attempts: number
  passed: boolean
  passedAt?: string
}

export interface QuizProgress {
  attempts: number
  /** Melhor resultado: de -1 a 1 (Tipo A) ou 0/1 (Tipo B) */
  best: number
  last: number
}

export interface Card extends SrsState {
  id: string
  lessonId?: string
  trackId?: string
  front: string
  back: string
  origin: 'lesson' | 'error'
  createdAt: string
}

export type Theme = 'system' | 'light' | 'dark'

export interface Settings {
  theme: Theme
  weeklyGoalXp: number
}

export interface ProgressState {
  version: 1
  xp: number
  xpByTrack: Record<string, number>
  lessons: Record<string, LessonProgress>
  exercises: Record<string, ExerciseProgress>
  quizzes: Record<string, QuizProgress>
  cards: Record<string, Card>
  /** Dias (AAAA-MM-DD) com alguma atividade que rendeu XP */
  studyDays: string[]
  /** XP ganho por dia, para a meta semanal */
  activity: Record<string, number>
  settings: Settings
}

export function emptyProgress(): ProgressState {
  return {
    version: 1,
    xp: 0,
    xpByTrack: {},
    lessons: {},
    exercises: {},
    quizzes: {},
    cards: {},
    studyDays: [],
    activity: {},
    settings: { theme: 'system', weeklyGoalXp: 200 },
  }
}
