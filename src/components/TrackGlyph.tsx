import type { Track } from '../lib/types'

/** Tile com o símbolo da trilha: cobalto para código, verde para teoria. */
export function TrackGlyph({ track, size = 40 }: { track: Track; size?: number }) {
  const code = track.kind === 'code'
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-md font-semibold ${
        code ? 'bg-cobaltsoft text-cobalt' : 'bg-viridiansoft text-viridian'
      } ${track.glyph.length > 2 ? 'text-[0.8rem]' : 'text-[1.15rem]'}`}
      style={{ width: size, height: size, fontFamily: code ? 'var(--font-mono)' : 'var(--font-serif)' }}
    >
      {track.glyph}
    </span>
  )
}
