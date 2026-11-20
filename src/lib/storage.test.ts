import { beforeEach, describe, expect, it } from 'vitest'
import { LocalAdapter, exportProgress, parseImport } from './storage'
import { emptyProgress } from './types'

// Em Node não existe indexedDB; o adaptador cai no localStorage, que simulamos aqui.
const mem = new Map<string, string>()
beforeEach(() => {
  mem.clear()
  ;(globalThis as { localStorage?: unknown }).localStorage = {
    getItem: (k: string) => mem.get(k) ?? null,
    setItem: (k: string, v: string) => void mem.set(k, v),
    removeItem: (k: string) => void mem.delete(k),
  }
})

describe('LocalAdapter', () => {
  it('guarda e recupera o progresso', async () => {
    const a = new LocalAdapter()
    await a.save({ ...emptyProgress(), xp: 120 })
    expect((await new LocalAdapter().load()).xp).toBe(120)
  })

  it('a gravação em localStorage é síncrona (vale mesmo se a aba fechar logo depois)', () => {
    void new LocalAdapter().save({ ...emptyProgress(), xp: 7 })
    expect(mem.get('econodata:progress')).toContain('"xp":7')
  })

  it('lê o formato antigo (estado puro, sem savedAt)', async () => {
    mem.set('econodata:progress', JSON.stringify({ ...emptyProgress(), xp: 55 }))
    expect((await new LocalAdapter().load()).xp).toBe(55)
  })

  it('sem nada salvo, devolve progresso vazio', async () => {
    expect((await new LocalAdapter().load()).xp).toBe(0)
  })
})

describe('backup em arquivo', () => {
  it('exporta e importa sem perdas', () => {
    const s = { ...emptyProgress(), xp: 300, studyDays: ['2026-11-20'] }
    expect(parseImport(exportProgress(s))).toEqual(s)
  })
  it('recusa arquivo que não é do EconoData', () => {
    expect(() => parseImport('{"a":1}')).toThrow()
    expect(() => parseImport('não é json')).toThrow()
  })
})
