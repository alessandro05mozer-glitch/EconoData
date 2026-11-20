---
id: estatistica-02-normal-tcl
track: estatistica
title: Variáveis aleatórias, distribuição normal e teorema central do limite
order: 2
seq: 23
minutes: { quick: 30, full: 85 }
objectives:
  - Calcular esperança e variância de variáveis discretas e usar suas propriedades
  - Padronizar uma variável normal e consultar probabilidades por z
  - Enunciar o teorema central do limite e aplicá-lo à média amostral
  - Calcular o erro padrão da média e explicar por que ele cai com √n
  - Distinguir distribuição populacional de distribuição amostral
cards:
  - front: "Esperança e variância de $aX + b$."
    back: "$E[aX+b] = aE[X]+b$ e $Var(aX+b) = a^2 Var(X)$. A constante $b$ não altera a variância."
  - front: "Como padronizar uma normal?"
    back: "$Z = \\dfrac{X - \\mu}{\\sigma} \\sim N(0,1)$. Mede quantos desvios-padrão $X$ está da média."
  - front: "Regra empírica da normal."
    back: "Aproximadamente **68%** dos valores dentro de 1 desvio, **95%** dentro de 2 (mais precisamente 1,96) e **99,7%** dentro de 3."
  - front: "Teorema central do limite."
    back: "A média de uma amostra grande de variáveis independentes com variância finita tem distribuição **aproximadamente normal**, qualquer que seja a distribuição original."
  - front: "Erro padrão da média."
    back: "$\\sigma/\\sqrt{n}$. Para dividir o erro pela metade, é preciso **quadruplicar** a amostra."
---

Quase toda conclusão estatística em Economia fala de **médias**: renda média, inflação média, efeito médio de um programa. Para saber o quanto confiar em uma média calculada com uma amostra, é preciso saber como ela se distribui. O teorema central do limite diz que a distribuição das médias é aproximadamente normal, mesmo quando os dados originais não são. Esse resultado sustenta intervalos de confiança e testes de hipóteses.

Ao final, você padroniza uma normal sem hesitar, calcula o erro padrão e explica o teorema em uma frase.

## Esperança e variância

A **esperança** de uma variável discreta é a média ponderada pelas probabilidades:

$$
E[X] = \sum x_i\,P(X = x_i),\qquad Var(X) = E[X^2] - (E[X])^2.
$$

Propriedades que sempre caem: $E[aX + b] = aE[X] + b$ e $Var(aX + b) = a^2\,Var(X)$. Para **independentes**, $Var(X+Y) = Var(X) + Var(Y)$.

:::exemplo Esperança de um dado
Um dado honesto tem $E[X] = 3{,}5$ e $E[X^2] = 91/6$. Qual a variância?
---
$Var(X) = 91/6 - 3{,}5^2 = 15{,}1667 - 12{,}25 = 2{,}9167$.
---
Desvio-padrão $\approx 1{,}71$.
---
Para a soma de dois dados independentes: $E = 7$ e $Var = 2 \times 2{,}9167 = 5{,}83$.
:::

## A distribuição normal

A normal tem forma de sino, é simétrica em torno de $\mu$ e é descrita por dois números: $\mu$ e $\sigma$. Toda normal vira a **normal padrão** $N(0,1)$ com a transformação

$$
Z = \frac{X - \mu}{\sigma}.
$$

O valor $z$ diz a quantos desvios-padrão da média o ponto está. A regra empírica ajuda a estimar de cabeça: cerca de 68% dentro de $\pm 1\sigma$, 95% dentro de $\pm 2\sigma$ (mais exatamente $\pm 1{,}96\sigma$) e 99,7% dentro de $\pm 3\sigma$.

:::exemplo Notas padronizadas
Um teste tem média 100 e desvio-padrão 15. Qual o $z$ de uma nota 130? Que fração dos alunos tira mais que isso?
---
$z = (130 - 100)/15 = 2$.
---
Pela regra empírica, 95% ficam dentro de $\pm 2\sigma$, então cerca de 2,5% ficam acima de 130.
---
A tabela dá $P(Z > 2) = 0{,}0228$, ou seja, 2,28%.
:::

