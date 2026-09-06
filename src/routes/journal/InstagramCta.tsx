import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { site } from '@/content/site.en'

/**
 * A CTA, not a fake feed.
 *
 * No Instagram API access exists, so this deliberately does not render a
 * grid of placeholder tiles implying they are real posts. That would be a
 * specific, easily-noticed dishonesty: claiming to show content that does not
 * exist. A plain follow link is what is actually true.
 */
export function InstagramCta() {
  const handle = site.contact.instagram
  const href = `https://instagram.com/${handle.replace('@', '')}`

  return (
    <Section tone="ink" className="py-16 sm:py-20">
      <Container className="max-w-xl text-center">
        <Reveal>
          <Eyebrow className="text-brass-soft">On Instagram</Eyebrow>
          <h2 className="mt-4 text-2xl leading-snug text-paper sm:text-3xl">
            More from the mill floor, in between posts.
          </h2>
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-6 inline-block border-b border-brass-soft pb-1 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass-soft transition-colors duration-300 hover:border-paper hover:text-paper"
          >
            Follow {handle} &rarr;
          </a>
        </Reveal>
      </Container>
    </Section>
  )
}
