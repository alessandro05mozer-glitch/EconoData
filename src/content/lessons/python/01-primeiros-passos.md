---
id: python-01-primeiros-passos
track: python
title: Python do zero — variáveis, listas e funções
order: 1
seq: 3
minutes: { quick: 25, full: 75 }
objectives:
  - Guardar valores em variáveis e fazer contas
  - Usar listas e o laço for
  - Escrever uma função que recebe dados e devolve um resultado
  - Aplicar a ideia numa conta econômica (inflação acumulada)
cards:
  - front: "Como se escreve uma função em Python que devolve o dobro de `x`?"
    back: "```python\ndef dobro(x):\n    return x * 2\n```"
  - front: "Qual a diferença entre `print(x)` e `return x`?"
    back: "`print` mostra na tela; `return` entrega o valor para quem chamou a função, que pode usá-lo depois."
---

Python é a linguagem mais usada em análise de dados. Nesta lição você vai escrever e **rodar código de verdade aqui no navegador**. Na primeira execução o Python demora um pouco para carregar; depois fica rápido.

## Variáveis e contas

Uma variável é um nome que guarda um valor.

```python
salario = 3000
reajuste = 0.05
novo = salario * (1 + reajuste)
print(novo)   # 3150.0
```

Operadores: `+`, `-`, `*`, `/` (divisão), `**` (potência), `//` (divisão inteira), `%` (resto).

## Listas e for

Uma lista guarda vários valores em ordem. O laço `for` percorre a lista.

```python
taxas = [0.5, 0.3, 0.4]
soma = 0
for t in taxas:
    soma = soma + t
print(soma)
```

Repare na **indentação** (os 4 espaços): é ela que diz o que está dentro do laço.

## Funções

Uma função empacota um raciocínio para você reusar.

```python
def media(valores):
    return sum(valores) / len(valores)
```

```exercise
id: py-media
lang: python
quick: true
prompt: |
  Escreva a função `media(valores)` que recebe uma lista de números e devolve a **média aritmética**.
  Use `sum` e `len`.
starter: |
  def media(valores):
      # escreva aqui
      pass
solution: |
  def media(valores):
      return sum(valores) / len(valores)
tests: |
  check("media([2, 4, 6]) = 4", abs(media([2, 4, 6]) - 4) < 1e-9, "esperado 4")
  check("media([10]) = 10", abs(media([10]) - 10) < 1e-9, "uma lista com um só valor")
  check("media([1, 2]) = 1,5", abs(media([1, 2]) - 1.5) < 1e-9, "a divisão deve ser real, não inteira")
hints:
  - "A média é a soma dividida pela quantidade de elementos."
  - "`return sum(valores) / len(valores)`"
```

<!--full-->

## Aplicação: inflação acumulada

Se a inflação foi de 0,5% em janeiro e 0,3% em fevereiro, a inflação acumulada **não** é 0,8%. Os índices se **multiplicam**:

$$
\text{acumulada} = \left[\prod_{i}(1 + r_i)\right] - 1,\qquad r_i = \frac{\text{taxa em \%}}{100}
$$

Com 0,5% e 0,3%: $1{,}005 \times 1{,}003 - 1 = 0{,}008015$, ou 0,8015%. A diferença parece pequena em dois meses, mas em doze meses ela é relevante.

```exercise
id: py-acumulada
lang: python
prompt: |
  Escreva `acumular(taxas)`: recebe uma lista de taxas **em porcentagem** (por exemplo `[0.5, 0.3]`) e devolve a taxa acumulada **também em porcentagem**.

  Exemplo: `acumular([0.5, 0.3])` deve dar `0.8015`.
starter: |
  def acumular(taxas):
      indice = 1.0
      for t in taxas:
          pass  # multiplique o índice por (1 + t/100)
      return (indice - 1) * 100
solution: |
  def acumular(taxas):
      indice = 1.0
      for t in taxas:
          indice = indice * (1 + t / 100)
      return (indice - 1) * 100
tests: |
  check("acumular([0.5, 0.3]) = 0,8015", abs(acumular([0.5, 0.3]) - 0.8015) < 1e-9, "lembre de multiplicar, não somar")
  check("lista vazia dá 0", abs(acumular([])) < 1e-12, "sem taxas, a inflação acumulada é zero")
  check("12 meses de 1% = 12,6825%", abs(acumular([1.0] * 12) - 12.682503013196973) < 1e-6, "1% ao mês por 12 meses")
hints:
  - "Dentro do laço: `indice = indice * (1 + t / 100)`."
  - "No fim, `(indice - 1) * 100` converte o índice de volta para porcentagem. Isso já está no código inicial."
```

## Erros comuns

- Esquecer o `return` (a função devolve `None`).
- Misturar a taxa em porcentagem (`0.5`) com a taxa decimal (`0.005`). Escolha uma e converta na entrada.
- Indentação inconsistente: use sempre 4 espaços.
