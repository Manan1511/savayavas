# Savayavas & Co. — Build Plan

Status: Phase 1 complete. Phase 2 (Home) built and running; awaiting real assets. This document is the contract.

---

## 1. Decisions locked

| Area | Decision |
|---|---|
| Framework | React 19 + Vite 8 + TypeScript 7, **React Router 6** |
| Rendering | `vite-react-ssg` — all static routes prerendered to HTML at build |
| Styling | Tailwind v4, tokens as CSS custom properties in `@theme` |
| Motion | Warp/weft weave-in on the hero lockup only. Plays once on landing, never scroll-scrubbed. Photography does not animate. |
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
2. **Hero copy** — "Crafted for the Modern Man" is VAS language, not parent-brand language, and moves to `/vas`. The Home hero is now trade-facing:

   > *The same cloth,* / **EVERY SINGLE BATCH**
   > Cotton. Linen. Engineered blends. From single-piece cut & sew to bulk production runs.

   It names the sourcing buyer's real anxiety — batch variation — in the first three seconds, and leaves VAS to carry the beauty story. Keeps the deck's three-part lockup: script lead-in, all-caps anchor, small-caps subline.
3. **Reviews** — not a standalone route. Runs as a section on `/` and `/for-dealers`, where it sits next to a CTA.
4. **Nav** — the deck's nav differs across boards and doesn't match the sitemap doc. Final nav below.

---

## 2. Blocked on you

| # | Item | Blocks | Urgency |
|---|---|---|---|
| 1 | Real photography (Manan supplying) | Final visual quality of every page | Before launch. Build proceeds on placeholders. |
| 2 | ~~Home hero copy~~ — ✅ decided, in `content/home.en.ts` | — | Done |
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
  motion/         WeaveReveal (see §5)
  content/        typed content modules — en.ts per route + shared
  assets/         registry.ts + placeholder files
  styles/         tokens.css, fonts.css, globals.css
  lib/            submitLead(), analytics, hooks
