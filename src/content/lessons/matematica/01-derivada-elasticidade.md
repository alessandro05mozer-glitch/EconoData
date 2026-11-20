---
id: mat-01-derivada-elasticidade
track: matematica
title: Derivadas e elasticidade-preço da demanda
order: 1
seq: 7
minutes: { quick: 30, full: 85 }
objectives:
  - Interpretar a derivada como inclinação da tangente e como taxa de variação instantânea
  - Aplicar as regras de derivação (potência, soma, produto, quociente e cadeia)
  - Definir e calcular a elasticidade-preço da demanda, no ponto e no arco
  - Relacionar elasticidade e receita e encontrar o preço de receita máxima
cards:
  - front: "Definição de **elasticidade-preço da demanda**."
    back: "$\\varepsilon = \\frac{dQ}{dP}\\cdot\\frac{P}{Q}$: variação percentual da quantidade para uma variação de 1% no preço."
  - front: "Numa demanda linear, onde a receita é máxima?"
    back: "Onde $|\\varepsilon| = 1$ (elasticidade unitária), no ponto médio da reta de demanda."
  - front: "Regra do produto e do quociente."
    back: "$(fg)'=f'g+fg'$ e $\\left(\\dfrac{f}{g}\\right)'=\\dfrac{f'g-fg'}{g^2}$."
  - front: "Relação entre receita marginal e elasticidade."
    back: "$RMg = P\\left(1+\\dfrac{1}{\\varepsilon}\\right)$. Se $|\\varepsilon|>1$, $RMg>0$: baixar o preço aumenta a receita."
  - front: "Regra da cadeia."
    back: "$[f(g(x))]'=f'(g(x))\\cdot g'(x)$: derive a função de fora e multiplique pela derivada da de dentro."
---

Quando o governo reajusta a passagem de ônibus, a empresa quer saber duas coisas: **quantos passageiros vai perder** e **se a receita sobe ou cai**. As duas respostas vêm da derivada. Ela é a ferramenta que conecta quase toda a microeconomia: custo marginal, utilidade marginal, receita marginal e elasticidade são, todos, derivadas.

Ao final, você deriva as funções que aparecem em prova, calcula elasticidades e decide, com cálculo, quando aumentar o preço aumenta ou reduz a receita.

## A ideia da derivada

Imagine o custo $C(q)$ de produzir $q$ unidades. Quanto custa **mais uma** unidade? Se produzir de $q$ para $q+h$ custa $C(q+h)-C(q)$, o custo por unidade adicional é a razão

$$
\frac{C(q+h)-C(q)}{h},
$$

a inclinação da **reta secante** que liga os dois pontos do gráfico. A derivada é o que acontece quando $h$ fica minúsculo: a secante gira e vira a **tangente**.

$$
f'(x)=\lim_{h\to 0}\frac{f(x+h)-f(x)}{h}
$$

Experimente: reduza $h$ e acompanhe a inclinação da secante convergir para a da tangente.

```sim
id: derivada-tangente
```

:::definicao Derivada
A derivada de $f$ em $x$ é a **inclinação da reta tangente** ao gráfico nesse ponto, ou seja, a taxa de variação instantânea de $f$. Se $f'(x)>0$, $f$ está subindo; se $f'(x)<0$, descendo; se $f'(x)=0$, a tangente é horizontal, e esse é o candidato a máximo ou mínimo.
:::

## Regras de derivação

Ninguém calcula o limite toda vez. Usamos regras:

| Regra | Fórmula |
|---|---|
| Constante | $(c)'=0$ |
| Potência | $(x^n)'=n\,x^{n-1}$ |
| Constante vezes função | $(c\,f)'=c\,f'$ |
| Soma | $(f+g)'=f'+g'$ |
| Produto | $(fg)'=f'g+fg'$ |
| Quociente | $\left(\dfrac{f}{g}\right)'=\dfrac{f'g-fg'}{g^2}$ |
| Cadeia | $[f(g(x))]'=f'(g(x))\,g'(x)$ |

:::exemplo Aplicando as regras
Derive (a) $f(x)=x^2(x+1)$, (b) $f(x)=\dfrac{x}{x+1}$ e (c) $f(x)=(3x+1)^2$.
---
(a) **Produto.** Com $u=x^2$ e $v=x+1$: $f'=2x(x+1)+x^2\cdot 1=3x^2+2x$. Confira expandindo: $f=x^3+x^2\Rightarrow f'=3x^2+2x$. ✓
---
(b) **Quociente.** Com $u=x$ e $v=x+1$: $f'=\dfrac{1\cdot(x+1)-x\cdot 1}{(x+1)^2}=\dfrac{1}{(x+1)^2}$.
---
(c) **Cadeia.** De fora para dentro: derive o quadrado, $2(3x+1)$, e multiplique pela derivada de dentro, $3$. Resultado: $f'=6(3x+1)$.
:::

