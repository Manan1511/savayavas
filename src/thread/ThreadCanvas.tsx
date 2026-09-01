import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useThreadRegistry, useThreadVersion, type RegisteredAnchor, type ThreadBand } from './ThreadContext'
import { catmullRomPath, type Point } from './spline'
import { usePrefersReducedMotion } from '@/lib/motion'

interface Segment {
  band: ThreadBand
  d: string
  /** Set for lettering segments, whose glyph path lives in its own units. */
  transform?: string
  /** Visual length in page pixels. Differs from the path's own length when scaled. */
  scale: number
}

/** How long the full thread takes to draw itself on landing. */
const DRAW_SECONDS = 8.5

/**
 * Draws the thread.
 *
 * Geometry is measured from anchors at runtime rather than hand-authored, so a
 * layout change — a different font, a headline wrapping, a resize, a browser
 * zoom — refits the curve instead of breaking it. See docs/PLAN.md §5.
 *
 * A run of anchors becomes a fitted curve; a `ThreadLettering` becomes the
 * single-stroke centreline of a phrase. Both are segments of one stroke driven
 * by one progress value.
 *
 * The hero uses lettering alone, with no approach or exit line: a travelling
 * line advertises its own direction and reads as something dancing across the
 * page. Only the handwriting should draw.
 *
 * The draw is an intro that plays once on landing — not a scroll scrub. It is
 * the brand's opening gesture and should perform on arrival.
 */
