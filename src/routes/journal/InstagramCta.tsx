import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { site as siteEn } from '@/content/site.en'
import { site as siteHi } from '@/content/site.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { ui as uiEn } from '@/content/ui.en'
import { ui as uiHi } from '@/content/ui.hi'

/**
 * A CTA, not a fake feed.
 *
 * No Instagram API access exists, so this deliberately does not render a
 * grid of placeholder tiles implying they are real posts. That would be a
 * specific, easily-noticed dishonesty: claiming to show content that does not
 * exist. A plain follow link is what is actually true.
 */
export function InstagramCta() {
  const site = useLocaleContent(siteEn, siteHi)
  const ui = useLocaleContent(uiEn, uiHi)
  const handle = site.contact.instagram
  const href = `https://instagram.com/${handle.replace('@', '')}`

  return (
    <Section tone="ink" className="py-16 sm:py-20">
      <Container className="max-w-xl text-center">
        <Reveal>
          <Eyebrow className="text-brass-soft">{ui.journal.onInstagram}</Eyebrow>
          <h2 className="mt-4 text-2xl leading-snug text-paper sm:text-3xl">
            {ui.journal.instagramCtaHeadline}
          </h2>
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-6 inline-block border-b border-brass-soft pb-1 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass-soft transition-colors duration-300 hover:border-paper hover:text-paper"
          >
            {ui.journal.followHandle.replace('{handle}', handle)} &rarr;
          </a>
        </Reveal>
      </Container>
    </Section>
  )
}
