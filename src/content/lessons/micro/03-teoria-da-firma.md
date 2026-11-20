---
id: micro-03-teoria-da-firma
track: micro
title: Teoria da firma e concorrência perfeita
order: 3
seq: 13
minutes: { quick: 30, full: 80 }
objectives:
  - Distinguir custo fixo, variável, médio e marginal
  - Derivar a decisão de produção que maximiza lucro (preço igual a custo marginal)
  - Aplicar a condição de fechamento de curto prazo
  - Explicar o equilíbrio de longo prazo com livre entrada
cards:
  - front: "Regra de maximização de lucro em concorrência perfeita."
    back: "Produzir $q$ tal que $p=CMg(q)$, com $CMg$ crescente nesse ponto."
  - front: "Condição de fechamento de curto prazo."
    back: "A firma produz se $p\\ge CVMe$ (cobre o custo variável); abaixo disso, produz zero e perde só o custo fixo."
  - front: "Equilíbrio de longo prazo, concorrência perfeita com livre entrada."
    back: "$p=CMg=CMe_{min}$ e lucro econômico zero."
---

## Custos

Seja $C(q)$ o custo total de produzir $q$ unidades.

- **Custo fixo** ($CF$): não depende de $q$ (aluguel, máquinas).
- **Custo variável** ($CV$): cresce com $q$.
- **Custo marginal**: $CMg=\dfrac{dC}{dq}$, o custo da última unidade.
- **Custo médio**: $CMe=\dfrac{C}{q}$, e **custo variável médio**: $CVMe=\dfrac{CV}{q}$.

Uma propriedade útil: o $CMg$ corta o $CMe$ **no ponto de mínimo** do $CMe$. Enquanto o custo da próxima unidade for menor que a média, a média cai; quando for maior, sobe.

Usaremos o exemplo $C(q)=36+10q+q^2$. Então $CMg=10+2q$, $CVMe=10+q$ e $CMe=\dfrac{36}{q}+10+q$.

## Maximização de lucro

Em **concorrência perfeita**, a firma toma o preço $p$ como dado. O lucro é $\pi(q)=pq-C(q)$. A condição de primeira ordem é

$$
\pi'(q)=p-CMg(q)=0\;\Rightarrow\; p=CMg(q),
$$

com $CMg$ crescente (condição de segunda ordem). No exemplo, $p=10+2q\Rightarrow q=\dfrac{p-10}{2}$. Com $p=30$: $q=10$, receita $300$, custo $36+100+100=236$ e **lucro $64$**.

## Fechamento no curto prazo

Se a firma produz zero, perde o custo fixo ($-36$). Ela só produz se isso for melhor, ou seja, se $p\ge CVMe$. No exemplo, o $CVMe$ mínimo é $10$ (em $q=0$), então a firma produz sempre que $p>10$. Por isso a curva de oferta da firma é o trecho do $CMg$ acima do $CVMe$: $q=\dfrac{p-10}{2}$ para $p\ge 10$.

## Longo prazo e livre entrada

Se há lucro positivo, novas firmas entram e o preço cai. Se há prejuízo, firmas saem e o preço sobe. No longo prazo, o lucro é zero e $p=CMe_{min}$. No exemplo, o $CMe$ é mínimo em $q=6$ (onde $\dfrac{36}{q}=q$) e vale $\dfrac{36}{6}+10+6=22$. Confirme que $CMg(6)=10+12=22$: o $CMg$ corta o $CMe$ no mínimo.

## Questão no formato ANPEC (Tipo A)

```quiz-a
id: qa-firma
stem: |
  Uma firma competitiva tem custo $C(q)=36+10q+q^2$. Julgue as afirmativas.
items:
  - { t: "Para maximizar lucro, a firma produz a quantidade em que o preço é igual ao custo marginal.", c: true }
  - { t: "Se o preço é 30, a quantidade que maximiza lucro é 10.", c: true }
  - { t: "No longo prazo, com livre entrada, o preço de equilíbrio é igual ao custo médio mínimo, 22.", c: true }
  - { t: "A curva de oferta da firma é todo o custo marginal, inclusive o trecho abaixo do custo variável médio.", c: false }
  - { t: "O custo fixo afeta a quantidade que maximiza lucro quando o preço é dado.", c: false }
explanation: |
  **1.** $30=10+2q\Rightarrow q=10$.
  **2.** $CMe$ mínimo em $q=6$: $22$.
  **3.** A oferta é o $CMg$ só acima do $CVMe$ (mínimo); abaixo disso a firma produz zero.
  **4.** O custo fixo não entra no $CMg$; ele muda o lucro, não a escolha de $q$ (enquanto a firma produzir).
```

*Questão escrita para estudo; não é item oficial da ANPEC.*

<!--full-->

## Questão no formato ANPEC (Tipo B)

```quiz-b
id: qb-firma
stem: |
  Uma firma competitiva tem custo $C(q)=36+10q+q^2$ e enfrenta o preço $p=30$. Calcule o lucro máximo.
answer: 64
explanation: |
  $CMg=10+2q=30\Rightarrow q=10$. Receita $=300$. Custo $=36+100+100=236$. Lucro $=300-236=64$.
```

## Em código

```exercise
id: py-firma
lang: python
prompt: |
  Para $C(q)=36+10q+q^2$, escreva `decisao(p)` que devolve `(q, lucro)` da firma competitiva que maximiza lucro dado o preço `p`.

  Lembre: se $p\le 10$ a firma produz zero e o lucro é $-36$ (o custo fixo).
starter: |
  def decisao(p):
      pass
solution: |
  def decisao(p):
      q = max(0, (p - 10) / 2)
      lucro = p * q - (36 + 10 * q + q ** 2)
      return (q, lucro)
tests: |
  q, l = decisao(30)
  check("p=30: q=10 e lucro=64", abs(q - 10) < 1e-9 and abs(l - 64) < 1e-9, "q = (p - 10)/2")
  q, l = decisao(22)
  check("p=22 (custo médio mínimo): lucro zero", abs(q - 6) < 1e-9 and abs(l) < 1e-9, "p = CMe mínimo dá lucro zero")
  q, l = decisao(5)
  check("p=5: não produz e perde o custo fixo", q == 0 and abs(l + 36) < 1e-9, "abaixo de 10, q = 0 e lucro = -36")
hints:
  - "A quantidade é $q=\\max(0,\\,(p-10)/2)$."
  - "O lucro é receita menos custo total: $pq-(36+10q+q^2)$."
```

## Para treinar

1. Para $C(q)=100+q^2$, ache a quantidade de lucro máximo quando $p=20$ e o lucro. (Resposta: $q=10$, lucro zero.)
2. Qual é o preço de longo prazo no item anterior? (Resposta: $CMe_{min}$ em $q=10$: $20$.)
