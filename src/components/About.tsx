import { GraduationCap, MapPin } from 'lucide-react'
import { about, site } from '../data/content'
import Reveal from './Reveal'
import Section from './Section'

export default function About() {
  return (
    <Section id="about" index="01" label="About" title={about.heading}>
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <div className="space-y-6">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed [&:first-child]:text-fg">
                {p}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <aside className="rounded-2xl border border-line bg-surface p-6 sm:p-7" aria-label="Quick facts">
            <p className="flex items-center gap-2 text-sm text-muted">
              <MapPin size={15} aria-hidden="true" className="text-accent" />
              {site.location}
            </p>
            <h3 className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              <GraduationCap size={15} aria-hidden="true" className="text-accent" />
              Education
            </h3>
            <ul className="mt-4 space-y-5">
              {about.education.map((e) => (
                <li key={e.degree} className="border-l-2 border-line pl-4">
                  <p className="font-medium">{e.degree}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    {e.school} · {e.period}
                  </p>
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </div>
    </Section>
  )
}
