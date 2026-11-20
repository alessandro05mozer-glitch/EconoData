---
id: matematica-04-exponencial-log
track: matematica
title: Exponencial e logaritmo — juros compostos, crescimento e regra dos 70
order: 4
seq: 22
minutes: { quick: 30, full: 80 }
objectives:
  - Usar funções exponenciais para juros compostos e crescimento populacional ou do PIB
  - Aplicar as propriedades do logaritmo e resolver equações exponenciais
  - Calcular tempo de duplicação e usar a regra dos 70 como atalho
  - Interpretar variações em log como taxas de crescimento aproximadas
  - Ler gráficos em escala logarítmica
cards:
  - front: "Montante com juros compostos."
    back: "$M = C(1+i)^n$. O crescimento é **exponencial**: cada período rende sobre o valor já acumulado."
  - front: "Propriedades do logaritmo."
    back: "$\\ln(ab) = \\ln a + \\ln b$; $\\ln(a/b) = \\ln a - \\ln b$; $\\ln(a^k) = k\\ln a$."
  - front: "Tempo de duplicação a taxa $g$ ao ano."
    back: "$t = \\dfrac{\\ln 2}{\\ln(1+g)}$. A **regra dos 70** aproxima: $t \\approx 70/g$ com $g$ em %."
  - front: "Por que $\\Delta \\ln Y \\approx$ taxa de crescimento?"
    back: "Para variações pequenas, $\\ln(1+x) \\approx x$. Diferenças de logs são taxas **percentuais** aproximadas e são aditivas no tempo."
  - front: "Como uma série de crescimento constante aparece em escala log?"
    back: "Como uma **reta**. A inclinação é a taxa de crescimento: retas mais inclinadas, crescimento mais rápido."
---

Crescer 3% ao ano parece pouco. Em 25 anos, o produto de um país dobra. Crescer 1% ao ano leva 70. Essa diferença só aparece quando se entende a função exponencial, e o logaritmo é a ferramenta que desfaz a exponencial. Eles estão por trás de juros compostos, crescimento econômico, elasticidades e regressões em log.

Ao final, você calcula tempo de duplicação de cabeça, resolve equações exponenciais e lê um gráfico em escala log.

## A função exponencial

Uma grandeza que cresce a uma taxa constante $g$ por período segue:

$$
Y_t = Y_0\,(1+g)^t.
$$

Cada período a taxa incide sobre **tudo o que já foi acumulado**. É por isso que os juros compostos superam os simples: com juros simples, o ganho é linear, $Y_0(1+gt)$.

:::exemplo R\$ 1.000 a 10% ao ano por 3 anos
Compare juros compostos e simples.
---
Compostos: $1000 \times 1{,}1^3 = 1.331$.
---
Simples: $1000 \times (1 + 0{,}1 \times 3) = 1.300$.
---
A diferença de R\$ 31 vem de juros sobre juros. Em 30 anos, ela explode: $1{,}1^{30} \approx 17{,}4$ contra $4$ nos juros simples.
:::

## O logaritmo desfaz a exponencial

$\ln$ é o logaritmo de base $e$. Para resolver uma incógnita no expoente, aplique o log nos dois lados:

$$
Y_0(1+g)^t = Y_T \;\Rightarrow\; t = \frac{\ln(Y_T/Y_0)}{\ln(1+g)}.
$$

As propriedades que mais caem em prova:

- $\ln(ab) = \ln a + \ln b$ (produto vira soma).
- $\ln(a/b) = \ln a - \ln b$.
- $\ln(a^k) = k\ln a$ (expoente vira multiplicador).
- $\ln 1 = 0$; $\ln e = 1$; **não** existe $\ln$ de número negativo ou zero.

## Tempo de duplicação e regra dos 70

Fazendo $Y_T = 2Y_0$:

$$
t_{2} = \frac{\ln 2}{\ln(1+g)} \approx \frac{70}{g(\%)}.
$$

Como $\ln 2 \approx 0{,}693$ e $\ln(1+g)\approx g$, o atalho funciona bem para taxas até uns 10%.

```sim
id: crescimento-exp
```

Teste no simulador: a 7% ao ano o nível dobra em cerca de 10 anos; a 3%, em 23; a 1%, em quase 70. Em 100 anos, a diferença entre crescer 1% e 3% é de **mais de sete vezes** no nível final.

