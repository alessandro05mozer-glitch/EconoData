---
id: sql-03-subconsultas-case-cte
track: sql
title: Subconsultas, CASE e CTE — perguntas em camadas sobre o IPCA
order: 3
seq: 30
minutes: { quick: 30, full: 80 }
objectives:
  - Usar uma subconsulta escalar para comparar cada linha com a média da tabela
  - Classificar linhas em faixas com CASE WHEN
  - Organizar consultas em etapas com WITH (CTE)
  - Tratar valores ausentes com COALESCE e contar com condição
  - Escolher entre subconsulta, CTE e JOIN conforme a clareza
cards:
  - front: "O que é uma subconsulta escalar?"
    back: "Um `SELECT` entre parênteses que devolve **um único valor**, usado onde caberia um número. Ex.: `WHERE taxa > (SELECT AVG(taxa) FROM ipca)`."
  - front: "Sintaxe do CASE."
    back: "`CASE WHEN condicao THEN valor ... ELSE outro END`. Avalia em ordem e devolve o primeiro `THEN` verdadeiro."
  - front: "Para que serve o WITH?"
    back: "Cria uma **tabela temporária nomeada** (CTE) que a consulta seguinte pode usar. Deixa consultas longas legíveis, em etapas."
  - front: "COALESCE(a, b)."
    back: "Devolve `a`, ou `b` se `a` for `NULL`. Útil para trocar ausentes por zero antes de somar."
---

Perguntas reais raramente se resolvem com um único `SELECT` simples. "Em quais anos a inflação ficou acima da média?" precisa da média **antes** de comparar. "Quantos anos ficaram dentro da meta, quantos acima?" exige classificar cada ano. A SQL oferece três ferramentas para isso: **subconsultas**, **CASE** e **CTE**. Todas ao lado de `GROUP BY` e `JOIN` que você já conhece.

Ao final, você faz perguntas em camadas sobre uma tabela real de IPCA, de 2015 a 2025.

## A tabela

Os dados são o IPCA anual do IBGE (em %). A tabela se chama `ipca` e tem as colunas `ano` e `taxa`.

```sql
SELECT ano, taxa FROM ipca ORDER BY ano;
```

## Subconsulta escalar

Uma subconsulta entre parênteses, que devolve **um valor**, pode aparecer no `WHERE` ou no `SELECT`.

```sql
SELECT ano, taxa
FROM ipca
WHERE taxa > (SELECT AVG(taxa) FROM ipca);
```

O banco calcula a média primeiro e depois filtra. Sem subconsulta, seria preciso rodar duas consultas e copiar o número.

:::atencao A subconsulta escalar precisa devolver um valor só
Se o `SELECT` interno devolver várias linhas, a comparação com `>` ou `=` dá erro ou resultado inesperado. Use agregações (`AVG`, `MAX`) para garantir uma linha.
:::

## Exercício 1: anos acima da média

```exercise
id: so-acima-media
lang: sql
quick: true
prompt: |
  Mostre `ano` e `taxa` dos anos em que o IPCA foi **maior que a média** de todo o período da tabela. Ordene por `ano`.
starter: |
  SELECT ano, taxa
  FROM ipca
  WHERE taxa > 0
  ORDER BY ano;
dataset: |
  CREATE TABLE ipca (ano INTEGER PRIMARY KEY, taxa REAL);
  INSERT INTO ipca VALUES
   (2015,10.67),(2016,6.29),(2017,2.95),(2018,3.75),(2019,4.31),(2020,4.52),
   (2021,10.06),(2022,5.78),(2023,4.62),(2024,4.83),(2025,4.26);
solution: |
  SELECT ano, taxa FROM ipca WHERE taxa > (SELECT AVG(taxa) FROM ipca) ORDER BY ano;
ordered: true
hints:
  - "Substitua o `0` por uma subconsulta: `(SELECT AVG(taxa) FROM ipca)`."
  - "Mantenha o `ORDER BY ano` no fim."
```

## CASE: classificar linhas

O `CASE` cria uma coluna nova a partir de condições. Útil para transformar um número em **categoria**.

```sql
SELECT ano, taxa,
       CASE WHEN taxa > 4.5 THEN 'acima do teto'
            WHEN taxa >= 1.5 THEN 'dentro da banda'
            ELSE 'abaixo' END AS faixa
FROM ipca;
```

As condições são avaliadas **em ordem**: a primeira verdadeira vence. Por isso a ordem importa.

## Exercício 2: classificar em faixas

```exercise
id: so-faixa
lang: sql
quick: true
prompt: |
  Para cada ano, mostre `ano` e uma coluna `faixa` com `'acima'` se a taxa for **maior que 4.5** e `'dentro'` caso contrário. Ordene por `ano`.
starter: |
  SELECT ano,
         'dentro' AS faixa
  FROM ipca
  ORDER BY ano;
dataset: |
  CREATE TABLE ipca (ano INTEGER PRIMARY KEY, taxa REAL);
  INSERT INTO ipca VALUES
   (2015,10.67),(2016,6.29),(2017,2.95),(2018,3.75),(2019,4.31),(2020,4.52),
   (2021,10.06),(2022,5.78),(2023,4.62),(2024,4.83),(2025,4.26);
solution: |
  SELECT ano, CASE WHEN taxa > 4.5 THEN 'acima' ELSE 'dentro' END AS faixa FROM ipca ORDER BY ano;
ordered: true
hints:
  - "`CASE WHEN taxa > 4.5 THEN 'acima' ELSE 'dentro' END AS faixa`."
```

