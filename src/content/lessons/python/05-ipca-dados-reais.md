---
id: python-05-ipca-dados-reais
track: python
title: Python com dados reais — 30 anos de IPCA
order: 5
seq: 27
minutes: { quick: 30, full: 80 }
objectives:
  - Representar uma série anual real (IPCA, IBGE) como duas listas alinhadas
  - Compor taxas anuais em inflação acumulada e em poder de compra
  - Encontrar máximos, mínimos e anos que violam uma regra, com `max`, `min` e compreensões
  - Calcular o juro real de cada ano com a equação de Fisher exata
  - Resumir uma série com média, mediana e desvio-padrão sem bibliotecas
cards:
  - front: "Como achar o **ano** do valor máximo em duas listas alinhadas?"
    back: "```python\ni = taxas.index(max(taxas))\nanos[i]\n```\n`index` devolve a posição do primeiro elemento igual ao máximo."
  - front: "Como compor uma lista de taxas em % para o acumulado?"
    back: "```python\nf = 1\nfor t in taxas:\n    f *= 1 + t/100\nacum = (f - 1) * 100\n```"
  - front: "Como contar quantos elementos passam em um teste?"
    back: "`sum(1 for t in taxas if t > 4.5)` ou `len([t for t in taxas if t > 4.5])`."
  - front: "Mediana de uma lista, sem biblioteca."
    back: "Ordene com `sorted` e pegue o meio; se o tamanho é par, a média dos dois do meio."
---

Até aqui, as séries das lições eram pequenas e inventadas. Agora, uma série **real**: o IPCA anual do IBGE, de 1995 a 2025, a inflação oficial brasileira. Trinta e um números que contam três décadas de história econômica. Você vai calcular a inflação acumulada, achar os picos e medir a dispersão, tudo sem bibliotecas, só com listas e laços.

Ao final, você tem um pequeno kit de funções de análise de séries que serve para qualquer indicador.

## Os dados

Os valores abaixo são a variação do IPCA em cada ano, em %. Fonte: IBGE.

```python
anos = list(range(1995, 2026))
ipca = [22.41, 9.56, 5.22, 1.66, 8.94, 5.97, 7.67, 12.53, 9.30, 7.60, 5.69,
        3.14, 4.46, 5.90, 4.31, 5.91, 6.50, 5.84, 5.91, 6.41, 10.67, 6.29,
        2.95, 3.75, 4.31, 4.52, 10.06, 5.78, 4.62, 4.83, 4.26]
```

As duas listas têm o mesmo tamanho: `anos[i]` é o ano da taxa `ipca[i]`. Esse padrão de **listas alinhadas** é a base de séries sem biblioteca.

:::atencao Taxas em %, não em fração
Aqui as taxas vêm em **porcentagem** (22.41 significa 22,41%). Para compor, transforme em fator: `1 + t / 100`. Misturar % e fração é o erro mais comum.
:::

## Exercício 1: inflação acumulada

```exercise
id: py-ipca-acum
lang: python
quick: true
prompt: |
  Escreva `acumulada(taxas)`: recebe uma lista de taxas anuais em **%** e devolve a inflação acumulada do período, também em **%**, compondo as taxas.

  Exemplo: `acumulada([10, 10])` deve dar cerca de `21.0`.
starter: |
  def acumulada(taxas):
      pass
solution: |
  def acumulada(taxas):
      f = 1
      for t in taxas:
          f *= 1 + t / 100
      return (f - 1) * 100
tests: |
  check("dois anos de 10% dão 21%", abs(acumulada([10, 10]) - 21.0) < 1e-9, "1,1 × 1,1 − 1")
  check("lista vazia dá zero", abs(acumulada([])) < 1e-12, "nenhum ano, nenhuma inflação")
  check("2023 e 2024 do IPCA", abs(acumulada([4.62, 4.83]) - ((1.0462 * 1.0483 - 1) * 100)) < 1e-9, "compõe os fatores")
hints:
  - "Comece com `f = 1` e multiplique por `1 + t / 100` para cada taxa."
  - "No fim, devolva `(f - 1) * 100`."
```

## Exercício 2: o ano do pico

```exercise
id: py-ipca-pico
lang: python
quick: true
prompt: |
  Escreva `ano_do_maximo(anos, taxas)`: devolve o **ano** em que a taxa foi máxima.

  Exemplo: `ano_do_maximo([2001, 2002, 2003], [7.67, 12.53, 9.30])` deve dar `2002`.
starter: |
  def ano_do_maximo(anos, taxas):
      pass
solution: |
  def ano_do_maximo(anos, taxas):
      return anos[taxas.index(max(taxas))]
tests: |
  check("exemplo 2001–2003", ano_do_maximo([2001, 2002, 2003], [7.67, 12.53, 9.30]) == 2002, "12,53 é o maior")
  check("pico é o primeiro elemento", ano_do_maximo([1995, 1996], [22.41, 9.56]) == 1995, "22,41 é o maior")
  check("um só elemento", ano_do_maximo([2000], [5.97]) == 2000, "só há um")
hints:
  - "`max(taxas)` dá o maior valor; `taxas.index(valor)` dá a posição dele."
  - "`anos[posicao]` devolve o ano correspondente."
```

## Exercício 3: anos acima do teto

