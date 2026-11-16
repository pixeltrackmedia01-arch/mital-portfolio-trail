import { ElementType, ReactNode, useRef } from 'react'
import { useInView } from '../hooks/motion'

interface Props {
  as?: ElementType
  delay?: number
  className?: string
  children: ReactNode
}

/** Fade-up on scroll. Keeps transforms off its children so tilt/magnetic hooks never fight it. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children }: Props) {
  const ref = useRef<HTMLElement>(null)
  const seen = useInView(ref)
  return (
    <Tag
      ref={ref}
      className={`reveal ${seen ? 'in' : ''} ${className}`}
      style={delay ? ({ '--d': `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
