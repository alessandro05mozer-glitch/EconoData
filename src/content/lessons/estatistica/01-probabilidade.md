---
id: estat-01-probabilidade
track: estatistica
title: Probabilidade — eventos, contagem, condicional e Bayes
order: 1
seq: 6
minutes: { quick: 35, full: 95 }
objectives:
  - Descrever um experimento por seu espaço amostral e seus eventos
  - Calcular probabilidades por contagem quando os resultados são equiprováveis
  - Usar combinações e arranjos para contar casos
  - Calcular probabilidade condicional, testar independência e aplicar o teorema de Bayes
  - Entender a lei dos grandes números e o valor esperado
cards:
  - front: "Probabilidade de um evento quando os resultados são **equiprováveis**."
    back: "$P(A) = \\frac{\\text{casos favoráveis}}{\\text{casos possíveis}}$."
  - front: "Número de maneiras de escolher $k$ itens entre $n$, sem ordem."
    back: "$\\binom{n}{k} = \\frac{n!}{k!\\,(n-k)!}$."
  - front: "Regra da soma para dois eventos quaisquer."
    back: "$P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$."
  - front: "Probabilidade condicional e independência."
    back: "$P(A\\mid B)=\\dfrac{P(A\\cap B)}{P(B)}$. $A$ e $B$ são independentes se $P(A\\cap B)=P(A)P(B)$, ou seja, $P(A\\mid B)=P(A)$."
  - front: "Teorema de Bayes."
    back: "$P(A\\mid B)=\\dfrac{P(B\\mid A)\\,P(A)}{P(B\\mid A)\\,P(A)+P(B\\mid A^c)\\,P(A^c)}$."
---

Um banco aprova ou nega crédito sem saber quem vai pagar. Um economista avalia uma política sem saber o que vai acontecer. Em ambos, a ferramenta é a **probabilidade**: uma linguagem precisa para falar do que é incerto. Ela é a base de toda a estatística e da econometria que virão depois.

Ao final, você conta casos sem listar tudo, calcula probabilidades condicionais e usa o teorema de Bayes para atualizar uma crença com uma evidência nova.

## Experimento, espaço amostral e evento

Um **experimento aleatório** é aquele cujo resultado não podemos prever com certeza, mas cujos resultados possíveis conhecemos. O conjunto de todos eles é o **espaço amostral** $\Omega$. Um **evento** é um subconjunto de $\Omega$: uma pergunta do tipo "aconteceu isto?".

:::exemplo Montando o espaço amostral
Lançamos dois dados honestos. Descreva $\Omega$ e o evento "a soma é 7".
---
Cada resultado é um **par ordenado** $(d_1,d_2)$ com $d_1,d_2\in\{1,\dots,6\}$. Há $6\times 6=36$ pares, e todos têm a mesma chance, $1/36$.
---
O evento "soma 7" é $\{(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)\}$: 6 pares.
---
Logo $P(\text{soma }7)=\dfrac{6}{36}=\dfrac16$.
:::

## Os axiomas

1. $P(A)\ge 0$ para todo evento $A$;
2. $P(\Omega)=1$;
3. se $A$ e $B$ não podem ocorrer juntos, $P(A\cup B)=P(A)+P(B)$.

Deles saem as regras de uso diário: $P(A^c)=1-P(A)$ e, para eventos quaisquer, $P(A\cup B)=P(A)+P(B)-P(A\cap B)$. Subtrai-se a interseção porque ela foi contada duas vezes.

## Resultados equiprováveis e contagem

Quando todos os resultados têm a mesma chance,

