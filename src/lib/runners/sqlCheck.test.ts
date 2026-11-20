import initSqlJs, { type SqlJsStatic } from 'sql.js'
import { beforeAll, describe, expect, it } from 'vitest'
import type { ExerciseSpec } from '../types'
import { runSql } from './sqlCheck'

const DATASET = `
CREATE TABLE vendas (id INTEGER, produto TEXT, valor REAL);
INSERT INTO vendas VALUES (1,'a',10),(2,'b',20),(3,'a',30),(4,'c',5);
`

function spec(over: Partial<ExerciseSpec> = {}): ExerciseSpec {
  return {
    id: 'ex',
    lang: 'sql',
    prompt: '',
    starter: '',
    dataset: DATASET,
    solution: 'SELECT produto, SUM(valor) AS total FROM vendas GROUP BY produto',
    hints: [],
    ...over,
  }
}

let SQL: SqlJsStatic
beforeAll(async () => {
  SQL = await initSqlJs()
})

const passes = (r: ReturnType<typeof runSql>) => r.ok && r.tests.every((t) => t.passed)

describe('runSql', () => {
  it('aceita a resposta correta', () => {
    const r = runSql(SQL, spec(), DATASET, 'SELECT produto, SUM(valor) AS total FROM vendas GROUP BY produto')
    expect(r.ok).toBe(true)
    expect(passes(r)).toBe(true)
    expect(r.table?.rows).toHaveLength(3)
  })

  it('aceita outra forma correta, com outro apelido e outra ordem das linhas', () => {
    const r = runSql(SQL, spec(), DATASET, 'SELECT produto, SUM(valor) FROM vendas GROUP BY produto ORDER BY 1 DESC')
    expect(passes(r)).toBe(true)
  })

  it('com ordered: true, a ordem das linhas passa a valer', () => {
    const s = spec({ ordered: true, solution: 'SELECT produto FROM vendas ORDER BY valor' })
    expect(passes(runSql(SQL, s, DATASET, 'SELECT produto FROM vendas ORDER BY valor'))).toBe(true)
    expect(passes(runSql(SQL, s, DATASET, 'SELECT produto FROM vendas ORDER BY valor DESC'))).toBe(false)
  })

  it('reprova valores errados e aponta qual teste falhou', () => {
    const r = runSql(SQL, spec(), DATASET, 'SELECT produto, AVG(valor) FROM vendas GROUP BY produto')
    expect(r.ok).toBe(true)
    const failed = r.tests.filter((t) => !t.passed).map((t) => t.name)
    expect(failed).toEqual(['Os valores estão corretos'])
  })

  it('reprova número de colunas e de linhas diferentes', () => {
    const r = runSql(SQL, spec(), DATASET, 'SELECT produto FROM vendas')
    expect(r.tests.find((t) => t.name.includes('coluna'))?.passed).toBe(false)
    expect(r.tests.find((t) => t.name.includes('linha'))?.passed).toBe(false)
  })

  it('erro de sintaxe vira erro de execução legível, sem testes', () => {
    const r = runSql(SQL, spec(), DATASET, 'SELEC produto FROM vendas')
    expect(r.ok).toBe(false)
    expect(r.stderr).toMatch(/syntax error/i)
    expect(r.tests).toHaveLength(0)
  })

  it('o aluno alterar os dados não afeta a solução de referência', () => {
    const r = runSql(SQL, spec(), DATASET, 'DELETE FROM vendas; SELECT produto, SUM(valor) FROM vendas GROUP BY produto')
    expect(passes(r)).toBe(false)
    const again = runSql(SQL, spec(), DATASET, 'SELECT produto, SUM(valor) AS total FROM vendas GROUP BY produto')
    expect(passes(again)).toBe(true) // cada execução começa com o banco limpo
  })

  it('sem exercício (só executar) devolve a tabela, sem testes', () => {
    const r = runSql(SQL, null, DATASET, 'SELECT COUNT(*) AS n FROM vendas')
    expect(r.tests).toHaveLength(0)
    expect(r.table).toEqual({ columns: ['n'], rows: [[4]] })
  })

  it('comando sem resultado (CREATE) não quebra', () => {
    const r = runSql(SQL, null, DATASET, 'CREATE TABLE x (a INTEGER)')
    expect(r.ok).toBe(true)
    expect(r.table).toBeUndefined()
  })

  it('compara decimais com tolerância e trata NULL', () => {
    const s = spec({ solution: 'SELECT 0.1 + 0.2, NULL' })
    expect(passes(runSql(SQL, s, DATASET, 'SELECT 0.3, NULL'))).toBe(true)
  })
})
