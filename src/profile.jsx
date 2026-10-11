import { Fragment } from 'react'

// 사이드바(데스크톱)와 Home(모바일)에 같이 나오는 한 줄 소개.
export const ROLE = 'ML/DL Engineer'
const FOCUS = ['Computer Vision', 'Image processing', 'Deep learning']

/** "A / B / C" — 줄바꿈은 항목 사이에서만 ("Deep / learning"처럼 쪼개지지 않게). */
export const Focus = () =>
  FOCUS.map((f, i) => (
    <Fragment key={f}>
      {i > 0 && ' '}
      <span className="whitespace-nowrap">
        {f}
        {i < FOCUS.length - 1 && ' /'}
      </span>
    </Fragment>
  ))
