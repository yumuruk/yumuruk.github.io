const VelogIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-[0.85em] h-[0.85em] translate-y-[0.06em]"
  >
    <path d="M0 3C0 1.343 1.343 0 3 0h18c1.657 0 3 1.343 3 3v18c0 1.657-1.343 3-3 3H3c-1.657 0-3-1.343-3-3V3zm10.5 16h3L17.7 8h-2.4l-3.6 8.3L8.4 8H6l4.5 11z" />
  </svg>
)

// Home(모바일)과 Sidebar(데스크톱)가 같이 쓰는 외부 링크 목록.
const LINKS = [
  { label: 'GitHub', href: 'https://github.com/yumuruk', icon: <i className="fab fa-github" /> },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/%ED%95%9C%EC%84%B1-%EC%9C%A0-617055317/',
    icon: <i className="fab fa-linkedin" />,
  },
  { label: 'velog', href: 'https://velog.io/@yumuruk/posts', icon: <VelogIcon />, hover: 'hover:text-[#20c997]' },
  { label: 'Email', href: 'mailto:chiccc98@gmail.com', icon: <i className="fas fa-envelope" /> },
]

/** className: 줄 배치(간격·정렬), linkClassName: 아이콘 크기·효과 */
export default function SocialLinks({ className = '', linkClassName = '' }) {
  return (
    <div className={`flex items-center ${className}`}>
      {LINKS.map((l) => {
        const external = !l.href.startsWith('mailto:')
        return (
          <a
            key={l.label}
            href={l.href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
            aria-label={l.label}
            className={`flex items-center text-slate-500 ${l.hover ?? 'hover:text-emerald-800'} ${linkClassName}`}
          >
            {l.icon}
          </a>
        )
      })}
    </div>
  )
}
