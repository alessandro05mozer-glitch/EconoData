---
id: python-03-series-economicas
track: python
title: Python aplicado — séries, inflação e PIB real
order: 3
seq: 15
minutes: { quick: 30, full: 75 }
objectives:
  - Representar uma série temporal como lista e percorrê-la com `zip` e compreensões de lista
  - Deflacionar valores nominais com um índice de preços
  - Converter taxas mensais em anuais e calcular variações percentuais de uma série
  - Reconhecer por que comparar séries nominais no tempo engana
cards:
  - front: "Como calcular o crescimento real a partir do nominal e da inflação, em Python?"
    back: "```python\nreal = ((1 + nominal/100) / (1 + inflacao/100) - 1) * 100\n```\nÉ a razão dos fatores, não a subtração das taxas."
  - front: "O que `zip(a, b)` faz e o que é uma compreensão de lista?"
    back: "`zip` percorre duas listas em paralelo. `[f(x) for x in lista]` constrói uma nova lista aplicando `f` a cada elemento."
  - front: "Como converter taxa mensal em anual?"
    back: "Compõe-se: $(1+i_m)^{12}-1$. Em Python, `((1 + t/100) ** 12 - 1) * 100`."
---

Dados econômicos chegam em **séries**: o PIB trimestral, o IPCA mensal, o câmbio diário. Quase toda análise começa por três perguntas: como **descontar a inflação**, como **comparar períodos** e como **converter taxas** entre frequências. Esta lição transforma o que você viu em Macroeconomia (PIB nominal e real) em código que serve para qualquer série.

## Séries como listas

Uma série é uma lista em ordem de tempo. Para percorrer duas séries em paralelo (por exemplo, o PIB nominal e o deflator do mesmo ano), use `zip`. Para criar uma nova série a partir de outra, use uma **compreensão de lista**, uma forma curta de escrever um laço:

```python
nominal = [200, 275]
deflator = [100, 125]

# forma com laço
reais = []
for n, d in zip(nominal, deflator):
    reais.append(n / d * 100)

# forma curta, equivalente
reais = [n / d * 100 for n, d in zip(nominal, deflator)]
print(reais)   # [200.0, 220.0]
```

Os números do exemplo são os da padaria da lição de PIB: nominal $200\to 275$, deflator $100\to 125$. O PIB real passa de $200$ para $220$, ou seja, 10% de crescimento real.

## Exercício 1: crescimento real

```exercise
id: py-real
lang: python
quick: true
prompt: |
  Escreva `crescimento_real(nominal, deflator)`: recebe a variação do PIB nominal e a variação do deflator, ambas em **porcentagem** (por exemplo `10` e `5`), e devolve o crescimento real em porcentagem.

  Exemplo: `crescimento_real(10, 5)` deve dar cerca de `4.7619`.
starter: |
  def crescimento_real(nominal, deflator):
      pass
solution: |
  def crescimento_real(nominal, deflator):
      return ((1 + nominal / 100) / (1 + deflator / 100) - 1) * 100
tests: |
  check("10% nominal e 5% de deflator", abs(crescimento_real(10, 5) - 4.761904761904762) < 1e-9, "(1,10 / 1,05 - 1) em %")
  check("deflator zero devolve o nominal", abs(crescimento_real(7, 0) - 7) < 1e-9, "sem inflação, real = nominal")
  check("nominal igual ao deflator dá zero", abs(crescimento_real(6, 6)) < 1e-9, "crescimento real nulo")
hints:
  - "Converta cada porcentagem para fator: `1 + x / 100`."
  - "Divida os fatores, subtraia 1 e multiplique por 100."
```

## Exercício 2: deflacionar uma série

```exercise
id: py-deflacionar
lang: python
quick: true
prompt: |
  Escreva `deflacionar(nominal, indice)`: recebe uma lista de valores nominais e uma lista de índices de preços (base 100, mesmo tamanho) e devolve a lista de valores **reais**, em preços da base.

  Exemplo: `deflacionar([200, 275], [100, 125])` deve dar `[200.0, 220.0]`.
starter: |
  def deflacionar(nominal, indice):
      return [n for n in nominal]  # ajuste: divida cada valor pelo índice/100
solution: |
  def deflacionar(nominal, indice):
      return [n / (i / 100) for n, i in zip(nominal, indice)]
tests: |
  r = deflacionar([200, 275], [100, 125])
  check("exemplo da padaria dá [200, 220]", len(r) == 2 and abs(r[0] - 200) < 1e-9 and abs(r[1] - 220) < 1e-9, "275 / 1,25 = 220")
  r = deflacionar([100, 100, 100], [100, 200, 400])
  check("mesmo valor nominal com preços dobrando cai pela metade", all(abs(a - b) < 1e-9 for a, b in zip(r, [100, 50, 25])), "valor real = nominal / (índice/100)")
  check("devolve uma lista do mesmo tamanho", len(deflacionar([1, 2, 3], [100, 100, 100])) == 3, "uma saída por entrada")
hints:
  - "Cada valor real é `n / (i / 100)`; `zip(nominal, indice)` entrega os pares."
  - "`return [n / (i / 100) for n, i in zip(nominal, indice)]`"
```

