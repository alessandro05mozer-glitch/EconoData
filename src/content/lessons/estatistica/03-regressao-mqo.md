---
id: estatistica-03-regressao-mqo
track: estatistica
title: Correlação e regressão linear — mínimos quadrados ordinários
order: 3
seq: 24
minutes: { quick: 30, full: 85 }
objectives:
  - Calcular covariância e correlação e interpretar seus limites
  - Derivar e aplicar as fórmulas de MQO para a regressão simples
  - Interpretar intercepto, coeficiente angular e R²
  - Reconhecer o efeito de outliers e a diferença entre correlação e causalidade
  - Enunciar as hipóteses de Gauss–Markov e o que cada uma garante
cards:
  - front: "Estimadores de MQO na regressão simples."
    back: "$\\hat\\beta_1 = \\dfrac{\\sum (x_i-\\bar x)(y_i-\\bar y)}{\\sum (x_i-\\bar x)^2}$ e $\\hat\\beta_0 = \\bar y - \\hat\\beta_1\\bar x$."
  - front: "O que o MQO minimiza?"
    back: "A **soma dos quadrados dos resíduos**, $\\sum (y_i - \\hat y_i)^2$. A reta passa sempre pelo ponto $(\\bar x, \\bar y)$."
  - front: "Interpretação de $R^2$."
    back: "Fração da variação de $y$ **explicada** pela regressão: $R^2 = 1 - SQR/SQT$, entre 0 e 1. Não diz se a relação é causal."
  - front: "Hipóteses de Gauss–Markov."
    back: "Linearidade nos parâmetros, amostra aleatória, $E[u|x]=0$, variância do erro constante (homocedasticidade) e variação em $x$. Sob elas, o MQO é o **melhor estimador linear não viesado** (BLUE)."
  - front: "Correlação implica causalidade?"
    back: "**Não.** Pode haver variável omitida, causalidade reversa ou coincidência. Para causalidade, precisa de desenho de pesquisa."
---

Quase toda pergunta empírica em Economia tem a forma "como $y$ varia quando $x$ muda?". O quanto a renda aumenta com um ano a mais de estudo? O quanto o consumo responde à renda? A **regressão linear** responde a essas perguntas ajustando uma reta aos dados. Esta lição constrói a ideia de forma visual e depois formaliza. É a porta de entrada da econometria.

Ao final, você calcula uma regressão simples à mão, interpreta cada número e sabe quando **não** confiar nele.

## Covariância e correlação

A **covariância** mede se duas variáveis se movem juntas:

$$
Cov(X,Y) = \frac{1}{n}\sum (x_i - \bar x)(y_i - \bar y).
$$

Seu valor depende das unidades. A **correlação** padroniza:

$$
\rho = \frac{Cov(X,Y)}{\sigma_X\sigma_Y} \in [-1, 1].
$$

$\rho = 1$ é relação linear perfeita crescente; $\rho = -1$, decrescente; $\rho = 0$, **ausência de relação linear**, o que não exclui relações não lineares.

## A reta de mínimos quadrados

Dados $n$ pares $(x_i, y_i)$, buscamos a reta $\hat y = \hat\beta_0 + \hat\beta_1 x$ que minimiza a soma dos quadrados dos **resíduos** $e_i = y_i - \hat y_i$. A solução é:

$$
\hat\beta_1 = \frac{\sum (x_i-\bar x)(y_i-\bar y)}{\sum (x_i-\bar x)^2},\qquad \hat\beta_0 = \bar y - \hat\beta_1\,\bar x.
$$

Arraste os pontos e observe a reta se ajustar:

```sim
id: regressao-mqo
```

:::exemplo Regressão com três pontos
Dados $(1,2)$, $(2,3)$ e $(3,8)$. Ache a reta de MQO.
---
Médias: $\bar x = 2$, $\bar y = 13/3 \approx 4{,}33$.
---
$\sum (x_i-\bar x)(y_i-\bar y) = (-1)(-2{,}33) + 0 + (1)(3{,}67) = 6$, e $\sum (x_i - \bar x)^2 = 2$.
---
$\hat\beta_1 = 6/2 = 3$ e $\hat\beta_0 = 4{,}33 - 3\cdot 2 = -1{,}67$.
---
Reta: $\hat y = -1{,}67 + 3x$. Cada unidade a mais de $x$ está associada a **3 unidades a mais** de $y$.
:::

## Como ler os resultados

- **$\hat\beta_1$ (inclinação)**: variação média em $y$ associada a uma unidade a mais de $x$. As unidades importam.
- **$\hat\beta_0$ (intercepto)**: valor previsto quando $x = 0$. Muitas vezes não tem sentido prático se $x = 0$ está fora dos dados.
- **$R^2$**: fração da variação de $y$ explicada. Em regressão simples, $R^2 = \rho^2$.

