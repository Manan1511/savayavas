import { useSearchParams } from 'react-router-dom'
import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { LeadForm } from '@/components/LeadForm'
import { Reveal } from '@/motion'
import { site as siteEn } from '@/content/site.en'
import { site as siteHi } from '@/content/site.hi'
import { contactPage as contactPageEn } from '@/content/contact.en'
import { contactPage as contactPageHi } from '@/content/contact.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { ui as uiEn } from '@/content/ui.en'
import { ui as uiHi } from '@/content/ui.hi'
import type { LeadKind } from '@/lib/submitLead'

/**
 * One form covers both Trade and Export Inquiry, per the same reasoning as
 * /for-dealers: two near-identical forms stacked on a page is redundant UX.
 * LeadForm shows the export payment acknowledgment automatically once
 * "Export Inquiry" is selected (see LeadForm's `needsExportAck`).
 *
 * `?category=<slug>` arrives here from a /collections/:category "Enquire
 * About X" link; when it matches a real category the form shows which one
 * and submits it as the lead's `category` field.
 */
export function InquiryForm() {
  const site = useLocaleContent(siteEn, siteHi)
  const contactPage = useLocaleContent(contactPageEn, contactPageHi)
  const ui = useLocaleContent(uiEn, uiHi)
  const { eyebrow, headline, body, typeOptions } = contactPage.form
  const [searchParams] = useSearchParams()
  const categorySlug = searchParams.get('category') ?? undefined
  const category = site.categories.find((c) => c.slug === categorySlug)

  return (
    <Section className="py-20 sm:py-24">
      <Container className="max-w-xl">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl uppercase leading-tight sm:text-4xl">{headline}</h2>
          <p className="u-prose mt-4 text-sm leading-relaxed">{body}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <LeadForm
            kind={typeOptions[0]!.value as LeadKind}
            typeOptions={typeOptions.map((o) => ({ value: o.value as LeadKind, label: o.label }))}
            category={category?.slug}
            categoryLabel={category?.name}
            submitLabel={ui.common.sendEnquiry}
          />
        </Reveal>
      </Container>
    </Section>
  )
}
