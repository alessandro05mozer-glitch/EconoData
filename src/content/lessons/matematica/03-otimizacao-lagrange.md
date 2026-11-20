---
id: mat-03-otimizacao-lagrange
track: matematica
title: Otimização com restrição — o método de Lagrange
order: 3
seq: 11
minutes: { quick: 35, full: 95 }
objectives:
  - Calcular derivadas parciais e resolver uma otimização sem restrição
  - Montar o lagrangeano de um problema com restrição de igualdade e resolver as condições de primeira ordem
  - Explicar geometricamente o método como a tangência entre curva de nível e restrição
  - Interpretar o multiplicador de Lagrange como um preço-sombra
  - Aplicar o método à escolha do consumidor e à minimização de custo
cards:
  - front: "Lagrangeano de $\\max f(x,y)$ sujeito a $g(x,y)=m$."
    back: "$\\mathcal{L}=f(x,y)+\\lambda\\,(m-g(x,y))$. As condições de 1ª ordem são $\\partial\\mathcal{L}/\\partial x=\\partial\\mathcal{L}/\\partial y=\\partial\\mathcal{L}/\\partial\\lambda=0$."
  - front: "O que mede o multiplicador $\\lambda$?"
    back: "O quanto o valor ótimo de $f$ varia se a restrição afrouxa em uma unidade, $\\lambda=\\partial f^*/\\partial m$ (preço-sombra)."
  - front: "Condição de tangência no ótimo de $\\max f$ s.a. $g=m$."
    back: "$\\nabla f=\\lambda\\nabla g$: as curvas de nível de $f$ e de $g$ são tangentes."
  - front: "Condições de 1ª ordem de um máximo **sem** restrição, $f(x,y)$."
    back: "$f_x=0$ e $f_y=0$. Para máximo, a matriz hessiana deve ser negativa definida ($f_{xx}<0$ e $f_{xx}f_{yy}-f_{xy}^2>0$)."
  - front: "Minimização de custo com função de produção: qual é a condição de tangência?"
    back: "$\\dfrac{PMg_K}{PMg_L}=\\dfrac{r}{w}$: a taxa técnica de substituição iguala a razão de preços dos fatores."
---

Quase toda escolha econômica é uma **otimização com restrição**: o consumidor maximiza utilidade sujeito ao orçamento, a firma minimiza o custo sujeito a produzir certa quantidade, o governo maximiza bem-estar sujeito à arrecadação. O **método de Lagrange** transforma esse tipo de problema em um sistema de equações que sabemos resolver.

Ao final, você resolve problemas de otimização com restrição, entende o que o método faz geometricamente e interpreta o multiplicador $\lambda$ como o valor, em unidades de $f$, de afrouxar a restrição.

## Antes da restrição: derivadas parciais

Com duas variáveis, $f(x,y)$ tem duas taxas de variação: a de $x$ mantendo $y$ fixo, $f_x=\dfrac{\partial f}{\partial x}$, e a de $y$ mantendo $x$ fixo, $f_y$. Para derivar em relação a uma variável, trate a outra como constante.

:::exemplo Derivadas parciais
Para $f(x,y)=x^2y+3y$, encontre $f_x$ e $f_y$.
---
Em relação a $x$, $y$ é constante: $f_x=2xy$ (o termo $3y$ some).
---
Em relação a $y$, $x$ é constante: $f_y=x^2+3$.
---
Na Economia: se $f$ é a produção, $f_x$ é o **produto marginal** de $x$, quanto sobe a produção por unidade a mais desse insumo, mantido o outro.
:::

Para um máximo **sem restrição**, as duas derivadas parciais devem se anular. Por exemplo, $f(x,y)=-x^2-y^2+4x+6y$ dá $f_x=-2x+4=0$ e $f_y=-2y+6=0$, logo $(x,y)=(2,3)$ e $f=13$. Como $f_{xx}=f_{yy}=-2<0$ e $f_{xy}=0$, é de fato um máximo.

## O problema com restrição

Agora o ótimo livre pode não ser permitido. Maximizar $xy$ sem limite não faz sentido: quanto maiores $x$ e $y$, melhor. Com a restrição $2x+4y=80$ (um orçamento), o problema tem resposta. Por que não basta igualar as parciais a zero? Porque o ponto onde elas se anulam pode estar **fora** da restrição.

