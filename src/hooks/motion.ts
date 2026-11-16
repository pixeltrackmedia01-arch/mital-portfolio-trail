import { RefObject, useEffect, useState } from 'react'
import { gsap, finePointer, reducedMotion } from '../lib/gsap'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => reducedMotion())
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

/** Single shared IntersectionObserver for reveal-on-scroll. */
type Cb = (visible: boolean) => void
const callbacks = new WeakMap<Element, Cb>()
let observer: IntersectionObserver | null = null
function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            callbacks.get(e.target)?.(true)
            observer?.unobserve(e.target)
            callbacks.delete(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
  }
  return observer
}

/** Returns true once the element has scrolled into view (fires once). */
export function useInView<T extends Element>(ref: RefObject<T | null>) {
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reducedMotion() || typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return
    }
    const obs = getObserver()
    callbacks.set(el, () => setSeen(true))
    obs.observe(el)
    return () => {
      obs.unobserve(el)
      callbacks.delete(el)
    }
  }, [ref])
  return seen
}

/** Subtle 3D tilt on desktop pointers. */
export function useTilt<T extends HTMLElement>(ref: RefObject<T | null>, max = 5) {
  useEffect(() => {
    const el = ref.current
    if (!el || !finePointer() || reducedMotion()) return
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' })
    gsap.set(el, { transformPerspective: 1000, transformStyle: 'preserve-3d' })
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      ry(px * max * 2)
      rx(-py * max * 2)
    }
    const leave = () => {
      rx(0)
      ry(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
      gsap.killTweensOf(el)
      gsap.set(el, { clearProps: 'transform' })
    }
  }, [ref, max])
}

/** Magnetic pull for CTA buttons. */
export function useMagnetic<T extends HTMLElement>(ref: RefObject<T | null>, strength = 0.28) {
  useEffect(() => {
    const el = ref.current
    if (!el || !finePointer() || reducedMotion()) return
    const x = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' })
    const y = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' })
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      x((e.clientX - (r.left + r.width / 2)) * strength)
      y((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const leave = () => {
      x(0)
      y(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
      gsap.killTweensOf(el)
      gsap.set(el, { clearProps: 'transform' })
    }
  }, [ref, strength])
}

/** Fills a vertical rail as its container scrolls, and lights up nodes. */
export function useRailProgress(
  container: RefObject<HTMLElement | null>,
  line: RefObject<HTMLElement | null>,
  nodeSelector = '[data-node]',
) {
  useEffect(() => {
    const c = container.current
    const l = line.current
    if (!c || !l) return
    const nodes = Array.from(c.querySelectorAll<HTMLElement>(nodeSelector))
    if (reducedMotion()) {
      gsap.set(l, { scaleY: 1 })
      nodes.forEach((n) => n.setAttribute('data-on', 'true'))
      return
    }
    const ctx = gsap.context(() => {
      gsap.set(l, { scaleY: 0, transformOrigin: 'top' })
      gsap.to(l, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: c, start: 'top 65%', end: 'bottom 70%', scrub: 0.4 },
      })
      nodes.forEach((n) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: n,
            start: 'top 68%',
            onEnter: () => n.setAttribute('data-on', 'true'),
            onLeaveBack: () => n.removeAttribute('data-on'),
          },
        })
      })
    }, c)
    return () => ctx.revert()
  }, [container, line, nodeSelector])
}
