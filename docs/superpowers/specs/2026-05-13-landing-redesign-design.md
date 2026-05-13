# Landing Page Redesign — Design Spec

> **Topic**: Redesign WOW Tours single-tour landing (Tier 1 MVP) from
> inline-styles React to modern Bold Adventure aesthetic using shadcn/ui +
> Aceternity + Magic UI + motion/react.
> **Date**: 2026-05-13
> **Status**: Approved (user gave blanket approval to execute full lifecycle)

---

## 1. Goals

Replace the current inline-styles landing (`src/landing.jsx`) with a modern,
animated, conversion-optimized single-tour landing page that:

1. Embodies **Bold Adventure** design direction (energetic, gradient, animated)
2. Uses **WOW Original** palette: `#7c3aed` violet · `#ec4899` pink · `#fbbf24` yellow · `#1a1a2e` deep ink · `#fafaf8` off-white
3. Uses **DM Serif Display + DM Sans** typography
4. Has **Medium animation density** (3 wow-moments, ~50 KB JS overhead, mobile-friendly)
5. Demonstrates Tier 1 deliverable to client: one tour (Iceland) with TP-widget-style dynamic prices
6. Builds clean, deploys to GitHub Pages via existing workflow
7. Ships in ~10 work-day equivalents using Claude Code velocity

## 2. Non-goals

- Real Travelpayouts integration (mock data; widget integration is part of actual Tier 1 implementation, not this redesign)
- Backend / Cloudflare Function for form (UI-only)
- Multi-tour catalog (Tier 2 scope)
- Directus / CMS integration (Tier 3 scope)
- Multi-language (Ukrainian only)
- Tests beyond build + Lighthouse pass (presentational components only)

## 3. Architecture

```
src/
├── components/
│   ├── ui/                    ← shadcn primitives (button, card, accordion, badge, input, form, label, separator)
│   ├── effects/
│   │   ├── aurora-background.jsx     ← Aceternity AuroraBackground (animated gradient)
│   │   ├── tracing-beam.jsx          ← Aceternity TracingBeam (SVG scroll-line)
│   │   ├── number-ticker.jsx         ← Magic UI NumberTicker (animated count-up)
│   │   ├── marquee.jsx               ← Magic UI Marquee (infinite scroll)
│   │   └── flip-words.jsx            ← Aceternity FlipWords (rotating words)
│   └── sections/
│       ├── header.jsx                ← sticky top nav + CTA
│       ├── hero.jsx                  ← AuroraBackground + headline + meta + CTA
│       ├── prices.jsx                ← Card grid with NumberTicker
│       ├── included.jsx              ← 2-column "what's included / not"
│       ├── itinerary.jsx             ← TracingBeam + 7 day cards
│       ├── testimonials.jsx          ← Marquee strip
│       ├── booking.jsx               ← shadcn Form with name/phone/city
│       ├── footer.jsx                ← clean footer with logo + contacts
│       └── sticky-cta.jsx            ← floating CTA after hero scroll
├── lib/
│   ├── utils.js               ← shadcn `cn()` helper
│   └── tour-data.js           ← all mock data (tour, prices, itinerary, testimonials)
├── styles/
│   └── globals.css            ← Tailwind v4 import + @theme tokens + custom keyframes
├── main.jsx                   ← React entry (mostly unchanged)
└── landing.jsx                ← top-level composition of sections
```

**Module boundaries:**
- `components/ui/*` — copied verbatim from shadcn CLI; never edit directly
- `components/effects/*` — copied from Aceternity/Magic UI; light customizations
- `components/sections/*` — our composition, freely editable
- `lib/tour-data.js` — single source of truth for mock content
- No cross-section imports; sections only import from `ui/`, `effects/`, and `lib/`

## 4. Tech stack additions

| Package | Purpose | Notes |
|---|---|---|
| `tailwindcss@^4` | Styling | v4 — zero-config, `@theme` block in CSS |
| `@tailwindcss/vite` | Vite plugin | replaces `tailwind-postcss` |
| `tailwindcss-animate` | Animations | shadcn dependency |
| `class-variance-authority` | Variant API | shadcn dependency |
| `clsx`, `tailwind-merge` | `cn()` helper | shadcn utilities |
| `motion` | Animation | `motion/react` import (formerly framer-motion) |
| `lucide-react` | Icons | shadcn default |
| `@radix-ui/react-slot`, `@radix-ui/react-accordion`, etc. | Primitives | as needed by shadcn components |
| `react-hook-form` | Form state | for booking form |
| `zod`, `@hookform/resolvers` | Validation | shadcn Form pattern |

