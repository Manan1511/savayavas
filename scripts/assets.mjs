/**
 * Asset tooling.
 *
 *   node scripts/assets.mjs generate  — write a placeholder SVG for every
 *                                       registry entry still marked pending
 *   node scripts/assets.mjs check     — list pending assets; fails the build
 *                                       when VITE_STRICT_ASSETS=1
 *
 * Placeholders are generated at each asset's declared aspect ratio, in the
 * brand palette, with the key printed on them — so an un-swapped image is
 * obvious in review instead of quietly passing as a design choice.
 */

import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'placeholders')

const SWATCHES = ['#E4E0D6', '#F2EDE5', '#2B3441', '#A8845C', '#B8B2A6']

/** Read the registry without a TS toolchain: parse the P(...) calls. */
async function readRegistry() {
  const src = await readFile(join(root, 'src', 'assets', 'registry.ts'), 'utf8')
  const re = /P\(\s*'([^']+)'\s*,\s*([^,]+?)\s*,/g
  const out = []
  for (const m of src.matchAll(re)) {
    const [, key, aspectExpr] = m
    // aspect is always a literal or a simple `a / b`
    const aspect = Number(
      aspectExpr.includes('/')
        ? aspectExpr.split('/').reduce((a, b) => Number(a) / Number(b))
        : aspectExpr,
    )
    if (!Number.isFinite(aspect) || aspect <= 0) {
      throw new Error(`Could not parse aspect for asset "${key}": ${aspectExpr}`)
    }
    out.push({ key, aspect })
  }
  if (out.length === 0) throw new Error('No placeholder entries found in registry.ts')
  return out
}

function svg(key, aspect) {
  const w = 1200
  const h = Math.round(w / aspect)
  const band = SWATCHES[[...key].reduce((a, c) => a + c.charCodeAt(0), 0) % SWATCHES.length]
  const dark = band === '#2B3441'
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Placeholder: ${key}">
  <rect width="${w}" height="${h}" fill="${band}"/>
  <rect x="12" y="12" width="${w - 24}" height="${h - 24}" fill="none"
        stroke="${dark ? '#A8845C' : '#2B3441'}" stroke-opacity=".35" stroke-dasharray="10 8"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
        font-family="ui-monospace, monospace" font-size="26"
        fill="${dark ? '#F2EDE5' : '#2B3441'}" fill-opacity=".7">${key}</text>
  <text x="50%" y="calc(50% + 36px)" text-anchor="middle" dominant-baseline="middle"
        font-family="ui-monospace, monospace" font-size="18"
        fill="${dark ? '#F2EDE5' : '#2B3441'}" fill-opacity=".45">${w}×${h} · placeholder</text>
</svg>
`
}

const cmd = process.argv[2] ?? 'check'
const entries = await readRegistry()

if (cmd === 'generate') {
  await mkdir(outDir, { recursive: true })
  await Promise.all(entries.map((e) => writeFile(join(outDir, `${e.key}.svg`), svg(e.key, e.aspect))))
  console.log(`Generated ${entries.length} placeholders in public/placeholders/`)
} else if (cmd === 'check') {
  const strict = process.env.VITE_STRICT_ASSETS === '1'
  console.log(`${entries.length} asset(s) still on placeholders:`)
  for (const e of entries) console.log(`  · ${e.key}`)
  if (strict) {
    console.error('\nVITE_STRICT_ASSETS=1 — refusing to build with placeholder assets.')
    process.exit(1)
  }
  console.log('\nNot strict — build allowed. Set VITE_STRICT_ASSETS=1 for production.')
} else {
  console.error(`Unknown command "${cmd}". Use "generate" or "check".`)
  process.exit(1)
}
