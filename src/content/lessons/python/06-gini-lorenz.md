---
id: python-06-gini-lorenz
track: python
title: Python aplicado — Lorenz e Gini a partir de rendas
order: 6
seq: 28
minutes: { quick: 30, full: 75 }
objectives:
  - Ordenar rendas e acumular participações para construir a curva de Lorenz
  - Calcular o Gini por duas fórmulas e conferir que coincidem
  - Calcular a participação do topo e a razão de Palma de uma lista de rendas
  - Testar uma função com casos em que se conhece a resposta
cards:
  - front: "Gini pela diferença média entre pares."
    back: "$G = \\dfrac{\\sum_i\\sum_j |y_i - y_j|}{2 n^2 \\bar y}$. Dá 0 se todos ganham igual."
  - front: "Como montar os pontos da curva de Lorenz?"
    back: "Ordene as rendas, acumule com `itertools.accumulate` (ou um laço) e divida pelo total. Acrescente o ponto $(0,0)$."
  - front: "Razão de Palma."
    back: "Renda dos 10% mais ricos dividida pela dos 40% mais pobres."
---

Na lição de desigualdade, você leu o Gini a partir de uma curva. Aqui vamos **calculá-lo** a partir de uma lista de rendas, que é o que se faz com dados de pesquisa domiciliar. Quatro funções pequenas e testáveis bastam.

Ao final, você calcula Gini, participação do topo e razão de Palma de qualquer lista de rendas.

## Da lista de rendas à curva de Lorenz

Ordene da menor para a maior renda e vá acumulando. Dividindo pelo total, você tem a fração da renda detida pelos $k$ mais pobres.

```python
rendas = [1, 1, 2, 3, 3]
s = sorted(rendas)       # [1, 1, 2, 3, 3]
total = sum(s)           # 10
acum = 0
lorenz = [0.0]
for r in s:
    acum += r
    lorenz.append(acum / total)
# lorenz = [0.0, 0.1, 0.2, 0.4, 0.7, 1.0]
```

## Exercício 1: curva de Lorenz

```exercise
id: py-lorenz
lang: python
quick: true
prompt: |
  Escreva `lorenz(rendas)`: devolve a lista de pontos da curva de Lorenz (frações acumuladas da renda), **começando em 0.0** e terminando em 1.0, com `len(rendas) + 1` elementos.

  Exemplo: `lorenz([1, 1, 2, 3, 3])` deve dar `[0.0, 0.1, 0.2, 0.4, 0.7, 1.0]`.
starter: |
  def lorenz(rendas):
      return [0.0]
solution: |
  def lorenz(rendas):
      s = sorted(rendas)
      total = sum(s)
      acum = 0
      out = [0.0]
      for r in s:
          acum += r
          out.append(acum / total)
      return out
tests: |
  r = lorenz([1, 1, 2, 3, 3])
  check("tamanho n+1", len(r) == 6, "inclui o ponto 0")
  check("valores do exemplo", all(abs(a - b) < 1e-9 for a, b in zip(r, [0.0, 0.1, 0.2, 0.4, 0.7, 1.0])), "acumule e divida pelo total")
  r = lorenz([5, 1])
  check("ordena antes de acumular", abs(r[1] - 1 / 6) < 1e-9, "o mais pobre vem primeiro")
hints:
  - "Ordene com `sorted(rendas)` antes de acumular."
  - "Em cada passo, some a renda ao acumulado e acrescente `acum / total`."
```

## Exercício 2: Gini pela diferença média

```exercise
id: py-gini
lang: python
quick: true
prompt: |
  Escreva `gini(rendas)`: devolve o Gini pela fórmula $\sum_i\sum_j |y_i-y_j| / (2 n^2 \bar y)$.

  Exemplos: `gini([10, 10, 10])` dá `0.0` e `gini([0, 0, 0, 100])` dá `0.75`.
starter: |
  def gini(rendas):
      return 0.0
solution: |
  def gini(rendas):
      n = len(rendas)
      media = sum(rendas) / n
      soma = sum(abs(a - b) for a in rendas for b in rendas)
      return soma / (2 * n * n * media)
tests: |
  check("igualdade perfeita", abs(gini([10, 10, 10])) < 1e-12, "todos iguais")
  check("um só com tudo entre quatro", abs(gini([0, 0, 0, 100]) - 0.75) < 1e-9, "(n − 1)/n")
  check("exemplo da lista 1,1,2,3,3", abs(gini([1, 1, 2, 3, 3]) - 0.24) < 1e-9, "soma dos pares / (2 n² média)")
hints:
  - "A soma dupla é `sum(abs(a - b) for a in rendas for b in rendas)`."
  - "Divida por `2 * n * n * media`."
```

