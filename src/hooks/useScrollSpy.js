import { useEffect, useState } from 'react'

/**
 * 스크롤 위치를 보고 현재 보이는 섹션 id를 돌려준다.
 * 헤더가 sticky라서, 헤더 아래쪽(offset)을 기준선으로 삼아
 * 그 선을 지나간 마지막 섹션을 활성으로 본다.
 */
export function useScrollSpy(ids, offset = 0) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement

      // 페이지 맨 아래에서는 마지막 섹션이 짧아도 활성으로 잡아준다.
      if (window.scrollY + window.innerHeight >= doc.scrollHeight - 2) {
        setActiveId(ids[ids.length - 1])
        return
      }

      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) current = id
      }
      setActiveId(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ids, offset])

  return activeId
}
