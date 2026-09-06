import { Seo } from '@/components/Seo'
import { vas as vasEn } from '@/content/vas.en'
import { vas as vasHi } from '@/content/vas.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { ui as uiEn } from '@/content/ui.en'
import { ui as uiHi } from '@/content/ui.hi'
import { Hero } from './Hero'
import { Intro } from './Intro'
import { QualityIntro } from './QualityIntro'
import { Pillars } from './Pillars'
import { DetailTiles } from './DetailTiles'
import { StatsBand } from './StatsBand'
import { ClosingCta } from './ClosingCta'

export function Component() {
  const vas = useLocaleContent(vasEn, vasHi)
  const ui = useLocaleContent(uiEn, uiHi)
  return (
    <>
      <Seo title={ui.pageTitles.vas} path="/vas" description={vas.seo.description} />

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