A meta de inflação tem um teto de tolerância. Desde 2025, a meta é de 3% com tolerância de 1,5 ponto para cima, ou seja, **4,5%**.

```exercise
id: py-ipca-teto
lang: python
prompt: |
  Escreva `anos_acima(anos, taxas, teto)`: devolve a **lista de anos** em que a taxa foi **estritamente maior** que `teto`, na ordem original.

  Exemplo: `anos_acima([2001, 2002, 2003], [7.67, 12.53, 4.0], 5)` deve dar `[2001, 2002]`.
starter: |
  def anos_acima(anos, taxas, teto):
      return []
solution: |
  def anos_acima(anos, taxas, teto):
      return [a for a, t in zip(anos, taxas) if t > teto]
tests: |
  check("exemplo curto", anos_acima([2001, 2002, 2003], [7.67, 12.53, 4.0], 5) == [2001, 2002], "só os que passam de 5")
  check("estritamente maior", anos_acima([1, 2], [4.5, 4.51], 4.5) == [2], "4,5 não é maior que 4,5")
  check("nenhum passa", anos_acima([1, 2], [1.0, 2.0], 10) == [], "lista vazia")
hints:
  - "Percorra `zip(anos, taxas)` e filtre com `if t > teto`."
  - "`[a for a, t in zip(anos, taxas) if t > teto]`"
```

<!--full-->

## Exercício 4: juro real ano a ano

Com o juro nominal e a inflação de cada ano, a equação de Fisher exata dá o juro real.

```exercise
id: py-ipca-real
lang: python
prompt: |
  Escreva `juros_reais(nominais, inflacoes)`: recebe duas listas de taxas em **%** (mesmo tamanho) e devolve a lista dos juros reais em **%**, pela equação exata $(1+i)/(1+\pi)-1$.

  Exemplo: `juros_reais([15], [5])` deve dar cerca de `[9.5238]`.
starter: |
  def juros_reais(nominais, inflacoes):
      return [i - p for i, p in zip(nominais, inflacoes)]
solution: |
  def juros_reais(nominais, inflacoes):
      return [((1 + i / 100) / (1 + p / 100) - 1) * 100 for i, p in zip(nominais, inflacoes)]
tests: |
  r = juros_reais([15], [5])
  check("15% nominal e 5% de inflação", len(r) == 1 and abs(r[0] - 9.523809523809524) < 1e-9, "1,15 / 1,05 − 1")
  r = juros_reais([10, 20], [10, 25])
  check("inflação igual ao juro dá zero e inflação maior dá negativo", abs(r[0]) < 1e-9 and r[1] < 0, "juro real negativo")
hints:
  - "A subtração `i - p` é só a aproximação. Use os fatores `1 + i / 100`."
  - "`((1 + i / 100) / (1 + p / 100) - 1) * 100`"
```

## Exercício 5: média, mediana e desvio-padrão

```exercise
id: py-ipca-resumo
lang: python
prompt: |
  Escreva `resumo(xs)`: devolve uma tupla `(media, mediana, desvio)` de uma lista de números. Use o desvio-padrão **populacional** (divide por $n$).

  Exemplo: `resumo([1, 2, 3, 4, 10])` deve dar `(4.0, 3, 3.1622776601683795)`.
starter: |
  def resumo(xs):
      return (0, 0, 0)
solution: |
  def resumo(xs):
      n = len(xs)
      media = sum(xs) / n
      s = sorted(xs)
      mediana = s[n // 2] if n % 2 else (s[n // 2 - 1] + s[n // 2]) / 2
      var = sum((x - media) ** 2 for x in xs) / n
      return (media, mediana, var ** 0.5)
tests: |
  m, md, d = resumo([1, 2, 3, 4, 10])
  check("média 4", abs(m - 4.0) < 1e-9, "(1+2+3+4+10)/5")
  check("mediana 3", abs(md - 3) < 1e-9, "valor do meio da lista ordenada")
  check("desvio populacional", abs(d - 3.1622776601683795) < 1e-9, "raiz da média dos quadrados dos desvios")
  m, md, d = resumo([2, 4])
  check("mediana de tamanho par", abs(md - 3) < 1e-9, "média dos dois do meio")
hints:
  - "Mediana: ordene com `sorted`; se `n` é par, tire a média dos dois do meio."
  - "Variância populacional: `sum((x - media) ** 2 for x in xs) / n`; o desvio é a raiz, `** 0.5`."
```

## O que ler nos resultados

Aplique as funções à série completa. Com as três funções acima você consegue ver, por exemplo, que o IPCA de 1995 foi o maior da série, que a maior parte dos anos recentes ficou entre 3% e 7%, e que a mediana é bem menor que a inflação do primeiro ano, porque o primeiro ano é um **valor extremo**. Reflita: a média e a mediana contam a mesma história?

## Erros que custam pontos

- Misturar porcentagem e fração na mesma conta.
- Somar taxas em vez de compor os fatores.
- Esquecer que a lista de anos e a de taxas precisam ter o **mesmo tamanho** e a mesma ordem.
- Usar `max(taxas)` quando a pergunta é o **ano** do máximo.

## Como estudar este tema

Rode as suas funções na série completa e confira os números com o simulador de IPCA da lição de macroeconomia: o acumulado de 1995 a 2025 deve bater. Mude o `teto` e veja quantos anos passam em cada limite.
