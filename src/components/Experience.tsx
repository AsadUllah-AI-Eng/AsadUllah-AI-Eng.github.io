import { experience } from '../data/content'
import Reveal from './Reveal'
import Section from './Section'

export default function Experience() {
  return (
    <Section id="experience" index="03" label="Experience" title="Where I’ve worked">
      <ol className="relative ml-1.5 border-l border-line sm:ml-0">
        {experience.map((job, i) => (
          <Reveal as="li" key={`${job.company}-${job.role}`} delay={i * 0.06} className="relative pb-14 pl-8 last:pb-0 sm:pl-12">
            <span
              aria-hidden="true"
              className={`absolute -left-[7px] top-1.5 size-3.5 rounded-full border-2 border-bg ${
                job.period.includes('Present') ? 'bg-accent shadow-[0_0_0_4px_var(--accent-soft)]' : 'bg-line'
              }`}
            />
            <div className="grid gap-2 sm:grid-cols-[1fr_auto] sm:gap-8">
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{job.role}</h3>
                <p className="mt-1 text-muted">
                  <span className="font-medium text-fg">{job.company}</span> · {job.location}
                </p>
              </div>
              <p className="order-first font-mono text-xs uppercase tracking-[0.14em] text-accent sm:order-none sm:pt-2">
                {job.period}
              </p>
            </div>
            <ul className="mt-5 max-w-2xl space-y-2.5">
              {job.points.map((pt) => (
                <li key={pt} className="relative pl-5 leading-relaxed text-muted">
                  <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-2.5 bg-accent" />
                  {pt}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
