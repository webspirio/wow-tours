# Proposal page — design

**Date:** 2026-05-13
**Source content:** `05-pricing-tiers.md` (4-tier menu: Quick Launch / CMS Edition / Sales Engine / Full Stack)
**Reference design:** `travel-crm` repo, branch `gh-pages-mocks`, path `src/pages/proposal/`
**Status:** approved by user, ready for implementation plan

## Goal

Build a public, single-scroll, sales-oriented proposal page for the WOW Tours project, served alongside the existing tour-demo landing. The page presents the 4-tier offering as a menu, with CMS Edition (€6 900) visually featured as the recommended tier. The reader should be able to:

1. Decide which tier fits within ~5 minutes of scrolling.
2. See exactly what they get, what they don't, and what it costs over time.
3. Reach a calendar booking link or Telegram from any point on the page.
4. Click through to a live demo of what Tier 1 produces, with a clear caveat that the demo is illustrative.

## Non-goals

- No CMS, no dynamic data, no API. All content is static and lives in `proposal-data.js`.
- No analytics, A/B testing, or instrumentation.
- No internationalization. Single language: Ukrainian.
- No SEO work beyond a reasonable `<title>` and `<meta description>`. This URL is shared via direct link, not discovered via search.
- No unit tests. Verification is browser-based (see Testing).
- No new dependencies. The existing stack (React 19, Vite, Tailwind v4, motion, lucide-react, the shadcn-style primitives in `src/components/ui/`) covers everything.

## Architecture

### Routing

Hash-based routing inside `src/main.jsx`. Two routes:

- `#/` (or no hash) → existing `<Landing/>` (tour demo)
- `#/proposal` → new `<ProposalPage/>`

Implementation: `main.jsx` reads `location.hash` on mount, listens to `hashchange`, and renders the matching root component. Unknown hashes fall back to `<Landing/>`.

Rationale for hash over path-based routing: Vite is configured with `base: '/wow-tours/'` for GitHub Pages deployment. Path routes would require a `404.html` SPA fallback. Hash routes work zero-config and the proposal is shared as a direct link, not a search target. The aesthetic cost (`#/proposal`) is acceptable.

### File layout

New files:

```
src/
  proposal.jsx                                  # <ProposalPage/> root
  components/proposal/
    fade-in.jsx                                 # whileInView wrapper (ported from travel-crm)
    section-header.jsx                          # numbered SectionHeader (ported, simplified)
    sections/
      hero.jsx
      framing.jsx                               # "Чому WOW Tours" — short
      tiers.jsx                                 # 4 cards, CMS featured
      comparison.jsx                            # full matrix
      hosting.jsx                               # хостинг + підтримка
      whats-included.jsx                        # universal benefits
      add-ons.jsx                               # додаткові послуги
      terms.jsx                                 # умови співпраці
      not-included.jsx                          # що ми НЕ робимо
      next-steps.jsx                            # наступні кроки + CTA
      footer.jsx                                # contacts
  components/sections/
    demo-banner.jsx                             # banner shown atop the tour landing
  lib/
    proposal-data.js                            # source of truth for all page content
```

Modified files:

```
src/main.jsx                                    # hash-based route switch
src/landing.jsx                                 # render <DemoBanner/> at top
src/styles/globals.css                          # @media print rules, scroll-mt-* utilities
index.html                                      # <title> kept; meta description left as-is
```

### Data shape (`src/lib/proposal-data.js`)

