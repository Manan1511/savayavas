/**
 * Asset registry.
 *
 * Components reference an asset by KEY, never by path. Real photography drops
 * in by replacing the file and clearing `placeholder` — no component changes,
 * and because every entry declares its final intended aspect ratio up front,
 * layouts do not reflow when the real image arrives.
 *
 * See docs/PLAN.md §2 "Placeholder policy".
 */

export interface AssetEntry {
  /** Path under /public, or an imported URL once assets are real. */
  src: string
  /** Final intended aspect ratio, width / height. Layout depends on this. */
  aspect: number
  /** Required. An empty string is only valid for decorative assets. */
  alt: string
  /** True while this is a generated stand-in. Blocks strict production builds. */
  placeholder: boolean
  /** What the real photograph needs to show, for whoever shoots it. */
  brief?: string
}

/** Real photography, supplied directly rather than generated. */
const R = (path: string, aspect: number, alt: string): AssetEntry => ({
  src: path,
  aspect,
  alt,
  placeholder: false,
})

export const assets = {
  // --- Home hero collage (each piece is its own layer so the thread can
  // pass between them) ---------------------------------------------------
  //
  // All seven pieces are deliberately drawn from one visual family: fabric
  // shot against a clean white or off-white ground, soft-to-mid saturation,
  // with brass/skin warmth as the only accent. Mixing in the mill-floor
  // yarn cones (desaturated, industrial), the cane-chair drape (warm wood)
  // and the black-and-white printed rolls (stark graphic) put four
  // different colour temperatures and three different photographic styles
  // in one frame, and the collage read as a grab bag rather than a set.
  'hero.linen-sheet': R('/photos/hero/lyocell-pastel-fold-crop.jpg', 16 / 9, ''),
  'hero.yarn-cone': R('/photos/hero/filler-shears-brown.jpg', 3 / 4, 'Brass tailor shears resting on folded VAS shirting fabric'),
  'hero.denim-drape': R('/photos/hero/filler-fabric-swatches-hand.jpg', 3 / 4, 'A hand arranging printed fashion polyester swatches in dusty pink, blue and grey'),
  'hero.shirts-rail': R('/photos/hero/filler-scarves-hanger-crop.jpg', 4 / 3, 'Four fabric lengths tied to a hanger in a tonal gradient'),
  'hero.model-jacket': R('/photos/hero/filler-hands-cutting.jpg', 3 / 4, 'Hands cutting VAS shirting fabric with tailor shears'),
  'hero.folded-stack': R('/photos/hero/polyester-cotton-stack.jpg', 3 / 4, 'Folded VAS shirting fabrics beside raw cotton bolls'),
  'hero.swatch-book': R('/photos/hero/filler-vas-swatch-card.jpg', 4 / 3, 'VAS Luxe Fabrics swatch card, fifteen numbered shades fanned open'),
  'hero.dark-ribs': R('/photos/hero/filler-swatch-fan-pastel.jpg', 3 / 4, 'Fabric swatches fanned out in soft pastel and neutral tones'),

  // --- Our Story ---------------------------------------------------------
  'story.mill': R('/photos/story/filler-fabric-rolls.jpg', 16 / 9, 'Rolled fabric bolts standing upright'),

  // --- Collections -------------------------------------------------------
  'collections.yarn-table': R('/photos/collections/cotton-lantern-stack.jpg', 3 / 2, 'Folded fabrics beside a lantern'),
  'collections.loom': R('/photos/collections/filler-floral-print-fold.jpg', 3 / 2, 'Floral-print fabric folded in soft grey and dusty rose'),

  // --- Per-category detail page hero -------------------------------------
  'category.cotton': R('/photos/categories/cotton/cotton-jacquard-swirl.jpg', 3 / 4, '100% Cotton jacquard fabric, swirled to show sheen and drape'),
  'category.linen': R('/photos/categories/linen/linen-striped-fan-hero.jpg', 3 / 4, 'VAS Luxe Fabrics linen shirting in blue, tan, green and maroon pinstripes'),
  'category.lyocell-cotton': R('/photos/categories/lyocell-cotton/lyocell-colour-drape.jpg', 3 / 4, 'Lyocell cotton fabric in pink, yellow and blue, draped'),
  'category.polyester-cotton': R('/photos/categories/polyester-cotton/polyester-cotton-stripes.jpg', 3 / 4, 'Polyester cotton shirting fabrics in fine stripes, fanned'),
  'category.fashion-polyesters': R('/photos/categories/fashion-polyesters/fashion-poly-swatches-hero.jpg', 3 / 4, 'A hand arranging printed fashion polyester swatches'),
  'category.shade-card': R('/photos/categories/filler-shade-card.jpg', 2 / 3, 'A VAS Luxe Fabrics shade card, twelve numbered shades on a hanger'),

  // --- Category grid/card thumbnails --------------------------------------
  // Defaults to the detail-hero photo above (see CATEGORY_THUMBNAIL); cotton,
  // linen and polyester-cotton have a distinct crop tuned for the square
  // card format.
  'category.cotton-thumbnail': R('/photos/categories/cotton/filler-cotton-tape-measure.jpg', 1, "100% Cotton fabric with a tailor's tape measure"),
  'category.linen-thumbnail': R('/photos/categories/linen/linen-swatches-thumbnail.jpg', 1, 'A wave of linen shirting fabrics in cream, blue, maroon, olive and navy'),
  'category.polyester-cotton-thumbnail': R('/photos/categories/polyester-cotton/polyester-cotton-thumbnail.jpg', 1, 'Folded polyester cotton fabrics beside raw cotton bolls'),

  // --- VAS / Quality -----------------------------------------------------
  'vas.modern-man': R('/photos/vas/modern-man-cutting.jpg', 3 / 4, 'Hands cutting VAS shirting fabric with tailor shears'),

  // --- Contact -----------------------------------------------------------
  'contact.fabric-fold': R('/photos/contact/filler-embroidered-drape.jpg', 3 / 2, 'Embroidered VAS fabric draped over a cane chair'),
} as const satisfies Record<string, AssetEntry>

export type AssetKey = keyof typeof assets

export function asset(key: AssetKey): AssetEntry {
  return assets[key]
}

/**
 * One hero photo per fabric category, keyed by the same slug as
 * `site.categories`. Shared by the category detail page, the Collections
 * grid and the Home category strip so all three stay in sync.
 */
export const CATEGORY_IMAGE: Record<string, AssetKey> = {
  cotton: 'category.cotton',
  linen: 'category.linen',
  'lyocell-cotton': 'category.lyocell-cotton',
  'polyester-cotton': 'category.polyester-cotton',
  'fashion-polyesters': 'category.fashion-polyesters',
}

/**
 * Grid/card thumbnail per category, used by the Collections grid and the
 * Home category strip. Defaults to the same photo as the detail-page hero;
 * cotton, linen and polyester-cotton override to a crop suited to the
 * square card format.
 */
export const CATEGORY_THUMBNAIL: Record<string, AssetKey> = {
  ...CATEGORY_IMAGE,
  cotton: 'category.cotton-thumbnail',
  linen: 'category.linen-thumbnail',
  'polyester-cotton': 'category.polyester-cotton-thumbnail',
}

/** Every asset still awaiting real photography. Used by `npm run assets:check`. */
export function pendingAssets(): AssetKey[] {
  return (Object.keys(assets) as AssetKey[]).filter((k) => assets[k].placeholder)
}
