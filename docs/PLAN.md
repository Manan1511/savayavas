# Savayavas & Co. — Build Plan

Status: pre-scaffold. No code written yet. This document is the contract.

---

## 1. Decisions locked

| Area | Decision |
|---|---|
| Framework | React 19 + Vite 8 + TypeScript 7, **React Router 6** |
| Rendering | `vite-react-ssg` — all static routes prerendered to HTML at build |
| Styling | Tailwind v4, tokens as CSS custom properties in `@theme` |
| Animation | GSAP (ScrollTrigger + MotionPath) + Lenis smooth scroll |
| Thread paths | Anchor-driven, fitted at runtime — responsive by construction, no hand-drawn `d` per breakpoint |
| Backend | **None.** Deferred. |
| CMS | **None.** Deferred. Content lives in typed TS modules. |
| Forms | Stubbed behind a `submitLead()` adapter that currently no-ops |
| i18n | `react-i18next` wired day one. EN ships. `/hi/*` reserved, toggle disabled. |
| Assets | Placeholders behind a typed asset registry |
| Fonts | Google Fonts stand-ins, self-hosted woff2, swappable via one CSS var each |
| Host | Netlify |
| Brand | Savayavas & Co. is the parent trade brand. VAS is the menswear shirting line, on its own route. |
| Build order | Landing page complete first, then the remaining routes |
| Package manager | npm (no pnpm on this machine) |

**Why React Router 6, not 7.** `vite-react-ssg` (all versions through 0.9.2) imports `react-router-dom/server.js`, a subpath React Router 7 removed — prerendering hard-fails on RR7. Verified, not assumed. RR6 is stable and this site uses only `Link`, `NavLink`, `Outlet` and `useParams`, all identical across both. Revisit if `vite-react-ssg` ships RR7 support.

### Deliberate deviations from the deck

1. **Tribe wall** — poster grid + lightbox, not 14 live videos. The per-tile mute icons and the global "Pause All" control are removed; they have nothing to control.
2. **Hero copy** — "Crafted for the Modern Man" is VAS language, not parent-brand language. The Home hero needs trade-facing copy; the Modern Man lockup moves to `/vas`. **Needs a copy decision.**
3. **Reviews** — not a standalone route. Runs as a section on `/` and `/for-dealers`, where it sits next to a CTA.
4. **Nav** — the deck's nav differs across boards and doesn't match the sitemap doc. Final nav below.

---

## 2. Blocked on you