## 5. Design tokens (Tailwind v4 `@theme` block)

```css
@theme {
  --color-violet: #7c3aed;
  --color-violet-dark: #5b21b6;
  --color-pink: #ec4899;
  --color-yellow: #fbbf24;
  --color-ink: #1a1a2e;
  --color-paper: #fafaf8;
  --color-mute: #6b7280;
  --color-border: #e5e7eb;

  --font-display: "DM Serif Display", Georgia, serif;
  --font-body: "DM Sans", system-ui, sans-serif;

  --shadow-violet: 0 4px 30px rgb(124 58 237 / 0.25);
  --shadow-pink: 0 4px 30px rgb(236 72 153 / 0.25);
  --shadow-yellow: 0 4px 30px rgb(251 191 36 / 0.4);
}
```

## 6. Section-by-section design

### Header
Sticky, transparent over hero → solid white after scroll. Logo (DM Serif Display, violet→pink gradient text) + nav + "Залишити заявку" CTA button.

### Hero
- Background: **Aceternity AuroraBackground** with custom violet/pink/yellow gradient cycle
- Badge: "Найкращий маршрут року" pill, yellow on dark
- Headline: DM Serif Display, ~80-100px desktop / clamp(40px, 8vw, 100px). Two lines: "Iceland" + italic "awaits."
- Sub: FlipWords cycling between "вулканів · льодовиків · гейзерів · північного сяйва"
- Meta row: "7 днів" · "виліт з 4 міст" · "від €420"
- CTA: yellow button "Хочу в цей тур →" with shadow-yellow glow on hover

### Prices
- Section title: "Живі ціни на авіаквитки"
- Lede: "Вартість змінюється щодня. Обирайте місто і дату."
- Update badge: "Оновлено 10 хв тому · Travelpayouts"
- Grid: 4 city cards (Київ, Львів, Одеса, Варшава), each showing 3 date-window prices
- NumberTicker animates count-up on scroll-into-view
- Cheapest price per city highlighted: yellow ring + "мін" badge
- 3D card tilt on hover (subtle, motion/react)

### Included
2-column: "У вартість входить" (green checks) vs "Окремо оплачуєте" (red crosses). Cards with subtle gradient borders on hover.

### Itinerary
- Section title: "Програма туру"
- **Aceternity TracingBeam**: SVG line draws on scroll down right side
- 7 day-cards in vertical stack: "День 1 · Прибуття в Рейк'явік" + description
- Each card reveals with fade-in-from-bottom on scroll into view

### Testimonials
- Section title: "Відгуки наших туристів"
- **Magic UI Marquee**: 2 rows of testimonial cards, top row scrolls right, bottom row left, infinite loop
- Pause on hover
- Each card: quote + name + city

### Booking
- Background: violet→pink gradient
- Form: name / phone / city select / "Залишити заявку" button
- Uses `shadcn/ui Form` + react-hook-form
- Submit shows success toast (UI-only, no backend in this scope)

### Footer
- Logo + tagline
- 3 contact items: phone / email / Telegram
- Bottom: copyright + "Mock демонстрація Tier 1"

### Sticky CTA
- After hero scrolls out of view, small floating "Хочу в цей тур" button bottom-right
- Uses motion/react `useScroll` + `useTransform`
- Hidden on mobile (sticky CTA UX is poor on small screens)

## 7. Animation strategy

Motion budget: **3 wow-moments, all CSS+motion/react, no GIFs, no videos**.

| Effect | Library | Where | Bundle add |
|---|---|---|---|
| Aurora gradient bg | Aceternity | Hero only | ~8 KB |
| FlipWords rotator | Aceternity | Hero sub-headline | ~3 KB |
| NumberTicker count-up | Magic UI | Price cards | ~5 KB |
| TracingBeam scroll-line | Aceternity | Itinerary | ~10 KB |
| Marquee infinite scroll | Magic UI | Testimonials | ~4 KB |
| Reveal-on-scroll fade | motion/react | All sections | ~15 KB (motion core) |
| Hover transitions | Tailwind | Everywhere | ~0 (CSS) |
| **Total motion JS** | | | **~50 KB gzipped** |

## 8. Testing strategy

