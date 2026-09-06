import { Seo } from '@/components/Seo'
import { Reviews } from '@/components/Reviews'
import { contactPage } from '@/content/contact.en'
import { Hero } from './Hero'
import { GetInTouch } from './GetInTouch'
import { VisitUs } from './VisitUs'
import { InquiryForm } from './InquiryForm'

export function Component() {
  return (
    <>
      <Seo title="Contact" path="/contact" description={contactPage.seo.description} />

      <Hero />
      <Reviews />
      <GetInTouch />
      <VisitUs />
      <InquiryForm />
    </>
  )
}

Component.displayName = 'ContactRoute'
