import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { site as siteEn } from '@/content/site.en'
import { site as siteHi } from '@/content/site.hi'
import { contactPage as contactPageEn } from '@/content/contact.en'
import { contactPage as contactPageHi } from '@/content/contact.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { ui as uiEn } from '@/content/ui.en'
import { ui as uiHi } from '@/content/ui.hi'

export function GetInTouch() {
  const site = useLocaleContent(siteEn, siteHi)
  const contactPage = useLocaleContent(contactPageEn, contactPageHi)
  const ui = useLocaleContent(uiEn, uiHi)
  const { phone, email, instagram, hours } = site.contact

  const rows = [
    { label: ui.contactPage.phoneLabel, value: phone, href: `tel:${phone.replace(/\s+/g, '')}` },
    { label: ui.contactPage.emailLabel, value: email, href: `mailto:${email}` },
    { label: ui.contactPage.instagramLabel, value: instagram, href: `https://instagram.com/${instagram.replace('@', '')}` },
    { label: ui.contactPage.hoursLabel, value: hours },
  ]

  return (
    <Section className="py-16 sm:py-20">
      <Container className="max-w-2xl">
        <Reveal>
          <Eyebrow>{contactPage.getInTouch.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal as="ul" stagger className="mt-6 divide-y divide-greige border-y border-greige">
          {rows.map((row) => (
            <li key={row.label} className="flex items-center justify-between py-3 text-sm">
              <span className="text-ink-soft">{row.label}</span>
              {row.href ? (
                <a href={row.href} className="text-ink transition-colors duration-300 hover:text-brass">
                  {row.value}
                </a>
              ) : (
                <span className="text-ink">{row.value}</span>
              )}
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