:::atencao Erro comum
$(fg)'$ **não** é $f'g'$. Teste: $f=g=x$, então $(x\cdot x)'=2x$, mas $f'g'=1\cdot 1=1$. Do mesmo modo, $(f/g)'\ne f'/g'$.
:::

## Elasticidade: variação em porcentagem

A derivada $\dfrac{dQ}{dP}$ depende da unidade: mudar de reais para centavos muda o número. Em Economia, importa a variação **percentual**, que não tem unidade. A elasticidade-preço da demanda é

$$
\varepsilon=\frac{\%\Delta Q}{\%\Delta P}=\frac{dQ}{dP}\cdot\frac{P}{Q}.
$$

Lê-se assim: se $\varepsilon=-2$, um aumento de 1% no preço reduz a quantidade demandada em 2%. Classificamos pelo módulo:

- $|\varepsilon|>1$: demanda **elástica** (a quantidade reage mais que o preço).
- $|\varepsilon|<1$: **inelástica** (reage menos).
- $|\varepsilon|=1$: **elasticidade unitária**.

Para a demanda $Q=100-2P$, a derivada é $-2$ em qualquer ponto, mas a elasticidade **muda ao longo da reta**. Mova o ponto e veja:

```sim
id: elasticidade
```

:::exemplo Calculando elasticidades
Para $Q=100-2P$, calcule a elasticidade em $P=30$ e em $P=10$.
---
Derivada: $\dfrac{dQ}{dP}=-2$.
---
Em $P=30$: $Q=100-60=40$ e $\varepsilon=-2\cdot\dfrac{30}{40}=-1{,}5$. Demanda **elástica**.
---
Em $P=10$: $Q=100-20=80$ e $\varepsilon=-2\cdot\dfrac{10}{80}=-0{,}25$. Demanda **inelástica**.
---
Conclusão: no topo da reta (preço alto, quantidade baixa) a demanda é elástica; na base, inelástica. A mesma reta tem as duas.
:::

:::pense Pare e pense
A elasticidade é a mesma coisa que a inclinação da curva de demanda?
---
Não. A inclinação é $\dfrac{dQ}{dP}$ e depende das unidades. A elasticidade multiplica pela razão $\dfrac{P}{Q}$ e é **adimensional**. Uma reta de demanda tem inclinação constante, mas elasticidade variável. Só curvas do tipo $Q=AP^{-\eta}$ têm elasticidade constante, igual a $-\eta$.
:::

## Receita e elasticidade

A receita é $R(P)=P\cdot Q(P)$. Para $Q=100-2P$,

$$
R(P)=100P-2P^2\;\Rightarrow\; R'(P)=100-4P=0\;\Rightarrow\;P=25,\quad Q=50.
$$

Nesse ponto, $\varepsilon=-2\cdot\frac{25}{50}=-1$. **A receita é máxima onde a elasticidade é unitária.** O painel da direita da ilustração mostra isso: o pico da curva de receita está exatamente em $|\varepsilon|=1$.

O motivo é o seguinte. Subir o preço tem dois efeitos: cada unidade vendida rende mais, mas vendem-se menos unidades. Se a demanda é inelástica, a quantidade cai pouco e a receita **sobe**. Se elástica, cai muito e a receita **desce**.

:::resumo Para levar
Demanda **inelástica** ($|\varepsilon|<1$): aumentar o preço aumenta a receita. Demanda **elástica** ($|\varepsilon|>1$): aumentar o preço reduz a receita (e baixar o preço a aumenta). Receita máxima: $|\varepsilon|=1$.
:::

## Questão no formato ANPEC (Tipo A)

```quiz-a
id: qa-elasticidade
stem: |
  Considere a demanda linear $Q=100-2P$ e a receita $R=P\cdot Q$. Julgue as afirmativas.
items:
  - { t: "Se a demanda é elástica ($|\\varepsilon|>1$), uma redução do preço aumenta a receita total.", c: true }
  - { t: "A elasticidade-preço dessa demanda é constante ao longo da reta.", c: false }
  - { t: "A receita máxima ocorre no ponto em que $|\\varepsilon|=1$.", c: true }
  - { t: "Se a demanda é inelástica, um aumento de preço reduz a receita.", c: false }
explanation: |
  **0.** Demanda elástica: ao reduzir o preço, a quantidade sobe proporcionalmente mais do que o preço caiu, então a receita aumenta.
  **1.** $\varepsilon=-2P/Q$ muda com o ponto.
  **3.** Inelástica: a quantidade cai pouco, então a receita **sobe** com o preço.
```

