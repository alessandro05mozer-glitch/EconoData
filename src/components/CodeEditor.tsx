import { python } from '@codemirror/lang-python'
import { sql } from '@codemirror/lang-sql'
import { StreamLanguage } from '@codemirror/language'
import { r } from '@codemirror/legacy-modes/mode/r'
import { oneDark } from '@codemirror/theme-one-dark'
import CodeMirror from '@uiw/react-codemirror'
import { useMemo } from 'react'
import type { Lang } from '../lib/types'
import { useTheme } from '../lib/theme'

export function CodeEditor({
  lang,
  value,
  onChange,
  minHeight = '9rem',
}: {
  lang: Lang
  value: string
  onChange: (v: string) => void
  minHeight?: string
}) {
  const { effective } = useTheme()
  const extensions = useMemo(() => {
    if (lang === 'python') return [python()]
    if (lang === 'sql') return [sql()]
    return [StreamLanguage.define(r)]
  }, [lang])
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      extensions={extensions}
      theme={effective === 'dark' ? oneDark : 'light'}
      minHeight={minHeight}
      basicSetup={{ lineNumbers: true, foldGutter: false, highlightActiveLine: false }}
      aria-label={`Editor de código ${lang}`}
    />
  )
}
