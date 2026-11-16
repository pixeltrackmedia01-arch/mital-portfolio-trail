import { useRef } from 'react'
import { ArrowUpRight, FileText, Loader2 } from 'lucide-react'
import { B2C_PORTFOLIO_PDF, LEAD_GENERATION_PDF } from '../config/site'
import { campaignCards } from '../config/content'
import { Reveal } from '../components/Reveal'
import { useTilt } from '../hooks/motion'
import { usePdfOpener } from '../hooks/usePdf'

/** Abstract lead-generation funnel + lead rows. Pure illustration, no data. */
function LeadVisual() {
  return (
    <svg viewBox="0 0 420 210" className="h-full w-full" role="img" aria-label="Illustration of a lead generation funnel producing qualified leads">
      <defs>
        <linearGradient id="lg1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ff5a1f" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ff5a1f" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <g className="origin-center transition-transform duration-700 group-hover:scale-[1.03]" style={{ transformBox: 'fill-box' }}>
        <polygon points="20,18 200,18 170,70 50,70" fill="url(#lg1)" />
        <polygon points="54,78 166,78 142,122 78,122" fill="#ff5a1f" fillOpacity="0.6" />
        <polygon points="82,130 138,130 124,170 96,170" fill="#ff5a1f" />
        {[34, 62, 90, 120, 150, 176].map((x, i) => (
          <circle key={i} cx={x + (i % 2) * 6} cy={8 + (i % 3) * 3} r="3" fill="#f3efe6" opacity="0.8" />
        ))}
        <path d="M205 100 H250" stroke="#f3efe6" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 5" />
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i} className="transition-transform duration-500 group-hover:translate-x-1.5" style={{ transitionDelay: `${i * 70}ms` }}>
          <rect x="256" y={42 + i * 46} width="146" height="36" rx="10" fill="#f3efe6" fillOpacity="0.07" stroke="#f3efe6" strokeOpacity="0.18" />
          <circle cx="276" cy={60 + i * 46} r="9" fill="#ff5a1f" fillOpacity={0.9 - i * 0.2} />
          <rect x="294" y={53 + i * 46} width={70 - i * 10} height="6" rx="3" fill="#f3efe6" fillOpacity="0.5" />
          <rect x="294" y={64 + i * 46} width={46 - i * 4} height="5" rx="2.5" fill="#f3efe6" fillOpacity="0.2" />
        </g>
      ))}
    </svg>
  )
}

