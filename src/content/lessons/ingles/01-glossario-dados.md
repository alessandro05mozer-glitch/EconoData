---
id: ingles-01-glossario-dados
track: ingles
title: Vocabulário essencial de dados em inglês
order: 1
seq: 9
minutes: { quick: 15, full: 40 }
objectives:
  - Reconhecer 15 termos de dados e economia que aparecem em vagas e artigos
  - Entender frases típicas de documentação e de relatórios
  - Ler uma descrição de vaga sem tradutor
cards:
  - front: "**overfit** (verbo e substantivo)"
    back: "Quando o modelo aprende o ruído dos dados de treino e generaliza mal para dados novos."
  - front: "**outlier**"
    back: "Observação muito distante das demais."
  - front: "**dataset**, **sample**, **population**"
    back: "Conjunto de dados; amostra; população."
  - front: "\"We are looking for someone with hands-on experience in SQL.\" O que significa?"
    back: "Procuramos alguém com experiência prática em SQL."
---

Você não precisa de inglês perfeito para começar a ler documentação. Precisa de **um vocabulário curto, repetido muitas vezes**. Passe o mouse (ou toque) sobre os termos sublinhados para ver a tradução.

## Os termos que mais aparecem

| Termo | Significado |
|---|---|
| [dataset](gloss:conjunto de dados) | tabela ou coleção de dados que você analisa |
| [sample](gloss:amostra) / [population](gloss:população) | parte observada / todo de interesse |
| [outlier](gloss:valor atípico) | observação muito distante das demais |
| [missing values](gloss:valores faltantes) | células sem dado |
| [fit a model](gloss:ajustar um modelo) | estimar os parâmetros de um modelo |
| [overfit](gloss:sobreajuste: o modelo decora o ruído) | ajustar demais aos dados de treino |
| [bias](gloss:viés) / [variance](gloss:variância) | erro sistemático / sensibilidade à amostra |
| [robust](gloss:robusto: pouco afetado por outliers ou violações de hipóteses) | resistente a problemas nos dados |
| [hands-on](gloss:prático) | com experiência real |

## Lendo uma frase de verdade

> The model overfits the training data, so we use cross-validation to estimate how it will perform on new data.

Ou, em português: "O modelo sobreajusta os dados de treino, então usamos validação cruzada para estimar o desempenho em dados novos."

Estratégia de leitura: ache o **verbo principal** (*overfits*, *use*), depois o sujeito (*the model*, *we*), depois o resto.

## Questão de compreensão

```quiz-a
id: qa-vocab
stem: |
  Julgue as afirmativas sobre o vocabulário.
items:
  - { t: "Em \"the model overfits the training data\", o modelo aprende o ruído e generaliza mal.", c: true }
  - { t: "\"Missing values\" significa valores muito grandes.", c: false }
  - { t: "\"Hands-on experience\" significa experiência prática.", c: true }
  - { t: "\"Sample\" e \"population\" são sinônimos.", c: false }
explanation: |
  *Missing values* são células sem dado, não valores grandes. A amostra (*sample*) é uma parte da população (*population*).
```

<!--full-->

## Descrição de vaga: lendo sem pânico

> We are looking for a Data Analyst with hands-on experience in SQL and Python. You will build dashboards, clean messy datasets and communicate findings to non-technical stakeholders.

Palavras-chave: *looking for* (procuramos), *build* (construir), *clean* (limpar), *findings* (achados, resultados), *stakeholders* (partes interessadas). Note que "non-technical" significa "não técnicos".

## Como estudar

1. Leia 5 minutos de documentação em inglês por dia (por exemplo, a documentação do pandas).
2. Anote só as palavras que aparecem **mais de uma vez**.
3. Os cartões de revisão desta lição trazem os termos mais importantes.
