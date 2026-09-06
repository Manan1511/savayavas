import { Seo } from '@/components/Seo'
import { Reviews } from '@/components/Reviews'
import { home as homeEn } from '@/content/home.en'
import { home as homeHi } from '@/content/home.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { ui as uiEn } from '@/content/ui.en'
import { ui as uiHi } from '@/content/ui.hi'
import { Hero } from './Hero'
import { About } from './About'
import { Categories } from './Categories'
import { VasCallout } from './VasCallout'
import { DualCta } from './DualCta'

export function Component() {
  const home = useLocaleContent(homeEn, homeHi)
  const ui = useLocaleContent(uiEn, uiHi)
  return (
    <>
      <Seo title={ui.pageTitles.home} path="/" description={home.seo.description} />

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
