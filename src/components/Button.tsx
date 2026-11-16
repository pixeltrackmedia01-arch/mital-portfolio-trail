import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, useRef } from 'react'
import { useMagnetic } from '../hooks/motion'

type Variant = 'primary' | 'ghost' | 'dark'

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[0.95rem] font-semibold tracking-tight transition-colors duration-300 will-change-transform select-none'
const variants: Record<Variant, string> = {
  primary: 'bg-accent text-ink hover:bg-paper',
  ghost: 'border border-paper/25 text-paper hover:border-accent hover:text-accent',
  dark: 'bg-ink text-paper hover:bg-accent hover:text-ink',
}

interface CommonProps {
  variant?: Variant
  magnetic?: boolean
  children: ReactNode
  className?: string
}

export function LinkButton({
  variant = 'primary',
  magnetic = false,
  className = '',
  children,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLAnchorElement>(null)
  useMagnetic(ref, magnetic ? 0.3 : 0)
  return (
    <a ref={ref} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  )
}

export function ActionButton({
  variant = 'primary',
  magnetic = false,
  className = '',
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useRef<HTMLButtonElement>(null)
  useMagnetic(ref, magnetic ? 0.3 : 0)
  return (
    <button ref={ref} type="button" className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}
