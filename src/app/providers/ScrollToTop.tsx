import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getLenis } from '@/lib/lenisInstance'

/**
 * React Router doesn't reset scroll position on navigation the way a
 * full page load does — without this, clicking from the Collections grid
 * into a category page lands mid-scroll instead of at the top.
 *
 * Goes through Lenis when it's running rather than window.scrollTo:
 * Lenis owns the actual scroll position and would otherwise smoothly
 * "correct" a native scrollTo(0, 0) right back to where it was.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}
