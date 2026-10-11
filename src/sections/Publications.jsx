import Section from '../components/Section.jsx'
import { CARD_SHADOW_HOVER } from '../components/styles.js'

const ME = 'Hansung Yu'

const PUBLICATIONS = [
  {
    tag: 'Access',
    title:
      'Detection-Guided Deep Unfolding for Joint Underwater Image Enhancement and Object Detection',
    authors: ['Hansung Yu', 'Chuong Hoang Vo', 'Chul Lee'],
    venue: (
      <>
        <span className="italic">IEEE Access</span>, 2026
      </>
    ),
    links: [
      { label: 'Paper', href: 'https://doi.org/10.1109/ACCESS.2026.3659134' },
      { label: 'Code', href: 'https://github.com/yumuruk/DGUNet' },
    ],
  },
  {
    tag: 'EAAI',
    title: 'Physics-driven prior learning-based deep unrolling for underwater image enhancement',
    authors: ['Thuy Thi Pham', 'Hansung Yu', 'Truong Thanh Nhat Mai', 'Chul Lee'],
    venue: (
      <>
        <span className="italic">Engineering Applications of Artificial Intelligence</span>, 2025
      </>
    ),
    links: [
      { label: 'Paper', href: 'https://doi.org/10.1016/j.engappai.2025.112472' },
      { label: 'Code', href: 'https://github.com/thithuypham/BLUE-Net' },
    ],
  },
  {
    tag: 'JVCIR',
    title:
      'Dual-channel prior-based deep unfolding with contrastive learning for underwater image enhancement',
    authors: ['Thuy Thi Pham', 'Truong Thanh Nhat Mai', 'Hansung Yu', 'Chul Lee'],
    venue: (
      <>
        <span className="italic">Journal of Visual Communication and Image Representation</span>, 2025
      </>
    ),
    links: [
      { label: 'Paper', href: 'https://doi.org/10.1016/j.jvcir.2025.104500' },
      { label: 'Code', href: 'https://github.com/thithuypham/Dual-CLUE' },
    ],
  },
]

const AuthorList = ({ authors }) => (
  <p className="text-slate-700 text-sm sm:text-base">
    {authors.map((name, i) => (
      <span key={`${name}-${i}`}>
        {name === ME ? <strong className="text-slate-900 font-semibold">{name}</strong> : name}
        {i < authors.length - 1 && ', '}
      </span>
    ))}
  </p>
)

const PublicationItem = ({ tag, title, authors, venue, links }) => (
  <div
    className={`grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-md border border-emerald-100 ${CARD_SHADOW_HOVER}`}
  >
    <div className="sm:pt-1">
      <span className="inline-flex items-center px-3 py-1 rounded-sm text-xs font-semibold bg-emerald-600 text-white">
        {tag}
      </span>
    </div>

    <div className="space-y-2">
      <h4 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">{title}</h4>
      <AuthorList authors={authors} />
      <p className="text-slate-600 text-sm">{venue}</p>
      <div className="flex flex-wrap gap-2 pt-2">
        {links?.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 text-xs font-semibold border border-slate-300 rounded hover:bg-slate-100"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </div>
)

export default function Publications() {
  return (
    <Section id="publications" title="Publications">
      <div className="pb-4">
        <div className="space-y-4">
          {PUBLICATIONS.map((p, i) => (
            <PublicationItem key={i} {...p} />
          ))}
        </div>
      </div>
    </Section>
  )
}