For a presentational landing with no business logic, formal unit tests are overkill. Verification consists of:

1. **Build passes**: `npm run build` exits 0
2. **Bundle size budget**: total JS ≤ 280 KB gzipped (current 66 KB → target ≤ 280 KB after redesign)
3. **Lighthouse Performance ≥ 85 mobile**, **SEO ≥ 90**, **Accessibility ≥ 95**
4. **Manual visual QA**: tested across mobile (375), tablet (768), desktop (1280) viewports
5. **Cross-browser smoke**: Chrome + Safari + Firefox latest
6. **Form interaction**: name/phone/city fields work, validation triggers, success state shows

No Vitest. No Playwright. Adding test infra here would be ceremony without value.

## 9. Error handling

This is a static landing — error surface is minimal:
- Form validation (zod schema, inline error messages)
- Form submission (UI-only — show success state regardless, since no backend)
- Image loading fallbacks (Unsplash CDN; if image fails, gradient fallback via CSS `background`)
- Aceternity components have no error states (decorative only)

## 10. Deployment

Unchanged from current setup:
- `vite.config.js` `base: '/wow-tours/'`
- GitHub Actions workflow at `.github/workflows/deploy.yml`
- Deploys to `gh-pages` artifact via official `actions/deploy-pages@v4`
- Available at `https://<user>.github.io/wow-tours/` after push to `main`

## 11. Out of scope (documented to prevent scope creep)

- Real flight price integration (Travelpayouts widget or API)
- Backend lead processing (Cloudflare Function, Telegram bot)
- CMS / Directus integration
- Multi-tour catalog or routing
- Multilingual (RU, EN)
- User authentication
- Admin panel
- PWA / offline support
- A/B testing infrastructure
- Analytics events beyond GA4 page view

## 12. Migration approach

**Section-by-section migration** (Approach B from brainstorming):

Day-level plan:
- **Day 1**: Tailwind v4 + shadcn init + design tokens + lib/utils.js + lib/tour-data.js
- **Day 2**: Header + Hero (AuroraBackground + FlipWords)
- **Day 3**: Prices section (Card + NumberTicker)
- **Day 4**: Included + Itinerary (TracingBeam + Accordion)
- **Day 5**: Testimonials (Marquee) + Booking (Form)
- **Day 6**: Footer + Sticky CTA + scroll-reveal polish
- **Day 7**: Lighthouse pass + responsive QA + bug fixes + final commit

In Claude Code velocity these "days" collapse to single agent runs.

## 13. Acceptance criteria

The redesign is complete when:

- [ ] All 8 sections (header, hero, prices, included, itinerary, testimonials, booking, footer) replaced with new shadcn-based components
- [ ] All 3 wow-effects functional: AuroraBackground, TracingBeam, Marquee
- [ ] Tailwind v4 fully replaces inline styles (no `style={{ ... }}` props except for dynamic values)
- [ ] DM Serif Display + DM Sans applied consistently
- [ ] WOW Original palette applied via Tailwind theme tokens
- [ ] `npm run build` exits 0, bundle ≤ 280 KB gzipped
- [ ] Lighthouse ≥ 85 Performance / 90 SEO / 95 Accessibility on `npm run preview` mobile profile
- [ ] Visually consistent on 375 / 768 / 1280 viewport widths
- [ ] Booking form has working validation and success state
- [ ] No console errors on page load or interaction
- [ ] All files in repo committed; spec doc itself committed

## 14. Risk register

| Risk | Mitigation |
|---|---|
| Aceternity components don't compose cleanly with shadcn | Test composition early (Day 1); fall back to custom components if needed |
| Bundle exceeds 280 KB | Lazy-load Aceternity components via React.lazy if needed |
| AuroraBackground performance on low-end mobile | Add `prefers-reduced-motion` check; static gradient fallback |
| DM Serif Display doesn't read at huge sizes | Test on actual hero size; fall back to Georgia |
| Tailwind v4 still has rough edges | Pin to known-stable version; have v3 escape hatch ready |
| Marquee causes layout shifts | Pre-set container height; use `will-change: transform` |

## 15. Open questions (resolve during execution)

- Real photo URLs: Unsplash placeholders for now; if client provides photos before completion, swap them in
- Telegram contact: placeholder `@wowtours`; real handle TBD on Discovery
- Domain: deploys to `<user>.github.io/wow-tours/` for now; real domain TBD
