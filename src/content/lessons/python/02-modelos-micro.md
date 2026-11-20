---
id: python-02-modelos-micro
track: python
title: Python aplicado — demanda, firma e otimização em código
order: 2
seq: 14
minutes: { quick: 30, full: 80 }
objectives:
  - Transformar uma fórmula de Microeconomia em uma função reutilizável
  - Devolver mais de um valor e desempacotá-los (tuplas)
  - Usar `max`, `if` e laços para tomar decisões e buscar um ótimo numericamente
  - Conferir uma dedução analítica comparando com uma busca em grade
cards:
  - front: "Como uma função Python devolve dois valores e como se recebe?"
    back: "```python\ndef f():\n    return 3, 4   # uma tupla\n\nx, y = f()      # desempacotando\n```"
  - front: "Como escrever \"o maior entre 0 e $z$\" em Python?"
    back: "`max(0, z)`. Útil para quantidades que não podem ser negativas (por exemplo, produzir zero quando o preço não cobre o custo variável)."
  - front: "Para que serve conferir uma fórmula com uma busca em grade?"
    back: "É um teste independente: se a fórmula derivada no papel e a busca por força bruta concordam, a dedução provavelmente está certa."
---

Na lição de Teoria do Consumidor você deduziu no papel que a demanda de uma utilidade Cobb-Douglas é $x^*=\alpha m/p_x$. Na lição da Firma, que a quantidade ótima vem de $p=CMg$. Agora vamos pôr essas fórmulas no computador. A vantagem não é só calcular mais rápido: é poder **variar os parâmetros** à vontade, **conferir** a dedução e deixar o código pronto para um modelo mais complicado, que não tem fórmula fechada.

Esta lição é de **programação**. Se as fórmulas parecerem estranhas, volte às lições de Micro; aqui o foco é traduzir matemática em código.

## De fórmula a função

Uma função recebe **entradas** (os parâmetros do modelo) e devolve **saídas** (o resultado). Para devolver mais de um valor, separe-os por vírgula; Python junta tudo em uma **tupla**, e você pode recebê-la em duas variáveis de uma vez:

```python
def metade_e_dobro(n):
    return n / 2, n * 2

a, b = metade_e_dobro(10)
print(a, b)   # 5.0 20
```

O operador `**` é a potência: `x ** 2` é $x^2$ e `x ** 0.5` é $\sqrt{x}$.

## Exercício 1: a demanda Cobb-Douglas

```exercise
id: py-cobb
lang: python
quick: true
prompt: |
  Escreva `demanda_cd(alpha, renda, px, py)` que devolve a tupla `(x, y)` ótima de uma utilidade Cobb-Douglas $x^{\alpha}y^{1-\alpha}$.

  Lembre: o consumidor gasta a fração $\alpha$ da renda em $x$ e o resto em $y$.
starter: |
  def demanda_cd(alpha, renda, px, py):
      pass
solution: |
  def demanda_cd(alpha, renda, px, py):
      return (alpha * renda / px, (1 - alpha) * renda / py)
tests: |
  x, y = demanda_cd(0.4, 120, 4, 3)
  check("alpha=0,4, m=120, px=4, py=3 dá (12, 24)", abs(x - 12) < 1e-9 and abs(y - 24) < 1e-9, "x = alpha m / px e y = (1 - alpha) m / py")
  x, y = demanda_cd(0.25, 80, 2, 5)
  check("o orçamento é gasto por inteiro", abs(2 * x + 5 * y - 80) < 1e-9, "px*x + py*y deve ser igual à renda")
  x1, _ = demanda_cd(0.5, 100, 2, 1)
  x2, _ = demanda_cd(0.5, 100, 2, 50)
  check("x não depende de py", abs(x1 - x2) < 1e-9, "elasticidade-preço cruzada zero")
hints:
  - "A fração $\\alpha$ da renda vai para $x$; divida o gasto pelo preço para obter a quantidade."
  - "`return alpha * renda / px, (1 - alpha) * renda / py`"
```

Repare no último teste: ele confere uma **propriedade** da teoria (a demanda de $x$ não depende de $p_y$), não só um valor. Testar propriedades é uma das melhores formas de pegar erros de conceito.

## Decisões: if e max

Muitas regras econômicas têm um **corte**: a firma produz se o preço cobre o custo variável, senão produz zero. Em Python:

```python
if p > 10:
    q = (p - 10) / 2
else:
    q = 0
```

Ou, de forma curta e equivalente, `q = max(0, (p - 10) / 2)`.

## Exercício 2: a decisão da firma

```exercise
id: py-firma
lang: python
quick: true
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

<!--full-->

## Exercício 3: Lagrange em código

Na lição de Lagrange, a escolha de um consumidor com $U=\sqrt{xy}$ deu $x^*=\dfrac{m}{2p_x}$ e $y^*=\dfrac{m}{2p_y}$: metade da renda em cada bem.

```exercise
id: py-lagrange
lang: python
prompt: |
  Escreva `otimo(px, py, m)` que devolve `(x, y)` da solução de $\max\sqrt{xy}$ sujeito a $p_xx+p_yy=m$, usando as fórmulas acima.
