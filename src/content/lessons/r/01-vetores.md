---
id: r-01-vetores
track: r
title: R do zero — vetores e a equação de Fisher
order: 1
seq: 5
minutes: { quick: 20, full: 60 }
objectives:
  - Criar vetores e operar sobre eles de uma vez só
  - Entender a vetorização, a grande ideia do R
  - Calcular juros reais com a equação de Fisher
cards:
  - front: "O que é **vetorização** em R?"
    back: "Uma operação aplicada a um vetor inteiro de uma vez, sem laço: `c(1,2,3) * 2` dá `2 4 6`."
  - front: "Como se cria o vetor 1, 2, 3 em R?"
    back: "`c(1, 2, 3)` ou `1:3`."
---

R foi feito por estatísticos e é muito usado em pesquisa e econometria. A estrutura central é o **vetor**: uma sequência de valores do mesmo tipo.

```r
inflacao <- c(0.04, 0.05, 0.06)   # c() cria um vetor
inflacao * 100                    # 4 5 6
mean(inflacao)                    # média
```

A seta `<-` atribui um valor a um nome. Contas com vetores valem para **todos os elementos de uma vez**: isso é a **vetorização**, e por isso quase nunca precisamos de laços em R.

## A equação de Fisher

Dada a taxa de juros nominal $i$ e a inflação $\pi$ (ambas em decimal), o juro real é

$$
r = \frac{1 + i}{1 + \pi} - 1
$$

(A aproximação $r \approx i - \pi$ vale só para taxas pequenas.)

```exercise
id: r-fisher
lang: r
quick: true
prompt: |
  Os vetores `nominal` e `inflacao` já existem. Crie o vetor `real` com a taxa de juros real de cada ano, pela equação de Fisher exata.
starter: |
  nominal  <- c(0.10, 0.12, 0.08)
  inflacao <- c(0.05, 0.06, 0.08)
  real <- NULL
solution: |
  nominal  <- c(0.10, 0.12, 0.08)
  inflacao <- c(0.05, 0.06, 0.08)
  real <- (1 + nominal) / (1 + inflacao) - 1
tests: |
  check("real tem 3 valores", length(real) == 3, "um valor por ano")
  check("valores corretos", isTRUE(all.equal(real, c(1.10/1.05 - 1, 1.12/1.06 - 1, 0))), "use (1 + nominal) / (1 + inflacao) - 1")
hints:
  - "A conta vale para o vetor inteiro: não precisa de laço."
  - "`real <- (1 + nominal) / (1 + inflacao) - 1`"
```

<!--full-->

## Resumindo um vetor

Funções úteis: `sum`, `mean`, `min`, `max`, `length`, `sd` (desvio padrão), `cumprod` (produto acumulado).

```exercise
id: r-acumulada
lang: r
prompt: |
  Com o vetor `taxas` (decimais), calcule em `acumulada` a taxa acumulada no período: o produto de `(1 + taxas)` menos 1. Dica: `prod()`.
starter: |
  taxas <- c(0.005, 0.003, 0.004)
  acumulada <- NULL
solution: |
  taxas <- c(0.005, 0.003, 0.004)
  acumulada <- prod(1 + taxas) - 1
tests: |
  check("acumulada correta", isTRUE(all.equal(acumulada, 1.005 * 1.003 * 1.004 - 1)), "prod(1 + taxas) - 1")
  check("é um número só", length(acumulada) == 1, "o resultado deve ser um único valor")
hints:
  - "`prod(x)` multiplica todos os elementos de `x`."
```

## Erros comuns

- Usar `=` e `<-` sem entender a diferença: dentro de `c()` ou de chamadas de função, `=` nomeia argumentos; para atribuir prefira `<-`.
- Esquecer que R conta posições a partir do **1**, não do 0.
