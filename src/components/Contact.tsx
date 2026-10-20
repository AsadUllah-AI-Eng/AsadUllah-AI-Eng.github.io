import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { contact, links } from '../data/content'
import { GithubIcon, LinkedinIcon } from './icons'
import Reveal from './Reveal'
import Section from './Section'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked: the mailto button still works */
    }
  }

  const profiles = [
    { label: 'LinkedIn', href: links.linkedin, icon: <LinkedinIcon size={20} /> },
    { label: 'GitHub', href: links.github, icon: <GithubIcon size={20} /> },
  ].map((p) => ({ ...p, handle: p.href.replace(/^https:\/\/(www\.)?/, '').replace(/[?#].*$/, '').replace(/\/$/, '') }))

  return (
    <Section id="contact" index="05" label="Contact" title={contact.heading}>
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-7 sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-accent-soft blur-3xl"
          />
          <p className="relative max-w-xl text-xl leading-relaxed text-fg sm:text-2xl">{contact.line}</p>

          <div className="relative mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${links.email}`}
              className="inline-flex items-center gap-2.5 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-on-accent transition-transform hover:-translate-y-0.5"
            >
              <Mail size={17} aria-hidden="true" />
              {contact.cta}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2.5 rounded-full border border-line px-5 py-3.5 font-mono text-sm text-muted transition-colors hover:border-accent hover:text-fg"
            >
              {links.email}
              {copied ? (
                <Check size={15} aria-hidden="true" className="text-accent" />
              ) : (
                <Copy size={15} aria-hidden="true" />
              )}
              <span className="sr-only">{copied ? 'Copied' : 'Copy email address'}</span>
            </button>
            <span role="status" className="sr-only">
              {copied ? 'Email address copied to clipboard' : ''}
            </span>
          </div>

          <ul className="relative mt-10 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
            {profiles.map((p) => (
              <li key={p.label}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl p-3 -m-3 transition-colors hover:bg-surface-2"
                >
                  <span className="text-muted transition-colors group-hover:text-accent">{p.icon}</span>
                  <span className="flex-1">
                    <span className="block font-medium">{p.label}</span>
                    <span className="block text-sm text-muted">{p.handle}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="text-muted transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
