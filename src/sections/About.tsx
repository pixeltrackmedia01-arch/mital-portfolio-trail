import { useRef } from 'react'
import { aboutExpertise, approach } from '../config/content'
import { Reveal } from '../components/Reveal'
import { Funnel } from '../components/Funnel'
import { useRailProgress } from '../hooks/motion'

export function About() {
  const rail = useRef<HTMLOListElement>(null)
  const line = useRef<HTMLDivElement>(null)
  useRailProgress(rail, line)

  return (
    <section aria-labelledby="about-h" className="section-y">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow mb-4">About me</p>
              <h2 id="about-h" className="h2">
                More Than Just <span className="text-accent">Running Ads.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lead mt-6">
                I’m a performance marketer who treats every campaign as a system: audience, creative, landing page and
                tracking all working together to turn spend into revenue.
              </p>
              <p className="lead mt-4">
                Over 5+ years across lead generation and D2C eCommerce, I’ve learned that growth comes from asking better
                questions of the data — and acting on the answers quickly.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mb-3 mt-9 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute">I work across</p>
              <ul className="flex flex-wrap gap-2">
                {aboutExpertise.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="mb-8 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute">How I approach every campaign</p>
            </Reveal>
            <ol ref={rail} className="relative space-y-3 pl-10 sm:pl-14">
              <span aria-hidden="true" className="absolute bottom-2 left-[0.95rem] top-2 w-px bg-line sm:left-[1.4rem]" />
              <div
                ref={line}
                aria-hidden="true"
                className="absolute bottom-2 left-[0.95rem] top-2 w-px bg-accent sm:left-[1.4rem]"
              />
              {approach.map((a, i) => (
                <li key={a.title} data-node className="group relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-10 top-5 grid h-8 w-8 place-items-center rounded-full border border-line bg-ink font-mono text-[0.7rem] text-mute transition-all duration-500 group-data-[on=true]:border-accent group-data-[on=true]:bg-accent group-data-[on=true]:text-ink sm:-left-14 sm:h-10 sm:w-10"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Reveal>
                    <div className="card px-5 py-4 transition-transform duration-500 group-data-[on=true]:translate-x-1">
                      <h3 className="font-display text-xl font-bold tracking-tight">{a.title}</h3>
                      <p className="mt-1 text-sm text-mute">{a.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-24 sm:mt-32">
          <Reveal className="mb-10 max-w-2xl">
            <p className="eyebrow mb-4">The funnel I optimise</p>
            <h3 className="h2 !text-[clamp(1.8rem,4vw,3rem)]">From impression to revenue — every stage has a job.</h3>
          </Reveal>
          <Reveal delay={0.1}>
            <Funnel />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
