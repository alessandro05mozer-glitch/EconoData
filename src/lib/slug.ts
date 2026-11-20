export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Títulos de seção (##) de um trecho de Markdown, ignorando blocos de código. */
export function headingsOf(md: string): string[] {
  const out: string[] = []
  let fence = false
  for (const line of md.split('\n')) {
    if (/^```/.test(line)) fence = !fence
    if (fence) continue
    const m = line.match(/^##\s+(.+?)\s*$/)
    if (m) out.push(m[1].replace(/[`*_$]/g, ''))
  }
  return out
}
