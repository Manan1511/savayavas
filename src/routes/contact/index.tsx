import { Seo } from '@/components/Seo'
import { Reviews } from '@/components/Reviews'
import { contactPage as contactPageEn } from '@/content/contact.en'
import { contactPage as contactPageHi } from '@/content/contact.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { ui as uiEn } from '@/content/ui.en'
import { ui as uiHi } from '@/content/ui.hi'
import { Hero } from './Hero'
import { GetInTouch } from './GetInTouch'
import { VisitUs } from './VisitUs'
import { InquiryForm } from './InquiryForm'

export function Component() {
  const contactPage = useLocaleContent(contactPageEn, contactPageHi)
  const ui = useLocaleContent(uiEn, uiHi)
  return (
    <>
      <Seo title={ui.pageTitles.contact} path="/contact" description={contactPage.seo.description} />

      <Hero />
      <Reviews />
      <GetInTouch />
      <VisitUs />
      <InquiryForm />
    </>
  )
}

Component.displayName = 'ContactRoute'
