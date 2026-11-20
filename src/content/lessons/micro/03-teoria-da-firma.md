---
id: micro-03-teoria-da-firma
track: micro
title: Teoria da firma e concorrência perfeita
order: 3
seq: 13
minutes: { quick: 35, full: 100 }
objectives:
  - Distinguir custo fixo, variável, médio e marginal e ler suas curvas
  - Derivar a decisão de produção que maximiza lucro (preço igual a custo marginal)
  - Aplicar a condição de fechamento de curto prazo
  - Construir a curva de oferta da firma e do mercado
  - Explicar o equilíbrio de longo prazo com livre entrada
cards:
  - front: "Regra de maximização de lucro em concorrência perfeita."
    back: "Produzir $q$ tal que $p=CMg(q)$, com $CMg$ crescente nesse ponto."
  - front: "Condição de fechamento de curto prazo."
    back: "A firma produz se $p\\ge CVMe$ (cobre o custo variável); abaixo disso, produz zero e perde só o custo fixo."
  - front: "Equilíbrio de longo prazo, concorrência perfeita com livre entrada."
    back: "$p=CMg=CMe_{min}$ e lucro econômico zero."
  - front: "Onde o $CMg$ corta o $CMe$ e por quê?"
    back: "No **mínimo** do $CMe$. Se o custo da próxima unidade é menor que a média, a média cai; se é maior, a média sobe."
  - front: "Curva de oferta de curto prazo da firma competitiva."
    back: "O trecho do $CMg$ que está **acima** do $CVMe$ mínimo. Abaixo disso, a quantidade ofertada é zero."
---

Uma padaria decide quantos pães assar por dia. Quanto mais assa, mais gasta com farinha e energia, mas o aluguel do forno e do ponto é o mesmo. Se o preço do pão sobe, quanto ela deve produzir? Se cai muito, quando é melhor fechar? A teoria da firma responde a essas perguntas, e dela sai a **curva de oferta** que usamos na lição anterior de mercado.

Ao final, você calcula a quantidade que maximiza o lucro, decide se vale produzir ou fechar e explica por que, no longo prazo, o lucro de uma indústria competitiva tende a zero.

## Os custos de produção

Seja $C(q)$ o custo total de produzir $q$ unidades.

:::definicao Tipos de custo
- **Custo fixo** ($CF$): não depende de $q$ (aluguel, máquinas). Existe mesmo que a firma produza zero, no curto prazo.
- **Custo variável** ($CV$): cresce com $q$ (matéria-prima, energia).
- **Custo marginal** ($CMg=\dfrac{dC}{dq}$): quanto custa a **última** unidade produzida.
- **Custo médio** ($CMe=\dfrac{C}{q}$) e **custo variável médio** ($CVMe=\dfrac{CV}{q}$).
:::

Usaremos como exemplo corrente $C(q)=36+10q+q^2$. O custo fixo é $36$, e $CV=10q+q^2$. Derivando e dividindo:

$$
CMg=10+2q,\qquad CVMe=10+q,\qquad CMe=\frac{36}{q}+10+q.
$$

O gráfico mostra as três curvas. Ajuste os controles para $F=36$, $c=10$ e $d=1$ e observe: o $CMg$ é uma reta que sobe, o $CVMe$ também, e o $CMe$ tem formato de U, porque o custo fixo se dilui ao produzir mais (parte $36/q$ que cai) mas o custo variável por unidade sobe (parte $q$).

```sim
id: custos-firma
```

:::intuicao Por que o CMg corta o CMe no mínimo
Pense na média das suas notas. Se a próxima prova tira menos do que a média atual, a média cai. Se tira mais, sobe. Só estabiliza quando a nota nova é **igual** à média. Com custos acontece o mesmo: o $CMe$ cai enquanto $CMg<CMe$ e sobe quando $CMg>CMe$. No mínimo, $CMg=CMe$. Prova: $\dfrac{d\,CMe}{dq}=\dfrac{q\,CMg-C}{q^2}=0\Rightarrow CMg=\dfrac{C}{q}$.
:::

## Maximização de lucro

Em **concorrência perfeita**, a firma é pequena demais para influenciar o preço e o toma como dado. O lucro é receita menos custo:

$$
\pi(q)=pq-C(q).
$$

A condição de primeira ordem é $\pi'(q)=p-CMg(q)=0$:

$$
p=CMg(q),
$$

com $CMg$ crescente no ponto (condição de segunda ordem). Pense assim: se $p>CMg$, a próxima unidade traz mais receita do que custo, e vale produzir. Se $p<CMg$, custa mais do que traz, então reduza. O lucro máximo está onde as duas se igualam. No gráfico, é o ponto onde a linha de preço cruza o $CMg$.

:::exemplo Decisão da firma
Para $C(q)=36+10q+q^2$ e preço $p=30$, encontre a quantidade e o lucro.
---
Condição de primeira ordem: $p=CMg\Rightarrow 30=10+2q$, logo $q^*=10$.
---
Receita: $pq=30\cdot10=300$.
---
Custo total: $C(10)=36+100+100=236$.
---
Lucro: $\pi=300-236=64$. No gráfico, é o retângulo entre a linha de preço e o $CMe$: $(p-CMe)\cdot q=(30-23{,}6)\cdot 10=64$, pois $CMe(10)=3{,}6+10+10=23{,}6$.
:::

## Fechar ou continuar no curto prazo?

