import { ArrowUpRight, Check, Lock } from 'lucide-react'
import { otherBuilds, projects, type Project } from '../data/content'
import { GithubIcon, projectIcons } from './icons'
import Reveal from './Reveal'
import Section from './Section'

/* Placeholder backdrops stay within the single teal/cyan accent family. */
const tints = [
  'radial-gradient(120% 90% at 0% 0%, rgb(45 212 191 / 0.28), transparent 60%), radial-gradient(90% 80% at 100% 100%, rgb(56 189 248 / 0.18), transparent 60%)',
  'radial-gradient(110% 90% at 100% 0%, rgb(45 212 191 / 0.24), transparent 60%), radial-gradient(80% 70% at 0% 100%, rgb(14 165 233 / 0.14), transparent 60%)',
  'radial-gradient(100% 90% at 50% 0%, rgb(20 184 166 / 0.26), transparent 65%)',
  'radial-gradient(110% 90% at 0% 100%, rgb(45 212 191 / 0.24), transparent 60%), radial-gradient(70% 60% at 100% 0%, rgb(56 189 248 / 0.16), transparent 60%)',
  'radial-gradient(100% 90% at 100% 100%, rgb(20 184 166 / 0.26), transparent 60%), radial-gradient(70% 60% at 0% 0%, rgb(14 165 233 / 0.12), transparent 60%)',
]

function Visual({ project, index, wide }: { project: Project; index: number; wide: boolean }) {
  const Icon = projectIcons[project.icon]
  return (
    <div
      className={`relative overflow-hidden border-line bg-surface-2 ${
        wide ? 'aspect-[16/10] border-b lg:aspect-auto lg:min-h-full lg:border-b-0 lg:border-r' : 'aspect-[16/9] border-b'
      }`}
    >
      {project.image ? (
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: tints[index % tints.length] }}>
          <div className="hero-grid absolute inset-0 opacity-70" />
          <div className="absolute inset-0 grid place-items-center">
            <span className="grid size-16 place-items-center rounded-2xl border border-line bg-bg/60 text-accent shadow-[0_0_40px_-8px_var(--accent)] backdrop-blur transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105 sm:size-20">
              <Icon size={wide ? 34 : 30} strokeWidth={1.5} />
            </span>
          </div>
          <span className="absolute left-5 top-4 font-mono text-xs text-muted">{String(index + 1).padStart(2, '0')}</span>
        </div>
      )}
    </div>
  )
}

function TechList({ tech }: { tech: string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
      {tech.map((t) => (
        <li key={t} className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
          {t}
        </li>
      ))}
    </ul>
  )
}

/** Title that links to the repo (stretched over the whole card), or plain text for private projects. */
function CardTitle({ project, className }: { project: Project; className: string }) {
  return (
    <h3 className={`font-display font-semibold tracking-tight text-balance ${className}`}>
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
        >
          {project.title}
          <span className="sr-only"> (GitHub repository, opens in a new tab)</span>
        </a>
      ) : (
        project.title
      )}
    </h3>
  )
}

function CardFooter({ project }: { project: Project }) {
  if (!project.github) {
    return (
      <p className="mt-auto flex items-center gap-2 pt-7 text-sm font-medium text-muted">
        <Lock size={15} aria-hidden="true" />
        Private repository
      </p>
    )
  }
  return (
    <p className="mt-auto flex items-center gap-2 pt-7 text-sm font-medium text-fg" aria-hidden="true">
      <GithubIcon size={16} />
      View on GitHub
      <ArrowUpRight
        size={16}
        className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </p>
  )
}

function FlagshipCard({ project, index }: { project: Project; index: number }) {
  const Icon = projectIcons[project.icon]
  return (
    <Reveal as="li" className="md:col-span-2">
      <article className="group relative isolate overflow-hidden rounded-3xl border border-accent/30 bg-surface p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_30px_70px_-35px_var(--accent)] sm:p-10 lg:p-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-40 -top-48 size-[36rem] bg-[radial-gradient(closest-side,var(--accent-soft),transparent)]" />
          <div className="hero-grid absolute inset-0 opacity-60" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <span
            aria-hidden="true"
            className="grid size-12 place-items-center rounded-xl border border-line bg-bg/60 text-accent shadow-[0_0_40px_-10px_var(--accent)]"
          >
            <Icon size={24} strokeWidth={1.5} />
          </span>
          {project.status && (
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3.5 py-1.5 text-xs font-medium text-fg">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {project.status}
            </p>
          )}
        </div>

        {project.image && (
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            decoding="async"
            className="mt-8 aspect-[16/9] w-full rounded-xl border border-line object-cover"
          />
        )}

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <div className="flex flex-col">
            {project.kicker && (
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-accent">
                {String(index + 1).padStart(2, '0')} · {project.kicker}
              </p>
            )}
            <CardTitle project={project} className="text-2xl sm:text-4xl" />
            <p className="mt-4 leading-relaxed text-muted sm:text-lg sm:leading-relaxed">{project.description}</p>
            <TechList tech={project.tech} />
            <CardFooter project={project} />
          </div>

          {project.highlights && project.highlights.length > 0 && (
            <div className="rounded-2xl border border-line bg-surface-2/80 p-6 sm:p-7">
              <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Highlights</h4>
              <ul className="mt-5 space-y-4">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-fg/90">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent"
                    >
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>
    </Reveal>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const wide = project.size === 'wide'
  return (
    <Reveal as="li" delay={(index % 2) * 0.08} className={wide ? 'md:col-span-2' : ''}>
      <article
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_50px_-25px_var(--accent)] ${
          wide ? 'lg:grid lg:grid-cols-[1.1fr_1fr]' : ''
        }`}
      >
        <Visual project={project} index={index} wide={wide} />

        <div className={`flex flex-1 flex-col p-6 sm:p-7 ${wide ? 'lg:p-10' : ''}`}>
          {project.kicker && (
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-accent">{project.kicker}</p>
          )}
          <CardTitle project={project} className={wide ? 'text-2xl sm:text-3xl' : 'text-xl'} />
          <p className="mt-3 leading-relaxed text-muted">{project.description}</p>
          <TechList tech={project.tech} />
          <CardFooter project={project} />
        </div>
      </article>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <Section id="projects" index="02" label="Featured Projects" title="Things I’ve built">
      <ul className="grid gap-5 md:grid-cols-2 sm:gap-6">
        {projects.map((p, i) =>
          p.size === 'flagship' ? (
            <FlagshipCard key={p.title} project={p} index={i} />
          ) : (
            <ProjectCard key={p.title} project={p} index={i} />
          ),
        )}
      </ul>

      <Reveal className="mt-16">
        <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-muted">Other builds</h3>
        <ul className="grid gap-4 sm:grid-cols-2">
          {otherBuilds.map((b) => {
            const Icon = projectIcons[b.icon]
            return (
              <li key={b.github}>
                <a
                  href={b.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-accent/40"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{b.title}</span>
                    <span className="block truncate text-sm text-muted">{b.tech.join(' · ')}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="shrink-0 text-muted transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                  <span className="sr-only">(GitHub repository, opens in a new tab)</span>
                </a>
              </li>
            )
          })}
        </ul>
      </Reveal>
    </Section>
  )
}
