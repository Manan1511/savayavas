import { Eyebrow } from '@/components/Eyebrow'
import { Figure } from '@/components/Figure'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import type { AssetKey } from '@/assets/registry'
import { ourStory as ourStoryEn } from '@/content/ourStory.en'
import { ourStory as ourStoryHi } from '@/content/ourStory.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'

export function Founders() {
  const ourStory = useLocaleContent(ourStoryEn, ourStoryHi)
  const { eyebrow, headline, body, people } = ourStory.founders

  return (
    <Section className="py-20 sm:py-28">
      <Container className="max-w-5xl text-center">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl uppercase leading-tight sm:text-4xl">{headline}</h2>

          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-sm leading-relaxed">
            {body.map((p) => (
              <p key={p.slice(0, 24)} className="u-prose mx-auto">
                {p}
              </p>
            ))}
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5">
            {people.map((person) => (
              <li key={person.name} className="mx-auto w-full max-w-44">
                <Figure name={person.photo as AssetKey} aspect={2 / 3} focus="object-center" />
                <p className="mt-3 text-center text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass">
                  {person.name}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  )
}
