---
id: econometria-01-mqo-do-zero
track: econometria
title: MQO do zero em Python — estimar, prever e diagnosticar
order: 1
seq: 29
minutes: { quick: 30, full: 85 }
objectives:
  - Implementar o estimador de MQO simples sem bibliotecas e conferir com casos conhecidos
  - Calcular resíduos, SQR, R² e erro padrão do coeficiente angular
  - Usar a regressão para prever e reconhecer o risco da extrapolação
  - Mostrar por que MQO com intercepto produz resíduos que somam zero
  - Testar a sensibilidade da reta a um outlier
cards:
  - front: "Erro padrão de $\\hat\\beta_1$ na regressão simples."
    back: "$\\widehat{se}(\\hat\\beta_1) = \\sqrt{\\hat\\sigma^2 / \\sum (x_i-\\bar x)^2}$ com $\\hat\\sigma^2 = SQR/(n-2)$."
  - front: "Por que dividir por $n-2$ na variância do erro?"
    back: "Foram estimados **dois** parâmetros ($\\beta_0$ e $\\beta_1$), então perdem-se dois graus de liberdade. Com $n-2$, $\\hat\\sigma^2$ é não viesado."
  - front: "Estatística $t$ do coeficiente."
    back: "$t = \\hat\\beta_1 / \\widehat{se}(\\hat\\beta_1)$. Testa $H_0: \\beta_1 = 0$. Com muitos graus de liberdade, $|t|>2$ rejeita a 5%, aproximadamente."
  - front: "Resíduo versus erro."
    back: "Resíduo $e_i = y_i - \\hat y_i$ é **observado**. Erro $u_i$ é **não observável**. O resíduo estima o erro."
---

Na lição de estatística você viu a reta de mínimos quadrados e arrastou pontos. Agora vamos **escrevê-la em código**, passo a passo, e acrescentar o que falta para uma regressão de verdade: resíduos, $R^2$, erro padrão e a estatística $t$. Implementar o MQO à mão é a melhor garantia de que você entende o que as bibliotecas fazem quando você chamar `statsmodels` ou `lm()`.

Ao final, você tem um mini-pacote de regressão testado e sabe o que cada número significa.

## O estimador

Para $y = \beta_0 + \beta_1 x + u$, as estimativas de MQO são:

$$
\hat\beta_1 = \frac{\sum (x_i-\bar x)(y_i-\bar y)}{\sum (x_i-\bar x)^2},\qquad \hat\beta_0 = \bar y - \hat\beta_1 \bar x.
$$

```python
x = [1, 2, 3, 4, 5]
y = [2.0, 4.1, 5.9, 8.2, 9.8]
n = len(x)
mx, my = sum(x) / n, sum(y) / n
b1 = sum((a - mx) * (b - my) for a, b in zip(x, y)) / sum((a - mx) ** 2 for a in x)
b0 = my - b1 * mx
print(b0, b1)
```

## Exercício 1: a reta de MQO

```exercise
id: py-mqo
lang: python
quick: true
prompt: |
  Escreva `mqo(x, y)`: devolve a tupla `(b0, b1)` do MQO simples.

  Exemplo: para `x = [1, 2, 3]` e `y = [2, 3, 8]`, o resultado é `(-1.6667, 3.0)`.
starter: |
  def mqo(x, y):
      return (0.0, 0.0)
solution: |
  def mqo(x, y):
      n = len(x)
      mx = sum(x) / n
      my = sum(y) / n
      b1 = sum((a - mx) * (b - my) for a, b in zip(x, y)) / sum((a - mx) ** 2 for a in x)
      return (my - b1 * mx, b1)
tests: |
  b0, b1 = mqo([1, 2, 3], [2, 3, 8])
  check("coeficiente angular 3", abs(b1 - 3.0) < 1e-9, "(6)/(2)")
  check("intercepto -5/3", abs(b0 + 5 / 3) < 1e-9, "média de y − 3 × média de x")
  b0, b1 = mqo([0, 1, 2, 3], [1, 3, 5, 7])
  check("reta exata y = 1 + 2x", abs(b0 - 1) < 1e-9 and abs(b1 - 2) < 1e-9, "dados sem ruído")
hints:
  - "Calcule primeiro as médias `mx` e `my`."
  - "`b1 = sum((a - mx) * (b - my) ...) / sum((a - mx) ** 2 ...)`; depois `b0 = my - b1 * mx`."
```

