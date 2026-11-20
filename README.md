# EconoData

Cursinho pessoal de dados, economia e pesquisa: lições interativas, código real rodando no navegador
(Python, SQL e R), questões no formato ANPEC (Tipo A e B), revisão espaçada e gamificação.

## Rodar

```bash
npm install
npm run dev        # desenvolvimento
npm test           # testes (lógica, parser, SQL, conteúdo)
npm run build      # build de produção em dist/
```

Os exercícios de Python são conferidos com o Pyodide real:
`npm i --no-save pyodide@314.0.8 && node scripts/check-exercises.mjs`.

## Como o app é montado

- **Lições** são arquivos `.md` em `src/content/lessons/<trilha>/`. Criar um arquivo novo basta para a lição aparecer.
  Cabeçalho YAML (`id`, `track`, `title`, `order`, `seq`, `minutes`, `objectives`, `cards`), texto em Markdown com
  `$LaTeX$`, a linha `<!--full-->` separa o que só existe na versão completa e blocos especiais:
  `exercise`, `quiz-a`, `quiz-b`, `sim`. Termo em inglês com tradução: `[hedge](gloss:proteção)`.
- **Trilhas**: `src/content/tracks.ts`.
- **Executores**: `src/lib/runners/` (Pyodide em Web Worker, sql.js, WebR). Python e R são baixados de CDN na primeira
  execução e ficam em cache.
- **Progresso**: `src/lib/progress.ts` (funções puras), `src/lib/store.ts` (zustand) e `src/lib/storage.ts`.
  Hoje fica no navegador (localStorage + IndexedDB) com backup/importação em arquivo. Para ligar login e banco, implemente
  `StorageAdapter` (por exemplo com Supabase) e troque `adapter` em `store.ts`.
- **Pontuação ANPEC**: `src/lib/anpec.ts`. **Revisão espaçada**: `src/lib/srs.ts` (SM-2). **XP e níveis**: `src/lib/xp.ts`.

## Conteúdo

As lições atuais são exemplos de cada tipo de bloco. Os dados dos exercícios são fictícios, criados para ensino.
As questões são originais, escritas para estudo, e não reproduzem itens oficiais da ANPEC.
