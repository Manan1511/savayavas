import { useEffect, useRef } from 'react'
import { useThreadRegistry, type ThreadAnchorOptions } from './ThreadContext'

export interface LetteringSource {
  phrase: string
  d: string
  viewBox: string
  width: number
  height: number
}

/**
 * A stretch of the thread that spells something.
 *
 * The thread does not pass over these words — it *becomes* them. The glyph
 * outlines are generated from the real font by `npm run lettering`, and the
 * canvas draws them as part of the same continuous stroke, so the needle
 * appears to write the phrase and then carry on.
 *
 * Renders an invisible box at the word's intended size; the canvas measures
 * that box and maps the glyph path into page coordinates. The text itself is
 * exposed to assistive tech separately, since a path is not a word.
 */
export function ThreadLettering({
  id,
  source,
  className = '',
  ...options
}: ThreadAnchorOptions & {
  id: string
  source: LetteringSource
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const registry = useThreadRegistry()

  const { side, offset, tension, band, hideBelow, order } = options
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
      lettering: source,
    })
  }, [registry, id, side, offsetKey, tension, band, hideBelow, order, source])

  return (
    <span
      ref={ref}
      data-thread-lettering={id}
      aria-hidden="true"
      // Sized by aspect ratio so the reserved space matches the glyphs exactly
      // and the surrounding layout does not shift once the path is drawn.
      className={`pointer-events-none block w-full ${className}`}
      style={{ aspectRatio: `${source.width} / ${source.height}` }}
    />
  )
}
