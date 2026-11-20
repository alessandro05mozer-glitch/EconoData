---
id: micro-01-oferta-demanda-imposto
track: micro
title: Oferta, demanda e o efeito de um imposto
order: 1
seq: 2
minutes: { quick: 30, full: 90 }
objectives:
  - Distinguir movimento ao longo da curva de deslocamento da curva
  - Montar o equilíbrio de mercado com curvas lineares de oferta e demanda
  - Prever o efeito de choques de renda e de custo sobre preço e quantidade
  - Explicar quem realmente paga um imposto (incidência) e de que isso depende
  - Calcular excedentes, arrecadação e perda de peso morto
  - Resolver questões no formato ANPEC Tipo A e Tipo B sobre o tema
cards:
  - front: "Um aumento do **preço do próprio bem** desloca a curva de demanda ou move-se ao longo dela?"
    back: "Move-se **ao longo** da curva. Deslocam a curva: renda, preço de bens relacionados, preferências, número de compradores, expectativas."
  - front: "Equilíbrio com demanda $Q=a-bP$ e oferta $Q=d(P-p_0)$."
    back: "$P^*=\\dfrac{a+d\\,p_0}{b+d}$ e $Q^*=a-bP^*$."
  - front: "Num modelo linear, de que depende a **parcela do imposto paga pelo consumidor**?"
    back: "Das inclinações. Com demanda $Q=a-bP$ e oferta $Q=d(P-p_0)$, o consumidor paga a fração $\\frac{d}{b+d}$ do imposto. Quanto mais inelástica a demanda e mais elástica a oferta, maior a parcela dele."
  - front: "Fórmula da **perda de peso morto** de um imposto $t$ nesse modelo linear."
    back: "$$DWL = \\tfrac{1}{2}\\, t\\,(Q^*-Q_t) = \\frac{1}{2}\\,\\frac{b\\,d}{b+d}\\,t^2$$ Cresce com o **quadrado** do imposto."
  - front: "A incidência econômica de um imposto depende de quem o recolhe legalmente?"
    back: "Não. Cobrar do vendedor ou do comprador dá o mesmo resultado de equilíbrio. Depende das elasticidades."
---

Em 2018, uma greve de caminhoneiros parou o Brasil, e boa parte da discussão que veio depois foi sobre **quem paga** o imposto embutido no diesel: o transportador, a distribuidora ou o consumidor final. A resposta de um economista começa sempre da mesma ferramenta, que você vai dominar aqui: **oferta e demanda**.

Ao final, você consegue prever, com contas e com um gráfico, o que acontece com preço e quantidade quando o mercado sofre um choque, e dizer quem arca com um imposto.

## Demanda: o que os compradores querem

A **curva de demanda** mostra, para cada preço, quanto os consumidores querem comprar, *mantido todo o resto constante*. Ela desce porque, quanto mais caro o bem, menos gente (ou menos unidades) vale a pena para quem compra.

:::definicao Demanda e quantidade demandada
**Quantidade demandada** é um número, a resposta a "quanto compram a este preço?". **Demanda** é a relação inteira entre preço e quantidade, ou seja, a curva.
:::

Isso separa duas ideias que a prova cobra o tempo todo:

- **Movimento ao longo da curva**: só o *preço do próprio bem* mudou. A curva fica onde está; o ponto anda sobre ela.
- **Deslocamento da curva**: mudou algo *fora* do preço do bem, e o consumidor passa a querer outra quantidade a cada preço.

Os deslocadores clássicos da demanda são a renda dos consumidores, o preço de bens relacionados (substitutos e complementares), as preferências, o número de compradores e as expectativas sobre preços futuros.

:::atencao Erro comum
"O preço da carne subiu, então a demanda por carne caiu." Cuidado com a palavra. O que caiu foi a **quantidade demandada**; a demanda (a curva) não se moveu. Se o preço do frango sobe e a demanda por carne aumenta, aí sim a *curva* deslocou.
:::

## Oferta: o que os vendedores querem

A **curva de oferta** sobe: um preço maior torna rentável produzir mais, porque cobre custos que crescem com a escala. Os deslocadores são o custo dos insumos, a tecnologia, o número de vendedores e as expectativas.

## O modelo linear

Para fazer contas, usamos retas:

$$
\text{Demanda: } Q = a - bP \qquad \text{Oferta: } Q = d\,(P - p_0)
$$

com $a, b, d > 0$. A inclinação $b$ diz o quanto a quantidade demandada cai quando o preço sobe uma unidade; $d$ faz o mesmo para a oferta. O número $p_0$ é o preço mínimo abaixo do qual ninguém oferta. O **equilíbrio** é o preço em que as duas quantidades coincidem. Igualando:

$$
a - bP = d(P - p_0) \;\Rightarrow\; P^* = \frac{a + d\,p_0}{b + d}, \qquad Q^* = a - bP^*
$$

