import { useState } from 'react'
import { equilibrium, isCurveI, lmCurveI, type IsLm } from '../../lib/sim/islm'
import { FigureFrame, Slider, Stat } from './FigureFrame'
import { Plot } from './Plot'

const BASE: IsLm = { c0: 100, c: 0.75, T: 80, I0: 150, b: 20, G: 100, k: 0.5, h: 25, MP: 200 }

export function IsLmSim() {
  const [G, setG] = useState(BASE.G)
  const [MP, setMP] = useState(BASE.MP)
  const p = { ...BASE, G, MP }
  const e = equilibrium(p)
  const e0 = equilibrium(BASE)
  return (
    <FigureFrame title="IS–LM: política fiscal e monetária" hint="Gasto público desloca a IS para a direita: sobem renda e juros (efeito deslocamento parcial do investimento). Mais moeda desloca a LM para baixo: sobe a renda e caem os juros. O ponto cinza é o equilíbrio inicial.">
      <div className="grid gap-5 md:grid-cols-[1fr_14rem]">
        <Plot xDomain={[0, 1600]} yDomain={[0, 30]} xLabel="Renda Y" yLabel="Juros i (%)" ariaLabel="Curvas IS e LM e o equilíbrio macroeconômico" height={320}>
          {(s) => {
            const path = (f: (y: number) => number) => Array.from({ length: 81 }, (_, k) => { const y = (1600 * k) / 80; return `${k ? 'L' : 'M'}${s.x(y).toFixed(1)},${s.y(f(y)).toFixed(1)}` }).join('')
            return (
              <g>
                <path d={path((y) => isCurveI(BASE, y))} fill="none" stroke="var(--demand)" strokeWidth="1.6" opacity="0.35" />
                <path d={path((y) => lmCurveI(BASE, y))} fill="none" stroke="var(--supply)" strokeWidth="1.6" opacity="0.35" />
                <path d={path((y) => isCurveI(p, y))} fill="none" stroke="var(--demand)" strokeWidth="2.8" />
                <path d={path((y) => lmCurveI(p, y))} fill="none" stroke="var(--supply)" strokeWidth="2.8" />
                <circle cx={s.x(e0.Y)} cy={s.y(e0.i)} r="5" fill="var(--muted)" stroke="var(--surface)" strokeWidth="2" />
                <circle cx={s.x(e.Y)} cy={s.y(e.i)} r="6" fill="var(--accent)" stroke="var(--surface)" strokeWidth="2" />
                <text x={s.x(150)} y={s.y(isCurveI(p, 150)) - 8} fontSize="13" fontWeight="700" fill="var(--demand)">IS</text>
                <text x={s.x(1300)} y={s.y(lmCurveI(p, 1300)) - 8} fontSize="13" fontWeight="700" fill="var(--supply)">LM</text>
              </g>
            )
          }}
        </Plot>
        <div className="space-y-3">
          <Slider id="is-g" label="Gasto do governo G" value={G} min={0} max={250} step={5} onChange={setG} />
          <Slider id="is-m" label="Oferta real de moeda M/P" value={MP} min={50} max={450} step={10} onChange={setMP} />
          <Stat label="Renda de equilíbrio" value={`${e.Y.toFixed(0)}  (antes ${e0.Y.toFixed(0)})`} tone="mark" />
          <Stat label="Juros de equilíbrio" value={`${e.i.toFixed(2)}%  (antes ${e0.i.toFixed(2)}%)`} />
        </div>
      </div>
    </FigureFrame>
  )
}
