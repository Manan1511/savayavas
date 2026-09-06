# Savayavas & Co. — Build Plan

Status: Phase 1, 2 and 3 complete. All 9 routes are built and prerendering. Phase 4 (polish) mostly done — every page scores 100 on Lighthouse accessibility, best-practices and SEO. Remaining Phase 4 items (AVIF/srcset, true font subsetting) are genuinely blocked on real assets, not skipped. This document is the contract.

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
| 5 | Fabric catalogue data (real GSM/weave/composition specs, real colourway photography, SKUs) | `/collections/:category`'s spec table and swatches are currently honest placeholders | Phase 3 (built), data still needed |
| 6 | Catalogue PDF | `/collections` download CTA | Phase 3 |
| 7 | Real testimonials + review count + VAS quality stats | Reviews section and `/vas` stats band (both marked `placeholder: true`) | Before launch |
| 9 | Verified phone/email | `site.contact` is deck-invented and now the ACTIVE fallback on every form submission (LeadForm), not just a passive footer mention | Before launch |
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
  components/     shared UI primitives (Lightbox, TornEdge, Figure, LeadForm, SplitBand, IconPillar, ...)
  motion/         WeaveReveal, Reveal (see §5)
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
| 1 | Hero collage + headline | p1/p2 | Torn-paper band across the viewport, seven pieces at varied sizes and depths along it, two cutouts floating on their own shadows, lockup centred. Photography is kept out of the centre column so the type never sits on an image. The collage runs from `xl` only: at 1024 the centre column leaves ~170px a side and the pieces are 200-300px wide, so a simpler two-strip treatment runs below that. The band and collage are full-bleed siblings of the capped content column, never children of it: inside `max-w-[1700px]` the torn sheet stopped at 1700px and left a hard vertical edge with bare paper either side on any wider display. Only the type is capped. Verified full-bleed and collision-free at 375, 1024, 1280, 1366, 1600, 1920, 2200 and 2560. |
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

**Status:** ✅ built. One consolidated `LeadForm` rather than two near-identical forms stacked on the page — an inquiry-type select chooses between `dealer-onboarding` and `trade-inquiry`, and that choice is what gets sent. Also built: who-it's-for (4 audiences), what-dealers-get (4 `IconPillar`s), a 3-step onboarding list, the export-terms callout (stated as plain fact, since this policy was supplied directly rather than invented by the deck), the shared `Reviews` component, and an FAQ built on native `<details>`/`<summary>` for free keyboard support and no JS state.

FAQ answers make no invented claims: MOQ and lead-time questions are answered honestly as "tell us and we'll confirm" rather than a plausible fabricated number, matching the specification-table policy on `/collections/:category`.

Verified: form validation blocks submission with inline errors when name/email are missing or the email is malformed; a valid submission produces the honest "not connected" fallback with working `tel:`/`mailto:` links and never claims anyone "will be in touch"; the inquiry-type select actually changes the submitted lead's `kind` (confirmed via the dev console log, `dealer-onboarding` vs `trade-inquiry`); no em dashes; no sideways scroll; all 8 sections and all 5 FAQ items present in prerendered HTML.

**New finding, not new code:** `site.contact`'s phone and email are deck-invented placeholders. They were a passive footer mention before; `LeadForm`'s fallback now surfaces them as the *active* thing every visitor is told to call or email whenever a submission can't send, i.e. every submission until a backend exists. Added to "Blocked on you" as item 9 — a wrong number here means a real, motivated lead calling a dead line.

---

### `/journal` and `/journal/:slug` — Content hub
**Job:** SEO surface and Instagram cross-link.

Index: header, featured post, card grid, category filter, Instagram strip.
Post: title, meta, body, related posts, share.

Content as MDX in `content/journal/`, prerendered per slug. This is the route most obviously wanting a CMS later — keep the frontmatter schema close to what a Sanity document would look like.

