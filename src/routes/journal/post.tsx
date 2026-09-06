import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Eyebrow } from '@/components/Eyebrow'
import { Figure } from '@/components/Figure'
import { Section, Container } from '@/components/Section'
import { Seo } from '@/components/Seo'
import { Reveal } from '@/motion'
import { getPostBySlug, getRelatedPosts } from '@/content/journal.en'
import { PostCard, PostDate } from './PostCard'

/** One page per post, prerendered from journalPosts. */
export function Component() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <div className="mx-auto max-w-(--container-content) px-(--spacing-gutter) py-32 text-center">
        <Eyebrow>Not Found</Eyebrow>
        <h1 className="mt-4 text-5xl uppercase">Unknown Post</h1>
        <Link to="/journal" className="mt-6 inline-block text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass">
          Back to Journal &rarr;
        </Link>
      </div>
    )
  }

  const related = getRelatedPosts(post.slug)

  return (
    <>
      <Seo title={post.title} path={`/journal/${post.slug}`} description={post.excerpt} type="article" />

      <Section tone="ivory" className="pb-12 pt-32 sm:pb-16 sm:pt-40">
        <Container className="max-w-2xl">
          <Reveal>
            <Link
              to="/journal"
              className="text-[0.625rem] uppercase tracking-(--tracking-eyebrow) text-brass hover:text-ink"
            >
              &larr; Journal
            </Link>
            <p className="mt-6 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass">
              {post.category} &middot; <PostDate date={post.date} />
            </p>
            <h1 className="mt-3 text-3xl leading-tight sm:text-4xl lg:text-5xl">{post.title}</h1>
          </Reveal>
        </Container>
      </Section>

      <Container className="max-w-3xl py-10">
        <Reveal>
          <Figure name={post.cover} className="w-full" priority />
        </Reveal>
      </Container>

      <Section className="pb-16 sm:pb-20">
        <Container className="max-w-2xl">
          <Reveal className="space-y-5">
            {post.body.map((p) => (
              <p key={p.slice(0, 24)} className="u-prose text-base leading-relaxed text-ink">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal className="mt-10 border-t border-greige pt-6">
            <ShareLink slug={post.slug} />
          </Reveal>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="ivory" className="py-16 sm:py-20">
          <Container>
            <Reveal>
              <Eyebrow>Related</Eyebrow>
            </Reveal>
            <Reveal as="ul" stagger className="mt-6 grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </Reveal>
          </Container>
        </Section>
      )}
    </>
  )
}

Component.displayName = 'JournalPostRoute'

/**
 * Copies the URL rather than opening a share-intent popup: no share API
 * integration exists, and copy-link works identically everywhere without one.
 */
function ShareLink({ slug }: { slug: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'blocked'>('idle')
  const url = `https://savayavas.co/journal/${slug}`

  async function onClick() {
    try {
      await navigator.clipboard.writeText(url)
      setState('copied')
    } catch {
      // Clipboard access can be denied (permissions, an unfocused document, an
      // insecure context, an older browser). A visitor who clicks and sees
      // nothing happen has no way to know the copy failed silently, so this
      // falls back to showing the URL itself rather than doing nothing.
      setState('blocked')
    }
    setTimeout(() => setState('idle'), 2500)
  }

  if (state === 'blocked') {
    return (
      <p className="text-xs text-ink-soft">
        Could not copy automatically. Here is the link:{' '}
        <span className="select-all text-ink">{url}</span>
      </p>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass transition-colors duration-300 hover:text-ink"
    >
      {state === 'copied' ? 'Link Copied' : 'Share This Post'}
    </button>
  )
}
