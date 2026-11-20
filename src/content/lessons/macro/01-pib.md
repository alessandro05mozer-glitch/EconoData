---
id: macro-01-pib
track: macro
title: PIB — o que entra, o que não entra e como compará-lo no tempo
order: 1
seq: 4
minutes: { quick: 30, full: 85 }
objectives:
  - Definir o PIB e distinguir bens finais de bens intermediários
  - Calcular o PIB pelas três óticas (produção, despesa e renda)
  - Usar a identidade do gasto Y = C + I + G + X − M e dizer o que fica de fora do PIB
  - Diferenciar PIB nominal e PIB real e usar o deflator
  - Distinguir PIB de PNB e reconhecer os limites do PIB como medida de bem-estar
cards:
  - front: "Identidade do PIB pela ótica do gasto."
    back: "$Y = C + I + G + X - M$. Importações são subtraídas porque C, I e G incluem bens produzidos fora."
  - front: "Como passar de PIB nominal para PIB real?"
    back: "Dividir pelo deflator: $PIB_{real} = \\frac{PIB_{nominal}}{\\text{deflator}/100}$."
  - front: "Por que bens intermediários não são somados ao PIB?"
    back: "Para evitar **dupla contagem**: o valor deles já está no preço do bem final."
  - front: "Quais são as três óticas do PIB e por que dão o mesmo número?"
    back: "Produção (soma dos valores adicionados), despesa ($C+I+G+X-M$) e renda (salários + lucros + juros + aluguéis + impostos líquidos). Todo gasto é renda de alguém, e todo valor produzido é gasto ou estoque."
  - front: "Diferença entre PIB e PNB."
    back: "PIB conta o que é produzido **dentro** do território. PNB (ou renda nacional bruta) conta o que é obtido pelos **residentes**: PNB = PIB + renda recebida do exterior − renda enviada ao exterior."
---

Quando o IBGE anuncia que "a economia cresceu 0,5% no trimestre", ele está dizendo que o **PIB real** subiu. É o número mais citado da Economia e um dos mais mal interpretados. Esta lição mostra de onde ele vem, o que cabe e o que não cabe nele, e por que a diferença entre PIB nominal e real é a diferença entre crescer de verdade e apenas encarecer.

Ao final, você calcula o PIB de três maneiras, tira o efeito da inflação e sabe responder questões de prova sobre contabilidade nacional.

## O que é o PIB

O **Produto Interno Bruto** (em inglês, [GDP](gloss:PIB, de Gross Domestic Product)) é o valor de mercado de todos os **bens e serviços finais** produzidos dentro de um país em um período.

Cada palavra importa:

- **Valor de mercado**: soma-se em reais, usando os preços. É assim que somamos pães e automóveis.
- **Finais**: o que vai ao uso final. Bens **intermediários** (a farinha que vira pão) não entram, para evitar **dupla contagem**.
- **Dentro do país**: conta onde se produz, não a nacionalidade de quem produz.
- **Em um período**: o PIB é um **fluxo** (por trimestre ou por ano), não um estoque como a riqueza.

## Três jeitos de medir, um só número

O PIB pode ser medido por três caminhos que, na contabilidade, dão o mesmo resultado.

- **Ótica da produção**: soma o **valor adicionado** de cada setor, isto é, o valor da produção menos o dos insumos intermediários.
- **Ótica da despesa**: soma o que se gasta em bens finais, $C+I+G+X-M$.
- **Ótica da renda**: soma as rendas pagas aos fatores (salários, lucros, juros, aluguéis) mais impostos líquidos de subsídios.

:::intuicao Por que dão o mesmo número
Cada real gasto na compra de um bem final é, ao mesmo tempo, a **receita** de quem o produziu e, portanto, a **renda** de alguém (salário, lucro, imposto). E esse bem foi **produzido** por alguém. É o mesmo real contado de três ângulos.
:::

:::exemplo Valor adicionado e dupla contagem
Um produtor de trigo vende trigo por R\$ 100 ao moinho. O moinho vende farinha por R\$ 180 à padaria. A padaria vende o pão ao consumidor por R\$ 300. Qual o PIB dessa cadeia?
---
O **bem final** é o pão: R\$ 300. Esse é o PIB pela ótica da despesa.
---
Pela produção, some o valor adicionado de cada elo: trigo $100-0=100$; moinho $180-100=80$; padaria $300-180=120$.
---
Total: $100+80+120=300$. Mesmo resultado.
---
Se somássemos as vendas brutas, $100+180+300=580$, contaríamos o trigo três vezes. É a **dupla contagem**.
:::

```sim
id: fluxo-circular
```

## A ótica da despesa

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

Importações são **subtraídas** porque parte de $C$, $I$ e $G$ foi gasta em coisas produzidas fora, e o PIB é a produção *interna*. Mexa nos componentes e veja o PIB mudar. Depois, na parte de baixo, veja a diferença entre crescimento nominal e real.

```sim
id: pib-composicao
```

:::atencao Investimento não é aplicar dinheiro
Em Macroeconomia, **investimento** ($I$) é a compra de bens de capital novos: máquinas, prédios, estoques. Comprar ações ou títulos é uma transferência de propriedade, não produção nova, e não entra em $I$. É uma das pegadinhas mais comuns.
:::

