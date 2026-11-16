import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Eye, Menu, X } from 'lucide-react'
import { nav, person } from '../config/site'
import { useModal } from '../hooks/useModal'

export function Nav({ onResume }: { onResume: () => void }) {
  const [active, setActive] = useState<string>('home')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  useModal(menuRef, open, () => setOpen(false))

  useEffect(() => {
    let raf = 0
    const calc = () => {
      raf = 0
      setScrolled(window.scrollY > 24)
      const line = window.innerHeight * 0.38
      let cur: string = nav[0].id
      for (const n of nav) {
        const el = document.getElementById(n.id)
        if (el && el.getBoundingClientRect().top <= line) cur = n.id
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = nav[nav.length - 1].id
      setActive(cur)
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(calc)
    }
    calc()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
    }
  }, [])

  useLayoutEffect(() => {
    const measure = () => {
      const a = listRef.current?.querySelector<HTMLElement>('[data-active="true"]')
      if (a) setPill({ left: a.offsetLeft, width: a.offsetWidth })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [active])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    history.replaceState(null, '', `#${id}`)
  }

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[70] flex items-start justify-between px-4 pt-4 sm:px-6">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-ink via-ink/80 to-transparent md:hidden" />
        <a
          href="#home"
          onClick={go('home')}
          aria-label={`${person.name} — back to top`}
          className="pointer-events-auto flex h-11 items-center gap-2.5 rounded-full border border-line bg-ink/70 pl-1.5 pr-4 backdrop-blur-xl"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent font-display text-sm font-extrabold text-ink">MC</span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">{person.name}</span>
        </a>

        <nav
          aria-label="Primary"
          className={`pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 rounded-full border p-1 backdrop-blur-xl transition-colors duration-300 md:block ${
            scrolled ? 'border-line bg-ink/80' : 'border-line bg-ink/50'
          }`}
        >
          <ul ref={listRef} className="relative flex items-center">
            {pill && (
              <span
                aria-hidden="true"
                className="absolute inset-y-0 rounded-full bg-paper transition-[left,width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ left: pill.left, width: pill.width }}
              />
            )}
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={go(n.id)}
                  data-active={active === n.id}
                  aria-current={active === n.id ? 'true' : undefined}
                  className={`relative block rounded-full px-4 py-2 text-[0.82rem] font-medium transition-colors duration-300 ${
                    active === n.id ? 'text-ink' : 'text-paper/75 hover:text-paper'
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onResume}
            className="hidden h-11 items-center gap-2 rounded-full border border-line bg-ink/70 px-4 text-sm font-medium backdrop-blur-xl transition-colors hover:border-accent hover:text-accent sm:flex"
          >
            <Eye size={16} /> Resume
          </button>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-ink/70 backdrop-blur-xl md:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {open && (
        <div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="panel-in fixed inset-0 z-[95] flex flex-col bg-ink/97 px-6 pb-10 pt-5 backdrop-blur-2xl md:hidden"
        >
          <div className="flex justify-end">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid h-11 w-11 place-items-center rounded-full border border-line"
            >
              <X size={20} />
            </button>
          </div>
          <ul className="mt-6 flex flex-1 flex-col justify-center gap-1">
            {nav.map((n, i) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={go(n.id)}
                  className={`flex items-baseline gap-4 border-b border-line py-4 font-display text-4xl font-extrabold tracking-tight ${
                    active === n.id ? 'text-accent' : 'text-paper'
                  }`}
                >
                  <span className="font-mono text-xs font-medium text-mute">0{i + 1}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              onResume()
            }}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 font-semibold text-ink"
          >
            <Eye size={18} /> Quick view resume
          </button>
        </div>
      )}
    </>
  )
}
