import ReactMarkdown, { type Components } from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import type { ReactNode } from 'react'
import { slugify } from '../lib/slug'

// Termo em inglês com tradução: [hedge](gloss:proteção) vira um termo com a tradução no balão.
function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textOf).join('')
  if (node && typeof node === 'object' && 'props' in node) return textOf((node as { props: { children?: ReactNode } }).props.children)
  return ''
}

const components: Components = {
  h2({ children }) {
    return <h2 id={slugify(textOf(children).replace(/[`*_$]/g, ''))}>{children}</h2>
  },
  a({ href, children }) {
    if (href?.startsWith('gloss:')) {
      const meaning = decodeURIComponent(href.slice('gloss:'.length))
      return (
        <abbr className="gloss no-underline" title={meaning} tabIndex={0}>
          {children}
          <span className="sr-only"> ({meaning})</span>
        </abbr>
      )
    }
    return (
      <a href={href} target="_blank" rel="noreferrer noopener">
        {children}
      </a>
    )
  },
}

const urlTransform = (url: string) => (url.startsWith('gloss:') ? url : /^(https?:|mailto:|#|\/)/.test(url) ? url : '')

export function Markdown({ text, compact = false }: { text: string; compact?: boolean }) {
  return (
    <div className={compact ? 'prose-lesson prose-compact' : 'prose-lesson'}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={components}
        urlTransform={urlTransform}
      >
        {text}
      </ReactMarkdown>
    </div>
  )
}
