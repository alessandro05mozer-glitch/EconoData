import { useState } from 'react'
import { solve2x2, type Line } from '../../lib/sim/linear'
import { FigureFrame, Slider, Stat } from './FigureFrame'
import { Plot } from './Plot'

const R = 10

function ends(l: Line): [number, number, number, number] {
  if (Math.abs(l.b) < 1e-9) {
    const x = l.c / l.a
    return [x, -R, x, R]
  }
  return [-R, (l.c + l.a * R) / l.b, R, (l.c - l.a * R) / l.b]
}

export function LinearSim() {
  const [l1, setL1] = useState<Line>({ a: 2, b: 1, c: 8 })
  const [l2, setL2] = useState<Line>({ a: 1, b: -1, c: 1 })
  const sol = solve2x2(l1, l2)
  const set = (which: 1 | 2, key: keyof Line) => (v: number) => (which === 1 ? setL1({ ...l1, [key]: v }) : setL2({ ...l2, [key]: v }))
  const empty = (l: Line) => l.a === 0 && l.b === 0
  const e1 = ends(l1)
  const e2 = ends(l2)

  return (
    <FigureFrame
      title="sistema 2×2 como duas retas"
      hint="Cada equação é uma reta; a solução é onde elas se cruzam. Torne as retas paralelas (determinante zero) e a solução única desaparece."
    >
      <div className="grid gap-5 md:grid-cols-[1fr_16rem]">
        <Plot xDomain={[-R, R]} yDomain={[-R, R]} xLabel="x" yLabel="y" ariaLabel="Duas retas e o ponto de interseção" height={320} width={440}>
          {(s) => (
            <g>
              {!empty(l1) && <line x1={s.x(e1[0])} y1={s.y(e1[1])} x2={s.x(e1[2])} y2={s.y(e1[3])} stroke="var(--demand)" strokeWidth="2.6" />}
              {!empty(l2) && <line x1={s.x(e2[0])} y1={s.y(e2[1])} x2={s.x(e2[2])} y2={s.y(e2[3])} stroke="var(--supply)" strokeWidth="2.6" />}
              {sol.kind === 'unica' && <circle cx={s.x(sol.x)} cy={s.y(sol.y)} r="5.5" fill="var(--text)" />}
            </g>
          )}
        </Plot>
        <div className="space-y-2">
          <p className="text-sm font-semibold" style={{ color: 'var(--demand)' }}>{l1.a}x + {l1.b}y = {l1.c}</p>
          <Slider id="ln-a1" label="a₁" value={l1.a} min={-5} max={5} step={1} onChange={set(1, 'a')} />
          <Slider id="ln-b1" label="b₁" value={l1.b} min={-5} max={5} step={1} onChange={set(1, 'b')} />
          <Slider id="ln-c1" label="c₁" value={l1.c} min={-10} max={10} step={1} onChange={set(1, 'c')} />
          <p className="pt-1 text-sm font-semibold" style={{ color: 'var(--supply)' }}>{l2.a}x + {l2.b}y = {l2.c}</p>
          <Slider id="ln-a2" label="a₂" value={l2.a} min={-5} max={5} step={1} onChange={set(2, 'a')} />
          <Slider id="ln-b2" label="b₂" value={l2.b} min={-5} max={5} step={1} onChange={set(2, 'b')} />
          <Slider id="ln-c2" label="c₂" value={l2.c} min={-10} max={10} step={1} onChange={set(2, 'c')} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        <Stat label="Determinante" value={sol.det.toFixed(0)} tone={sol.kind === 'unica' ? undefined : 'bad'} />
        <Stat label="Solução" value={sol.kind === 'unica' ? `x = ${sol.x.toFixed(2)}, y = ${sol.y.toFixed(2)}` : sol.kind === 'infinitas' ? 'infinitas (retas coincidem)' : 'nenhuma (retas paralelas)'} tone={sol.kind === 'unica' ? 'ok' : 'bad'} />
        <Stat label="Pelo método de Cramer" value={sol.kind === 'unica' ? `x = ${(l1.c * l2.b - l1.b * l2.c)}/${sol.det.toFixed(0)}` : 'divisão por zero'} />
      </div>
    </FigureFrame>
  )
}
