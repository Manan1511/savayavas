import type { AssetKey } from '@/assets/registry'

/**
 * Journal posts.
 *
 * The plan originally called for MDX files prerendered per slug. Deviating
 * from that here: no real posts exist yet, and adding an MDX toolchain for
 * placeholder content is complexity with no payoff. Typed objects match the
 * convention every other route already follows, and the shape below (slug,
 * title, date, excerpt, category, cover, body paragraphs) maps directly onto
 * frontmatter + body if this becomes real MDX or a CMS document later.
 *
 * These four posts are genuine, generic textile-trade explainers, not
 * fabricated Savayavas claims or stats. They exist to prove the route works
 * end to end (list, filter, detail, related, share) and should be reviewed
 * or replaced with real editorial content before launch.
 *
 * Cover images reuse existing registry assets by topic rather than adding a
 * new placeholder per post for content nobody has written in real life yet.
 */

export interface JournalPost {
  slug: string
  title: string
  /** ISO date. Rendered via <time>, and sorts the index newest-first. */
  date: string
  category: string
  excerpt: string
  cover: AssetKey
  body: string[]
}

export const journalCategories = ['Guides', 'Craft', 'Sourcing'] as const

export const journalPosts: JournalPost[] = [
  {
    slug: 'gsm-explained',
    title: 'GSM Explained: What It Actually Means for Shirting',
    date: '2026-08-12',
    category: 'Guides',
    excerpt: 'GSM gets treated as a single quality score. It is really a weight measurement, and weight alone will not tell you how a shirting fabric will perform.',
    cover: 'quality.finish',
    body: [
      'GSM stands for grams per square metre: the weight of a fabric, measured over a fixed area. It is one of the first specifications a buyer asks for, and one of the most misunderstood.',
      'A higher GSM does not automatically mean a better fabric. It means a heavier one. A lightweight 100 GSM cotton can be perfectly durable for a warm-weather shirt, while a heavier 160 GSM cloth suits a structured winter shirt. The right GSM depends on the end use, not a universal ranking.',
      'What GSM does not tell you: weave density, yarn quality, finishing, or how the fabric will drape and wear over time. Two fabrics at the same GSM can feel completely different in the hand. Treat GSM as one data point in a specification, not the whole picture.',
    ],
  },
  {
    slug: 'cotton-vs-linen',
    title: 'Cotton vs Linen: Choosing the Right Base Cloth',
    date: '2026-07-28',
    category: 'Guides',
    excerpt: 'Neither fibre is better. They solve different problems, and choosing between them comes down to the season, the silhouette and the finish you are after.',
    cover: 'collections.yarn-table',
    body: [
      'Cotton and linen are both natural, breathable fibres, and both are staples of shirting, but they behave differently on the body and in production.',
      'Cotton takes dye evenly, holds a crisp finish, and is more forgiving in high-volume manufacturing: consistent hand-feel, batch after batch, is easier to achieve. It is the dependable choice for everyday formal and casual shirting.',
      'Linen breathes better in heat, develops a distinctive textured drape, and is the natural choice for warm-weather and resort-formal menswear. It wrinkles more readily than cotton, which buyers either specify around or lean into as part of the fabric’s character.',
      'In practice, many of the best-performing shirting fabrics are blends: cotton’s consistency with linen’s texture, engineered to bring the best of both to a single cloth.',
    ],
  },
  {
    slug: 'consistency-at-scale',
    title: 'Why Consistency Matters More Than Perfection in Bulk Sourcing',
    date: '2026-07-05',
    category: 'Sourcing',
    excerpt: 'A single beautiful sample means nothing to a production line. What a manufacturer actually needs is the same result, batch after batch, at volume.',
    cover: 'story.mill',
    body: [
      'It is easy to be impressed by a single swatch. It is much harder to reproduce that exact hand-feel, colour and drape across a production run of thousands of metres, months apart, from different dye lots.',
      'For a garment manufacturer, that consistency is the entire value proposition of a fabric supplier. A slight shift in shade or shrinkage between batches does not show up on a swatch card; it shows up as rejected garments on a cutting floor.',
      'This is why rigorous, repeatable testing (tensile strength, colour fastness, shrinkage control) matters more at scale than it does for a one-off sample. It is also why a manufacturer sourcing at volume should ask a supplier how consistency is verified, not just what the fabric feels like today.',
    ],
  },
  {
    slug: 'reading-a-composition-label',
    title: 'How to Read a Fabric Composition Label',
    date: '2026-06-19',
    category: 'Craft',
    excerpt: 'A composition label is a short, precise summary of what a fabric is made of, and it tells you more than most buyers realise.',
    cover: 'vas.fabric-stack',
    body: [
      'A composition label lists the fibres in a fabric by percentage: for example, "60% Cotton, 40% Polyester." The order and the numbers both matter, and reading them well tells you a lot about how a fabric will perform before you ever touch it.',
      'A high natural-fibre percentage (cotton, linen) generally means better breathability and a softer hand-feel over time. A higher synthetic percentage (polyester) generally means better wrinkle resistance, easier care and more consistent behaviour at scale.',
      'Blends are not a compromise; they are a deliberate choice. A 60/40 cotton-polyester blend is engineered specifically to balance comfort against durability and cost, for buyers who need both.',
    ],
  },
]

export type JournalCategory = (typeof journalCategories)[number]

/**
 * Locale-agnostic and generic over the exact post shape, not just
 * `JournalPost`: `useLocaleContent`'s `LocaleShape` widens `cover` from
 * `AssetKey` to `string` along with the real copy fields (see the equivalent
 * comment in our-story/TribeWall.tsx), so a Hindi-resolved posts array is
 * `LocaleShape<JournalPost>[]`, not `JournalPost[]`. Being generic lets both
 * shapes flow through untouched, taking the already-resolved (English or
 * Hindi) posts array rather than reaching for `journalPosts` directly, so a
 * Hindi route page gets Hindi-language related posts instead of silently
 * falling back to English data.
 */
export function getPostBySlug<T extends { slug: string }>(posts: readonly T[], slug: string): T | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getRelatedPosts<T extends { slug: string; category: string }>(
  posts: readonly T[],
  slug: string,
  limit = 2,
): T[] {
  const current = getPostBySlug(posts, slug)
  if (!current) return []
  const sameCategory = posts.filter((p) => p.slug !== slug && p.category === current.category)
  const rest = posts.filter((p) => p.slug !== slug && p.category !== current.category)
  return [...sameCategory, ...rest].slice(0, limit)
}
