import { Seo } from '@/components/Seo'
import { Reviews } from '@/components/Reviews'
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

      <Hero />
      <About />
      <Categories />
      <VasCallout />
      <Reviews />
      <DualCta />
    </>
  )
}

Component.displayName = 'HomeRoute'
