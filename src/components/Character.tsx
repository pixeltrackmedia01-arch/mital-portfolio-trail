import { useEffect, useRef } from 'react'
import { assets } from '../config/site'
import { gsap, reducedMotion } from '../lib/gsap'

/** Geometry of the separate hand layer inside the 680×1750 character canvas (see /public/assets/character). */
const HAND = { left: 2.2059, top: 16.0571, width: 23.2353, height: 13.3143, originX: 68.9873, originY: 86.2661 }

/**
 * The illustrated character.
 *  1. appears in a waving pose (the hand is its own layer, so it genuinely waves),
 *  2. waves for ~2.4 s,
 *  3. settles into a relaxed standing pose,
 *  4. then only breathes gently. Click / Enter waves again on demand.
 */
export function Character({ className = '' }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const fig = el.querySelector<HTMLElement>('[data-fig]')!
    const rest = el.querySelector<HTMLElement>('[data-rest]')!
    const body = el.querySelector<HTMLElement>('[data-body]')!
    const hand = el.querySelector<HTMLElement>('[data-hand]')!
    const bubble = el.querySelector<HTMLElement>('[data-bubble]')!
    const shadow = el.querySelector<HTMLElement>('[data-shadow]')!

    if (reducedMotion()) {
      gsap.set(el, { autoAlpha: 1 })
      gsap.set([body, hand], { autoAlpha: 0 })
      gsap.set(rest, { autoAlpha: 1 })
      return
    }

    let cancelled = false
    let busy = false
    const ctx = gsap.context(() => {
      gsap.set(el, { autoAlpha: 0 })
      gsap.set(rest, { autoAlpha: 0 })
      gsap.set(bubble, { autoAlpha: 0, scale: 0.8, transformOrigin: '10% 100%' })
      gsap.set(hand, { rotation: -9 })

      const waveTl = (withIntro: boolean) => {
        const tl = gsap.timeline({
          onStart: () => {
            busy = true
          },
          onComplete: () => {
            busy = false
          },
        })
        if (withIntro) {
          tl.fromTo(el, { y: 36, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out' })
        } else {
          tl.set([body, hand], { autoAlpha: 0 })
            .to([body, hand], { autoAlpha: 1, duration: 0.25 }, 0)
            .to(rest, { autoAlpha: 0, duration: 0.25 }, 0)
        }
        tl.to(bubble, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'back.out(1.6)' }, withIntro ? 0.55 : 0.1)
          // ~2.4 s of waving: eight sine passes between -9° and +9°
          .fromTo(hand, { rotation: -9 }, { rotation: 9, duration: 0.3, repeat: 7, yoyo: true, ease: 'sine.inOut' }, '<0.05')
          .to(bubble, { autoAlpha: 0, scale: 0.9, duration: 0.35, ease: 'power2.in' }, '-=0.3')
          // settle into the relaxed pose
          .to(hand, { rotation: 16, autoAlpha: 0, duration: 0.5, ease: 'power2.inOut' }, '<0.05')
          .to(body, { autoAlpha: 0, duration: 0.55, ease: 'power1.inOut' }, '<')
          .to(rest, { autoAlpha: 1, duration: 0.55, ease: 'power1.inOut' }, '<')
        return tl
      }

      // Idle breathing (starts immediately, very subtle)
      gsap.set(fig, { transformOrigin: '50% 100%' })
      gsap.to(fig, { scaleY: 1.007, y: -2, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.to(fig, { rotation: 0.35, duration: 5.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.to(shadow, { scaleX: 0.96, opacity: 0.8, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1 })

      // Wait for the images to decode so the first frame never pops in.
      const imgs = Array.from(el.querySelectorAll('img'))
      const ready = Promise.race([
        Promise.all(imgs.map((i) => i.decode().catch(() => undefined))),
        new Promise((r) => window.setTimeout(r, 2500)),
      ])
      ready.then(() => {
        if (cancelled) return
        gsap.delayedCall(0.35, () => !cancelled && waveTl(true))
      })

      ;(el as HTMLElement & { _wave?: () => void })._wave = () => {
        if (!busy) waveTl(false)
      }
    }, el)

    return () => {
      cancelled = true
      ctx.revert()
    }
  }, [])

  const wave = () => (root.current as (HTMLDivElement & { _wave?: () => void }) | null)?._wave?.()

  return (
    <div
      ref={root}
      className={`relative aspect-[680/1750] ${className}`}
      style={{ visibility: 'hidden' }}
      role="button"
      tabIndex={0}
      aria-label="Illustration of Mital, waving hello. Press to wave again."
      onClick={wave}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          wave()
        }
      }}
    >
      <div
        data-shadow
        aria-hidden="true"
        className="absolute -bottom-[0.6%] left-1/2 h-[2.2%] w-[78%] -translate-x-1/2 rounded-[50%] bg-black/70 blur-[10px]"
      />
      <div data-fig className="absolute inset-0 cursor-pointer">
        <img
          data-rest
          src={assets.character.rest}
          alt=""
          width={680}
          height={1750}
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none"
        />
        <img
          data-body
          src={assets.character.waveBody}
          alt=""
          width={680}
          height={1750}
          decoding="async"
          fetchPriority="high"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none"
        />
        <div
          data-hand
          className="absolute"
          style={{
            left: `${HAND.left}%`,
            top: `${HAND.top}%`,
            width: `${HAND.width}%`,
            height: `${HAND.height}%`,
            transformOrigin: `${HAND.originX}% ${HAND.originY}%`,
          }}
        >
          <img src={assets.character.waveHand} alt="" decoding="async" draggable={false} className="h-full w-full select-none" />
        </div>
      </div>
      <div
        data-bubble
        aria-hidden="true"
        className="pointer-events-none absolute left-[-46%] top-[3%] whitespace-nowrap rounded-2xl rounded-bl-sm bg-paper px-4 py-2.5 font-display text-base font-bold tracking-tight text-ink shadow-xl sm:left-[-60%] sm:text-lg"
      >
        Hi, I’m Mital!
      </div>
    </div>
  )
}
