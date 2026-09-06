import { Seo } from '@/components/Seo'
import { Reviews } from '@/components/Reviews'
import { forDealers } from '@/content/forDealers.en'
import { Hero } from './Hero'
import { WhoItsFor } from './WhoItsFor'
import { WhatYouGet } from './WhatYouGet'
import { Onboarding } from './Onboarding'
import { InquiryForm } from './InquiryForm'
import { ExportTerms } from './ExportTerms'
import { Faq } from './Faq'

export function Component() {
  return (
    <>
      <Seo title="For Dealers" path="/for-dealers" description={forDealers.seo.description} />

      <Hero />
      <WhoItsFor />
      <WhatYouGet />
      <Onboarding />
      <InquiryForm />
      <ExportTerms />
      <Reviews />
      <Faq />
    </>
  )
}

Component.displayName = 'ForDealersRoute'