:::atencao Um ponto pode mudar tudo
O MQO penaliza resíduos **ao quadrado**, então um ponto distante (outlier) puxa a reta com muita força. Arraste um ponto para o canto no simulador e veja a inclinação e o $R^2$ mudarem. Sempre olhe o gráfico antes de confiar nos números.
:::

:::intuicao Por que a reta passa por $(\bar x, \bar y)$
Se a reta passasse acima ou abaixo da média dos dados, deslocá-la reduziria os resíduos. A condição de primeira ordem para o intercepto força a **soma dos resíduos a ser zero**, e isso equivale a passar pelo ponto das médias.
:::

## Correlação não é causalidade

Cidades com mais sorveterias têm mais afogamentos. A causa comum é o calor. Em Economia, o problema típico é a **variável omitida**: quem estuda mais também tem pais com mais renda, então o coeficiente de educação mistura o efeito da escola com o da família. Estimar efeitos **causais** exige um desenho (experimento, variável instrumental, diferenças em diferenças), tema da trilha de Econometria.

```quiz-a
id: qa-mqo
stem: |
  Sobre a regressão linear simples estimada por mínimos quadrados, julgue as afirmativas.
items:
  - { t: "A soma dos resíduos de MQO com intercepto é igual a zero.", c: true }
  - { t: "Uma correlação de zero entre $x$ e $y$ implica que as variáveis são independentes.", c: false }
  - { t: "Na regressão simples, $R^2$ é o quadrado do coeficiente de correlação entre $x$ e $y$.", c: true }
  - { t: "Um $R^2$ alto prova que $x$ causa $y$.", c: false }
  - { t: "A reta de MQO passa pelo ponto $(\\bar x, \\bar y)$.", c: true }
explanation: |
  **1.** Correlação zero indica ausência de relação **linear**. Pode haver relação não linear forte, como $y = x^2$ em dados simétricos.
  **3.** $R^2$ mede ajuste, não causalidade.
```

*Questão escrita para estudo; não é item oficial da ANPEC.*

<!--full-->

## Hipóteses de Gauss–Markov

Para $y = \beta_0 + \beta_1 x + u$:

1. **Linearidade** nos parâmetros.
2. **Amostra aleatória**.
3. **Exogeneidade**: $E[u \mid x] = 0$. A mais importante e a mais difícil de defender.
4. **Homocedasticidade**: $Var(u \mid x) = \sigma^2$ constante.
5. **Variação em $x$**: os $x_i$ não são todos iguais.

Sob 1–3 (e 5), o MQO é **não viesado**. Com a 4, é o de menor variância entre os lineares não viesados (**BLUE**). Se a variância do erro não é constante (heterocedasticidade), os estimadores seguem não viesados, mas os erros padrão usuais ficam errados; usa-se erro padrão robusto.

## Regressão em logs

Se $\ln y = \beta_0 + \beta_1 \ln x + u$, o coeficiente $\beta_1$ é uma **elasticidade**: uma variação de 1% em $x$ está associada a $\beta_1$% em $y$. Se $\ln y = \beta_0 + \beta_1 x + u$, uma unidade a mais de $x$ está associada a uma variação de aproximadamente $100\beta_1$% em $y$. Pela lição de logaritmos, a aproximação vale para valores pequenos.

## Previsão e extrapolação

Prever dentro da faixa observada de $x$ é razoável. **Extrapolar** para fora dela é arriscado: a relação linear pode não valer.

## Erros que custam pontos

- Interpretar $\hat\beta_1$ sem as **unidades** (ou sem lembrar do log).
- Dizer que $R^2$ baixo significa que o modelo é inútil: depende do objetivo.
- Confundir resíduo ($e_i$, observado) com erro ($u_i$, não observado).
- Concluir causalidade a partir de correlação.

```quiz-b
id: qb-mqo
stem: |
  Os pontos $(1,2)$, $(2,3)$ e $(3,8)$ são ajustados por MQO. Qual o coeficiente angular estimado?
answer: 3
explanation: |
  $\hat\beta_1 = \dfrac{(-1)(-2{,}33)+0+(1)(3{,}67)}{2} = 6/2 = 3$.
```

## Como estudar este tema

No simulador, restaure os pontos e anote a inclinação. Mova **um** ponto para longe e anote de novo. Depois, adicione dois pontos nos extremos que sigam a tendência e veja o $R^2$ subir. Essa intuição vale mais do que decorar as fórmulas.
