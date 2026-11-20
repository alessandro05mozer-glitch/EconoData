// Pontuação no formato do Exame ANPEC (Manual do Candidato 2027, seção "Sobre a correção das provas").
//
// Tipo A: até cinco afirmativas, cada uma marcada como certa (true) ou errada (false).
//   Acerto = +1, erro = -1, em branco = 0. Itens anulados saem da conta (NI diminui).
//   RQ = (acertos - erros) / NI, portanto um erro anula um acerto.
// Tipo B: resposta numérica inteira de 00 a 99. RQ = 1 se correta, 0 se errada ou em branco.

export interface TipoAItem {
  correct: boolean
  annulled?: boolean
}

export type Marking = boolean | null // null = em branco

export type ItemResult = 'right' | 'wrong' | 'blank' | 'annulled'

export interface TipoAScore {
  /** Resultado da questão, de -1 a +1 */
  rq: number
  /** Soma de +1 e -1 antes de dividir por NI */
  points: number
  /** Número de itens válidos (NI) */
  valid: number
  perItem: ItemResult[]
}

export function scoreTipoA(key: TipoAItem[], answers: Marking[]): TipoAScore {
  if (key.length !== answers.length) {
    throw new Error('O gabarito e as respostas precisam ter o mesmo número de itens.')
  }
  let points = 0
  let valid = 0
  const perItem: ItemResult[] = key.map((item, i) => {
    if (item.annulled) return 'annulled'
    valid += 1
    const a = answers[i]
    if (a === null) return 'blank'
    if (a === item.correct) {
      points += 1
      return 'right'
    }
    points -= 1
    return 'wrong'
  })
  return { rq: valid === 0 ? 0 : points / valid, points, valid, perItem }
}

export interface TipoBScore {
  rq: 0 | 1
}

export function scoreTipoB(key: number, answer: number | null): TipoBScore {
  if (!Number.isInteger(key) || key < 0 || key > 99) {
    throw new Error('O gabarito do Tipo B é um inteiro de 0 a 99.')
  }
  return { rq: answer !== null && answer === key ? 1 : 0 }
}

/** Resultado da prova: soma dos resultados das questões (RPj no manual). */
export function scoreProva(rqs: number[]): number {
  return rqs.reduce((sum, rq) => sum + rq, 0)
}
