import { NavLink, Outlet } from 'react-router-dom'
import { todayISO } from '../lib/dates'
import { dueCards, streak } from '../lib/progress'
import { useStore } from '../lib/store'
import { useTheme } from '../lib/theme'
import { levelFromXp } from '../lib/xp'
import { Icon } from './Icon'

const NAV = [
  { to: '/', label: 'Painel', icon: 'home', end: true },
  { to: '/laboratorio', label: 'Laboratório', icon: 'code' },
  { to: '/teoria', label: 'Teoria', icon: 'book' },
  { to: '/revisao', label: 'Revisão', icon: 'cards' },
  { to: '/ajustes', label: 'Ajustes', icon: 'gear' },
]

function Wordmark() {
  return (
    <NavLink to="/" className="flex items-center gap-2.5" aria-label="EconoData, ir ao painel">
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="var(--text)" />
        <path d="M7 24V8M7 24h18" stroke="var(--paper)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M10 21 17 13l3 3 5-7" stroke="var(--mark)" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[1.15rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
        EconoData
      </span>
    </NavLink>
  )
}

export function Layout() {
  useTheme()
  const p = useStore((s) => s.p)
  const lv = levelFromXp(p.xp)
  const due = dueCards(p, todayISO()).length
  const days = streak(p, todayISO())

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[15rem_1fr]">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-surface focus:p-2">
        Ir para o conteúdo
      </a>

      {/* Barra lateral (computador) */}
      <aside className="hidden border-r border-line bg-surface/90 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:px-4 lg:py-5">
        <Wordmark />
        <nav className="mt-8 flex flex-1 flex-col gap-0.5" aria-label="Principal">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-[0.95rem] font-medium transition-colors ${
                  isActive ? 'bg-ink text-paper' : 'text-muted hover:bg-surface2 hover:text-ink'
                }`
              }
            >
              <Icon name={n.icon} size={18} />
              <span className="flex-1">{n.label}</span>
              {n.to === '/revisao' && due > 0 && (
                <span className="rounded-full bg-mark px-1.5 text-xs font-semibold text-markink">{due}</span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="rounded-md border border-line bg-paper p-3">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-semibold">Nível {lv.level}</span>
            <span className="text-xs text-muted">{p.xp} XP</span>
          </div>
          <div
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface2"
            role="progressbar"
            aria-valuenow={Math.round(lv.progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progresso até o próximo nível"
          >
            <div className="h-full bg-ink" style={{ width: `${lv.progress * 100}%` }} />
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
            <span className={days > 0 ? 'text-warn' : ''}><Icon name="flame" size={14} /></span>
            {days > 0 ? `${days} ${days === 1 ? 'dia seguido' : 'dias seguidos'}` : 'Estude hoje para começar a sequência'}
          </p>
        </div>
      </aside>

      {/* Barra superior (celular) */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-surface/95 px-4 py-2.5 backdrop-blur lg:hidden">
        <Wordmark />
        <span className="rounded-full bg-surface2 px-3 py-1 text-xs font-semibold">Nível {lv.level} · {p.xp} XP</span>
      </header>

      <main id="main" className="min-w-0 px-4 pb-28 pt-6 sm:px-8 lg:pb-16 lg:pt-10">
        <Outlet />
      </main>

      {/* Navegação inferior (celular) */}
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden" aria-label="Principal">
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            className={({ isActive }) =>
              `relative flex flex-col items-center gap-0.5 py-2 text-[0.7rem] font-medium ${isActive ? 'text-ink' : 'text-muted'}`
            }
          >
            <Icon name={n.icon} size={22} />
            {n.label}
            {n.to === '/revisao' && due > 0 && (
              <span className="absolute right-[26%] top-1 rounded-full bg-mark px-1 text-[0.65rem] font-semibold text-markink">{due}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
