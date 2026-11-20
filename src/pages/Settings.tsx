import { useRef, useState } from 'react'
import { exportProgress, parseImport } from '../lib/storage'
import { useStore } from '../lib/store'
import type { Theme } from '../lib/types'

export function Settings() {
  const p = useStore((s) => s.p)
  const setSettings = useStore((s) => s.setSettings)
  const replaceAll = useStore((s) => s.replaceAll)
  const reset = useStore((s) => s.reset)
  const file = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState('')

  function download() {
    const blob = new Blob([exportProgress(p)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `econodata-progresso-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMsg('Backup baixado. Guarde o arquivo em um lugar seguro.')
  }

  async function onImport(f: File | undefined) {
    if (!f) return
    try {
      const state = parseImport(await f.text())
      if (!confirm('Importar vai substituir o progresso deste aparelho. Continuar?')) return
      replaceAll(state)
      setMsg('Progresso importado.')
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Arquivo inválido.')
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="text-3xl font-semibold" style={{ fontFamily: 'var(--font-serif)' }}>Ajustes</h1>

      <section className="rounded-lg border border-line bg-surface p-4">
        <h2 className="font-bold">Aparência</h2>
        <div className="mt-2 flex gap-2" role="radiogroup" aria-label="Tema">
          {([['system', 'Automático'], ['light', 'Claro'], ['dark', 'Escuro']] as [Theme, string][]).map(([v, l]) => (
            <button
              key={v}
              role="radio"
              aria-checked={p.settings.theme === v}
              onClick={() => setSettings({ theme: v })}
              className={`rounded-lg border px-3 py-1.5 text-sm ${p.settings.theme === v ? 'border-brand bg-brandsoft font-semibold' : 'border-line'}`}
            >
              {l}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-line bg-surface p-4">
        <h2 className="font-bold">Meta semanal</h2>
        <label className="mt-2 flex items-center gap-3 text-sm">
          XP por semana
          <input
            type="number"
            min={50}
            max={2000}
            step={50}
            value={p.settings.weeklyGoalXp}
            onChange={(e) => setSettings({ weeklyGoalXp: Math.max(50, Number(e.target.value) || 200) })}
            className="w-24 rounded-lg border border-line bg-surface px-2 py-1"
          />
        </label>
        <p className="mt-1 text-xs text-muted">Referência: uma lição completa com exercício rende cerca de 100 XP.</p>
      </section>

      <section className="rounded-lg border border-line bg-surface p-4">
        <h2 className="font-bold">Backup do progresso</h2>
        <p className="mt-1 text-sm text-muted">
          Por enquanto o progresso fica salvo só neste navegador, sem login. Para levar do computador ao celular (ou se for limpar os dados do navegador), baixe o backup e importe no outro aparelho.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button onClick={download} className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-paper">Baixar backup</button>
          <button onClick={() => file.current?.click()} className="rounded-lg border border-line px-4 py-2 text-sm font-semibold">Importar backup</button>
          <input ref={file} type="file" accept="application/json,.json" hidden onChange={(e) => { void onImport(e.target.files?.[0]); e.target.value = '' }} />
        </div>
        {msg && <p className="mt-2 text-sm" role="status">{msg}</p>}
      </section>

      <section className="rounded-lg border border-bad p-4">
        <h2 className="font-bold text-bad">Zerar progresso</h2>
        <p className="mt-1 text-sm text-muted">Apaga XP, lições, exercícios e cartões deste aparelho. Baixe o backup antes.</p>
        <button
          onClick={() => { if (confirm('Apagar todo o progresso deste aparelho? Isso não pode ser desfeito.')) { reset(); setMsg('Progresso zerado.') } }}
          className="mt-2 rounded-lg bg-badsoft px-4 py-2 text-sm font-semibold text-bad"
        >
          Zerar tudo
        </button>
      </section>
    </div>
  )
}
