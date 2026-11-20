---
id: macro-03-is-lm
track: macro
title: Multiplicador e modelo IS–LM — política fiscal e monetária no curto prazo
order: 3
seq: 21
minutes: { quick: 30, full: 85 }
objectives:
  - Calcular o multiplicador keynesiano e entender por que ele é maior que 1
  - Derivar e interpretar as curvas IS e LM e seu equilíbrio
  - Prever o efeito de política fiscal e monetária sobre renda e juros
  - Explicar o efeito deslocamento (crowding out) do investimento
  - Identificar casos extremos (armadilha da liquidez e investimento inelástico)
cards:
  - front: "Multiplicador keynesiano simples."
    back: "$\\dfrac{\\Delta Y}{\\Delta G} = \\dfrac{1}{1 - c}$ com $c$ a propensão marginal a consumir. Cada real gasto vira renda, e parte dela é gasta de novo."
  - front: "O que a curva IS representa?"
    back: "Combinações de $(Y, i)$ em que o **mercado de bens** está em equilíbrio. Tem inclinação **negativa**: juros menores elevam o investimento e a renda."
  - front: "O que a curva LM representa?"
    back: "Combinações de $(Y, i)$ em que o **mercado de moeda** está em equilíbrio. Tem inclinação **positiva**: mais renda eleva a demanda por moeda, e os juros precisam subir."
  - front: "Efeito de um aumento de $G$ no IS–LM."
    back: "A IS desloca para a direita: $Y$ e $i$ sobem. A alta dos juros reduz parte do investimento: **crowding out**."
  - front: "Efeito de uma expansão monetária no IS–LM."
    back: "A LM desloca para baixo/direita: $i$ cai e $Y$ sobe."
---

Em recessão, o governo pode gastar mais ou o Banco Central pode reduzir os juros. Qual funciona melhor? Qual efeito colateral vem junto? O modelo **IS–LM** responde essas perguntas para o curto prazo, com preços fixos, e foi por décadas a ferramenta central do ensino de macroeconomia.

Ao final, você prevê o efeito de política fiscal e monetária sobre produto e juros, e explica por que o gasto público tem efeito multiplicador.

## O multiplicador

Imagine o governo gastando R\$ 100 em obras. Esse valor vira renda de trabalhadores e empresas. Se a propensão marginal a consumir é $c = 0{,}75$, eles gastam R\$ 75, que vira renda de outros, que gastam R\$ 56,25, e assim por diante:

$$
\Delta Y = \Delta G\,(1 + c + c^2 + \dots) = \frac{\Delta G}{1-c}.
$$

Com $c = 0{,}75$, o multiplicador é **4**.

:::exemplo Multiplicador com impostos proporcionais
Com consumo $C = c_0 + c(Y - T)$, impostos fixos e $c = 0{,}8$, qual o efeito de um aumento de R\$ 20 bilhões em $G$?
---
Multiplicador $= 1/(1-0{,}8) = 5$.
---
$\Delta Y = 5 \times 20 = $ R\$ 100 bilhões.
---
Um corte de impostos de R\$ 20 bilhões tem efeito **menor**: o multiplicador de $T$ é $-c/(1-c) = -4$, porque só parte do dinheiro devolvido é gasta. Daí o resultado conhecido: $G$ tem efeito maior que $T$ por real.
:::

Esse multiplicador supõe juros constantes. Quando os juros se movem, entra o IS–LM.

## A curva IS: mercado de bens

O gasto planejado depende do juro, por meio do investimento: $I = I_0 - b\,i$. Em equilíbrio, $Y = C + I + G$, logo:

$$
Y = \frac{c_0 - cT + I_0 + G - b\,i}{1 - c}.
$$

Juros maiores reduzem o investimento e, pelo multiplicador, a renda. A IS tem **inclinação negativa** no plano $(Y, i)$.

## A curva LM: mercado de moeda

A demanda por moeda real aumenta com a renda (transações) e cai com o juro (custo de oportunidade): $L = kY - h\,i$. Com oferta real $M/P$ fixa:

$$
\frac{M}{P} = kY - h\,i \quad\Rightarrow\quad i = \frac{kY - M/P}{h}.
$$

Mais renda exige mais moeda para transações, e o juro tem de subir para segurar a demanda por moeda. A LM tem **inclinação positiva**.

## Equilíbrio e políticas

O cruzamento das duas curvas dá a renda e o juro de equilíbrio. Mexa nos controles de G e M/P e preveja a direção antes de olhar.

```sim
id: is-lm
```

