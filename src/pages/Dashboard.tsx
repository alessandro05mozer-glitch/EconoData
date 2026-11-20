import { Link } from 'react-router-dom'
import { lessonsOfKind, lessonsOfTrack } from '../content/content'
import { TRACKS } from '../content/tracks'
import { addDays, todayISO, weekStart } from '../lib/dates'
import { achievements, dueCards, streak, weeklyXp } from '../lib/progress'
import { useStore } from '../lib/store'
import { TrackGlyph } from '../components/TrackGlyph'

const DAY = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom']

function WeekChart({ activity, today, goal }: { activity: Record<string, number>; today: string; goal: number }) {
  const start = weekStart(today)
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = addDays(start, i)
    return { d, xp: activity[d] ?? 0, label: DAY[i], future: d > today }
  })
  const pace = goal / 7
  const max = Math.max(pace * 1.4, ...days.map((x) => x.xp), 10)
  const H = 120
  const y = (v: number) => H - (v / max) * H
  return (
    <svg viewBox="0 0 560 150" className="w-full" role="img" aria-label={`XP por dia nesta semana: ${days.map((x) => `${x.label} ${x.xp}`).join(', ')}`}>
      <line x1="0" x2="560" y1={y(pace)} y2={y(pace)} stroke="var(--muted)" strokeDasharray="3 4" />
      <text x="558" y={y(pace) - 4} textAnchor="end" fontSize="12" fill="var(--muted)">ritmo da meta, {Math.round(pace)} XP por dia</text>
      {days.map((x, i) => {
        const bw = 40
        const cx = 40 + i * 80
        const h = (x.xp / max) * H
        return (
          <g key={x.d}>
            <rect x={cx - bw / 2} y={H - 1.5} width={bw} height="1.5" fill="var(--border)" />
            {x.xp > 0 && <rect x={cx - bw / 2} y={y(x.xp)} width={bw} height={h} rx="3" fill="var(--cobalt)" />}
            {x.xp > 0 && <text x={cx} y={y(x.xp) - 4} textAnchor="middle" fontSize="12" fill="var(--text)">{x.xp}</text>}
            <text x={cx} y="140" textAnchor="middle" fontSize="13" fontWeight={x.d === today ? 700 : 400} fill={x.future ? 'var(--border)' : 'var(--muted)'}>
              {x.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function Path({ kind }: { kind: 'code' | 'theory' }) {
  const p = useStore((s) => s.p)
  const lessons = lessonsOfKind(kind)
  const done = (id: string) => !!(p.lessons[id]?.quickDone || p.lessons[id]?.fullDone)
  const next = lessons.find((l) => !done(l.id))
  const n = lessons.filter((l) => done(l.id)).length
  const code = kind === 'code'
  return (
    <section className={`rounded-lg border border-line bg-surface p-5 ${code ? 'border-t-[3px] border-t-cobalt' : 'border-t-[3px] border-t-viridian'}`}>
      <h2 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-serif)' }}>
        {code ? 'Laboratório de programação' : 'Formação teórica'}
      </h2>
      <p className="mt-0.5 text-sm text-muted">
        {code ? 'Python, SQL e R, com código que roda aqui.' : 'Matemática, estatística, micro, macro e economia brasileira.'}
      </p>
      {next ? (
        <>
          <p className="mt-4 text-sm text-muted">Próxima lição</p>
          <p className="text-lg font-semibold leading-snug">{next.title}</p>
          <p className="mt-1 text-sm text-muted">{next.minutes.quick} min na versão rápida, {next.minutes.full} min na completa</p>
          <Link
            to={`/licao/${next.id}`}
            className={`mt-4 inline-block rounded-md px-4 py-2 text-sm font-semibold text-paper ${code ? 'bg-cobalt' : 'bg-viridian'}`}
            style={{ color: 'var(--paper)' }}
          >
            {n === 0 ? 'Começar' : 'Continuar'}
          </Link>
        </>
      ) : (
        <p className="mt-4 text-sm">Você concluiu todas as lições disponíveis neste caminho. Novas lições entram em breve.</p>
      )}
      <p className="mt-4 text-xs text-muted">
        {n} de {lessons.length} {lessons.length === 1 ? 'lição concluída' : 'lições concluídas'}
      </p>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface2">
        <div className={`h-full ${code ? 'bg-cobalt' : 'bg-viridian'}`} style={{ width: `${lessons.length ? (n / lessons.length) * 100 : 0}%` }} />
      </div>
    </section>
  )
}

export function Dashboard() {
  const p = useStore((s) => s.p)
  const today = todayISO()
  const week = weeklyXp(p, today)
  const goal = p.settings.weeklyGoalXp
  const due = dueCards(p, today).length
  const days = streak(p, today)
  const done = (id: string) => !!(p.lessons[id]?.quickDone || p.lessons[id]?.fullDone)
  const ach = achievements(p, today)

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-[2rem] font-semibold leading-tight tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
        {p.xp === 0 ? 'Vamos começar, Alessandro' : 'Bom te ver, Alessandro'}
      </h1>
      <p className="mt-1 max-w-xl text-muted">
        Um caminho de programação e um de teoria andam juntos. Faça uma lição de cada quando puder; a revisão espaçada cuida do que você já viu.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Path kind="code" />
        <Path kind="theory" />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1.5fr_1fr]">
        <section className="rounded-lg border border-line bg-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-semibold">Esta semana</h2>
            <p className="text-sm text-muted">
              <span className={week >= goal ? 'mark font-semibold text-ink' : 'font-semibold text-ink'}>{week}</span> de {goal} XP
            </p>
          </div>
          <div className="mt-3">
            <WeekChart activity={p.activity} today={today} goal={goal} />
          </div>
        </section>
        <div className="grid gap-4">
          <Link to="/revisao" className="rounded-lg border border-line bg-surface p-5 hover:bg-surface2">
            <h2 className="font-semibold">Revisão de hoje</h2>
            <p className="mt-1 text-3xl font-semibold" style={{ fontFamily: 'var(--font-serif)' }}>{due}</p>
            <p className="text-sm text-muted">{due === 1 ? 'cartão para revisar' : 'cartões para revisar'}</p>
          </Link>
          <div className="rounded-lg border border-line bg-surface p-5">
            <h2 className="font-semibold">Sequência</h2>
            <p className="mt-1 text-3xl font-semibold" style={{ fontFamily: 'var(--font-serif)' }}>{days}</p>
            <p className="text-sm text-muted">{days === 1 ? 'dia seguido' : 'dias seguidos'}</p>
          </div>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold" style={{ fontFamily: 'var(--font-serif)' }}>Progresso por trilha</h2>
        <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
          {TRACKS.map((t) => {
            const ls = lessonsOfTrack(t.id)
            const n = ls.filter((l) => done(l.id)).length
            return (
              <li key={t.id}>
                <Link to={`/trilhas/${t.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-surface2">
                  <TrackGlyph track={t} size={34} />
                  <span className="flex-1">
                    <span className="block text-sm font-medium">{t.title}</span>
                    <span className="block text-xs text-muted">{t.kind === 'code' ? 'Laboratório' : 'Teoria'}</span>
                  </span>
                  <span className="w-28 text-right text-xs text-muted">
                    {ls.length === 0 ? 'em construção' : `${n} de ${ls.length} ${ls.length === 1 ? 'lição' : 'lições'}`}
                    <span className="mt-1 block h-1 overflow-hidden rounded-full bg-surface2">
                      <span className={`block h-full ${t.kind === 'code' ? 'bg-cobalt' : 'bg-viridian'}`} style={{ width: `${ls.length ? (n / ls.length) * 100 : 0}%` }} />
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold" style={{ fontFamily: 'var(--font-serif)' }}>Conquistas</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {ach.map((a) => (
            <li key={a.id} className={`flex items-start gap-3 rounded-md border px-4 py-3 ${a.unlocked ? 'border-ok bg-oksoft' : 'border-line bg-surface'}`}>
              <span className={`mt-0.5 ${a.unlocked ? 'text-ok' : 'text-muted'}`}><Icon2 unlocked={a.unlocked} /></span>
              <span>
                <span className={`block text-sm font-semibold ${a.unlocked ? '' : 'text-muted'}`}>{a.title}</span>
                <span className="block text-xs text-muted">{a.description}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

import { Icon } from '../components/Icon'
function Icon2({ unlocked }: { unlocked: boolean }) {
  return <Icon name={unlocked ? 'check' : 'lock'} size={18} />
}