| # | Item | Blocks | Urgency |
|---|---|---|---|
| 1 | Real photography (Manan supplying) | Final visual quality of every page | Before launch. Build proceeds on placeholders. |
| 2 | Home hero copy for the parent brand | Home hero implementation | Phase 2 |
| 3 | Backend + CMS decision | Forms actually working, catalogue being editable | Before launch |
| 4 | Hindi copy + Devanagari display face | The IN toggle | Post-launch |
| 5 | Fabric catalogue data (SKUs, colourways, images per category) | `/collections/:category` having real content | Phase 3 |
| 6 | Catalogue PDF | `/collections` download CTA | Phase 3 |
| 7 | Real testimonials + review count | Reviews section (deck's 4.9/5, 120+ is placeholder) | Before launch |
| 8 | Confirm licensed brand fonts, if any exist | Type swap | Anytime |

**Asset reality check.** The 6 PDF boards are single flattened JPEGs, ~1500px wide, ~290KB each. No layers, no live text, no vectors — AI-generated concept renders. Nothing is extractable. Every photo, icon, torn edge, and word is being rebuilt from scratch against the render as reference.

**Placeholder policy (agreed).** Build proceeds on placeholders; real assets land later. To keep the swap a non-event:
- Every image goes through `assets/registry.ts` — components reference a key, never a path.
- Each entry declares its **final intended aspect ratio**, and the placeholder is generated at exactly that ratio. Layouts are then already correct when real photos arrive; nothing reflows.
- Placeholders are generated in the brand palette (ivory / greige / navy / brass) with the asset key printed on them, so an un-swapped image is obvious in review rather than passing as a design choice.
- `npm run assets:check` fails the build if any registry entry still points at a placeholder while `VITE_STRICT_ASSETS=1` — flip that on in Netlify for production so placeholders cannot ship by accident.

---

## 3. Repo structure

```
src/
  app/            router, layouts, providers (Lenis, i18n, region)
  routes/         one folder per route, colocated sections
  components/     shared UI primitives
  thread/         the thread system (see §5)
  content/        typed content modules — en.ts per route + shared
  assets/         registry.ts + placeholder files
  styles/         tokens.css, fonts.css, globals.css
  lib/            submitLead(), analytics, hooks
docs/             this file, thread path source SVGs
```

**Content contract.** Every route imports its copy from `content/<route>.en.ts`, typed. No string literals in JSX. This is what makes both the CMS swap and Hindi cheap later.

**Asset contract.** `assets/registry.ts` maps a key → `{ src, width, height, alt, aspect }`. Components reference keys, never file paths. Swapping placeholders for real photography becomes a folder drop plus one file edit.

---

## 4. Design tokens

Sampled from the renders; treat as calibrated starting values, not gospel.

```css
@theme {
  --color-paper:      #FCFBF9;  /* page ground */
  --color-ivory:      #F2EDE5;  /* section alt ground, torn sheet */
  --color-greige:     #E4E0D6;  /* borders, muted fills */
  --color-ink:        #141414;  /* headlines, dark bands */
  --color-navy:       #2B3441;  /* the thread, denim accents */
  --color-brass:      #A8845C;  /* eyebrow labels, icons, rules */

  --font-display:     "Playfair Display", Georgia, serif;
  --font-script:      "Petit Formal Script", cursive;
  --font-body:        "Jost", system-ui, sans-serif;
}
```

**Type system.** Three jobs only:
- *Display* — Playfair, tight leading, used at 3 sizes. Headlines set in **all-caps with generous tracking** (`MATERIALS THAT SPEAK`) or **title case** (`Crafted with Purpose.`), never mixed within one block.
- *Eyebrow* — Jost, ~11px, `letter-spacing: 0.18em`, uppercase, brass. Appears above every section headline in the deck. This is the most repeated device in the design — make it one component.
- *Body* — Jost light, 15–16px, generous line-height, max ~62ch.

**Recurring motifs to build once:**
- Torn-paper edge — SVG mask, 3 variants, applied as `mask-image` on section boundaries
- Short brass rule under eyebrows and beside headlines
- Circle-outline icon (Quality pillars, About pillars) — one component, SVG children
- Small-caps stat block (`20+ / QUALITY CHECKS / At every stage`)

---

## 5. The thread system

The single most important thing on this site. Everything else is a competent brand page; this is the reason anyone remembers it.

### Model

One continuous navy stroke with a needle at its head. It enters every page at the **left viewport edge at a fixed Y**, weaves through that page's content, and exits at the **right viewport edge at a fixed Y**. Because the entry/exit Y values are shared constants, navigation can be sold as continuous even though each route owns its own path.

### Implementation

- `<ThreadCanvas>` — one fixed-position, full-height inline SVG per route, `pointer-events: none`, sitting in a dedicated z-index band.
- Path geometry is **generated at runtime from anchors placed in the markup.** No hand-drawn `d` strings, no fixed-aspect containers, no breakpoint files to maintain.
- Drawing = `strokeDasharray`/`strokeDashoffset` scrubbed by ScrollTrigger (`scrub: 1`) against the page's scroll progress.

#### Anchor-driven paths

A section declares where the thread should pass by dropping markers into its own markup:

```tsx
<ThreadAnchor id="hero-cone"    side="left"   offset={[0, 12]} tension={0.8} />
<ThreadAnchor id="hero-script"  side="center" band="front" />
<ThreadAnchor id="about-rule"   side="right"  offset={[-40, 0]} />
```

At runtime `useThreadPath()` measures each anchor's document position, sorts by Y, and fits a Catmull-Rom spline through the points, emitted as a cubic-bezier `d` string. A `ResizeObserver` on `<body>` recomputes and calls `ScrollTrigger.refresh()` on layout change, debounced.

Why this is the easier system:

- **Layout changes can't break it.** Move a section, change a font, let a headline wrap to three lines — the anchors move with their content and the curve refits. Nothing to redraw.
- **One code path for every breakpoint.** Mobile falls out for free: anchors stack vertically at narrow widths, so the curve naturally becomes the vertical serpentine we wanted. No second `d` string, no separate mobile file.
- **Anchors live next to the content they relate to**, so it's obvious in the JSX why the thread bends where it does.
- **Steering knobs where you need them:** `offset` nudges a waypoint in px, `tension` controls how tightly the spline hugs it, `band` sets front/behind layering per-segment. Nine times out of ten the default curve is right; the knobs handle the tenth.

**The one trade-off:** a fitted spline cannot trace the exact flourish of the script word "Crafted for" the way a hand-drawn path could. Mitigation — that word ships as an inline SVG rather than live text (we're using a stand-in script font anyway), so the thread can simply *join* the letterform's own stroke at a shared endpoint. One bespoke case, on one word, on one page. Everywhere else the generated curve is indistinguishable from a drawn one.

If a specific curve ever proves impossible to steer with anchors, `<ThreadCanvas>` accepts an optional `d` override for that route — the escape hatch exists, but it should stay unused.
- The needle rides the path head via `MotionPathPlugin` with `autoRotate: true`.
- Z-index bands are explicit and global:

```
0  page background / flat imagery
10 THREAD-BEHIND   ← thread renders here on sections where it passes under photos
20 photography, cards, torn-paper layers
30 THREAD-FRONT    ← thread renders here where it crosses text
40 text and UI
50 nav, lightbox, needle-pull transition overlay
```
  A section declares which band its thread segment occupies. Where the thread must weave over *and* under within one section, the path is split into two sibling `<path>` elements sharing one dash-offset driver.

### Mobile

Falls out of the anchor system automatically — at narrow widths the anchors stack vertically and the fitted curve becomes a gentle serpentine down the page. Sections can opt an anchor out below a breakpoint (`hideBelow="lg"`) to thin the curve where it would get busy. Same scrub, same needle, no second path to maintain.

### Page transition

On nav click: needle accelerates to the right edge, dragging the remaining stroke offscreen; route swaps; the next page's thread draws in from the left at the same Y. Budget ~600ms total. Uses React Router's `useNavigate` with a deferred transition.

### Non-negotiables

- `prefers-reduced-motion` → thread renders fully drawn and static, needle hidden, no scrub, no page transition. Lenis disabled.
- The thread is decorative: `aria-hidden="true"`, no focus, no announcement.
- Must never block first paint. Path draws only after fonts settle.
- SSR-safe: every GSAP call guarded, initialised in `useLayoutEffect` via `gsap.context()` with cleanup.

### Per-route thread choreography

Anchor positions per route (the choreography below) are still a design decision — the system just means expressing it is a prop, not a redraw.

| Route | Enters | Weaves through | Exits |
|---|---|---|---|
| `/` | Left, from the yarn cone in the hero | Behind the collage, over the script word, underlines the About headline, ends in a needle at the pillars | Right, mid-page |
| `/our-story` | Left, threaded through a needle eye | Through the `SAVAYAVAS & CO TRIBE` headline | Right, above the tile grid |
| `/collections` | Left, at the eyebrow | Across the category grid gutters | Right |
| `/vas` | Left, at the hero | Around the Modern Man lockup, down through the quality pillars | Right, above the stats band |
| `/for-dealers` | Left | Under the headline, along the 3-step program | Right |
| `/journal` | Left | Single soft arc behind the index header | Right |
| `/contact` | Left, at the eyebrow | Under `TRUSTED BY THOSE WHO VALUE QUALITY`, over the form | Terminates in the needle, no exit — end of the site |

Note the last row: the thread should *end* somewhere. `/contact` is that place.

---

## 6. Per-page plan

Nav (final): **Collections · VAS · Our Story · For Dealers · Journal · Contact** + EN/IN toggle + Enquire Now.

---

### `/` — Home
**Job:** establish the parent brand in 5 seconds and split traffic to *For Dealers* or *Our Story*.
**Audience:** traders, garment manufacturers, menswear brands, exporters.

| # | Section | Source | Notes |
|---|---|---|---|
| 1 | Hero collage + headline | p1/p2 | Layered composition: torn linen sheet, ~6 photo tiles, yarn cone, swatch book. Each is a separate positioned layer so the thread can pass between them. **Copy is TBD** — must be trade-facing, not "Modern Man". |
| 2 | About teaser | p2 | `WOVEN WITH PURPOSE. / MADE TO INSPIRE.` + 3 short paragraphs. Thread underlines the second line and terminates in the needle. |
| 3 | Four pillars | p2 | Circle icons: Premium Quality · Natural Comfort · Crafted with Precision · Made for the Modern Man. Reuse the `IconPillar` component. |
| 4 | Category strip | new | The five fabric categories as a horizontal strip → `/collections/:category`. Not in the deck; needed, since Collections is the commercial core. |
| 5 | VAS callout | new | One band introducing the shirting line → `/vas`. |
| 6 | Reviews | p6 | 4.9/5 aggregate + 3-card carousel. |
| 7 | Dual CTA | new | *For Dealers* / *Our Story*, per the sitemap doc. |

**Components introduced:** `Nav`, `Footer`, `Eyebrow`, `DisplayHeading`, `IconPillar`, `TornEdge`, `ThreadCanvas`, `ReviewCarousel`, `CTABand`.
**Risk:** the hero is the hardest layout on the site — 8 layers, responsive, and the thread weaves through it. Budget accordingly.

---

### `/our-story` — About
**Job:** the family story. This is the brand's strongest asset and the copy already exists.

| # | Section | Source | Notes |
|---|---|---|---|
| 1 | Header + thread | p3 | Needle threads in from the left through the headline. |
| 2 | Three brothers | your copy | Arvind, Vinod, Paresh Parmar. Shubh Shantinath Silk Mills, three decades, Mumbai. |
| 3 | The name | your copy | सावयव + वस् = Various Types of Fabrics. **Devanagari renders here even in the EN build** — needs a Noto Serif Devanagari subset loaded regardless of locale. Design this as a deliberate typographic moment, not a footnote; it is the single best piece of copy you have. |
| 4 | Second generation | your copy | Priyank and Sherin Parmar. |
| 5 | VAS origin | your copy | The root *Vas* carried forward → link to `/vas`. |
| 6 | Tribe wall | p3 | `OUR WORLD. OUR PEOPLE.` 14 poster tiles with caption overlays; click opens a lightbox player. IntersectionObserver-lazy posters, one `<video>` alive at a time. |

**Components introduced:** `TimelineBlock`, `PosterTile`, `VideoLightbox`.

---

### `/collections` — Catalogue index
**Job:** the commercial core. Prove range and consistency at scale.

| # | Section | Source | Notes |
|---|---|---|---|
| 1 | Header | p4 | `MATERIALS THAT SPEAK FOR THEMSELVES` + the "It all begins with nature" copy. |
| 2 | Positioning | your copy | "consistency at scale… single-piece cut & sew to bulk production runs… India and beyond." |
| 3 | Five categories | your copy | 100% Cotton · Lyocell Cotton · 100% Linen · Polyester Cotton · Fashion Polyesters. Each a large card with its description, → detail route. |
| 4 | How we create | p4 | `CRAFTED WITH PURPOSE.` — spinning, weaving, finishing. Split image/text bands. |
| 5 | Manufacturing backing | your copy | Shubh Shantinath Silk Mills, three decades. |
| 6 | Catalogue PDF CTA | sitemap doc | Download button. Blocked on the PDF; renders disabled until supplied. |

**Components introduced:** `CategoryCard`, `SplitBand`, `DownloadCTA`.

---

### `/collections/:category` — Category detail
**Job:** everything a sourcing buyer needs about one fabric family.

Sections: hero (category name + description) · specification table (composition, GSM, width, weave, finish — **schema needs your input**) · fabric/colourway grid · use-case copy (who this is for) · related categories · inquiry CTA prefilled with the category.

**Status:** structure and components built in Phase 3; renders from a stub dataset until real SKU data arrives. Five static routes prerendered from the category list.

---

### `/vas` — The shirting line
**Job:** the one page allowed to speak to the Modern Man. This is where the deck's most beautiful material lives.

| # | Section | Source |
|---|---|---|
| 1 | Hero — `Crafted for / THE MODERN MAN` | p1/p2 |
| 2 | What VAS is, and the *Vas* root | your copy |
| 3 | `QUALITY YOU CAN FEEL. STANDARDS YOU CAN TRUST.` | p5 |
| 4 | Five quality pillars | p5 — Premium Raw Materials · Rigorous Testing · Consistent Performance · Sustainable Approach · Tailored Excellence |
| 5 | Quality in every detail — 5 test tiles | p5 — Tensile Strength · Colour Fastness · Shrinkage Control · Pilling Resistance · Perfect Finish |
| 6 | Dark stats band | p5 — 20+ / 0 / 100% / Global Standards / 1000+. **Numbers need verification before they go live.** |

**Components introduced:** `QualityPillar`, `DetailTile`, `StatsBand`.

---

### `/for-dealers` — Trade
**Job:** convert. The highest-intent page on the site.

Sections: header · who the program is for · what dealers get · 3-step onboarding · pricing-structure inquiry (form) · export terms (advance-payment-only, stated plainly) · reviews · FAQ · CTA.

**Forms:** dealer onboarding + pricing inquiry. Both call `submitLead()`, which currently validates, logs, and shows the success state without transmitting. **The success message must not claim someone will be in touch until a backend exists** — render a "call/WhatsApp us" fallback instead.

---

### `/journal` and `/journal/:slug` — Content hub
**Job:** SEO surface and Instagram cross-link.

Index: header, featured post, card grid, category filter, Instagram strip.
Post: title, meta, body, related posts, share.

Content as MDX in `content/journal/`, prerendered per slug. This is the route most obviously wanting a CMS later — keep the frontmatter schema close to what a Sanity document would look like.

---

### `/contact` — Inquiry
**Job:** every remaining path to a human. The thread ends here.

| # | Section | Source |
|---|---|---|
| 1 | Header + thread terminus | p6 |
| 2 | Reviews | p6 — 4.9/5 + carousel |
| 3 | Get in touch | p6 — phone, email, Instagram, hours |
| 4 | Visit us + map | p6 — address, directions. **Static map image, not an embed** — a Google Maps iframe adds ~500KB and third-party cookies to your quietest page. |
| 5 | Trade inquiry form | sitemap doc |
| 6 | Export inquiry form | sitemap doc — separate fields, advance-payment-only terms acknowledged explicitly |

---

## 7. Phases

**Phase 1 — Foundation — ✅ done**
Vite + TS + Tailwind v4 + Router + `vite-react-ssg`. Tokens, fonts, asset registry + placeholder generator, content module pattern, i18n scaffold, Lenis provider, `Nav`/`Footer`/`Eyebrow`/`Seo`, `submitLead()` stub, Netlify config, reduced-motion plumbing, all 9 routes stubbed.

Verified, not assumed: `npm run build` prerenders **12 HTML pages**, every one with content in `#root` (no empty shell), a unique `<title>`, unique canonical, OG/Twitter tags and `Organization` JSON-LD. In the browser: tokens resolve, Playfair/Jost load, Lenis attaches (`html.lenis`), zero console errors, IN toggle renders disabled.

**Phase 2 — Home, complete**
Every section above, the full thread system, the page-transition prototype. This route is the pattern library; nothing else starts until it is genuinely finished, on desktop and mobile.

**Phase 3 — Remaining routes**
`/our-story` → `/vas` → `/collections` → `/for-dealers` → `/contact` → `/journal`. In that order: they descend by how much new component work each needs. Thread paths drawn per route against the built layout.

**Phase 4 — Polish**
Lighthouse pass, image formats (AVIF + `srcset`), font subsetting, focus states, keyboard nav through the lightbox and carousel, 404, `sitemap.xml`, `robots.txt`, JSON-LD `Organization`, OG images per route.

**Phase 5 — Deferred, on your signal**
Backend + CMS. Forms transmit. Catalogue becomes editable. Hindi.

---

## 8. Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Assets never materialise and placeholders ship | Medium | Registry makes the swap a folder drop. Manan is supplying real assets later; placeholders are the agreed bridge. Still: don't launch a fabric brand on stock cotton. |
| Generated curve looks mechanical, not designed | Medium | Anchor `offset`/`tension` knobs, plus the per-route `d` override as a last resort. Review the curve on every route before sign-off — "responsive by construction" is worth nothing if it's ugly. |
| `ScrollTrigger.refresh()` thrashing on resize | Low | Debounce the `ResizeObserver`, skip refits under a 4px delta, never refit mid-scroll. |
| Home hero complexity blows the schedule | Medium | It is deliberately Phase 2's whole scope. Do not add routes in parallel. |
| Scroll scrub janks on mid-range Android | Medium | Simplified mobile path, `will-change` discipline, no scrubbed layout properties, test on a real device not a throttled desktop. |
| "Modern Man" copy leaks into parent-brand pages | Medium | The brand split is a content decision, not a code one. Copy review before Phase 3. |
| Forms look functional but go nowhere | High | Success state must be honest until a backend exists. |
| Stats (20+, 1000+, 4.9/5, 120+ reviews) are render placeholders | Medium | Verify before launch. Publishing invented numbers is a real problem, not a design detail. |
