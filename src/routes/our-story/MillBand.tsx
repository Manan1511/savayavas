import { Figure } from '@/components/Figure'
import { Eyebrow } from '@/components/Eyebrow'
import { Reveal } from '@/motion'
import { ourStory as ourStoryEn } from '@/content/ourStory.en'
import { ourStory as ourStoryHi } from '@/content/ourStory.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'

/**
 * A single full-bleed image between the family story and the tribe wall. No
 * card, no copy block: this is a breath, not another section to read.
 */
export function MillBand() {
  const ourStory = useLocaleContent(ourStoryEn, ourStoryHi)
  return (
    <section className="relative bg-ink">
      <Reveal>
        <Figure name="story.mill" className="w-full" imgClassName="opacity-90" />
      </Reveal>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-(--spacing-gutter) py-8">
        <Eyebrow className="text-brass-soft">{ourStory.mill.eyebrow}</Eyebrow>
        <p className="mt-1 text-xs text-paper/85">{ourStory.mill.caption}</p>
      </div>
    </section>
  )
}
