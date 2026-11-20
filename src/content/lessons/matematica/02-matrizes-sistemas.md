---
id: mat-02-matrizes-sistemas
track: matematica
title: Matrizes, determinantes e sistemas lineares
order: 2
seq: 10
minutes: { quick: 35, full: 95 }
objectives:
  - Enxergar um sistema linear como retas que se cruzam e escrevê-lo na forma matricial Ax = b
  - Operar com matrizes (soma, produto, transposta) e saber que AB ≠ BA em geral
  - Calcular o determinante e a inversa de uma matriz 2×2
  - Resolver sistemas pela regra de Cramer e pela inversa e saber quando a solução é única
  - Aplicar a dois mercados interligados e a um modelo de insumo-produto
cards:
  - front: "Determinante e inversa de $A=\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$."
    back: "$\\det A = ad-bc$ e, se $\\det A\\neq 0$, $A^{-1}=\\frac{1}{ad-bc}\\begin{pmatrix}d&-b\\\\-c&a\\end{pmatrix}$."
  - front: "Quando $Ax=b$ (A quadrada) tem solução única?"
    back: "Se e somente se $\\det A\\neq 0$ (A invertível). Com $\\det A=0$ não há solução ou há infinitas."
  - front: "Regra de Cramer para o sistema 2×2 $ax+by=e,\\; cx+dy=f$."
    back: "$x=\\frac{ed-bf}{ad-bc},\\quad y=\\frac{af-ec}{ad-bc}$."
  - front: "Inversa de um produto: $(AB)^{-1}=\\,?$"
    back: "$B^{-1}A^{-1}$. A ordem se inverte."
  - front: "Interpretação geométrica de um sistema 2×2."
    back: "Duas retas. Solução única: se cruzam. Nenhuma: paralelas distintas. Infinitas: coincidem. O determinante zero indica paralelas ou coincidentes."
---

Dois mercados ligados (se o preço da carne sobe, o frango vende mais), uma economia com vários setores que compram uns dos outros, as condições de primeira ordem de um problema de otimização: tudo isso vira um **sistema de equações lineares**. A álgebra linear é a linguagem para escrevê-los e o método para resolver todos de uma vez.

Ao final, você resolve sistemas de três maneiras, decide se a solução existe e é única só olhando o determinante e aplica o método a modelos econômicos.

## Um sistema é um par de retas

Considere

$$
\begin{cases} 2x + y = 7\\ x + 3y = 9\end{cases}
$$

Cada equação é uma **reta** no plano, e uma solução é um ponto que está nas duas. Há três possibilidades: as retas se cruzam em um ponto (solução única), são paralelas (nenhuma solução) ou são a mesma reta (infinitas). Mexa nos coeficientes e veja cada caso:

```sim
id: sistema-2x2
```

:::intuicao O determinante é o detector
O determinante $ad-bc$ mede o quão "diferentes" são as direções das duas retas. Se for zero, as retas têm a **mesma inclinação**: são paralelas ou coincidem, e a solução única desaparece. Se for diferente de zero, elas têm inclinações distintas e se cruzam em exatamente um ponto.
:::

## Forma matricial

O mesmo sistema se escreve $Ax=b$, com

$$
A=\begin{pmatrix}2&1\\1&3\end{pmatrix},\quad x=\begin{pmatrix}x\\y\end{pmatrix},\quad b=\begin{pmatrix}7\\9\end{pmatrix}.
$$

A matriz $A$ guarda os coeficientes; o vetor $x$, as incógnitas; $b$, os termos independentes. A vantagem é que o mesmo raciocínio serve para 2, 20 ou 2000 equações.

## Operações com matrizes

- **Soma**: elemento a elemento, só entre matrizes de mesmo tamanho.
- **Multiplicação por número**: multiplica todos os elementos.
- **Transposta** $A^T$: troca linhas por colunas.
- **Produto** $AB$: o elemento da linha $i$, coluna $j$ é a linha $i$ de $A$ multiplicada, termo a termo e somada, pela coluna $j$ de $B$.

:::atencao O produto não é comutativo
Em geral $AB\neq BA$. Com $A=\begin{pmatrix}2&1\\1&3\end{pmatrix}$ e $B=\begin{pmatrix}1&0\\2&1\end{pmatrix}$:

$$
AB=\begin{pmatrix}4&1\\7&3\end{pmatrix},\qquad BA=\begin{pmatrix}2&1\\5&5\end{pmatrix}.
$$

Por isso, a ordem das matrizes importa em toda conta e em toda prova.
:::

## Determinante e inversa (2×2)

$$
\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc
$$

Se $\det A\neq 0$, existe a inversa $A^{-1}=\dfrac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$, que satisfaz $A^{-1}A=AA^{-1}=I$, e a solução única é $x=A^{-1}b$.

:::exemplo Resolvendo de duas maneiras
Resolva $2x+y=7$ e $x+3y=9$ pela regra de Cramer e pela inversa.
---
Determinante: $\det A=2\cdot 3-1\cdot 1=5\neq 0$, então há solução única.
---
**Cramer.** Para $x$, troque a coluna de $x$ por $b$: $x=\dfrac{7\cdot 3-1\cdot 9}{5}=\dfrac{12}{5}=2{,}4$. Para $y$, troque a coluna de $y$: $y=\dfrac{2\cdot 9-7\cdot 1}{5}=\dfrac{11}{5}=2{,}2$.
---
**Inversa.** $A^{-1}=\dfrac{1}{5}\begin{pmatrix}3&-1\\-1&2\end{pmatrix}$. Então $x=A^{-1}b=\dfrac{1}{5}\begin{pmatrix}3\cdot 7-9\\-7+2\cdot 9\end{pmatrix}=\dfrac{1}{5}\begin{pmatrix}12\\11\end{pmatrix}$. Mesmo resultado.
---
Confira nas equações originais: $2(2{,}4)+2{,}2=7$ e $2{,}4+3(2{,}2)=9$. ✓
:::

