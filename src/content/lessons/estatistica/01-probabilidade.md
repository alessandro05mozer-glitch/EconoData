---
id: estat-01-probabilidade
track: estatistica
title: Probabilidade — espaço amostral, eventos e contagem
order: 1
seq: 6
minutes: { quick: 20, full: 60 }
objectives:
  - Descrever um experimento por seu espaço amostral
  - Calcular probabilidades por contagem quando os resultados são equiprováveis
  - Usar combinações para contar casos
  - Conferir uma conta simbólica por simulação ou enumeração em código
cards:
  - front: "Probabilidade de um evento quando os resultados são **equiprováveis**."
    back: "$P(A) = \\frac{\\text{casos favoráveis}}{\\text{casos possíveis}}$."
  - front: "Número de maneiras de escolher $k$ itens entre $n$, sem ordem."
    back: "$\\binom{n}{k} = \\frac{n!}{k!\\,(n-k)!}$."
  - front: "Regra da soma para dois eventos quaisquer."
    back: "$P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$."
---

Um **experimento aleatório** é aquele cujo resultado não podemos prever com certeza, mas cujos resultados possíveis conhecemos. O conjunto de todos eles é o **espaço amostral** $\Omega$. Um **evento** é um subconjunto de $\Omega$.

Exemplo: lançar um dado. $\Omega=\{1,2,3,4,5,6\}$; o evento "sair par" é $\{2,4,6\}$.

## Axiomas

1. $P(A)\ge 0$ para todo evento $A$;
2. $P(\Omega)=1$;
3. se $A$ e $B$ não podem ocorrer juntos, $P(A\cup B)=P(A)+P(B)$.

Deles saem as regras de uso diário: $P(A^c)=1-P(A)$ e $P(A\cup B)=P(A)+P(B)-P(A\cap B)$.

## Resultados equiprováveis e contagem

Quando todos os resultados têm a mesma chance,

$$
P(A)=\frac{\#A}{\#\Omega}.
$$

Para contar sem listar tudo usamos as **combinações**:

$$
\binom{n}{k}=\frac{n!}{k!\,(n-k)!}
$$

Exemplo: em 4 lançamentos de uma moeda honesta, o espaço amostral tem $2^4=16$ sequências. As que têm **exatamente 2 caras** são $\binom{4}{2}=6$, então a probabilidade é $6/16$.

## Questão no formato ANPEC (Tipo B)

```quiz-b
id: qb-moeda
stem: |
  Uma moeda honesta é lançada 4 vezes. Seja $p$ a probabilidade de saírem exatamente duas caras. Calcule $16p$.
answer: 6
explanation: |
  Há $2^4=16$ sequências equiprováveis e $\binom{4}{2}=6$ delas têm exatamente duas caras. Logo $p=6/16$ e $16p=6$.
```

*Questão escrita para estudo; não é item oficial da ANPEC.*

<!--full-->

## Conferindo com código

Uma boa prática é **conferir** uma conta por enumeração. Dois dados honestos têm $6\times 6=36$ resultados equiprováveis. A probabilidade de a soma ser 7 é $6/36=1/6$.

```exercise
id: py-dados
lang: python
prompt: |
  Escreva `prob_soma(s)`: a probabilidade de a **soma de dois dados honestos** ser igual a `s`. Percorra todos os 36 pares com dois `for` e conte os favoráveis.
starter: |
  def prob_soma(s):
      favoraveis = 0
      for d1 in range(1, 7):
          pass  # percorra d2 também e conte quando d1 + d2 == s
      return favoraveis / 36
solution: |
  def prob_soma(s):
      favoraveis = 0
      for d1 in range(1, 7):
          for d2 in range(1, 7):
              if d1 + d2 == s:
                  favoraveis += 1
      return favoraveis / 36
tests: |
  check("soma 7 tem prob. 1/6", abs(prob_soma(7) - 1/6) < 1e-12, "6 pares em 36")
  check("soma 2 tem prob. 1/36", abs(prob_soma(2) - 1/36) < 1e-12, "só (1,1)")
  check("soma 13 é impossível", prob_soma(13) == 0, "probabilidade zero")
  check("todas as somas de 2 a 12 somam 1", abs(sum(prob_soma(s) for s in range(2, 13)) - 1) < 1e-12, "axioma: P(Ω) = 1")
hints:
  - "Dentro do primeiro `for`, coloque outro `for d2 in range(1, 7)`."
  - "Dentro dos dois laços: `if d1 + d2 == s: favoraveis += 1`."
```

## Erros comuns

- Tratar como equiprováveis resultados que não são. Em "soma de dois dados", as somas **não** têm a mesma chance; os 36 pares é que têm.
- Confundir combinação (ordem não importa) com arranjo (ordem importa).
