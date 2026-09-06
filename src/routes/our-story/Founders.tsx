import { Eyebrow } from '@/components/Eyebrow'
import { Figure } from '@/components/Figure'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { ourStory as ourStoryEn } from '@/content/ourStory.en'
import { ourStory as ourStoryHi } from '@/content/ourStory.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'

export function Founders() {
  const ourStory = useLocaleContent(ourStoryEn, ourStoryHi)
  const { eyebrow, headline, body, names } = ourStory.founders

  return (
    <Section className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <Figure name="story.founders" className="w-full" />
          </Reveal>

          <Reveal className="flex flex-col justify-center">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-5 text-3xl uppercase leading-tight sm:text-4xl">{headline}</h2>

            <div className="mt-6 space-y-4 text-sm leading-relaxed">
              {body.map((p) => (
                <p key={p.slice(0, 24)} className="u-prose">
                  {p}
                </p>
              ))}
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-greige pt-6">
              {names.map((name) => (
                <li key={name} className="text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass">
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