starter: |
  def otimo(px, py, m):
      pass
solution: |
  def otimo(px, py, m):
      return (m / (2 * px), m / (2 * py))
tests: |
  x, y = otimo(2, 1, 20)
  check("px=2, py=1, m=20 dá (5, 10)", abs(x - 5) < 1e-9 and abs(y - 10) < 1e-9, "x = m/(2 px) e y = m/(2 py)")
  x, y = otimo(4, 5, 100)
  check("a restrição orçamentária fecha", abs(4 * x + 5 * y - 100) < 1e-9, "px*x + py*y deve ser igual a m")
  check("gasta metade da renda em cada bem", abs(4 * x - 50) < 1e-9, "px*x = m/2")
hints:
  - "Cada bem recebe metade da renda: gasto em $x$ é $m/2$, então $x=(m/2)/p_x$."
```

## Conferindo a dedução com uma busca em grade

E se você não soubesse derivar? Dá para **procurar** o ótimo por força bruta: percorra muitas cestas sobre a reta de orçamento, calcule a utilidade de cada uma e fique com a melhor. É lento comparado a uma fórmula, mas funciona para qualquer utilidade, mesmo as que não têm solução fechada. O padrão do algoritmo é sempre o mesmo:

```python
melhor = None
for candidato in candidatos:
    if melhor is None or valor(candidato) > valor(melhor):
        melhor = candidato
```

:::nota Por que isso importa
Em Econometria e em modelos macro mais realistas, o ótimo raramente tem fórmula fechada. Os programas de estimação e de simulação usam exatamente essa ideia de **procurar numericamente** o melhor valor, com métodos mais espertos que a grade.
:::

```exercise
id: py-grade
lang: python
prompt: |
  Escreva `melhor_cesta(alpha, renda, px, py, passos)` que procura, numa grade de `passos` pontos sobre a reta de orçamento, a cesta que maximiza $U=x^{\alpha}y^{1-\alpha}$.

  Para cada `i` de 1 até `passos - 1`, faça `x = (renda / px) * i / passos` e `y = (renda - px * x) / py`. Devolva `(x, y)` do ponto com maior utilidade.
starter: |
  def melhor_cesta(alpha, renda, px, py, passos):
      melhor_u = -1
      melhor = (0, 0)
      for i in range(1, passos):
          x = (renda / px) * i / passos
          y = (renda - px * x) / py
          u = x ** alpha * y ** (1 - alpha)
          # se u for maior que melhor_u, atualize melhor_u e melhor
      return melhor
solution: |
  def melhor_cesta(alpha, renda, px, py, passos):
      melhor_u = -1
      melhor = (0, 0)
      for i in range(1, passos):
          x = (renda / px) * i / passos
          y = (renda - px * x) / py
          u = x ** alpha * y ** (1 - alpha)
          if u > melhor_u:
              melhor_u = u
              melhor = (x, y)
      return melhor
tests: |
  x, y = melhor_cesta(0.5, 100, 2, 4, 1000)
  check("alpha=0,5, m=100, px=2, py=4 dá perto de (25, 12,5)", abs(x - 25) < 0.1 and abs(y - 12.5) < 0.1, "a grade deve achar o mesmo ótimo da fórmula")
  x, y = melhor_cesta(0.3, 120, 4, 3, 1000)
  check("alpha=0,3, m=120, px=4, py=3 dá perto de (9, 28)", abs(x - 9) < 0.1 and abs(y - 28) < 0.1, "x* = alpha m / px e y* = (1 - alpha) m / py")
  x, y = melhor_cesta(0.5, 100, 2, 4, 1000)
  check("a cesta encontrada gasta toda a renda", abs(2 * x + 4 * y - 100) < 1e-6, "os pontos da grade estão sobre a reta de orçamento")
hints:
  - "Dentro do laço: `if u > melhor_u:` e, dentro do `if`, atualize as duas variáveis."
  - "`melhor_u = u` e `melhor = (x, y)`."
```

Agora compare: a grade e a fórmula $x^*=\alpha m/p_x$ concordam. Se discordassem, ou a dedução teria um erro ou o código teria. Esse tipo de verificação cruzada é o hábito mais valioso que a programação traz para a Economia.

## Erros comuns

- Dividir inteiros achando que sairia inteiro: em Python 3, `/` sempre dá decimal; `//` é a divisão inteira.
- Esquecer o parêntese em `x ** (1 - alpha)`: sem ele, a precedência muda o resultado.
- Comparar decimais com `==`. Use uma tolerância, como `abs(a - b) < 1e-9`, porque números decimais têm pequenos erros de arredondamento.
