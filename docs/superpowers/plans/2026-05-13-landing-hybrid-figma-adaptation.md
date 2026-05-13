# Landing Hybrid (Figma Adaptation) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adapt the current Bold-Adventure landing (AuroraBackground + TracingBeam + Marquee aesthetic) with key visual patterns from the client's Figma «Multi-day tour» design — keeping the modern motion identity while adding photo-heavy + travel-agency-style sections.

**Architecture:** Continue on existing stack (React 19 + Vite 6 + Tailwind v4 + shadcn + Aceternity + Magic UI + motion/react). Add **photo content, pink-pill section dividers, quick-info icon row, accommodation gallery, trust-steps row, video testimonials grid, floating booking widget on hero, purple footer**. Preserve AuroraBackground in hero (as overlay over destination photo), keep TracingBeam in itinerary (now with photos per day).

**Tech Stack:** No new deps. Use existing motion/react for new sections. Continue Unsplash for placeholder photos.

**Reference:** Original spec at `docs/superpowers/specs/2026-05-13-landing-redesign-design.md`. Previous plan (completed) at `docs/superpowers/plans/2026-05-13-landing-redesign.md`. Figma at `input/wow-weekend.com/Multi-day tour.jpg`.

---

## Context for a fresh session

The repo already has a working single-tour landing live at the React app rooted in `src/`. Run `npm run dev` to see current state. Key existing pieces (do NOT recreate):

- `src/styles/globals.css` — Tailwind v4 + `@theme` tokens (WOW palette + DM fonts + aurora/marquee keyframes + prefers-reduced-motion)
- `src/lib/utils.js` — `cn()` helper
- `src/lib/tour-data.js` — `TOUR`, `PRICES`, `INCLUDED`, `NOT_INCLUDED`, `ITINERARY`, `TESTIMONIALS`, `FLIGHT_PRICE_MIN`
- `src/components/ui/` — shadcn primitives: `button.jsx`, `card.jsx`, `badge.jsx`, `input.jsx`, `label.jsx`, `accordion.jsx`
- `src/components/effects/` — `aurora-background.jsx`, `flip-words.jsx`, `number-ticker.jsx`, `tracing-beam.jsx`, `marquee.jsx`
- `src/components/sections/` — `header.jsx`, `hero.jsx`, `prices.jsx`, `included.jsx`, `itinerary.jsx`, `testimonials.jsx`, `booking.jsx`, `footer.jsx`, `sticky-cta.jsx`
- `src/landing.jsx` — composes the sections
- `index.html` — SEO meta + JSON-LD already in place

