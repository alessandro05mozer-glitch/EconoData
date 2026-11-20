import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Exercise } from '../components/Exercise'
import { Markdown } from '../components/Markdown'
import { QuizA, QuizB } from '../components/Quiz'
import { SIMS } from '../components/sims'
import { LESSON_BY_ID, lessonsOfTrack } from '../content/content'
import { TRACK_BY_ID } from '../content/tracks'
import { visibleSegments } from '../lib/lessonParser'
import { useStore } from '../lib/store'
import type { Level } from '../lib/types'
import { XP } from '../lib/xp'

export function LessonPage() {
  const { lessonId = '' } = useParams()
  const lesson = LESSON_BY_ID[lessonId]
  const [level, setLevel] = useState<Level>('quick')
  const lp = useStore((s) => s.p.lessons[lessonId])
  const openLesson = useStore((s) => s.openLesson)
  const completeLesson = useStore((s) => s.completeLesson)

  useEffect(() => {
    if (lesson) openLesson(lesson.id)
    window.scrollTo(0, 0)
  }, [lesson, openLesson])

  if (!lesson) return <p>Lição não encontrada. <Link className="underline" to="/trilhas">Voltar às trilhas</Link></p>

  const track = TRACK_BY_ID[lesson.track]
  const siblings = lessonsOfTrack(lesson.track)
  const idx = siblings.findIndex((l) => l.id === lesson.id)
  const nextLesson = siblings[idx + 1]
  const segments = visibleSegments(lesson, level)
  const done = level === 'quick' ? lp?.quickDone : lp?.fullDone

  return (
    <article className="mx-auto max-w-3xl">
      <Link to={`/trilhas/${lesson.track}`} className="text-sm text-brand underline">← {track?.title}</Link>
      <h1 className="mt-2 text-3xl font-extrabold leading-tight">{lesson.title}</h1>

      <div className="mt-3 inline-flex rounded-xl border border-line bg-surface p-1" role="tablist" aria-label="Versão da lição">
        {(['quick', 'full'] as const).map((lv) => (
          <button
            key={lv}
            role="tab"
            aria-selected={level === lv}
            onClick={() => setLevel(lv)}
            className={`rounded-lg px-4 py-1.5 text-sm font-semibold ${level === lv ? 'bg-brand text-white' : 'text-muted'}`}
          >
            {lv === 'quick' ? `Rápida · ${lesson.minutes.quick} min` : `Completa · ${lesson.minutes.full} min`}
          </button>
        ))}
      </div>

      {lesson.objectives.length > 0 && (
        <div className="mt-4 rounded-xl bg-brandsoft p-4">
          <p className="font-semibold">Ao final você será capaz de:</p>
          <ul className="mt-1 list-disc pl-5 text-sm">
            {lesson.objectives.map((o, i) => <li key={i}>{o}</li>)}
          </ul>
        </div>
      )}

      <div className="mt-4">
        {segments.map((s, i) => {
          switch (s.kind) {
            case 'md':
              return <Markdown key={i} text={s.text} />
            case 'exercise':
              return <Exercise key={s.spec.id} lessonId={lesson.id} trackId={lesson.track} spec={s.spec} />
            case 'quizA':
              return <QuizA key={s.spec.id} lessonId={lesson.id} trackId={lesson.track} spec={s.spec} />
            case 'quizB':
              return <QuizB key={s.spec.id} lessonId={lesson.id} trackId={lesson.track} spec={s.spec} />
            case 'sim': {
              const Sim = SIMS[s.sim]
              return Sim ? <Sim key={i} /> : <p key={i} className="text-bad">Simulador "{s.sim}" não encontrado.</p>
            }
          }
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-surface p-4">
        {done ? (
          <p className="font-semibold text-ok">✓ Versão {level === 'quick' ? 'rápida' : 'completa'} concluída em {done}.</p>
        ) : (
          <button
            onClick={() => completeLesson(lesson, level)}
            className="rounded-xl bg-brand px-5 py-2.5 font-semibold text-white"
          >
            Concluir versão {level === 'quick' ? 'rápida' : 'completa'} (+{level === 'quick' ? XP.lessonQuick : XP.lessonFull} XP)
          </button>
        )}
        {lesson.cards.length > 0 && <span className="text-sm text-muted">Ao concluir, {lesson.cards.length} cartões entram na revisão espaçada.</span>}
        {nextLesson && (
          <Link to={`/licao/${nextLesson.id}`} className="ml-auto rounded-xl border border-line px-4 py-2 text-sm font-semibold">
            Próxima: {nextLesson.title} →
          </Link>
        )}
      </div>
    </article>
  )
}
