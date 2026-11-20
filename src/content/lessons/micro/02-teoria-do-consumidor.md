---
id: micro-02-teoria-do-consumidor
track: micro
title: Teoria do consumidor — utilidade, orçamento e demanda
order: 2
seq: 12
minutes: { quick: 35, full: 95 }
objectives:
  - Representar preferências por uma função de utilidade e por curvas de indiferença
  - Interpretar a taxa marginal de substituição e a restrição orçamentária
  - Obter a escolha ótima pela condição de tangência (TMS = razão de preços)
  - Derivar a demanda de uma utilidade Cobb-Douglas e suas elasticidades
  - Reconhecer casos de substitutos perfeitos e complementos perfeitos
cards:
  - front: "Condição de ótimo interior do consumidor."
    back: "$TMS=\\frac{UMg_x}{UMg_y}=\\frac{p_x}{p_y}$ e o orçamento é gasto por inteiro: $p_xx+p_yy=m$."
  - front: "Demandas de $U=x^{\\alpha}y^{1-\\alpha}$ com renda $m$."
    back: "$x^*=\\frac{\\alpha m}{p_x}$ e $y^*=\\frac{(1-\\alpha)m}{p_y}$."
  - front: "Quais são as elasticidades da demanda Cobb-Douglas por $x$?"
    back: "Preço-próprio $=-1$, preço-cruzada $=0$ e renda $=+1$."
  - front: "O que a TMS mede?"
    back: "Quanto de $y$ o consumidor aceita abrir mão por uma unidade a mais de $x$, mantendo a mesma utilidade. É o módulo da inclinação da curva de indiferença."
  - front: "Escolha ótima com complementos perfeitos, $U=\\min\\{x,y\\}$."
    back: "O consumidor compra em proporção fixa, $x=y=\\dfrac{m}{p_x+p_y}$. Não há tangência: o ótimo está no vértice."
---

Por que você compra o que compra? A teoria do consumidor responde com uma ideia simples e poderosa: **você escolhe o melhor que cabe no seu bolso**. Toda a lição é a tradução disso em duas peças, o que você *deseja* (preferências) e o que você *pode* (orçamento), e na regra que as une.

Ao final, você calcula a cesta ótima de um consumidor, entende por que a demanda Cobb-Douglas gasta frações fixas da renda e sabe responder questões de prova sobre o tema.

## O que o consumidor deseja

Para escolher, o consumidor compara **cestas**, combinações de bens, por exemplo $x$ unidades de alimentação e $y$ de transporte. Representamos essa comparação por uma **função de utilidade** $U(x,y)$: a cesta com $U$ maior é a preferida.

:::definicao Utilidade ordinal
Só a **ordem** importa. Se $U(A)=10$ e $U(B)=5$, o consumidor prefere $A$ a $B$, mas não podemos dizer que gosta "o dobro". Qualquer transformação crescente de $U$ representa as mesmas preferências.
:::

Uma **curva de indiferença** reúne as cestas com a mesma utilidade: o consumidor é indiferente entre elas. Com preferências "bem-comportadas" (mais é melhor e misturas são preferidas aos extremos), as curvas são **decrescentes e convexas**.

A inclinação da curva (em módulo) é a **taxa marginal de substituição**, a TMS:

$$
TMS=\frac{UMg_x}{UMg_y}
$$

em que $UMg$ é a utilidade marginal, o quanto a utilidade sobe com uma unidade a mais do bem.

:::intuicao O que a TMS conta
A TMS diz **quantas unidades de $y$ o consumidor aceita entregar por mais uma unidade de $x$**. Se está com muito $y$ e pouco $x$, aceita trocar bastante $y$: TMS alta. Se acontece o contrário, TMS baixa. Por isso a curva é convexa: a TMS cai ao longo dela, à medida que $x$ aumenta.
:::

## O que o consumidor pode

Com renda $m$ e preços $p_x,p_y$, as cestas acessíveis satisfazem $p_xx+p_yy\le m$. Se mais é sempre melhor, o consumidor gasta tudo: $p_xx+p_yy=m$, a **reta de orçamento**. Isolando $y$,

$$
y=\frac{m}{p_y}-\frac{p_x}{p_y}\,x
$$

O ponto onde ela corta o eixo $x$ é $m/p_x$ (tudo em $x$) e o do eixo $y$ é $m/p_y$. A inclinação, em módulo, é $p_x/p_y$: o **custo de oportunidade** de $x$ em termos de $y$, ou seja, quantas unidades de $y$ o mercado exige que você entregue por mais uma de $x$.