## O que fica de fora do PIB

- **Bens usados**: o carro usado foi contado quando foi produzido. Entra só a comissão do revendedor, que é serviço novo.
- **Transações financeiras** e transferências (aposentadorias, Bolsa Família): não compram produção. Entram só quando as famílias gastam, como consumo.
- **Trabalho doméstico não pago** e atividades não mercantis.
- **Economia informal** que não é captada pelas estatísticas, embora o IBGE faça estimativas.

## Nominal e real

O **PIB nominal** usa os preços do ano corrente; por isso cresce quando a produção cresce **ou** quando os preços sobem. O **PIB real** usa preços de um ano-base e mede só a variação da quantidade. O [deflator](gloss:deflator do PIB, índice de preços implícito) liga os dois:

$$
\text{deflator} = \frac{PIB_{nominal}}{PIB_{real}} \times 100
$$

:::exemplo Nominal, real e deflator
Uma economia só produz pão. No ano-base (2020), vende 100 pães a R\$ 2. Em 2021, vende 110 pães a R\$ 2,50. Calcule o crescimento nominal, o real e o deflator.
---
PIB nominal: 2020 $=100\cdot 2=200$. 2021 $=110\cdot 2{,}5=275$. Crescimento nominal: $\dfrac{275}{200}-1=37{,}5\%$.
---
PIB real de 2021, a preços do ano-base: $110\cdot 2=220$. Crescimento real: $\dfrac{220}{200}-1=10\%$. É o aumento de **quantidade**, de 100 para 110 pães.
---
Deflator de 2021: $\dfrac{275}{220}\times 100=125$. Os preços subiram 25%.
---
Confira a relação: $\dfrac{1{,}375}{1{,}25}=1{,}10$, ou seja, 10% reais. A economia "cresceu" 37,5%, mas só 10% foi produção a mais.
:::

Para taxas, vale $1+g_{real}=\dfrac{1+g_{nominal}}{1+\pi}$. Se o PIB nominal cresceu 10% e o deflator subiu 5%, o crescimento real é $\dfrac{1{,}10}{1{,}05}-1\approx 4{,}76\%$, e não 5%. É a mesma lógica do juro real de Fisher.

:::resumo Para levar
PIB real = PIB nominal ÷ deflator. Para comparar o produto **no tempo**, use sempre o real. E o crescimento real **não** é a subtração simples ($nominal-inflação$): é a razão $\frac{1+nominal}{1+inflação}-1$.
:::

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

## PIB, PNB e renda nacional

O PIB conta o que se produz **no território**, não importa de quem. Já a **renda nacional bruta** (antes chamada de PNB) conta o que pertence aos **residentes**:

$$
RNB = PIB + \text{renda recebida do exterior} - \text{renda enviada ao exterior}.
$$

Uma fábrica estrangeira no Brasil entra no PIB brasileiro, mas o lucro que ela remete à matriz sai da renda dos residentes. Para países que pagam muitos juros e lucros ao exterior, a RNB fica abaixo do PIB.

## Limites do PIB como medida de bem-estar

O PIB mede produção de mercado, não **bem-estar**. Ele não desconta a depleção ambiental, não capta a desigualdade (por isso se olha o PIB *per capita* e indicadores de distribuição), ignora lazer e trabalho doméstico e conta como "produção" gastos que apenas reparam danos (como a reconstrução depois de um desastre). Ainda assim, é a melhor medida de **atividade econômica** que temos, e a que alimenta as decisões de política monetária e fiscal.

Para ter ideia da composição, o consumo das famílias é, de longe, o maior componente da demanda no Brasil. Confira os números atuais nas Contas Nacionais do IBGE, que são revisados a cada divulgação.

## Questão no formato ANPEC (Tipo B)

```quiz-b
id: qb-pib-real
stem: |
  O PIB nominal de uma economia cresceu 21% e o deflator do PIB subiu 10% no mesmo período. Calcule o crescimento real do PIB, em pontos percentuais.
answer: 10
explanation: |
  $1+g_{real}=\dfrac{1{,}21}{1{,}10}=1{,}10$, logo $g_{real}=10\%$.
```

## Vocabulário para ler relatórios em inglês

Em relatórios do FMI, do Banco Central e de bancos, aparecem termos como [output gap](gloss:hiato do produto: diferença entre o PIB efetivo e o potencial), [nominal](gloss:em valores correntes) e [real](gloss:descontada a inflação). Quando ler "real GDP grew 2.5% year over year", entenda: o PIB descontada a inflação cresceu 2,5% em relação ao mesmo período do ano anterior.

## Erros que custam pontos

- Incluir bens intermediários no cálculo do PIB, e assim contar duas vezes.
- Esquecer de subtrair $M$, ou somar transferências em $G$.
- Comparar PIBs de anos diferentes **nominais**: a diferença pode ser só inflação.
- Calcular o crescimento real como $nominal-inflação$ em vez da razão.

## Como estudar este tema

Monte do zero uma cadeia produtiva de três elos com números seus e calcule o PIB pelas duas óticas (valor adicionado e bem final). Depois pegue uma série de PIB nominal e deflator e calcule a série de PIB real. No Laboratório de programação, a lição de Python aplicada à Economia automatiza esse cálculo.