```js
export const PROPOSAL_META = {
  date: '2026-05-13',
  validUntil: '2026-06-13',
  currency: 'EUR',
  contact: {
    calendar: 'https://calendar.app.google/Faf8t6fmr8canNLf6',
    telegram: '@swefd',
    telegramUrl: 'https://t.me/swefd',
    phoneDisplay: '+49 151 24130699',
    phoneHref: 'tel:+4915124130699',
  },
};

export const TIERS = [
  {
    id: 'quick-launch',
    name: 'Quick Launch',
    icon: 'Rocket',
    price: 4500,
    forWho: 'перевірити концепцію та зібрати перші заявки за 2–3 тижні',
    bullets: [ /* 5–6 strongest, condensed from doc */ ],
    fullBullets: [ /* full doc list, behind an Accordion */ ],
    notIncluded: ['Адмін-панель…', 'CRM…', 'Прийом онлайн-оплат', 'Мультимовність'],
    timeline: '2–3 тижні',
    hosting: 50,
    hostingGift: '1 міс',
    support: '30 днів',
    recommended: false,
  },
  {
    id: 'cms-edition',
    name: 'CMS Edition',
    icon: 'LayoutDashboard',
    price: 6900,
    forWho: 'масштабуватись з 4 на 10+ турів власноруч, без участі розробника',
    bullets: [...],
    fullBullets: [...],
    notIncluded: ['CRM-система', 'Прийом оплат', 'Мультимовність'],
    timeline: '5–6 тижнів',
    hosting: 80,
    hostingGift: '1 міс',
    support: '60 днів',
    recommended: true,                          // featured tier
  },
  {
    id: 'sales-engine',
    name: 'Sales Engine',
    icon: 'Workflow',
    price: 10500,
    forWho: '...',
    bullets: [...],
    fullBullets: [...],
    notIncluded: ['Прийом оплат на сайті', 'Мультимовність'],
    timeline: '7–8 тижнів',
    hosting: 80,
    hostingGift: '1 міс',
    support: '90 днів',
    recommended: false,
  },
  {
    id: 'full-stack',
    name: 'Full Stack',
    icon: 'Layers',
    price: 16500,
    forWho: '...',
    bullets: [...],
    fullBullets: [...],
    notIncluded: [],                            // tier 4 includes everything
    timeline: '10–12 тижнів',
    hosting: 120,
    hostingGift: '3 міс',
    support: '6 місяців',
    recommended: false,
  },
];

export const COMPARISON_GROUPS = [
  {
    label: 'Контент',
    rows: [
      { feature: 'Кількість турів', values: ['1–2', 'до 50+', 'до 50+', 'необмежено'] },
      { feature: 'CMS — самостійне редагування', values: ['—', '✅', '✅', '✅'] },
      { feature: 'Шаблон, новий тур за 30 хв', values: ['—', '✅', '✅', '✅'] },
      { feature: 'Тренінг для редакторів', values: ['—', '1 год', '2 год', '2 год'] },
    ],
  },
  { label: 'Заявки і ціни', rows: [...] },
  { label: 'Продажі', rows: [...] },
  { label: 'Платежі і мови', rows: [...] },
  { label: 'Підтримка', rows: [...] },
  { label: 'Ціна і термін', rows: [...] },     // last group ends with the discrete prices row
];

export const HOSTING_TIERS = [
  { plan: 'Тариф 1', monthly: 50, monthlyHours: '30 хв', features: {...} },
  { plan: 'Тарифи 2–3', monthly: 80, monthlyHours: '1 година', features: {...} },
  { plan: 'Тариф 4', monthly: 120, monthlyHours: '2 години', features: {...} },
];

export const ADD_ONS = [
  { service: 'Додаткова мова інтерфейсу (після першої)', price: '€1 500 за мову' },
  // ... all 10 rows from doc
];

export const UNIVERSAL_BENEFITS = [
  { icon: 'UserRound', label: 'Особисте управління проектом' },
  { icon: 'Video', label: 'Щотижневі демо у Zoom (15 хв)' },
  // ... 6 total
];

export const TERMS = {
  paymentSchedule: [
    { stage: '50%', when: 'на старті', detail: 'після підписання договору' },
    { stage: '30%', when: 'після першого етапу', detail: 'демо-середовище з робочим функціоналом' },
    { stage: '20%', when: 'після запуску', detail: 'фінальний запуск і прийняття' },
  ],
  contract: [...],
  changeRequests: '...',
  workflow: [
    'Підпис договору + перша оплата → старт через 3 робочі дні',
    'Щотижневі демо у Zoom (15 хв)',
    'Спільний канал у Telegram / Slack',
    'Перед здачею — повне тестування у присутності замовника',
  ],
};

export const NOT_INCLUDED = [
  'Створення контенту: написання текстів, фотозйомка, відео-відгуки',
  'Платний трафік (Google Ads / Meta Ads)',
  // ... 6 total from doc
];

export const NEXT_STEPS = [
  'Обираєте тариф (або просите модифікацію — комбінації можливі)',
  'Підписуємо договір (зразок надішлемо на прохання)',
  'Перша оплата 50% → старт розробки через 3 робочі дні',
  'Через 2–12 тижнів → ваш сайт у продакшені',
];
```