## O ótimo: o mercado e a preferência concordam

Junte as duas peças. Em cada ponto da reta de orçamento, a TMS é a taxa **pessoal** de troca, e $p_x/p_y$ é a taxa de troca **do mercado**. Se forem diferentes, há ganho em trocar:

- Se $TMS > p_x/p_y$: o consumidor valoriza $x$ mais do que o mercado cobra por ele. Compra mais $x$ e menos $y$.
- Se $TMS < p_x/p_y$: o contrário.

O ótimo interior é onde as taxas **coincidem**: a curva de indiferença tangencia a reta.

$$
\frac{UMg_x}{UMg_y}=\frac{p_x}{p_y}\quad\text{e}\quad p_xx+p_yy=m.
$$

Deslize o ponto no gráfico e veja a utilidade (a curva sólida) subir e descer. Mude os preços e a renda e confira que o ótimo anda junto.

```sim
id: consumidor-otimo
```

## Cobb-Douglas

A função $U=x^{\alpha}y^{1-\alpha}$, com $0<\alpha<1$, é a mais usada porque dá demandas simples. Suas utilidades marginais são $UMg_x=\alpha\,\dfrac{U}{x}$ e $UMg_y=(1-\alpha)\dfrac{U}{y}$, logo

$$
TMS=\frac{\alpha}{1-\alpha}\cdot\frac{y}{x}=\frac{p_x}{p_y}\;\Rightarrow\; p_yy=\frac{1-\alpha}{\alpha}\,p_xx.
$$

Substituindo no orçamento, $p_xx\left(1+\frac{1-\alpha}{\alpha}\right)=m$, e portanto

$$
x^*=\frac{\alpha\,m}{p_x},\qquad y^*=\frac{(1-\alpha)\,m}{p_y}.
$$

:::exemplo Escolha ótima passo a passo
Um consumidor tem $U=xy$ (Cobb-Douglas com $\alpha=\tfrac12$), renda $m=100$ e preços $p_x=5$, $p_y=10$. Encontre a cesta ótima e confira que ela é melhor que uma alternativa.
---
Utilidades marginais: $UMg_x=y$ e $UMg_y=x$. Então $TMS=\dfrac{y}{x}$.
---
Condição de tangência: $\dfrac{y}{x}=\dfrac{5}{10}=\dfrac12$, logo $y=\dfrac{x}{2}$.
---
Orçamento: $5x+10\cdot\dfrac{x}{2}=100\Rightarrow 10x=100\Rightarrow x^*=10$ e $y^*=5$.
---
Confira com a fórmula: $x^*=\dfrac{0{,}5\cdot 100}{5}=10$ e $y^*=\dfrac{0{,}5\cdot 100}{10}=5$. A utilidade é $U^*=10\cdot 5=50$.
---
Compare com outra cesta que **cabe** no orçamento, $(5;\,7{,}5)$: custa $25+75=100$ e dá $U=37{,}5<50$. A cesta ótima é, de fato, melhor.
:::

:::resumo Para levar
Com Cobb-Douglas, o consumidor gasta a fração $\alpha$ da renda em $x$ e $1-\alpha$ em $y$, **quaisquer que sejam os preços**. Daí vem que $x^*$ não depende de $p_y$ (elasticidade-cruzada zero), cai com $p_x$ com elasticidade $-1$ e sobe na mesma proporção da renda (elasticidade-renda $1$).
:::

:::pense Pare e pense
Na demanda $x^*=\alpha m/p_x$, o preço de $x$ dobra. O que acontece com o gasto $p_xx^*$ em $x$?
---
Nada: $p_x x^*=\alpha m$ é constante. O preço dobra e a quantidade cai pela metade, e o gasto fica igual. É exatamente a elasticidade $-1$ (demanda de elasticidade unitária).
:::

## Questão no formato ANPEC (Tipo A)

