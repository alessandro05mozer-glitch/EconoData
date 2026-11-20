import { NavLink, Outlet } from 'react-router-dom'
import { dueCards } from '../lib/progress'
import { todayISO } from '../lib/dates'
import { useStore } from '../lib/store'
import { useTheme } from '../lib/theme'
import { levelFromXp } from '../lib/xp'

const NAV = [
  { to: '/', label: 'Painel', end: true },
  { to: '/trilhas', label: 'Trilhas' },
  { to: '/revisao', label: 'Revisão' },
  { to: '/ajustes', label: 'Ajustes' },
]

export function Layout() {
  useTheme()
  const xp = useStore((s) => s.p.xp)
  const p = useStore((s) => s.p)
  const lv = levelFromXp(xp)
  const due = dueCards(p, todayISO()).length

  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-surface focus:p-2">
        Ir para o conteúdo
      </a>
      <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-2">
          <NavLink to="/" className="text-lg font-extrabold tracking-tight text-brand">
            EconoData
          </NavLink>
          <nav className="flex flex-1 flex-wrap gap-1" aria-label="Principal">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 text-sm font-medium ${isActive ? 'bg-brandsoft text-brand' : 'text-muted hover:bg-surface2'}`
                }
              >
                {n.label}
                {n.to === '/revisao' && due > 0 && (
                  <span className="ml-1.5 rounded-full bg-brand px-1.5 py-0.5 text-xs text-white">{due}</span>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2 text-sm" title={`${lv.xpIntoLevel} de ${lv.xpForNext} XP para o próximo nível`}>
            <span className="font-bold">Nível {lv.level}</span>
            <div className="h-2 w-24 overflow-hidden rounded-full bg-surface2" role="progressbar" aria-valuenow={Math.round(lv.progress * 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso até o próximo nível">
              <div className="h-full bg-brand" style={{ width: `${lv.progress * 100}%` }} />
            </div>
            <span className="text-muted">{xp} XP</span>
          </div>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
