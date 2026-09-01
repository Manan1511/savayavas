import { Seo } from '@/components/Seo'
import { Reviews } from '@/components/Reviews'
import { ThreadProvider, ThreadCanvas } from '@/thread'
import { home } from '@/content/home.en'
import { Hero } from './Hero'
import { About } from './About'
import { Categories } from './Categories'
import { VasCallout } from './VasCallout'
import { DualCta } from './DualCta'

export function Component() {
  return (
    <>
      <Seo title="Home" path="/" description={home.seo.description} />

      {/* The thread spans the whole page, so the provider wraps every section
          and the canvas measures across all of them. */}
      <ThreadProvider>
        <ThreadCanvas />
        <Hero />
        <About />
        <Categories />
        <VasCallout />
        <Reviews />
        <DualCta />
      </ThreadProvider>
    </>
  )
}

Component.displayName = 'HomeRoute'
