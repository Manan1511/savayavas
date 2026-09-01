import { useEffect, useLayoutEffect } from 'react'

/**
 * useLayoutEffect in the browser, useEffect on the server.
 *
 * Every route is prerendered, and React warns about useLayoutEffect during
 * server rendering. The layout variant matters on the client: it runs before
 * paint, so an element can be hidden and positioned without the browser first
 * showing it in its final state and then snapping it away.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect
