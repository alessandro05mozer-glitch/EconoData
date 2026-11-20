---
id: macro-01-pib
track: macro
title: PIB — o que entra, o que não entra e como compará-lo no tempo
order: 1
seq: 4
minutes: { quick: 25, full: 65 }
objectives:
  - Definir o PIB e distinguir bens finais de bens intermediários
  - Usar a identidade do gasto Y = C + I + G + X − M
  - Diferenciar PIB nominal e PIB real e usar o deflator
  - Reconhecer o vocabulário em inglês (GDP, deflator, output gap)
cards:
  - front: "Identidade do PIB pela ótica do gasto."
    back: "$Y = C + I + G + X - M$. Importações são subtraídas porque C, I e G incluem bens produzidos fora."
  - front: "Como passar de PIB nominal para PIB real?"
    back: "Dividir pelo deflator: $PIB_{real} = \\frac{PIB_{nominal}}{\\text{deflator}/100}$."
  - front: "Por que bens intermediários não são somados ao PIB?"
    back: "Para evitar **dupla contagem**: o valor deles já está no preço do bem final."
---

O **Produto Interno Bruto** (em inglês, [GDP](gloss:PIB, de Gross Domestic Product)) é o valor de mercado de todos os **bens e serviços finais** produzidos dentro de um país em um período.

Cada palavra importa:

- **Valor de mercado**: soma-se em reais, usando os preços.
- **Finais**: o que vai ao uso final. Bens **intermediários** (a farinha que vira pão) não entram, para evitar **dupla contagem**.
- **Dentro do país**: conta onde se produz, não a nacionalidade de quem produz.
- **Em um período**: o PIB é um **fluxo** (por trimestre ou por ano), não um estoque.

## A ótica do gasto

$$
Y = C + I + G + X - M
$$

| Letra | O que é |
|---|---|
| $C$ | consumo das famílias |
| $I$ | investimento (máquinas, construção, estoques), **não** compra de ações |
| $G$ | compras do governo de bens e serviços |
| $X$ | exportações |
| $M$ | importações |

Importações são **subtraídas** porque parte de $C$, $I$ e $G$ foi gasta em coisas produzidas fora. Transferências (aposentadorias, benefícios) **não** entram em $G$, pois não compram produção: elas só entram no PIB quando as famílias as gastam, como consumo.

## Nominal e real

O **PIB nominal** usa os preços do ano corrente; por isso cresce quando a produção cresce **ou** quando os preços sobem. O **PIB real** usa preços de um ano-base e mede só a variação da quantidade. O [deflator](gloss:deflator do PIB, índice de preços implícito) liga os dois:

$$
\text{deflator} = \frac{PIB_{nominal}}{PIB_{real}} \times 100
$$

Se o PIB nominal cresceu 10% e o deflator subiu 5%, o crescimento real é

$$
\frac{1{,}10}{1{,}05} - 1 \approx 4{,}76\%,
$$

e não 5%. É a mesma lógica do juro real de Fisher.

## Questão no formato ANPEC (Tipo A)

```quiz-a
id: qa-pib
stem: |
  Sobre a contabilidade do Produto Interno Bruto, julgue as afirmativas.
items:
  - { t: "Transferências de renda do governo às famílias compõem diretamente o gasto do governo ($G$) no PIB.", c: false }
  - { t: "As importações são subtraídas na identidade do gasto porque $C$, $I$ e $G$ incluem bens produzidos no exterior.", c: true }
  - { t: "O PIB real elimina o efeito de variações de preços entre os períodos comparados.", c: true }
  - { t: "A venda de um carro usado entra integralmente no PIB do ano em que ocorre.", c: false }
  - { t: "Somar o valor da farinha e o do pão ao PIB gera dupla contagem.", c: true }
explanation: |
  **0.** Transferências não são compra de bens e serviços; entram só quando gastas, como consumo.
  **3.** O carro usado foi contado no ano em que foi produzido. Entra apenas a comissão do revendedor, que é serviço novo.
  **4.** O valor da farinha já está dentro do preço do pão.
```

*Questão escrita para estudo; não é item oficial da ANPEC.*

<!--full-->

## Na prática, em código

```exercise
id: py-real
lang: python
prompt: |
  Escreva `crescimento_real(nominal, deflator)`: recebe a variação do PIB nominal e a variação do deflator, ambas em **porcentagem** (por exemplo `10` e `5`), e devolve o crescimento real em porcentagem.

  Exemplo: `crescimento_real(10, 5)` deve dar cerca de `4.7619`.
starter: |
  def crescimento_real(nominal, deflator):
      pass
solution: |
  def crescimento_real(nominal, deflator):
      return ((1 + nominal / 100) / (1 + deflator / 100) - 1) * 100
tests: |
  check("10% nominal e 5% de deflator", abs(crescimento_real(10, 5) - 4.761904761904762) < 1e-9, "(1,10 / 1,05 - 1) em %")
  check("deflator zero devolve o nominal", abs(crescimento_real(7, 0) - 7) < 1e-9, "sem inflação, real = nominal")
  check("nominal igual ao deflator dá zero", abs(crescimento_real(6, 6)) < 1e-9, "crescimento real nulo")
hints:
  - "Converta cada porcentagem para fator: `1 + x / 100`."
  - "Divida os fatores, subtraia 1 e multiplique por 100."
```

## Vocabulário para ler relatórios em inglês

Em relatórios do FMI, do Banco Central e de bancos, aparecem termos como [output gap](gloss:hiato do produto: diferença entre o PIB efetivo e o potencial), [nominal](gloss:em valores correntes) e [real](gloss:descontada a inflação). Quando ler "real GDP grew 2.5% year over year", entenda: o PIB descontada a inflação cresceu 2,5% em relação ao mesmo período do ano anterior.
