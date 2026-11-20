---
id: micro-04-monopolio
track: micro
title: Monopólio — poder de mercado, receita marginal e perda de peso morto
order: 4
seq: 18
minutes: { quick: 30, full: 80 }
objectives:
  - Derivar a receita marginal de uma demanda linear e explicar por que ela fica abaixo da demanda
  - Achar quantidade, preço e lucro do monopolista com RMg = CMg
  - Calcular a perda de peso morto e comparar com a concorrência perfeita
  - Usar o índice de Lerner e sua relação com a elasticidade
  - Descrever a discriminação de preços e a regulação de monopólios naturais
cards:
  - front: "Condição de maximização do lucro do monopolista."
    back: "$RMg = CMg$. Com a quantidade achada, o preço é lido **na demanda**, não na curva de CMg."
  - front: "Receita marginal de uma demanda linear $P=a-bQ$."
    back: "$RMg = a - 2bQ$: mesmo intercepto, **o dobro da inclinação**. Fica sempre abaixo da demanda."
  - front: "Por que a RMg do monopolista fica abaixo do preço?"
    back: "Para vender uma unidade a mais ele precisa **baixar o preço de todas as unidades**. A receita extra é o preço da nova unidade menos a perda nas anteriores."
  - front: "Índice de Lerner e relação com a elasticidade."
    back: "$L = (P-CMg)/P = 1/|\\varepsilon|$ no ótimo. Quanto menos elástica a demanda, maior a margem."
  - front: "Por que o monopólio gera perda de peso morto?"
    back: "Produz menos que a concorrência e cobra mais caro. As unidades entre $Q_m$ e $Q_c$ valem mais para o consumidor do que custam, mas não são produzidas."
---

Quando há dezenas de vendedores, ninguém consegue cobrar mais do que o mercado paga. Quando há um só, ele escolhe o preço. Essa diferença muda o resultado: menos produção, preço maior e uma perda que ninguém captura. Entender o monopólio é entender o que significa **poder de mercado**, e por que governos regulam distribuição de energia, saneamento e outros setores.

Ao final, você acha o ótimo do monopolista, mede o prejuízo para a sociedade e sabe o que a regulação tenta corrigir.

## Quem é o monopolista

O monopolista é a **única** empresa de um mercado, sem substitutos próximos. O poder vem de **barreiras à entrada**: patente, controle de um insumo, licença legal ou, no **monopólio natural**, custos fixos tão altos que uma só empresa produz mais barato do que duas (redes de distribuição de energia ou de água).

A diferença decisiva é esta: o concorrente perfeito é **tomador de preço**. O monopolista enfrenta a **demanda de mercado inteira** e escolhe um ponto nela.

## Por que a receita marginal fica abaixo da demanda

Suponha $P = 100 - Q$. Se ele vende 10 unidades, o preço é R\$ 90 e a receita é R\$ 900. Se vende 11, o preço cai para R\$ 89 e a receita é R\$ 979. A receita marginal da 11ª unidade foi $979-900 = 79$, bem menos que o preço de R\$ 89.

:::intuicao De onde vem a diferença
Ao vender a 11ª, ele ganha R\$ 89 por ela, mas **perde R\$ 1 em cada uma das 10 anteriores**, que agora também são vendidas a R\$ 89. Ganho de 89 menos perda de 10 dá 79. A queda no preço atinge toda a produção, não só a unidade nova.
:::

Para uma demanda linear $P=a-bQ$, a receita total é $RT = aQ - bQ^2$ e, derivando em $Q$:

$$
RMg = a - 2bQ.
$$

A RMg tem o **mesmo intercepto** da demanda e o **dobro da inclinação**. Ela cruza o eixo horizontal na metade da quantidade em que a demanda cruza.

## O ótimo: RMg = CMg

O lucro $\pi = RT - CT$ é máximo onde $RMg = CMg$. Se $RMg>CMg$, mais uma unidade aumenta o lucro; se $RMg<CMg$, ela o reduz. O procedimento tem **dois passos** e o segundo é onde se erra na prova:

1. Ache $Q^*$ igualando $RMg$ a $CMg$.
2. Leia o preço **na demanda**: $P^* = a - bQ^*$.

:::exemplo Monopolista com CMg constante
Demanda $P = 100 - Q$ e custo marginal constante de R\$ 20. Ache quantidade, preço, lucro e peso morto, e compare com a concorrência.
---
$RMg = 100 - 2Q$. Igualando a 20: $Q_m = 40$.
---
Preço na demanda: $P_m = 100 - 40 = 60$.
---
Lucro: $(P_m - CMg)\,Q_m = (60-20)\cdot 40 = 1.600$.
---
Na concorrência, $P = CMg$: $100-Q = 20$, logo $Q_c = 80$ e $P_c = 20$.
---
Peso morto: triângulo de base $Q_c - Q_m = 40$ e altura $P_m - CMg = 40$. Área $= \tfrac12 \cdot 40 \cdot 40 = 800$.
:::

