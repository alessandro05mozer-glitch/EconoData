---
id: ecobr-03-desigualdade
track: ecobr
title: Desigualdade de renda — curva de Lorenz, Gini e como lê-los
order: 3
seq: 26
minutes: { quick: 25, full: 65 }
objectives:
  - Construir e interpretar uma curva de Lorenz
  - Calcular o índice de Gini a partir da área sob a curva
  - Usar outros indicadores (razão de Palma, participação dos decis)
  - Reconhecer limites de cada indicador de desigualdade
  - Distinguir desigualdade de renda de pobreza
cards:
  - front: "O que a curva de Lorenz mostra?"
    back: "A fração acumulada da renda recebida pelos $p$ **mais pobres**, em função da fração acumulada da população. A diagonal é a igualdade perfeita."
  - front: "Como se calcula o Gini a partir da curva de Lorenz?"
    back: "$G = A/(A+B)$ com $A$ a área entre a diagonal e a curva e $B$ a área abaixo da curva. Como $A + B = 1/2$, $G = 1 - 2B$."
  - front: "Quais os valores extremos do Gini?"
    back: "0 é igualdade perfeita; 1 (ou 100) é um indivíduo com toda a renda. Valores usuais ficam entre 0,25 e 0,65."
  - front: "O que é a razão de Palma?"
    back: "Participação dos **10% mais ricos** dividida pela dos **40% mais pobres**. Foca nas pontas, onde a mudança acontece, e não no meio."
  - front: "Desigualdade e pobreza são a mesma coisa?"
    back: "**Não.** Desigualdade é a distribuição relativa da renda; pobreza é o nível absoluto abaixo de uma linha. A renda média pode subir, reduzir a pobreza e a desigualdade permanecer alta."
---

"A renda média do país é X" esconde mais do que mostra. Duas economias com a mesma renda média podem ter vidas muito distintas dependendo de **como** a renda se distribui. A curva de Lorenz e o índice de Gini são as ferramentas padrão para medir isso, e aparecem em questões de Economia Brasileira, de desenvolvimento e de bem-estar.

Ao final, você lê uma curva de Lorenz, interpreta um Gini e sabe o que cada indicador deixa de mostrar.

## A curva de Lorenz

Ordene a população da **mais pobre à mais rica**. No eixo horizontal, a fração acumulada da população; no vertical, a fração acumulada da renda recebida por ela. Se todos ganhassem o mesmo, os 50% mais pobres receberiam 50% da renda: a curva seria a **diagonal**. Quanto mais desigual, mais a curva se curva para baixo.

## O índice de Gini

O Gini mede a distância entre a curva e a diagonal. Chamando de $A$ a área entre as duas e de $B$ a área sob a curva:

$$
G = \frac{A}{A + B} = 2A = 1 - 2B.
$$

```sim
id: lorenz-gini
```

Mexa no controle: com $k=1$ a curva é a diagonal e o Gini é 0. Com $k=3$, o Gini é 0,5, e os 50% mais pobres recebem só 12,5% da renda.

:::exemplo Gini de uma curva simples
Se a curva de Lorenz é $L(p) = p^2$, qual o Gini?
---
Área sob a curva: $B = \int_0^1 p^2\,dp = 1/3$.
---
$G = 1 - 2B = 1 - 2/3 = 1/3 \approx 0{,}33$.
---
Os 50% mais pobres recebem $L(0{,}5) = 0{,}25$, ou 25% da renda.
---
Para $L(p)=p^k$ vale $G = (k-1)/(k+1)$: com $k=3$, $G=0{,}5$.
:::

:::intuicao Duas formas de pensar o Gini
Geometricamente, é a **área** entre a curva e a igualdade. Estatisticamente, é a **diferença média** entre as rendas de dois indivíduos sorteados ao acaso, dividida por duas vezes a renda média. As duas definições coincidem.
:::

## Outros indicadores

- **Participação dos decis**: quanto da renda vai para os 10% mais ricos ou os 40% mais pobres.
- **Razão de Palma**: renda dos 10% mais ricos dividida pela dos 40% mais pobres. A ideia é que a **parte do meio** da distribuição é relativamente estável entre países, e a diferença está nas pontas.
- **Razão 90/10**: o rendimento do percentil 90 sobre o do percentil 10.

