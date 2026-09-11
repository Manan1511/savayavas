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

const P = (
  key: string,
  aspect: number,
  alt: string,
  brief: string,
): AssetEntry => ({
  src: `/placeholders/${key}.svg`,
  aspect,
  alt,
  placeholder: true,
  brief,
})

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
  'hero.linen-sheet': R('/photos/lyocell-pastel-fold.jpg', 16 / 9, ''),
  'hero.yarn-cone': R('/photos/filler-yarn-cone-pink.jpg', 3 / 4, 'A single dyed yarn cone amid rows of undyed cones on the mill floor'),
  'hero.denim-drape': R('/photos/fashion-poly-drape-cane.jpg', 3 / 4, 'VAS printed shirting fabric draped over a cane chair'),
  'hero.shirts-rail': R('/photos/cotton-hanger-tonal.jpg', 4 / 3, 'Four fabric lengths tied to a hanger in a tonal gradient'),
  'hero.model-jacket': R('/photos/filler-hands-cutting.jpg', 3 / 4, 'Hands cutting VAS shirting fabric with tailor shears'),
  'hero.folded-stack': R('/photos/polyester-cotton-stack.jpg', 3 / 4, 'Folded VAS shirting fabrics beside raw cotton bolls'),
  'hero.swatch-book': R('/photos/linen-swatch-book.jpg', 4 / 3, 'VAS Luxe Fabrics swatch book fanned open'),
  'hero.dark-ribs': R('/photos/fashion-poly-bw-rolls.jpg', 3 / 4, 'Rolled black and white printed shirting fabric, seen end-on'),

  // --- Our Story ---------------------------------------------------------
  'story.mill': R('/photos/filler-fabric-rolls.jpg', 16 / 9, 'Rolled fabric bolts standing upright'),
  'story.founders': P('story-founders', 4 / 3, 'The Parmar family', 'Portrait of the founding brothers, or an archival photograph.'),

  // --- Collections -------------------------------------------------------
  'collections.yarn-table': R('/photos/cotton-lantern-stack.jpg', 3 / 2, 'Folded fabrics beside a lantern'),
  'collections.loom': R('/photos/filler-fabric-rolls.jpg', 3 / 2, 'Rolled fabric bolts standing upright'),

  // --- Per-category detail page hero -------------------------------------
  'category.cotton': R('/photos/cotton-jacquard-swirl.jpg', 3 / 4, '100% Cotton jacquard fabric, swirled to show sheen and drape'),
  'category.linen': R('/photos/linen-swatch-book.jpg', 3 / 4, 'VAS Luxe Fabrics linen swatch book fanned open'),
  'category.lyocell-cotton': R('/photos/lyocell-colour-drape.jpg', 3 / 4, 'Lyocell cotton fabric in pink, yellow and blue, draped'),
  'category.polyester-cotton': R('/photos/polyester-cotton-stripes.jpg', 3 / 4, 'Polyester cotton shirting fabrics in fine stripes, fanned'),
  'category.fashion-polyesters': R('/photos/fashion-poly-bw-rolls.jpg', 3 / 4, 'Rolled black and white printed fashion polyester fabric'),
  'category.shade-card': R('/photos/filler-shade-card.jpg', 2 / 3, 'A VAS Luxe Fabrics shade card, twelve numbered shades on a hanger'),

  // --- VAS / Quality -----------------------------------------------------
  'vas.fabric-stack': R('/photos/cotton-jacquard-swirl.jpg', 3 / 2, '100% Cotton jacquard fabric, swirled to show sheen and drape'),
  'quality.tensile': P('quality-tensile', 1, 'Tensile strength testing', 'Testing rig in use, close crop.'),
  'quality.colour': P('quality-colour', 1, 'Colour fastness testing', 'Swatches under test lighting.'),
  'quality.shrinkage': P('quality-shrinkage', 1, 'Shrinkage control gauge', 'Analogue gauge dial, shallow depth of field.'),
  'quality.pilling': P('quality-pilling', 1, 'Pilling resistance testing', 'Fabric surface under test apparatus.'),
  'quality.finish': P('quality-finish', 1, 'Finished fabric inspection', 'Hand inspecting finished cloth.'),

  // --- Our Story: Tribe wall ---------------------------------------------
  // Fourteen tiles, aspect matched to a tall poster crop (deck reference).
  'tribe.01': P('tribe-01', 0.64, '', 'Loom mid-weave, close crop on the moving warp.'),
  'tribe.02': P('tribe-02', 0.64, '', 'Folded ivory linen, texture filling the frame.'),
  'tribe.03': P('tribe-03', 0.64, '', 'Man in an open-collar shirt, fabric texture visible, warm light.'),
  'tribe.04': P('tribe-04', 0.64, '', 'Row of navy and grey yarn cones.'),
  'tribe.05': P('tribe-05', 0.64, '', 'Hands measuring and marking fabric on a cutting table.'),
  'tribe.06': P('tribe-06', 0.64, '', 'Checked fabric swatches fanned with a tailor tape.'),
  'tribe.07': P('tribe-07', 0.64, '', 'Folded shirts stacked in graded tones.'),
  'tribe.08': P('tribe-08', 0.64, '', 'Raw cotton bolls, close and textural.'),
  'tribe.09': P('tribe-09', 0.64, '', 'Striped shirting fabric bolt, unrolled.'),
  'tribe.10': P('tribe-10', 0.64, '', 'Savayavas & Co. swatch book beside a business card.'),
  'tribe.11': P('tribe-11', 0.64, '', 'Hands measuring fabric with a tape, mid-motion.'),
  'tribe.12': P('tribe-12', 0.64, '', 'Folded beige fabric, shallow depth of field.'),
  'tribe.13': P('tribe-13', 0.64, '', 'Rolled fabric bolts stacked end-on.'),
  'tribe.14': P('tribe-14', 0.64, '', "Tailor's measuring tape laid across checked fabric."),

  // --- Contact -----------------------------------------------------------
  'contact.fabric-fold': R('/photos/filler-embroidered-drape.jpg', 3 / 2, 'Embroidered VAS fabric draped over a cane chair'),
  'contact.map': P('contact-map', 3 / 2, 'Map showing the Savayavas & Co. office in Mumbai', 'Static map export. Deliberately not a live embed. See docs/PLAN.md.'),
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

/** Every asset still awaiting real photography. Used by `npm run assets:check`. */
export function pendingAssets(): AssetKey[] {
  return (Object.keys(assets) as AssetKey[]).filter((k) => assets[k].placeholder)
}