## Exercício 2: resíduos e R²

O resíduo é a distância vertical entre o dado e a reta. A soma dos quadrados dos resíduos (SQR) é o que o MQO minimiza. O $R^2$ compara a SQR com a variação total, SQT:

$$
R^2 = 1 - \frac{SQR}{SQT},\qquad SQT = \sum (y_i - \bar y)^2.
$$

```exercise
id: py-r2
lang: python
quick: true
prompt: |
  Escreva `r2(x, y, b0, b1)`: devolve o $R^2$ da reta `b0 + b1 * x` para os dados.

  Exemplo: para a reta exata `y = 1 + 2x` com `x = [0, 1, 2, 3]` e `y = [1, 3, 5, 7]`, o $R^2$ é `1.0`.
starter: |
  def r2(x, y, b0, b1):
      return 0.0
solution: |
  def r2(x, y, b0, b1):
      my = sum(y) / len(y)
      sqr = sum((b - (b0 + b1 * a)) ** 2 for a, b in zip(x, y))
      sqt = sum((b - my) ** 2 for b in y)
      return 1 - sqr / sqt
tests: |
  check("reta exata dá R² = 1", abs(r2([0, 1, 2, 3], [1, 3, 5, 7], 1, 2) - 1.0) < 1e-12, "sem resíduos")
  check("reta horizontal na média dá R² = 0", abs(r2([1, 2, 3], [2, 4, 6], 4, 0)) < 1e-12, "não explica nada")
  check("exemplo 2, 3, 8", abs(r2([1, 2, 3], [2, 3, 8], -5 / 3, 3) - (1 - 8 / 62)) < 1e-9, "SQR = 8/3 e SQT = 62/3")
hints:
  - "SQR é `sum((b - (b0 + b1 * a)) ** 2 ...)` e SQT é `sum((b - my) ** 2 ...)`."
  - "`return 1 - sqr / sqt`"
```

## Exercício 3: erro padrão e estatística t

Com $n-2$ graus de liberdade, $\hat\sigma^2 = SQR/(n-2)$ e

$$
\widehat{se}(\hat\beta_1) = \sqrt{\frac{\hat\sigma^2}{\sum (x_i-\bar x)^2}},\qquad t = \frac{\hat\beta_1}{\widehat{se}(\hat\beta_1)}.
$$

```exercise
id: py-ep
lang: python
prompt: |
  Escreva `erro_padrao_b1(x, y)`: devolve o erro padrão estimado de $\hat\beta_1$ (use o seu MQO, ou recalcule). Para `x = [1, 2, 3, 4]` e `y = [2, 3, 7, 8]`, o valor é cerca de `0.4243`.
starter: |
  def erro_padrao_b1(x, y):
      return 0.0
solution: |
  def erro_padrao_b1(x, y):
      n = len(x)
      mx = sum(x) / n
      my = sum(y) / n
      sxx = sum((a - mx) ** 2 for a in x)
      b1 = sum((a - mx) * (b - my) for a, b in zip(x, y)) / sxx
      b0 = my - b1 * mx
      sqr = sum((b - b0 - b1 * a) ** 2 for a, b in zip(x, y))
      return (sqr / (n - 2) / sxx) ** 0.5
tests: |
  check("exemplo 1..4", abs(erro_padrao_b1([1, 2, 3, 4], [2, 3, 7, 8]) - 0.4242640687119285) < 1e-9, "SQR = 1,8; σ² = 0,9; Sxx = 5")
  check("depende de n", erro_padrao_b1([1, 2, 3, 4, 5, 6], [2, 3, 7, 8, 9, 13]) > 0, "positivo para dados com ruído")
hints:
  - "SQR é a soma dos quadrados dos resíduos da reta estimada."
  - "`(sqr / (n - 2) / sxx) ** 0.5`"
```

