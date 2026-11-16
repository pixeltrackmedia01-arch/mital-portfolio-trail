import { useRef, useState } from 'react'
import { ChevronDown, GraduationCap, Languages, MapPin } from 'lucide-react'
import { education, experience } from '../config/content'
import { Reveal } from '../components/Reveal'
import { useRailProgress } from '../hooks/motion'

export function Experience() {
  const rail = useRef<HTMLOListElement>(null)
  const line = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<string | null>(null)
  useRailProgress(rail, line)

  return (
    <section aria-labelledby="exp-h" className="section-y">
      <div className="container-x">
        <Reveal className="mb-14 max-w-3xl">
          <p className="eyebrow mb-4">Experience</p>
          <h2 id="exp-h" className="h2">
            Five years, <span className="text-accent">three roles,</span> one focus: performance.
          </h2>
        </Reveal>

        <ol ref={rail} className="relative space-y-8 pl-9 sm:pl-14">
          <span aria-hidden="true" className="absolute bottom-0 left-[0.9rem] top-2 w-px bg-line sm:left-[1.4rem]" />
          <div ref={line} aria-hidden="true" className="absolute bottom-0 left-[0.9rem] top-2 w-px bg-accent sm:left-[1.4rem]" />
          {experience.map((e) => {
            const isOpen = open === e.id
            return (
              <li key={e.id} data-node className="group relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.35rem] top-8 grid h-5 w-5 place-items-center rounded-full border border-line bg-ink transition-colors duration-500 group-data-[on=true]:border-accent sm:-left-[3.4rem] sm:h-6 sm:w-6"
                >
                  <span className="h-2 w-2 rounded-full bg-line transition-colors duration-500 group-data-[on=true]:bg-accent" />
                  {e.current && <span className="pulse-ring absolute inset-0 rounded-full border border-accent" />}
                </span>
                <Reveal>
                  <article className="card p-6 sm:p-9">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs uppercase tracking-wider text-accent">{e.period}</span>
                          {e.current && (
                            <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-wider text-ink">Current</span>
                          )}
                        </div>
                        <h3 className="display text-[clamp(1.6rem,3vw,2.3rem)]">{e.role}</h3>
                        <p className="mt-2 text-lg font-semibold text-paper/90">{e.company}</p>
                      </div>
                      <p className="flex items-center gap-1.5 text-sm text-mute md:mt-9">
                        <MapPin size={14} className="text-accent" /> {e.location}
                      </p>
                    </div>
                    <p className="mt-4 max-w-2xl text-mute">{e.summary}</p>
                    <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                      {e.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-[0.95rem] text-paper/90">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`exp-more-${e.id}`}
                      onClick={() => setOpen(isOpen ? null : e.id)}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                    >
                      {isOpen ? 'Hide' : 'Show'} full responsibilities
                      <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div
                      id={`exp-more-${e.id}`}
                      className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                    >
                      <div className="overflow-hidden">
                        <ul className="space-y-3 border-t border-line pt-5 mt-5" inert={!isOpen}>
                          {e.details.map((d) => (
                            <li key={d} className="text-sm text-mute">
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ol>

        <Reveal className="mt-10 grid gap-4 sm:grid-cols-2 sm:pl-14">
          <div className="card flex items-start gap-4 p-5">
            <GraduationCap className="mt-0.5 shrink-0 text-accent" size={22} />
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-wider text-mute">Education · {education.year}</p>
              <p className="mt-1 font-semibold">{education.degree}</p>
              <p className="text-sm text-mute">{education.school}</p>
            </div>
          </div>
          <div className="card flex items-start gap-4 p-5">
            <Languages className="mt-0.5 shrink-0 text-accent" size={22} />
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-wider text-mute">Languages</p>
              <p className="mt-1 font-semibold">{education.languages.join(' · ')}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
