import { Brain, FlaskConical, Rocket, Sparkles } from 'lucide-react'
import { assets, person } from '../config/site'
import { curiousChips } from '../config/content'
import { Reveal } from '../components/Reveal'

const chipIcons = [Rocket, FlaskConical, Sparkles, Brain]

export function Personal() {
  return (
    <section aria-labelledby="personal-h" className="section-y pb-8">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface">
          <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-accent/15 blur-[110px]" />
          <div className="relative grid items-end gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal className="relative order-last mx-auto flex w-full max-w-sm justify-center self-end px-6 pt-4 lg:order-first lg:max-w-none">
              <div aria-hidden="true" className="absolute inset-x-[14%] bottom-0 top-[6%] rounded-t-[999px] border border-b-0 border-accent/25 bg-gradient-to-b from-accent/[0.18] to-transparent" />
              <img
                src={assets.character.curious}
                alt="Illustration of Mital in a thoughtful pose with eyes closed and arms crossed"
                width={650}
                height={1000}
                loading="lazy"
                decoding="async"
                className="relative z-10 -mb-px h-auto w-[80%] max-w-sm select-none"
              />
              {assets.personalPhoto && (
                <img
                  src={assets.personalPhoto}
                  alt={`${person.name}`}
                  loading="lazy"
                  className="absolute bottom-8 right-4 z-20 h-24 w-24 rounded-2xl border-2 border-paper object-cover shadow-xl sm:h-32 sm:w-32"
                />
              )}
            </Reveal>

            <div className="px-6 pb-4 pt-12 sm:px-10 lg:py-16 lg:pr-14">
              <Reveal>
                <p className="eyebrow mb-4">Beyond the dashboard</p>
                <h2 id="personal-h" className="h2">
                  Behind The Campaigns, There’s A <span className="text-accent">Curious Mind.</span>
                </h2>
                <p className="lead mt-6">
                  I’m endlessly curious about how businesses grow. I like to test an idea, read the data honestly, and find a smarter way to
                  improve performance — whether that’s a new creative angle, a cleaner funnel or an AI workflow that saves hours of reporting.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {curiousChips.map((c, i) => {
                    const Icon = chipIcons[i]
                    return (
                      <li key={c} className="flex items-center gap-3 rounded-2xl border border-line bg-ink/50 px-4 py-3.5 text-[0.95rem] font-medium">
                        <Icon size={18} className="shrink-0 text-accent" />
                        {c}
                      </li>
                    )
                  })}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
