---
id: macro-02-inflacao-juros
track: macro
title: Inflação, juros reais e metas — como o Banco Central controla preços
order: 2
seq: 20
minutes: { quick: 30, full: 85 }
objectives:
  - Calcular inflação acumulada compondo taxas e comparar com a soma simples
  - Usar a equação de Fisher exata e a aproximação para achar o juro real
  - Explicar como a Selic atua sobre a inflação (canais de transmissão)
  - Descrever o regime de metas de inflação e a lógica de expectativas
  - Interpretar a curva de Phillips de curto prazo e o papel das expectativas
cards:
  - front: "Equação de Fisher (exata)."
    back: "$1 + r = \\dfrac{1+i}{1+\\pi}$. A aproximação $r \\approx i - \\pi$ vale para taxas baixas e erra mais quando a inflação é alta."
  - front: "Por que inflação acumulada não é a soma das taxas anuais?"
    back: "Os preços se compõem: $(1+\\pi_1)(1+\\pi_2)-1$. Dois anos de 10% dão **21%**, não 20%."
  - front: "Como a Selic reduz a inflação?"
    back: "Encarece crédito e investimento, reduz consumo e demanda agregada, valoriza o câmbio (mais importados baratos) e **ancora expectativas** de inflação."
  - front: "O que é o regime de metas de inflação?"
    back: "O Banco Central persegue um número anunciado, com banda de tolerância, usando a taxa básica de juros. Desde 2025 a meta no Brasil é **contínua**: 3% com tolerância de 1,5 p.p. para cima ou para baixo."
  - front: "Curva de Phillips com expectativas."
    back: "$\\pi = \\pi^e - \\beta(u - u_n) + \\varepsilon$. Desemprego abaixo do natural eleva a inflação **acima** da esperada. No longo prazo a relação some se as expectativas se ajustam."
---

Inflação é a perda de poder de compra da moeda. A taxa de juros que você vê no banco é nominal. O que importa para quem poupa e para quem deve é o **juro real**, o que sobra depois de descontar a inflação. E o Banco Central controla a inflação mexendo na taxa de juros. Esta lição junta as duas pontas, com dados reais do Brasil.

Ao final, você calcula inflação acumulada e juro real sem errar a composição, e explica como a política monetária funciona.

## Medindo a inflação

No Brasil, a inflação oficial é o **IPCA**, calculado pelo IBGE. Ele mede a variação de preços de uma cesta de consumo de famílias com renda de 1 a 40 salários mínimos. As taxas anuais vão do pico de 1995 (22,4%, o primeiro ano cheio do real) à mínima de 1998 (1,7%). Explore a série e calcule o acumulado de qualquer período:

```sim
id: ipca-real
```

:::atencao Acumular é compor, não somar
Dois anos seguidos de 10% de inflação dão $1{,}10 \times 1{,}10 - 1 = 21\%$. Quem soma 10 + 10 = 20 subestima. Quanto maiores as taxas e mais longo o período, maior o erro. O simulador acima faz a composição para você: compare com a soma das barras.
:::

:::exemplo Poder de compra
A inflação foi de 10,06% em 2021 e de 5,78% em 2022. Qual foi a inflação acumulada nos dois anos?
---
Fator: $1{,}1006 \times 1{,}0578 = 1{,}1642$.
---
Acumulado: **16,4%**, acima da soma simples, 15,84%.
---
Isso significa que R\$ 100 de 2021 precisavam virar R\$ 116,42 no fim de 2022 para comprar o mesmo.
:::

## Juro real: a equação de Fisher

O juro nominal $i$ remunera em reais correntes. O juro real $r$ remunera em poder de compra:

$$
1 + r = \frac{1 + i}{1 + \pi}.
$$

Para taxas pequenas, $r \approx i - \pi$. Mas a forma exata é a correta quando a inflação é alta.

```sim
id: juros-reais
```

:::exemplo Aplicação a 15% com inflação de 5%
Qual o juro real?
---
Exato: $1{,}15/1{,}05 - 1 = 9{,}52\%$.
---
Aproximação: $15 - 5 = 10\%$. Erro de $0{,}48$ ponto percentual.
---
Com inflação de 20% e juro nominal de 30%, o exato é $1{,}30/1{,}20 - 1 = 8{,}33\%$ e a aproximação diz 10%. O erro cresce com a inflação.
:::

O juro real é o preço verdadeiro do dinheiro no tempo. Se o nominal fica **abaixo** da inflação, o juro real é negativo e quem poupa perde poder de compra.

## Como a Selic freia a inflação

A **Selic** é a taxa básica de juros da economia, fixada a cada reunião do Copom. Quando ela sobe:

