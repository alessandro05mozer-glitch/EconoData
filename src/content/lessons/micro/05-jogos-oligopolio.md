---
id: micro-05-jogos-oligopolio
track: micro
title: Teoria dos jogos e oligopólio — Nash, dilema dos prisioneiros e Cournot
order: 5
seq: 19
minutes: { quick: 30, full: 85 }
objectives:
  - Montar a matriz de pagamentos e achar estratégias dominantes
  - Encontrar equilíbrios de Nash em estratégias puras por melhor resposta
  - Explicar o dilema dos prisioneiros e por que cartéis são instáveis
  - Resolver o duopólio de Cournot e comparar com monopólio e concorrência
  - Reconhecer o papel da repetição do jogo na cooperação
cards:
  - front: "O que é um equilíbrio de Nash?"
    back: "Perfil de estratégias em que **cada jogador responde otimamente** ao que o outro faz. Ninguém ganha mudando sozinho."
  - front: "Estratégia dominante."
    back: "A que é **a melhor, qualquer que seja a escolha do outro**. Se existe para os dois, o equilíbrio é o par de estratégias dominantes."
  - front: "Por que o dilema dos prisioneiros é um dilema?"
    back: "O equilíbrio (cada um trai) dá pagamentos **piores** para os dois do que cooperar. Racionalidade individual leva a um resultado coletivamente pior."
  - front: "Duopólio de Cournot: o que cada firma escolhe?"
    back: "A **quantidade**, tomando a quantidade da rival como dada. A função de melhor resposta de cada uma resulta da maximização de lucro."
  - front: "Ordem das quantidades: monopólio, Cournot, concorrência."
    back: "$Q_m < Q_{Cournot} < Q_c$. O preço faz o caminho inverso. O Cournot fica entre os dois extremos."
---

Em competição entre poucas empresas, o resultado de cada uma depende do que as outras fazem. Preço, propaganda, entrada em mercado: todas as decisões são **estratégicas**. A teoria dos jogos é a ferramenta que organiza esse raciocínio, e o equilíbrio de Nash é o conceito central. Ele cai quase todo ano na ANPEC.

Ao final, você acha o equilíbrio de qualquer jogo 2×2, explica por que cartéis desmancham e resolve o duopólio de Cournot.

## Os elementos de um jogo

Um jogo tem **jogadores**, **estratégias** e **pagamentos**. Na forma normal, os pagamentos vão numa matriz: cada célula traz o pagamento do jogador de linha e depois o do jogador de coluna.

Uma estratégia é **dominante** se for a melhor qualquer que seja a escolha do outro. Quando existe, a decisão fica simples. Quando não existe, procuramos o equilíbrio de Nash.

## Equilíbrio de Nash: o método da melhor resposta

1. Para **cada coluna**, marque a melhor resposta do jogador de linha (o maior pagamento dele naquela coluna).
2. Para **cada linha**, marque a melhor resposta do jogador de coluna.
3. Toda célula com **as duas marcas** é um equilíbrio de Nash em estratégias puras.

Use o jogo abaixo para praticar. Troque de jogo e **preveja** o equilíbrio antes de olhar.

```sim
id: jogo-nash
```

:::intuicao Por que o equilíbrio é "estável"
Em um equilíbrio de Nash, se você disser a cada jogador o que o outro vai fazer, **ninguém quer mudar**. Não significa que o resultado é bom, só que ninguém consegue melhorar sozinho.
:::

## O dilema dos prisioneiros

Dois suspeitos são interrogados separadamente. Calar dá pena leve para os dois, trair e o outro calar libera quem trai, e se os dois traem, ambos ficam com pena intermediária. Trair é **dominante** para os dois, então o equilíbrio é (trair, trair). Os dois ficam pior do que em (calar, calar).

A mesma estrutura descreve um **cartel**. Duas empresas combinam manter o preço alto. Cada uma, individualmente, ganha ao baixar o preço se a outra mantiver. Sem punição, o acordo desmancha. Por isso cartéis precisam de mecanismos para fiscalizar o acordo. Além disso, são proibidos pela legislação de defesa da concorrência, justamente porque, quando funcionam, o consumidor paga mais.

## Cournot: duopólio em quantidades

Duas firmas produzem o mesmo bem, escolhem **quantidades** ao mesmo tempo e o preço do mercado é $P = a - Q_1 - Q_2$. O custo marginal é $c$, igual para as duas.

A firma 1 maximiza $\pi_1 = (a - q_1 - q_2 - c)\,q_1$ tomando $q_2$ como dado. A condição de primeira ordem dá a **função de melhor resposta**:

$$
q_1 = \frac{a - c - q_2}{2}.
$$

Se $q_2$ sobe, a melhor resposta de $q_1$ **cai**: as quantidades são substitutas estratégicas.

