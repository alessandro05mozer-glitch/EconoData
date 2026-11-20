---
id: micro-02-teoria-do-consumidor
track: micro
title: Teoria do consumidor — utilidade, orçamento e demanda
order: 2
seq: 12
minutes: { quick: 30, full: 80 }
objectives:
  - Representar preferências por uma função de utilidade e curvas de indiferença
  - Montar a restrição orçamentária e a condição de tangência (TMS = razão de preços)
  - Derivar a demanda de uma utilidade Cobb-Douglas
  - Reconhecer as propriedades da demanda Cobb-Douglas (parcelas constantes de gasto)
cards:
  - front: "Condição de ótimo interior do consumidor."
    back: "$TMS=\\frac{UMg_x}{UMg_y}=\\frac{p_x}{p_y}$ e o orçamento é gasto por inteiro: $p_xx+p_yy=m$."
  - front: "Demandas de $U=x^{\\alpha}y^{1-\\alpha}$ com renda $m$."
    back: "$x^*=\\frac{\\alpha m}{p_x}$ e $y^*=\\frac{(1-\\alpha)m}{p_y}$."
  - front: "Quais são as elasticidades da demanda Cobb-Douglas por $x$?"
    back: "Preço-próprio $=-1$, preço-cruzada $=0$ e renda $=+1$."
---

## Preferências e utilidade

Para escolher, o consumidor compara **cestas** de bens. Representamos essa comparação por uma **função de utilidade** $U(x,y)$: a cesta com $U$ maior é preferida. Só a ordem importa, não o valor numérico.

Uma **curva de indiferença** reúne as cestas com a mesma utilidade. Com preferências "bem-comportadas" (mais é melhor, e o consumidor prefere misturas), as curvas são decrescentes e convexas. A inclinação (em módulo) da curva de indiferença é a **taxa marginal de substituição**:

$$
TMS=\frac{UMg_x}{UMg_y}
$$

É quanto de $y$ o consumidor aceita trocar por uma unidade a mais de $x$.

## A restrição orçamentária

Com renda $m$ e preços $p_x,p_y$, as cestas acessíveis satisfazem $p_xx+p_yy\le m$. Se mais é sempre melhor, o consumidor gasta tudo: $p_xx+p_yy=m$. A inclinação da reta de orçamento (em módulo) é $p_x/p_y$, o custo de oportunidade de $x$ em termos de $y$.

## O ótimo

No ótimo interior, a curva de indiferença **tangencia** a reta de orçamento:

$$
\frac{UMg_x}{UMg_y}=\frac{p_x}{p_y}\quad\text{e}\quad p_xx+p_yy=m.
$$

É a condição de primeira ordem do método de Lagrange da lição anterior.

## Cobb-Douglas

Com $U=x^{\alpha}y^{1-\alpha}$ (com $0<\alpha<1$): $UMg_x=\alpha\,\dfrac{U}{x}$ e $UMg_y=(1-\alpha)\dfrac{U}{y}$, logo

$$
TMS=\frac{\alpha}{1-\alpha}\cdot\frac{y}{x}=\frac{p_x}{p_y}\;\Rightarrow\; p_yy=\frac{1-\alpha}{\alpha}\,p_xx.
$$

Substituindo no orçamento, $p_xx\left(1+\frac{1-\alpha}{\alpha}\right)=m$, e portanto

$$
x^*=\frac{\alpha\,m}{p_x},\qquad y^*=\frac{(1-\alpha)\,m}{p_y}.
$$

O consumidor gasta a fração $\alpha$ da renda com $x$ e $1-\alpha$ com $y$, **quaisquer que sejam os preços**. Daí, $x^*$ não depende de $p_y$ (elasticidade-cruzada zero), cai com $p_x$ com elasticidade $-1$ e sobe proporcionalmente à renda.

## Questão no formato ANPEC (Tipo A)

```quiz-a
id: qa-consumidor
stem: |
  Um consumidor tem utilidade $U(x,y)=x^{0{,}3}\,y^{0{,}7}$, renda $m>0$ e preços $p_x,p_y>0$. Julgue as afirmativas.
items:
  - { t: "Na escolha ótima, a taxa marginal de substituição é igual à razão de preços $p_x/p_y$.", c: true }
  - { t: "O consumidor gasta 30% da renda com o bem $x$, independentemente dos preços.", c: true }
  - { t: "Um aumento de $p_x$, com tudo o mais constante, reduz a quantidade demandada de $y$.", c: false }
  - { t: "A elasticidade-preço da demanda por $x$ é $-0{,}3$.", c: false }
  - { t: "A elasticidade-renda da demanda por $x$ é igual a 1.", c: true }
explanation: |
  **1.** $x^*=0{,}3m/p_x$, então $p_xx^*=0{,}3m$.
  **2.** $y^*=0{,}7m/p_y$ não depende de $p_x$.
  **3.** $x^*=0{,}3m/p_x$ tem elasticidade $-1$ em relação ao preço, qualquer que seja $\alpha$.
  **4.** $x^*$ é proporcional a $m$.
```

*Questão escrita para estudo; não é item oficial da ANPEC.*

<!--full-->

## Questão no formato ANPEC (Tipo B)

```quiz-b
id: qb-consumidor
stem: |
  Um consumidor tem utilidade $U=x^{0{,}4}y^{0{,}6}$, renda $m=120$ e preços $p_x=4$ e $p_y=3$. Calcule a quantidade ótima $y^*$.
answer: 24
explanation: |
  $y^*=\dfrac{(1-\alpha)m}{p_y}=\dfrac{0{,}6\cdot 120}{3}=24$. (E $x^*=\dfrac{0{,}4\cdot 120}{4}=12$; conferindo o orçamento: $4\cdot 12+3\cdot 24=120$.)
```

## Em código

```exercise
id: py-cobb
lang: python
prompt: |
  Escreva `demanda_cd(alpha, renda, px, py)` que devolve a tupla `(x, y)` ótima de uma utilidade Cobb-Douglas $x^{\alpha}y^{1-\alpha}$.
starter: |
  def demanda_cd(alpha, renda, px, py):
      pass
solution: |
  def demanda_cd(alpha, renda, px, py):
      return (alpha * renda / px, (1 - alpha) * renda / py)
tests: |
  x, y = demanda_cd(0.4, 120, 4, 3)
  check("alpha=0,4, m=120, px=4, py=3 dá (12, 24)", abs(x - 12) < 1e-9 and abs(y - 24) < 1e-9, "x = alpha m / px e y = (1 - alpha) m / py")
  x, y = demanda_cd(0.25, 80, 2, 5)
  check("o orçamento é gasto por inteiro", abs(2 * x + 5 * y - 80) < 1e-9, "px*x + py*y deve ser igual à renda")
  x1, _ = demanda_cd(0.5, 100, 2, 1)
  x2, _ = demanda_cd(0.5, 100, 2, 50)
  check("x não depende de py", abs(x1 - x2) < 1e-9, "elasticidade-preço cruzada zero")
hints:
  - "A fração $\\alpha$ da renda vai para $x$; divida o gasto pelo preço para obter a quantidade."
```

## Limites do modelo

A Cobb-Douglas é um bom exemplo de ensino, mas é restritiva: parcelas de gasto constantes e elasticidades fixas raramente se verificam nos dados. Na próxima etapa veremos a decomposição de Slutsky (efeito-substituição e efeito-renda), que explica por que as demandas reais respondem de modos diferentes ao preço.