:::exemplo Calculando um equilíbrio
A demanda de um bem é $Q = 60 - 2P$ e a oferta é $Q = 3P$. Encontre o preço e a quantidade de equilíbrio.
---
Identifique os parâmetros: $a = 60$, $b = 2$, $d = 3$ e $p_0 = 0$, porque a oferta $Q=3P$ é $Q=3(P-0)$.
---
Iguale as quantidades: $60 - 2P = 3P$, logo $60 = 5P$ e $P^* = 12$.
---
Volte em qualquer uma das curvas para a quantidade: $Q^* = 3\cdot 12 = 36$. Confira na demanda: $60 - 2\cdot 12 = 36$. As duas dão o mesmo valor, o que confirma a conta.
:::

## Choques: o que desloca o equilíbrio

Agora use o gráfico. Aumente a renda dos consumidores: a demanda desloca para a direita. Aumente o custo dos insumos: a oferta desloca para a esquerda (ou, em termos de preço, para cima). Observe a regra, que vale além deste exemplo:

```sim
id: deslocamentos
```

:::intuicao Dois deslocamentos de um lado só, efeito claro
Quando **só uma** curva se desloca, preço e quantidade se movem de modo previsível: demanda para a direita aumenta preço *e* quantidade; oferta para a esquerda aumenta preço e *reduz* quantidade. Quando as duas se deslocam ao mesmo tempo, em geral só um dos efeitos é certo, e o outro depende de qual choque é maior.
:::

:::pense Pare e pense
A renda sobe e, ao mesmo tempo, o custo dos insumos sobe. O que você consegue afirmar com certeza sobre o preço? E sobre a quantidade?
---
O **preço sobe**: os dois choques empurram para cima. A **quantidade fica indeterminada**: a demanda a empurra para cima, e a oferta a empurra para baixo. Depende de qual deslocamento é maior. Teste no gráfico acima com valores diferentes.
:::

## Imposto sobre o vendedor

O governo cobra $t$ reais por unidade vendida. Para cada quantidade, o vendedor agora precisa receber $t$ a mais do consumidor para ficar igual: a curva de oferta **sobe $t$**. O consumidor passa a pagar $P_b$ (preço do comprador) e o vendedor fica com $P_s = P_b - t$. Resolvendo o novo equilíbrio:

$$
P_b = \frac{a + d\,(p_0 + t)}{b + d} \quad\Rightarrow\quad P_b - P^* = \frac{d}{b+d}\,t
$$

O consumidor paga **parte** do imposto, a fração $\frac{d}{b+d}$, e o vendedor absorve o resto. Brinque com $b$ e $d$ e acompanhe a parcela do consumidor.

```sim
id: oferta-demanda-imposto
```

:::exemplo Incidência de um imposto
Com demanda $Q = 60 - 2P$ e oferta $Q = 3P$ (equilíbrio em $P^* = 12$, $Q^* = 36$), o governo cria um imposto de $t = 5$ por unidade sobre o vendedor. Encontre $P_b$, $P_s$, $Q_t$ e a arrecadação.
---
O consumidor paga $P_b = \dfrac{60 + 3(0+5)}{2+3} = \dfrac{75}{5} = 15$.
---
O vendedor fica com $P_s = 15 - 5 = 10$.
---
Quantidade após o imposto: $Q_t = 60 - 2\cdot 15 = 30$. Confira na oferta: $3\cdot 10 = 30$.
---
Arrecadação: $t \times Q_t = 5 \times 30 = 150$. O consumidor paga $15-12=3$ a mais por unidade (fração $\frac{3}{5}$ do imposto, igual a $\frac{d}{b+d}=\frac35$) e o vendedor recebe $12-10=2$ a menos.
:::

:::resumo Para levar
Quem recolhe o imposto **não decide** quem o paga. Paga mais o lado do mercado **menos capaz de fugir**, isto é, o mais inelástico. Demanda inelástica ($b$ pequeno) ou oferta elástica ($d$ grande) empurram o imposto para o consumidor.
:::

## Questão no formato ANPEC (Tipo A)

```quiz-a
id: qa-incidencia
stem: |
  Considere um mercado com demanda e oferta lineares, com inclinações finitas e não nulas, e um imposto $t$ por unidade cobrado do vendedor. Julgue as afirmativas.
items:
  - { t: "O preço pago pelo consumidor sobe, mas em menos que $t$.", c: true }
  - { t: "A incidência econômica do imposto depende de quem o recolhe legalmente.", c: false }
  - { t: "A perda de peso morto é proporcional ao quadrado do imposto.", c: true }
  - { t: "Quanto mais inelástica for a demanda em relação à oferta, maior a parcela do imposto paga pelo consumidor.", c: true }
explanation: |
  **Item 0.** $P_b-P^*=\frac{d}{b+d}t$, que é positivo e menor que $t$.
  **Item 1.** Falso: cobrar do vendedor ou do comprador leva ao mesmo equilíbrio.
  **Item 2.** $DWL=\frac12\frac{bd}{b+d}t^2$.
  **Item 3.** Demanda inelástica significa $b$ pequeno, logo $\frac{d}{b+d}$ grande.
```

