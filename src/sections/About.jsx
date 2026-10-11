import Section from '../components/Section.jsx'
import Panel from '../components/Panel.jsx'
import TimelineItem, { DetailRow } from '../components/TimelineItem.jsx'
import { CARD_SHADOW_HOVER } from '../components/styles.js'

const chip = 'px-2 py-0.5 text-xs font-semibold rounded-sm bg-emerald-100 text-emerald-800'

const ChipList = ({ items }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((item) => (
      <span key={item} className={chip}>
        {item}
      </span>
    ))}
  </div>
)

const INFO = [
  { k: 'Name', v: 'YuHansung' },
  { k: 'Languages', v: 'Korean (Native), English (Conversational / Professional)' },
  {
    k: 'Programming Languages',
    v: <ChipList items={['Python', 'MATLAB', 'C', 'C#', 'JavaScript']} />,
  },
  {
    k: 'Frameworks',
    v: <ChipList items={['PyTorch', 'OpenCV', 'React Native', 'Flutter']} />,
  },
  {
    k: 'Development Tools',
    v: <ChipList items={['Visual Studio Code', 'Unity', 'MATLAB', 'Git']} />,
  },
]

const EDUCATION = [
  {
    year: '2026',
    degree: 'M.S. in Computer Science and Artificial Intelligence',
    org: 'Dongguk University, Seoul, South Korea',
    thesis:
      'Detection-guided deep unfolding for joint underwater image enhancement and object detection',
    supervisor: 'Prof. Chul Lee',
    supervisorHref: 'https://cilab.dongguk.edu/',
    gpa: '4.42 / 4.5',
  },
  {
    year: '2024',
    degree: 'B.S. in Computer Science',
    org: 'Tech University of Korea, Siheung, South Korea',
    gpa: '3.92 / 4.5',
    majorGpa: '4.08 / 4.5',
  },
]

const INTERESTS = [
  {
    label: 'COMPUTER SCIENCE',
    text: 'Model-based deep learning, Deep learning, Computer vision, Image processing, Image restoration',
  },
  { label: 'DEVELOPMENT', text: 'Web and application development, Simulation based on Unity' },
]

const InfoList = ({ items }) => (
  <dl className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-y-3">
    {items.map((item) => (
      <div key={item.k} className="contents">
        <dt className="font-semibold text-emerald-900">{item.k}</dt>
        <dd className="text-slate-700">{item.v}</dd>
      </div>
    ))}
  </dl>
)

const Tag = ({ children }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-semibold tracking-wide bg-emerald-600 text-white ${CARD_SHADOW_HOVER}`}
  >
    {children}
  </span>
)

const EducationItem = ({ year, degree, org, thesis, gpa, majorGpa, grade, supervisor, supervisorHref }) => {
  const hasDetail = thesis || supervisor || gpa || majorGpa || grade

  return (
    <TimelineItem period={year} title={degree} org={org}>
      {hasDetail ? (
        <>
          {thesis && (
            <DetailRow label="Thesis">
              <span className="italic">&quot;{thesis}&quot;</span>
            </DetailRow>
          )}

          {supervisor && (
            <DetailRow label="Supervisor">
              {supervisorHref ? (
                <a
                  href={supervisorHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-800 hover:text-emerald-600 underline decoration-emerald-200 underline-offset-2 transition-colors"
                >
                  {supervisor}
                </a>
              ) : (
                supervisor
              )}
            </DetailRow>
          )}

          {(gpa || majorGpa || grade) && (
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {gpa && (
                <div className="flex gap-1.5">
                  <span className="font-bold text-emerald-700">GPA:</span>
                  <span>{gpa}</span>
                </div>
              )}
              {majorGpa && (
                <div className="flex gap-1.5">
                  <span className="font-bold text-emerald-700">Major:</span>
                  <span>{majorGpa}</span>
                </div>
              )}
              {grade && (
                <div className="flex gap-1.5">
                  <span className="font-bold text-emerald-700">Rank:</span>
                  <span>{grade}</span>
                </div>
              )}
            </div>
          )}
        </>
      ) : null}
    </TimelineItem>
  )
}

const InterestItem = ({ label, text }) => (
  <div
    className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-2 sm:gap-4 py-4 first:pt-0 last:pb-0"
  >
    <div className="sm:pt-1">
      <Tag>{label}</Tag>
    </div>
    <p className="text-slate-700 leading-relaxed">{text}</p>
  </div>
)

export default function About() {
  return (
    <Section id="about" title="About Me" className="lg:min-h-screen">
      <div className="space-y-8 pb-4">
        <Panel title="Information">
          <InfoList items={INFO} />
        </Panel>

        <div>
          <h3 className="text-2xl font-light text-emerald-900 mb-4">Education</h3>
          <div className="space-y-4">
            {EDUCATION.map((e) => (
              <EducationItem key={`${e.year}-${e.degree}`} {...e} />
            ))}
          </div>
        </div>

        <Panel title="Academic Interests">
          <div className="divide-y divide-emerald-100">
            {INTERESTS.map((i) => (
              <InterestItem key={i.label} label={i.label} text={i.text} />
            ))}
          </div>
        </Panel>
      </div>
    </Section>
  )
}