```sim
id: monopolio
```

:::atencao Não existe curva de oferta do monopolista
O monopolista não responde "a que preço eu ofereço quanto". Ele escolhe um **ponto** da demanda. Por isso o conceito de curva de oferta não se aplica, e é erro de prova desenhá-la.
:::

## O custo para a sociedade

Entre $Q_m$ e $Q_c$, a disposição a pagar (altura da demanda) é maior que o custo marginal. Essas trocas **beneficiariam os dois lados**, mas o monopolista não as faz porque teria de baixar o preço de todas as unidades. A perda é o **peso morto** (*deadweight loss*): é um valor que desaparece, não que muda de mãos.

## Índice de Lerner

A margem relativa do monopolista é:

$$
L = \frac{P - CMg}{P} = \frac{1}{|\varepsilon|}.
$$

No exemplo, $L = 40/60 = 2/3$, o que corresponde a $|\varepsilon| = 1{,}5$ no ponto escolhido. Se a demanda é muito inelástica (pouco substituto), a margem é grande. Se $|\varepsilon|\to\infty$, a empresa é tomadora de preço e $L\to 0$.

```quiz-a
id: qa-monopolio
stem: |
  Sobre o monopolista que maximiza lucro com demanda linear decrescente, julgue as afirmativas.
items:
  - { t: "No ótimo, o preço cobrado é igual ao custo marginal.", c: false }
  - { t: "A receita marginal é menor que o preço para qualquer quantidade positiva.", c: true }
  - { t: "O monopolista opera sempre no trecho elástico da demanda.", c: true }
  - { t: "Se o custo marginal aumenta, a quantidade ótima do monopolista aumenta.", c: false }
  - { t: "O peso morto do monopólio é uma transferência de excedente do consumidor para o produtor.", c: false }
explanation: |
  **0.** O preço está na demanda, acima do CMg; a margem $P-CMg$ é o poder de mercado.
  **2.** Como $RMg = P(1 - 1/|\varepsilon|)$ e $RMg = CMg > 0$, é preciso $|\varepsilon| > 1$.
  **3.** CMg maior desloca a interseção com a RMg para a esquerda: produz-se menos.
  **4.** A transferência é o retângulo do lucro extraordinário. O peso morto é o triângulo que **ninguém** recebe.
```

*Questão escrita para estudo; não é item oficial da ANPEC.*

<!--full-->

## Discriminação de preços

Se a empresa consegue cobrar preços diferentes de grupos diferentes, captura mais excedente.

- **Primeiro grau (perfeita)**: cobra de cada consumidor exatamente o que ele aceita pagar. Produz $Q_c$, o eficiente, mas **todo o excedente vai para a empresa**.
- **Segundo grau**: o preço depende da quantidade ou da versão escolhida (descontos por volume, classes de um mesmo voo).
- **Terceiro grau**: grupos identificáveis pagam preços distintos (meia-entrada, tarifa para idosos). Cobra mais de quem tem demanda **menos elástica**.

Para o terceiro grau, a regra é igualar a RMg de cada mercado ao mesmo CMg:

$$
RMg_1(Q_1) = RMg_2(Q_2) = CMg.
$$

## Regulação de monopólio natural

Em um monopólio natural, o custo médio cai por toda a faixa relevante, então o CMg fica abaixo do CMe.

- **Preço igual ao CMg** é eficiente, mas dá prejuízo (não cobre o custo fixo). Exige subsídio.
- **Preço igual ao CMe** (custo médio) cobre os custos com lucro zero e elimina boa parte do peso morto. É a ideia de base das tarifas de serviços públicos regulados no Brasil, como distribuição de energia, fiscalizados por agências reguladoras.
- **Regulação por incentivos** (teto de preço, *price cap*) deixa a empresa guardar parte da economia de custos, o que estimula eficiência.

## Erros que custam pontos

- Ler o preço na RMg ou no CMg em vez de lê-lo **na demanda**.
- Esquecer que a inclinação da RMg é o **dobro** da da demanda.
- Calcular o peso morto com o retângulo em vez do **triângulo**.
- Dizer que o monopolista "escolhe preço e quantidade livremente": ele escolhe **um** deles, e o outro vem da demanda.

```quiz-b
id: qb-monopolio
stem: |
  Um monopolista enfrenta a demanda $P = 60 - 2Q$ e tem custo marginal constante igual a 12. Qual a quantidade que maximiza o lucro?
answer: 12
explanation: |
  $RMg = 60 - 4Q$. Com $RMg = CMg$: $60 - 4Q = 12$, logo $Q = 12$. O preço seria $P = 60 - 24 = 36$.
```

## Como estudar este tema

Refaça o exemplo com outro $a$, $b$ e $c$ no simulador, prevendo o resultado antes de mover os controles. Depois, mude para uma demanda com elasticidade constante e verifique a regra de Lerner.
