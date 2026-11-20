import { useMemo, useState } from 'react'
import { histogram, normalPdf, sampleMeans } from '../../lib/sim/clt'
import { FigureFrame, Slider, Stat } from './FigureFrame'
import { Plot } from './Plot'

export function CltSim() {
  const [n, setN] = useState(2)
  const [seed, setSeed] = useState(11)
  const reps = 1500
  const xs = useMemo(() => sampleMeans(n, reps, seed), [n, seed])
  const bins = 36
  const lo = 0
  const hi = 3
  const h = histogram(xs, lo, hi, bins)
  const bw = (hi - lo) / bins
  const dens = h.map((c) => c / reps / bw)
  const sd = 1 / Math.sqrt(n)
  const mean = xs.reduce((a, b) => a + b, 0) / xs.length
  const sdObs = Math.sqrt(xs.reduce((a, b) => a + (b - mean) ** 2, 0) / xs.length)
  const ymax = Math.max(...dens, normalPdf(1, 1, sd)) * 1.1
  return (
    <FigureFrame title="teorema central do limite" hint="A população é uma exponencial (muito assimétrica, média 1, desvio 1). Cada barra é a frequência de médias amostrais; a curva é a normal com média 1 e desvio 1/√n. Aumente n: o histograma se aproxima do sino, mesmo a população sendo torta.">
      <div className="grid gap-5 md:grid-cols-[1fr_14rem]">
        <Plot xDomain={[0, 3]} yDomain={[0, ymax]} xLabel="Média amostral" yLabel="Densidade" ariaLabel="Histograma de médias amostrais e curva normal" height={300}>
          {(s) => (
            <g>
              {dens.map((d, i) => (<rect key={i} x={s.x(lo + i * bw) + 0.5} y={s.y(d)} width={Math.max(1, s.x(bw) - s.x(0) - 1)} height={s.bottom - s.y(d)} fill="var(--demand)" opacity="0.6" />))}
              <path d={Array.from({ length: 121 }, (_, k) => { const x = (3 * k) / 120; return `${k ? 'L' : 'M'}${s.x(x).toFixed(1)},${s.y(normalPdf(x, 1, sd)).toFixed(1)}` }).join('')} fill="none" stroke="var(--supply)" strokeWidth="2.6" />
            </g>
          )}
        </Plot>
        <div className="space-y-3">
          <Slider id="cl-n" label="Tamanho da amostra n" value={n} min={1} max={100} step={1} onChange={setN} />
          <button type="button" onClick={() => setSeed((v) => v + 1)} className="w-full rounded-md border border-line px-3 py-1.5 text-sm font-medium hover:bg-surface2">Sortear de novo</button>
          <Stat label="Média das médias (teórica 1)" value={mean.toFixed(3)} />
          <Stat label="Desvio observado | teórico 1/√n" value={`${sdObs.toFixed(3)} | ${sd.toFixed(3)}`} tone="mark" />
        </div>
      </div>
    </FigureFrame>
  )
}