## Contar por faixa

O `CASE` dentro de um agregado permite contar com condição:

```sql
SELECT SUM(CASE WHEN taxa > 4.5 THEN 1 ELSE 0 END) AS anos_acima,
       COUNT(*) AS total
FROM ipca;
```

## Exercício 3: quantos anos acima do teto

```exercise
id: so-contar-acima
lang: sql
prompt: |
  Em uma única linha, mostre `anos_acima` (quantos anos tiveram taxa **maior que 4.5**) e `total` (quantos anos há na tabela).
starter: |
  SELECT COUNT(*) AS anos_acima, COUNT(*) AS total
  FROM ipca;
dataset: |
  CREATE TABLE ipca (ano INTEGER PRIMARY KEY, taxa REAL);
  INSERT INTO ipca VALUES
   (2015,10.67),(2016,6.29),(2017,2.95),(2018,3.75),(2019,4.31),(2020,4.52),
   (2021,10.06),(2022,5.78),(2023,4.62),(2024,4.83),(2025,4.26);
solution: |
  SELECT SUM(CASE WHEN taxa > 4.5 THEN 1 ELSE 0 END) AS anos_acima, COUNT(*) AS total FROM ipca;
hints:
  - "Some 1 para cada linha que passa na condição: `SUM(CASE WHEN taxa > 4.5 THEN 1 ELSE 0 END)`."
```

<!--full-->

## WITH: consultas em etapas

Quando uma consulta fica longa, nomeie as etapas com `WITH`. Cada etapa é uma tabela temporária que a seguinte usa.

```sql
WITH media AS (
  SELECT AVG(taxa) AS m FROM ipca
)
SELECT i.ano, i.taxa, ROUND(i.taxa - media.m, 2) AS desvio
FROM ipca AS i, media
ORDER BY i.ano;
```

A etapa `media` tem uma única linha, que é combinada com cada linha de `ipca`.

:::intuicao Subconsulta, CTE ou JOIN?
As três podem dar o mesmo resultado. Use **subconsulta escalar** para um número rápido, **CTE** para consultas com várias etapas que precisam ser lidas de cima para baixo e **JOIN** quando você precisa combinar colunas de duas tabelas. Prefira a que torna a pergunta mais óbvia para quem lê.
:::

## Exercício 4: desvio em relação à média

```exercise
id: so-desvio
lang: sql
prompt: |
  Mostre `ano` e `desvio`, a diferença entre a taxa do ano e a **média** das taxas, arredondada para 2 casas (`ROUND(..., 2)`). Ordene por `ano`.
starter: |
  WITH media AS (
    SELECT AVG(taxa) AS m FROM ipca
  )
  SELECT ano, 0 AS desvio
  FROM ipca
  ORDER BY ano;
dataset: |
  CREATE TABLE ipca (ano INTEGER PRIMARY KEY, taxa REAL);
  INSERT INTO ipca VALUES
   (2015,10.67),(2016,6.29),(2017,2.95),(2018,3.75),(2019,4.31),(2020,4.52),
   (2021,10.06),(2022,5.78),(2023,4.62),(2024,4.83),(2025,4.26);
solution: |
  WITH media AS (SELECT AVG(taxa) AS m FROM ipca)
  SELECT i.ano, ROUND(i.taxa - media.m, 2) AS desvio FROM ipca AS i, media ORDER BY i.ano;
ordered: true
hints:
  - "Combine `ipca` com `media` (uma linha) e calcule `taxa - m`."
  - "`ROUND(i.taxa - media.m, 2) AS desvio`."
```

## COALESCE e valores ausentes

`NULL` em uma soma contamina o resultado. `COALESCE(valor, 0)` troca ausentes por um valor padrão. Lembre-se de que `AVG` e `SUM` **ignoram** `NULL`, mas `COUNT(*)` conta todas as linhas e `COUNT(coluna)` conta só as preenchidas.

## Erros que custam pontos

- Subconsulta escalar que devolve mais de uma linha.
- Ordem errada nos `WHEN` do `CASE`: o primeiro verdadeiro vence.
- Esquecer o `ELSE`: as linhas sem correspondência ficam `NULL`.
- Usar `WHERE` com agregado, quando o certo é subconsulta ou `HAVING`.

## Como estudar este tema

Reescreva o exercício 1 com `WITH` em vez de subconsulta e confira que o resultado é o mesmo. Depois, use `CASE` para criar três faixas (abaixo de 3%, entre 3% e 4,5%, acima de 4,5%) e conte quantos anos há em cada uma.
