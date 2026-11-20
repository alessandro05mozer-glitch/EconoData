---
id: sql-02-join-having
track: sql
title: JOIN, HAVING e subconsultas — juntando tabelas
order: 2
seq: 17
minutes: { quick: 30, full: 85 }
objectives:
  - Explicar por que dados são divididos em várias tabelas e o que é uma chave
  - Juntar tabelas com JOIN e ON, usando apelidos
  - Distinguir INNER JOIN de LEFT JOIN e achar registros sem correspondência
  - Filtrar grupos com HAVING e linhas com WHERE
  - Usar uma subconsulta para comparar com um valor calculado
cards:
  - front: "Qual a diferença entre `WHERE` e `HAVING`?"
    back: "`WHERE` filtra **linhas** antes de agrupar. `HAVING` filtra **grupos** depois do `GROUP BY`, e pode usar funções de agregação como `SUM(...)`."
  - front: "O que `LEFT JOIN` devolve que o `JOIN` comum não devolve?"
    back: "Todas as linhas da tabela da **esquerda**, mesmo sem correspondência na da direita; as colunas da direita vêm como `NULL`."
  - front: "Em que ordem o SQL **executa** uma consulta?"
    back: "`FROM`/`JOIN` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY` → `LIMIT`. Por isso um apelido criado no `SELECT` não vale no `WHERE`."
  - front: "Como testar se um valor é nulo em SQL?"
    back: "`coluna IS NULL` (ou `IS NOT NULL`). `coluna = NULL` nunca é verdadeiro."
---

Na lição anterior você consultou **uma** tabela. Na vida real, os dados ficam em várias: uma tabela de municípios, outra de estados, outra de empregos. Separar evita repetir informação (a região de São Paulo não precisa ser escrita em cada município) e evita inconsistência. O preço é que, para responder a maioria das perguntas, você precisa **juntar** as tabelas. Essa é a operação central do SQL, e a que mais aparece em entrevistas de análise de dados.

Ao final, você junta tabelas, agrega por grupos e filtra grupos, e acha o que **não** tem correspondência. Os dados são fictícios, criados só para o ensino.

## Duas tabelas ligadas por uma chave

Usaremos `municipios` (já conhecida) e `ufs`, que diz a região de cada estado:

| uf | regiao |
|----|--------|
| SP | Sudeste |
| MG | Sudeste |
| BA | Nordeste |
| RS | Sul |
| PE | Nordeste |

A coluna `uf` aparece nas duas. Ela é a **chave**: em `ufs`, cada `uf` é único (chave primária); em `municipios`, `uf` aponta para essa tabela (chave estrangeira). Juntar é emparelhar as linhas que têm a mesma chave.

## JOIN

```sql
SELECT m.nome, u.regiao
FROM municipios AS m
JOIN ufs AS u ON u.uf = m.uf;
```

Leia assim: "para cada município, ache a linha de `ufs` com a mesma `uf` e traga a região". As letras `m` e `u` são **apelidos** das tabelas; elas encurtam o texto e dizem de qual tabela vem cada coluna. O `ON` diz **como** casar as linhas.

:::atencao Esquecer o ON
Sem a condição `ON`, o banco faz o **produto cartesiano**: cada linha de uma tabela com todas as da outra. Com 8 municípios e 5 estados, são 40 linhas sem sentido. Se o resultado de um JOIN vier com um número absurdo de linhas, procure um `ON` faltando ou errado.
:::

```exercise
id: so-join
lang: sql
quick: true
prompt: |
  Mostre o **nome** de cada município e a **regiao** do seu estado, ordenado por nome.
starter: |
  SELECT m.nome, u.regiao
  FROM municipios AS m
  JOIN ufs AS u
dataset: |
  CREATE TABLE ufs (uf TEXT PRIMARY KEY, regiao TEXT);
  INSERT INTO ufs VALUES ('SP','Sudeste'),('MG','Sudeste'),('BA','Nordeste'),('RS','Sul'),('PE','Nordeste');
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
  SELECT m.nome, u.regiao FROM municipios AS m JOIN ufs AS u ON u.uf = m.uf ORDER BY m.nome;
ordered: true
hints:
  - "Falta dizer como casar as linhas: `ON u.uf = m.uf`."
  - "Termine com `ORDER BY m.nome`."
```

## WHERE e HAVING: linhas e grupos

Ao agrupar, há duas oportunidades de filtrar:

- `WHERE` filtra as **linhas** antes de agrupar (por exemplo, só municípios com mais de 20 mil habitantes).
- `HAVING` filtra os **grupos** depois de agrupar (por exemplo, só regiões cuja população total passa de 100 mil).

A ordem de execução explica por quê: o banco monta as linhas (`FROM`, `JOIN`), filtra (`WHERE`), agrupa (`GROUP BY`), filtra grupos (`HAVING`) e só então calcula o `SELECT`. Por isso `WHERE SUM(populacao) > 100000` é erro: no `WHERE`, a soma ainda não existe.