:::intuicao Pequenas taxas, grandes destinos
Países que crescem uma ou duas vezes mais rápido de forma **persistente** terminam em lugares muito distintos. É o argumento central de por que o crescimento de longo prazo importa mais que o ciclo.
:::

## Logaritmo como taxa de crescimento

Para $x$ pequeno, $\ln(1+x) \approx x$. Logo:

$$
\ln Y_t - \ln Y_{t-1} \approx g_t.
$$

Por isso usamos séries em log em Economia: a **diferença** de logs é a taxa de crescimento, e a **inclinação** em um gráfico log é a taxa.

:::atencao A aproximação tem limite
$\ln(1{,}10) = 0{,}0953$, e não $0{,}10$. Para taxas de 10% a diferença é pequena, mas em 50% ($\ln 1{,}5 = 0{,}405$) ela não é desprezível. Para taxas grandes, use a conta exata.
:::

## Escala logarítmica

Em escala log, cada marca é **multiplicada** pelo mesmo fator. Crescimento a taxa constante vira reta. Isso permite comparar o ritmo de crescimento de séries com níveis muito diferentes, e identificar mudanças de regime (um "quebra" na inclinação). Troque a escala no simulador para ver.

```quiz-a
id: qa-exp-log
stem: |
  Julgue as afirmativas sobre funções exponencial e logarítmica.
items:
  - { t: "$\\ln(a + b) = \\ln a + \\ln b$ para quaisquer $a, b > 0$.", c: false }
  - { t: "Um capital que cresce 7% ao ano dobra em aproximadamente 10 anos.", c: true }
  - { t: "Em um gráfico em escala logarítmica, crescimento à taxa constante aparece como uma reta.", c: true }
  - { t: "Juros simples e compostos produzem o mesmo montante para qualquer prazo.", c: false }
  - { t: "$\\ln(a^3) = 3\\ln a$.", c: true }
explanation: |
  **0.** A propriedade vale para o **produto**: $\ln(ab) = \ln a + \ln b$. A soma dentro do log não se separa.
  **3.** Só coincidem em um período. Para $n > 1$, os compostos são maiores.
```

*Questão escrita para estudo; não é item oficial da ANPEC.*

<!--full-->

## Derivada da exponencial e do logaritmo

$$
\frac{d}{dx} e^{x} = e^{x},\qquad \frac{d}{dx} \ln x = \frac{1}{x}.
$$

Com a regra da cadeia, $\dfrac{d}{dt}\,Y_0 e^{gt} = g\,Y_0 e^{gt}$: a taxa de variação é proporcional ao nível, que é a **definição** de crescimento exponencial. A taxa $g$ aqui é a taxa **contínua**, relacionada à anual por $1+g_{\text{anual}} = e^{g}$.

## Elasticidade em logs

Em um modelo $\ln Q = \alpha - \varepsilon \ln P$, o coeficiente $\varepsilon$ é a **elasticidade-preço constante**:

$$
\frac{d\ln Q}{d\ln P} = \frac{dQ/Q}{dP/P}.
$$

É por isso que econometristas estimam demanda em log-log: o coeficiente é lido direto como elasticidade.

## Valor presente

A mesma exponencial, de trás para frente, é o **desconto**: um valor $V$ daqui a $n$ períodos vale hoje $V/(1+i)^n$. A regra dos 70 também vale ao contrário: a 7% ao ano, um valor recebido daqui a 10 anos vale **metade** hoje.

## Erros que custam pontos

- Separar $\ln(a+b)$ em $\ln a + \ln b$.
- Usar $\ln(1+g) = g$ com taxas grandes.
- Aplicar a regra dos 70 com a taxa em fração (0,07) em vez de em % (7).
- Confundir taxa **contínua** e taxa **efetiva** anual.

```quiz-b
id: qb-regra70
stem: |
  Um país cresce a 10% ao ano de forma constante. Pela regra dos 70, em quantos anos o PIB dobra, aproximadamente?
answer: 7
explanation: |
  $70/10 = 7$. O cálculo exato dá $\ln 2/\ln 1{,}10 \approx 7{,}27$ anos.
```

## Como estudar este tema

Pegue três taxas (1%, 3%, 7%), calcule o tempo de duplicação pela regra dos 70, depois exato com $\ln$ na calculadora, e compare. Em seguida, mude a escala do simulador e confira se a curva vira reta.
