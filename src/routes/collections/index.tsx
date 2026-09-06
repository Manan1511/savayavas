import { Seo } from '@/components/Seo'
import { SplitBand } from '@/components/SplitBand'
import { collectionsPage } from '@/content/collections.en'
import { Hero } from './Hero'
import { Positioning } from './Positioning'
import { CategoriesGrid } from './CategoriesGrid'
import { Manufacturing } from './Manufacturing'
import { CatalogueCta } from './CatalogueCta'

export function Component() {
  const { eyebrow, headline, body } = collectionsPage.craftedWithPurpose

  return (
    <>
      <Seo title="Collections" path="/collections" description={collectionsPage.seo.description} />

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
