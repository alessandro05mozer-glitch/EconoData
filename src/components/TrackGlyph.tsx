import type { Track } from '../lib/types'

/** Tile com o símbolo da trilha, na cor própria dela. */
export function TrackGlyph({ track, size = 40 }: { track: Track; size?: number }) {
  const code = track.kind === 'code'
  return (
    <span
      aria-hidden="true"
      data-track={track.id}
      className={`inline-flex shrink-0 items-center justify-center rounded-md font-semibold bg-brandsoft text-brand ${track.glyph.length > 2 ? 'text-[0.8rem]' : 'text-[1.15rem]'}`}
      style={{ width: size, height: size, fontFamily: code ? 'var(--font-mono)' : 'var(--font-serif)' }}
    >
      {track.glyph}
    </span>
  )
}
