import { useEffect } from 'react'

/**
 * 주소창에 #publications 같은 해시를 달고 바로 들어온 경우를 처리한다.
 * 브라우저가 해시를 해석하는 시점에는 React가 아직 섹션을 그리지 않아
 * 기본 앵커 점프가 그냥 실패한다. 그래서 마운트 직후 한 번 직접 이동시킨다.
 */
export function useHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return

    const el = document.getElementById(id)
    if (!el) return

    // 첫 페인트 뒤에 옮겨야 레이아웃이 확정된 위치로 간다.
    // 진입 직후이므로 부드러운 스크롤 대신 즉시 이동.
    requestAnimationFrame(() => el.scrollIntoView({ behavior: 'instant' }))
  }, [])
}
