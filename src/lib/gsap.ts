import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Single place GSAP plugins are registered.
 *
 * Registration must happen at module scope, not in a provider's effect: child
 * effects run before parent effects, so a component using ScrollTrigger would
 * construct one before the provider had registered it — which fails with a
 * bare "_context is not a function". Importing this module guarantees the
 * plugin exists before any component can reach for it.
 */
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
