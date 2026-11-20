import ReactMarkdown, { type Components } from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

// Termo em inglês com tradução: [hedge](gloss:proteção) vira um termo com a tradução no balão.
const components: Components = {
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

export function Markdown({ text }: { text: string }) {
  return (
    <div className="prose-lesson">
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
