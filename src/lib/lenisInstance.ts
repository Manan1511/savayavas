import type Lenis from 'lenis'

/**
 * The live Lenis instance, shared outside SmoothScroll's own effect so a
 * route change can reset scroll position through Lenis's virtual scroll
 * rather than native window.scrollTo — which Lenis would otherwise fight
 * and undo on the next frame. Null when reduced-motion disabled Lenis
 * entirely, in which case callers fall back to native scrolling.
 */
let instance: Lenis | null = null

export function setLenis(lenis: Lenis | null) {
  instance = lenis
}

export function getLenis(): Lenis | null {
  return instance
}
