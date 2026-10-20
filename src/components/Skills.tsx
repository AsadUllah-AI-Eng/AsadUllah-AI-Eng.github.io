import { skills } from '../data/content'
import Reveal from './Reveal'
import Section from './Section'

/** Stretch the final card so the last row never leaves an empty cell (2-col and 3-col layouts). */
function lastSpan(i: number, n: number) {
  if (i !== n - 1) return ''
  const sm = n % 2 === 1 ? 'sm:col-span-2' : ''
  const lg = n % 3 === 0 ? 'lg:col-span-1' : n % 3 === 1 ? 'lg:col-span-3' : 'lg:col-span-2'
  return `${sm} ${lg}`
}

export default function Skills() {
  return (
    <Section id="skills" index="04" label="Skills" title="Tools I reach for">
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal
            key={group.title}
            delay={(i % 3) * 0.06}
            className={`bg-surface p-6 sm:p-7 ${lastSpan(i, skills.length)}`}
          >
            <h3 className="flex items-center gap-3 font-display text-lg font-semibold tracking-tight">
              <span className="font-mono text-xs font-normal text-accent">{String(i + 1).padStart(2, '0')}</span>
              {group.title}
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-sm text-muted transition-colors hover:border-accent/50 hover:text-fg"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
