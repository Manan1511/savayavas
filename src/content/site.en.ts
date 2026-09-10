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
    social: [{ label: 'Instagram', href: 'https://instagram.com/savayavas_co' }],
  },

  /**
   * Email and both addresses are real, supplied directly from the company's
   * own letterhead. No phone number is published: none was ever confirmed,
   * and email is the only fallback contact LeadForm shows when a submission
   * cannot be sent (which is every submission, until a backend exists).
   * Instagram is still the unverified Phase 1 placeholder.
   */
  contact: {
    email: 'info@savayavas.co.in',
    instagram: '@savayavas_co',
    hours: 'Mon – Sat : 11AM – 7PM',
    address: {
      office: {
        label: 'Office',
        lines: [
          'Savayavas & Co.',
          '146, Krishna Bhawan, Room No. 27,',
          'Dr. Viegas Street, Kalbadevi Road,',
          'Mumbai – 400002,',
          'Maharashtra, India.',
        ],
      },
      factory: {
        label: 'Factory',
        lines: [
          'House No. 268, Gala No. 1 and 2,',
          'Nr Kachru Patil Building, Nr Dhanlaxmi Hotel,',
          'New Kaneri, Bhiwandi – 421302,',
          'Maharashtra, India.',
        ],
      },
    },
  },

  /**
   * ⚠️ PLACEHOLDER DATA — transcribed from the concept boards, which invented
   * them. The rating, the review count and these three testimonials are not
   * real and must be replaced or removed before launch. Publishing invented
   * social proof is a genuine problem, not a design detail. See PLAN.md §8.
   */
  reviews: {
    placeholder: true,
    eyebrow: 'Kind Words',
    headline: 'Trusted by those who value quality.',
    intro: 'Our tribe inspires us to do better every day. Here’s what they have to say about their experience with Savayavas & Co.',
    rating: '4.9',
    ratingOutOf: '5',
    count: '120+',
    items: [
      {
        quote: 'The quality of the fabrics is simply outstanding. Every collection reflects their attention to detail and timeless taste.',
        name: 'Vivek Mehta',
        role: 'Fashion Designer, Mumbai',
      },
      {
        quote: 'We’ve been working with Savayavas & Co. for over a year now and the consistency in quality and service is unmatched.',
        name: 'Arjun Singhal',
        role: 'Shirting Manufacturer, Ludhiana',
      },
      {
        quote: 'Their fabrics elevate our creations. Premium feel, beautiful drape and our clients absolutely love them.',
        name: 'Neha Aggarwal',
        role: 'Boutique Owner, New Delhi',
      },
    ],
  },

  /** Fabric taxonomy. Drives /collections and the five detail routes. */
  categories: [
    {
      slug: 'cotton',
      name: '100% Cotton',
      description:
        'The foundation of our range. Pure cotton fabrics engineered for breathability, colorfastness, and consistent hand-feel across every batch. Suited to everyday formal and casual shirting alike, and a proven choice for high-volume manufacturing.',
    },
    {
      slug: 'lyocell-cotton',
      name: 'Lyocell Cotton',
      description:
        'A refined cotton blend that brings a softer drape and a subtle sheen without compromising durability. Increasingly sought after by brands looking to offer a premium hand-feel at accessible price points. A fabric that performs on the cutting table and on the shelf.',
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
        'Designed for pattern, color, and finish versatility, and built for brands and manufacturers chasing trend cycles without compromising on fabric reliability. Ideal for seasonal and fast-turnaround collections.',
    },
  ],
} as const

export type Site = typeof site
export type Category = (typeof site.categories)[number]
