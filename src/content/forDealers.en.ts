/**
 * For Dealers copy.
 *
 * This is the highest-intent page on the site (docs/PLAN.md §6), so two
 * rules matter more here than elsewhere:
 *  - no invented numbers. MOQs, lead times and exact terms are answered
 *    honestly as "depends, tell us and we'll confirm" rather than a plausible
 *    figure nobody has actually set.
 *  - the export payment policy IS real, supplied directly (not deck
 *    invention), so it is stated as plain fact, not hedged like the rest.
 */

export const forDealers = {
  hero: {
    eyebrow: 'Trade',
    headline: 'Partner with Savayavas & Co.',
    body: 'Dedicated support, dependable quality and pricing built for volume. For traders, garment manufacturers, menswear brands and export houses.',
  },

  whoItsFor: {
    eyebrow: 'Who This Is For',
    items: [
      { title: 'Traders', body: 'Stock a dependable range across cotton, linen and engineered blends.' },
      { title: 'Manufacturers', body: 'Consistent quality at the volumes a production line depends on.' },
      { title: 'Menswear Brands', body: 'Fabric that performs the same way in every batch, season after season.' },
      { title: 'Exporters', body: 'A mill relationship built for scale, with clear terms from day one.' },
    ],
  },

  whatYouGet: {
    eyebrow: 'What Dealers Get',
    items: [
      { title: 'Dedicated Account Support', body: 'A direct point of contact for every order, not a ticket queue.' },
      { title: 'Volume-Based Pricing', body: 'Pricing structured around your order volume, shared on request.' },
      { title: 'Priority Production Slots', body: 'Standing dealer relationships are scheduled first.' },
      { title: 'Swatch & Sample Support', body: 'Physical swatches and samples to confirm before you commit.' },
    ],
  },

  onboarding: {
    eyebrow: 'How It Works',
    steps: [
      { title: 'Enquire', body: 'Tell us your volume, fabric interest and timeline.' },
      { title: 'Sample & Confirm', body: 'We send swatches and confirm specification and pricing.' },
      { title: 'Onboard & Order', body: 'Once approved, you order directly through your account contact.' },
    ],
  },

  form: {
    eyebrow: 'Get Started',
    headline: 'Tell us what you need.',
    body: 'Whether you are exploring the dealer program or need pricing for a specific order, share a few details and our team will confirm the rest directly.',
    typeOptions: [
      { value: 'dealer-onboarding', label: 'Becoming a Dealer' },
      { value: 'trade-inquiry', label: 'Pricing for an Order' },
    ],
  },

  faq: {
    eyebrow: 'Questions',
    items: [
      {
        q: 'What is your minimum order quantity?',
        a: 'MOQ varies by fabric and finish. Share your requirement through the form above and we will confirm what is possible.',
      },
      {
        q: 'How long are your lead times?',
        a: 'Lead times depend on order volume and our current production schedule. We will give you a confirmed timeline once we understand your order.',
      },
      {
        q: 'Can I get samples before ordering?',
        a: 'Yes. Request swatches through the form and our team will arrange samples directly.',
      },
      {
        q: 'What are your payment terms for export orders?',
        a: 'Export orders require full payment in advance, prior to production. See Export Terms above.',
      },
      {
        q: 'Do you offer custom weaves or private label?',
        a: 'Get in touch to discuss custom development. Details depend on volume and specification.',
      },
    ],
  },

  seo: {
    description: 'Dealer program, pricing and onboarding for traders, manufacturers, menswear brands and exporters. Partner with Savayavas & Co.',
  },
} as const

export type ForDealers = typeof forDealers
