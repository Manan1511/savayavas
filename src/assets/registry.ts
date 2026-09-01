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

export const assets = {
  // --- Home hero collage (each piece is its own layer so the thread can
  // pass between them) ---------------------------------------------------
  'hero.linen-sheet': P('hero-linen-sheet', 16 / 9, '', 'Torn ivory linen sheet, flat lay, soft daylight. Used as the hero backdrop.'),
  'hero.yarn-cone': P('hero-yarn-cone', 3 / 4, '', 'Single navy yarn cone, three-quarter angle, thread trailing off the cone.'),
  'hero.denim-drape': P('hero-denim-drape', 3 / 4, 'Navy pinstripe shirting fabric draped in folds', 'Navy pinstripe shirting, draped to show weave and fall.'),
  'hero.shirts-rail': P('hero-shirts-rail', 4 / 3, 'Shirts in graded tones on a rail', 'Row of shirts on wooden hangers, tonal grey-to-navy gradient.'),
  'hero.model-jacket': P('hero-model-jacket', 3 / 4, 'Man in a tailored jacket in daylight', 'Menswear model, cropped at the chin, warm window light.'),
  'hero.folded-stack': P('hero-folded-stack', 3 / 4, 'Stack of folded shirting fabrics', 'Folded fabric stack, ivory through navy.'),
  'hero.swatch-book': P('hero-swatch-book', 4 / 3, 'Savayavas & Co. swatch book fanned open', 'Branded swatch book, fanned, on a dark surface.'),
  'hero.dark-ribs': P('hero-dark-ribs', 3 / 4, '', 'Rolled dark fabric bolts seen end-on, vertical ribbing.'),

  // --- Our Story ---------------------------------------------------------
  'story.mill': P('story-mill', 16 / 9, 'Shuttle loom weaving striped shirting', 'The mill floor. Real machinery, real cloth in progress.'),
  'story.founders': P('story-founders', 4 / 3, 'The Parmar family', 'Portrait of the founding brothers, or an archival photograph.'),

  // --- Collections -------------------------------------------------------
  'collections.yarn-table': P('collections-yarn-table', 3 / 2, 'Cotton bolls and yarn cones on a workbench', 'Raw material still life: cotton, linen, yarn cones, natural light.'),
  'collections.loom': P('collections-loom', 3 / 2, 'Industrial loom weaving pinstripe fabric', 'Loom mid-weave, wide crop.'),

  // --- VAS / Quality -----------------------------------------------------
  'vas.fabric-stack': P('vas-fabric-stack', 3 / 2, 'Folded checked and striped shirting fabrics', 'Hero image for the VAS shirting line.'),
  'quality.tensile': P('quality-tensile', 1, 'Tensile strength testing', 'Testing rig in use, close crop.'),
  'quality.colour': P('quality-colour', 1, 'Colour fastness testing', 'Swatches under test lighting.'),
  'quality.shrinkage': P('quality-shrinkage', 1, 'Shrinkage control gauge', 'Analogue gauge dial, shallow depth of field.'),
  'quality.pilling': P('quality-pilling', 1, 'Pilling resistance testing', 'Fabric surface under test apparatus.'),
  'quality.finish': P('quality-finish', 1, 'Finished fabric inspection', 'Hand inspecting finished cloth.'),

  // --- Contact -----------------------------------------------------------
  'contact.fabric-fold': P('contact-fabric-fold', 3 / 2, 'Folded textured fabrics in neutral tones', 'Soft neutral fabric folds, calm and quiet.'),
  'contact.map': P('contact-map', 3 / 2, 'Map showing the Savayavas & Co. showroom in Surat', 'Static map export. Deliberately not a live embed — see docs/PLAN.md.'),
} as const satisfies Record<string, AssetEntry>

export type AssetKey = keyof typeof assets

export function asset(key: AssetKey): AssetEntry {
  return assets[key]
}

/** Every asset still awaiting real photography. Used by `npm run assets:check`. */
export function pendingAssets(): AssetKey[] {
  return (Object.keys(assets) as AssetKey[]).filter((k) => assets[k].placeholder)
}
