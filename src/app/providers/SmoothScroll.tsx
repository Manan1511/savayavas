import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { usePrefersReducedMotion } from '@/lib/motion'

/**
 * Lenis drives scrolling and ScrollTrigger reads from it, so the thread's
 * scrub stays in step with the page rather than lagging a frame behind.
 *
 * Everything here is client-only and reduced-motion aware: when the OS asks
 * for less motion we never start Lenis at all, and native scrolling takes over.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [reducedMotion])

  return children
}