*Questão escrita para estudo; não é item oficial da ANPEC.*

<!--full-->

## Elasticidade de arco

A elasticidade no ponto usa a derivada e vale para mudanças minúsculas. Entre dois pontos distantes, usa-se a **elasticidade de arco** com as variações medidas sobre a média dos dois pontos (ponto médio), para que o resultado não dependa do sentido em que se anda:

$$
\varepsilon_{arco}=\frac{(Q_2-Q_1)/\bar Q}{(P_2-P_1)/\bar P},\qquad \bar Q=\frac{Q_1+Q_2}{2},\;\bar P=\frac{P_1+P_2}{2}.
$$

:::exemplo Elasticidade de arco
Na demanda $Q=100-2P$, o preço sobe de $10$ para $20$. Calcule a elasticidade de arco.
---
Quantidades: $Q_1=80$ e $Q_2=60$. Médias: $\bar Q=70$ e $\bar P=15$.
---
Variações: $\dfrac{\Delta Q}{\bar Q}=\dfrac{-20}{70}\approx-0{,}286$ e $\dfrac{\Delta P}{\bar P}=\dfrac{10}{15}\approx 0{,}667$.
---
$\varepsilon_{arco}\approx\dfrac{-0{,}286}{0{,}667}\approx-0{,}43$. Demanda inelástica nesse trecho, em linha com as elasticidades de ponto ($-0{,}25$ em $P=10$ e $-0{,}67$ em $P=20$).
:::

## Receita marginal e elasticidade

Derive $R=P\cdot Q(P)$ e escreva em função de $Q$: a **receita marginal** é

$$
RMg=\frac{dR}{dQ}=P\left(1+\frac{1}{\varepsilon}\right).
$$

Com $\varepsilon=-1{,}5$ e $P=30$: $RMg=30\,(1-\tfrac{1}{1{,}5})=10>0$, então vender mais (baixando o preço) aumenta a receita. Quando $|\varepsilon|=1$, $RMg=0$. Esta fórmula volta na lição de **monopólio**: um monopolista só opera na parte **elástica** da demanda, pois ali $RMg>0$.

## Outras elasticidades

- **Elasticidade-renda**: $\eta=\dfrac{dQ}{dm}\cdot\dfrac{m}{Q}$. Se $\eta>1$, o bem é de luxo; se $0<\eta<1$, normal necessário; se $\eta<0$, **inferior**.
- **Elasticidade-preço cruzada**: $\dfrac{dQ_x}{dP_y}\cdot\dfrac{P_y}{Q_x}$. Positiva: bens substitutos. Negativa: complementares.

## Questão no formato ANPEC (Tipo B)

```quiz-b
id: qb-elasticidade
stem: |
  Para a demanda $Q=100-2P$, seja $\varepsilon$ a elasticidade-preço no ponto $P=30$. Calcule $10\cdot|\varepsilon|$.
answer: 15
explanation: |
  Em $P=30$, $Q=40$ e $\varepsilon=-2\cdot 30/40=-1{,}5$. Então $10\,|\varepsilon|=15$.
```

## Erros que custam pontos

- Esquecer do sinal: a elasticidade-preço da demanda é negativa; compare o **módulo** com 1.
- Usar $P$ e $Q$ de pontos diferentes na fórmula. Os dois têm de ser do mesmo ponto da curva.
- Dizer que "demanda inelástica" significa que a quantidade **não** muda. Significa que muda proporcionalmente **menos** que o preço.
- Trocar $dQ/dP$ por $dP/dQ$: se a demanda está escrita como $P=a-bQ$, a derivada $-b$ é $dP/dQ$ e a elasticidade usa o inverso, $\dfrac{1}{-b}$.

## Para treinar

1. Para $Q=200-5P$, ache o preço de receita máxima. (Resposta: $P=20$.)
2. Em que ponto a elasticidade da demanda $Q=100-2P$ vale $-3$? (Resposta: $P=37{,}5$.)
3. Derive $f(x)=\dfrac{x^2}{x+2}$. (Resposta: $f'=\dfrac{x^2+4x}{(x+2)^2}$.)