scripts/          asset placeholder generator
docs/             this file
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
  --color-navy:       #2B3441;  /* weave threads, denim accents */
  --color-brass:      #A8845C;  /* eyebrow labels, icons, rules */

  --font-display:     "Playfair Display", Georgia, serif;
  --font-script:      "Allura", cursive;   /* the hero script line */
  --font-body:        "Jost", system-ui, sans-serif;
}
```

**Type system.** Three jobs only:
- *Display* — Playfair, tight leading, used at 3 sizes. Headlines set in **all-caps with generous tracking** (`MATERIALS THAT SPEAK`) or **title case** (`Crafted with Purpose.`), never mixed within one block.
- *Eyebrow* — Jost, ~11px, `letter-spacing: 0.18em`, uppercase, brass. Appears above every section headline in the deck. This is the most repeated device in the design — make it one component.
- *Body* — Jost light, 15–16px, generous line-height, max ~62ch.

**Copy conventions.**
- **No em dashes anywhere in site copy.** Rewrite instead of substituting: separate sentences where a dash joined two clauses, a colon where it introduced a list, a comma where it was doing a comma's job. En dashes stay in ranges (`Mon – Sat`, `Surat – 395002`).
- Sentence case in body copy, all-caps only in the display and eyebrow roles.

**Recurring motifs to build once:**
- Torn-paper edge — `TornEdge`, an SVG strip filled with the page colour whose jagged side eats into the band. Profile is generated from a fixed seed so it is stable across renders and identical on server and client.
- Short brass rule under eyebrows and beside headlines
- Circle-outline icon (Quality pillars, About pillars) — one component, SVG children
- Small-caps stat block (`20+ / QUALITY CHECKS / At every stage`)

---

## 5. Motion

One gesture, taken from the mill floor, and otherwise stillness. The weave is memorable because it is the only thing that moves.

### Warp & weft weave-in — `WeaveReveal`

The hero lockup is woven into place. Warp threads (vertical) drop in first, left to right, as they would be dressed onto a loom. Weft threads (horizontal) then pass through them one after another, each chasing a shuttle across the width. The content surfaces **through** the cloth while it is still being woven, and the threads lift away once it is there.

Measured from navigation: warp dressed by 0.9s, text emerging from 1.2s, cloth complete and text full at 1.9s, threads lifted by 2.3s.

The content deliberately does not wait for the weave to finish. A hero that sits blank for three seconds reads as a slow page however deliberate the animation is.

Built from straight lines on a strict percentage grid: it renders crisply at any size, has nothing to approximate, and cannot drift out of register.

### Photography does not animate

A bolt-unroll reveal was built and removed. A travelling wipe across an image reads as a slide transition, however it is dressed — and restraint around photography is most of what separates a premium site from a busy one. Images simply present themselves.

### Reveal on scroll — `Reveal`

A short rise and fade as a section enters view: 14px of travel, 0.7s, once, never reversed. Deliberately restrained, and deliberately uniform across the site so it reads as the page waking up rather than as a set of effects.

`stagger` animates an element's direct children in sequence instead of the block as a whole, for card grids and pillar rows.

The hidden state is applied from JS in a layout effect, never from the markup, so prerendered HTML stays fully visible if JavaScript never runs. Verified against the built pages.

### Interaction

Hover is where the rest of the life lives, since it costs nothing until asked for: nav links grow a brass rule from the left, card arrows slide, cards warm to ivory, pillar rings brighten. All 300–400ms, all colour or 1–4px of travel.

The mobile menu's two bars cross into an X rather than swapping for a close icon, opens on a grid-rows transition to its natural height, staggers its items in, locks page scroll, and closes on Escape or navigation.

### Rules

- Respects `prefers-reduced-motion`: content renders immediately, with no threads and no animation.
- GSAP plugins are registered at module scope in `lib/gsap.ts`, never in a provider effect — child effects run before parent effects, so a component would otherwise construct a ScrollTrigger before it existed.
- New motion must clear one bar: would a reader notice it is *missing*? If not, do not add it.
- Prerendered HTML always contains the real content; motion only affects how it is uncovered.

### Rejected: the thread that writes the hero phrase

An earlier build had a needle drawing "The same cloth," in single-stroke lettering. It was abandoned, and the reasoning is worth keeping:

- Outline fonts give glyph *contours*, so stroking one draws the outside edge of every letter — two parallel lines, never a thread.
- Hershey engraving fonts do give true centrelines, but they are pen-plotter data from 1967. Their cursive is crude at hero size, and no amount of smoothing or tracking fixes the letterforms themselves.
- Higher smoothing rounds the small humps off, which in cursive is the difference between an m and an n.

The lesson: a signature animation has to be made of shapes that are *robust at any size*. Straight lines on a grid are. Reconstructed handwriting is not.

## 6. Per-page plan

Nav (final): **Collections · VAS · Our Story · For Dealers · Journal · Contact** + EN/IN toggle + Enquire Now.

---

### `/` — Home
**Job:** establish the parent brand in 5 seconds and split traffic to *For Dealers* or *Our Story*.
**Audience:** traders, garment manufacturers, menswear brands, exporters.

| # | Section | Source | Notes |
|---|---|---|---|
| 1 | Hero collage + headline | p1/p2 | Torn-paper band across the viewport, seven pieces at varied sizes and depths along it, two cutouts floating on their own shadows, lockup centred. Photography is kept out of the centre column so the type never sits on an image. The collage runs from `xl` only: at 1024 the centre column leaves ~170px a side and the pieces are 200-300px wide, so a simpler two-strip treatment runs below that. Verified collision-free at 375, 1024, 1366, 1440 and 1920. |
| 2 | About teaser | p2 | `WOVEN WITH PURPOSE. / MADE TO INSPIRE.` + 3 short paragraphs. Thread underlines the second line and terminates in the needle. |
| 3 | Four pillars | p2 | Circle icons: Premium Quality · Natural Comfort · Crafted with Precision · Made for the Modern Man. Reuse the `IconPillar` component. |
| 4 | Category strip | new | The five fabric categories as a horizontal strip → `/collections/:category`. Not in the deck; needed, since Collections is the commercial core. |
| 5 | VAS callout | new | One band introducing the shirting line → `/vas`. |
| 6 | Reviews | p6 | 4.9/5 aggregate + 3-card carousel. |
| 7 | Dual CTA | new | *For Dealers* / *Our Story*, per the sitemap doc. |

**Components introduced:** `Nav`, `Footer`, `Eyebrow`, `DisplayHeading`, `IconPillar`, `TornEdge`, `ThreadCanvas`, `ReviewCarousel`, `CTABand`.
**Status:** built. Hero, About, four pillars, category strip, VAS callout, Reviews and dual CTA are all in place and prerendering. Remaining work on this route is real photography and a final responsive pass.

---

### `/our-story` — About
**Job:** the family story. This is the brand's strongest asset and the copy already exists.

| # | Section | Source | Notes |
|---|---|---|---|
| 1 | Header | p3 | Eyebrow, headline, intro. |
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
**Job:** every remaining path to a human.

| # | Section | Source |
|---|---|---|
| 1 | Header | p6 |
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

**Phase 2 — Home — ✅ built**
All seven sections, plus the `WeaveReveal` intro. This route is the pattern library: `Section`, `Container`, `Eyebrow`, `Figure`, `IconPillar`, `Reviews` and `WeaveReveal` all come from here and get reused.

Outstanding on this route: real photography, and a final responsive pass once those land. Two animation approaches were built and removed along the way (see §5) — that exploration is finished, and the weave is the answer.

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
