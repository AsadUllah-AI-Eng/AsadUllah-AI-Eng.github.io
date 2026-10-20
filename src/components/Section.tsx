import type { ReactNode } from 'react'
import Reveal from './Reveal'

interface SectionProps {
  id: string
  index: string
  label: string
  title: string
  children: ReactNode
}

export default function Section({ id, index, label, title, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-12 sm:mb-16">
          <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            <span className="text-accent">{index}</span>
            <span className="h-px w-8 bg-line" aria-hidden="true" />
            {label}
          </p>
          <h2
            id={`${id}-title`}
            className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-5xl"
          >
            {title}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  )
}
