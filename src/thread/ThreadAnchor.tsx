import { useEffect, useRef } from 'react'
import { useThreadRegistry, type ThreadAnchorOptions } from './ThreadContext'

export interface ThreadAnchorProps extends ThreadAnchorOptions {
  /** Stable, unique within the page. Also the debug label. */
  id: string
}

/**
 * A waypoint for the thread, placed in the markup next to the content it
 * relates to. Renders a zero-size, invisible, non-interactive marker.
 *
 * Anchors are ordered by their vertical position on the page, not by their
 * order in the JSX, so a two-column section can place its anchors in whatever
 * order reads best in code.
 */
export function ThreadAnchor({ id, ...options }: ThreadAnchorProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const registry = useThreadRegistry()

  const { side, offset, tension, band, hideBelow, order } = options
  // Stands in for the array's identity, so a fresh [0, 26] literal each render
  // doesn't re-register the anchor every time.
  const offsetKey = offset ? `${offset[0]},${offset[1]}` : ''

  useEffect(() => {
    const el = ref.current
    if (!el || !registry) return
    return registry.register({
      id,
      el,
      side,
      offset: offsetKey ? (offsetKey.split(',').map(Number) as [number, number]) : undefined,
      tension,
      band,
      hideBelow,
      order,
    })
  }, [registry, id, side, offsetKey, tension, band, hideBelow, order])

  return (
    <span
      ref={ref}
      data-thread-anchor={id}
      aria-hidden="true"
      className="pointer-events-none absolute block h-0 w-0"
    />
  )
}