$$
P(A)=\frac{\#A}{\#\Omega}.
$$

:::atencao Equiprovável de quê?
Na soma de dois dados, as somas **não** têm a mesma chance: a soma 7 tem 6 pares, e a soma 2 tem só 1. Os **pares** é que são equiprováveis. Escolha o espaço amostral em que a hipótese vale, e conte nele.
:::

A lei dos grandes números diz que, repetindo o experimento muitas vezes, a frequência observada se aproxima da probabilidade teórica. Jogue os dados e veja:

```sim
id: dados-probabilidade
```

## Contando sem listar

Para contar os casos usamos duas ferramentas. Quando a **ordem importa**, é um *arranjo*: escolher e ordenar $k$ entre $n$ dá $n(n-1)\cdots(n-k+1)$. Quando a ordem **não** importa, é uma *combinação*:

$$
\binom{n}{k}=\frac{n!}{k!\,(n-k)!}
$$

Exemplo: de 10 pessoas, formar uma comissão de 3 (sem ordem) dá $\binom{10}{3}=120$ maneiras; já escolher presidente, vice e tesoureiro (com ordem) dá $10\cdot 9\cdot 8=720$.

:::exemplo Quantas caras
Em 4 lançamentos de uma moeda honesta, qual a probabilidade de exatamente 2 caras?
---
O espaço amostral tem $2^4=16$ sequências equiprováveis.
---
Uma sequência com exatamente 2 caras é determinada pelas posições das caras: escolher 2 posições entre 4, ou seja, $\binom{4}{2}=6$ sequências.
---
$P=\dfrac{6}{16}=\dfrac38=0{,}375$.
:::

## Probabilidade condicional

Saber que algo aconteceu muda as probabilidades. A probabilidade de $A$ **dado que** $B$ ocorreu restringe o espaço amostral a $B$:

$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)},\qquad P(B)>0.
$$

:::exemplo Duas bolas sem reposição
Uma urna tem 5 bolas vermelhas e 3 azuis. Tiram-se duas, sem devolver. Qual a probabilidade de ambas serem vermelhas?
---
Na primeira, $P(V_1)=\dfrac58$.
---
Dado que a primeira foi vermelha, sobram 4 vermelhas em 7: $P(V_2\mid V_1)=\dfrac47$.
---
Regra do produto: $P(V_1\cap V_2)=P(V_1)\,P(V_2\mid V_1)=\dfrac58\cdot\dfrac47=\dfrac{20}{56}=\dfrac{5}{14}$.
:::

## Independência

Dois eventos são **independentes** se saber de um não altera a probabilidade do outro: $P(A\cap B)=P(A)\,P(B)$, equivalentemente $P(A\mid B)=P(A)$.

:::atencao Independente não é "mutuamente exclusivo"
Eventos mutuamente exclusivos **não** podem ocorrer juntos, $P(A\cap B)=0$. Se ambos têm probabilidade positiva, então **não** são independentes: saber que um ocorreu garante que o outro não ocorreu.
:::

## Teorema de Bayes

Muitas vezes sabemos $P(B\mid A)$ (por exemplo, a taxa de acerto de um teste) e queremos $P(A\mid B)$ (a probabilidade de a hipótese ser verdadeira, dado o resultado do teste). O teorema de Bayes faz a inversão:

$$
P(A\mid B)=\frac{P(B\mid A)\,P(A)}{P(B\mid A)\,P(A)+P(B\mid A^c)\,P(A^c)}
$$

:::exemplo Um modelo de crédito
Dois por cento dos clientes de um banco dão calote. O modelo de risco sinaliza 90% dos que darão calote, mas também sinaliza 10% dos bons pagadores. Um cliente foi sinalizado. Qual a probabilidade de dar calote?
---
Dados: $P(C)=0{,}02$, $P(S\mid C)=0{,}90$ e $P(S\mid C^c)=0{,}10$.
---
Probabilidade total de ser sinalizado: $P(S)=0{,}90\cdot 0{,}02+0{,}10\cdot 0{,}98=0{,}018+0{,}098=0{,}116$.
---
Bayes: $P(C\mid S)=\dfrac{0{,}018}{0{,}116}\approx 0{,}155$.
---
Só cerca de **15,5%** dos sinalizados vão mesmo dar calote, apesar de o modelo acertar 90% dos caloteiros. O motivo é que os caloteiros são raros (2%), então os falsos alarmes entre os 98% de bons pagadores dominam.
:::

:::resumo Para levar
Não confunda $P(B\mid A)$ com $P(A\mid B)$. A taxa de acerto do teste e a probabilidade de a hipótese ser verdadeira dado um resultado positivo são coisas diferentes, e a diferença depende da **frequência-base** do evento raro.
:::

