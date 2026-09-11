/**
 * Cross-cutting UI microcopy: page titles used in <Seo title>, button labels,
 * aria-labels, empty/error states and other small strings that live directly
 * in component JSX rather than in a per-route content file. Anything reused
 * across more than one route, or that is genuinely part of the interface
 * chrome rather than page copy, belongs here instead of being duplicated.
 */

export const ui = {
  pageTitles: {
    home: 'Home',
    ourStory: 'Our Story',
    vas: 'VAS',
    collections: 'Collections',
    forDealers: 'For Dealers',
    contact: 'Contact',
    pageNotFound: 'Page Not Found',
  },

  common: {
    notFoundEyebrow: 'Not Found',
    explore: 'Explore',
    view: 'View',
    getStarted: 'Get Started',
    sendEnquiry: 'Send Enquiry',
    backToHome: 'Back to Home',
  },

  notFound: {
    seoDescription: 'That page does not exist.',
    heading: 'Page Not Found',
    body: 'That page does not exist, or has moved. Try one of these instead:',
  },

  collectionsPage: {
    viewCollection: 'View collection',
    comingSoonCatalogue: 'Coming soon. In the meantime, get in touch and we will send it directly.',
  },

  category: {
    unknownCollection: 'Unknown Collection',
    backToCollections: 'Back to Collections',
    allCollections: 'All Collections',
    collection: 'Collection',
    colourways: 'Colourways',
    colourwaysNote: 'A representative VAS shade card. Individual fabric colourways vary by dye lot; confirm your exact shade with our team before ordering.',
    whoThisIsFor: 'Who This Is For',
    otherCollections: 'Other Collections',
    sourcingQuestion: 'Sourcing {category}?',
    requestQuote: 'Request a Quote',
    requestQuoteBody: 'Tell us your volume and specification, and our team will get back to you.',
    enquireAbout: 'Enquire About {category}',
  },

  contactPage: {
    emailLabel: 'Email',
    instagramLabel: 'Instagram',
    hoursLabel: 'Hours',
    getDirectionsAria: 'Get directions',
  },

  leadForm: {
    enquiringAboutLabel: 'I am enquiring about',
    regarding: 'Regarding:',
    nameLabel: 'Name',
    companyLabel: 'Company',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    messageLabel: 'Message',
    nameError: 'Please tell us your name.',
    emailError: 'Enter a valid email address.',
    exportAckLabel: 'I understand that export orders require full payment in advance, prior to production.',
    exportAckError: 'Please confirm you understand the export payment terms.',
    sending: 'Sending...',
    deliveredMessage: 'Thank you. Your enquiry has been sent, and our team will be in touch shortly.',
    notConfiguredMessage: 'Our online form is not connected yet, so this message could not be sent automatically. Please reach us directly instead:',
  },

  reviews: {
    basedOnReviews: 'Based on {count} reviews',
    previousReview: 'Previous review',
    nextReview: 'Next review',
  },
} as const

export type Ui = typeof ui
