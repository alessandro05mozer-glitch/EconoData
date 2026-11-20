---
id: micro-01-oferta-demanda-imposto
track: micro
title: Oferta, demanda e o efeito de um imposto
order: 1
seq: 2
minutes: { quick: 25, full: 70 }
objectives:
  - Montar o equilíbrio de mercado com curvas lineares de oferta e demanda
  - Explicar quem realmente paga um imposto (incidência) e de que isso depende
  - Calcular o excedente do consumidor, o do produtor e a perda de peso morto
  - Resolver questões no formato ANPEC Tipo A e Tipo B sobre o tema
cards:
  - front: "Num modelo linear, de que depende a **parcela do imposto paga pelo consumidor**?"
    back: "Das inclinações. Com demanda $Q=a-bP$ e oferta $Q=d(P-p_0)$, o consumidor paga a fração $\\frac{d}{b+d}$ do imposto. Quanto mais inelástica a demanda e mais elástica a oferta, maior a parcela dele."
  - front: "Fórmula da **perda de peso morto** de um imposto $t$ nesse modelo linear."
    back: "$$DWL = \\tfrac{1}{2}\\, t\\,(Q^*-Q_t) = \\frac{1}{2}\\,\\frac{b\\,d}{b+d}\\,t^2$$ Cresce com o **quadrado** do imposto."
  - front: "A incidência econômica de um imposto depende de quem o recolhe legalmente?"
    back: "Não. Cobrar do vendedor ou do comprador dá o mesmo resultado de equilíbrio. Depende das elasticidades."
---

Um mercado reúne compradores e vendedores. Dois fatos guiam tudo:

- **Demanda**: quanto mais caro, menos os consumidores querem comprar.
- **Oferta**: quanto mais caro, mais os produtores querem vender.

O **equilíbrio** é o preço em que a quantidade que os consumidores querem comprar é igual à que os produtores querem vender.

## O modelo linear

Usaremos curvas retas, o que permite resolver tudo com álgebra:

$$
\text{Demanda: } Q = a - bP \qquad \text{Oferta: } Q = d\,(P - p_0)
$$

com $a, b, d > 0$. O número $p_0$ é o preço mínimo abaixo do qual ninguém oferta. Igualando as duas:

$$
P^* = \frac{a + d\,p_0}{b + d}, \qquad Q^* = a - bP^*
$$

## Imposto sobre o vendedor

O governo cobra $t$ reais por unidade vendida. O consumidor paga $P_b$ e o vendedor fica com $P_s = P_b - t$. Resolvendo:

$$
P_b = \frac{a + d\,(p_0 + t)}{b + d}
$$

Então $P_b - P^* = \dfrac{d}{b+d}\,t$: o consumidor paga **parte** do imposto, e o vendedor paga o resto. Veja no simulador. Mude $b$ e $d$ e observe como a divisão do imposto muda.

```sim
id: oferta-demanda-imposto
```

> **Ideia central.** Quem recolhe o imposto não decide quem o paga. Quem paga mais é o lado do mercado **menos capaz de fugir** (o mais inelástico).

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

- **Excedente do consumidor**: área entre a curva de demanda e o preço pago. Mede o ganho dos compradores.
- **Excedente do produtor**: área entre o preço recebido e a curva de oferta.
- **Arrecadação**: $t \times Q_t$, o retângulo laranja do simulador.
- **Perda de peso morto (DWL)**: o triângulo vermelho. São trocas vantajosas que deixam de acontecer por causa do imposto, e **ninguém ganha** com elas, nem o governo.

Com $Q_t = Q^* - \dfrac{bd}{b+d}\,t$, o triângulo tem base $t$ e altura $Q^*-Q_t$:

$$
DWL = \frac{1}{2}\, t\,(Q^* - Q_t) = \frac{1}{2}\,\frac{b\,d}{b+d}\,t^2
$$

Duplicar o imposto **quadruplica** a perda. É por isso que muitos economistas preferem impostos com base larga e alíquota baixa.

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

## Como estudar este tema

1. Refaça a dedução de $P_b$ no papel, sem olhar.
2. Use o simulador para prever o resultado **antes** de mexer nos controles.
3. Depois de concluir a lição, os cartões de revisão trazem as fórmulas para você revisar com intervalos crescentes.