## Exercício 3: participação do topo

```exercise
id: py-topo
lang: python
prompt: |
  Escreva `participacao_topo(rendas, fracao)`: devolve a fração da renda total recebida pelos `fracao` mais ricos (por exemplo `0.2` para os 20% mais ricos). Considere `round(fracao * n)` indivíduos, `n = len(rendas)`.

  Exemplo: `participacao_topo([1, 1, 2, 3, 3], 0.4)` deve dar `0.6`.
starter: |
  def participacao_topo(rendas, fracao):
      return 0.0
solution: |
  def participacao_topo(rendas, fracao):
      s = sorted(rendas)
      k = round(fracao * len(s))
      return sum(s[len(s) - k:]) / sum(s)
tests: |
  check("exemplo dos 40% mais ricos", abs(participacao_topo([1, 1, 2, 3, 3], 0.4) - 0.6) < 1e-9, "3 + 3 = 6 de 10")
  check("todos", abs(participacao_topo([1, 2, 3], 1.0) - 1.0) < 1e-9, "100% da população recebe 100%")
  check("o mais rico entre quatro", abs(participacao_topo([1, 1, 1, 7], 0.25) - 0.7) < 1e-9, "7 de 10")
hints:
  - "Ordene e some os `k` últimos: `s[len(s) - k:]`."
  - "Atenção ao caso `k = 0`: `s[len(s):]` é uma lista vazia, que dá soma 0."
```

<!--full-->

## Exercício 4: razão de Palma

```exercise
id: py-palma
lang: python
prompt: |
  Escreva `palma(rendas)`: devolve a renda total dos **10% mais ricos** dividida pela dos **40% mais pobres**. Use `k10 = round(0.1 * n)` e `k40 = round(0.4 * n)` indivíduos.

  Exemplo: com 10 rendas `[1, 1, 1, 1, 2, 2, 3, 4, 5, 10]`, o resultado é `10 / 4 = 2.5`.
starter: |
  def palma(rendas):
      return 0.0
solution: |
  def palma(rendas):
      s = sorted(rendas)
      n = len(s)
      k10 = round(0.1 * n)
      k40 = round(0.4 * n)
      return sum(s[n - k10:]) / sum(s[:k40])
tests: |
  check("exemplo com dez rendas", abs(palma([1, 1, 1, 1, 2, 2, 3, 4, 5, 10]) - 2.5) < 1e-9, "topo 10; base 1+1+1+1")
  check("igualdade perfeita", abs(palma([5] * 10) - 0.25) < 1e-9, "10% / 40% da renda = 1/4")
hints:
  - "Os 40% mais pobres são os `k40` primeiros da lista ordenada: `s[:k40]`."
  - "Os 10% mais ricos são os `k10` últimos: `s[n - k10:]`."
```

## Conferindo com a curva

Para qualquer lista, o Gini também é $1 - 2B$, com $B$ a área sob a curva de Lorenz, que você pode calcular com a regra dos trapézios sobre os pontos devolvidos por `lorenz`. Se as duas fórmulas coincidem (e coincidem, a menos de erro de arredondamento), você tem um **teste cruzado**: duas rotas independentes para o mesmo número. É uma boa prática sempre que possível.

## Erros que custam pontos

- Esquecer de **ordenar** antes de acumular.
- Dividir pelo $n$ errado (a fórmula usa $n^2$).
- Tratar `fracao * n` sem arredondar (índice não inteiro).
- Rendas todas zero: a divisão pela média quebra. Em dados reais, trate esse caso.

## Como estudar este tema

Teste cada função com listas em que você sabe a resposta de cabeça (todos iguais; um com tudo). Depois use o simulador de Lorenz para ver como mudam o Gini e a participação dos 10% mais ricos quando a curva se afasta da diagonal.
