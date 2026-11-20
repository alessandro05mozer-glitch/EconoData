// Dados reais usados nas ilustrações.
// IPCA: variação acumulada no ano, em %. Fonte: IBGE (série BCB nº 433). 1994 cobre apenas jul–dez, após o Plano Real.
// Conferido contra os comunicados do IBGE para 2023 (4,62), 2024 (4,83) e 2025 (4,26).
export const IPCA_ANUAL: Record<number, number> = {
  1994: 18.57, 1995: 22.41, 1996: 9.56, 1997: 5.22, 1998: 1.66, 1999: 8.94, 2000: 5.97, 2001: 7.67,
  2002: 12.53, 2003: 9.3, 2004: 7.6, 2005: 5.69, 2006: 3.14, 2007: 4.46, 2008: 5.9, 2009: 4.31,
  2010: 5.91, 2011: 6.5, 2012: 5.84, 2013: 5.91, 2014: 6.41, 2015: 10.67, 2016: 6.29, 2017: 2.95,
  2018: 3.75, 2019: 4.31, 2020: 4.52, 2021: 10.06, 2022: 5.78, 2023: 4.62, 2024: 4.83, 2025: 4.26,
}

export const IPCA_YEARS = Object.keys(IPCA_ANUAL).map(Number)
export const IPCA_FIRST_FULL_YEAR = 1995
export const IPCA_LAST_YEAR = 2025

/** Inflação acumulada (em %) entre o início do ano `from` e o fim do ano `to`, compondo as taxas anuais. */
export function ipcaAccumulated(from: number, to: number): number {
  if (to < from) return 0
  let f = 1
  for (let y = from; y <= to; y++) f *= 1 + (IPCA_ANUAL[y] ?? 0) / 100
  return (f - 1) * 100
}

/** Quanto R$ 100 do início de `from` valem em poder de compra no fim de `to` (valores de `from`). */
export function purchasingPower(from: number, to: number, amount = 100): number {
  return amount / (1 + ipcaAccumulated(from, to) / 100)
}

/** Quanto era preciso ter no fim de `to` para comprar o que R$ 100 compravam no início de `from`. */
export function correctedValue(from: number, to: number, amount = 100): number {
  return amount * (1 + ipcaAccumulated(from, to) / 100)
}