:::resumo Para levar
$\det A\neq 0\iff$ solução única $\iff A$ invertível. $\det A=0\iff$ as linhas são proporcionais (uma é múltipla da outra) $\iff$ o sistema ou é contraditório ou tem infinitas soluções.
:::

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

## Aplicação 1: dois mercados interligados

Dois bens substitutos têm demandas que dependem dos dois preços:

$$
Q_1^d=40-2P_1+P_2,\quad Q_1^s=3P_1-10;\qquad Q_2^d=30+P_1-3P_2,\quad Q_2^s=2P_2.
$$

O preço do outro bem aparece com sinal positivo (substitutos). Equilibrar os dois mercados ao mesmo tempo exige resolver um sistema.

:::exemplo Equilíbrio simultâneo
Encontre $P_1$ e $P_2$ de equilíbrio.
---
Mercado 1: $40-2P_1+P_2=3P_1-10\Rightarrow 5P_1-P_2=50$.
---
Mercado 2: $30+P_1-3P_2=2P_2\Rightarrow -P_1+5P_2=30$.
---
Matriz dos coeficientes: $A=\begin{pmatrix}5&-1\\-1&5\end{pmatrix}$, com $\det A=25-1=24\neq 0$.
---
Cramer: $P_1=\dfrac{50\cdot 5-(-1)\cdot 30}{24}=\dfrac{280}{24}=\dfrac{35}{3}\approx 11{,}67$ e $P_2=\dfrac{5\cdot 30-50\cdot(-1)}{24}=\dfrac{200}{24}=\dfrac{25}{3}\approx 8{,}33$.
---
Verificação no mercado 1: $5\cdot\frac{35}{3}-\frac{25}{3}=\frac{150}{3}=50$. ✓
:::

## Aplicação 2: insumo-produto de Leontief

Numa economia com dois setores, parte do que cada um produz é insumo do outro. Seja $A$ a matriz dos coeficientes técnicos: $a_{ij}$ é quanto do setor $i$ se gasta para produzir uma unidade do setor $j$. Com demanda final $d$, o produto bruto $x$ satisfaz

$$
x=Ax+d\;\Rightarrow\;(I-A)\,x=d\;\Rightarrow\;x=(I-A)^{-1}d.
$$

:::exemplo Produção necessária
Com $A=\begin{pmatrix}0{,}2&0{,}3\\0{,}4&0{,}1\end{pmatrix}$ e demanda final $d=(100,\,50)$, qual a produção bruta de cada setor?
---
$I-A=\begin{pmatrix}0{,}8&-0{,}3\\-0{,}4&0{,}9\end{pmatrix}$ e $\det(I-A)=0{,}72-0{,}12=0{,}60$.
---
Cramer: $x_1=\dfrac{100\cdot 0{,}9-(-0{,}3)\cdot 50}{0{,}6}=\dfrac{105}{0{,}6}=175$ e $x_2=\dfrac{0{,}8\cdot 50-(-0{,}4)\cdot 100}{0{,}6}=\dfrac{80}{0{,}6}\approx 133{,}3$.
---
Note que o setor 1 precisa produzir **mais** que os 100 de demanda final (175), pois parte de seu produto é consumida como insumo pelos dois setores.
:::

## Questão no formato ANPEC (Tipo B)

```quiz-b
id: qb-matrizes
stem: |
  Seja $A=\begin{pmatrix}4&1\\2&3\end{pmatrix}$ e seja $(x,y)$ a solução de $4x+y=9$, $2x+3y=7$. Calcule $\det A + x + y$.
answer: 13
explanation: |
  $\det A=4\cdot 3-1\cdot 2=10$. Por Cramer: $x=\frac{9\cdot 3-1\cdot 7}{10}=2$ e $y=\frac{4\cdot 7-9\cdot 2}{10}=1$. Logo $10+2+1=13$.
```

## Erros que custam pontos

- Trocar o sinal na fórmula do determinante ($ad+bc$ em vez de $ad-bc$).
- Na inversa 2×2, esquecer de **trocar os sinais** de $b$ e $c$ e de **trocar de lugar** $a$ e $d$.
- Em Cramer, trocar a coluna errada ou esquecer de dividir pelo determinante **da matriz original**.
- Inverter na ordem errada: $(AB)^{-1}=B^{-1}A^{-1}$.

## Para treinar

1. Calcule $A^{-1}$ para $A=\begin{pmatrix}2&1\\1&3\end{pmatrix}$ e verifique que $A^{-1}A=I$. (Resposta: $\frac15\begin{pmatrix}3&-1\\-1&2\end{pmatrix}$.)
2. Para que valores de $k$ o sistema $x+ky=1,\; kx+4y=2$ **não** tem solução única? (Resposta: $k=\pm 2$.)
3. A implementação da regra de Cramer em Python está no Laboratório de programação, na lição de Python aplicada à Economia.