## A ideia geométrica

Desenhe as curvas de nível de $f=xy$, isto é, os conjuntos de pontos com o mesmo valor de $xy$, e a reta da restrição. Se uma curva de nível **cruza** a restrição em dois pontos, é possível se mover ao longo da restrição para uma curva mais alta. Quando a curva só **encosta** (tangencia) a restrição, não dá para subir mais. Esse é o máximo.

```sim
id: lagrange-tangencia
```

Arraste o nível $k$ e veja: abaixo do máximo, a curva cruza a restrição em dois pontos; no máximo, encosta em um ponto; acima, não toca na restrição. Esse ponto de contato é o que o método encontra algebricamente.

## O método

Para maximizar (ou minimizar) $f(x,y)$ sujeito a $g(x,y)=m$, monte

$$
\mathcal{L}(x,y,\lambda)=f(x,y)+\lambda\,\big(m-g(x,y)\big)
$$

e iguale a zero as três derivadas parciais:

$$
\frac{\partial\mathcal{L}}{\partial x}=0,\qquad \frac{\partial\mathcal{L}}{\partial y}=0,\qquad \frac{\partial\mathcal{L}}{\partial\lambda}=0\;\;(\text{a restrição}).
$$

As duas primeiras dizem $f_x=\lambda g_x$ e $f_y=\lambda g_y$. Dividindo uma pela outra: $\dfrac{f_x}{f_y}=\dfrac{g_x}{g_y}$. É a **condição de tangência**: as inclinações das duas curvas coincidem.

:::definicao Multiplicador de Lagrange
O valor $\lambda$ no ótimo mede quanto o valor máximo de $f$ aumenta se a restrição for afrouxada em **uma unidade** (aumentar $m$ em 1). Por isso é chamado de **preço-sombra**: o preço máximo que valeria a pena pagar por um pouco mais do recurso escasso.
:::

:::exemplo Resolvendo um problema
Maximize $f(x,y)=xy$ sujeito a $2x+y=20$.
---
Lagrangeano: $\mathcal{L}=xy+\lambda(20-2x-y)$.
---
Condições de 1ª ordem: $\mathcal{L}_x=y-2\lambda=0$, $\mathcal{L}_y=x-\lambda=0$ e $\mathcal{L}_\lambda=20-2x-y=0$.
---
Das duas primeiras: $y=2\lambda$ e $x=\lambda$, logo $y=2x$. (É a tangência: $f_x/f_y=y/x=2=g_x/g_y$.)
---
Na restrição: $2x+2x=20\Rightarrow x=5$, $y=10$, $\lambda=5$ e o máximo é $f=50$.
---
Preço-sombra: se a renda sobe para $21$, a solução passa a $x=5{,}25$ e $y=10{,}5$ com $f=55{,}125$. A variação, $5{,}125$, é próxima de $\lambda=5$.
:::

:::atencao O que o método não garante
As condições de primeira ordem são **necessárias**, não suficientes. Elas encontram candidatos. Para saber se é máximo ou mínimo, é preciso verificar a condição de segunda ordem (hessiana orlada) ou argumentar com a forma da função: com utilidade côncava e restrição linear, o ponto encontrado é máximo.
:::

:::resumo Para levar
1. Monte $\mathcal{L}=f+\lambda(m-g)$. 2. Derive em $x$, $y$ e $\lambda$ e iguale a zero. 3. Divida as duas primeiras equações para obter a tangência e use a restrição para fechar. 4. $\lambda$ é o preço-sombra.
:::

## Questão no formato ANPEC (Tipo A)

```quiz-a
id: qa-lagrange
stem: |
  Considere o problema $\max\, xy$ sujeito a $x+y=10$, com $x,y\ge 0$, e o método de Lagrange. Julgue as afirmativas.
items:
  - { t: "Na solução interior, os gradientes de $f$ e da restrição são paralelos: $\\nabla f=\\lambda\\nabla g$.", c: true }
  - { t: "O multiplicador $\\lambda$ mede a variação do valor máximo de $f$ para uma variação unitária (pequena) do lado direito da restrição.", c: true }
  - { t: "As condições de primeira ordem são suficientes para um máximo em qualquer problema com restrição.", c: false }
  - { t: "A solução do problema é $x=y=5$.", c: true }
  - { t: "O valor máximo de $xy$ nesse problema é 50.", c: false }
explanation: |
  **2.** As condições de 1ª ordem são necessárias; para garantir que é máximo é preciso checar condições de 2ª ordem (ou concavidade/quase-concavidade).
  **4.** $5\cdot 5=25$, não 50.
```

