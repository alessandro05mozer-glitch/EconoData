---
id: sql-01-select
track: sql
title: SELECT, WHERE e ORDER BY — fazendo perguntas a uma tabela
order: 1
seq: 1
minutes: { quick: 20, full: 60 }
objectives:
  - Ler uma tabela como um conjunto de linhas e colunas
  - Escolher colunas com SELECT e filtrar linhas com WHERE
  - Ordenar e limitar o resultado com ORDER BY e LIMIT
  - Resumir grupos de linhas com GROUP BY, COUNT e SUM
cards:
  - front: "Qual é a ordem em que **escrevemos** uma consulta SQL básica?"
    back: "`SELECT` → `FROM` → `WHERE` → `GROUP BY` → `ORDER BY` → `LIMIT`."
  - front: "Para que serve o `WHERE`?"
    back: "Filtra **linhas** antes de qualquer agrupamento. Fica depois do `FROM`."
  - front: "Como pegar as 3 maiores linhas por uma coluna?"
    back: "`ORDER BY coluna DESC LIMIT 3`."
---

Um banco de dados relacional guarda informação em **tabelas**: cada **linha** é um registro (um município, uma venda, uma pessoa) e cada **coluna** é uma característica (nome, população, estado). A linguagem **SQL** é a forma de fazer perguntas a essas tabelas.

Nesta lição usamos a tabela `municipios`, com **dados fictícios criados só para ensino** (os nomes e números não são reais):

| id | nome | uf | populacao | pib_milhoes |
|----|------|----|-----------|-------------|
| 1 | Vila Azul | SP | 120000 | 3400.5 |
| 2 | Campo Verde | SP | 45000 | 900.0 |
| 3 | Porto Seco | MG | 80000 | 1500.2 |
| ... | ... | ... | ... | ... |

## SELECT e FROM

`SELECT` diz **quais colunas** você quer; `FROM` diz **de qual tabela**.

```sql
SELECT nome, populacao
FROM municipios;
```

O asterisco `*` significa "todas as colunas": `SELECT * FROM municipios;`.

## WHERE: filtrando linhas

`WHERE` guarda só as linhas em que a condição é verdadeira. Textos vão entre aspas simples.

```sql
SELECT nome
FROM municipios
WHERE uf = 'SP' AND populacao > 50000;
```

Você pode combinar condições com `AND` (as duas), `OR` (pelo menos uma) e `NOT`.

## Seu primeiro exercício

```exercise
id: so-sp
lang: sql
quick: true
prompt: |
  Liste o **nome** e a **populacao** dos municípios do estado `'SP'`.
starter: |
  SELECT
  FROM municipios
  WHERE
dataset: |
  CREATE TABLE municipios (id INTEGER PRIMARY KEY, nome TEXT, uf TEXT, populacao INTEGER, pib_milhoes REAL);
  INSERT INTO municipios VALUES
   (1,'Vila Azul','SP',120000,3400.5),
   (2,'Campo Verde','SP',45000,900.0),
   (3,'Porto Seco','MG',80000,1500.2),
   (4,'Serra Alta','MG',30000,410.7),
   (5,'Lagoa Clara','BA',150000,2100.0),
   (6,'Morro Novo','BA',22000,250.3),
   (7,'Rio Manso','SP',300000,9800.9),
   (8,'Pedra Fina','RS',60000,1700.0);
solution: |
  SELECT nome, populacao FROM municipios WHERE uf = 'SP';
hints:
  - "Depois de `SELECT` vêm os nomes das colunas, separados por vírgula."
  - "A condição é `uf = 'SP'`, com aspas simples em volta do texto."
```

<!--full-->

## ORDER BY e LIMIT

`ORDER BY` ordena o resultado (`ASC` crescente, padrão; `DESC` decrescente). `LIMIT n` mantém só as primeiras `n` linhas. Juntos respondem "quais são os maiores?".

```exercise
id: so-top3
lang: sql
prompt: |
  Mostre o **nome** e o **pib_milhoes** dos **3 municípios com maior PIB**, do maior para o menor.
starter: |
  SELECT nome, pib_milhoes
  FROM municipios
dataset: |
  CREATE TABLE municipios (id INTEGER PRIMARY KEY, nome TEXT, uf TEXT, populacao INTEGER, pib_milhoes REAL);
  INSERT INTO municipios VALUES
   (1,'Vila Azul','SP',120000,3400.5),
   (2,'Campo Verde','SP',45000,900.0),
   (3,'Porto Seco','MG',80000,1500.2),
   (4,'Serra Alta','MG',30000,410.7),
   (5,'Lagoa Clara','BA',150000,2100.0),
   (6,'Morro Novo','BA',22000,250.3),
   (7,'Rio Manso','SP',300000,9800.9),
   (8,'Pedra Fina','RS',60000,1700.0);
solution: |
  SELECT nome, pib_milhoes FROM municipios ORDER BY pib_milhoes DESC LIMIT 3;
ordered: true
hints:
  - "Falta ordenar: `ORDER BY pib_milhoes DESC`."
  - "Depois da ordenação, `LIMIT 3` guarda só as três primeiras linhas."
```

## GROUP BY: resumindo grupos

Com `GROUP BY` você junta as linhas que têm o mesmo valor numa coluna e calcula um resumo de cada grupo com **funções de agregação**: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`.

```sql
SELECT uf, COUNT(*) AS n
FROM municipios
GROUP BY uf;
```

`AS` dá um apelido à coluna do resultado. Regra de ouro: toda coluna do `SELECT` que **não** é agregada precisa aparecer no `GROUP BY`.

```exercise
id: so-group
lang: sql
prompt: |
  Para cada estado, mostre `uf`, a quantidade de municípios (apelido `n`) e a população somada (apelido `pop_total`). Ordene por `uf`.
starter: |
  SELECT uf,
  FROM municipios
dataset: |
  CREATE TABLE municipios (id INTEGER PRIMARY KEY, nome TEXT, uf TEXT, populacao INTEGER, pib_milhoes REAL);
  INSERT INTO municipios VALUES
   (1,'Vila Azul','SP',120000,3400.5),
   (2,'Campo Verde','SP',45000,900.0),
   (3,'Porto Seco','MG',80000,1500.2),
   (4,'Serra Alta','MG',30000,410.7),
   (5,'Lagoa Clara','BA',150000,2100.0),
   (6,'Morro Novo','BA',22000,250.3),
   (7,'Rio Manso','SP',300000,9800.9),
   (8,'Pedra Fina','RS',60000,1700.0);
solution: |
  SELECT uf, COUNT(*) AS n, SUM(populacao) AS pop_total FROM municipios GROUP BY uf ORDER BY uf;
ordered: true
hints:
  - "Use `COUNT(*) AS n` e `SUM(populacao) AS pop_total`."
  - "Termine com `GROUP BY uf ORDER BY uf`."
```

## Erros comuns

- Usar aspas duplas em textos: em SQL padrão, texto vai entre aspas **simples**.
- Esquecer que `WHERE` filtra **linhas** e não pode usar o resultado de `SUM`. Para filtrar grupos existe o `HAVING`, que veremos na próxima lição.
