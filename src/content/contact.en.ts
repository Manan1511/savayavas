/**
 * Contact page copy.
 *
 * Contact details themselves (phone, email, address) live in `site.contact`
 * and are pulled from there directly rather than duplicated here, since
 * they're already flagged as placeholder in one place.
 */

export const contactPage = {
  hero: {
    eyebrow: 'Contact',
    headline: 'We would love to hear from you.',
    body: 'Whether you are placing your first order or your fiftieth, our team is here to help.',
  },

  getInTouch: {
    eyebrow: 'Get in Touch',
  },

  visitUs: {
    eyebrow: 'Visit Us',
    directionsLabel: 'Get Directions',
  },

  form: {
    eyebrow: 'Send an Enquiry',
    headline: 'Trade & Export Enquiries',
    body: 'Share your requirement and our team will confirm specification, pricing and terms directly.',
    typeOptions: [
      { value: 'trade-inquiry', label: 'Trade Inquiry' },
      { value: 'export-inquiry', label: 'Export Inquiry' },
    ],
  },

  seo: {
    description: 'Get in touch with Savayavas & Co. for trade and export enquiries. Visit our showroom in Surat, Gujarat, or reach us by phone or email.',
  },
} as const