**Status:** ✅ built, deviating from MDX. No MDX toolchain exists and no real posts exist yet, so adding an MDX pipeline for placeholder content would be complexity with no payoff. `content/journal.en.ts` holds typed `JournalPost` objects instead (slug, title, date, category, excerpt, cover, body paragraphs), the same convention every other route follows. The shape maps directly onto frontmatter + body, so migrating to real MDX or a CMS document later is a data-layer change, not a component rewrite.

Four seed posts (GSM explained, cotton vs linen, consistency at scale, reading a composition label): genuine generic textile-trade explainers, not fabricated Savayavas claims, written to prove the route end to end. They should be reviewed or replaced with real editorial content before launch. Cover images reuse existing registry assets by topic rather than adding new placeholders for content nobody has written in real life yet.

Index: header, a larger featured-post card, a category filter (client-side, no routing — four posts don't need it) that excludes the featured post from the filtered grid, and an Instagram section. That section is a plain follow link, deliberately not a grid of tiles implying they are real Instagram posts — no Instagram API integration exists, and faking a feed would be a specific, easily-noticed dishonesty.

Post: breadcrumb back to the index, category and date, cover image, body, a copy-link share button, and up to two related posts (same category first, then backfilled from others).

**A real bug, caught by testing rather than assumed away:** the share button's clipboard-write failure was silently swallowed — a visitor whose browser blocks clipboard access (permissions, an unfocused document, an older browser) would click "Share This Post" and see nothing happen, with no way to know it failed. Fixed to show the raw URL as a fallback instead of doing nothing. Confirmed by triggering the exact failure this pane's automation produces (`Document is not focused`) and verifying the fallback text renders.

Verified: no em dashes; no sideways scroll; the category filter actually filters (`Guides` correctly shows only `cotton-vs-linen`, since `gsm-explained` is the same category but is the featured post and excluded); a post page's related section shows same-category posts first; `og:type` is `article` on post pages; all 16 pages (was 12) build and prerender.

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

**Status:** ✅ built. Same consolidation as `/for-dealers`: one `LeadForm` with a Trade/Export type select rather than two stacked forms. `LeadForm` was extended so the export payment-acknowledgment checkbox appears automatically the moment "Export Inquiry" is selected (`needsExportAck = showExportAck || selectedKind === 'export-inquiry'`), not only when a caller hardcodes the form to exports — `/for-dealers` never selects that option so it is unaffected.

`?category=<slug>` arriving from a `/collections/:category` "Enquire About X" link is read via `useSearchParams`, matched against `site.categories`, and shown as "Regarding: 100% Cotton" above the form, submitted as the lead's `category` field.

Map is a static `Figure`, not a live embed, exactly as specified — verified no `<iframe>` in the built HTML. "Get Directions" opens Google Maps via a plain search-query link, so way-finding still works without the ~500KB/third-party-cookie cost on the site's quietest page.

Verified: no em dashes; no sideways scroll; switching the select to "Export Inquiry" reveals the checkbox and submission is blocked with an inline error until it is checked; once checked, the lead submits with `kind: 'export-inquiry'` and `acknowledgedExportTerms: true` (confirmed via console log); clicking a real "Enquire About 100% Cotton" link from `/collections/cotton` lands on `/contact?category=cotton` with the category shown and prefilled; all 5 sections present in prerendered HTML.

---

## 7. Phases

**Phase 1 — Foundation — ✅ done**
Vite + TS + Tailwind v4 + Router + `vite-react-ssg`. Tokens, fonts, asset registry + placeholder generator, content module pattern, i18n scaffold, Lenis provider, `Nav`/`Footer`/`Eyebrow`/`Seo`, `submitLead()` stub, Netlify config, reduced-motion plumbing, all 9 routes stubbed.

Verified, not assumed: `npm run build` prerenders **12 HTML pages**, every one with content in `#root` (no empty shell), a unique `<title>`, unique canonical, OG/Twitter tags and `Organization` JSON-LD. In the browser: tokens resolve, Playfair/Jost load, Lenis attaches (`html.lenis`), zero console errors, IN toggle renders disabled.

**Phase 2 — Home — ✅ built**
All seven sections, plus the `WeaveReveal` intro. This route is the pattern library: `Section`, `Container`, `Eyebrow`, `Figure`, `IconPillar`, `Reviews` and `WeaveReveal` all come from here and get reused.

Outstanding on this route: real photography, and a final responsive pass once those land. Two animation approaches were built and removed along the way (see §5) — that exploration is finished, and the weave is the answer.

**Phase 3 — Remaining routes**
`/our-story` → `/vas` → `/collections` → `/for-dealers` → `/contact` → `/journal`. In that order: they descend by how much new component work each needs.

`/our-story` — ✅ built. Header, Founders (with photo), the Devanagari name moment, VAS origin hinge, a full-bleed mill band, and the 14-tile Tribe wall with a keyboard-navigable Lightbox. New shared components from this route: `TornEdge` reused, plus `Lightbox` (generic, not tied to Tribe) — `/vas` and `/collections` can reuse it for any enlarged-view need.

Verified: no em dashes, Devanagari renders in the prerendered HTML regardless of locale, all 6 sections present in SSR output, no unexplained hidden content, no sideways scroll at 375 or 1265, tribe grid resolves to 2 columns on mobile and 7 on desktop. Lightbox verified via real pointer clicks (not `.click()`, which does not reliably move focus in Chromium): correct tile opens, arrow keys navigate, Escape closes, focus returns to the tile that opened it, body scroll unlocks on close.

No video assets exist yet, so the Lightbox opens the same still, larger, with its caption, rather than a fake video player.

`/vas` — ✅ built. Hero (script + headline lockup beside the fabric-stack image, plain `Reveal` rather than `WeaveReveal` — the weave stays Home's signature gesture, per §5), a one-paragraph reaffirmation of the Vas root with a link back to the full etymology on `/our-story`, the quality intro, five pillars (via the new shared `IconPillar`, also now used by Home's About section instead of a duplicated local component), five test-detail tiles reusing the `Lightbox` built for the Tribe wall, a stats band, and a closing CTA into `/for-dealers`.

The stats band (20+ quality checks, 100% traceability, 1000+ clients, etc.) is marked `placeholder: true` in `content/vas.en.ts`, same convention as `site.reviews` — these are the deck's invented numbers and must be verified or removed before launch.

Verified: no em dashes, all 7 sections present in prerendered HTML, no unexplained hidden content, no sideways scroll at 375px and at the pane's own width, pillar and stat grids resolve to the intended column counts, the reused Lightbox opens the correct tile with the correct caption.

`/collections` and `/collections/:category` — ✅ built. Index: hero (your "It all begins with nature" copy beside the yarn-table image), the positioning paragraph (your text, verbatim), a full-size category grid, a `SplitBand` for "Crafted with Purpose" (the new shared component the plan named but hadn't built yet), the manufacturing band, and a catalogue-PDF CTA. Detail: breadcrumb hero, specification table, colourway swatches, a "who this is for" line, related categories, and a category-prefilled inquiry link.

Two placeholder policies worth flagging together, since they're the same judgement call twice: the specification table renders "To be confirmed" rather than an invented GSM or weave count, because a sourcing buyer might act on that number, and a plausible-looking fake is worse than an honest gap. The catalogue CTA renders visibly disabled with a reason rather than a link to a PDF that doesn't exist. Neither silently no-ops.

Colourway swatches are flat colour blocks from the brand palette with text labels, not photographs standing in for real dye lots — same reasoning as the specification table, one level down.

Verified: no em dashes, no sideways scroll on either page, all six swatches render with correct colours and labels, the inquiry link carries the category (`/contact?category=linen`), spec rows show the pending marker rather than fabricated data, all sections present in the prerendered HTML for both the index and a sampled category page.

`/for-dealers` — ✅ built. Adds `LeadForm`, the first form on the site and the pattern every later one follows: inline validation, and a submission that never claims someone will be in touch while `LEAD_TRANSPORT_CONFIGURED` is false. The plan asked for two forms (dealer onboarding, pricing inquiry); built as one `LeadForm` with an inquiry-type select instead, since two near-identical forms stacked on a page is redundant UX for the same visitor.

`/contact` — ✅ built. Same consolidation for Trade/Export inquiry, with `LeadForm` extended so the export payment-acknowledgment checkbox appears automatically once "Export Inquiry" is selected, not only when a form is hardcoded to exports. A static map (no live embed), and `?category=<slug>` from a Collections page arrives here and prefills the form — verified end to end by clicking a real "Enquire About 100% Cotton" link.

`/journal` and `/journal/:slug` — ✅ built, deviating from the plan's MDX suggestion (see §6) since no MDX toolchain exists and no real posts do either. Typed `JournalPost` objects instead, same convention as everywhere else.

A real bug surfaced by testing across these three form-heavy routes: `site.contact`'s phone and email are deck-placeholder values. They were a passive footer mention before `LeadForm` existed; now they are the *active* fallback every visitor is told to call whenever a submission cannot send, i.e. every submission until a backend exists. Flagged inline and in §2 as item 9.

**Phase 3 is complete. All 9 routes are built and prerendering.**

**Phase 4 — Polish — ✅ mostly done**

Real Lighthouse, not a guess: `npx lighthouse` against `vite preview` (the actual production build, not dev) with Chrome installed locally. Before this pass: Home scored 83/96/96/100 (performance/accessibility/best-practices/seo). After: every one of Home, `/for-dealers`, `/our-story`, `/contact`, `/collections`, `/collections/:category`, `/vas` and a journal post scores **100 on accessibility, best-practices and seo**. Performance sits in the mid-to-high 80s across the board, the honest ceiling for a placeholder-asset site (see below).

Six real, confirmed bugs found by running the actual tool rather than assuming compliance, each verified fixed by re-running Lighthouse afterward:

- **404 was a soft 404.** `netlify.toml` redirected every unmatched path to `/index.html` with status 200 — genuinely broken links returned the homepage with a 200, which search engines penalise and which hides dead links from anyone checking status codes. Added a real `/404` route (`NotFound.tsx`, `noindex`), prerendered to `dist/404.html`, and removed the redirect entirely: every real route is enumerated and prerendered to its own file, so Netlify serves each directly with no rewrite needed, and its own automatic 404.html detection now returns a genuine 404 status.
- **The OG image referenced by every single page did not exist.** `/og/default.jpg` was a 404 on every social share. Generated a real branded 1200×630 placeholder (`scripts/generate-og.py`, not part of `npm run build` — a one-time/occasional regeneration step) matching the site's own eyebrow/wordmark/rule/tagline pattern.
- **Charset declaration failed Lighthouse's audit despite a static `<meta charset>` sitting first in `index.html`.** Traced into `vite-react-ssg`'s source: it does `indexHTML.replace('<head>', '<head>' + metaTags)`, unconditionally inserting every Helmet-collected tag before any static template content, which pushed the real declaration past the 1024-byte budget once title/description/OG/Twitter tags were long enough. Fixed by also emitting charset via `Head` in `RootLayout`, so it lands inside that same inserted block instead of after it — confirmed the resulting byte offset (149) and, separately, that `npm run dev`'s server sends no charset in its `Content-Type` header either, so the static declaration stays for dev-mode correctness (an assumption I initially got wrong and verified before shipping).
- **Two design tokens failed WCAG AA contrast, and both are used everywhere.** `--color-brass` (2.94:1 vs ivory, 3.32:1 vs paper) and `--color-stone` (2.03:1 vs paper, 1.81:1 vs ivory) both needed 4.5:1. Computed replacements against both grounds using the actual relative-luminance formula, not a guess: `#836647` and `#6E6A63`. Checked every usage of both tokens first to confirm neither appears on a dark ground (where darkening would have hurt rather than helped) before changing them globally rather than patching call sites one at a time.
- **A systemic heading-order bug: `Eyebrow` (a plain `<p>`) sitting directly above a grid of `<h3>` cards, skipping `<h2>` entirely.** Found on `/for-dealers` (three sections), `/journal` and `/journal/:slug` (the featured/related post cards), and a category detail page's "Other Collections". Rather than patching each site differently, gave `Eyebrow` an `as="h2"` option — same look, since its CSS fully overrides font size/weight/tracking regardless of tag — and applied it wherever a section's only heading-shaped text was that label. Audited every remaining `<h3>` in the codebase by hand afterward to confirm no other instance existed.
- **`StatsBand`'s `<dl>` mixed valid `dt`/`dd` with two stray `<p>` tags in the same wrapper**, an invalid definition-list content model, and duplicated the stat label as both a sr-only `dt` and a visible `<p>`. Rebuilt as `dt` (now visibly the label itself) followed by two `dd`s (value, caption), using `order-*` utilities to keep the exact original big-number-first visual layout while the DOM order is now spec-correct.

Also done: **font weight-range trimming**, measured, not assumed — fetched both the old and new Google Fonts CSS2 responses and summed every referenced file's actual byte size: 527,604 → 307,384 bytes (42%, 220KB) just from requesting only the weights/styles the site actually uses (Playfair 400 only; Jost 300/400 regular + 300 italic, since three places genuinely render italic Jost). Caught a self-introduced risk before shipping it: six non-heading elements (`Nav`/`Footer` logo links, `Reviews`' rating figure and quote mark, `Onboarding`'s step numbers, `StatsBand`'s values) use the display font without an explicit weight and would have silently requested the now-unavailable 300 — made explicit with `font-normal` rather than relying on the browser's silent substitution.

`sitemap.xml` and `robots.txt`: generated at build time (`scripts/sitemap.mjs`, chained after `vite-react-ssg build`) from the same static route list plus the actual category and journal slugs (parsed from their content modules' source text, the same constraint `scripts/assets.mjs` already works under — no TS runtime in a plain Node build script). Verified: valid XML, 16 URLs matching exactly the 16 real content pages (404 correctly excluded), `robots.txt` points at it.

Focus states and keyboard nav: verified with genuine input, not synthetic events. A real Tab keypress (via the `computer` tool, not `.focus()`, which does not trigger `:focus-visible`) confirmed the brass focus ring actually renders. A real click plus Escape confirmed the Tribe wall / VAS detail-tile Lightbox still opens, focuses its close button, and closes on Escape after this session's other changes.

**Deferred, genuinely blocked, not skipped:** AVIF/`srcset` — every image is still a placeholder SVG; format conversion has no meaning until real photography lands (item 1 in §2). True font *subsetting* (self-hosted, glyph-level, per the original Phase 1 plan) — the weight-range trim above is a real, measured, verified improvement, but it is Google Fonts serving smaller static files, not the self-hosted subsetting this section originally specified; that remains a further step if the extra ~150-250KB matters more once real content is in place.

**Phase 5 — Hindi localization — ✅ done (backend + CMS still deferred, on your signal)**

You ruled out backend work for now ("dont start any backend rn"), then confirmed Hindi as the backend-independent option to build. Full `/hi/*` localization, not a stub: real routing, translated content for all 9 route domains, and every hardcoded UI string in every component — not just page copy.

**Architecture.** URL-prefix based: English unprefixed (`/our-story`), Hindi prefixed (`/hi/our-story`). Locale is derived purely from the URL pathname (`useLocale()` in `src/lib/i18n.ts`), never cookies or headers, since this is a static prerendered site with no request to inspect at build time. `src/app/routes.tsx` builds two parallel route trees from one `buildChildRoutes(prefix)` factory rather than forking every route component — content resolution happens inside each component via a locale-aware hook reading the URL, so the ~50 section files stay single-source. Category and journal slugs are shared between languages (`/hi/collections/linen` is the same category as `/collections/linen`), so a URL never needs to know its own locale to resolve.

**Content resolution.** Every `content/X.en.ts` module has an `X.hi.ts` sibling with the same shape, resolved via `useLocaleContent(en, hi)` (`src/lib/useLocaleContent.ts`). The tricky part: `en` files use `as const`, narrowing every string to its own literal type, so a naive same-type hook signature would force the Hindi file to contain the *same English words*. `LocaleShape<T>` (`src/lib/localeShape.ts`) widens literals to their base type while preserving structure, and — the real fix, found only after `tsc` still failed at call sites — the widening has to live in the hook's own signature (`hi: LocaleShape<T>`), not on the calling side, since TypeScript's generic inference does not auto-widen a second argument to match a wider common type. A new `content/ui.en.ts` / `ui.hi.ts` pair holds cross-cutting microcopy (page titles, button labels, aria-labels, form validation messages, empty states) that lived directly in component JSX rather than a content object — translating only the page-copy content files would have left every button and error message in English.

**Known, accepted type trade-off.** `LocaleShape` widens *every* string leaf, including identifier fields that happen to be typed as string literal unions (`AssetKey` for image names, `LeadKind` for form-type values). Those are cast back at the point of use (see comments in `our-story/TribeWall.tsx`, `vas/DetailTiles.tsx`, `journal/PostCard.tsx`, `for-dealers/InquiryForm.tsx`, `contact/InquiryForm.tsx`) rather than making `LocaleShape` smarter, since both locale files carry the exact same identifier values by construction — asset keys and lead-kind values are never translated.

**Typography.** `:lang(hi)` CSS overrides (`src/styles/globals.css`) switch headings and eyebrows to `--font-deva` (Noto Serif Devanagari) and drop uppercase/wide-tracking, since Devanagari has no case concept and Playfair Display has no Devanagari glyphs at all. Relies on the real `lang` HTML attribute (set via `<Head><html lang=.../></Head>` in `RootLayout`), which every screen reader also needs for correct pronunciation regardless of this styling. The etymology moment on `/our-story` (सावयव, वस्) is kept byte-identical in both locale files — it is Devanagari on the English build too, not a translation.

**SEO.** `hreflang` alternates (`en`, `hi`, `x-default`) and `og:locale` emitted per-page via `Seo.tsx`, which resolves the brand name/tagline through the same locale-aware hook so the `<title>` tag is genuinely translated, not just the body copy. `scripts/sitemap.mjs` emits both locale URLs per canonical page with `xhtml:link` hreflang alternates (32 URLs: 16 pages × 2 locales).

**Verified, not assumed:** `npm run typecheck` and `npm run build` both clean; `dist/` contains all 17 English + 17 Hindi pages (`dist/hi/404.html`, `dist/hi/collections/:slug` × 5, `dist/hi/journal/:slug` × 4 included). In the browser: `/hi` renders fully in Hindi including the `<title>` tag, `document.documentElement.lang` is `"hi"`, a category page's `<h1>` computes to Noto Serif Devanagari via the `:lang(hi)` rule, the EN/IN toggle switches language while staying on the same logical page (tested from `/hi/contact` and from a 404 on `/hi/nonexistent-page`, both correctly delocalizing/relocalizing), a journal post's related-posts and date formatting (`hi-IN` locale) resolve correctly, and every internal `<Link>` built from content (`cta.to` fields, category/journal slugs, nav items) now round-trips through `localizePath` so navigating while in Hindi never silently drops back to English.

**Not done, explicitly flagged:** the translation itself is machine-assisted and has not been reviewed by a native Hindi speaker — structurally and grammatically sound, but should get a fluency pass before launch, same caution already applied to the English placeholder content (each `.hi.ts` file repeats this warning in its own header comment). `i18next`/`react-i18next` (wired in Phase 1, never actually called) were uninstalled and replaced by this purpose-built mechanism, since the real architecture — typed content objects imported directly — never needed string-key translation in the first place.

**Phase 5, backend/CMS — still deferred, on your signal**
Backend + CMS. Forms transmit. Catalogue becomes editable.

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