:::atencao O Gini esconde onde a desigualdade está
Curvas de Lorenz **diferentes** podem ter o **mesmo** Gini (uma com um topo muito rico e outra com uma base muito pobre). O Gini também é pouco sensível a mudanças nos extremos. Por isso se complementa com participação de decis e razão de Palma. Outro ponto: as pesquisas domiciliares costumam subestimar as maiores rendas, e registros tributários mostram desigualdade maior.
:::

## Desigualdade não é pobreza

A pobreza mede quantas pessoas estão abaixo de uma **linha absoluta**. A desigualdade mede a **distância relativa** entre quem tem mais e quem tem menos. Uma economia que cresce e eleva a renda de todos reduz a pobreza mesmo sem mudar o Gini. Uma transferência de renda do topo para a base reduz a desigualdade e pode reduzir a pobreza sem mudar a renda média.

```quiz-a
id: qa-desigualdade
stem: |
  Sobre a curva de Lorenz e o índice de Gini, julgue as afirmativas.
items:
  - { t: "Se todos os indivíduos têm a mesma renda, a curva de Lorenz coincide com a diagonal e o Gini é zero.", c: true }
  - { t: "Duas distribuições com o mesmo Gini têm a mesma curva de Lorenz.", c: false }
  - { t: "Quanto mais a curva de Lorenz se afasta da diagonal, maior o Gini.", c: true }
  - { t: "O Gini diz o nível de pobreza absoluta de um país.", c: false }
  - { t: "Se a renda de todos dobra, o Gini se altera.", c: false }
explanation: |
  **1.** Curvas diferentes podem gerar o mesmo Gini, razão pela qual há outros indicadores.
  **3.** O Gini é uma medida **relativa**, não informa o nível de renda nem de pobreza.
  **4.** O Gini é invariante a mudanças proporcionais de escala: dobrar todas as rendas não muda as participações.
```

*Questão escrita para estudo; não é item oficial da ANPEC.*

<!--full-->

## Cálculo discreto do Gini

Para $n$ indivíduos com rendas $y_1\le\dots\le y_n$:

$$
G = \frac{\sum_i \sum_j |y_i - y_j|}{2\,n^2\,\bar y}.
$$

É a diferença média entre pares, relativa à renda média. Para pouca gente dá para fazer à mão; para milhões de observações usa-se código. Esse cálculo vira exercício de programação na trilha de Python.

## Transferências de Pigou–Dalton

Uma boa medida de desigualdade deve **cair** quando se transfere renda de um mais rico para um mais pobre, desde que a ordem não se inverta (princípio de Pigou–Dalton). O Gini satisfaz esse princípio, mas é menos sensível a transferências nas pontas do que no meio.

## Fontes de dados no Brasil

No Brasil, indicadores de desigualdade saem de pesquisas domiciliares do IBGE (como a PNAD Contínua) e, mais recentemente, de combinações com dados do Imposto de Renda, que captam melhor as rendas altas. Ao citar um número de Gini, convém dizer a **fonte** e se ele usa renda **domiciliar per capita** ou outra definição.

## Erros que custam pontos

- Ler o Gini como porcentagem da renda detida pelo topo.
- Confundir os eixos (a curva é **acumulada**, dos mais pobres aos mais ricos).
- Achar que Gini menor significa menos pobreza.
- Esquecer que $A + B = 1/2$ e dobrar a área errada.

```quiz-b
id: qb-gini
stem: |
  A curva de Lorenz de um país é $L(p) = p^3$. Qual o Gini, multiplicado por 100?
answer: 50
explanation: |
  Para $L(p) = p^k$, $G = (k-1)/(k+1) = 2/4 = 0{,}5$, ou 50.
```

## Como estudar este tema

Mude o parâmetro do simulador e anote o Gini e a renda dos 50% mais pobres para três valores. Depois verifique à mão, integrando $p^k$, que a fórmula $(k-1)/(k+1)$ está certa.