/** Abstract revenue-growth bars + cart. Pure illustration, no data. */
function B2CVisual() {
  const heights = [34, 52, 44, 76, 66, 108, 140]
  return (
    <svg viewBox="0 0 420 210" className="h-full w-full" role="img" aria-label="Illustration of rising revenue bars for an online store">
      <line x1="20" x2="400" y1="186" y2="186" stroke="#141414" strokeOpacity="0.25" />
      {heights.map((h, i) => (
        <rect
          key={i}
          x={32 + i * 52}
          y={186 - h}
          width="34"
          height={h}
          rx="8"
          fill={i === heights.length - 1 ? '#ff5a1f' : '#141414'}
          fillOpacity={i === heights.length - 1 ? 1 : 0.14 + i * 0.05}
          className="origin-bottom transition-transform duration-700 group-hover:scale-y-[1.08]"
          style={{ transformBox: 'fill-box', transitionDelay: `${i * 40}ms` }}
        />
      ))}
      <path d="M40 150 C 100 140, 130 120, 180 108 S 280 80, 372 36" fill="none" stroke="#ff5a1f" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 7" />
      <circle cx="372" cy="36" r="8" fill="#141414" />
      <path d="M368 33h2l1.2 5h5l1-3.5h-6.6" fill="none" stroke="#f3efe6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

interface CardProps {
  kind: 'lead' | 'b2c'
  url: string
}

function CampaignCard({ kind, url }: CardProps) {
  const c = campaignCards[kind]
  const dark = kind === 'lead'
  const tilt = useRef<HTMLAnchorElement>(null)
  useTilt(tilt, 3.5)
  const { loading, onClick } = usePdfOpener(url, c.fileLabel.replace(' · PDF', ''))

  return (
    <Reveal delay={kind === 'lead' ? 0 : 0.12} className="h-full">
      <a
        ref={tilt}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        aria-busy={loading}
        aria-label={`${c.cta} — opens the ${c.fileLabel} in a new tab`}
        className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-6 transition-colors duration-500 sm:p-9 ${
          dark
            ? 'border-line bg-surface text-paper hover:border-accent'
            : 'border-paper/10 bg-paper text-[#141414] hover:border-accent'
        }`}
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl transition-opacity duration-700 ${
            dark ? 'bg-accent/20 opacity-60 group-hover:opacity-100' : 'bg-accent/30 opacity-70 group-hover:opacity-100'
          }`}
        />
        <div className="relative flex items-center justify-between">
          <span className={`font-mono text-[0.72rem] uppercase tracking-[0.16em] ${dark ? 'text-accent' : 'text-accent'}`}>{c.kicker}</span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.68rem] uppercase tracking-wider ${
              dark ? 'border-line text-mute' : 'border-black/15 text-black/60'
            }`}
          >
            <FileText size={13} /> PDF
          </span>
        </div>

        <div className={`relative my-6 h-44 rounded-2xl border sm:h-52 ${dark ? 'border-line bg-ink/60' : 'border-black/10 bg-white/60'}`}>
          <div className="h-full p-3 sm:p-4">{dark ? <LeadVisual /> : <B2CVisual />}</div>
          <span className={`absolute bottom-2 right-3 font-mono text-[0.6rem] uppercase tracking-widest ${dark ? 'text-mute' : 'text-black/45'}`}>
            Illustration
          </span>
        </div>

        <h3 className="display relative text-[clamp(1.9rem,3.4vw,2.75rem)]">{c.title}</h3>
        <p className={`relative mt-4 max-w-xl text-[0.98rem] ${dark ? 'text-mute' : 'text-black/65'}`}>{c.description}</p>

        <ul className="relative mt-6 flex flex-wrap gap-2">
          {c.tags.map((t) => (
            <li
              key={t}
              className={`rounded-full border px-3 py-1 text-[0.78rem] font-medium ${
                dark ? 'border-line bg-white/[0.03] text-paper/85' : 'border-black/15 bg-black/[0.03] text-black/75'
              }`}
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="relative mt-auto flex items-center justify-between gap-4 pt-9">
          <span className="inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight sm:text-xl">
            {c.cta}
            <span
              className={`grid h-10 w-10 place-items-center rounded-full bg-accent text-ink transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1 ${
                loading ? 'animate-pulse' : ''
              }`}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowUpRight size={20} />}
            </span>
          </span>
          <span className={`hidden text-xs sm:block ${dark ? 'text-mute' : 'text-black/55'}`}>Opens in a new tab</span>
        </div>
      </a>
    </Reveal>
  )
}

export function Campaigns() {
  return (
    <section id="campaigns" aria-labelledby="campaigns-h" className="section-y">
      <div className="container-x">
        <Reveal className="mb-12 max-w-3xl">
          <p className="eyebrow mb-4">Portfolio</p>
          <h2 id="campaigns-h" className="h2">
            Explore My <span className="text-accent">Campaigns</span>
          </h2>
          <p className="lead mt-5">Different objectives. Different strategies. Measurable performance.</p>
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-7">
          <CampaignCard kind="lead" url={LEAD_GENERATION_PDF} />
          <CampaignCard kind="b2c" url={B2C_PORTFOLIO_PDF} />
        </div>
        <p className="mt-6 text-center text-sm text-mute">
          Each card opens its own portfolio PDF directly in a new tab — no downloads, no sign-up.
        </p>
      </div>
    </section>
  )
}