export function ThreadCanvas() {
  const registry = useThreadRegistry()
  const version = useThreadVersion()
  const reducedMotion = usePrefersReducedMotion()

  const [segments, setSegments] = useState<Segment[]>([])
  const [size, setSize] = useState({ w: 0, h: 0 })

  const behindRef = useRef<SVGGElement>(null)
  const frontRef = useRef<SVGGElement>(null)
  const needleRef = useRef<SVGGElement>(null)
  const hasPlayedRef = useRef(false)

  // --- Measure and fit -----------------------------------------------------
  useEffect(() => {
    if (!registry) return

    let timeout: number | undefined

    const measure = () => {
      const anchors = [...registry.anchorsRef.current.values()]
      // One lettering node is already a complete figure; only plain waypoints
      // need a partner before they can describe a curve.
      const enough = anchors.length >= 2 || anchors.some((a) => a.lettering)
      if (!enough) {
        setSegments([])
        return
      }

      const docW = document.documentElement.clientWidth
      const docH = document.documentElement.scrollHeight
      const scrollX = window.scrollX
      const scrollY = window.scrollY

      const placed = anchors
        .filter((a) => !a.hideBelow || docW >= a.hideBelow)
        .map((a) => ({ anchor: a, ...resolve(a, docW, scrollX, scrollY) }))
        // Explicit `order` wins so a figure can rise as well as fall; anything
        // unordered falls back to reading down the page.
        .sort((a, b) => {
          const ao = a.anchor.order
          const bo = b.anchor.order
          if (ao != null && bo != null) return ao - bo
          if (ao != null) return -1
          if (bo != null) return 1
          return a.entry.y - b.entry.y
        })

      if (placed.length === 0) {
        setSegments([])
        return
      }

      setSize({ w: docW, h: docH })
      setSegments(buildSegments(placed))
    }

    // Wait for fonts before the first measure: text metrics move anchors, and a
    // curve fitted to fallback metrics would visibly snap when fonts land.
    // Scheduled with a timeout, NOT requestAnimationFrame. A tab that is not
    // compositing — opened in the background, or in a hidden panel — never
    // fires rAF, so an rAF-scheduled measure would leave those visitors with no
    // thread at all. Measurement only needs layout to be settled, which a
    // macrotask guarantees just as well.
    const start = () => {
      timeout = window.setTimeout(measure, 0)
    }
    if (document.fonts?.status === 'loaded') start()
    else void document.fonts?.ready.then(start)

    // Refit on layout change, debounced. Small deltas are ignored: mobile URL
    // bars resize the viewport constantly and refitting on every pixel would
    // thrash. Browser zoom changes clientWidth and so lands here too.
    let timer: number | undefined
    let lastW = document.documentElement.clientWidth
    let lastH = document.documentElement.scrollHeight

    const onResize = () => {
      const w = document.documentElement.clientWidth
      const h = document.documentElement.scrollHeight
      if (Math.abs(w - lastW) < 4 && Math.abs(h - lastH) < 40) return
      lastW = w
      lastH = h
      window.clearTimeout(timer)
      timer = window.setTimeout(measure, 150)
    }

    const ro = new ResizeObserver(onResize)
    ro.observe(document.body)
    window.addEventListener('resize', onResize)

    return () => {
      window.clearTimeout(timeout)
      window.clearTimeout(timer)
      ro.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [registry, version])

  // --- Draw ----------------------------------------------------------------
  useEffect(() => {
    if (segments.length === 0) return

    const paths = [
      ...(behindRef.current?.querySelectorAll('path') ?? []),
      ...(frontRef.current?.querySelectorAll('path') ?? []),
    ] as SVGPathElement[]
    if (paths.length === 0) return

    // Visual order is document order, not DOM order, because the two band
    // layers interleave.
    const ordered = paths.sort(
      (a, b) => Number(a.dataset.index ?? 0) - Number(b.dataset.index ?? 0),
    )

    // Local length is in the path's own units; visual length accounts for the
    // scale applied to lettering, so time is budgeted by what the eye sees.
    const local = ordered.map((p) => p.getTotalLength())
    const scales = ordered.map((p) => Number(p.dataset.scale ?? 1))
    const weights = local.map((len, i) => len * scales[i]!)

    const total = weights.reduce((a, b) => a + b, 0)
    if (total === 0) return

    ordered.forEach((p, i) => {
      p.style.strokeDasharray = `${local[i]}`
      p.style.strokeDashoffset = `${local[i]}`
    })

    const draw = (progress: number) => {
      const drawn = progress * total
      let consumed = 0
      let head: { p: SVGPathElement; at: number } | null = null

      ordered.forEach((p, i) => {
        const w = weights[i]!
        const fraction = clamp01((drawn - consumed) / w)
        p.style.strokeDashoffset = `${local[i]! * (1 - fraction)}`
        if (fraction > 0 && fraction < 1) head = { p, at: local[i]! * fraction }
        consumed += w
      })

      const needle = needleRef.current
      if (!needle) return
      if (!head) {
        needle.style.opacity = '0'
        return
      }

      const { p, at } = head as { p: SVGPathElement; at: number }
      const pt = p.getPointAtLength(at)
      const ahead = p.getPointAtLength(Math.min(at + 1, p.getTotalLength()))
      const angle = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI
      // The head's own path may be scaled and offset, so map into page space.
      const m = p.getCTM()
      const x = m ? m.a * pt.x + m.c * pt.y + m.e : pt.x
      const y = m ? m.b * pt.x + m.d * pt.y + m.f : pt.y
      needle.setAttribute('transform', `translate(${x} ${y}) rotate(${angle})`)
      needle.style.opacity = '1'
    }

    // Reduced motion: render the finished thread, no animation, no needle.
    if (reducedMotion) {
      draw(1)
      if (needleRef.current) needleRef.current.style.opacity = '0'
      return
    }

    // The intro is a one-time arrival gesture. Anything that refits the curve —
    // a resize, a browser zoom, an orientation change — re-runs this effect
    // with fresh geometry, and replaying the animation each time would be
    // jarring. After the first play the thread simply renders complete.
    if (hasPlayedRef.current) {
      draw(1)
      return
    }

    const state = { p: 0 }
    draw(0)

    const ctx = gsap.context(() => {
      gsap.to(state, {
        p: 1,
        duration: DRAW_SECONDS,
        delay: 0.4,
        // Linear. A hand writing holds a steady pace — it does not accelerate
        // out of the first letter or coast into the last, and any ease here
        // reads as the animation rushing or stalling mid-word. Pacing is
        // handled by the length weighting above, not by an ease curve.
        ease: 'none',
        onUpdate: () => draw(state.p),
        onComplete: () => {
          hasPlayedRef.current = true
        },
      })
    })

    return () => ctx.revert()
  }, [segments, reducedMotion])

  if (segments.length === 0 || size.w === 0) return null

  const indexed = segments.map((s, i) => ({ ...s, i }))
  const behind = indexed.filter((s) => s.band === 'behind')
  const front = indexed.filter((s) => s.band === 'front')

  const svgProps = {
    width: size.w,
    height: size.h,
    viewBox: `0 0 ${size.w} ${size.h}`,
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true as const,
    className: 'pointer-events-none absolute left-0 top-0',
  }

  const strokeProps = {
    stroke: 'var(--color-navy)',
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    // A little translucency stops it reading as a scratch across the page.
    strokeOpacity: 0.8,
    fill: 'none',
    vectorEffect: 'non-scaling-stroke' as const,
  }

  const renderSegment = (s: (typeof indexed)[number]) => (
    <path
      key={s.i}
      data-index={s.i}
      data-scale={s.scale}
      data-lettering={s.transform ? 'true' : 'false'}
      d={s.d}
      transform={s.transform}
      {...strokeProps}
    />
  )

  return (
    <>
      <svg {...svgProps} style={{ zIndex: 'var(--z-thread-behind)' }}>
        <g ref={behindRef}>{behind.map(renderSegment)}</g>
      </svg>

      <svg {...svgProps} style={{ zIndex: 'var(--z-thread-front)' }}>
        <g ref={frontRef}>{front.map(renderSegment)}</g>
        <g ref={needleRef} style={{ opacity: 0 }}>
          <Needle />
        </g>
      </svg>
    </>
  )
}

/** Drawn pointing along +x, so the tangent rotation reads correctly. */
function Needle() {
  return (
    <g>
      <line x1={-18} y1={0} x2={5} y2={0} stroke="var(--color-navy)" strokeWidth={1.6} strokeLinecap="round" />
      <ellipse cx={-12} cy={0} rx={3.4} ry={1.6} fill="none" stroke="var(--color-navy)" strokeWidth={1} />
    </g>
  )
}

function clamp01(n: number): number {
  return Math.min(Math.max(n, 0), 1)
}

interface Resolved {
  /** Where the thread arrives at this node. */
  entry: Point
  /** Where it leaves. Same as entry for a plain anchor; the far side for lettering. */
  exit: Point
  lettering?: { d: string; transform: string; scale: number }
}

function resolve(a: RegisteredAnchor, docW: number, scrollX: number, scrollY: number): Resolved {
  const rect = a.el.getBoundingClientRect()
  const [ox, oy] = a.offset ?? [0, 0]

  if (a.lettering) {
    // Map the glyph path's own viewBox onto the box the element occupies.
    const [vx, vy, vw] = a.lettering.viewBox.split(/\s+/).map(Number) as [number, number, number]
    const scale = rect.width / vw
    const tx = rect.left + scrollX + ox - vx * scale
    const ty = rect.top + scrollY + oy - vy * scale

    // Meet the handwriting exactly where the pen starts and finishes, rather
    // than at the corners of its box — otherwise the lead-in visibly jumps to
    // the first letter and the tail leaves from thin air.
    const pen = a.lettering.start ?? { x: vx, y: vy }
    const penEnd = a.lettering.end ?? { x: vx + vw, y: vy }

    return {
      entry: { x: tx + pen.x * scale, y: ty + pen.y * scale },
      exit: { x: tx + penEnd.x * scale, y: ty + penEnd.y * scale },
      lettering: {
        d: a.lettering.d,
        transform: `translate(${round(tx)} ${round(ty)}) scale(${round(scale, 4)})`,
        scale,
      },
    }
  }

  const y = rect.top + scrollY + oy

  let x: number
  if (typeof a.side === 'number') {
    x = a.side * docW
  } else {
    switch (a.side) {
      case 'left':
        x = 0
        break
      case 'right':
        x = docW
        break
      case 'center':
        x = docW / 2
        break
      default:
        x = rect.left + scrollX
    }
  }

  const p = { x: x + ox, y }
  return { entry: p, exit: p }
}

function round(n: number, places = 2): number {
  const f = 10 ** places
  return Math.round(n * f) / f
}

/**
 * Walk the ordered nodes, emitting a segment whenever the stacking band changes
 * or a lettering node interrupts the curve. Runs overlap by one point so they
 * join without a visible gap.
 */
function buildSegments(placed: readonly (Resolved & { anchor: RegisteredAnchor })[]): Segment[] {
  const segments: Segment[] = []

  let run: Point[] = []
  let band: ThreadBand = 'front'
  let tension = 1

  const flush = () => {
    if (run.length > 1) segments.push({ band, d: catmullRomPath(run, tension), scale: 1 })
    run = []
  }

  for (const node of placed) {
    const nodeBand: ThreadBand = node.anchor.band ?? band

    if (node.lettering) {
      // Close the incoming curve at the word's left edge, write the word, then
      // resume from its right edge.
      run.push(node.entry)
      flush()
      segments.push({
        band: nodeBand,
        d: node.lettering.d,
        transform: node.lettering.transform,
        scale: node.lettering.scale,
      })
      band = nodeBand
      run = [node.exit]
      continue
    }

    if (run.length > 0 && nodeBand !== band) {
      run.push(node.entry)
      flush()
      run = [node.entry]
    } else {
      run.push(node.entry)
    }

    band = nodeBand
    tension = node.anchor.tension ?? tension
  }

  flush()
  return segments
}
