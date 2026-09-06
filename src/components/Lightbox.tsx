import { useEffect, useRef } from 'react'
import { Figure } from '@/components/Figure'
import type { AssetKey } from '@/assets/registry'

export interface LightboxItem {
  asset: AssetKey
  caption: string
}

/**
 * A focused, keyboard-navigable modal for a set of tiles.
 *
 * Built generic rather than tied to the Tribe wall specifically, since /vas
 * and /collections will both want an enlarged view of a grid item.
 *
 * There is no video here. The deck's Tribe wall implies a player behind each
 * tile, but no video assets exist yet (docs/PLAN.md §2) — showing a fake play
 * control would promise something that does not work. This opens the same
 * still, larger, with its caption. Swapping in real video later means adding
 * a `video` field to the item and branching the render; nothing else here
 * needs to change.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: readonly LightboxItem[]
  index: number
  onClose: () => void
  onNavigate: (nextIndex: number) => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    returnFocusRef.current = document.activeElement as HTMLElement | null
    closeRef.current?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
      returnFocusRef.current?.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((index + 1) % items.length)
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, items.length, onClose, onNavigate])

  const item = items[index]
  if (!item) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      className="fixed inset-0 flex items-center justify-center bg-ink/90 px-6 py-10"
      style={{ zIndex: 'var(--z-overlay)' }}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 text-2xl leading-none text-paper/80 transition-colors hover:text-paper"
      >
        &times;
      </button>

      <button
        type="button"
        aria-label="Previous"
        onClick={(e) => {
          e.stopPropagation()
          onNavigate((index - 1 + items.length) % items.length)
        }}
        className="absolute left-3 top-1/2 -translate-y-1/2 px-3 py-6 text-2xl text-paper/70 transition-colors hover:text-paper sm:left-6"
      >
        &larr;
      </button>

      <div
        className="relative w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <Figure name={item.asset} priority className="w-full" />
        <p className="mt-4 text-center text-xs uppercase tracking-(--tracking-eyebrow) text-paper/85">
          {item.caption}
        </p>
        <p className="mt-1 text-center text-[0.625rem] tabular-nums text-paper/50">
          {index + 1} / {items.length}
        </p>
      </div>

      <button
        type="button"
        aria-label="Next"
        onClick={(e) => {
          e.stopPropagation()
          onNavigate((index + 1) % items.length)
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-6 text-2xl text-paper/70 transition-colors hover:text-paper sm:right-6"
      >
        &rarr;
      </button>
    </div>
  )
}
