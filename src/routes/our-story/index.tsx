import { Seo } from '@/components/Seo'
import { ourStory } from '@/content/ourStory.en'
import { Hero } from './Hero'
import { Founders } from './Founders'
import { NameMoment } from './NameMoment'
import { VasOrigin } from './VasOrigin'
import { MillBand } from './MillBand'
import { TribeWall } from './TribeWall'

export function Component() {
  return (
    <>
      <Seo title="Our Story" path="/our-story" description={ourStory.seo.description} />

      <Hero />
      <Founders />
      <NameMoment />
      <VasOrigin />
      <MillBand />
      <TribeWall />
    </>
  )
}

Component.displayName = 'OurStoryRoute'
