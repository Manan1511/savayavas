/**
 * Per-category detail page copy.
 *
 * The specification schema (composition, GSM, width, weave, finish) is
 * intentionally populated with "To be confirmed" rather than invented
 * numbers. A B2B buyer may act on a GSM figure; publishing a plausible-looking
 * but fabricated one is worse than admitting it isn't set yet. Real values
 * are docs/PLAN.md §2, item 5, "Blocked on you".
 */

export const SPEC_PENDING = 'To be confirmed'

export const specSchema = [
  { label: 'Composition' },
  { label: 'GSM (Weight)' },
  { label: 'Width' },
  { label: 'Weave' },
  { label: 'Finish' },
] as const

/**
 * Colourway swatches are flat colour blocks, not photographs: no fabric
 * photography exists per colourway yet, and a labelled placeholder is more
 * honest than a stand-in image that implies a specific dye lot.
 */
export const placeholderSwatches = [
  { name: 'Ivory', hex: '#F2EDE5' },
  { name: 'Stone', hex: '#B8B2A6' },
  { name: 'Navy', hex: '#2B3441' },
  { name: 'Brass', hex: '#A8845C' },
  { name: 'Charcoal', hex: '#141414' },
  { name: 'Greige', hex: '#E4E0D6' },
] as const

/** One sentence per category: who sources it and why, derived from each
    category's own description in content/site.en.ts rather than a new claim. */
export const whoThisIsFor: Record<string, string> = {
  cotton: 'For manufacturers producing high-volume formal and casual shirting who need dependable quality, batch after batch.',
  'lyocell-cotton': 'For brands that want a premium hand-feel at an accessible price point, without compromising durability.',
  linen: 'For manufacturers producing warm-weather and resort-formal menswear who need authentic linen texture and drape.',
  'polyester-cotton': 'For manufacturers producing at scale, where wrinkle resistance, easy care and cost-efficiency matter as much as feel.',
  'fashion-polyesters': 'For brands and manufacturers chasing seasonal trend cycles who need pattern, colour and finish versatility.',
}