## Questão no formato ANPEC (Tipo A)

```quiz-a
id: qa-probabilidade
stem: |
  Sejam $A$ e $B$ eventos de um espaço amostral, com $P(A)=0{,}4$, $P(B)=0{,}5$ e $P(A\cap B)=0{,}2$. Julgue as afirmativas.
items:
  - { t: "$P(A\\cup B)=0{,}7$.", c: true }
  - { t: "$A$ e $B$ são independentes.", c: true }
  - { t: "$P(A\\mid B)=0{,}4$.", c: true }
  - { t: "$A$ e $B$ são mutuamente exclusivos.", c: false }
  - { t: "$P(A^c)=0{,}5$.", c: false }
explanation: |
  **0.** $0{,}4+0{,}5-0{,}2=0{,}7$.
  **1.** $P(A)P(B)=0{,}4\cdot 0{,}5=0{,}2=P(A\cap B)$.
  **2.** $P(A\mid B)=0{,}2/0{,}5=0{,}4$, igual a $P(A)$, coerente com a independência.
  **3.** Mutuamente exclusivos exigiria $P(A\cap B)=0$.
  **4.** $P(A^c)=1-0{,}4=0{,}6$.
```

*Questão escrita para estudo; não é item oficial da ANPEC.*

<!--full-->

## Valor esperado

A **esperança** de uma variável aleatória é a média ponderada de seus valores, com pesos iguais às probabilidades: $E[X]=\sum_x x\,P(X=x)$. Para a soma $S$ de dois dados, as probabilidades são $\frac{1}{36},\frac{2}{36},\dots,\frac{6}{36},\dots,\frac{1}{36}$ para $S=2,\dots,12$, e

$$
E[S]=\frac{2\cdot1+3\cdot2+4\cdot3+5\cdot4+6\cdot5+7\cdot6+8\cdot5+9\cdot4+10\cdot3+11\cdot2+12\cdot1}{36}=\frac{252}{36}=7.
$$

É o que você viu no simulador: a média observada converge para $7$. A esperança é **linear**: $E[X+Y]=E[X]+E[Y]$, então $E[S]=3{,}5+3{,}5$.

## Questão no formato ANPEC (Tipo B)

```quiz-b
id: qb-moeda
stem: |
  Uma moeda honesta é lançada 4 vezes. Seja $p$ a probabilidade de saírem exatamente duas caras. Calcule $16p$.
answer: 6
explanation: |
  Há $2^4=16$ sequências equiprováveis e $\binom{4}{2}=6$ delas têm exatamente duas caras. Logo $p=6/16$ e $16p=6$.
```

```quiz-b
id: qb-bayes
stem: |
  Dez por cento dos candidatos a uma vaga são qualificados. Um teste aprova 90% dos qualificados e 5% dos não qualificados. Seja $p$ a probabilidade de um candidato aprovado ser qualificado. Calcule $3p$.
answer: 2
explanation: |
  $P(A)=0{,}9\cdot0{,}1+0{,}05\cdot0{,}9=0{,}09+0{,}045=0{,}135$. Então $p=\dfrac{0{,}09}{0{,}135}=\dfrac23$ e $3p=2$.
```

## Erros que custam pontos

- Tratar como equiprováveis resultados que não são. Em "soma de dois dados", as somas **não** têm a mesma chance; os 36 pares é que têm.
- Confundir combinação (ordem não importa) com arranjo (ordem importa).
- Somar probabilidades de eventos que podem ocorrer juntos sem subtrair a interseção.
- Usar $P(A\cap B)=P(A)P(B)$ sem saber que os eventos são independentes. A regra geral é $P(A\cap B)=P(A)\,P(B\mid A)$.
- Trocar $P(A\mid B)$ por $P(B\mid A)$ (a falácia do "promotor").

## Como verificar uma conta

Uma boa prática é **conferir** uma conta de probabilidade por enumeração ou simulação no computador. No Laboratório de programação, a lição de Python aplicada à Economia faz isso com os dados deste capítulo: você conta os 36 pares e simula milhares de jogadas.
