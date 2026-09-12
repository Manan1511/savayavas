import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { ourStory as ourStoryEn } from '@/content/ourStory.en'
import { ourStory as ourStoryHi } from '@/content/ourStory.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'

/**
 * The single best piece of copy on the site, given the room to be one.
 *
 * सावयव and वास are set in Noto Serif Devanagari regardless of the active
 * locale: this is the etymology behind the entire brand name, not a
 * translated aside, and it must render correctly on the English build.
 *
 * A Latin display face has no real equivalent for a Devanagari word, so the
 * script and the roman transliteration sit side by side rather than one
 * standing in for the other.
 */
export function NameMoment() {
  const ourStory = useLocaleContent(ourStoryEn, ourStoryHi)
  const { eyebrow, headline, savayav, vas, body } = ourStory.name

  return (
    <Section tone="ink" className="py-24 sm:py-32">
      <Container className="max-w-3xl text-center">
        <Reveal>
          <Eyebrow className="text-brass-soft">{eyebrow}</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-xl text-2xl leading-snug text-paper sm:text-3xl">
            {headline}
          </h2>

          <div className="mt-14 flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-16">
            <WordBlock script={savayav.script} roman={savayav.roman} meaning={savayav.meaning} />
            <span aria-hidden className="hidden text-3xl text-brass-soft/60 sm:block">
              +
            </span>
            <WordBlock script={vas.script} roman={vas.roman} meaning={vas.meaning} />
          </div>

          <div className="mt-14 space-y-4 text-left text-sm leading-relaxed text-paper/80 sm:text-center">
            {body.map((p) => (
              <p key={p.slice(0, 20)} className="u-prose mx-auto">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

function WordBlock({ script, roman, meaning }: { script: string; roman: string; meaning: string }) {
  return (
    <div className="text-center">
      <p lang="hi" className="font-(family-name:--font-deva) text-6xl text-brass-soft sm:text-7xl">
        {script}
      </p>
      <p className="mt-3 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-paper">
        {roman}
      </p>
      <p className="mt-1 text-xs italic text-paper/60">{meaning}</p>
    </div>
  )
}
