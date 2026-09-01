export interface Point {
  x: number
  y: number
}

/**
 * Convert a run of points into a cubic-bezier path using Catmull-Rom.
 *
 * Catmull-Rom is the right curve family here because it passes exactly through
 * every control point — an anchor placed on a headline is genuinely where the
 * thread crosses it, not merely near it. Bezier control points are derived from
 * neighbouring points, which is what makes the curve continuous rather than a
 * sequence of visible arcs.
 *
 * `tension` scales how far the handles reach: 0 gives straight lines between
 * points, 1 is the standard Catmull-Rom curve, above 1 loops more loosely.
 */
export function catmullRomPath(points: readonly Point[], tension = 1): string {
  if (points.length === 0) return ''
  if (points.length === 1) {
    const p = points[0]!
    return `M ${r(p.x)} ${r(p.y)}`
  }

  const first = points[0]!
  let d = `M ${r(first.x)} ${r(first.y)}`

  for (let i = 0; i < points.length - 1; i++) {
    // Endpoints are duplicated so the curve starts and ends cleanly rather
    // than overshooting past the first and last anchors.
    const p0 = points[i - 1] ?? points[i]!
    const p1 = points[i]!
    const p2 = points[i + 1]!
    const p3 = points[i + 2] ?? p2

    const k = tension / 6

    const c1x = p1.x + (p2.x - p0.x) * k
    const c1y = p1.y + (p2.y - p0.y) * k
    const c2x = p2.x - (p3.x - p1.x) * k
    const c2y = p2.y - (p3.y - p1.y) * k

    d += ` C ${r(c1x)} ${r(c1y)}, ${r(c2x)} ${r(c2y)}, ${r(p2.x)} ${r(p2.y)}`
  }

  return d
}

/** Two decimals is well below a device pixel and keeps the `d` string small. */
function r(n: number): number {
  return Math.round(n * 100) / 100
}
