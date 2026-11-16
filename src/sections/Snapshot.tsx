import { useRef } from 'react'
import { CalendarRange, Gauge, MousePointerClick, TrendingDown, Wallet } from 'lucide-react'
import { metrics } from '../config/content'
import { CountUp } from '../components/CountUp'
import { Reveal } from '../components/Reveal'
import { useTilt } from '../hooks/motion'

const icons = [CalendarRange, Wallet, Gauge, TrendingDown, MousePointerClick]

function MetricCard({ i }: { i: number }) {
  const m = metrics[i]
  const Icon = icons[i]
  const ref = useRef<HTMLDivElement>(null)
  useTilt(ref, 4)
  return (
    <Reveal delay={i * 0.07} className="h-full">
      <div ref={ref} className="card group relative flex h-full flex-col overflow-hidden p-6">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        />
        <div className="mb-8 flex items-center justify-between">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mute">{m.label}</span>
          <Icon size={18} className="text-accent" />
        </div>
        <p className="display text-[clamp(2.6rem,4.4vw,3.6rem)] tabular-nums">
          <CountUp to={m.value} to2={m.value2} decimals={m.decimals} prefix={m.prefix} suffix={m.suffix} />
        </p>
        <p className="mt-4 text-sm text-mute">{m.description}</p>
      </div>
    </Reveal>
  )
}

export function Snapshot() {
  return (
    <section aria-labelledby="snapshot-h" className="section-y pb-6">
      <div className="container-x">
        <Reveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4">Performance snapshot</p>
            <h2 id="snapshot-h" className="h2 max-w-2xl">
              The numbers behind <span className="text-accent">the work.</span>
            </h2>
          </div>
          <p className="lead md:max-w-sm">
            Career-level highlights from my resume — they span different brands and roles, not one single company or campaign.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {metrics.map((m, i) => (
            <div key={m.id} className={i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}>
              <MetricCard i={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
