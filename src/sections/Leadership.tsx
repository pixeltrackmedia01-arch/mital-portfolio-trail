import { UserRound, Crown } from 'lucide-react'
import { collaborators, teams } from '../config/content'
import { Reveal } from '../components/Reveal'

export function Leadership() {
  return (
    <section aria-labelledby="lead-h" className="section-y pt-0">
      <div className="container-x">
        <Reveal className="mb-12 max-w-3xl">
          <p className="eyebrow mb-4">Team leadership</p>
          <h2 id="lead-h" className="h2">
            Building Better <span className="text-accent">Campaigns Together.</span>
          </h2>
          <p className="lead mt-5">Great performance is a team sport. I lead the people who run, report on and creatively power the campaigns.</p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {teams.map((t, i) => (
            <Reveal key={t.company} delay={i * 0.1} className="h-full">
              <div className="card h-full p-6 sm:p-8">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-accent">{t.company}</p>
                <h3 className="display mt-2 text-[clamp(1.5rem,2.6vw,2rem)]">{t.title}</h3>
                <div className="mt-7 flex flex-wrap items-center gap-3" role="list" aria-label={`Team structure: me plus ${t.members.join(', ')}`}>
                  <div role="listitem" className="flex items-center gap-2.5 rounded-full bg-accent py-1.5 pl-1.5 pr-4 text-sm font-semibold text-ink">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-accent"><Crown size={15} /></span>
                    Team Lead
                  </div>
                  {t.members.map((m, k) => (
                    <div key={m + k} role="listitem" className="flex items-center gap-2.5 rounded-full border border-line py-1.5 pl-1.5 pr-4 text-sm">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-paper/10"><UserRound size={15} /></span>
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-5">
          <div className="card flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <p className="font-display text-xl font-bold tracking-tight lg:max-w-xs">Cross-functional by default. I coordinate with:</p>
            <ul className="flex flex-wrap gap-2">
              {collaborators.map((c) => (
                <li key={c} className="tag">{c}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