<!--full-->

## Exercício 4: prever

```exercise
id: py-prever
lang: python
prompt: |
  Escreva `prever(b0, b1, xs)`: devolve a lista de valores previstos `b0 + b1 * x` para cada `x` em `xs`.

  Exemplo: `prever(1, 2, [0, 5])` dá `[1, 11]`.
starter: |
  def prever(b0, b1, xs):
      return []
solution: |
  def prever(b0, b1, xs):
      return [b0 + b1 * x for x in xs]
tests: |
  check("exemplo", prever(1, 2, [0, 5]) == [1, 11], "1 + 2 × 5 = 11")
  check("lista vazia", prever(1, 2, []) == [], "nada para prever")
hints:
  - "Uma compreensão de lista resolve: `[b0 + b1 * x for x in xs]`."
```

## Exercício 5: um outlier puxa a reta

```exercise
id: py-outlier
lang: python
prompt: |
  Escreva `efeito_outlier(x, y, i, novo_y)`: devolve **quanto o coeficiente angular muda** (novo menos o original) quando o `i`-ésimo valor de `y` é trocado por `novo_y`. Reutilize a sua função `mqo` abaixo.

  Exemplo: com `x = [1, 2, 3, 4, 5]`, `y = [2, 4, 6, 8, 10]`, `i = 4` e `novo_y = 30`, o coeficiente sobe de `2.0` para `6.0`: a mudança é `4.0`.
starter: |
  def mqo(x, y):
      n = len(x)
      mx = sum(x) / n
      my = sum(y) / n
      b1 = sum((a - mx) * (b - my) for a, b in zip(x, y)) / sum((a - mx) ** 2 for a in x)
      return (my - b1 * mx, b1)

  def efeito_outlier(x, y, i, novo_y):
      return 0.0
solution: |
  def mqo(x, y):
      n = len(x)
      mx = sum(x) / n
      my = sum(y) / n
      b1 = sum((a - mx) * (b - my) for a, b in zip(x, y)) / sum((a - mx) ** 2 for a in x)
      return (my - b1 * mx, b1)

  def efeito_outlier(x, y, i, novo_y):
      y2 = list(y)
      y2[i] = novo_y
      return mqo(x, y2)[1] - mqo(x, y)[1]
tests: |
  check("exemplo do enunciado", abs(efeito_outlier([1, 2, 3, 4, 5], [2, 4, 6, 8, 10], 4, 30) - 4.0) < 1e-9, "de 2 para 6")
  y = [2, 4, 6, 8, 10]
  efeito_outlier([1, 2, 3, 4, 5], y, 4, 30)
  check("a lista original não foi modificada", y == [2, 4, 6, 8, 10], "copie antes de trocar: `list(y)`")
hints:
  - "Copie a lista com `y2 = list(y)` antes de trocar `y2[i]`."
  - "Devolva `mqo(x, y2)[1] - mqo(x, y)[1]`."
```

## Interpretação: o que dizer

Suponha $\hat\beta_1 = 3$ com erro padrão 0,5. A razão $t = 6$ é grande: rejeita-se $H_0:\beta_1 = 0$. Um intervalo de confiança aproximado de 95% é $\hat\beta_1 \pm 2\cdot\widehat{se} = [2; 4]$. Frase correta: "em média, cada unidade a mais de $x$ está associada a 3 unidades a mais de $y$, com intervalo de confiança de 95% entre 2 e 4". **Não** diga "$x$ causa 3 unidades de $y$" sem um desenho que sustente a causalidade.

## Erros que custam pontos

- Dividir a SQR por $n$ em vez de $n-2$ no estimador da variância do erro.
- Modificar a lista original dentro de uma função (efeito colateral).
- Extrapolar a previsão para valores de $x$ muito fora da amostra.
- Ler $R^2$ alto como prova de causalidade.

## Como estudar este tema

Rode `mqo` nos dados do simulador da lição de regressão (os oito pontos iniciais) e compare a reta que você obtém com a que o simulador desenha. Depois use `efeito_outlier` com cada ponto: qual deles tem maior influência? (Os extremos em $x$ costumam ter.)
