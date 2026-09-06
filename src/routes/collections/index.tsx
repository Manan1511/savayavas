import { Seo } from '@/components/Seo'
import { SplitBand } from '@/components/SplitBand'
import { collectionsPage as collectionsPageEn } from '@/content/collections.en'
import { collectionsPage as collectionsPageHi } from '@/content/collections.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { ui as uiEn } from '@/content/ui.en'
import { ui as uiHi } from '@/content/ui.hi'
import { Hero } from './Hero'
import { Positioning } from './Positioning'
import { CategoriesGrid } from './CategoriesGrid'
import { Manufacturing } from './Manufacturing'
import { CatalogueCta } from './CatalogueCta'

export function Component() {
  const collectionsPage = useLocaleContent(collectionsPageEn, collectionsPageHi)
  const ui = useLocaleContent(uiEn, uiHi)
  const { eyebrow, headline, body } = collectionsPage.craftedWithPurpose

  return (
    <>
      <Seo title={ui.pageTitles.collections} path="/collections" description={collectionsPage.seo.description} />

      <Hero />
      <Positioning />
      <CategoriesGrid />

      <SplitBand image="collections.loom" eyebrow={eyebrow} headline={headline} reverse>
        <p>{body}</p>
      </SplitBand>

      <Manufacturing />
      <CatalogueCta />
    </>
  )
}

Component.displayName = 'CollectionsRoute'
