import Section from '../components/Section.jsx'
import Panel from '../components/Panel.jsx'
import TimelineItem from '../components/TimelineItem.jsx'

/**
 * 경력 항목. 필드는 전부 선택이고, period와 role만 있어도 렌더된다.
 *
 * {
 *   period: '2024.03 – Present',        // 왼쪽 배지
 *   role:   'Research Intern',          // 직함
 *   org:    'Computational Imaging Lab, Dongguk University',
 *   location: 'Seoul, South Korea',     // 선택
 *   bullets: [                          // 선택 — 한 일을 항목으로
 *     'Underwater image enhancement 연구',
 *   ],
 *   tags: ['PyTorch', 'OpenCV'],        // 선택
 * }
 */
export const EXPERIENCE = []

const ExperienceItem = ({ period, role, org, location, bullets, tags }) => (
  <TimelineItem badge={period} title={role} org={[org, location].filter(Boolean).join(' · ')} wide>
    {(bullets?.length || tags?.length) && (
      <>
        {bullets?.length > 0 && (
          <ul className="space-y-1.5 list-disc list-inside">
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}

        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((t) => (
              <span key={t} className="px-2 py-0.5 text-xs font-semibold rounded-sm bg-emerald-100 text-emerald-800">
                {t}
              </span>
            ))}
          </div>
        )}
      </>
    )}
  </TimelineItem>
)

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="pb-4">
        {EXPERIENCE.length > 0 ? (
          <Panel>
            <div className="divide-y divide-emerald-100">
              {EXPERIENCE.map((e) => (
                <ExperienceItem key={`${e.period}-${e.role}`} {...e} />
              ))}
            </div>
          </Panel>
        ) : (
          <Panel bodyClassName="px-6 py-12 text-center text-slate-600">
            <p className="text-lg italic">Will be updated soon.</p>
          </Panel>
        )}
      </div>
    </Section>
  )
}