<!--full-->

## Exercício 3: de mensal para anual

Uma inflação de 1% ao mês não dá 12% ao ano, pois as taxas se compõem. Na lição de Economia Brasileira, 40% ao mês viraram quase 5.570% ao ano. Vamos programar a conversão.

```exercise
id: py-anual
lang: python
prompt: |
  Escreva `anualizar(taxa_mensal)`: recebe uma taxa mensal em **porcentagem** e devolve a taxa anual equivalente, também em porcentagem.

  Exemplos: `anualizar(1)` dá cerca de `12.6825` e `anualizar(40)` dá cerca de `5569.39`.
starter: |
  def anualizar(taxa_mensal):
      pass
solution: |
  def anualizar(taxa_mensal):
      return ((1 + taxa_mensal / 100) ** 12 - 1) * 100
tests: |
  check("1% ao mês dá 12,6825% ao ano", abs(anualizar(1) - 12.682503013196973) < 1e-6, "(1,01 ** 12 - 1) em %")
  check("40% ao mês dá cerca de 5569%", abs(anualizar(40) - 5569.391237529596) < 1e-6, "a composição explode")
  check("zero dá zero", abs(anualizar(0)) < 1e-12, "sem inflação")
hints:
  - "Converta para fator `1 + taxa_mensal / 100`, eleve a 12 com `** 12`, subtraia 1 e volte para porcentagem."
```

## Exercício 4: variações de uma série

Dada uma série de PIB real, o que a imprensa chama de "crescimento" é a variação percentual de cada período em relação ao anterior.

```exercise
id: py-variacoes
lang: python
prompt: |
  Escreva `variacoes(serie)`: recebe uma lista de valores e devolve a lista das variações percentuais entre valores consecutivos. A lista de saída tem um elemento a menos que a de entrada.

  Exemplo: `variacoes([100, 110, 121])` dá `[10.0, 10.0]` (aproximadamente).
starter: |
  def variacoes(serie):
      saida = []
      for i in range(1, len(serie)):
          pass  # calcule a variação de serie[i-1] para serie[i]
      return saida
solution: |
  def variacoes(serie):
      saida = []
      for i in range(1, len(serie)):
          saida.append((serie[i] / serie[i - 1] - 1) * 100)
      return saida
tests: |
  v = variacoes([100, 110, 121])
  check("100, 110, 121 dá 10% e 10%", len(v) == 2 and abs(v[0] - 10) < 1e-9 and abs(v[1] - 10) < 1e-9, "(atual / anterior - 1) * 100")
  v = variacoes([200, 220, 209])
  check("queda de 5% no último período", abs(v[1] + 5) < 1e-9, "variação negativa quando a série cai")
  check("uma série de um elemento não tem variações", variacoes([5]) == [], "lista vazia")
hints:
  - "A variação percentual é `(serie[i] / serie[i - 1] - 1) * 100`."
  - "Use `saida.append(...)` dentro do laço."
```

## Juntando tudo: deflacionar e depois comparar

Com as duas funções, o fluxo completo de uma análise é: partir da série nominal, **deflacionar**, e só então calcular as **variações**. No exemplo da padaria, `variacoes(deflacionar([200, 275], [100, 125]))` dá `[10.0]`, e `variacoes([200, 275])` dá `[37.5]`: o primeiro é o crescimento real, o segundo é o nominal, que mistura quantidade e preço.

:::atencao Dado em porcentagem ou em fator?
Fonte de erros clássica. Algumas fontes dão a variação como `1.5` (por cento) e outras como `0.015` (decimal) ou como `1.015` (fator). Antes de usar um número, leia a unidade e converta na entrada da função, e documente na própria função o que ela espera.
:::

## Erros comuns

- Calcular o crescimento real como `nominal - deflator`: a conta correta é a razão dos fatores.
- Usar um índice de preços com base diferente da esperada. Índices em base 100 dividem por `i / 100`; índices em base 1 dividem direto.
- `range(len(serie))` em vez de `range(1, len(serie))` ao comparar com o período anterior: no primeiro elemento, `serie[i - 1]` olha para o **último** (índice `-1` em Python).