```quiz-a
id: qa-consumidor
stem: |
  Um consumidor tem utilidade $U(x,y)=x^{0{,}3}\,y^{0{,}7}$, renda $m>0$ e preços $p_x,p_y>0$. Julgue as afirmativas.
items:
  - { t: "Na escolha ótima, a taxa marginal de substituição é igual à razão de preços $p_x/p_y$.", c: true }
  - { t: "O consumidor gasta 30% da renda com o bem $x$, independentemente dos preços.", c: true }
  - { t: "Um aumento de $p_x$, com tudo o mais constante, reduz a quantidade demandada de $y$.", c: false }
  - { t: "A elasticidade-preço da demanda por $x$ é $-0{,}3$.", c: false }
  - { t: "A elasticidade-renda da demanda por $x$ é igual a 1.", c: true }
explanation: |
  **1.** $x^*=0{,}3m/p_x$, então $p_xx^*=0{,}3m$.
  **2.** $y^*=0{,}7m/p_y$ não depende de $p_x$.
  **3.** $x^*=0{,}3m/p_x$ tem elasticidade $-1$ em relação ao preço, qualquer que seja $\alpha$.
  **4.** $x^*$ é proporcional a $m$.
```

*Questão escrita para estudo; não é item oficial da ANPEC.*

<!--full-->

## Questão no formato ANPEC (Tipo B)

```quiz-b
id: qb-consumidor
stem: |
  Um consumidor tem utilidade $U=x^{0{,}4}y^{0{,}6}$, renda $m=120$ e preços $p_x=4$ e $p_y=3$. Calcule a quantidade ótima $y^*$.
answer: 24
explanation: |
  $y^*=\dfrac{(1-\alpha)m}{p_y}=\dfrac{0{,}6\cdot 120}{3}=24$. (E $x^*=\dfrac{0{,}4\cdot 120}{4}=12$; conferindo o orçamento: $4\cdot 12+3\cdot 24=120$.)
```

## Quando não há tangência

A Cobb-Douglas sempre tem solução interior. Outros formatos de preferência não.

**Substitutos perfeitos**, $U=x+y$. O consumidor troca um bem pelo outro a taxa constante (as curvas são retas). A $TMS=1$ em todo ponto, então só há tangência se $p_x=p_y$. Caso contrário, ele compra **apenas o bem mais barato**: se $p_x<p_y$, escolhe $x=m/p_x$ e $y=0$. É uma *solução de canto*.

**Complementos perfeitos**, $U=\min\{x,y\}$. Pense em sapato direito e esquerdo: só usa em par. As curvas têm formato de "L", e o ótimo fica no vértice, onde $x=y$. Com o orçamento, $p_xx+p_yy=m$, resulta

$$
x^*=y^*=\frac{m}{p_x+p_y}
$$

:::exemplo Complementos perfeitos
Um consumidor só aproveita café e açúcar na proporção 1 para 1: $U=\min\{x,y\}$. Com $m=60$, $p_x=4$ e $p_y=2$, quanto ele compra de cada um?
---
No ótimo, $x=y$, porque comprar mais de um bem sem o outro é desperdício.
---
Orçamento: $4x+2x=60\Rightarrow 6x=60$, logo $x^*=y^*=10$. Também pela fórmula: $\dfrac{60}{4+2}=10$.
---
Se o preço do café dobrar para $p_x=8$: $x^*=y^*=\dfrac{60}{10}=6$. Para os complementos perfeitos, o efeito do preço é sempre de **renda**: o consumidor tem de reduzir os dois bens, porque não substitui.
:::

## Limites do modelo

A Cobb-Douglas é um bom exemplo de ensino, mas é restritiva: parcelas de gasto constantes e elasticidades fixas raramente se verificam nos dados. Na prática, um aumento de preço produz dois efeitos: o bem fica **relativamente** mais caro (efeito-substituição) e o consumidor fica **mais pobre** (efeito-renda). A decomposição de Slutsky separa os dois. Na Cobb-Douglas eles se cancelam no preço cruzado, por isso o resultado de elasticidade zero.

## Erros que custam pontos

- Dizer que a TMS é "a utilidade de $x$". É a **razão** das utilidades marginais.
- Igualar $UMg_x=p_x$ em vez de $\dfrac{UMg_x}{UMg_y}=\dfrac{p_x}{p_y}$. A condição é sobre **razões**.
- Usar a fórmula $x^*=\alpha m/p_x$ para uma utilidade que não é Cobb-Douglas (por exemplo $U=x+y$). Ela só vale para esse formato.
- Esquecer de conferir que o orçamento foi gasto: $p_xx^*+p_yy^*$ precisa dar $m$.

## Como estudar este tema

Refaça a dedução da demanda Cobb-Douglas sem olhar, com $\alpha$ genérico. Depois resolva três variações numéricas, trocando $\alpha$, $m$ e os preços. A implementação em código dessa demanda está no Laboratório de programação, na lição de Python aplicada à Economia.