- **Expansão fiscal** ($G\uparrow$): IS para a direita. $Y\uparrow$ e $i\uparrow$. O aumento do juro **desloca** parte do investimento privado (*crowding out*), então o efeito sobre $Y$ é **menor** que o multiplicador simples.
- **Expansão monetária** ($M/P\uparrow$): LM para baixo. $i\downarrow$ e $Y\uparrow$. O investimento sobe.

:::intuicao Por que o multiplicador do IS–LM é menor
No multiplicador simples, os juros ficam parados. No IS–LM, a renda maior eleva a demanda por moeda, os juros sobem e o investimento cai. O efeito líquido é menor, e quanto **mais inclinada** a LM (demanda por moeda pouco sensível ao juro), maior o crowding out.
:::

:::atencao Preços fixos
O modelo vale para o **curto prazo**, com preços rígidos. No médio prazo, a expansão faz os preços subirem e desloca a LM de volta. Não use IS–LM para afirmar efeitos permanentes sobre o produto.
:::

## Casos extremos

- **Armadilha da liquidez**: a demanda por moeda é infinitamente elástica ao juro ($h\to\infty$, LM horizontal). A política monetária perde força, e a fiscal funciona sem crowding out.
- **Investimento inelástico ao juro** ($b = 0$, IS vertical): política fiscal muda a renda, política monetária não.

```quiz-a
id: qa-islm
stem: |
  No modelo IS–LM com preços fixos, julgue as afirmativas.
items:
  - { t: "Uma expansão fiscal desloca a IS para a direita e eleva a taxa de juros de equilíbrio.", c: true }
  - { t: "O efeito de uma expansão fiscal sobre a renda é igual ao multiplicador simples $1/(1-c)$, qualquer que seja a LM.", c: false }
  - { t: "Uma expansão monetária reduz o juro de equilíbrio e eleva a renda.", c: true }
  - { t: "Na armadilha da liquidez, a política monetária expansionista é muito eficaz para elevar a renda.", c: false }
  - { t: "Quanto mais inclinada a LM, maior o efeito deslocamento de uma expansão fiscal.", c: true }
explanation: |
  **1.** Só no caso de LM horizontal (juros fixos) o efeito iguala o multiplicador simples. Com LM inclinada, o juro sobe e parte do investimento é deslocada.
  **3.** Na armadilha, mais moeda não reduz os juros, e a monetária perde eficácia.
```

*Questão escrita para estudo; não é item oficial da ANPEC.*

<!--full-->

## Derivação da renda de equilíbrio

Seja $A = c_0 - cT + I_0 + G$. Substituindo a LM na IS:

$$
(1-c)Y = A - b\,\frac{kY - M/P}{h}
\quad\Rightarrow\quad
Y = \frac{A + b\,(M/P)/h}{(1-c) + bk/h}.
$$

O multiplicador fiscal passa a ser $\dfrac{1}{(1-c) + bk/h}$, **menor** que $1/(1-c)$, e o multiplicador monetário é $\dfrac{b/h}{(1-c)+bk/h}$.

## Política fiscal e monetária juntas (policy mix)

Combinar expansão fiscal com monetária acomoda o aumento da demanda por moeda e **evita a alta dos juros**. Foi a lógica de muitas respostas a recessões. A direção do mix importa também para o investimento: fiscal contracionista com monetária expansionista reduz o déficit e estimula investimento.

## Críticas e limites

O IS–LM trata o juro como determinado pelo mercado de moeda, mas os bancos centrais modernos fixam **a taxa de juros** (Selic) e deixam a moeda se ajustar. Por isso, no ensino mais recente, a LM é substituída por uma regra de juros. A lógica qualitativa do modelo continua útil.

## Erros que custam pontos

- Dizer que a IS é positivamente inclinada.
- Esquecer que juros sobem após expansão fiscal.
- Usar o multiplicador simples sem notar que os juros se moveram.
- Aplicar IS–LM a prazos longos, em que os preços se ajustam.

```quiz-b
id: qb-multiplicador
stem: |
  Em um modelo keynesiano simples com juros fixos, a propensão marginal a consumir é 0,75. Um aumento de 20 nos gastos do governo eleva a renda em quanto?
answer: 80
explanation: |
  Multiplicador $= 1/(1-0{,}75) = 4$. $\Delta Y = 4 \times 20 = 80$.
```

## Como estudar este tema

Desenhe as curvas com os dois eixos rotulados e **mova uma de cada vez**. Para cada política, escreva em uma linha: qual curva se desloca, para onde, e o que acontece com $Y$ e $i$. Depois confira no simulador.
