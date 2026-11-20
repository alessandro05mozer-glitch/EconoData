---
id: r-02-estatistica-ipca
track: r
title: R para séries — IPCA, acumulado e resumo estatístico
order: 2
seq: 31
minutes: { quick: 25, full: 70 }
objectives:
  - Usar vetores nomeados e indexação lógica para filtrar anos
  - Compor taxas com `cumprod` e `prod`
  - Achar máximos com `which.max` e contar com `sum` sobre lógicos
  - Resumir uma série com `mean`, `median`, `sd` e `summary`
  - Criar uma classificação com `ifelse`
cards:
  - front: "Como achar a posição e o nome do máximo em R?"
    back: "`which.max(x)` devolve a posição; com um vetor nomeado, `names(x)[which.max(x)]` dá o nome."
  - front: "Como contar quantos elementos passam em um teste?"
    back: "`sum(x > 4.5)`: o teste vira `TRUE/FALSE`, e `sum` conta os `TRUE` como 1."
  - front: "Acumulado de taxas em R."
    back: "`prod(1 + taxas) - 1` (taxas em decimais). Para a trajetória, `cumprod(1 + taxas)`."
  - front: "O que faz `ifelse(cond, a, b)`?"
    back: "Aplica a condição **elemento a elemento** e escolhe `a` onde é verdadeira e `b` onde é falsa."
---

R nasceu para a estatística, e as séries são seu terreno natural. Aqui vamos usar o mesmo IPCA anual do IBGE da lição de Python, agora em R, para mostrar como vetores e funções vetorizadas encurtam o código: o que levava um laço em Python vira uma linha.

Ao final, você calcula acumulado, acha picos e resume a série com poucas funções.

## Os dados

```r
anos <- 2015:2025
ipca <- c(10.67, 6.29, 2.95, 3.75, 4.31, 4.52, 10.06, 5.78, 4.62, 4.83, 4.26) / 100
names(ipca) <- anos
```

Os valores estão em **fração** (0,1067 = 10,67%). Com `names()`, cada valor ganha o ano como rótulo, e `ipca["2021"]` devolve o valor de 2021.

## Exercício 1: acumulado do período

```exercise
id: r-ipca-acum
lang: r
quick: true
prompt: |
  O vetor `ipca` (em fração) já existe. Calcule em `acum` a inflação acumulada de 2015 a 2025 em fração: o produto de `(1 + ipca)` menos 1.
starter: |
  ipca <- c(10.67, 6.29, 2.95, 3.75, 4.31, 4.52, 10.06, 5.78, 4.62, 4.83, 4.26) / 100
  acum <- NULL
solution: |
  ipca <- c(10.67, 6.29, 2.95, 3.75, 4.31, 4.52, 10.06, 5.78, 4.62, 4.83, 4.26) / 100
  acum <- prod(1 + ipca) - 1
tests: |
  check("acumulado correto", isTRUE(all.equal(acum, prod(1 + c(10.67, 6.29, 2.95, 3.75, 4.31, 4.52, 10.06, 5.78, 4.62, 4.83, 4.26) / 100) - 1)), "prod(1 + ipca) - 1")
  check("é um número só", length(acum) == 1, "resultado único")
  check("maior que a soma simples", acum > sum(ipca), "compor dá mais que somar")
hints:
  - "`prod(x)` multiplica todos os elementos."
  - "`acum <- prod(1 + ipca) - 1`"
```

## Exercício 2: o ano do pico

```exercise
id: r-ipca-pico
lang: r
quick: true
prompt: |
  O vetor nomeado `ipca` já existe. Guarde em `ano_pico` o **ano** (como texto) em que o IPCA foi máximo, usando `which.max` e `names`.
starter: |
  anos <- 2015:2025
  ipca <- c(10.67, 6.29, 2.95, 3.75, 4.31, 4.52, 10.06, 5.78, 4.62, 4.83, 4.26) / 100
  names(ipca) <- anos
  ano_pico <- NULL
solution: |
  anos <- 2015:2025
  ipca <- c(10.67, 6.29, 2.95, 3.75, 4.31, 4.52, 10.06, 5.78, 4.62, 4.83, 4.26) / 100
  names(ipca) <- anos
  ano_pico <- names(ipca)[which.max(ipca)]
tests: |
  check("o pico foi em 2015", identical(unname(ano_pico), "2015"), "10,67% é o maior")
hints:
  - "`which.max(ipca)` devolve a posição do maior valor."
  - "`names(ipca)[which.max(ipca)]`"
```

## Exercício 3: contar anos acima do teto

```exercise
id: r-ipca-teto
lang: r
prompt: |
  O vetor `ipca` já existe (em fração). Guarde em `acima` quantos anos tiveram IPCA **maior que 4,5%** (isto é, `0.045`).
starter: |
  ipca <- c(10.67, 6.29, 2.95, 3.75, 4.31, 4.52, 10.06, 5.78, 4.62, 4.83, 4.26) / 100
  acima <- NULL
solution: |
  ipca <- c(10.67, 6.29, 2.95, 3.75, 4.31, 4.52, 10.06, 5.78, 4.62, 4.83, 4.26) / 100
  acima <- sum(ipca > 0.045)
tests: |
  check("contagem correta", acima == 7, "2015, 2016, 2020, 2021, 2022, 2023 e 2024")
hints:
  - "`ipca > 0.045` gera um vetor de `TRUE`/`FALSE`; `sum` conta os `TRUE`."
```

<!--full-->

## Resumindo a série

```r
mean(ipca)      # média
median(ipca)    # mediana
sd(ipca)        # desvio-padrão (amostral, divide por n-1)
summary(ipca)   # mínimo, quartis, média, máximo
```

Note que `sd()` em R usa $n-1$ (desvio **amostral**), diferente do desvio populacional da lição de Python, que dividia por $n$.

## Exercício 4: classificar com ifelse

```exercise
id: r-ipca-faixa
lang: r
prompt: |
  O vetor `ipca` já existe. Crie `faixa`, um vetor de texto com `"acima"` onde o IPCA for maior que `0.045` e `"dentro"` caso contrário, usando `ifelse`.
starter: |
  ipca <- c(10.67, 6.29, 2.95, 3.75, 4.31, 4.52, 10.06, 5.78, 4.62, 4.83, 4.26) / 100
  faixa <- NULL
solution: |
  ipca <- c(10.67, 6.29, 2.95, 3.75, 4.31, 4.52, 10.06, 5.78, 4.62, 4.83, 4.26) / 100
  faixa <- ifelse(ipca > 0.045, "acima", "dentro")
tests: |
  check("tamanho igual ao de ipca", length(faixa) == length(ipca), "um valor por ano")
  check("valores corretos", identical(as.vector(faixa), c("acima","acima","dentro","dentro","dentro","acima","acima","acima","acima","acima","dentro")), "compare cada ano com 0.045")
hints:
  - "`ifelse(condicao, valor_se_verdadeiro, valor_se_falso)`."
```

## Erros que custam pontos

- Misturar porcentagem e fração (`4.5` contra `0.045`).
- Usar `sd` achando que divide por $n$.
- Esquecer que `names(x)[which.max(x)]` só funciona se `x` tem nomes.
- Usar `if` (escalar) quando precisa de `ifelse` (vetorizado).

## Como estudar este tema

Reescreva em R o exercício de Python que calcula o acumulado e confira o resultado. Depois, use `summary(ipca)` e compare a média com a mediana: qual dos dois sofre mais com os picos de 2015 e 2021?