The data file is the single source of truth. Copy edits to the proposal touch only this file.

## Page composition

`src/proposal.jsx`:

```jsx
export default function ProposalPage() {
  useEffect(() => { document.title = 'WOW Tours — Комерційна пропозиція'; }, []);
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Hero />
      <Framing />        {/* section 1 */}
      <Tiers />          {/* section 2 — centerpiece */}
      <Comparison />     {/* section 3 */}
      <Hosting />        {/* section 4 */}
      <WhatsIncluded />  {/* section 5 */}
      <AddOns />         {/* section 6 */}
      <Terms />          {/* section 7 */}
      <NotIncluded />    {/* section 8 */}
      <NextSteps />      {/* section 9 */}
      <Footer />
    </div>
  );
}
```

Each section is `mx-auto max-w-4xl px-4 py-16 lg:px-6 lg:py-24` and gets a stable `id="section-N"` for scroll-targeting + `scroll-mt-24` to clear sticky elements. **Exception:** the Tiers section uses `max-w-6xl` so the 4-up card grid can breathe on desktop.

## Section-by-section spec

### Hero (`sections/hero.jsx`)

- Subtle radial gradient background (`bg-[radial-gradient(60%_50%_at_50%_0%, …)]`), `print:hidden`.
- Top: `<Badge variant="outline">WOW Tours · Комерційна пропозиція</Badge>`.
- Sub-line: `2026-05-13 · дійсна до 2026-06-13 · EUR без ПДВ` (muted, small).
- H1: *Чотири варіанти запуску — від MVP до повноцінної платформи* (font-heading, balanced, tight).
- Subhead: *Кожен тариф включає все з попереднього + нові можливості. Виберіть стартову точку — масштабуєтесь коли готові.*
- 4 KPI chips (Quick Launch €4 500 / CMS Edition €6 900 / Sales Engine €10 500 / Full Stack €16 500). Clicking a chip smooth-scrolls to the matching tier card via `id`. `grid-cols-2 lg:grid-cols-4`.
- CTA row:
  - Primary: *Записатись на 30-хв дзвінок* → calendar URL.
  - Secondary: *Подивитись живе демо* → `#/` (the tour landing).
  - Ghost: *Прокрутити деталі* → smooth-scrolls to `#section-1`.
  - All `print:hidden`.
- Bottom microcopy (optional, from `proposal-data.js` so it can be tuned without a JSX edit): a single uppercase tracking line positioning the offer against typical agency pricing. Default text TBD by the user before launch — leave the slot wired but the default string empty if no number is approved.
- Motion: staggered `motion.div` fade+rise, delays 0/0.1/0.2/0.3/0.4 (matches reference hero).

### Section 1 — Framing (`sections/framing.jsx`)

- Title: *Чому це не "новий продукт"*.
- ~80-word paragraph: WOW Tours is a paused-but-validated business. We're rebuilding on a modern stack — not launching from zero. Same legal entity, same brand, faster path to revenue. An agency analogue would be 6+ months and €40k+; we deliver 2–12 weeks depending on chosen tier.
- Cuttable in 5 minutes if a future edit removes it.

### Section 2 — Tiers (`sections/tiers.jsx`)

- Section header: `2 — Чотири тарифи`.
- 4-card grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch`.
- Each card (`TierCard`):
  - Container: `relative flex flex-col rounded-2xl border bg-card/60 p-6 ring-1 ring-foreground/5`.
  - If `recommended`: extra ring (`ring-foreground/30`), `bg-card/80`, `lg:scale-[1.02]`, top-right pill `★ Рекомендуємо`.
  - Tier name with lucide icon (`Rocket`/`LayoutDashboard`/`Workflow`/`Layers`).
  - Tagline (`forWho`) muted, one line.
  - Price block: large `€X XXX` + small "разово" below.
  - Divider.
  - Bullet list — the condensed `bullets` array. Each bullet has a small `Check` icon.
  - `<Accordion>` "Подивитись повний список" → `fullBullets`.
  - "Що НЕ входить" muted block with X-icon bullets (omitted for Full Stack since `notIncluded` is empty).
  - Footer row: `📅 {timeline}` · `🖥️ хостинг €{hosting}/міс (перший {hostingGift} у подарунок)`.
  - Two actions: primary `<Button>Обрати тариф` (scrolls to `#section-9` Next Steps), ghost link *Подивитись живе демо →* (`#/`).
