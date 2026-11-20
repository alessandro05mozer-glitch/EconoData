import { useState } from 'react'
import { FigureFrame, Slider, Stat } from './FigureFrame'
import { curvePath, Plot } from './Plot'

const FUNCS = {
  quad: { label: 'x²', f: (x: number) => x * x, df: (x: number) => 2 * x, y: [-1, 9] as [number, number] },
  cubic: { label: 'x³/3 − x', f: (x: number) => (x * x * x) / 3 - x, df: (x: number) => x * x - 1, y: [-5, 5] as [number, number] },
  sin: { label: 'sen x', f: Math.sin, df: Math.cos, y: [-1.5, 1.5] as [number, number] },
}
type Key = keyof typeof FUNCS

const H = [2, 1.5, 1, 0.7, 0.5, 0.3, 0.2, 0.1, 0.05, 0.01]

export function DerivativeSim() {
  const [key, setKey] = useState<Key>('quad')
  const [x0, setX0] = useState(1)
  const [hi, setHi] = useState(0)
  const fn = FUNCS[key]
  const h = H[hi]
  const y0 = fn.f(x0)
  const secant = (fn.f(x0 + h) - y0) / h
  const tangent = fn.df(x0)

  return (
    <FigureFrame
      title="da secante à tangente"
      hint="A derivada é o limite da inclinação da secante quando h tende a zero. Reduza h e veja a secante girar até coincidir com a tangente."
    >
      <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Função">
        {(Object.keys(FUNCS) as Key[]).map((k) => (
          <button key={k} type="button" onClick={() => setKey(k)} aria-pressed={key === k} className={`rounded-md border px-3 py-1 text-sm font-medium ${key === k ? 'border-[var(--accent)] bg-brandsoft' : 'border-line hover:bg-surface2'}`}>
            f(x) = {FUNCS[k].label}
          </button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_15rem]">
        <Plot xDomain={[-3, 3]} yDomain={fn.y} xLabel="x" yLabel="f(x)" ariaLabel="Função com reta secante e reta tangente" height={320}>
          {(s) => {
            const line = (slope: number) => (v: number) => y0 + slope * (v - x0)
            return (
              <g>
                <path d={curvePath(fn.f, -3, 3, s, 200)} fill="none" stroke="var(--text)" strokeWidth="2.4" />
                <path d={curvePath(line(tangent), -3, 3, s, 2)} fill="none" stroke="var(--green)" strokeWidth="2" strokeDasharray="6 4" />
                <path d={curvePath(line(secant), -3, 3, s, 2)} fill="none" stroke="var(--supply)" strokeWidth="2.6" />
                <circle cx={s.x(x0)} cy={s.y(y0)} r="5" fill="var(--text)" />
                <circle cx={s.x(x0 + h)} cy={s.y(fn.f(x0 + h))} r="5" fill="var(--supply)" stroke="var(--surface)" strokeWidth="2" />
              </g>
            )
          }}
        </Plot>
        <div className="space-y-2.5">
          <Slider id="dv-x" label="Ponto x₀" value={x0} min={-2} max={2} step={0.1} onChange={setX0} format={(v) => v.toFixed(1)} />
          <Slider id="dv-h" label="Distância h (diminua)" value={hi} min={0} max={H.length - 1} step={1} onChange={setHi} format={() => String(h)} />
          <p className="text-xs text-muted"><span style={{ color: 'var(--supply)' }}>Laranja</span>: secante. <span style={{ color: 'var(--green)' }}>Verde tracejada</span>: tangente.</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        <Stat label="Inclinação da secante" value={secant.toFixed(4)} />
        <Stat label="Derivada f′(x₀)" value={tangent.toFixed(4)} tone="mark" />
        <Stat label="Diferença" value={Math.abs(secant - tangent).toFixed(4)} />
      </div>
    </FigureFrame>
  )
}
