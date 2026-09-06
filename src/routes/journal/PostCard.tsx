import { Link } from 'react-router-dom'
import { Figure } from '@/components/Figure'
import type { JournalPost } from '@/content/journal.en'

export function PostCard({ post, featured = false }: { post: JournalPost; featured?: boolean }) {
  // Featured renders as h2, grid/related cards as h3. On the journal index the
  // featured post follows the page's own h1 directly (h1 -> h2 -> h3 grid
  // cards); on a post detail page "Related" is itself promoted to h2 (see
  // post.tsx), so its non-featured cards correctly nest as h3 underneath it.
  // Both pages previously jumped h1 straight to h3, failing the heading-order
  // accessibility check (confirmed via Lighthouse on /for-dealers, then found
  // by the same manual audit here before Lighthouse was even run on this page).
  const Title = featured ? 'h2' : 'h3'

  return (
    <Link to={`/journal/${post.slug}`} className="group block">
      <Figure
        name={post.cover}
        className="w-full"
        imgClassName="transition-transform duration-500 group-hover:scale-105"
      />
      <div className={featured ? 'mt-6 max-w-xl' : 'mt-4'}>
        <p className="text-[0.625rem] uppercase tracking-(--tracking-eyebrow) text-brass">
          {post.category} &middot; <PostDate date={post.date} />
        </p>
        <Title className={featured ? 'mt-3 text-3xl leading-tight text-ink sm:text-4xl' : 'mt-2 text-lg leading-snug text-ink'}>
          {post.title}
        </Title>
        {featured && <p className="u-prose mt-3 text-sm leading-relaxed">{post.excerpt}</p>}
      </div>
    </Link>
  )
}

export function PostDate({ date }: { date: string }) {
  const formatted = new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  return <time dateTime={date}>{formatted}</time>
}