- Cards wrapped in `<FadeIn delay={i*0.06}>`.

### Section 3 — Comparison (`sections/comparison.jsx`)

- Section header: `3 — Порівняння можливостей`.
- Single table built from `COMPARISON_GROUPS`. Sub-headers between groups (full-width `<tr>` with muted bg).
- Header row: `Можливість | Quick Launch | CMS Edition | Sales Engine | Full Stack`.
- CMS Edition column: `bg-muted/30`.
- Mobile: outer `div className="overflow-x-auto"`, table `min-w-[760px]`. First column `position: sticky; left: 0; bg-background z-10` with right border. Right edge of the wrapper carries a fade-mask hint.
- Below the table, a one-line reassurance: *"Перейти на вищий тариф можна будь-коли — контент і дані зберігаються."* (No timeline promised; tier-to-tier upgrade duration depends on the source and target tier.)

### Section 4 — Hosting (`sections/hosting.jsx`)

- Section header: `4 — Хостинг + підтримка сайту`.
- Lead paragraph from doc.
- Pricing comparison table (3 columns) — `HOSTING_TIERS` from data.
- 3-up card row below the table:
  - **Як це працює** — Telegram-flow paragraph.
  - **Подарунок на старті** — 1 міс / 3 міс gifts.
  - **Ваші дані — ваші** — escape clause / export-on-demand commitment.
- Note line: *Більше годин? Dev-retainer €280/міс (5 год) або €30/год.*

### Section 5 — What's included in any tier (`sections/whats-included.jsx`)

- Section header: `5 — Що включено у будь-який тариф`.
- 2×3 grid of icon-chip cards, content from `UNIVERSAL_BENEFITS`.

### Section 6 — Add-ons (`sections/add-ons.jsx`)

- Section header: `6 — Додаткові послуги`.
- 2-column table (послуга / ціна) — all 10 rows from `ADD_ONS`.
- Footnote: *"Будь-яку опцію можна додати після старту — оцінимо письмово."*

### Section 7 — Terms (`sections/terms.jsx`)

- Section header: `7 — Умови співпраці`.
- 4-up grid (responsive: `grid-cols-1 md:grid-cols-2`):
  - **Графік платежів** — three rows 50/30/20 with stage/when/detail.
  - **Договір** — bullet list (5 items).
  - **Зміни в обсязі (change requests)** — paragraph.
  - **Робочий процес** — 4-step numbered list.
- One closing line on warranty: *"Гарантійний період — виправлення помилок безкоштовно протягом терміну технічної підтримки (30 / 60 / 90 / 180 днів залежно від тарифу)."*

### Section 8 — What we don't do (`sections/not-included.jsx`)

- Section header: `8 — Що ми НЕ робимо`.
- Bullet list of 6 items from `NOT_INCLUDED` with muted X icon.
- One-line softener: *"Готові порекомендувати перевірених підрядників за кожним пунктом."*

### Section 9 — Next steps (`sections/next-steps.jsx`)

- Section header: `9 — Наступні кроки`.
- 4 numbered cards (one per step from `NEXT_STEPS`).
- Big CTA panel at the bottom: rounded card with *"Готові обговорити деталі?"* + Calendar (primary) + Telegram (outline) + Phone (ghost). `print:hidden`.

### Footer (`sections/footer.jsx`)

- Centered, max-w-4xl.
- Three contact buttons (Calendar / Telegram / Phone) — same hrefs as travel-crm reference.
- Validity line: *"Пропозиція дійсна 30 днів з дати створення. Усі ціни в EUR, без ПДВ."*
- © 2026 line.

### Demo banner (`components/sections/demo-banner.jsx`)

- Slim strip at the top of `<Landing/>` only (above `<Header/>`).
- `bg-amber-50/70 border-b border-amber-200/60 text-amber-950 text-sm`. (Dark mode equivalents kept in the same class string.)
- Content: *"Це швидке демо тарифу Quick Launch. Фінальний сайт може виглядати інакше — функції залежать від обраного тарифу."*
- Right-aligned link: *"← Повернутись до пропозиції"* → `#/proposal`.
- Mobile: text wraps; link drops to a second row.
- Not dismissible.

## Visual system

