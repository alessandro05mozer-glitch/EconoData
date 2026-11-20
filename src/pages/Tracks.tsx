import { Link, useParams } from 'react-router-dom'
import { lessonsOfTrack } from '../content/content'
import { TRACKS, TRACK_BY_ID } from '../content/tracks'
import { useStore } from '../lib/store'

const AREA_LABEL = { base: 'Base', dados: 'Dados', economia: 'Economia', carreira: 'Carreira' } as const

export function Tracks() {
  const p = useStore((s) => s.p)
  return (
    <div>
      <h1 className="text-2xl font-extrabold">Trilhas</h1>
      <p className="mt-1 text-muted">Treze trilhas, estudadas de forma intercalada: sempre uma de dados e uma de economia em andamento.</p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {TRACKS.map((t) => {
          const ls = lessonsOfTrack(t.id)
          const n = ls.filter((l) => p.lessons[l.id]?.quickDone || p.lessons[l.id]?.fullDone).length
          return (
            <li key={t.id}>
              <Link
                to={`/trilhas/${t.id}`}
                className="block h-full rounded-2xl border border-line bg-surface p-4 shadow-sm hover:bg-surface2"
                style={{ borderTop: `4px solid hsl(${t.hue} 70% 55%)` }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl" aria-hidden="true">{t.emoji}</span>
                  <h2 className="flex-1 font-bold">{t.title}</h2>
                </div>
                <p className="mt-1 text-sm text-muted">{t.summary}</p>
                <p className="mt-2 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-surface2 px-2 py-0.5">{AREA_LABEL[t.area]}</span>
                  {t.anpec && <span className="rounded-full bg-brandsoft px-2 py-0.5 text-brand">ANPEC</span>}
                  <span className="rounded-full bg-surface2 px-2 py-0.5">
                    {ls.length === 0 ? 'em construção' : `${n}/${ls.length} lições`}
                  </span>
                </p>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function TrackPage() {
  const { trackId = '' } = useParams()
  const track = TRACK_BY_ID[trackId]
  const p = useStore((s) => s.p)
  if (!track) return <p>Trilha não encontrada. <Link className="underline" to="/trilhas">Voltar às trilhas</Link></p>
  const ls = lessonsOfTrack(trackId)
  return (
    <div>
      <Link to="/trilhas" className="text-sm text-brand underline">← Trilhas</Link>
      <h1 className="mt-2 text-2xl font-extrabold"><span aria-hidden="true">{track.emoji}</span> {track.title}</h1>
      <p className="mt-1 text-muted">{track.summary}</p>
      {ls.length === 0 ? (
        <p className="mt-6 rounded-xl bg-surface2 p-4">As lições desta trilha ainda estão sendo escritas.</p>
      ) : (
        <ol className="mt-4 space-y-2">
          {ls.map((l) => {
            const lp = p.lessons[l.id]
            return (
              <li key={l.id}>
                <Link to={`/licao/${l.id}`} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3 hover:bg-surface2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brandsoft font-bold text-brand">{l.order}</span>
                  <span className="flex-1">
                    <span className="block font-semibold">{l.title}</span>
                    <span className="block text-xs text-muted">{l.minutes.quick} min (rápida) · {l.minutes.full} min (completa)</span>
                  </span>
                  <span className="text-sm">{lp?.fullDone ? '✅ completa' : lp?.quickDone ? '✔️ rápida' : ''}</span>
                </Link>
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}
