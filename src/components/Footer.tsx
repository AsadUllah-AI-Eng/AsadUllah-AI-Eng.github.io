import { ArrowUp, Mail } from 'lucide-react'
import { footer, links } from '../data/content'
import { GithubIcon, LinkedinIcon } from './icons'

const socials = [
  { label: 'GitHub', href: links.github, icon: <GithubIcon size={16} /> },
  { label: 'LinkedIn', href: links.linkedin, icon: <LinkedinIcon size={16} /> },
  { label: 'Email', href: `mailto:${links.email}`, icon: <Mail size={16} aria-hidden="true" /> },
]

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>{footer.text}</p>
        <div className="flex items-center gap-1">
          <ul className="flex items-center gap-1" aria-label="Social links">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="grid size-9 place-items-center rounded-full transition-colors hover:text-accent"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#top"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors hover:text-fg"
          >
            Back to top
            <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
