import { Eyebrow } from '@/components/Eyebrow'
import { Figure } from '@/components/Figure'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { site as siteEn } from '@/content/site.en'
import { site as siteHi } from '@/content/site.hi'
import { contactPage as contactPageEn } from '@/content/contact.en'
import { contactPage as contactPageHi } from '@/content/contact.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { ui as uiEn } from '@/content/ui.en'
import { ui as uiHi } from '@/content/ui.hi'

/**
 * A static map image, not a live Google Maps embed. An iframe embed adds
 * roughly 500KB and third-party cookies to what is otherwise the site's
 * quietest page (docs/PLAN.md §6). "Get Directions" opens Maps directly
 * instead, so the wayfinding still works, just off-page.
 */
export function VisitUs() {
  const site = useLocaleContent(siteEn, siteHi)
  const contactPage = useLocaleContent(contactPageEn, contactPageHi)
  const ui = useLocaleContent(uiEn, uiHi)
  const { eyebrow, directionsLabel } = contactPage.visitUs
  const address = site.contact.address.lines.join(', ')
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

  return (
    <Section tone="ivory" className="py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
            <address className="not-italic">
              {site.contact.address.lines.map((line) => (
                <span key={line} className="block text-sm leading-relaxed text-ink">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={directionsHref}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-5 inline-block border-b border-brass pb-1 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass transition-colors duration-300 hover:border-ink hover:text-ink"
            >
              {directionsLabel} &rarr;
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <a href={directionsHref} target="_blank" rel="noreferrer noopener" aria-label={ui.contactPage.getDirectionsAria}>
              <Figure name="contact.map" className="w-full" />
            </a>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
