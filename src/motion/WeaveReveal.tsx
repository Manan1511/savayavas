import { useEffect, useId, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/lib/motion'

/**
 * The mill's own process as the page's opening gesture.
 *
 * Warp threads (vertical) drop in first, as they would be dressed onto a loom.
 * Weft threads (horizontal) then pass through them left to right, each one
 * chasing a shuttle across the width. The content surfaces *through* the cloth
 * as it is woven, and the threads dissolve once it is there.
 *
 * Deliberately built from straight lines on a strict grid: it renders crisply
 * at any size, has nothing to approximate, and cannot drift out of register the
 * way a fitted curve can.
 */
export function WeaveReveal({
  children,
  warp = 14,
  weft = 9,
  className = '',
}: {
  children: React.ReactNode
  /** Vertical threads. */
  warp?: number
  /** Horizontal threads. */
  weft?: number
  className?: string
}) {
  const reducedMotion = usePrefersReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)
  const uid = useId().replace(/:/g, '')

  useEffect(() => {
    if (reducedMotion) {
      setDone(true)
      return
    }

    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => setDone(true) })

      // Dress the loom: warp threads drop from the top, left to right.
      tl.fromTo(
        `[data-weave-warp="${uid}"]`,
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 0.5, ease: 'power2.out', stagger: 0.028 },
      )

      // Weave: each weft thread crosses the warp, one after another.
      tl.fromTo(
        `[data-weave-weft="${uid}"]`,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.45, ease: 'power2.inOut', stagger: 0.055 },
        '-=0.2',
      )

      // The content surfaces through the cloth while it is still being woven,
      // rather than waiting for it. A hero that sits blank for three seconds
      // reads as a slow page, however deliberate the animation.
      tl.to(contentRef.current, { opacity: 1, duration: 0.8, ease: 'power1.out' }, '-=0.55')

      // Threads lift away, leaving what they revealed.
      tl.to(
        [`[data-weave-warp="${uid}"]`, `[data-weave-weft="${uid}"]`],
        { opacity: 0, duration: 0.45, ease: 'power1.inOut', stagger: { each: 0.01 } },
        '-=0.6',
      )
    }, root)

    return () => ctx.revert()
  }, [reducedMotion, uid])

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {!done && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ zIndex: 'var(--z-thread-front)' }}
        >
          {Array.from({ length: warp }, (_, i) => (
            <span
              key={`warp-${i}`}
              data-weave-warp={uid}
              className="absolute top-0 h-full w-px bg-navy/20"
              style={{ left: `${((i + 0.5) / warp) * 100}%` }}
            />
          ))}
          {Array.from({ length: weft }, (_, i) => (
            <span
              key={`weft-${i}`}
              data-weave-weft={uid}
              className="absolute left-0 h-px w-full bg-navy/25"
              style={{ top: `${((i + 0.5) / weft) * 100}%` }}
            />
          ))}
        </div>
      )}

      <div ref={contentRef} style={{ opacity: reducedMotion || done ? 1 : 0 }}>
        {children}
      </div>
    </div>
  )
}
