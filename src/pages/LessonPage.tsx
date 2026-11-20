import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Callout, Steps, Think } from '../components/Blocks'
import { Exercise } from '../components/Exercise'
import { Icon } from '../components/Icon'
import { Markdown } from '../components/Markdown'
import { QuizA, QuizB } from '../components/Quiz'
import { SIMS } from '../components/sims'
import { LESSON_BY_ID, lessonsOfTrack } from '../content/content'
import { TRACK_BY_ID } from '../content/tracks'
import { visibleSegments } from '../lib/lessonParser'
import { headingsOf, slugify } from '../lib/slug'
import { useStore } from '../lib/store'
import type { Level } from '../lib/types'
import { XP } from '../lib/xp'

function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState('')
  useEffect(() => {
    if (ids.length === 0) return
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -65% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    }
    return () => obs.disconnect()
  }, [ids.join('|')]) // eslint-disable-line react-hooks/exhaustive-deps
  return active
}

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

  const segments = useMemo(() => (lesson ? visibleSegments(lesson, level) : []), [lesson, level])
  const outline = useMemo(
    () => segments.flatMap((s) => (s.kind === 'md' ? headingsOf(s.text) : [])).map((t) => ({ title: t, id: slugify(t) })),
    [segments],
  )
  const active = useActiveHeading(outline.map((o) => o.id))

  if (!lesson) return <p>Lição não encontrada. <Link className="underline" to="/">Voltar ao painel</Link></p>

  const track = TRACK_BY_ID[lesson.track]
  const siblings = lessonsOfTrack(lesson.track)
  const idx = siblings.findIndex((l) => l.id === lesson.id)
  const nextLesson = siblings[idx + 1]
  const done = level === 'quick' ? lp?.quickDone : lp?.fullDone
  const interactive = segments.filter((s) => ['exercise', 'quizA', 'quizB', 'sim', 'steps', 'think'].includes(s.kind)).length

  return (
    <article data-track={lesson.track} className="mx-auto max-w-[70rem]">
      <Link to={`/trilhas/${lesson.track}`} className="text-sm text-brand underline underline-offset-4">{track?.title}</Link>
      <h1 className="mt-2 max-w-[44rem] text-[clamp(2rem,4vw,2.9rem)] font-semibold leading-[1.1] tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
        {lesson.title}
      </h1>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
        <div className="inline-flex rounded-md border border-line bg-surface p-1" role="tablist" aria-label="Versão da lição">
          {(['quick', 'full'] as const).map((lv) => (
            <button
              key={lv}
              role="tab"
              aria-selected={level === lv}
              onClick={() => setLevel(lv)}
              className={`rounded px-4 py-1.5 text-sm font-semibold transition-colors ${level === lv ? 'bg-ink text-paper' : 'text-muted hover:text-ink'}`}
            >
              {lv === 'quick' ? 'Rápida' : 'Completa'}
              <span className="ml-1.5 font-normal opacity-75">{lesson.minutes[lv]} min</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-muted">
          {level === 'quick' ? 'Teoria essencial, exemplos, ilustrações e um quiz.' : 'Tudo da rápida, mais exemplos resolvidos, prática e erros comuns.'}
        </p>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <nav className="sticky top-8" aria-label="Nesta lição">
            <p className="mb-2 text-sm font-semibold">Nesta lição</p>
            <ol className="space-y-0.5 border-l border-line">
              {outline.map((o) => (
                <li key={o.id}>
                  <a
                    href={`#${o.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(o.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                    className={`-ml-px block border-l-2 py-1 pl-3 text-[0.85rem] leading-snug transition-colors ${
                      active === o.id ? 'border-brand font-semibold text-ink' : 'border-transparent text-muted hover:text-ink'
                    }`}
                  >
                    {o.title}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-xs text-muted">{interactive} {interactive === 1 ? 'atividade interativa' : 'atividades interativas'} nesta versão.</p>
          </nav>
        </aside>

        <div className="min-w-0">
          {lesson.objectives.length > 0 && (
            <section className="mb-8 max-w-[46rem] rounded-md border border-line bg-surface p-5">
              <h2 className="text-[0.95rem] font-semibold">Ao final você será capaz de</h2>
              <ul className="mt-2 space-y-1.5 text-[0.98rem]">
                {lesson.objectives.map((o, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="mt-1 text-brand"><Icon name="check" size={16} /></span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {segments.map((s, i) => {
            switch (s.kind) {
              case 'md':
                return <Markdown key={i} text={s.text} />
              case 'callout':
                return <Callout key={i} variant={s.variant} title={s.title} text={s.text} />
              case 'steps':
                return <Steps key={i} title={s.title} problem={s.problem} steps={s.steps} />
              case 'think':
                return <Think key={i} title={s.title} question={s.question} answer={s.answer} />
              case 'exercise':
                return <Exercise key={s.spec.id} lessonId={lesson.id} trackId={lesson.track} spec={s.spec} />
              case 'quizA':
                return <QuizA key={s.spec.id} lessonId={lesson.id} trackId={lesson.track} spec={s.spec} />
              case 'quizB':
                return <QuizB key={s.spec.id} lessonId={lesson.id} trackId={lesson.track} spec={s.spec} />
              case 'sim': {
                const Sim = SIMS[s.sim]
                return Sim ? <Sim key={i} /> : <p key={i} className="text-bad">Ilustração "{s.sim}" não encontrada.</p>
              }
            }
          })}

          <div className="mt-12 flex max-w-[46rem] flex-wrap items-center gap-4 rounded-lg border border-line bg-surface p-5">
            {done ? (
              <p className="flex items-center gap-2 font-semibold text-ok"><Icon name="check" size={18} /> Versão {level === 'quick' ? 'rápida' : 'completa'} concluída em {done}.</p>
            ) : (
              <button onClick={() => completeLesson(lesson, level)} className="rounded-md bg-brand px-5 py-2.5 font-semibold text-paper">
                Concluir a versão {level === 'quick' ? 'rápida' : 'completa'}, +{level === 'quick' ? XP.lessonQuick : XP.lessonFull} XP
              </button>
            )}
            {lesson.cards.length > 0 && !done && <span className="text-sm text-muted">{lesson.cards.length} cartões entram na revisão espaçada.</span>}
            {level === 'quick' && !lp?.fullDone && done && (
              <button onClick={() => setLevel('full')} className="rounded-md border border-line px-4 py-2 text-sm font-semibold">Fazer a versão completa</button>
            )}
            {nextLesson && (
              <Link to={`/licao/${nextLesson.id}`} className="ml-auto rounded-md border border-line px-4 py-2 text-sm font-semibold hover:bg-surface2">
                Próxima: {nextLesson.title}
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
