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
