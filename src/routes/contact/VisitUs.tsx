import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { site as siteEn } from '@/content/site.en'
import { site as siteHi } from '@/content/site.hi'
import { contactPage as contactPageEn } from '@/content/contact.en'
import { contactPage as contactPageHi } from '@/content/contact.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'

/**
 * Two real addresses (office, factory), not one: the office is the
 * customer-facing trade address; the factory is listed alongside it with
 * its own directions link, same as an invoice or letterhead would show
 * both. "Get Directions" opens Maps directly rather than an embed.
 */
/** The office's actual Google Maps listing, supplied directly rather than
    derived from the address text via a search query. */
const OFFICE_DIRECTIONS_HREF = 'https://maps.app.goo.gl/aMQzemuTK5yDevgd6?g_st=iw'

export function VisitUs() {
  const site = useLocaleContent(siteEn, siteHi)
  const contactPage = useLocaleContent(contactPageEn, contactPageHi)
  const { eyebrow, directionsLabel } = contactPage.visitUs
  const { office, factory } = site.contact.address

  return (
    <Section tone="ivory" className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <div className="mt-5 grid gap-10 sm:grid-cols-2">
            <AddressBlock label={office.label} lines={office.lines} directionsLabel={directionsLabel} directionsHref={OFFICE_DIRECTIONS_HREF} />
            <AddressBlock label={factory.label} lines={factory.lines} />
          </div>
        </Reveal>
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
  directionsLabel?: string
  directionsHref?: string
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
      {directionsHref && (
        <a
          href={directionsHref}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-4 inline-block border-b border-brass pb-1 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass transition-colors duration-300 hover:border-ink hover:text-ink"
        >
          {directionsLabel} &rarr;
        </a>
      )}
    </div>
  )
}
