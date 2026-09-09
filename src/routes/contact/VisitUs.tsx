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
 *
 * Two real addresses (office, factory), not one: the office is the
 * customer-facing trade address and gets the map image; the factory is
 * listed alongside it with its own directions link, same as an invoice
 * or letterhead would show both.
 */
export function VisitUs() {
  const site = useLocaleContent(siteEn, siteHi)
  const contactPage = useLocaleContent(contactPageEn, contactPageHi)
  const ui = useLocaleContent(uiEn, uiHi)
  const { eyebrow, directionsLabel } = contactPage.visitUs
  const { office, factory } = site.contact.address
  const directionsHref = (lines: readonly string[]) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lines.join(', '))}`

  return (
    <Section tone="ivory" className="py-16 sm:py-20">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
            <div className="mt-5 grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
              <AddressBlock label={office.label} lines={office.lines} directionsLabel={directionsLabel} directionsHref={directionsHref(office.lines)} />
              <AddressBlock label={factory.label} lines={factory.lines} directionsLabel={directionsLabel} directionsHref={directionsHref(factory.lines)} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href={directionsHref(office.lines)}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={ui.contactPage.getDirectionsAria}
            >
              <Figure name="contact.map" className="w-full" />
            </a>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

function AddressBlock({
  label,
  lines,
  directionsLabel,
  directionsHref,
}: {
  label: string
  lines: readonly string[]
  directionsLabel: string
  directionsHref: string
}) {
  return (
    <div>
      <p className="text-[0.625rem] uppercase tracking-(--tracking-eyebrow) text-brass">{label}</p>
      <address className="not-italic">
        {lines.map((line) => (
          <span key={line} className="mt-2 block text-sm leading-relaxed text-ink">
            {line}
          </span>
        ))}
      </address>
      <a
        href={directionsHref}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-4 inline-block border-b border-brass pb-1 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass transition-colors duration-300 hover:border-ink hover:text-ink"
      >
        {directionsLabel} &rarr;
      </a>
    </div>
  )
}
