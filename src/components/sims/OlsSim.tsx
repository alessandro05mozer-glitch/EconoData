import { useRef, useState } from 'react'
import { ols, type Pt } from '../../lib/sim/ols'
import { FigureFrame, Stat } from './FigureFrame'
import { Plot } from './Plot'

const W = 480
const H = 320
const START: Pt[] = [{ x: 1, y: 2.4 }, { x: 2, y: 3.1 }, { x: 3, y: 3.9 }, { x: 4, y: 5.4 }, { x: 5, y: 5.2 }, { x: 6, y: 6.8 }, { x: 7, y: 7.1 }, { x: 8, y: 8.6 }]

export function OlsSim() {
  const [pts, setPts] = useState<Pt[]>(START)
  const [drag, setDrag] = useState<number | null>(null)
  const [showRes, setShowRes] = useState(true)
  const box = useRef<HTMLDivElement>(null)
  const fit = ols(pts)

  const toData = (e: React.PointerEvent): Pt | null => {
    const svg = box.current?.querySelector('svg')
    if (!svg) return null
    const r = svg.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * W
    const py = ((e.clientY - r.top) / r.height) * H
    const l = 46, rr = W - 14, t = 26, b = H - 38
    const x = ((px - l) / (rr - l)) * 10
    const y = ((b - py) / (b - t)) * 10
    return { x: Math.min(10, Math.max(0, x)), y: Math.min(10, Math.max(0, y)) }
  }
  const move = (e: React.PointerEvent) => {
    if (drag === null) return
    const p = toData(e)
    if (p) setPts((a) => a.map((q, i) => (i === drag ? p : q)))
  }
  return (
    <FigureFrame title="mínimos quadrados: arraste os pontos" hint="Arraste qualquer ponto. A reta minimiza a soma dos quadrados dos resíduos (os segmentos tracejados). Leve um ponto para longe dos demais e veja quanto um único outlier puxa a reta. Toque no fundo para adicionar um ponto.">
      <div className="grid gap-5 md:grid-cols-[1fr_14rem]">
        <div ref={box} className="touch-none" onPointerMove={move} onPointerUp={() => setDrag(null)} onPointerLeave={() => setDrag(null)} onDoubleClick={(e) => { const p = toData(e as unknown as React.PointerEvent); if (p) setPts((a) => [...a, p]) }}>
          <Plot xDomain={[0, 10]} yDomain={[0, 10]} xLabel="x" yLabel="y" width={W} height={H} ariaLabel="Gráfico de dispersão com reta de mínimos quadrados ajustada a pontos arrastáveis">
            {(s) => (
              <g>
                {fit && <line x1={s.x(0)} y1={s.y(fit.a)} x2={s.x(10)} y2={s.y(fit.a + fit.b * 10)} stroke="var(--accent)" strokeWidth="2.6" />}
                {fit && showRes && pts.map((p, i) => (<line key={`r${i}`} x1={s.x(p.x)} x2={s.x(p.x)} y1={s.y(p.y)} y2={s.y(fit.a + fit.b * p.x)} stroke="var(--red)" strokeWidth="1.5" strokeDasharray="3 3" />))}
                {pts.map((p, i) => (
                  <circle key={i} cx={s.x(p.x)} cy={s.y(p.y)} r={drag === i ? 9 : 7} fill="var(--demand)" stroke="var(--surface)" strokeWidth="2" style={{ cursor: 'grab' }} onPointerDown={(e) => { e.stopPropagation(); (e.target as Element).setPointerCapture?.(e.pointerId); setDrag(i) }} onDoubleClick={(e) => { e.stopPropagation(); if (pts.length > 3) setPts((a) => a.filter((_, j) => j !== i)) }} />
                ))}
              </g>
            )}
          </Plot>
        </div>
        <div className="space-y-3">
          <Stat label="Reta estimada" value={fit ? `ŷ = ${fit.a.toFixed(2)} + ${fit.b.toFixed(2)}·x` : 'x não varia'} tone="mark" />
          <Stat label="R²" value={fit ? fit.r2.toFixed(3) : '—'} />
          <Stat label="Soma dos quadrados dos resíduos" value={fit ? fit.sse.toFixed(2) : '—'} />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={showRes} onChange={(e) => setShowRes(e.target.checked)} className="accent-[var(--accent)]" /> Mostrar resíduos</label>
          <button type="button" onClick={() => setPts(START)} className="w-full rounded-md border border-line px-3 py-1.5 text-sm font-medium hover:bg-surface2">Restaurar pontos</button>
          <p className="text-xs text-muted">Duplo clique no fundo adiciona ponto; duplo clique num ponto remove (mínimo de 3).</p>
        </div>
      </div>
    </FigureFrame>
  )
}