:::exemplo Cournot com demanda P = 100 − Q e c = 10
Ache o equilíbrio e compare com monopólio e concorrência.
---
Melhor resposta da firma 1: $q_1 = (90 - q_2)/2$. Por simetria, a firma 2 tem a mesma.
---
No equilíbrio, $q_1 = q_2 = q$: $q = (90-q)/2 \Rightarrow 3q = 90 \Rightarrow q = 30$.
---
Quantidade total $60$; preço $P = 100 - 60 = 40$; lucro de cada uma $(40-10)\cdot 30 = 900$.
---
Monopólio: $RMg = 100 - 2Q = 10 \Rightarrow Q = 45$, $P = 55$. Concorrência: $P = c = 10 \Rightarrow Q = 90$.
---
Ordem das quantidades: $45 < 60 < 90$. Ordem dos preços: $55 > 40 > 10$.
:::

:::pense Pare e pense
Se as duas firmas se juntassem e produzissem o total do monopólio, quanto cada uma produziria? Por que isso não é equilíbrio?
---
Cada uma produziria $45/2 = 22{,}5$. Mas a melhor resposta a $q_2 = 22{,}5$ é $q_1 = (90-22{,}5)/2 = 33{,}75 > 22{,}5$. Cada firma tem incentivo a produzir mais, do mesmo jeito que no dilema dos prisioneiros.
:::

```quiz-a
id: qa-jogos
stem: |
  Julgue as afirmativas sobre jogos e oligopólio.
items:
  - { t: "Todo jogo possui um equilíbrio de Nash em estratégias puras.", c: false }
  - { t: "No dilema dos prisioneiros, o equilíbrio de Nash é Pareto-ineficiente.", c: true }
  - { t: "Se um jogador possui estratégia dominante, ele a joga no equilíbrio de Nash.", c: true }
  - { t: "No equilíbrio de Cournot simétrico, o preço fica abaixo do preço de monopólio e acima do competitivo.", c: true }
  - { t: "No modelo de Cournot as firmas escolhem preços simultaneamente.", c: false }
explanation: |
  **0.** Há jogos sem equilíbrio em estratégias puras (par ou ímpar). Em estratégias mistas todo jogo finito tem equilíbrio.
  **4.** No Cournot a variável de decisão é a quantidade. Escolher preços é o modelo de Bertrand, cujo equilíbrio com bens homogêneos e mesmo custo leva ao preço igual ao custo marginal.
```

*Questão escrita para estudo; não é item oficial da ANPEC.*

<!--full-->

## Jogos repetidos

Se o dilema se repete **indefinidamente** e os jogadores valorizam o futuro, a cooperação pode se sustentar com estratégias de punição: "coopero enquanto você cooperar; se trair, traio para sempre" (*grim trigger*) ou a mais branda *tit-for-tat*. Quanto mais paciente o jogador (fator de desconto $\delta$ alto), mais fácil sustentar o acordo. Num jogo repetido um número **finito e conhecido** de vezes, a indução retroativa leva de volta ao equilíbrio não cooperativo.

## Estratégias mistas

No par ou ímpar não há equilíbrio puro. Cada jogador sorteia sua jogada de modo a deixar o outro **indiferente** entre as opções. No jogo do exemplo do simulador, cada um joga par com probabilidade $1/2$. Em um 2×2 sem equilíbrio puro, o misto sempre existe.

## Bertrand e preços

Se duas firmas com bens idênticos e mesmo custo marginal competem em **preços**, nenhuma tem incentivo a cobrar acima do custo, pois a rival cobraria um centavo a menos e levaria o mercado. O equilíbrio é $P = CMg$, o mesmo da concorrência perfeita, mesmo com apenas duas firmas. É o **paradoxo de Bertrand**.

## Erros que custam pontos

- Marcar só uma das melhores respostas e declarar equilíbrio.
- Confundir **equilíbrio de Nash** com **ótimo coletivo**.
- Esquecer que, em Cournot, cada firma toma a quantidade da **rival** como dada, e não a sua própria.
- Usar a quantidade de monopólio como se fosse a de Cournot.

```quiz-b
id: qb-cournot
stem: |
  Duas firmas idênticas competem à la Cournot. A demanda é $P = 120 - Q$, com $Q = q_1 + q_2$, e o custo marginal é 30. Qual a quantidade produzida por cada firma?
answer: 30
explanation: |
  Melhor resposta: $q_1 = (120 - 30 - q_2)/2$. No equilíbrio simétrico $q = (90-q)/2$, logo $q = 30$.
```

## Como estudar este tema

Monte a matriz e marque as melhores respostas **a lápis**, sempre. Para Cournot, decore a ordem Monopólio < Cournot < Concorrência para a quantidade e a inversa para o preço.
