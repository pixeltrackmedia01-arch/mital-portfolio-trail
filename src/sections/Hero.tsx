import { useEffect, useRef } from 'react'
import { ArrowDown, Clock, Eye, Download, MapPin, Megaphone, ShoppingBag, Wallet, Sparkles, TrendingUp } from 'lucide-react'
import { RESUME_PDF, person } from '../config/site'
import { heroHighlights } from '../config/content'
import { gsap, reducedMotion } from '../lib/gsap'
import { Character } from '../components/Character'
import { ActionButton, LinkButton } from '../components/Button'

const icons = { clock: Clock, megaphone: Megaphone, bag: ShoppingBag, wallet: Wallet }

function Line({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${className}`}>
      <span data-line className="block will-change-transform">
        {children}
      </span>
    </span>
  )
}

export function Hero({ onResume }: { onResume: () => void }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion() || !root.current) return
    const ctx = gsap.context(() => {
      gsap.from('[data-line]', { yPercent: 115, duration: 1.1, ease: 'power4.out', stagger: 0.1, delay: 0.1 })
      gsap.from('[data-hero-fade]', { y: 22, autoAlpha: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09, delay: 0.45 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="relative isolate overflow-hidden">
      {/* background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-grid absolute inset-0" />
        <div className="drift-a absolute -right-[10%] top-[-10%] h-[42rem] w-[42rem] rounded-full bg-accent/[0.13] blur-[130px]" />
        <div className="drift-b absolute -left-[12%] bottom-[-18%] h-[34rem] w-[34rem] rounded-full bg-paper/[0.05] blur-[120px]" />
      </div>

      <div className="container-x grid min-h-[100svh] items-center gap-6 pb-14 pt-24 lg:grid-cols-[1.12fr_0.88fr] lg:gap-8 lg:pb-10 lg:pt-28">
        {/* Character stage — first on mobile, right on desktop */}
        <div className="relative order-first mx-auto flex h-[min(46svh,24rem)] w-full max-w-[26rem] items-end justify-center lg:order-last lg:h-[min(80svh,50rem)] lg:max-w-none">
          <div aria-hidden="true" className="absolute inset-x-[6%] bottom-0 top-[10%] rounded-t-[999px] border border-b-0 border-accent/25 bg-gradient-to-b from-accent/[0.16] via-accent/[0.05] to-transparent lg:inset-x-[12%]" />
          <div aria-hidden="true" className="spin-slow absolute left-1/2 top-[16%] h-[46%] aspect-square -translate-x-1/2 rounded-full border border-dashed border-paper/15" />
          <Character className="relative z-10 h-full" />

          <div aria-hidden="true" className="float-y absolute right-[-2%] top-[22%] z-20 hidden items-center gap-2 rounded-xl border border-line bg-ink/85 px-3.5 py-2.5 text-sm font-medium backdrop-blur-md sm:flex xl:right-[-9%]">
            <TrendingUp size={16} className="text-accent" /> Full-funnel strategy
          </div>
          <div aria-hidden="true" style={{ animationDelay: '-3s' }} className="float-y absolute bottom-[24%] right-[-3%] z-20 hidden items-center gap-2 rounded-xl border border-line bg-ink/85 px-3.5 py-2.5 text-sm font-medium backdrop-blur-md sm:flex xl:right-[-12%]">
            <Sparkles size={16} className="text-accent" /> Meta × Google Ads
          </div>
        </div>

        {/* Copy */}
        <div className="relative z-10">
          <div data-hero-fade className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pl-3 pr-4 text-[0.8rem] font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span className="pulse-ring absolute inset-0 rounded-full bg-emerald-400" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              {person.availability}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[0.8rem] text-mute">
              <MapPin size={14} className="text-accent" /> {person.location}
            </span>
          </div>

          <h1 className="display text-[clamp(3.1rem,8.6vw,7.6rem)] uppercase" aria-label={person.name}>
            <Line>Mital</Line>
            <Line className="text-accent">Chikhaliya</Line>
          </h1>

          <p data-hero-fade className="mt-5 font-mono text-[0.8rem] font-medium uppercase tracking-[0.2em] text-paper/80 sm:text-sm">
            {person.title}
          </p>

          <p data-hero-fade className="mt-5 max-w-xl font-display text-[clamp(1.35rem,2.5vw,1.9rem)] font-bold leading-[1.15] tracking-tight">
            “Turning Data Into Performance.{' '}
            <span className="text-accent">Performance Into Growth.</span>”
          </p>

          <p data-hero-fade className="mt-4 max-w-xl text-[1.02rem] text-mute">
            {person.intro}
          </p>

          <ul data-hero-fade className="mt-7 grid max-w-xl grid-cols-1 gap-2.5 sm:grid-cols-2">
            {heroHighlights.map((h) => {
              const Icon = icons[h.icon]
              return (
                <li key={h.text} className="flex items-center gap-3 rounded-xl border border-line bg-surface/60 px-3.5 py-2.5 text-sm font-medium">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                    <Icon size={16} />
                  </span>
                  {h.text}
                </li>
              )
            })}
          </ul>

          <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-3">
            <LinkButton href="#work" magnetic onClick={(e) => {
              e.preventDefault()
              document.getElementById('campaigns')?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' })
            }}>
              Explore My Work <ArrowDown size={18} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </LinkButton>
            <LinkButton href={RESUME_PDF} download={person.resumeFileName} variant="ghost" magnetic>
              <Download size={18} /> Download My Resume
            </LinkButton>
            <ActionButton variant="ghost" className="!px-4" onClick={onResume} aria-label="Quick view resume">
              <Eye size={18} /> <span className="sm:hidden lg:inline">Preview</span>
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  )
}
