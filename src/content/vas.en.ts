/**
 * VAS copy.
 *
 * VAS is the menswear shirting line, the one place on the site allowed to
 * speak to the end consumer rather than the trade buyer — see
 * docs/PLAN.md §1, "Deliberate deviations from the deck". The etymology is
 * covered in full on /our-story; this page only needs to reaffirm the root,
 * not re-explain it, for anyone who lands here directly from search or a
 * shared link.
 */

export const vas = {
  hero: {
    eyebrow: 'Our Menswear Shirting Line',
    script: 'Crafted for',
    headline: 'The Modern Man',
    subline: 'Timeless fabrics. Thoughtful design. Lasting impression.',
  },

  intro: {
    body: 'VAS is our menswear shirting line, and the first full expression of everything Savayavas stands for. The root Vas means fabric: cloth made with the discipline of a family that has spent three generations learning what a shirt is supposed to feel like.',
    cta: { label: 'Read the full story', to: '/our-story' },
  },

  qualityIntro: {
    eyebrow: 'Our Quality',
    headline: 'Quality you can feel. Standards you can trust.',
    body: 'At Savayavas & Co., quality is not just a promise. It is a process we live by. Every metre of fabric we create goes through rigorous checks to ensure it meets the highest standards of performance, durability and comfort.',
  },

  pillars: [
    { title: 'Premium Raw Materials', body: 'We source only the finest natural fibres from trusted mills worldwide.' },
    { title: 'Rigorous Testing', body: 'Every fabric is tested for strength, shrinkage, colour fastness and more.' },
    { title: 'Consistent Performance', body: 'Our fabrics are built to deliver lasting performance, wear after wear.' },
    { title: 'Sustainable Approach', body: 'Responsible production practices for a better tomorrow.' },
    { title: 'Tailored Excellence', body: 'Designed to elevate every creation with the perfect drape and finish.' },
  ],

  detail: {
    eyebrow: 'Quality in Every Detail',
    headline: 'From fibre to finish, every stage is monitored with precision.',
    intro: 'Because for us, true luxury lies in the details you don’t have to think about, but can always feel.',
    tiles: [
      { asset: 'quality.tensile', title: 'Tensile Strength', body: 'Tested for durability that stands the test of time.' },
      { asset: 'quality.colour', title: 'Colour Fastness', body: 'Colours that stay true, even after multiple washes.' },
      { asset: 'quality.shrinkage', title: 'Shrinkage Control', body: 'Engineered to maintain shape and size.' },
      { asset: 'quality.pilling', title: 'Pilling Resistance', body: 'Smooth finish that stays refined, wear after wear.' },
      { asset: 'quality.finish', title: 'Perfect Finish', body: 'Impeccable touch, fall and overall finish.' },
    ],
  },

  /**
   * ⚠️ PLACEHOLDER DATA, transcribed from the concept boards, which invented
   * them. Same caution as `site.reviews`: these numbers are not verified and
   * must be confirmed or removed before launch. See docs/PLAN.md §2 and §8.
   */
  stats: {
    placeholder: true,
    headline: ['Our Standards.', 'Our Commitment.'],
    items: [
      { value: '20+', label: 'Quality Checks', caption: 'At every stage of production' },
      { value: '0', label: 'Compromise', caption: 'We never compromise on quality' },
      { value: '100%', label: 'Traceability', caption: 'From fibre source to finished fabric' },
      { value: 'Global', label: 'Standards', caption: 'Compliance with international quality benchmarks' },
      { value: '1000+', label: 'Clients Worldwide', caption: 'Across fashion, tailoring and retail' },
    ],
  },

  closingCta: {
    eyebrow: 'Sourcing at Scale',
    headline: 'Bring VAS to your collection.',
    body: 'Dealer program, pricing structure and onboarding for traders, manufacturers and menswear brands.',
    cta: { label: 'Explore the trade program', to: '/for-dealers' },
  },

  seo: {
    description: 'VAS: Savayavas & Co.’s menswear shirting line. Timeless fabrics, thoughtful design, rigorously tested quality, crafted for the modern man.',
  },
} as const

export type Vas = typeof vas
