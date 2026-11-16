import { useState } from 'react'
import { ArrowUp, Check, Copy, Download, Mail, MapPin, Phone } from 'lucide-react'
import { RESUME_PDF, person } from '../config/site'
import { LinkedinIcon } from '../components/Icons'
import { LinkButton } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { toast } from '../lib/toast'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email)
      setCopied(true)
      toast('Email address copied to clipboard.', 'success')
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      toast(`Copy failed — my email is ${person.email}`, 'info')
    }
  }

  const tiles = [
    { icon: Mail, label: 'Email', value: person.email, href: `mailto:${person.email}` },
    { icon: Phone, label: 'Phone', value: person.phone, href: person.phoneHref },
    { icon: LinkedinIcon, label: 'LinkedIn', value: 'Mital Chikhaliya', href: person.linkedin, external: true },
    { icon: MapPin, label: 'Location', value: person.location },
  ]

  return (
    <section aria-labelledby="contact-h" className="section-y pb-16">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] border border-accent/30 bg-gradient-to-br from-accent/[0.14] via-surface to-surface p-7 sm:p-12 lg:p-16">
          <div aria-hidden="true" className="drift-a pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-accent/25 blur-[110px]" />
          <Reveal className="relative max-w-4xl">
            <p className="eyebrow mb-4">Contact</p>
            <h2 id="contact-h" className="display text-[clamp(2.5rem,7vw,6rem)]">
              Have a Growth Challenge? <span className="text-accent">Let’s Talk.</span>
            </h2>
            <p className="lead mt-6 max-w-2xl">
              I’m always interested in connecting with professionals and businesses looking to scale through performance marketing and
              data-driven growth strategies.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="relative mt-10 flex flex-wrap gap-3">
            <LinkButton href={person.linkedin} target="_blank" rel="noopener noreferrer" magnetic>
              <LinkedinIcon size={18} /> Let’s Connect
            </LinkButton>
            <LinkButton href={RESUME_PDF} download={person.resumeFileName} variant="ghost" magnetic>
              <Download size={18} /> Download Resume
            </LinkButton>
            <LinkButton href={`mailto:${person.email}`} variant="ghost" magnetic>
              <Mail size={18} /> Email Me
            </LinkButton>
          </Reveal>

          <Reveal delay={0.15} className="relative mt-12">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {tiles.map((t) => {
                const Icon = t.icon
                const body = (
                  <>
                    <span className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                      <Icon size={19} />
                    </span>
                    <span className="font-mono text-[0.68rem] uppercase tracking-wider text-mute">{t.label}</span>
                    <span className="mt-1 break-words font-semibold">{t.value}</span>
                  </>
                )
                return (
                  <li key={t.label}>
                    {t.href ? (
                      <a
                        href={t.href}
                        {...(t.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="card flex h-full flex-col p-5 hover:bg-accent-soft"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="card flex h-full flex-col p-5">{body}</div>
                    )}
                  </li>
                )
              })}
            </ul>
            <button
              type="button"
              onClick={copy}
              className="mt-4 inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-accent"
            >
              {copied ? <Check size={15} /> : <Copy size={15} />} Copy email address
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-x flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-xl font-extrabold tracking-tight">{person.name}</p>
          <p className="text-sm text-mute">{person.title} · {person.location}</p>
        </div>
        <div className="flex items-center gap-5 text-sm text-mute">
          <span>© {new Date().getFullYear()} {person.name}</span>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
            }}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-medium text-paper transition-colors hover:border-accent hover:text-accent"
          >
            Back to top <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  )
}