## O teorema central do limite

Sejam $X_1,\dots,X_n$ independentes, de mesma distribuição, com média $\mu$ e variância $\sigma^2$ finita. A média amostral satisfaz, para $n$ grande:

$$
\bar X \;\approx\; N\!\left(\mu,\ \frac{\sigma^2}{n}\right).
$$

O **erro padrão** é $\sigma/\sqrt{n}$. Ele mede o quanto a média muda de amostra para amostra.

No simulador, a população é uma exponencial: muito assimétrica, longe de um sino. Mesmo assim, aumente $n$.

```sim
id: tcl
```

:::intuicao Por que o sino aparece
Em uma média, valores muito altos e muito baixos tendem a **se compensar**. As médias se concentram perto de $\mu$, com poucos extremos. Isso vale quase qualquer que seja a forma dos dados individuais, e é o motivo de a normal ser tão onipresente.
:::

:::atencao Dois "desvios" diferentes
$\sigma$ é a dispersão dos **dados**. $\sigma/\sqrt{n}$ é a dispersão da **média**. Confundi-los é o erro mais comum em questões de inferência. Com $n$ grande, os dados continuam dispersos; só a média se estabiliza.
:::

```quiz-a
id: qa-tcl
stem: |
  Sobre a distribuição normal e o teorema central do limite, julgue as afirmativas.
items:
  - { t: "Se $X \\sim N(\\mu, \\sigma^2)$, então $(X-\\mu)/\\sigma$ tem distribuição normal padrão.", c: true }
  - { t: "O teorema central do limite exige que os dados individuais tenham distribuição normal.", c: false }
  - { t: "Quadruplicar o tamanho da amostra reduz o erro padrão da média à metade.", c: true }
  - { t: "A variância da média amostral é $\\sigma^2/n$ para observações independentes.", c: true }
  - { t: "Se os dados têm desvio-padrão 10 e $n=25$, o erro padrão da média é 10.", c: false }
explanation: |
  **1.** O TCL vale para a **média**, qualquer que seja a distribuição original (com variância finita).
  **4.** O erro padrão é $10/\sqrt{25} = 2$.
```

*Questão escrita para estudo; não é item oficial da ANPEC.*

<!--full-->

## Distribuições a conhecer

- **Binomial**: número de sucessos em $n$ tentativas independentes com probabilidade $p$. $E = np$; $Var = np(1-p)$.
- **Uniforme**: todos os valores de um intervalo igualmente prováveis.
- **Qui-quadrado, t e F**: derivadas da normal; usadas em testes. A $t$ de Student aparece quando a variância é estimada com amostra pequena.

## Lei dos grandes números e TCL: a diferença

A **lei dos grandes números** diz que a média amostral **converge** para $\mu$ quando $n$ cresce. O **TCL** diz **como** ela flutua em torno de $\mu$: de forma aproximadamente normal, com desvio $\sigma/\sqrt{n}$. A primeira garante o lugar para onde vamos; o segundo, a precisão da estimativa.

## Aproximação normal da binomial

Para $n$ grande e $p$ não extremo, $B(n,p) \approx N(np, np(1-p))$. Foi o primeiro exemplo do TCL, pois uma binomial é uma soma de variáveis de Bernoulli.

## Erros que custam pontos

- Usar $\sigma$ no lugar de $\sigma/\sqrt{n}$ para a média.
- Esquecer de padronizar antes de usar a tabela.
- Somar desvios-padrão em vez de **variâncias** (de variáveis independentes).
- Dizer que o TCL "torna normais os dados". Ele torna normal a **média**.

```quiz-b
id: qb-zscore
stem: |
  As notas de um exame seguem uma normal com média 100 e desvio-padrão 15. Qual o valor de $z$ para a nota 130?
answer: 2
explanation: |
  $z = (130 - 100)/15 = 2$.
```

## Como estudar este tema

No simulador, comece com $n=1$ (o histograma é a própria exponencial) e vá aumentando. Anote a partir de qual $n$ o sino lhe parece razoável. Depois confira se o desvio observado fica perto de $1/\sqrt{n}$.
