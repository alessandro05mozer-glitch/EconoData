---
id: mat-03-otimizacao-lagrange
track: matematica
title: Otimização com restrição — o método de Lagrange
order: 3
seq: 11
minutes: { quick: 25, full: 70 }
objectives:
  - Montar o lagrangeano de um problema com restrição de igualdade
  - Resolver as condições de primeira ordem em problemas com duas variáveis
  - Interpretar o multiplicador de Lagrange como um preço-sombra
  - Aplicar o método à escolha do consumidor
cards:
  - front: "Lagrangeano de $\\max f(x,y)$ sujeito a $g(x,y)=m$."
    back: "$\\mathcal{L}=f(x,y)+\\lambda\\,(m-g(x,y))$. As condições de 1ª ordem são $\\partial\\mathcal{L}/\\partial x=\\partial\\mathcal{L}/\\partial y=\\partial\\mathcal{L}/\\partial\\lambda=0$."
  - front: "O que mede o multiplicador $\\lambda$?"
    back: "O quanto o valor ótimo de $f$ varia se a restrição afrouxa em uma unidade, $\\lambda=\\partial f^*/\\partial m$ (preço-sombra)."
  - front: "Condição de tangência no ótimo de $\\max f$ s.a. $g=m$."
    back: "$\\nabla f=\\lambda\\nabla g$: as curvas de nível de $f$ e de $g$ são tangentes."
---

Quase toda escolha econômica é uma **otimização com restrição**: o consumidor maximiza utilidade sujeito ao orçamento, a firma minimiza custo sujeito a produzir certa quantidade. O **método de Lagrange** transforma esse problema em um sistema de equações.

## O método

Para maximizar (ou minimizar) $f(x,y)$ sujeito a $g(x,y)=m$, monte

$$
\mathcal{L}(x,y,\lambda)=f(x,y)+\lambda\,\big(m-g(x,y)\big)
$$

e iguale a zero as três derivadas parciais:

$$
\frac{\partial\mathcal{L}}{\partial x}=0,\qquad \frac{\partial\mathcal{L}}{\partial y}=0,\qquad \frac{\partial\mathcal{L}}{\partial\lambda}=0\;\;(\text{a restrição}).
$$

As duas primeiras dizem $f_x=\lambda g_x$ e $f_y=\lambda g_y$, ou seja, $\dfrac{f_x}{f_y}=\dfrac{g_x}{g_y}$: no ótimo, as curvas de nível são **tangentes**.

## Exemplo

Maximize $f(x,y)=xy$ sujeito a $x+y=10$.

$$
\mathcal{L}=xy+\lambda(10-x-y)\;\Rightarrow\; y=\lambda,\;\; x=\lambda,\;\; x+y=10.
$$

Logo $x=y=5$ e o máximo é $f=25$, com $\lambda=5$. Esse $\lambda$ é o **preço-sombra**: se o lado direito da restrição passasse de 10 para 11, o máximo subiria cerca de 5 (de fato, $5{,}5^2=30{,}25$, perto de $25+5=30$).

## Questão no formato ANPEC (Tipo A)

```quiz-a
id: qa-lagrange
stem: |
  Considere o problema $\max\, xy$ sujeito a $x+y=10$, com $x,y\ge 0$, e o método de Lagrange. Julgue as afirmativas.
items:
  - { t: "Na solução interior, os gradientes de $f$ e da restrição são paralelos: $\\nabla f=\\lambda\\nabla g$.", c: true }
  - { t: "O multiplicador $\\lambda$ mede a variação do valor máximo de $f$ para uma variação unitária (pequena) do lado direito da restrição.", c: true }
  - { t: "As condições de primeira ordem são suficientes para um máximo em qualquer problema com restrição.", c: false }
  - { t: "A solução do problema é $x=y=5$.", c: true }
  - { t: "O valor máximo de $xy$ nesse problema é 50.", c: false }
explanation: |
  **2.** As condições de 1ª ordem são necessárias; para garantir que é máximo é preciso checar condições de 2ª ordem (ou concavidade/quase-concavidade).
  **4.** $5\cdot 5=25$, não 50.
```

*Questão escrita para estudo; não é item oficial da ANPEC.*

<!--full-->

## Questão no formato ANPEC (Tipo B)

```quiz-b
id: qb-lagrange
stem: |
  Maximize $xy$ sujeito a $2x+y=20$. Calcule o valor máximo de $xy$.
answer: 50
explanation: |
  $\mathcal{L}=xy+\lambda(20-2x-y)$. As condições dão $y=2\lambda$ e $x=\lambda$, logo $y=2x$. Na restrição, $2x+2x=20$, então $x=5$, $y=10$ e $xy=50$.
```

## Aplicação: a escolha do consumidor

Um consumidor com utilidade $U=\sqrt{xy}$ e renda $m$ compra $x$ ao preço $p_x$ e $y$ ao preço $p_y$. O problema é $\max\sqrt{xy}$ s.a. $p_xx+p_yy=m$. As condições de 1ª ordem dão $\dfrac{y}{x}=\dfrac{p_x}{p_y}$ (a razão entre as utilidades marginais é igual à razão de preços), e com a restrição:

$$
x^*=\frac{m}{2p_x},\qquad y^*=\frac{m}{2p_y}.
$$

O consumidor gasta **metade da renda em cada bem**.

```exercise
id: py-lagrange
lang: python
prompt: |
  Escreva `otimo(px, py, m)` que devolve `(x, y)` da solução de $\max\sqrt{xy}$ sujeito a $p_xx+p_yy=m$, usando as fórmulas acima.
starter: |
  def otimo(px, py, m):
      pass
solution: |
  def otimo(px, py, m):
      return (m / (2 * px), m / (2 * py))
tests: |
  x, y = otimo(2, 1, 20)
  check("px=2, py=1, m=20 dá (5, 10)", abs(x - 5) < 1e-9 and abs(y - 10) < 1e-9, "x = m/(2 px) e y = m/(2 py)")
  x, y = otimo(4, 5, 100)
  check("a restrição orçamentária fecha", abs(4 * x + 5 * y - 100) < 1e-9, "px*x + py*y deve ser igual a m")
  check("gasta metade da renda em cada bem", abs(4 * x - 50) < 1e-9, "px*x = m/2")
hints:
  - "Cada bem recebe metade da renda: gasto em $x$ é $m/2$, então $x=(m/2)/p_x$."
```

## Para treinar

1. Minimize $x^2+y^2$ sujeito a $x+y=4$. (Resposta: $x=y=2$, mínimo 8.)
2. Em $\max xy$ s.a. $x+y=10$, o preço-sombra é $\lambda=5$. Estime o novo máximo se a restrição passar a $x+y=11$. (Resposta: cerca de 30; o valor exato é 30,25.)
