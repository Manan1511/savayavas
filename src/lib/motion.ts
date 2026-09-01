import { useEffect, useState } from 'react'

/**
 * Motion is opt-out at the OS level, everywhere, without exception.
 *
 * Returns false during SSR and on first client render so prerendered HTML
 * never assumes motion is wanted — the value settles after hydration.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/** True once we're running in a browser. Guards every GSAP/Lenis entry point. */
export const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'

/**
 * Layout width in CSS pixels, kept current across resizes AND browser zoom
 * (zoom changes `clientWidth`, so it reports here like any other resize).
 *
 * Returns 0 during SSR and on first render so prerendered markup never depends
 * on a width the server cannot know.
 */
export function useViewportWidth(): number {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const read = () => setWidth(document.documentElement.clientWidth)
    read()

    let frame = 0
    const onResize = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(read)
    }

    window.addEventListener('resize', onResize)
    // Pinch-zoom on touch devices moves the visual viewport without firing a
    // window resize; layout width is unchanged, but this keeps the two in step
    // if the browser does reflow.
    window.visualViewport?.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      window.visualViewport?.removeEventListener('resize', onResize)
    }
  }, [])

  return width
}

/** Clamp helper for scaling art direction against viewport width. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