Bundle as of plan creation: 154 KB gzip JS. Target after this plan: ≤ 220 KB gzip (adding photos doesn't add JS; only Unsplash URLs).

## What this plan adds vs the existing landing

| New element from Figma | Where it goes | Replaces/Augments |
|---|---|---|
| Pink-pill section divider | Before each major section | Replaces plain `<h2>` |
| Quick-info icon row (4 tiles) | Under hero | New section |
| Per-day photo in itinerary | Inside TracingBeam day cards | Augments — keeps TracingBeam |
| Accommodation gallery | After itinerary | New section |
| Trust-steps row (3 icons) | Before booking | New section |
| Video testimonials grid | Replaces text Marquee | Replaces (Marquee component stays for future use) |
| Floating booking widget in hero | Right side of hero | New — Hero gets reworked layout |
| Purple footer | Footer | Changes color only |
| Destination photo behind aurora | Hero background | Augments — aurora becomes 30% opacity overlay |

## Out of scope (do NOT do)

- Don't remove AuroraBackground component (still used in hero, just layered over photo)
- Don't remove TracingBeam (still used in itinerary)
- Don't remove FlipWords (still in hero subhead)
- Don't add Travelpayouts attribution anywhere (user explicitly removed this)
- Don't add real backend / API calls
- Don't add multi-language
- Don't add tests
- Don't change WOW palette colors or DM fonts
- Don't add new npm packages unless absolutely required (only Aceternity / Magic UI / motion are allowed; if none fits, use plain Tailwind+motion)

## File structure additions

```
src/
├── components/
│   ├── ui/
│   │   └── section-divider.jsx     ← NEW (pink-pill divider used everywhere)
│   ├── sections/
│   │   ├── quick-info.jsx          ← NEW (4 icon tiles under hero)
│   │   ├── accommodation.jsx       ← NEW (hotel photo grid)
│   │   ├── trust-steps.jsx         ← NEW (3-step row)
│   │   └── video-testimonials.jsx  ← NEW (replaces testimonials.jsx in landing.jsx)
│   └── effects/                    ← no changes
├── lib/
│   └── tour-data.js                ← MODIFIED (add accommodations, trustSteps, testimonialVideos, ITINERARY adds photo field)
└── landing.jsx                     ← MODIFIED (new section order + composition)
```

---

## Task H1: Tour-data additions (photos, accommodations, steps, videos)

**Files:**
- Modify: `src/lib/tour-data.js`

- [ ] **Step 1: Add per-day photos to ITINERARY**

Open `src/lib/tour-data.js`. Find `export const ITINERARY = [` and replace each day object to add a `photo` field. Use Unsplash URLs related to Iceland for each day:

```js
export const ITINERARY = [
  { day: 1, title: "Прибуття в Рейк'явік", desc: "Зустріч в аеропорту Кефлавік, трансфер у готель. Вечірня прогулянка центром столиці.", icon: "✈️", photo: "https://images.unsplash.com/photo-1452796302860-dfb52e74a9f3?w=800&q=80" },
  { day: 2, title: "Золоте кільце", desc: "Гейзер Strokkur, водоспад Gullfoss, національний парк Þingvellir.", icon: "💧", photo: "https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=800&q=80" },
  { day: 3, title: "Південне узбережжя", desc: "Водоспади Seljalandsfoss і Skógafoss, чорний пляж Reynisfjara.", icon: "🌊", photo: "https://images.unsplash.com/photo-1490650404312-a2175773bbf5?w=800&q=80" },
  { day: 4, title: "Льодовикові лагуни", desc: "Jökulsárlón — лагуна з айсбергами, Diamond Beach.", icon: "🧊", photo: "https://images.unsplash.com/photo-1486365227551-f3f90034a57c?w=800&q=80" },
  { day: 5, title: "Полярне сяйво", desc: "Денний відпочинок, ввечері — полювання на полярне сяйво (за погодою).", icon: "✨", photo: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&q=80" },
  { day: 6, title: "Блакитна лагуна", desc: "Геотермальні джерела Blue Lagoon, релакс перед від'їздом.", icon: "♨️", photo: "https://images.unsplash.com/photo-1531357531812-7f428f1b1311?w=800&q=80" },
  { day: 7, title: "Повернення", desc: "Трансфер в аеропорт, виліт додому.", icon: "🛬", photo: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80" },
];
```

- [ ] **Step 2: Add `QUICK_INFO` array (4 tiles for under-hero row)**

Append to `src/lib/tour-data.js`:

```js
export const QUICK_INFO = [
  { icon: "🗓", title: "7 днів", subtitle: "/ 6 ночей у Рейк'явіку" },
  { icon: "✈️", title: "4 міста вильоту", subtitle: "Київ · Львів · Одеса · Варшава" },
  { icon: "🚐", title: "Трансфери", subtitle: "З аеропорту і назад — включено" },
  { icon: "🛡️", title: "Страховка", subtitle: "Медична на весь період туру" },
];
```

- [ ] **Step 3: Add `ACCOMMODATIONS` array**

Append:

```js
export const ACCOMMODATIONS = [
  {
    name: "Reykjavík Lights Hotel 4*",
    city: "Рейк'явік",
    nights: 4,
    amenities: ["Wi-Fi", "Сніданок", "Центр міста", "Парковка"],
    photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  },
  {
    name: "Fosshotel Glacier Lagoon 3*",
    city: "Гофн",
    nights: 1,
    amenities: ["Wi-Fi", "Сніданок", "Вид на льодовик", "Ресторан"],
    photo: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
  },
  {
    name: "Hotel Klettur 3*",
    city: "Рейк'явік",
    nights: 1,
    amenities: ["Wi-Fi", "Сніданок", "Спа", "Бар"],
    photo: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80",
  },
];
```

- [ ] **Step 4: Add `TRUST_STEPS` array**

```js
export const TRUST_STEPS = [
  { icon: "Search", title: "Оберіть тур", desc: "Перегляньте напрям, дати, виліт і ціну. Все онлайн." },
  { icon: "Phone", title: "Залиште заявку", desc: "Менеджер передзвонить за 2 години та підбере оптимальну дату." },
  { icon: "Plane", title: "Летіть і відпочивайте", desc: "Ми бронюємо все самі. Ви отримаєте маршрут на email і у Telegram." },
];
```

- [ ] **Step 5: Add `TESTIMONIAL_VIDEOS` array**

```js
export const TESTIMONIAL_VIDEOS = [
  { name: "Ольга К.", city: "Київ", thumbnail: "https://images.unsplash.com/photo-1530841344095-502c3d2e0816?w=600&q=80", duration: "0:47" },
  { name: "Дмитро і Анна", city: "Львів", thumbnail: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=600&q=80", duration: "1:12" },
  { name: "Марія П.", city: "Одеса", thumbnail: "https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=600&q=80", duration: "0:34" },
  { name: "Андрій С.", city: "Дніпро", thumbnail: "https://images.unsplash.com/photo-1486365227551-f3f90034a57c?w=600&q=80", duration: "0:58" },
];
```

- [ ] **Step 6: Verify and commit**

```bash
npm run build
git add src/lib/tour-data.js
git commit -m "feat(data): add photos to itinerary + quick-info, accommodations, trust-steps, video testimonials"
```

Expected: build exits 0.

---

## Task H2: SectionDivider primitive (pink pill with side-decorations)

**Files:**
- Create: `src/components/ui/section-divider.jsx`

- [ ] **Step 1: Create the divider**

```jsx
import { cn } from "@/lib/utils";

export function SectionDivider({ title, className }) {
  return (
    <div className={cn("flex items-center justify-center gap-4 my-2", className)}>
      <span className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-pink/40" />
      <span className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-pink/10 text-pink text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
        <span className="text-pink">⋆</span>
        {title}
        <span className="text-pink">⋆</span>
      </span>
      <span className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-pink/40" />
    </div>
  );
}
```

- [ ] **Step 2: Verify and commit**

```bash
npm run build
git add src/components/ui/section-divider.jsx
git commit -m "feat(ui): add SectionDivider pink-pill primitive"
```

---

## Task H3: QuickInfo section (4 icon tiles under hero)

**Files:**
- Create: `src/components/sections/quick-info.jsx`

- [ ] **Step 1: Create QuickInfo**

```jsx
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { QUICK_INFO } from "@/lib/tour-data";

export function QuickInfo() {
  return (
    <section className="relative -mt-16 md:-mt-20 px-6 z-20">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {QUICK_INFO.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
          >
            <Card className="h-full bg-paper border-pink/10 hover:border-pink/40 hover:shadow-[var(--shadow-pink)] hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-4 md:p-5 flex flex-col items-start gap-2 pt-4">
                <div className="w-10 h-10 rounded-xl bg-pink/10 text-2xl flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="font-display text-lg md:text-xl leading-tight">{item.title}</div>
                <div className="text-xs md:text-sm text-mute">{item.subtitle}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

Note: `-mt-16 md:-mt-20` makes the row overlap with hero bottom (Figma-style "stick out").

- [ ] **Step 2: Verify and commit**

```bash
npm run build
git add src/components/sections/quick-info.jsx
git commit -m "feat: add QuickInfo section (4 icon tiles overlapping hero)"
```

---

## Task H4: Enhanced Itinerary with per-day photos

**Files:**
- Modify: `src/components/sections/itinerary.jsx`

- [ ] **Step 1: Replace `src/components/sections/itinerary.jsx` entire contents:**

```jsx
import { motion } from "motion/react";
import { TracingBeam } from "@/components/effects/tracing-beam";
import { SectionDivider } from "@/components/ui/section-divider";
import { ITINERARY } from "@/lib/tour-data";

export function Itinerary() {
  return (
    <section className="py-20 md:py-28 px-6 bg-paper">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <SectionDivider title="Програма туру" className="mb-6" />
          <h2 className="font-display text-4xl md:text-5xl mb-3">
            7 днів між <em className="text-violet">льодом і вогнем</em>
          </h2>
          <p className="text-mute text-lg max-w-2xl mx-auto">
            З гідом українською мовою на весь маршрут.
          </p>
        </motion.div>

        <TracingBeam className="px-6">
          <div className="space-y-12 md:space-y-16">
            {ITINERARY.map((day, idx) => (
              <motion.article
                key={day.day}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start"
              >
                {/* Day badge */}
                <div className="md:col-span-2 flex md:flex-col md:items-start gap-3 md:gap-0">
                  <div className="font-display text-violet text-4xl md:text-5xl leading-none">
                    {String(day.day).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-mute uppercase tracking-wider md:mt-1">день</div>
                </div>

                {/* Text */}
                <div className="md:col-span-5 order-3 md:order-2">
                  <h3 className="font-display text-2xl md:text-3xl mb-2 flex items-center gap-3">
                    <span className="text-3xl">{day.icon}</span>
                    {day.title}
                  </h3>
                  <p className="text-mute text-base md:text-lg leading-relaxed">{day.desc}</p>
                </div>

                {/* Photo */}
                <div className="md:col-span-5 order-2 md:order-3">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group">
                    <img
                      src={day.photo}
                      alt={day.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify and commit**

```bash
npm run build
git add src/components/sections/itinerary.jsx
git commit -m "feat: itinerary with per-day photos + pink-pill divider"
```

---

## Task H5: Accommodation section

**Files:**
- Create: `src/components/sections/accommodation.jsx`

- [ ] **Step 1: Create the section**

```jsx
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionDivider } from "@/components/ui/section-divider";
import { ACCOMMODATIONS } from "@/lib/tour-data";

export function Accommodation() {
  return (
    <section className="py-20 md:py-28 px-6 bg-gradient-to-br from-violet/[0.03] via-pink/[0.02] to-yellow/[0.03]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <SectionDivider title="Де живемо" className="mb-6" />
          <h2 className="font-display text-4xl md:text-5xl mb-3">
            Перевірені <em className="text-pink">готелі</em>
          </h2>
          <p className="text-mute text-lg max-w-2xl mx-auto">
            Тільки 3*–4* з рейтингом 8.5+ на Booking.com. Сніданок і Wi-Fi усюди.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACCOMMODATIONS.map((hotel, idx) => (
            <motion.div
              key={hotel.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="h-full overflow-hidden group hover:shadow-[var(--shadow-violet)] hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={hotel.photo}
                    alt={hotel.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-display text-xl mb-1">{hotel.name}</h3>
                  <div className="text-sm text-mute mb-3">
                    {hotel.city} · {hotel.nights} {hotel.nights === 1 ? "ніч" : "ночей"}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {hotel.amenities.map((a) => (
                      <span key={a} className="text-xs px-2 py-1 rounded-md bg-ink/5 text-ink">
                        {a}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify and commit**

```bash
npm run build
git add src/components/sections/accommodation.jsx
git commit -m "feat: add Accommodation section with hotel gallery"
```

---

## Task H6: TrustSteps section (3-step row)

**Files:**
- Create: `src/components/sections/trust-steps.jsx`

- [ ] **Step 1: Create**

```jsx
import { motion } from "motion/react";
import { Search, Phone, Plane } from "lucide-react";
import { SectionDivider } from "@/components/ui/section-divider";
import { TRUST_STEPS } from "@/lib/tour-data";

const ICONS = { Search, Phone, Plane };

export function TrustSteps() {
  return (
    <section className="py-20 md:py-28 px-6 bg-paper">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <SectionDivider title="Як це працює" className="mb-6" />
          <h2 className="font-display text-4xl md:text-5xl mb-3">
            За 3 кроки у <em className="text-violet">WOW тур</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {TRUST_STEPS.map((step, idx) => {
            const Icon = ICONS[step.icon];
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="text-center relative"
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-violet to-pink text-white shadow-[var(--shadow-violet)]">
                  <Icon className="w-8 h-8" strokeWidth={2} />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow text-ink font-bold text-sm flex items-center justify-center shadow-sm">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="font-display text-2xl mb-2">{step.title}</h3>
                <p className="text-mute text-base max-w-xs mx-auto">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify and commit**

```bash
npm run build
git add src/components/sections/trust-steps.jsx
git commit -m "feat: add TrustSteps section (3-step icon row)"
```

---

## Task H7: VideoTestimonials section (replaces text Marquee)

**Files:**
- Create: `src/components/sections/video-testimonials.jsx`

- [ ] **Step 1: Create**

```jsx
import { motion } from "motion/react";
import { Play } from "lucide-react";
import { SectionDivider } from "@/components/ui/section-divider";
import { TESTIMONIAL_VIDEOS } from "@/lib/tour-data";

export function VideoTestimonials() {
  return (
    <section className="py-20 md:py-28 px-6 bg-ink text-paper">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <SectionDivider title="Відгуки" className="mb-6" />
          <h2 className="font-display text-4xl md:text-5xl mb-3">
            Туристи розповідають <em className="text-yellow">самі</em>
          </h2>
          <p className="text-paper/60 text-lg max-w-2xl mx-auto">
            Без скриптів і реклами — клікніть на відео і слухайте.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {TESTIMONIAL_VIDEOS.map((video, idx) => (
            <motion.button
              key={`${video.name}-${idx}`}
              type="button"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow/60"
              aria-label={`Відео-відгук від ${video.name}`}
              onClick={() => {
                // UI-only: in production this opens a video modal/player
              }}
            >
              <img
                src={video.thumbnail}
                alt={video.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-pink/95 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 md:w-7 md:h-7 ml-1" fill="currentColor" />
              </div>

              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-ink/70 text-paper text-xs font-medium">
                {video.duration}
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="font-semibold text-base text-paper">{video.name}</div>
                <div className="text-xs text-paper/70">{video.city}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify and commit**

```bash
npm run build
git add src/components/sections/video-testimonials.jsx
git commit -m "feat: add VideoTestimonials section with play buttons"
```

---

## Task H8: Rework Hero — destination photo behind aurora + floating booking widget

**Files:**
- Modify: `src/components/sections/hero.jsx`

- [ ] **Step 1: Replace `src/components/sections/hero.jsx` entirely:**

```jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { AuroraBackground } from "@/components/effects/aurora-background";
import { FlipWords } from "@/components/effects/flip-words";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TOUR, FLIGHT_PRICE_MIN, PRICES } from "@/lib/tour-data";

const schema = z.object({
  name: z.string().min(2, "Принаймні 2 символи"),
  phone: z.string().min(7, "Введіть телефон"),
  city: z.string().min(1),
});

function HeroLeadWidget() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", city: PRICES.cities[0] },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); reset(); }, 5000);
  };

  return (
    <div className="bg-paper rounded-2xl p-6 md:p-7 shadow-2xl border border-ink/5">
      <div className="font-display text-xl text-ink mb-1">Залиште заявку</div>
      <div className="text-xs text-mute mb-4">Менеджер передзвонить за 2 години</div>

      {submitted ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">✅</div>
          <div className="font-semibold text-ink">Дякуємо!</div>
          <div className="text-sm text-mute">Зв'яжемось протягом 2 годин.</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <Label htmlFor="hero-name" className="text-xs">Ім'я</Label>
            <Input id="hero-name" placeholder="Олена" {...register("name")} className="mt-1" />
            {errors.name && <p className="text-xs text-danger mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="hero-phone" className="text-xs">Телефон</Label>
            <Input id="hero-phone" type="tel" placeholder="+380..." {...register("phone")} className="mt-1" />
            {errors.phone && <p className="text-xs text-danger mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <Label htmlFor="hero-city" className="text-xs">Місто вильоту</Label>
            <select
              id="hero-city"
              className="flex h-11 w-full rounded-lg border border-border bg-paper px-4 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/40 mt-1"
              {...register("city")}
            >
              {PRICES.cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <Button type="submit" variant="primary" size="md" className="w-full mt-1" disabled={isSubmitting}>
            {isSubmitting ? "Відправляємо..." : "Хочу в цей тур →"}
          </Button>
          <p className="text-[10px] text-mute text-center">
            Без передоплати. Без спаму.
          </p>
        </form>
      )}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Photo background layer */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${TOUR.cover})` }}
        aria-hidden="true"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/40 to-ink/85" aria-hidden="true" />
      {/* Aurora overlay (subtle) */}
      <AuroraBackground className="absolute inset-0 !bg-transparent opacity-50" showRadialGradient={false}>
        <div />
      </AuroraBackground>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 md:pt-32 pb-32 md:pb-40 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 text-paper flex flex-col items-start gap-5"
        >
          <Badge variant="yellow" className="text-sm">⭐ {TOUR.badge}</Badge>

          <h1 className="font-display text-paper text-[clamp(48px,8vw,108px)] leading-[0.95] tracking-tight">
            Iceland
            <br />
            <em className="not-italic bg-gradient-to-r from-yellow via-pink to-violet bg-clip-text text-transparent">
              awaits.
            </em>
          </h1>

          <div className="text-paper/90 text-lg md:text-xl flex items-center gap-2 flex-wrap">
            <span>7 днів між</span>
            <span className="font-semibold text-yellow inline-flex min-w-[180px] justify-start">
              <FlipWords words={TOUR.rotatingWords} />
            </span>
          </div>

          <p className="text-paper/75 text-base md:text-lg max-w-xl">{TOUR.shortDesc}</p>

          <div className="flex items-center gap-3 mt-2">
            <Button asChild variant="primary" size="lg" className="text-lg">
              <a href="#booking">від €{FLIGHT_PRICE_MIN} →</a>
            </Button>
            <a href="#itinerary" className="text-paper/80 text-sm font-medium hover:text-yellow transition-colors">
              Подивитись програму ↓
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5"
        >
          <HeroLeadWidget />
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify and commit**

```bash
npm run build
git add src/components/sections/hero.jsx
git commit -m "feat: rework Hero with photo bg + aurora overlay + lead widget"
```

---

## Task H9: Footer color change to purple

**Files:**
- Modify: `src/components/sections/footer.jsx`

- [ ] **Step 1: Open `src/components/sections/footer.jsx`. Change the outer `<footer>` className from `bg-ink text-paper` to `bg-gradient-to-br from-violet to-violet-dark text-paper`.**

Use the Edit tool with `old_string`: `bg-ink text-paper py-16 px-6` and `new_string`: `bg-gradient-to-br from-violet to-violet-dark text-paper py-16 px-6`.

- [ ] **Step 2: Verify and commit**

```bash
npm run build
git add src/components/sections/footer.jsx
git commit -m "feat(footer): switch to purple gradient background"
```

---

## Task H10: Compose final landing.jsx + add anchors

**Files:**
- Modify: `src/landing.jsx`

- [ ] **Step 1: Replace `src/landing.jsx` entirely:**

```jsx
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { QuickInfo } from "@/components/sections/quick-info";
import { Itinerary } from "@/components/sections/itinerary";
import { Accommodation } from "@/components/sections/accommodation";
import { Prices } from "@/components/sections/prices";
import { TrustSteps } from "@/components/sections/trust-steps";
import { VideoTestimonials } from "@/components/sections/video-testimonials";
import { Booking } from "@/components/sections/booking";
import { Footer } from "@/components/sections/footer";
import { StickyCTA } from "@/components/sections/sticky-cta";

export default function Landing() {
  return (
    <div id="top" className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <QuickInfo />
        <section id="itinerary"><Itinerary /></section>
        <Accommodation />
        <Prices />
        <TrustSteps />
        <VideoTestimonials />
        <Booking />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
```

- [ ] **Step 2: Verify build + bundle**

```bash
npm run build
```

Expected: build exits 0. Bundle JS ≤ 220 KB gzipped (was 154 KB; added image-heavy sections add JS via Lucide icons + form widget).

- [ ] **Step 3: Final commit + tag**

```bash
git add src/landing.jsx
git commit -m "feat: compose hybrid Figma-adapted landing"
git tag -a "v0.3.0" -m "Hybrid Figma adaptation: photos in itinerary, accommodation, trust-steps, video testimonials, hero widget, purple footer"
```

---

## Task H11: (Optional) Remove text Marquee testimonials section from codebase

**Note:** This task is optional. The old `src/components/sections/testimonials.jsx` becomes unused after H7+H10 since `landing.jsx` no longer imports it. The Marquee effect itself can stay in `src/components/effects/marquee.jsx` for potential future reuse, but the unused section file is dead code.

- [ ] **Step 1: Check `testimonials.jsx` is unused**

```bash
grep -rn "from.*testimonials\"" src/
```

Expected: only `landing.jsx` reference, but landing.jsx now imports `video-testimonials`, not `testimonials`. So `testimonials.jsx` should have zero imports.

- [ ] **Step 2: If confirmed dead, delete it**

```bash
git rm src/components/sections/testimonials.jsx
git commit -m "chore: remove unused text-marquee testimonials section (superseded by video)"
```

- [ ] **Step 3: Verify build still passes**

```bash
npm run build
```

---

## Acceptance criteria for the hybrid

- [ ] All 5 new sections present and functional: QuickInfo, Accommodation, TrustSteps, VideoTestimonials, enhanced Itinerary
- [ ] `SectionDivider` used in at least 4 sections (Itinerary, Accommodation, TrustSteps, VideoTestimonials)
- [ ] Hero has photo background + dark overlay + subtle aurora + floating lead widget on right (desktop)
- [ ] Itinerary days each show a photo (4:3 aspect)
- [ ] Footer is purple gradient (not dark ink)
- [ ] All photos use Unsplash URLs with `loading="lazy"`
- [ ] All new sections animate with `whileInView` reveal
- [ ] WOW palette + DM fonts preserved
- [ ] `npm run build` exits 0
- [ ] Bundle JS gzip ≤ 220 KB
- [ ] Lighthouse Performance ≥ 80 mobile (will drop slightly vs v0.2 due to photos; that's acceptable)
- [ ] No console errors
- [ ] Tag `v0.3.0` created

---

## Notes for the executor

- **Photo URLs** are Unsplash placeholders. If client provides real photos before completion, swap them in the data file only — no component changes needed.
- **Bundle increase** comes mostly from Lucide icons (Search, Phone, Plane, Play) — tree-shaking should keep it modest. If bundle exceeds 220 KB, lazy-load `VideoTestimonials` via `React.lazy`.
- **Don't add a video player library.** The Play button in VideoTestimonials is UI-only. In production it would open a modal with `<iframe>` to YouTube/Vimeo. For mock, the click handler is a no-op.
- **`prefers-reduced-motion`** is handled globally in `globals.css` already. Photos `scale-105` on hover should respect this; if not, wrap with `motion-reduce:hover:scale-100`.
- **Accordion primitive** at `src/components/ui/accordion.jsx` is unused after this plan too. Leave it or remove — optional cleanup.

## Self-review checklist (run before declaring done)

- [ ] `grep -rn "style={{" src/components/sections/ src/landing.jsx` returns nothing
- [ ] `grep -rn "Travelpayouts\|travelpayouts" src/ index.html` returns nothing
- [ ] All `Card` hover effects use shadow tokens, not raw rgba
- [ ] Section order in `landing.jsx` matches the Figma flow: Hero → QuickInfo → Itinerary → Accommodation → Prices → TrustSteps → VideoTestimonials → Booking → Footer
- [ ] Lighthouse SEO ≥ 90 (unchanged from v0.2 — meta in index.html not touched)

## Resumption notes for fresh session

If you (a fresh agent in a new session) are picking this up:

1. Read `docs/superpowers/specs/2026-05-13-landing-redesign-design.md` for the **original spec** (do NOT rewrite — adapt)
2. Read this plan in full
3. Run `npm run dev` once to see the current landing baseline
4. Execute tasks H1 → H11 in order using **superpowers:subagent-driven-development**
5. Each task is fully self-contained — paste code verbatim, run build, commit
6. After H10 succeeds, the landing matches the hybrid spec; H11 is optional cleanup

Total expected time with Claude Code velocity: ~3-5 hours of subagent work, plus user review breaks.
