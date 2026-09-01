import { useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/lib/motion'
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect'

/**
 * A short rise and fade as an element comes into view.
 *
 * Deliberately restrained: 14px of travel, 0.7s, once, never reversed. Motion
 * here is meant to make the page feel alive when you arrive at a section, not
 * to be noticed as an effect. Anything longer or further reads as a template.
 *
 * The initial hidden state is applied from JS, never from the markup, so the
 * prerendered HTML is fully visible if JavaScript never runs.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  /** Animate the direct children in sequence instead of the element itself. */
  stagger = false,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  as?: 'div' | 'section' | 'ul' | 'ol'
  stagger?: boolean
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el || reducedMotion) return

    const targets = stagger ? Array.from(el.children) : [el]
    if (targets.length === 0) return

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 14 })
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay,
        ease: 'power2.out',
        stagger: stagger ? 0.07 : 0,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    }, el)

    return () => ctx.revert()
  }, [reducedMotion, stagger, delay])

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  )
}

/** Refresh positions after layout settles, so triggers are never stale. */
export function refreshReveals() {
  ScrollTrigger.refresh()
}
