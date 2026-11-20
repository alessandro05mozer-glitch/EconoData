import { QuestionBank } from './QuestionBank'
import { Link, useParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { TrackGlyph } from '../components/TrackGlyph'
import { lessonsOfTrack } from '../content/content'
import { TRACK_BY_ID, TRACKS } from '../content/tracks'
import { useStore } from '../lib/store'

const COPY = {
  code: {
    title: 'Laboratório de programação',
    intro: 'Aqui só entram as matérias que usam código. Cada lição tem exercícios que rodam no navegador, com testes automáticos. Use o editor livre para experimentar sem pressão.',
  },
  theory: {
    title: 'Formação teórica',
    intro: 'Matérias sem programação: teoria, exemplos resolvidos, ilustrações interativas e questões no formato ANPEC. A prática de código dessas ideias fica no Laboratório.',
  },
} as const

export function Tracks({ kind }: { kind: 'code' | 'theory' }) {
  const p = useStore((s) => s.p)
  const list = TRACKS.filter((t) => t.kind === kind)
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-[2rem] font-semibold leading-tight tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
        {COPY[kind].title}
      </h1>
      <p className="mt-1 max-w-2xl text-muted">{COPY[kind].intro}</p>

      {kind === 'code' && (
        <Link to="/laboratorio/livre" className="mt-5 flex items-center gap-4 rounded-lg border border-cobalt bg-cobaltsoft p-4 hover:brightness-95">
          <span className="text-cobalt"><Icon name="play" size={24} /></span>
          <span>
            <span className="block font-semibold">Editor livre</span>
            <span className="block text-sm text-muted">Escreva e rode Python, SQL ou R sem exercício e sem nota.</span>
          </span>
        </Link>
      )}

      <ul className="mt-6 divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
        {list.map((t) => {
          const ls = lessonsOfTrack(t.id)
          const n = ls.filter((l) => p.lessons[l.id]?.quickDone || p.lessons[l.id]?.fullDone).length
          return (
            <li key={t.id} data-track={t.id}>
              <Link to={`/trilhas/${t.id}`} className="flex items-center gap-4 px-4 py-4 hover:bg-surface2">
                <TrackGlyph track={t} size={46} />
                <span className="flex-1">
                  <span className="block font-semibold leading-snug">{t.title}</span>
                  <span className="block text-sm text-muted">{t.summary}</span>
                  {t.anpec && <span className="mt-1 inline-block rounded bg-brandsoft px-1.5 py-0.5 text-xs font-medium text-brand">no programa da ANPEC</span>}
                </span>
                <span className="w-24 shrink-0 text-right text-xs text-muted">
                  {ls.length === 0 ? 'em construção' : `${n} de ${ls.length}`}
                  {ls.length > 0 && (
                    <span className="mt-1 block h-1 overflow-hidden rounded-full bg-surface2">
                      <span className="block h-full bg-brand" style={{ width: `${(n / ls.length) * 100}%` }} />
                    </span>
                  )}
                </span>
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
  if (!track) return <p>Trilha não encontrada. <Link className="underline" to="/">Voltar ao painel</Link></p>
  const ls = lessonsOfTrack(trackId)
  const back = track.kind === 'code' ? '/laboratorio' : '/teoria'
  return (
    <div className="mx-auto max-w-3xl" data-track={track.id}>
      <Link to={back} className="text-sm text-brand underline underline-offset-4">
        {track.kind === 'code' ? 'Laboratório' : 'Formação teórica'}
      </Link>
      <div className="mt-3 flex items-center gap-4">
        <TrackGlyph track={track} size={56} />
        <h1 className="text-[2rem] font-semibold leading-tight tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>{track.title}</h1>
      </div>
      <p className="mt-3 max-w-2xl text-muted">{track.summary}</p>
      {track.id === 'questoes' ? (
        <QuestionBank />
      ) : ls.length === 0 ? (
        <p className="mt-6 rounded-lg border border-dashed border-line bg-surface p-5 text-muted">
          As lições desta trilha ainda estão sendo escritas. Enquanto isso, volte ao painel e siga outra trilha.
        </p>
      ) : (
        <ol className="relative mt-8 border-l-2 border-line pl-6">
          {ls.map((l) => {
            const lp = p.lessons[l.id]
            const status = lp?.fullDone ? 'Completa' : lp?.quickDone ? 'Rápida' : null
            return (
              <li key={l.id} className="relative pb-5 last:pb-0">
                <span className={`absolute -left-[2.1rem] top-3 flex h-4 w-4 items-center justify-center rounded-full border-2 ${status ? 'border-brand bg-brand text-paper' : 'border-line bg-surface'}`}>
                  {status && <Icon name="check" size={10} />}
                </span>
                <Link to={`/licao/${l.id}`} className="block rounded-lg border border-line bg-surface p-4 hover:bg-surface2">
                  <span className="block text-sm text-muted">Lição {l.order}</span>
                  <span className="block text-lg font-semibold leading-snug" style={{ fontFamily: 'var(--font-serif)' }}>{l.title}</span>
                  <span className="mt-1 block text-sm text-muted">
                    {l.minutes.quick} min na versão rápida, {l.minutes.full} min na completa
                    {status ? `. Concluída: ${status.toLowerCase()}.` : ''}
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}