*Questões escritas para estudo; não são itens oficiais da ANPEC.*

<!--full-->

## Excedentes e perda de peso morto

Para avaliar se uma política é boa, não basta saber o preço. Precisamos medir o **ganho** de cada lado.

:::definicao Excedentes
- **Excedente do consumidor**: área entre a curva de demanda e o preço pago. É o quanto os compradores estariam dispostos a pagar a mais, somado.
- **Excedente do produtor**: área entre o preço recebido e a curva de oferta.
- **Perda de peso morto** (DWL, do inglês [deadweight loss](gloss:perda de peso morto)): o excedente que **desaparece** e não vai para ninguém.
:::

No exemplo numérico (demanda $Q=60-2P$, oferta $Q=3P$), antes do imposto, com $P^*=12$ e $Q^*=36$:

- O preço máximo que alguém paga é $a/b = 30$. Excedente do consumidor: $\tfrac12 (30-12)\cdot 36 = 324$.
- Excedente do produtor: $\tfrac12 (12-0)\cdot 36 = 216$. Total: $540$.

Depois do imposto $t=5$ ($P_b=15$, $P_s=10$, $Q_t=30$):

- Consumidor: $\tfrac12 (30-15)\cdot 30 = 225$. Produtor: $\tfrac12 (10-0)\cdot 30 = 150$. Governo: $150$.
- Soma: $225+150+150 = 525$. Perdemos $540-525=\mathbf{15}$, a perda de peso morto.

É o triângulo vermelho do simulador. São trocas vantajosas (aquelas entre $Q_t$ e $Q^*$) que deixam de acontecer por causa do imposto, e **ninguém ganha** com elas, nem o governo.

Em fórmula, com $Q_t = Q^* - \dfrac{bd}{b+d}\,t$, o triângulo tem base $t$ e altura $Q^*-Q_t$:

$$
DWL = \frac{1}{2}\, t\,(Q^* - Q_t) = \frac{1}{2}\,\frac{b\,d}{b+d}\,t^2
$$

Duplicar o imposto **quadruplica** a perda. É um dos argumentos para preferir impostos com base larga e alíquota baixa a impostos altos sobre poucos bens. Use o simulador: dobre $t$ e confira.

:::nota Quando não há perda
Se a demanda ou a oferta fossem perfeitamente inelásticas (retas verticais), a quantidade não mudaria com o imposto e a DWL seria zero. O imposto só distorce porque as pessoas **reagem** a ele. É isso que $\frac{bd}{b+d}$ mede: o produto das sensibilidades.
:::

## Por que o cigarro e o sal são tributados

Um bem com demanda muito inelástica (pouca reação ao preço, como o cigarro para um fumante dependente) gera pouca distorção e muita arrecadação por unidade. Mas o consumidor arca com quase todo o imposto, então há um debate de **justiça**, não só de eficiência. Eficiência e equidade são dimensões diferentes do mesmo problema, e questões de prova costumam separá-las.

## Questão no formato ANPEC (Tipo B)

```quiz-b
id: qb-dwl
stem: |
  A demanda de um bem é $Q = 60 - 2P$ e a oferta é $Q = 3P$. O governo cria um imposto de $t = 5$ por unidade sobre o vendedor. Calcule a perda de peso morto.
answer: 15
explanation: |
  Aqui $a=60$, $b=2$, $d=3$ e $p_0=0$. Então $DWL=\frac12\cdot\frac{2\cdot 3}{2+3}\cdot 5^2 = \frac12\cdot 1{,}2\cdot 25 = 15$.
  Conferindo: $P^*=12$, $Q^*=36$, $Q_t=36-1{,}2\cdot 5=30$ e $DWL=\frac12\cdot 5\cdot(36-30)=15$.
```

## Erros que custam pontos

- Chamar de "aumento da demanda" um aumento da **quantidade demandada** causado por queda de preço.
- Esquecer que, num imposto sobre o *vendedor*, a oferta sobe $t$ **na vertical**, não que o preço sobe $t$.
- Calcular a DWL com o triângulo errado: a base é $t$ e a altura é a **queda da quantidade**, não a quantidade inteira.
- Trocar $b$ e $d$ na fração da incidência: o consumidor paga $\frac{d}{b+d}$, que é a **sensibilidade do vendedor** sobre a soma das duas.

## Como estudar este tema

1. Refaça a dedução de $P_b$ no papel, sem olhar.
2. Use os gráficos para **prever** o resultado antes de mexer nos controles.
3. Depois de concluir a lição, os cartões de revisão trazem as fórmulas para você revisar com intervalos crescentes.