*Questão escrita para estudo; não é item oficial da ANPEC.*

<!--full-->

## Questão no formato ANPEC (Tipo B)

```quiz-b
id: qb-lagrange
stem: |
  Maximize $xy$ sujeito a $2x+y=20$. Calcule o valor máximo de $xy$.
answer: 50
explanation: |
  $\mathcal{L}=xy+\lambda(20-2x-y)$. As condições dão $y=2\lambda$ e $x=\lambda$, logo $y=2x$. Na restrição, $2x+2x=20$, então $x=5$, $y=10$ e $xy=50$.
```

## Aplicação 1: a escolha do consumidor

Um consumidor com utilidade $U=\sqrt{xy}$ e renda $m$ compra $x$ ao preço $p_x$ e $y$ ao preço $p_y$. O problema é $\max\sqrt{xy}$ s.a. $p_xx+p_yy=m$. As condições de primeira ordem dão

$$
\frac{UMg_x}{UMg_y}=\frac{y}{x}=\frac{p_x}{p_y},
$$

a razão das utilidades marginais é igual à razão de preços. Com a restrição:

$$
x^*=\frac{m}{2p_x},\qquad y^*=\frac{m}{2p_y}.
$$

O consumidor gasta **metade da renda em cada bem**. É o mesmo problema da lição de Teoria do Consumidor, agora com a ferramenta que o justifica. O multiplicador aqui é a **utilidade marginal da renda**: quanto de utilidade ganha com mais uma unidade monetária.

## Aplicação 2: minimização de custo

A firma quer produzir $q$ com o menor custo. O problema é o espelho do anterior: $\min\; rK+wL$ sujeito a $f(K,L)=q$, em que $r$ é o preço do capital e $w$, o do trabalho. A condição de tangência é $\dfrac{PMg_K}{PMg_L}=\dfrac{r}{w}$.

:::exemplo Custo mínimo
Uma firma produz com $q=\sqrt{KL}$, $r=2$ e $w=8$. Qual o menor custo para produzir $q=10$?
---
Produtos marginais: $PMg_K=\dfrac{1}{2}\sqrt{\dfrac{L}{K}}$ e $PMg_L=\dfrac{1}{2}\sqrt{\dfrac{K}{L}}$, então $\dfrac{PMg_K}{PMg_L}=\dfrac{L}{K}$.
---
Tangência: $\dfrac{L}{K}=\dfrac{2}{8}=\dfrac14\Rightarrow K=4L$.
---
Restrição: $\sqrt{KL}=\sqrt{4L^2}=2L=10\Rightarrow L=5$ e $K=20$.
---
Custo: $2\cdot 20+8\cdot 5=40+40=80$. Observe que a firma usa **mais** do fator mais barato (capital) e gasta metade do orçamento em cada fator, o mesmo padrão da Cobb-Douglas.
:::

## Erros que custam pontos

- Esquecer de usar a **restrição** no final: as duas primeiras equações só dão a razão entre $x$ e $y$.
- Errar o sinal do $\lambda$ no lagrangeano. Se escrever $f+\lambda(g-m)$ em vez de $f+\lambda(m-g)$, o valor de $\lambda$ troca de sinal, mas $x$ e $y$ não mudam; cuidado ao interpretar o preço-sombra.
- Dizer que $\nabla f=0$ no ótimo restrito. O que vale é $\nabla f=\lambda\nabla g$.
- Aceitar um ponto que viola $x\ge 0$ ou $y\ge 0$. A solução interior só vale se as variáveis ficarem positivas.

## Para treinar

1. Minimize $x^2+y^2$ sujeito a $x+y=4$. (Resposta: $x=y=2$, mínimo 8, $\lambda=4$.)
2. Em $\max xy$ s.a. $x+y=10$, o preço-sombra é $\lambda=5$. Estime o novo máximo se a restrição passar a $x+y=11$. (Resposta: cerca de 30; o valor exato é 30,25.)
3. A solução numérica deste tipo de problema, em Python, está no Laboratório de programação.