```exercise
id: so-having
lang: sql
quick: true
prompt: |
  Para cada **regiao**, mostre a população total (apelido `pop_total`), mantendo só as regiões com mais de 100000 habitantes. Ordene por `regiao`.
starter: |
  SELECT u.regiao, SUM(m.populacao) AS pop_total
  FROM municipios AS m
  JOIN ufs AS u ON u.uf = m.uf
  GROUP BY u.regiao
dataset: |
  CREATE TABLE ufs (uf TEXT PRIMARY KEY, regiao TEXT);
  INSERT INTO ufs VALUES ('SP','Sudeste'),('MG','Sudeste'),('BA','Nordeste'),('RS','Sul'),('PE','Nordeste');
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
  SELECT u.regiao, SUM(m.populacao) AS pop_total FROM municipios AS m JOIN ufs AS u ON u.uf = m.uf GROUP BY u.regiao HAVING SUM(m.populacao) > 100000 ORDER BY u.regiao;
ordered: true
hints:
  - "Depois do `GROUP BY`, use `HAVING SUM(m.populacao) > 100000`."
  - "No fim, `ORDER BY u.regiao`."
```

<!--full-->

## INNER JOIN e LEFT JOIN

O `JOIN` comum (que é um `INNER JOIN`) só devolve linhas com correspondência nas **duas** tabelas. Pernambuco (`PE`) está em `ufs`, mas não tem nenhum município cadastrado, então **não aparece** num `JOIN` que parta dos municípios.

O `LEFT JOIN` guarda **todas as linhas da tabela da esquerda** (a que vem depois do `FROM`) e preenche com `NULL` as colunas da direita quando não há correspondência. Isso permite achar o que está **faltando**.

```sql
SELECT u.uf, m.nome
FROM ufs AS u
LEFT JOIN municipios AS m ON m.uf = u.uf;
```

Em `PE`, a coluna `nome` vem `NULL`. Para listar só os estados sem município, filtre `WHERE m.id IS NULL`.

:::atencao NULL não se compara com =
`m.id = NULL` **nunca** é verdadeiro, mesmo quando `m.id` é nulo. Use sempre `IS NULL` ou `IS NOT NULL`.
:::

```exercise
id: so-left
lang: sql
prompt: |
  Liste a `uf` dos estados da tabela `ufs` que **não** têm nenhum município cadastrado.
starter: |
  SELECT u.uf
  FROM ufs AS u
  LEFT JOIN municipios AS m ON m.uf = u.uf
dataset: |
  CREATE TABLE ufs (uf TEXT PRIMARY KEY, regiao TEXT);
  INSERT INTO ufs VALUES ('SP','Sudeste'),('MG','Sudeste'),('BA','Nordeste'),('RS','Sul'),('PE','Nordeste');
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
  SELECT u.uf FROM ufs AS u LEFT JOIN municipios AS m ON m.uf = u.uf WHERE m.id IS NULL;
hints:
  - "Os estados sem município são os que ficam com a chave do município nula depois do `LEFT JOIN`."
  - "Acrescente `WHERE m.id IS NULL`."
```

## Subconsultas

Às vezes você precisa comparar cada linha com **um valor calculado** da própria tabela, como a média. Uma **subconsulta** é um `SELECT` dentro de parênteses que devolve esse valor:

```sql
SELECT nome
FROM municipios
WHERE populacao > (SELECT AVG(populacao) FROM municipios);
```

A subconsulta roda primeiro e devolve um número (aqui, a população média). A consulta externa usa esse número como se você o tivesse digitado.

```exercise
id: so-sub
lang: sql
prompt: |
  Liste o **nome** dos municípios com população **acima da média**, em ordem alfabética.
starter: |
  SELECT nome
  FROM municipios
dataset: |
  CREATE TABLE ufs (uf TEXT PRIMARY KEY, regiao TEXT);
  INSERT INTO ufs VALUES ('SP','Sudeste'),('MG','Sudeste'),('BA','Nordeste'),('RS','Sul'),('PE','Nordeste');
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
  SELECT nome FROM municipios WHERE populacao > (SELECT AVG(populacao) FROM municipios) ORDER BY nome;
ordered: true
hints:
  - "A média é `(SELECT AVG(populacao) FROM municipios)`."
  - "Compare: `WHERE populacao > (...)` e ordene por `nome`."
```

## Erros comuns

- Esquecer o `ON` (produto cartesiano) ou casar as colunas erradas.
- Escrever `uf` sem o apelido da tabela quando as duas têm uma coluna com esse nome: o banco reclama de **coluna ambígua**. Use `m.uf` ou `u.uf`.
- Usar `WHERE` com uma função de agregação. Para isso existe o `HAVING`.
- Esquecer que um `JOIN` comum **descarta** linhas sem correspondência, o que muda as contagens.
- Contar linhas depois de um JOIN sem notar que um registro pode ter se **duplicado** quando a tabela da direita tem várias linhas por chave.

## Como praticar

Pegue qualquer pergunta de negócio ("qual a população por região?", "quais estados não têm dados?") e escreva primeiro a **tabela de resposta** que você gostaria de ver, com as colunas. Depois ache de quais tabelas vêm as colunas, como elas se ligam (as chaves) e só então escreva o SQL. O erro mais comum em quem está começando é escrever o código antes de saber qual é a tabela final.
