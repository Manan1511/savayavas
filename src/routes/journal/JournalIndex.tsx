import { useState } from 'react'
import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { journalPosts as journalPostsEn, journalCategories as journalCategoriesEn } from '@/content/journal.en'
import { journalPosts as journalPostsHi, journalCategories as journalCategoriesHi } from '@/content/journal.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { ui as uiEn } from '@/content/ui.en'
import { ui as uiHi } from '@/content/ui.hi'
import { PostCard } from './PostCard'

/**
 * Header, featured post and the filterable grid together: the filter needs
 * to own which posts the grid shows, so splitting "featured" and "grid" into
 * fully separate components would just move that state up without gaining
 * anything.
 */
export function JournalIndex() {
  const journalPosts = useLocaleContent(journalPostsEn, journalPostsHi)
  const journalCategories = useLocaleContent(journalCategoriesEn, journalCategoriesHi)
  const ui = useLocaleContent(uiEn, uiHi)
  const [category, setCategory] = useState<string | null>(null)

  const [featured, ...rest] = journalPosts
  const grid = category ? rest.filter((p) => p.category === category) : rest

  if (!featured) return null

  return (
    <Section tone="ivory" className="pb-16 pt-32 sm:pb-20 sm:pt-40">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{ui.journal.contentHub}</Eyebrow>
          <h1 className="mt-5 text-4xl uppercase leading-[1.05] sm:text-5xl lg:text-6xl">{ui.pageTitles.journal}</h1>
          <p className="u-prose mt-6 text-sm leading-relaxed">{ui.journal.intro}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <PostCard post={featured} featured />
        </Reveal>
      </Container>

      <Container className="mt-16">
        <Reveal className="flex flex-wrap items-center gap-2">
          <FilterButton active={category === null} onClick={() => setCategory(null)}>
            {ui.journal.filterAll}
          </FilterButton>
          {journalCategories.map((c) => (
            <FilterButton key={c} active={category === c} onClick={() => setCategory(c)}>
              {c}
            </FilterButton>
          ))}
        </Reveal>

        <Reveal key={category ?? 'all'} as="ul" stagger className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {grid.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </Reveal>

        {grid.length === 0 && (
          <p className="mt-8 text-sm text-stone">{ui.journal.noPostsInCategory}</p>
        )}
      </Container>
    </Section>
  )
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-4 py-1.5 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) transition-colors duration-300 ${
        active ? 'border-ink bg-ink text-paper' : 'border-greige text-ink-soft hover:border-brass hover:text-brass'
      }`}
    >
      {children}
    </button>
  )
}
