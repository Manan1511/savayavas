import { Seo } from '@/components/Seo'
import { ourStory as ourStoryEn } from '@/content/ourStory.en'
import { ourStory as ourStoryHi } from '@/content/ourStory.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { ui as uiEn } from '@/content/ui.en'
import { ui as uiHi } from '@/content/ui.hi'
import { Hero } from './Hero'
import { Founders } from './Founders'
import { NameMoment } from './NameMoment'
import { VasOrigin } from './VasOrigin'
import { MillBand } from './MillBand'
import { TribeWall } from './TribeWall'

export function Component() {
  const ourStory = useLocaleContent(ourStoryEn, ourStoryHi)
  const ui = useLocaleContent(uiEn, uiHi)
  return (
    <>
      <Seo title={ui.pageTitles.ourStory} path="/our-story" description={ourStory.seo.description} />

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
