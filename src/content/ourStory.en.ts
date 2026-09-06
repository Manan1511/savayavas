/**
 * Our Story copy.
 *
 * This is the brand's strongest asset: a real family history with a real
 * etymology, supplied directly rather than inferred from the deck. Two rules
 * followed throughout, per docs/PLAN.md:
 *  - no em dashes. Rewritten as separate sentences, colons or commas.
 *  - the Devanagari is a deliberate typographic moment, not a footnote — it is
 *    the single best piece of copy on the site.
 */

export const ourStory = {
  hero: {
    eyebrow: 'Our Story',
    headline: ['Three brothers.', 'One mill.', 'Three decades of thread.'],
  },

  founders: {
    eyebrow: 'How It Began',
    headline: 'A foundation built by hand.',
    body: [
      'Shubh Shantinath Silk Mills began with three brothers: Arvind Parmar, Vinod Parmar and Paresh Parmar. Together they built a manufacturing foundation in Mumbai’s textile trade over three decades.',
      'What started as shared conviction between siblings grew into a body of manufacturing expertise most brands only claim on paper.',
    ],
    names: ['Arvind Parmar', 'Vinod Parmar', 'Paresh Parmar'],
  },

  /**
   * The typographic centrepiece. सावयव and वस् are set in Noto Serif
   * Devanagari regardless of active locale: the etymology is the point of the
   * section, and it must render correctly even on the English build.
   */
  name: {
    eyebrow: 'The Name',
    headline: 'Every word already existed. We just joined two of them.',
    savayav: { script: 'सावयव', roman: 'Savayav', meaning: 'various types' },
    vas: { script: 'वस्', roman: 'Vas', meaning: 'fabric, or vastra' },
    body: [
      'Savayavas & Co. is the next chapter, carried forward by the second generation: Priyank Parmar and Sherin Parmar.',
      'The name itself tells the story. Savayav means various types. Vas means fabric. Together: various types of fabrics.',
      'It is not a borrowed word, and it is not an invented one. It is built from the same language the trade has always spoken.',
    ],
  },

  vasOrigin: {
    eyebrow: 'The First Chapter',
    headline: 'VAS',
    body: 'From that name comes VAS, our menswear shirting fabric brand and the first expression of everything Savayavas stands for. The root Vas carries forward: fabric made with the discipline of a family that has spent three generations learning what a shirt is supposed to feel like.',
    cta: { label: 'Discover VAS', to: '/vas' },
  },

  mill: {
    eyebrow: 'The Mill Floor',
    caption: 'Real machinery. Real cloth, in progress.',
  },

  tribe: {
    eyebrow: 'Our World. Our People.',
    headline: 'Savayavas & Co. Tribe',
    intro: 'A glimpse into the hands, hearts and heritage behind every thread. Crafted with intention. Carried by a community that believes in timeless quality.',
    items: [
      { asset: 'tribe.01', caption: 'Woven with Precision' },
      { asset: 'tribe.02', caption: 'Timeless Textures' },
      { asset: 'tribe.03', caption: 'Crafted for the Modern Man' },
      { asset: 'tribe.04', caption: 'The Finest Yarns' },
      { asset: 'tribe.05', caption: 'Made with Intention' },
      { asset: 'tribe.06', caption: 'Curated for Every Detail' },
      { asset: 'tribe.07', caption: 'Elevating Everyday' },
      { asset: 'tribe.08', caption: 'Rooted in Natural Fibres' },
      { asset: 'tribe.09', caption: 'Designed to Last' },
      { asset: 'tribe.10', caption: 'Thoughtful by Design' },
      { asset: 'tribe.11', caption: 'Heritage Meets Innovation' },
      { asset: 'tribe.12', caption: 'Feel the Difference' },
      { asset: 'tribe.13', caption: 'Made Responsibly for Tomorrow' },
      { asset: 'tribe.14', caption: 'Perfect in Every Stitch' },
    ],
  },

  seo: {
    description: 'Three brothers, one mill, three decades of thread. The story of Shubh Shantinath Silk Mills and the family behind Savayavas & Co.',
  },
} as const
