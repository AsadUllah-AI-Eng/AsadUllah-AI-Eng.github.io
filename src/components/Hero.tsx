import type { CSSProperties } from 'react'
import { ArrowDown, Download, Mail } from 'lucide-react'
import { hero, links, portrait, site } from '../data/content'
import { GithubIcon, LinkedinIcon } from './icons'

const socials = [
  { label: 'GitHub', href: links.github, icon: <GithubIcon size={18} /> },
  { label: 'LinkedIn', href: links.linkedin, icon: <LinkedinIcon size={18} /> },
  { label: 'Email', href: `mailto:${links.email}`, icon: <Mail size={18} aria-hidden="true" /> },
]

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

/**
 * One <img> for every breakpoint (so it downloads once): a small round avatar above the name on
 * mobile, a tall portrait card in the right column on desktop. width/height reserve the space.
 */
function Portrait() {
  return (
    <div className="portrait-in order-first mb-8 lg:order-none lg:mb-0 lg:justify-self-end">
      <div className="portrait-float relative w-fit">
        {/* Glow is a radial gradient rather than filter: blur, which is much cheaper to paint. */}
        <div
          aria-hidden="true"
          className="absolute -inset-6 bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent)_35%,transparent),transparent)] lg:-inset-x-20 lg:-inset-y-16 lg:bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent)_28%,transparent),transparent)]"
        />
        <div className="portrait-border relative rounded-full p-[1.5px] lg:rounded-3xl">
          <div className="portrait-bg overflow-hidden rounded-full lg:rounded-[calc(1.5rem-1.5px)]">
            <img
              src={portrait.src}
              srcSet={portrait.srcSet}
              sizes="(min-width: 1024px) 360px, 112px"
              width={portrait.width}
              height={portrait.height}
              alt={portrait.alt}
              loading="eager"
              {...{ fetchpriority: 'high' } /* React 18 only forwards the lowercase DOM attribute */}
              decoding="async"
              className="size-24 object-cover object-[50%_15%] sm:size-28 lg:h-auto lg:w-[clamp(18rem,26vw,22.5rem)]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative isolate overflow-hidden">
      {/* Backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-grid absolute inset-0" />
        <div className="hero-glow hero-glow-a left-[-10%] top-[-10%] h-[38rem] w-[38rem]" />
        <div className="hero-glow hero-glow-b right-[-15%] top-[15%] h-[32rem] w-[32rem]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="mx-auto grid min-h-[100svh] max-w-6xl content-center items-center px-5 pb-24 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-[1fr_auto] lg:gap-16">
        <div>
          <p
            className="rise mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur"
            style={delay(0)}
          >
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {hero.eyebrow}
          </p>

          <h1 className="rise-solid font-display text-[clamp(3.25rem,10vw,7.75rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
            {hero.title.split(' ')[0]}
            <br />
            <span className="text-muted">{hero.title.split(' ').slice(1).join(' ')}</span>
            <span className="text-accent">.</span>
          </h1>

          <p
            className="rise mt-8 max-w-2xl font-display text-lg font-medium leading-snug tracking-tight text-balance text-fg sm:text-xl lg:text-2xl"
            style={delay(120)}
          >
            {/* Each " · " segment gets its own line so the tagline never breaks mid-phrase. */}
            {hero.tagline.split(' · ').map((part, i) => (
              <span key={part} className={`block ${i > 0 ? 'text-muted' : ''}`}>
                {i > 0 && <span className="sr-only"> · </span>}
                {part}
              </span>
            ))}
          </p>
          <p
            className="rise mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            style={delay(200)}
          >
            {hero.intro}
          </p>

          <div className="rise mt-10 flex flex-wrap items-center gap-3" style={delay(280)}>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-transform hover:-translate-y-0.5"
            >
              {hero.primaryCta}
              <ArrowDown size={16} aria-hidden="true" className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={site.resume}
              download
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-6 py-3 text-sm font-semibold backdrop-blur transition-[transform,border-color] hover:-translate-y-0.5 hover:border-accent"
            >
              <Download size={16} aria-hidden="true" />
              {hero.secondaryCta}
            </a>

            <ul className="ml-1 flex items-center gap-1 sm:ml-3" aria-label="Social links">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="grid size-11 place-items-center rounded-full text-muted transition-[color,transform] hover:-translate-y-0.5 hover:text-accent"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Portrait />
      </div>
    </section>
  )
}
