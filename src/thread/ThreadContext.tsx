import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

/** Which z-index band the thread occupies as it passes this anchor. */
export type ThreadBand = 'behind' | 'front'

export interface ThreadAnchorOptions {
  /**
   * Horizontal placement.
   *
   * A **number 0–1** is a fraction of page width and is what you want for most
   * waypoints — it is how the weave is choreographed, and it narrows naturally
   * on small screens so mobile becomes a gentle vertical serpentine for free.
   *
   * `left` and `right` pin to the page edges, for the shared entry/exit points
   * that make the thread read as continuous across routes.
   *
   * `auto` uses the anchor element's own position. Rarely right: an absolutely
   * positioned marker collapses to its container's left edge, so `auto`
   * anchors tend to stack in the gutter and flatten the curve.
   */
  side?: 'auto' | 'left' | 'center' | 'right' | number
  /** Nudge in CSS pixels, [x, y]. For fine-tuning without moving markup. */
  offset?: [number, number]
  /** Curve slack through this point. 1 is standard; lower is tighter. */
  tension?: number
  /** Stacking band for the segment leading up to this anchor. */
  band?: ThreadBand
  /** Drop this anchor below a breakpoint, to thin the curve on small screens. */
  hideBelow?: number
  /**
   * Explicit traversal order.
   *
   * Without it anchors are sorted by vertical position, which means the thread
   * can only ever descend. An arc *over* a headline has to rise and then fall,
   * so any non-monotonic figure must number its anchors. Order them all, or
   * none — mixing within one page is ambiguous by definition.
   */
  order?: number
}

export interface RegisteredAnchor extends ThreadAnchorOptions {
  id: string
  el: HTMLElement
  /** Present when this node spells a phrase instead of being a curve waypoint. */
  lettering?: {
    phrase: string
    d: string
    viewBox: string
    width: number
    height: number
    start?: { x: number; y: number }
    end?: { x: number; y: number }
  }
}

export interface ThreadRegistry {
  register: (anchor: RegisteredAnchor) => () => void
  anchorsRef: React.RefObject<Map<string, RegisteredAnchor>>
}

/**
 * Two contexts, deliberately.
 *
 * The registry's identity must NEVER change: anchors depend on it in an effect,
 * so if it changed on every registration each anchor would re-register, bump
 * the version, and loop forever. Version lives in its own context, consumed
 * only by the canvas, which is the one component that *should* re-render when
 * the anchor set changes.
 */
const RegistryContext = createContext<ThreadRegistry | null>(null)
const VersionContext = createContext(0)

export function ThreadProvider({ children }: { children: React.ReactNode }) {
  const anchorsRef = useRef<Map<string, RegisteredAnchor>>(new Map())
  const [version, setVersion] = useState(0)

  const register = useCallback((anchor: RegisteredAnchor) => {
    anchorsRef.current.set(anchor.id, anchor)
    setVersion((v) => v + 1)
    return () => {
      anchorsRef.current.delete(anchor.id)
      setVersion((v) => v + 1)
    }
  }, [])

  // Empty deps: both members are referentially stable for the provider's life.
  const registry = useMemo<ThreadRegistry>(() => ({ register, anchorsRef }), [register])

  return (
    <RegistryContext.Provider value={registry}>
      <VersionContext.Provider value={version}>{children}</VersionContext.Provider>
    </RegistryContext.Provider>
  )
}

/**
 * Returns null outside a ThreadProvider rather than throwing — a section should
 * be usable on a page that has no thread without needing a special case.
 */
export function useThreadRegistry(): ThreadRegistry | null {
  return useContext(RegistryContext)
}

export function useThreadVersion(): number {
  return useContext(VersionContext)
}
