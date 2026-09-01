/**
 * Home page copy.
 *
 * The hero deliberately speaks to the trade — traders, garment manufacturers,
 * menswear brands and export buyers — not to the end consumer. The deck's
 * "Crafted for / THE MODERN MAN" lockup is VAS language and lives on /vas.
 * See docs/PLAN.md §1, "Deliberate deviations from the deck".
 */

export const home = {
  hero: {
    eyebrow: 'Various Types of Fabrics',
    /** Script line — drawn by the thread itself, not set in a font. */
    script: 'The same cloth,',
    /** All-caps Didone anchor. The line that has to survive a three-second skim. */
    headline: 'Every Single Batch',
    /** Small-caps triad, matching the deck's rhythm. */
    subline: 'Cotton. Linen. Engineered blends. From single-piece cut & sew to bulk production runs.',
  },

  about: {
    eyebrow: 'About Us',
    headline: ['Woven with purpose.', 'Made to inspire.'],
    body: [
      'Savayavas & Co. is a premium textile house specialising in exceptional shirting fabrics. We blend three decades of manufacturing tradition with innovation, to create fabrics that speak of quality, comfort and quiet luxury.',
      'From the world’s finest cottons, linens and blends to our refined designs and meticulous finishing — every detail reflects a commitment to craftsmanship and timeless style.',
      'We don’t just make fabrics. We weave stories that last.',
    ],
  },

  pillars: {
    items: [
      { title: 'Premium Quality', body: 'Finest yarns. Superior weaves. Uncompromising quality in every meter.' },
      { title: 'Natural Comfort', body: 'Breathable, soft and made for all-day comfort.' },
      { title: 'Crafted with Precision', body: 'Thoughtful designs and meticulous finishing.' },
      { title: 'Built for Scale', body: 'Consistent output, batch after batch, at any volume.' },
    ],
  },

  categoryStrip: {
    eyebrow: 'Our Collections',
    headline: 'Built on one principle: consistency at scale.',
    cta: { label: 'View all collections', to: '/collections' },
  },

  vasCallout: {
    eyebrow: 'Our Shirting Line',
    headline: 'VAS',
    body: 'Our menswear shirting brand, and the first full expression of everything Savayavas stands for.',
    cta: { label: 'Discover VAS', to: '/vas' },
  },

  dualCta: {
    dealers: {
      headline: 'For Dealers',
      body: 'Dealer program, pricing structure and onboarding for traders, manufacturers and menswear brands.',
      cta: { label: 'Explore the trade program', to: '/for-dealers' },
    },
    story: {
      headline: 'Our Story',
      body: 'Three brothers, one mill, three decades of thread — and the second generation carrying it forward.',
      cta: { label: 'Read our story', to: '/our-story' },
    },
  },

  seo: {
    description:
      'Savayavas & Co. — premium shirting fabrics with consistent quality at scale. Cotton, linen and engineered blends for traders, manufacturers and menswear brands. Manufactured under Shubh Shantinath Silk Mills, Surat.',
  },
} as const
