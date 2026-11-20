---
id: mat-02-matrizes-sistemas
track: matematica
title: Matrizes, determinantes e sistemas lineares
order: 2
seq: 10
minutes: { quick: 25, full: 70 }
objectives:
  - Escrever um sistema linear na forma matricial Ax = b
  - Calcular o determinante e a inversa de uma matriz 2×2
  - Resolver sistemas pela regra de Cramer e pela inversa
  - Saber quando um sistema tem solução única
cards:
  - front: "Determinante e inversa de $A=\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$."
    back: "$\\det A = ad-bc$ e, se $\\det A\\neq 0$, $A^{-1}=\\frac{1}{ad-bc}\\begin{pmatrix}d&-b\\\\-c&a\\end{pmatrix}$."
  - front: "Quando $Ax=b$ (A quadrada) tem solução única?"
    back: "Se e somente se $\\det A\\neq 0$ (A invertível). Com $\\det A=0$ não há solução ou há infinitas."
  - front: "Regra de Cramer para o sistema 2×2 $ax+by=e,\\; cx+dy=f$."
    back: "$x=\\frac{ed-bf}{ad-bc},\\quad y=\\frac{af-ec}{ad-bc}$."
  - front: "Inversa de um produto: $(AB)^{-1}=\\,?$"
    back: "$B^{-1}A^{-1}$. A ordem se inverte."
---

Muitos modelos econômicos viram um **sistema de equações lineares**: o equilíbrio de dois mercados interligados, um modelo de insumo-produto, as condições de primeira ordem de uma otimização quadrática. A álgebra linear dá a linguagem e o método para resolver todos de uma vez.

## Forma matricial

O sistema

$$
\begin{cases} 2x + y = 7\\ x + 3y = 9\end{cases}
$$

escreve-se $Ax=b$, com

$$
A=\begin{pmatrix}2&1\\1&3\end{pmatrix},\quad x=\begin{pmatrix}x\\y\end{pmatrix},\quad b=\begin{pmatrix}7\\9\end{pmatrix}.
$$

## Determinante e inversa (2×2)

$$
\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc
$$

Se $\det A\neq 0$, existe a inversa $A^{-1}=\dfrac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$ e a solução única é $x=A^{-1}b$.

No exemplo, $\det A=2\cdot 3-1\cdot 1=5$. Pela **regra de Cramer**:

$$
x=\frac{7\cdot 3-1\cdot 9}{5}=\frac{12}{5}=2{,}4,\qquad y=\frac{2\cdot 9-7\cdot 1}{5}=\frac{11}{5}=2{,}2.
$$

Conferindo: $2(2{,}4)+2{,}2=7$ e $2{,}4+3(2{,}2)=9$. ✓

> **Ideia central.** $\det A=0$ significa que as linhas são "redundantes" (uma é múltipla da outra). Aí o sistema perde informação: ou é contraditório, ou tem infinitas soluções.

## Questão no formato ANPEC (Tipo A)

```quiz-a
id: qa-matrizes
stem: |
  Sejam $A$ e $B$ matrizes quadradas de mesma ordem. Julgue as afirmativas.
items:
  - { t: "O sistema $Ax=b$ tem solução única se, e somente se, $\\det A\\neq 0$.", c: true }
  - { t: "Para $A=\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$, tem-se $\\det A=ad+bc$.", c: false }
  - { t: "Se $A$ e $B$ são invertíveis, então $(AB)^{-1}=A^{-1}B^{-1}$.", c: false }
  - { t: "Se uma linha de $A$ é múltipla de outra linha, então $\\det A=0$.", c: true }
  - { t: "A multiplicação de matrizes quadradas é comutativa: $AB=BA$ sempre.", c: false }
explanation: |
  **1.** O determinante 2×2 é $ad-bc$.
  **2.** $(AB)^{-1}=B^{-1}A^{-1}$, a ordem se inverte.
  **3.** Linhas proporcionais tornam as linhas linearmente dependentes, logo $\det A=0$.
  **4.** Em geral $AB\neq BA$. Por exemplo, trocar a ordem de duas transformações muda o resultado.
```

*Questão escrita para estudo; não é item oficial da ANPEC.*

<!--full-->

## Questão no formato ANPEC (Tipo B)

```quiz-b
id: qb-matrizes
stem: |
  Seja $A=\begin{pmatrix}4&1\\2&3\end{pmatrix}$ e seja $(x,y)$ a solução de $4x+y=9$, $2x+3y=7$. Calcule $\det A + x + y$.
answer: 13
explanation: |
  $\det A=4\cdot 3-1\cdot 2=10$. Por Cramer: $x=\frac{9\cdot 3-1\cdot 7}{10}=2$ e $y=\frac{4\cdot 7-9\cdot 2}{10}=1$. Logo $10+2+1=13$.
```

## Em código

```exercise
id: py-cramer
lang: python
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

## Para treinar

1. Calcule $A^{-1}$ para $A=\begin{pmatrix}2&1\\1&3\end{pmatrix}$ e verifique que $A^{-1}A=I$. (Resposta: $\frac15\begin{pmatrix}3&-1\\-1&2\end{pmatrix}$.)
2. Para que valores de $k$ o sistema $x+ky=1,\; kx+4y=2$ **não** tem solução única? (Resposta: $k=\pm 2$.)
