import { Link } from 'react-router-dom'
import { LESSONS, lessonsOfTrack } from '../content/content'
import { TRACKS } from '../content/tracks'
import { todayISO } from '../lib/dates'
import { achievements, dueCards, streak, weeklyXp } from '../lib/progress'
import { useStore } from '../lib/store'
import { levelFromXp } from '../lib/xp'

export function Dashboard() {
  const p = useStore((s) => s.p)
  const today = todayISO()
  const lv = levelFromXp(p.xp)
  const week = weeklyXp(p, today)
  const goal = p.settings.weeklyGoalXp
  const due = dueCards(p, today).length
  const days = streak(p, today)
  const done = (id: string) => !!(p.lessons[id]?.quickDone || p.lessons[id]?.fullDone)
  const next = LESSONS.find((l) => !done(l.id))
  const ach = achievements(p, today)

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-brand p-5 text-white shadow">
        <h1 className="text-2xl font-extrabold">Bem-vindo de volta, Alessandro</h1>
        <p className="mt-1 text-white/85">
          Nível {lv.level} · {p.xp} XP · {days > 0 ? `${days} ${days === 1 ? 'dia' : 'dias'} seguidos` : 'comece hoje a sua sequência'}
        </p>
        {next ? (
          <Link to={`/licao/${next.id}`} className="mt-4 inline-block rounded-xl bg-white px-4 py-2 font-semibold text-brand">
            Continuar: {next.title} →
          </Link>
        ) : (
          <p className="mt-4 font-semibold">Você concluiu todas as lições disponíveis. Novas lições entram em breve.</p>
        )}
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line bg-surface p-4">
          <h2 className="text-sm font-semibold text-muted">Meta da semana</h2>
          <p className="mt-1 text-2xl font-extrabold">
            {week} <span className="text-base font-medium text-muted">/ {goal} XP</span>
          </p>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface2" role="progressbar" aria-valuenow={Math.min(100, Math.round((week / goal) * 100))} aria-valuemin={0} aria-valuemax={100} aria-label="Meta semanal">
            <div className="h-full bg-ok" style={{ width: `${Math.min(100, (week / goal) * 100)}%` }} />
          </div>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-4">
          <h2 className="text-sm font-semibold text-muted">Revisão de hoje</h2>
          <p className="mt-1 text-2xl font-extrabold">{due} {due === 1 ? 'cartão' : 'cartões'}</p>
          <Link to="/revisao" className="mt-2 inline-block text-sm font-semibold text-brand underline">
            {due > 0 ? 'Revisar agora' : 'Ver revisão'}
          </Link>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-4">
          <h2 className="text-sm font-semibold text-muted">Lições concluídas</h2>
          <p className="mt-1 text-2xl font-extrabold">
            {LESSONS.filter((l) => done(l.id)).length} <span className="text-base font-medium text-muted">/ {LESSONS.length}</span>
          </p>
        </div>
      </div>

      <section>
        <h2 className="mb-2 text-lg font-bold">Progresso por trilha</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {TRACKS.map((t) => {
            const ls = lessonsOfTrack(t.id)
            const n = ls.filter((l) => done(l.id)).length
            return (
              <li key={t.id}>
                <Link to={`/trilhas/${t.id}`} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3 hover:bg-surface2">
                  <span className="text-2xl" aria-hidden="true">{t.emoji}</span>
                  <span className="flex-1">
                    <span className="block text-sm font-semibold">{t.title}</span>
                    <span className="block text-xs text-muted">
                      {ls.length === 0 ? 'Em construção' : `${n} de ${ls.length} lições · ${p.xpByTrack[t.id] ?? 0} XP`}
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold">Conquistas</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {ach.map((a) => (
            <li key={a.id} className={`rounded-xl border p-3 ${a.unlocked ? 'border-ok bg-oksoft' : 'border-line bg-surface opacity-70'}`}>
              <p className="text-sm font-semibold">{a.unlocked ? '🏅' : '🔒'} {a.title}</p>
              <p className="text-xs text-muted">{a.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
