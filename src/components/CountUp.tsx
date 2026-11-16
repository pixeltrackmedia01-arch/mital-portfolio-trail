import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reducedMotion } from '../lib/gsap'

interface Props {
  to: number
  to2?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}

const fmt = (n: number, d: number) => n.toFixed(d)

/** Counts up when scrolled into view. Final value is always in the DOM for screen readers & no-motion users. */
export function CountUp({ to, to2, decimals = 0, prefix = '', suffix = '', className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const final = `${prefix}${fmt(to, decimals)}${to2 !== undefined ? `–${fmt(to2, decimals)}` : ''}${suffix}`

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const render = (a: number, b: number) => {
      el.textContent = `${prefix}${fmt(a, decimals)}${to2 !== undefined ? `–${fmt(b, decimals)}` : ''}${suffix}`
    }
    render(0, 0)
    const state = { a: 0, b: 0 }
    const tween = gsap.to(state, {
      a: to,
      b: to2 ?? 0,
      duration: 1.8,
      ease: 'power3.out',
      paused: true,
      onUpdate: () => render(state.a, state.b),
      onComplete: () => {
        el.textContent = final
      },
    })
    const st = ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => tween.play() })
    return () => {
      st.kill()
      tween.kill()
      el.textContent = final
    }
  }, [to, to2, decimals, prefix, suffix, final])

  return (
    <span className={className} aria-label={final}>
      <span ref={ref} aria-hidden="true">
        {final}
      </span>
    </span>
  )
}
