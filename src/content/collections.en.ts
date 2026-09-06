/**
 * Collections index copy.
 *
 * The positioning paragraph is your own text, verbatim. Everything else is
 * adapted from the concept boards, rewritten to the no-em-dash convention.
 */

export const collectionsPage = {
  hero: {
    eyebrow: 'How We Create',
    headline: 'Materials That Speak For Themselves',
    body: 'It all begins with nature. We source the finest natural fibres from trusted mills around the world: cottons that are strong yet soft, linens that are breathable and timeless, and blends that bring the best of both. Every fibre is chosen with care, keeping quality, sustainability and performance at heart.',
  },

  positioning: {
    eyebrow: 'Our Collections',
    headline: 'Built on one principle: consistency at scale.',
    body: 'Across cotton, linen, and performance-engineered blends, every fabric in our range is built on one principle: consistency at scale. From single-piece cut & sew orders to bulk garment production runs, our collections serve traders, manufacturers, and menswear brands who need dependable quality, batch after batch, in India and beyond.',
  },

  categoriesIntro: {
    eyebrow: 'Our Range',
    headline: 'Five fabric families. One standard.',
  },

  craftedWithPurpose: {
    eyebrow: 'Crafted with Precision',
    headline: 'Crafted with Purpose.',
    body: 'Our fabrics are brought to life through a meticulous process of spinning, weaving and finishing. Modern technology meets traditional craftsmanship to create textures that feel perfect, drape beautifully and last longer. Every detail is refined to ensure our fabrics not only look exceptional, but feel remarkable, every time.',
  },

  manufacturing: {
    eyebrow: 'Manufactured By',
    headline: 'Shubh Shantinath Silk Mills',
    body: 'Every collection is manufactured under Shubh Shantinath Silk Mills, backed by three decades of textile manufacturing expertise. Whether you are sourcing for a tailoring network, a garment manufacturing unit or an export order, our collections are built to move: from loom to cut table, reliably.',
  },

  catalogue: {
    eyebrow: 'Full Range',
    headline: 'Download our catalogue.',
    body: 'A complete overview of every fabric family, composition and finish.',
    ctaLabel: 'Download Catalogue (PDF)',
    /** No PDF exists yet. The button renders visibly disabled rather than a
        dead or broken link — see docs/PLAN.md §2, item 6. */
    available: false,
  },

  seo: {
    description: 'Cotton, linen and performance-engineered blends, built on one principle: consistency at scale. Explore the Savayavas & Co. fabric collections.',
  },
} as const