No curto prazo, o custo fixo já foi pago e não volta se a firma fechar. Se ela produz zero, perde exatamente o custo fixo: $\pi=-36$. Produzir só compensa se o prejuízo for **menor** que isso, isto é, se a receita cobrir o custo variável: $pq\ge CV\iff p\ge CVMe$.

:::atencao Prejuízo não é motivo para fechar
Uma firma pode ter prejuízo e **mesmo assim** continuar produzindo no curto prazo, desde que $p\ge CVMe$. Cada unidade vendida paga seu custo variável e ainda cobre uma parte do custo fixo. Fechar seria perder o fixo inteiro.
:::

:::exemplo Prejuízo, mas produzir
Com a mesma firma, o preço cai para $p=12$. Ela produz ou fecha?
---
Se produz: $q=\dfrac{12-10}{2}=1$. Receita $=12$ e custo $=36+10+1=47$, logo lucro $=-35$.
---
Se fecha: lucro $=-36$ (perde o custo fixo).
---
Como $-35>-36$, produzir é melhor. Confira com a regra: $CVMe(1)=11\le 12=p$. Já com $p=10$ ou menos, $q=0$: o preço não cobre sequer o custo da primeira unidade.
:::

## A curva de oferta

Juntando: a firma produz a quantidade em que $p=CMg$ sempre que $p\ge CVMe$ mínimo. No exemplo, o $CVMe$ mínimo é $10$ (em $q=0$), logo a oferta da firma é

$$
q(p)=\frac{p-10}{2}\quad\text{para } p\ge 10,\qquad q=0\text{ para } p<10.
$$

Ou seja, a **curva de oferta de curto prazo da firma é o trecho do $CMg$ acima do $CVMe$**. A oferta de mercado é a soma horizontal das ofertas das firmas: com $N$ firmas iguais, $S(p)=N\cdot\dfrac{p-10}{2}$.

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

## Longo prazo e livre entrada

No longo prazo, **todos os custos são variáveis** e firmas podem entrar ou sair. Isso gera um mecanismo de equilíbrio:

- Se o preço dá **lucro positivo**, novas firmas entram, a oferta de mercado aumenta e o preço cai.
- Se dá **prejuízo**, firmas saem, a oferta diminui e o preço sobe.

O processo para quando o lucro econômico é zero, o que ocorre no mínimo do custo médio:

$$
p = CMg = CMe_{min}\qquad(\pi = 0).
$$

No exemplo, $CMe=\dfrac{36}{q}+10+q$ é mínimo quando $\dfrac{36}{q}=q$, ou seja, $q=6$, e vale $\dfrac{36}{6}+10+6=22$. Confira que $CMg(6)=10+12=22$: o $CMg$ passa exatamente pelo mínimo. Com $p=22$ cada firma produz $q=6$, receita $132$, custo $36+60+36=132$, lucro zero.

:::exemplo Do curto ao longo prazo
Com a demanda de mercado $Q_D=520-10p$, há $N=50$ firmas iguais àquela do exemplo (oferta de mercado $S=25(p-10)$). Depois, a demanda sobe para $Q_D=688-10p$. Descreva o curto e o longo prazo.
---
Equilíbrio inicial: $520-10p=25p-250\Rightarrow p=22$, $Q=300$ e $q=6$ por firma. É exatamente o ponto de lucro zero.
---
Curto prazo após o choque (50 firmas): $688-10p=25p-250\Rightarrow 35p=938\Rightarrow p=26{,}8$. Cada firma produz $q=\dfrac{26{,}8-10}{2}=8{,}4$, e o lucro é $26{,}8\cdot 8{,}4-(36+84+70{,}56)=34{,}56>0$.
---
Há lucro, então entram firmas. No longo prazo o preço volta a $p=22$ e cada firma, a $q=6$. A quantidade total é $Q=688-220=468$, logo há $N=\dfrac{468}{6}=78$ firmas.
---
Conclusão: um aumento permanente da demanda eleva o preço **só temporariamente**. No longo prazo, quem se ajusta é a quantidade (mais firmas), não o preço.
:::

## Questão no formato ANPEC (Tipo B)

```quiz-b
id: qb-firma
stem: |
  Uma firma competitiva tem custo $C(q)=36+10q+q^2$ e enfrenta o preço $p=30$. Calcule o lucro máximo.
answer: 64
explanation: |
  $CMg=10+2q=30\Rightarrow q=10$. Receita $=300$. Custo $=36+100+100=236$. Lucro $=300-236=64$.
```

## Erros que custam pontos

- Usar o $CMe$ no lugar do $CMg$ para achar $q$. A condição é $p=CMg$; o $CMe$ só serve para calcular o lucro.
- Esquecer o custo fixo no cálculo do lucro (ele não muda $q$, mas muda $\pi$).
- Fechar a firma sempre que há prejuízo. A regra de curto prazo compara $p$ com o $CVMe$, não com o $CMe$.
- Achar que no longo prazo o preço fica acima do custo médio mínimo: a livre entrada elimina esse lucro.

## Para treinar

1. Para $C(q)=100+q^2$, ache a quantidade de lucro máximo quando $p=20$ e o lucro. (Resposta: $q=10$, lucro zero.)
2. Qual é o preço de longo prazo no item anterior? (Resposta: $CMe_{min}$ em $q=10$: $20$.)
3. Na lição de Python aplicada à Economia, no Laboratório, você implementa essa decisão em código.
