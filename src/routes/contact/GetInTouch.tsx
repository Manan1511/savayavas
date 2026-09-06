import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { site } from '@/content/site.en'
import { contactPage } from '@/content/contact.en'

export function GetInTouch() {
  const { phone, email, instagram, hours } = site.contact

  const rows = [
    { label: 'Phone', value: phone, href: `tel:${phone.replace(/\s+/g, '')}` },
    { label: 'Email', value: email, href: `mailto:${email}` },
    { label: 'Instagram', value: instagram, href: `https://instagram.com/${instagram.replace('@', '')}` },
    { label: 'Hours', value: hours },
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
