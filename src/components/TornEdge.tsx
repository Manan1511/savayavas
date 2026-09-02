/**
 * A torn-paper edge, as used across the concept boards and by the trade's
 * better sites: the hero band does not end on a ruled line, it ends where the
 * paper gave way.
 *
 * Rendered as an SVG strip filled with the PAGE colour, sitting over the top or
 * bottom of a band. The jagged side eats into the band, so the transition reads
 * as one sheet torn away from another rather than two blocks meeting.
 *
 * The profile is generated once from a fixed seed, so it is stable across
 * renders and identical between the server and the client. It stretches
 * horizontally with the viewport, which is invisible on an irregular edge.
 */

/** Deterministic PRNG: the edge must never change between renders. */
function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

/** Rough profile with occasional deeper nicks, like a real tear. */
function tearPath(seed: number, steps = 46): string {
  const rand = seeded(seed)
  const w = 1000
  const h = 40
  let d = `M 0 0 L ${w} 0 L ${w} ${h * 0.55}`

  for (let i = steps; i >= 0; i--) {
    const x = (i / steps) * w
    const base = h * 0.5
    const jitter = (rand() - 0.5) * h * 0.55
    // Every so often the tear bites deeper, which is what stops it reading
    // as a regular zigzag.
    const nick = rand() > 0.86 ? h * 0.3 : 0
    d += ` L ${x.toFixed(1)} ${(base + jitter + nick).toFixed(1)}`
  }

  return `${d} L 0 0 Z`
}

const TOP = tearPath(20260901)
const BOTTOM = tearPath(77315)

export function TornEdge({
  position,
  className = '',
  fill = 'var(--color-paper)',
}: {
  position: 'top' | 'bottom'
  className?: string
  /** The colour of the sheet doing the tearing, i.e. what is behind the band. */
  fill?: string
}) {
  const isTop = position === 'top'

  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 40"
      preserveAspectRatio="none"
      // The tear scales with the viewport: a fixed 32px edge that reads as a
      // torn sheet on a laptop reads as a hairline serration on a 27in display.
      className={`pointer-events-none absolute inset-x-0 h-8 w-full sm:h-10 xl:h-14 2xl:h-[4.5rem] ${
        isTop ? 'top-0' : 'bottom-0 rotate-180'
      } ${className}`}
    >
      <path d={isTop ? TOP : BOTTOM} fill={fill} />
    </svg>
  )
}
