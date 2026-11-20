// Datas como texto "AAAA-MM-DD" no fuso local, para evitar erros de fuso horário.

export function todayISO(now: Date = new Date()): string {
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function parse(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d, 12, 0, 0) // meio-dia evita problemas de horário de verão
}

export function addDays(iso: string, days: number): string {
  const d = parse(iso)
  d.setDate(d.getDate() + days)
  return todayISO(d)
}

export function diffDays(a: string, b: string): number {
  return Math.round((parse(a).getTime() - parse(b).getTime()) / 86_400_000)
}

/** Segunda-feira da semana de `iso`. */
export function weekStart(iso: string): string {
  const d = parse(iso)
  const dow = (d.getDay() + 6) % 7 // segunda = 0
  return addDays(iso, -dow)
}

/**
 * Sequência de dias seguidos com atividade. Conta se o último dia de estudo
 * foi hoje ou ontem; se passou mais que isso, a sequência zera.
 */
export function currentStreak(days: string[], today: string): number {
  const set = new Set(days)
  let cursor = set.has(today) ? today : addDays(today, -1)
  if (!set.has(cursor)) return 0
  let n = 0
  while (set.has(cursor)) {
    n += 1
    cursor = addDays(cursor, -1)
  }
  return n
}
