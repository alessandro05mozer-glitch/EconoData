import { openDB, type IDBPDatabase } from 'idb'
import { emptyProgress, type ProgressState } from './types'

/**
 * Camada de armazenamento do progresso. Hoje existe só a versão local (navegador).
 * Quando o login e o banco entrarem, basta uma segunda implementação desta interface
 * (por exemplo, Supabase) e trocar `adapter` em `store.ts`. Nada mais do app muda.
 */
export interface StorageAdapter {
  load(): Promise<ProgressState>
  save(state: ProgressState): Promise<void>
}

const DB_NAME = 'econodata'
const STORE = 'kv'
const KEY = 'progress'
const LS_KEY = 'econodata:progress'

export function migrate(raw: unknown): ProgressState {
  const base = emptyProgress()
  if (!raw || typeof raw !== 'object') return base
  const r = raw as Partial<ProgressState>
  if (r.version !== 1) return base
  return {
    ...base,
    ...r,
    settings: { ...base.settings, ...(r.settings ?? {}) },
  }
}

export class LocalAdapter implements StorageAdapter {
  private dbPromise: Promise<IDBPDatabase> | null = null

  private db(): Promise<IDBPDatabase> | null {
    if (typeof indexedDB === 'undefined') return null
    if (!this.dbPromise) {
      this.dbPromise = openDB(DB_NAME, 1, {
        upgrade(db) {
          db.createObjectStore(STORE)
        },
      })
    }
    return this.dbPromise
  }

  /**
   * O progresso é gravado em dois lugares: localStorage (síncrono, sobrevive a fechar a aba
   * logo após uma ação) e IndexedDB (mais espaço e robustez). Cada cópia leva a hora da gravação
   * e, ao abrir, vale a mais recente.
   */
  async load(): Promise<ProgressState> {
    const candidates: Array<{ savedAt: number; state: ProgressState }> = []
    try {
      const txt = localStorage.getItem(LS_KEY)
      if (txt) candidates.push(readRecord(JSON.parse(txt)))
    } catch {
      /* ignora */
    }
    try {
      const db = await this.db()
      if (db) {
        const raw = await db.get(STORE, KEY)
        if (raw) candidates.push(readRecord(raw))
      }
    } catch {
      /* ignora */
    }
    if (candidates.length === 0) return emptyProgress()
    return candidates.reduce((best, c) => (c.savedAt > best.savedAt ? c : best)).state
  }

  async save(state: ProgressState): Promise<void> {
    const rec = { savedAt: Date.now(), state }
    // 1) cópia síncrona, antes de qualquer espera
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(rec))
    } catch {
      /* sem espaço ou bloqueado: o IndexedDB ainda tenta */
    }
    // 2) cópia no IndexedDB
    try {
      const db = await this.db()
      if (db) await db.put(STORE, rec, KEY)
    } catch {
      /* o progresso desta sessão fica ao menos no localStorage */
    }
  }
}

function readRecord(raw: unknown): { savedAt: number; state: ProgressState } {
  const r = raw as { savedAt?: unknown; state?: unknown } | null
  if (r && typeof r === 'object' && 'state' in r) {
    return { savedAt: typeof r.savedAt === 'number' ? r.savedAt : 0, state: migrate(r.state) }
  }
  return { savedAt: 0, state: migrate(raw) } // formato antigo: o próprio estado
}

/* ---------- Backup em arquivo ---------- */

export function exportProgress(state: ProgressState): string {
  return JSON.stringify({ app: 'econodata', exportedAt: new Date().toISOString(), state }, null, 2)
}

export function parseImport(text: string): ProgressState {
  let data: unknown
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error('O arquivo não é um JSON válido.')
  }
  const d = data as { app?: string; state?: unknown }
  if (d?.app !== 'econodata' || !d.state) {
    throw new Error('Este arquivo não é um backup do EconoData.')
  }
  const s = migrate(d.state)
  if (s.version !== 1 || typeof s.xp !== 'number') throw new Error('Backup em formato desconhecido.')
  return s
}
