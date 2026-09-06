import { Seo } from '@/components/Seo'
import { vas } from '@/content/vas.en'
import { Hero } from './Hero'
import { Intro } from './Intro'
import { QualityIntro } from './QualityIntro'
import { Pillars } from './Pillars'
import { DetailTiles } from './DetailTiles'
import { StatsBand } from './StatsBand'
import { ClosingCta } from './ClosingCta'

export function Component() {
  return (
    <>
      <Seo title="VAS" path="/vas" description={vas.seo.description} />

      <Hero />
      <Intro />
      <QualityIntro />
      <Pillars />
      <DetailTiles />
      <StatsBand />
      <ClosingCta />
    </>
  )
}

Component.displayName = 'VasRoute'
