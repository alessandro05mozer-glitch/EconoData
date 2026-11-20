import { parseLesson } from '../lib/lessonParser'
import type { Lesson } from '../lib/types'

// Cada lição é um arquivo .md em src/content/lessons/<trilha>/. Para adicionar uma lição,
// basta criar o arquivo: ele aparece sozinho na trilha, no painel e na revisão.
const files = import.meta.glob('./lessons/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export const LESSONS: Lesson[] = Object.entries(files)
  .map(([path, src]) => parseLesson(src, path))
  .sort((a, b) => a.seq - b.seq)

export const LESSON_BY_ID: Record<string, Lesson> = Object.fromEntries(LESSONS.map((l) => [l.id, l]))

export function lessonsOfTrack(trackId: string): Lesson[] {
  return LESSONS.filter((l) => l.track === trackId).sort((a, b) => a.order - b.order)
}

import { TRACK_BY_ID } from './tracks'

export function kindOfLesson(l: Lesson): 'code' | 'theory' {
  return TRACK_BY_ID[l.track]?.kind ?? 'theory'
}

export function lessonsOfKind(kind: 'code' | 'theory'): Lesson[] {
  return LESSONS.filter((l) => kindOfLesson(l) === kind)
}
