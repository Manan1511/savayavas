import { Seo } from '@/components/Seo'
import { Reviews } from '@/components/Reviews'
import { forDealers as forDealersEn } from '@/content/forDealers.en'
import { forDealers as forDealersHi } from '@/content/forDealers.hi'
import { ui as uiEn } from '@/content/ui.en'
import { ui as uiHi } from '@/content/ui.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { Hero } from './Hero'
import { WhoItsFor } from './WhoItsFor'
import { WhatYouGet } from './WhatYouGet'
import { Onboarding } from './Onboarding'
import { InquiryForm } from './InquiryForm'
import { ExportTerms } from './ExportTerms'
import { Faq } from './Faq'

export function Component() {
  const forDealers = useLocaleContent(forDealersEn, forDealersHi)
  const ui = useLocaleContent(uiEn, uiHi)
  return (
    <>
      <Seo title={ui.pageTitles.forDealers} path="/for-dealers" description={forDealers.seo.description} />

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
