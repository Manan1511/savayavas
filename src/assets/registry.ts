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
  'hero.linen-sheet': R('/photos/vas-fabric-folds-pastel.jpg', 16 / 9, ''),
  'hero.yarn-cone': P('hero-yarn-cone', 3 / 4, '', 'Single navy yarn cone, three-quarter angle, thread trailing off the cone.'),
  'hero.denim-drape': R('/photos/vas-fabric-drape-cane.jpg', 3 / 4, 'VAS printed shirting fabric draped over a cane chair'),
  'hero.shirts-rail': P('hero-shirts-rail', 4 / 3, 'Shirts in graded tones on a rail', 'Row of shirts on wooden hangers, tonal grey-to-navy gradient.'),
  'hero.model-jacket': R('/photos/vas-hand-swatches.jpg', 3 / 4, 'A hand selecting VAS jacquard fabric swatches'),
  'hero.folded-stack': R('/photos/vas-fabric-cotton-stack.jpg', 3 / 4, 'Folded VAS shirting fabrics beside raw cotton bolls'),
  'hero.swatch-book': R('/photos/vas-swatch-book.jpg', 4 / 3, 'VAS Luxe Fabrics swatch book fanned open'),
  'hero.dark-ribs': R('/photos/vas-striped-fabrics.jpg', 3 / 4, 'Striped and pinstriped VAS shirting fabrics fanned out'),

  // --- Our Story ---------------------------------------------------------
  'story.mill': P('story-mill', 16 / 9, 'Shuttle loom weaving striped shirting', 'The mill floor. Real machinery, real cloth in progress.'),
  'story.founders': P('story-founders', 4 / 3, 'The Parmar family', 'Portrait of the founding brothers, or an archival photograph.'),

  // --- Collections -------------------------------------------------------
  'collections.yarn-table': P('collections-yarn-table', 3 / 2, 'Cotton bolls and yarn cones on a workbench', 'Raw material still life: cotton, linen, yarn cones, natural light.'),
  'collections.loom': P('collections-loom', 3 / 2, 'Industrial loom weaving pinstripe fabric', 'Loom mid-weave, wide crop.'),

  // --- VAS / Quality -----------------------------------------------------
  'vas.fabric-stack': R('/photos/vas-fabric-cotton-stack.jpg', 3 / 2, 'Folded VAS shirting fabrics beside raw cotton bolls'),
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
  'contact.fabric-fold': P('contact-fabric-fold', 3 / 2, 'Folded textured fabrics in neutral tones', 'Soft neutral fabric folds, calm and quiet.'),
  'contact.map': P('contact-map', 3 / 2, 'Map showing the Savayavas & Co. showroom in Surat', 'Static map export. Deliberately not a live embed. See docs/PLAN.md.'),
} as const satisfies Record<string, AssetEntry>

export type AssetKey = keyof typeof assets

export function asset(key: AssetKey): AssetEntry {
  return assets[key]
}

/** Every asset still awaiting real photography. Used by `npm run assets:check`. */
export function pendingAssets(): AssetKey[] {
  return (Object.keys(assets) as AssetKey[]).filter((k) => assets[k].placeholder)
}
