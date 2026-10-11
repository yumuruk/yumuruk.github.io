import { useState } from 'react'
import { BIBTEX } from '../data.js'

export default function Bibtex() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(BIBTEX)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // 클립보드 권한이 없으면 사용자가 직접 선택해 복사할 수 있게 둔다
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-sm">
      <button
        type="button"
        onClick={copy}
        className="absolute right-3 top-3 rounded-md bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20"
      >
        <i className={`fas ${copied ? 'fa-check' : 'fa-copy'} mr-1.5`} />
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre className="overflow-x-auto p-5 pr-24 text-[13px] leading-relaxed text-slate-100">
        <code>{BIBTEX}</code>
      </pre>
    </div>
  )
}
