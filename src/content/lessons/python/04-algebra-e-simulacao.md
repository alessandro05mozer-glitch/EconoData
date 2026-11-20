---
id: python-04-algebra-e-simulacao
track: python
title: Python aplicado — álgebra linear, contagem e simulação
order: 4
seq: 16
minutes: { quick: 30, full: 85 }
objectives:
  - Resolver um sistema 2×2 com uma função e tratar o caso sem solução com `raise`
  - Contar casos por enumeração e conferir uma probabilidade calculada no papel
  - Simular um experimento aleatório (Monte Carlo) e ver a lei dos grandes números
  - Comparar contagem exata, fórmula e simulação
cards:
  - front: "Como uma função sinaliza um erro, por exemplo determinante zero?"
    back: "`raise ValueError(\"mensagem\")`. Quem chama pode tratar com `try: ... except ValueError: ...`."
  - front: "Como simular uma probabilidade por Monte Carlo?"
    back: "Repita o experimento $n$ vezes com `random`, conte quantas vezes o evento ocorreu e divida por $n$. O erro cai com $\\sqrt{n}$."
  - front: "Como calcular $\\binom{n}{k}$ em Python?"
    back: "`import math` e `math.comb(n, k)`."
---

Três ideias das lições de Matemática e de Estatística viram código aqui: **resolver sistemas lineares**, **contar casos** e **simular**. O fio condutor é uma ideia valiosa na prática econômica: quando você calcula uma coisa de duas maneiras diferentes (por fórmula e por simulação) e elas concordam, você ganha confiança no resultado.

## Álgebra linear: a regra de Cramer

Na lição de matrizes, a solução de $ax+by=e$, $cx+dy=f$ é

$$
x=\frac{ed-bf}{ad-bc},\qquad y=\frac{af-ec}{ad-bc}.
$$

Quando o determinante $ad-bc$ é zero, não há solução única. Uma função boa **avisa** isso em vez de devolver lixo ou dar erro de divisão por zero sem explicação. Em Python, avisa-se com `raise`:

```python
if det == 0:
    raise ValueError("sem solução única")
```

