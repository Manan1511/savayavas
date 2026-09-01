/**
 * Every user-visible string on the site lives in a content module like this
 * one. Nothing is hardcoded in JSX.
 *
 * Two reasons, both structural:
 *  - Hindi becomes a sibling file rather than a refactor of every component.
 *  - When a CMS arrives, it maps onto this shape instead of replacing markup.
 */

export const site = {
  brand: {
    name: 'Savayavas & Co.',
    tagline: 'Crafted with purpose. Woven with trust.',
    parentCompany: 'Shubh Shantinath Silk Mills',
  },

  nav: {
    items: [
      { label: 'Collections', to: '/collections' },
      { label: 'VAS', to: '/vas' },
      { label: 'Our Story', to: '/our-story' },
      { label: 'For Dealers', to: '/for-dealers' },
      { label: 'Journal', to: '/journal' },
      { label: 'Contact', to: '/contact' },
    ],
    cta: { label: 'Enquire Now', to: '/contact' },
    skipToContent: 'Skip to content',
  },

  footer: {
    tagline: 'Crafted with purpose. Woven with trust.',
    rights: 'All rights reserved.',
    social: [
      { label: 'Instagram', href: 'https://instagram.com/savayavas_co' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Pinterest', href: '#' },
    ],
  },

  contact: {
    phone: '+91 98765 43210',
    email: 'info@savayavas.co',
    instagram: '@savayavas_co',
    hours: 'Mon – Sat : 10AM – 7PM',
    address: {
      lines: ['Savayavas & Co.', '123, Textile Market,', 'Ring Road, Surat – 395002,', 'Gujarat, India.'],
    },
  },

  /** Fabric taxonomy. Drives /collections and the five detail routes. */
  categories: [
    {
      slug: 'cotton',
      name: '100% Cotton',
      description:
        'The foundation of our range. Pure cotton fabrics engineered for breathability, colorfastness, and consistent hand-feel across every batch — suited to everyday formal and casual shirting alike, and a proven choice for high-volume manufacturing.',
    },
    {
      slug: 'lyocell-cotton',
      name: 'Lyocell Cotton',
      description:
        'A refined cotton blend that brings a softer drape and a subtle sheen without compromising durability. Increasingly sought after by brands looking to offer a premium hand-feel at accessible price points — a fabric that performs on the cutting table and on the shelf.',
    },
    {
      slug: 'linen',
      name: '100% Linen',
      description:
        'Natural, breathable, and season-appropriate. Our linen collection is developed for manufacturers producing warm-weather and resort-formal menswear, with the texture and drape that linen buyers specifically look for.',
    },
    {
      slug: 'polyester-cotton',
      name: 'Polyester Cotton',
      description:
        'Engineered for durability and easy-care performance without sacrificing comfort. A dependable choice for manufacturers producing at scale, where consistency, wrinkle resistance, and cost-efficiency matter as much as feel.',
    },
    {
      slug: 'fashion-polyesters',
      name: 'Fashion Polyesters',
      description:
        'Designed for pattern, color, and finish versatility — built for brands and manufacturers chasing trend cycles without compromising on fabric reliability. Ideal for seasonal and fast-turnaround collections.',
    },
  ],
} as const

export type Site = typeof site
export type Category = (typeof site.categories)[number]
