import { Bot, Compass, Gauge, LineChart, Megaphone, Palette, Target, TrendingUp } from 'lucide-react'
import { skillGroups } from '../config/content'
import { Reveal } from '../components/Reveal'

const icons = { target: Target, megaphone: Megaphone, trend: TrendingUp, chart: LineChart, gauge: Gauge, palette: Palette, bot: Bot, compass: Compass }

export function Skills() {
  return (
    <section aria-labelledby="skills-h" className="section-y">
      <div className="container-x">
        <Reveal className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Skills & toolkit</p>
            <h2 id="skills-h" className="h2">
              The marketing <span className="text-accent">toolkit.</span>
            </h2>
          </div>
          <p className="lead lg:max-w-sm">What I use day to day — grouped by the job it does. No fake percentages, just tools I work in.</p>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((g, i) => {
            const Icon = icons[g.icon as keyof typeof icons]
            return (
              <Reveal key={g.id} delay={(i % 4) * 0.07} className="h-full">
                <div className="card h-full p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                      <Icon size={19} />
                    </span>
                    <h3 className="font-display text-lg font-bold leading-tight tracking-tight">{g.title}</h3>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li key={s} className="tag">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
