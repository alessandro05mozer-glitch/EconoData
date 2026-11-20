---
id: mat-01-derivada-elasticidade
track: matematica
title: Derivadas e elasticidade-preço da demanda
order: 1
seq: 7
minutes: { quick: 20, full: 55 }
objectives:
  - Interpretar a derivada como taxa de variação instantânea
  - Definir e calcular a elasticidade-preço da demanda
  - Encontrar o preço que maximiza a receita com cálculo e relacioná-lo à elasticidade
cards:
  - front: "Definição de **elasticidade-preço da demanda**."
    back: "$\\varepsilon = \\frac{dQ}{dP}\\cdot\\frac{P}{Q}$: variação percentual da quantidade para uma variação de 1% no preço."
  - front: "Numa demanda linear, onde a receita é máxima?"
    back: "Onde $|\\varepsilon| = 1$ (elasticidade unitária), no ponto médio da reta de demanda."
---

A **derivada** de $f$ em $x$ mede a rapidez com que $f$ muda quando $x$ muda um pouquinho:

$$
f'(x)=\lim_{h\to 0}\frac{f(x+h)-f(x)}{h}
$$

Regras que vamos usar: $(x^n)'=nx^{n-1}$, $(cf)'=cf'$ e $(f+g)'=f'+g'$.

## Elasticidade

Em economia, quase sempre interessa a variação **percentual**, que não depende da unidade. A elasticidade-preço da demanda é

$$
\varepsilon=\frac{dQ}{dP}\cdot\frac{P}{Q}.
$$

Para a demanda $Q=100-2P$, a derivada é $-2$ em qualquer ponto, mas a elasticidade **muda ao longo da reta**:

- Em $P=30$: $Q=40$ e $\varepsilon=-2\cdot\frac{30}{40}=-1{,}5$ (demanda **elástica**, $|\varepsilon|>1$).
- Em $P=10$: $Q=80$ e $\varepsilon=-2\cdot\frac{10}{80}=-0{,}25$ (**inelástica**, $|\varepsilon|<1$).

## Receita máxima

A receita é $R(P)=P\cdot Q(P)=100P-2P^2$. Derivando e igualando a zero:

$$
R'(P)=100-4P=0 \;\Rightarrow\; P=25,\quad Q=50.
$$

Nesse ponto, $\varepsilon=-2\cdot\frac{25}{50}=-1$. **A receita é máxima onde a elasticidade é unitária.** Abaixo desse preço, subir o preço aumenta a receita (demanda inelástica); acima, reduz.

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

## Questão no formato ANPEC (Tipo B)

```quiz-b
id: qb-elasticidade
stem: |
  Para a demanda $Q=100-2P$, seja $\varepsilon$ a elasticidade-preço no ponto $P=30$. Calcule $10\cdot|\varepsilon|$.
answer: 15
explanation: |
  Em $P=30$, $Q=40$ e $\varepsilon=-2\cdot 30/40=-1{,}5$. Então $10\,|\varepsilon|=15$.
```

## Para treinar

1. Para $Q=200-5P$, ache o preço de receita máxima. (Resposta: $P=20$.)
2. Em que ponto a elasticidade da demanda $Q=100-2P$ vale $-3$? (Resposta: $P=37{,}5$.)
