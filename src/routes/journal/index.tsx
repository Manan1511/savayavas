import { Seo } from '@/components/Seo'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { ui as uiEn } from '@/content/ui.en'
import { ui as uiHi } from '@/content/ui.hi'
import { JournalIndex } from './JournalIndex'
import { InstagramCta } from './InstagramCta'

export function Component() {
  const ui = useLocaleContent(uiEn, uiHi)
  return (
    <>
      <Seo title={ui.pageTitles.journal} path="/journal" description={ui.journal.seoDescription} />

      <JournalIndex />
      <InstagramCta />
    </>
  )
}

Component.displayName = 'JournalIndexRoute'
