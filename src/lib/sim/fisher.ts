// Juros reais (equação de Fisher exata e aproximada) e crescimento exponencial.
export const realRateExact = (nominalPct: number, inflationPct: number) =>
  ((1 + nominalPct / 100) / (1 + inflationPct / 100) - 1) * 100
export const realRateApprox = (nominalPct: number, inflationPct: number) => nominalPct - inflationPct

export function compound(principal: number, ratePct: number, years: number): number {
  return principal * Math.pow(1 + ratePct / 100, years)
}
/** Anos para dobrar a ritmo `ratePct` ao ano (exato). */
export function doublingTime(ratePct: number): number {
  return ratePct <= 0 ? Infinity : Math.log(2) / Math.log(1 + ratePct / 100)
}
/** Regra dos 70: aproximação de cabeça para o tempo de duplicação. */
export function rule70(ratePct: number): number {
  return ratePct <= 0 ? Infinity : 70 / ratePct
}