- **Crédito e investimento** ficam mais caros; empresas e famílias adiam compras. A demanda agregada cai.
- O **câmbio** tende a se valorizar (aplicações em reais rendem mais), o que barateia importados.
- As **expectativas** de inflação se ancoram: se o público acredita que o Banco Central vai agir, reajusta preços e salários com menos pressa.
- O **custo da dívida pública** aumenta, já que boa parte dela é indexada à Selic. É um efeito fiscal da política monetária.

A Selic estava em 15% ao ano em dezembro de 2025, o maior nível desde 2006, depois de ter chegado a 10,5% em maio de 2024. A defasagem entre um aumento de juros e seu efeito pleno sobre a inflação é longa, em geral de vários trimestres.

## Metas de inflação

O Brasil adota metas desde 1999: o Conselho Monetário Nacional define a meta e o Banco Central usa a Selic para alcançá-la. Desde 2025 o sistema é de **meta contínua**: 3%, com tolerância de 1,5 ponto percentual para cima ou para baixo (de 1,5% a 4,5%).

:::intuicao O que as metas ancoram
Mais do que os juros do mês, a meta atua sobre **o que as pessoas esperam**. Se todos acham que a inflação vai ficar perto de 3%, os contratos e preços são reajustados a esse ritmo e a meta se cumpre sozinha. Credibilidade vale pontos de Selic.
:::

## Curva de Phillips

A versão com expectativas é:

$$
\pi = \pi^e - \beta\,(u - u_n) + \varepsilon,
$$

em que $u_n$ é a taxa natural de desemprego e $\varepsilon$ são choques de oferta. Desemprego abaixo do natural pressiona salários e preços acima do esperado. Mas se a inflação esperada se ajusta, a relação desaparece no longo prazo. Combater a inflação exige, no curto prazo, **abrir mão** de produto e emprego (a razão de sacrifício).

```quiz-a
id: qa-inflacao
stem: |
  Sobre inflação, juros reais e política monetária, julgue as afirmativas.
items:
  - { t: "Inflação de 10% em cada um de dois anos consecutivos resulta em inflação acumulada de 20%.", c: false }
  - { t: "Se o juro nominal é 10% e a inflação é 10%, o juro real exato é zero.", c: true }
  - { t: "Um aumento da Selic tende a reduzir a demanda agregada e a pressão inflacionária, com defasagem.", c: true }
  - { t: "A aproximação $r \\approx i - \\pi$ é exata para qualquer nível de inflação.", c: false }
  - { t: "Na curva de Phillips com expectativas adaptativas, é possível manter desemprego abaixo do natural sem aceleração da inflação.", c: false }
explanation: |
  **0.** O acumulado é $1{,}1^2 - 1 = 21\%$.
  **3.** A aproximação só vale para taxas pequenas; o erro é o produto $r\pi$ aproximadamente.
  **4.** Manter $u < u_n$ exige inflação acelerando, porque as expectativas se ajustam.
```

*Questão escrita para estudo; não é item oficial da ANPEC.*

<!--full-->

## Inflação de demanda e de custos

- **De demanda**: gasto agregado acima da capacidade de produção. A resposta clássica é elevar os juros.
- **De custos (choque de oferta)**: encarecimento de energia, alimentos, câmbio. Elevar a Selic reduz a demanda, mas não elimina o choque de custo, e o preço da correção é emprego.
- **Inercial**: reajustes por indexação à inflação passada, tema da lição do Plano Real.

## Expectativas e credibilidade

Se o Banco Central tem **credibilidade**, um choque temporário de preços não vira expectativa permanente. Se não tem, os agentes embutem o choque em salários e contratos, e a inflação persiste. Por isso a comunicação do Copom e a autonomia do Banco Central importam.

## Taxa de juros neutra

É a taxa real que **não estimula nem esfria** a economia no longo prazo. Se a Selic real está acima dela, a política é contracionista. Não é observável diretamente: é estimada por modelos.

## Erros que custam pontos

- Somar taxas em vez de compor.
- Usar $i - \pi$ como se fosse exato com inflação alta.
- Dizer que juros altos "geram" inflação sem distinguir o efeito sobre as **expectativas** e o efeito de custo da dívida.
- Confundir **meta** com **projeção** de inflação.

```quiz-b
id: qb-fisher
stem: |
  Uma aplicação rende 13,4% ao ano em termos nominais e a inflação do período é de 8%. Qual o juro real, em %?
answer: 5
explanation: |
  $1+r = 1{,}134/1{,}08 = 1{,}05$, logo $r = 5\%$.
```

## Como estudar este tema

No simulador de juros reais, escolha uma inflação alta (por exemplo, 20%) e veja o erro da aproximação crescer. No simulador do IPCA, compare 1995–1999 com 2015–2025: o acumulado do primeiro período é bem maior que o do segundo, embora o primeiro tenha apenas cinco anos.