```exercise
id: py-cramer
lang: python
quick: true
prompt: |
  Escreva `resolve_2x2(a, b, c, d, e, f)` que resolve o sistema $ax+by=e$, $cx+dy=f$ pela regra de Cramer e devolve a tupla `(x, y)`.

  Se o determinante for zero, levante `ValueError("sem solução única")`.
starter: |
  def resolve_2x2(a, b, c, d, e, f):
      det = a * d - b * c
      # trate det == 0 e calcule x e y
      pass
solution: |
  def resolve_2x2(a, b, c, d, e, f):
      det = a * d - b * c
      if det == 0:
          raise ValueError("sem solução única")
      x = (e * d - b * f) / det
      y = (a * f - e * c) / det
      return (x, y)
tests: |
  x, y = resolve_2x2(4, 1, 2, 3, 9, 7)
  check("4x+y=9 e 2x+3y=7 dá (2, 1)", abs(x - 2) < 1e-9 and abs(y - 1) < 1e-9, "confira as fórmulas de Cramer")
  x, y = resolve_2x2(2, 1, 1, 3, 7, 9)
  check("2x+y=7 e x+3y=9 dá (2,4; 2,2)", abs(x - 2.4) < 1e-9 and abs(y - 2.2) < 1e-9, "o resultado nem sempre é inteiro")
  try:
      resolve_2x2(1, 2, 2, 4, 3, 6)
      levantou = False
  except ValueError:
      levantou = True
  check("determinante zero levanta ValueError", levantou, "linhas proporcionais: use raise ValueError(...)")
hints:
  - "$x = (e d - b f)/\\det$ e $y = (a f - e c)/\\det$."
  - "Antes de dividir, `if det == 0: raise ValueError(\"sem solução única\")`."
```

Use essa função para resolver o exemplo dos dois mercados interligados da lição de matrizes: `resolve_2x2(5, -1, -1, 5, 50, 30)` deve dar $P_1=35/3\approx 11{,}67$ e $P_2=25/3\approx 8{,}33$.

## Contar por enumeração

Na lição de Probabilidade, a chance de a soma de dois dados ser 7 saiu de $6/36$. Um computador pode **listar** os 36 pares e contar. É tosco, mas é um excelente teste da sua conta no papel.

```exercise
id: py-dados
lang: python
quick: true
prompt: |
  Escreva `prob_soma(s)`: a probabilidade de a **soma de dois dados honestos** ser igual a `s`. Percorra todos os 36 pares com dois `for` e conte os favoráveis.
starter: |
  def prob_soma(s):
      favoraveis = 0
      for d1 in range(1, 7):
          pass  # percorra d2 também e conte quando d1 + d2 == s
      return favoraveis / 36
solution: |
  def prob_soma(s):
      favoraveis = 0
      for d1 in range(1, 7):
          for d2 in range(1, 7):
              if d1 + d2 == s:
                  favoraveis += 1
      return favoraveis / 36
tests: |
  check("soma 7 tem prob. 1/6", abs(prob_soma(7) - 1/6) < 1e-12, "6 pares em 36")
  check("soma 2 tem prob. 1/36", abs(prob_soma(2) - 1/36) < 1e-12, "só (1,1)")
  check("soma 13 é impossível", prob_soma(13) == 0, "probabilidade zero")
  check("todas as somas de 2 a 12 somam 1", abs(sum(prob_soma(s) for s in range(2, 13)) - 1) < 1e-12, "axioma: P(Ω) = 1")
hints:
  - "Dentro do primeiro `for`, coloque outro `for d2 in range(1, 7)`."
  - "Dentro dos dois laços: `if d1 + d2 == s: favoraveis += 1`."
```

<!--full-->

## Combinações em uma linha

Para contar caras em lançamentos de moeda, a fórmula é $\binom{n}{k}/2^n$. Em Python, `math.comb(n, k)` calcula a combinação.

```exercise
id: py-binomial
lang: python
prompt: |
  Escreva `prob_caras(n, k)`: a probabilidade de saírem exatamente `k` caras em `n` lançamentos de uma moeda honesta. Use `math.comb`.

  Exemplo: `prob_caras(4, 2)` dá `0.375`.
starter: |
  import math

  def prob_caras(n, k):
      pass
solution: |
  import math

  def prob_caras(n, k):
      return math.comb(n, k) / 2 ** n
tests: |
  check("4 lançamentos, 2 caras: 6/16", abs(prob_caras(4, 2) - 0.375) < 1e-12, "comb(4,2) / 2**4")
  check("nenhuma cara em 3 lançamentos: 1/8", abs(prob_caras(3, 0) - 0.125) < 1e-12, "uma só sequência")
  check("as probabilidades de k = 0..10 somam 1", abs(sum(prob_caras(10, k) for k in range(11)) - 1) < 1e-12, "axioma: P(Ω) = 1")
hints:
  - "O total de sequências é `2 ** n`, e as favoráveis são `math.comb(n, k)`."
```

## Simulação (Monte Carlo)

Se você não souber contar, pode **simular**: repita o experimento milhares de vezes com números pseudoaleatórios e veja a frequência do evento. É o método de Monte Carlo, usado de verdade em finanças, em modelos macro com choques aleatórios e em estatística (bootstrap).

```python
import random
random.seed(1)               # semente fixa: o resultado se repete
d = random.randint(1, 6)     # um dado
```

A lei dos grandes números garante que a frequência se aproxima da probabilidade, com erro da ordem de $1/\sqrt{n}$: para ter uma casa decimal a mais de precisão, são necessárias 100 vezes mais repetições. Por isso a simulação é boa para conferir e ruim para obter muitos dígitos.

```exercise
id: py-simular
lang: python
prompt: |
  Escreva `simular(s, n)`: simula `n` lançamentos de **dois dados** e devolve a frequência relativa em que a soma foi igual a `s`. Use `random.randint(1, 6)` para cada dado.
starter: |
  import random

  def simular(s, n):
      acertos = 0
      for _ in range(n):
          pass  # jogue dois dados e conte se a soma é s
      return acertos / n
solution: |
  import random

  def simular(s, n):
      acertos = 0
      for _ in range(n):
          if random.randint(1, 6) + random.randint(1, 6) == s:
              acertos += 1
      return acertos / n
tests: |
  random.seed(7)
  p = simular(7, 100000)
  check("a frequência da soma 7 fica perto de 1/6", abs(p - 1/6) < 0.01, "com 100 mil jogadas o erro é da ordem de 0,001")
  p = simular(2, 100000)
  check("a soma 2 fica perto de 1/36", abs(p - 1/36) < 0.005, "só o par (1, 1)")
  check("soma impossível dá zero", simular(13, 1000) == 0, "nunca acontece")
hints:
  - "Dentro do laço: `if random.randint(1, 6) + random.randint(1, 6) == s:` e some 1 em `acertos`."
```

Compare as três respostas para a soma 7: o **papel** deu $6/36\approx 0{,}1667$, a **enumeração** deu exatamente isso e a **simulação** dá algo como $0{,}166\ldots$ com ruído na terceira casa. As três concordam, e é isso que confirma que você entendeu o problema.

## Erros comuns

- Esquecer `import random` (ou `import math`) no topo.
- Usar `random.random()` quando queria `random.randint(1, 6)`: o primeiro dá um decimal entre 0 e 1, não um dado.
- Não fixar a semente quando precisa repetir o resultado, por exemplo para depurar.
- Dividir pelo número de **acertos** em vez de pelo número de **tentativas** na frequência relativa.
