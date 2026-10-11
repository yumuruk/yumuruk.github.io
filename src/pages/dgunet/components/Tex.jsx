import { useMemo } from 'react'
import katex from 'katex'

// \htmlClass(항별 하이라이트용)만 허용하고, 그 확장에 대한 strict 경고는 끈다.
const OPTIONS = {
  throwOnError: false,
  trust: (ctx) => ctx.command === '\\htmlClass',
  strict: (code) => (code === 'htmlExtension' ? 'ignore' : 'warn'),
}

/** KaTeX 수식. block이면 display 모드(가운데 정렬, 큰 연산자). */
export default function Tex({ tex, block = false, className = '' }) {
  const html = useMemo(() => katex.renderToString(tex, { ...OPTIONS, displayMode: block }), [tex, block])
  const Tag = block ? 'div' : 'span'
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />
}
