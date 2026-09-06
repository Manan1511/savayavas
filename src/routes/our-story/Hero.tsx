import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { ourStory as ourStoryEn } from '@/content/ourStory.en'
import { ourStory as ourStoryHi } from '@/content/ourStory.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'

/**
 * A quiet header, deliberately: this page's strength is the copy that
 * follows, not a collage. Unlike Home there is no product to sell here, only
 * a story to be believed.
 */
export function Hero() {
  const ourStory = useLocaleContent(ourStoryEn, ourStoryHi)
  return (
    <Section tone="ivory" className="pb-16 pt-32 sm:pb-20 sm:pt-40">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{ourStory.hero.eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl uppercase leading-[1.08] sm:text-5xl lg:text-6xl">
            {ourStory.hero.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
        </Reveal>
      </Container>
    </Section>
  )
}