- Container width: `max-w-4xl` for all narrative sections (matches reference). Tier cards section gets `max-w-6xl` to give the 4-up grid room to breathe.
- Font: `font-heading` (DM Serif Display, already loaded via `index.html`) for h1/h2; default sans for body.
- Numbered section headings: large light-weight numeral on the left (`text-5xl lg:text-7xl text-muted-foreground/60`), title to the right.
- Colors: rely on existing CSS variables. No new palette.
- Borders: `border` (current theme), rings `ring-1 ring-foreground/5` for cards, `ring-foreground/30` for the recommended tier card.
- Subtle radial gradient on the hero only.

## Animation

- Single primitive `<FadeIn>` (whileInView, 0.5s, 16px y, easeOut, `once: true`, viewport margin `-60px`).
- Hero uses explicit-delay `motion.div`s (0/0.1/0.2/0.3/0.4).
- Tier cards cascade in via `delay={i * 0.06}`.
- No parallax, marquee, aurora — the existing `components/effects/` is for the marketing landing and does not belong on a sales document.

## Responsive

- Phone (360–639): everything stacks. Tier cards 1-column. KPI chips 2×2. Comparison table scrolls horizontally with sticky first column.
- Tablet (640–1023): tier cards 2×2 (`md:grid-cols-2`). Most other sections behave as desktop.
- Desktop (≥1024): tier cards 4-up (`lg:grid-cols-4`). Recommended tier gets `lg:scale-[1.02]`.

## Print

- `@media print` rules in `globals.css`:
  - Hide hero gradient, all `.print\:hidden` elements (CTAs).
  - Force `background: white; color: black` on `body`.
  - `break-inside: avoid` on tier cards and section blocks.
  - Comparison table `font-size: 0.75rem`.
- Page should render readably as PDF via Cmd-P → Save as PDF. Footer contacts must remain visible (they're the takeaway).

## Error handling and edge cases

- Hash router: unrecognized hash → `<Landing/>`.
- All external links: `target="_blank" rel="noopener noreferrer"`.
- No fetches, no async state — failure modes are limited to "link is broken" which is a content fix, not a code fix.
- The Accordion (UI component) gracefully handles being closed by default; no a11y regressions.

## Testing

This is a content/marketing page. Verification is visual + behavioral, not unit-tested.

1. `npm run dev` → walk `#/`, `#/proposal`, and the demo banner link in both directions.
2. Resize sweep at 360 / 768 / 1280 / 1920 px. Tier cards readable; comparison table scrolls horizontally on mobile.
3. Cmd-P print preview from Chrome — CTAs hidden, no card splits across pages, comparison fits A4.
4. `npm run build && npm run preview` — clean build, no console errors.
5. Spot-check Safari on a phone if available (motion's `whileInView` has known quirks there).

No unit tests, no e2e. The verification is "open it and read it" — performed by the implementer in a browser before reporting done.

## Implementation order

1. **Routing + shell.** Hash router in `main.jsx`, empty `<ProposalPage/>`, `<DemoBanner/>` added to `<Landing/>`. Walk routes end-to-end.
2. **Shared primitives.** `FadeIn`, `SectionHeader`.
3. **Data.** `proposal-data.js` populated verbatim from `05-pricing-tiers.md`.
4. **Sections in reading order.** Hero → Framing → Tiers → Comparison → Hosting → WhatsIncluded → AddOns → Terms → NotIncluded → NextSteps → Footer.
5. **Responsive + print polish.** Mobile sweep, print preview pass, scroll-target sanity check.
6. **Browser walk.** Spend ≥10 minutes reading the actual page; fix what's awkward.

## Acceptance criteria

- `#/proposal` renders all 11 sections (hero + 9 + footer) without console errors.
- `#/` renders the unchanged tour landing with a demo banner above the header linking back to the proposal.
- Hero KPI chip clicks scroll to the matching tier card; tier card "Обрати тариф" buttons scroll to Next Steps.
- Recommended badge appears on CMS Edition only.
- Comparison matrix renders all groups; the first column is sticky on horizontal scroll.
- Calendar, Telegram, Phone links open the correct destinations from the hero, Next Steps panel, and footer.
- Cmd-P preview produces a readable PDF with no broken cards and no visible CTAs.
- `npm run build` succeeds with no errors or warnings introduced by this work.
