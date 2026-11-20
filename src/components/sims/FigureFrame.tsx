import type { ReactNode } from 'react'

/** Moldura comum das ilustrações interativas: título, corpo e uma legenda que diz o que observar. */
export function FigureFrame({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <figure className="my-6 max-w-[46rem] overflow-hidden rounded-lg border border-line bg-surface">
      <figcaption className="border-b border-line bg-surface2 px-5 py-2.5 text-[0.95rem] font-semibold">
        Ilustração interativa<span className="font-normal">. {title}</span>
      </figcaption>
      <div className="p-4 sm:p-5">{children}</div>
      {hint && <p className="border-t border-line bg-paper px-5 py-3 text-sm text-muted">{hint}</p>}
    </figure>
  )
}

export function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  id,
}: {
  label: ReactNode
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  format?: (v: number) => string
  id: string
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-2 text-sm">
        <span>{label}</span>
        <span className="font-mono text-[0.82rem] font-semibold">{format ? format(value) : value}</span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-0.5 w-full accent-[var(--accent)]"
      />
    </div>
  )
}

export function Stat({ label, value, tone }: { label: string; value: string; tone?: 'ok' | 'bad' | 'mark' }) {
  return (
    <div className={`rounded-md px-3 py-2 ${tone === 'mark' ? 'bg-mark text-markink' : tone === 'ok' ? 'bg-oksoft' : tone === 'bad' ? 'bg-badsoft' : 'bg-surface2'}`}>
      <div className="text-xs opacity-80">{label}</div>
      <div className="font-mono text-[1.02rem] font-semibold">{value}</div>
    </div>
  )
}
