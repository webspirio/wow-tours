# Proposal Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-scroll commercial proposal page at `#/proposal`, served alongside the existing tour-demo landing at `#/`. Content sourced verbatim from `05-pricing-tiers.md`. Bidirectional linking with a "це швидке демо" caveat banner on the tour landing.

**Architecture:** Hash-based routing inside `src/main.jsx` (no new dependencies). All proposal content centralized in `src/lib/proposal-data.js`. Each section is a focused JSX file under `src/components/proposal/sections/`. Visual system reuses the existing wow-tours design tokens (`bg-paper`, `text-ink`, `text-mute`, `border-border`, brand violet/pink/yellow), animations via `motion` `whileInView`.

**Tech Stack:** React 19, Vite, Tailwind v4, motion v12, lucide-react, Radix accordion. No new deps.

**Spec:** `docs/superpowers/specs/2026-05-13-proposal-page-design.md`

---

## Critical conventions for the engineer

These are non-obvious; check them before writing any UI code.

**This project does NOT use shadcn-default tokens.** Do not use `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `ring-foreground/*` — they don't exist here. Use the wow-tours tokens:

| Reference (travel-crm) | Use here (wow-tours) |
|---|---|
| `bg-background` | `bg-paper` |
| `bg-card` / `bg-card/60` | `bg-white` / `bg-white/70` |
| `bg-muted` / `bg-muted/30` | `bg-paper` (with subtle border) or `bg-ink/[0.03]` |
| `text-foreground` | `text-ink` |
| `text-muted-foreground` | `text-mute` |
| `border` (default) | `border border-border` |
| `ring-foreground/5` | `ring-ink/5` |

**Button variants available:** `primary` (yellow, default), `violet`, `ghost`, `outline`, `gradient`. Sizes `sm` / `md` / `lg` / `icon`. **No `default` variant — do not write `variant="default"`.**

**Badge variants available:** `yellow`, `violet`, `pink`, `outline`, `success`.

**Font for headings:** `font-display` (DM Serif Display, loaded in `index.html`). Body text uses default sans (DM Sans).

**Project root:** all paths in this plan are relative to `/Users/oleksandrsecond/Projects/wow-tours/`.

**Verification:** there is no test runner installed. Each task ends with `npm run dev` + a manual browser check at `http://localhost:5173/wow-tours/` and `http://localhost:5173/wow-tours/#/proposal` (Vite's `base` is `/wow-tours/`). Keep `npm run dev` running across tasks; HMR will refresh.

**Commits:** repository is a git repo, branch `main`. There is one uncommitted change to `src/components/sections/booking.jsx` — leave it alone, do not stage it in proposal commits. Stage only the files your task touches.

---

## Task 1: Hash router + ProposalPage shell + DemoBanner

**Goal:** Wire up `#/proposal` and the demo-banner caveat on `#/`. Both routes navigable end-to-end with placeholder content.

**Files:**
- Modify: `src/main.jsx`
- Create: `src/proposal.jsx`
- Create: `src/components/sections/demo-banner.jsx`
- Modify: `src/landing.jsx`

- [ ] **Step 1: Create the proposal page shell**

Write `src/proposal.jsx`:

```jsx
import { useEffect } from "react";

export default function ProposalPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "WOW Tours — Комерційна пропозиція";
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <div className="mx-auto max-w-4xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">WOW Tours — Комерційна пропозиція</h1>
        <p className="mt-4 text-mute">Placeholder — sections wired in later tasks.</p>
        <a href="#/" className="mt-8 inline-block text-violet underline">← До демо</a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create the demo banner**

Write `src/components/sections/demo-banner.jsx`:

```jsx
export function DemoBanner() {
  return (
    <div className="bg-yellow/15 border-b border-yellow-dark/30 text-ink text-sm">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <span>
          <span className="font-semibold">Це швидке демо тарифу Quick Launch.</span>{" "}
          <span className="text-ink-soft">Фінальний сайт може виглядати інакше — функції залежать від обраного тарифу.</span>
        </span>
        <a
          href="#/proposal"
          className="font-semibold underline underline-offset-2 hover:no-underline whitespace-nowrap"
        >
          ← Повернутись до пропозиції
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Wire the banner into the tour landing**

Modify `src/landing.jsx` — add the banner import and place it as the first child inside the wrapping `<div>`:

```jsx
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { QuickInfo } from "@/components/sections/quick-info";
import { Itinerary } from "@/components/sections/itinerary";
import { Accommodation } from "@/components/sections/accommodation";
import { Included } from "@/components/sections/included";
import { Prices } from "@/components/sections/prices";
import { TrustSteps } from "@/components/sections/trust-steps";
import { VideoTestimonials } from "@/components/sections/video-testimonials";
import { Booking } from "@/components/sections/booking";
import { Footer } from "@/components/sections/footer";
import { StickyCTA } from "@/components/sections/sticky-cta";
import { DemoBanner } from "@/components/sections/demo-banner";
import { BookingPrefillProvider } from "@/lib/booking-prefill";

export default function Landing() {
  return (
    <BookingPrefillProvider>
      <div id="top" className="min-h-screen">
        <DemoBanner />
        <Header />
        <main>
          <Hero />
          <QuickInfo />
          <section id="itinerary"><Itinerary /></section>
          <Accommodation />
          <Prices />
          <Included />
          <TrustSteps />
          <VideoTestimonials />
          <Booking />
        </main>
        <Footer />
        <StickyCTA />
      </div>
    </BookingPrefillProvider>
  );
}
```

- [ ] **Step 4: Add hash routing to main.jsx**

Replace `src/main.jsx` entirely:

```jsx
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/globals.css'
import Landing from './landing.jsx'
import ProposalPage from './proposal.jsx'

function getRoute() {
  const hash = window.location.hash.replace(/^#/, '');
  if (hash === '/proposal') return 'proposal';
  return 'landing';
}

function Root() {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route === 'proposal' ? <ProposalPage /> : <Landing />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
```

- [ ] **Step 5: Verify in browser**

Start dev server if not running:

```bash
npm run dev
```

Expected output: `Local:   http://localhost:5173/wow-tours/`.

Open `http://localhost:5173/wow-tours/` — you should see the existing tour landing with the new yellow-tinted demo banner across the top. Click "← Повернутись до пропозиції" → URL changes to `#/proposal`, page scrolls to top, placeholder proposal page renders. Click "← До демо" → back to landing.

Verify in DevTools console: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/main.jsx src/proposal.jsx src/landing.jsx src/components/sections/demo-banner.jsx
git commit -m "feat(proposal): add hash router, proposal page shell, demo banner"
```

---

## Task 2: Shared primitives — FadeIn and SectionHeader

**Goal:** Two reusable building blocks all sections depend on.

**Files:**
- Create: `src/components/proposal/fade-in.jsx`
- Create: `src/components/proposal/section-header.jsx`

- [ ] **Step 1: Write the FadeIn primitive**

Create `src/components/proposal/fade-in.jsx`:

```jsx
import { motion } from "motion/react";

export function FadeIn({ children, delay = 0, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Write the SectionHeader primitive**

Create `src/components/proposal/section-header.jsx`:

```jsx
import { cn } from "@/lib/utils";

export function SectionHeader({ number, title, subtitle, className }) {
  return (
    <div className={cn("mb-10 lg:mb-14", className)}>
      <div className="flex items-baseline gap-4 lg:gap-6">
        {number && (
          <span
            aria-hidden
            className="font-display text-5xl font-light tracking-tight text-mute-soft tabular-nums lg:text-7xl"
          >
            {number}
          </span>
        )}
        <h2 className="font-display text-2xl font-semibold tracking-tight text-balance lg:text-4xl">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-3 max-w-3xl text-base text-mute lg:ml-[5.5rem] lg:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/proposal/fade-in.jsx src/components/proposal/section-header.jsx
git commit -m "feat(proposal): add FadeIn and SectionHeader primitives"
```

---

## Task 3: Proposal data file

**Goal:** Single source of truth for all proposal copy, ported verbatim from `05-pricing-tiers.md`. All future content edits touch only this file.

**Files:**
- Create: `src/lib/proposal-data.js`

- [ ] **Step 1: Write the data file**

Create `src/lib/proposal-data.js`:

```js
export const PROPOSAL_META = {
  date: "2026-05-13",
  validUntil: "2026-06-13",
  currency: "EUR",
  positioningTagline: "", // optional uppercase hero microcopy; leave empty unless explicitly approved
  contact: {
    calendar: "https://calendar.app.google/Faf8t6fmr8canNLf6",
    telegram: "@swefd",
    telegramUrl: "https://t.me/swefd",
    phoneDisplay: "+49 151 24130699",
    phoneHref: "tel:+4915124130699",
  },
};

export const TIERS = [
  {
    id: "quick-launch",
    name: "Quick Launch",
    icon: "Rocket",
    price: 4500,
    forWho: "перевірити концепцію та зібрати перші заявки за 2–3 тижні",
    bullets: [
      "4 готові лендінги турів з топовим візуальним дизайном",
      "Живі ціни на авіаквитки — оновлюються щогодини",
      "Заявки моментально летять у Telegram",
      "Готовий до пошуку в Google, захист від спам-ботів",
      "Підключаємо ваш домен, HTTPS — без зайвих рухів від вас",
      "30 днів безкоштовно правимо все, що знайдете після запуску",
    ],
    fullBullets: [
      "4 готові лендінги турів з топовим візуальним дизайном — як у преміум-операторів",
      "Живі ціни на авіаквитки — оновлюються щогодини, для 4 міст вильоту і найближчих дат",
      "Заявки моментально летять у Telegram — клієнт не чекає",
      "Сайт швидко відкривається на телефоні, виглядає чудово на будь-якому екрані",
      "Готовий до пошуку в Google — налаштовано все, що зазвичай забувають",
      "Захист від спам-ботів, щоб менеджери не розгрібали сміття",
      "Підключаємо ваш домен, HTTPS — без зайвих рухів від вас",
      "Сайт швидкий і захищений",
      "30 днів безкоштовно правимо все, що знайдете після запуску",
    ],
    notIncluded: [
      "Адмін-панель для самостійного редагування контенту",
      "CRM-система обліку клієнтів",
      "Прийом онлайн-оплат",
      "Мультимовність",
    ],
    timeline: "2–3 тижні",
    hosting: 50,
    hostingGift: "1 міс",
    support: "30 днів",
    recommended: false,
  },
  {
    id: "cms-edition",
    name: "CMS Edition",
    icon: "LayoutDashboard",
    price: 6900,
    forWho: "масштабуватись з 4 на 10+ турів власноруч, без участі розробника",
    bullets: [
      "Зручна адмінка — редагуєте тури самі, як у Notion",
      "Шаблон тура: новий тур додаєте за 30 хвилин, не за тиждень",
      "Бібліотека фото з автоматичним кропом",
      "Чернетки і попередній перегляд перед публікацією",
      "Окремі доступи: адмін, менеджер контенту, тільки перегляд",
      "1 онлайн-тренінг для редакторів + PDF-інструкція",
      "60 днів безкоштовної підтримки",
    ],
    fullBullets: [
      "Зручна адмінка — редагуєте тури самі, як у Notion, без коду",
      "Тексти, фото, програма по днях, готелі, ціни, дати вильотів — все правите за хвилини",
      "Чернетки і попередній перегляд перед публікацією: жодних випадкових збоїв на сайті",
      "Окремі доступи: адмін, менеджер контенту, тільки перегляд",
      "Шаблон тура: новий тур додаєте за 30 хвилин — не за тиждень",
      "Бібліотека фото з автоматичним кропом — завантажуєте оригінал, далі ми оптимізуємо",
      "Сайт ще швидший і ще краще індексується в Google",
      "1 онлайн-тренінг для редакторів (1 година, запис залишається)",
      "PDF-інструкція з картинками — читається без технічних знань",
      "60 днів безкоштовної підтримки",
    ],
    notIncluded: ["CRM-система", "Прийом оплат", "Мультимовність"],
    timeline: "5–6 тижнів",
    hosting: 80,
    hostingGift: "1 міс",
    support: "60 днів",
    recommended: true,
  },
  {
    id: "sales-engine",
    name: "Sales Engine",
    icon: "Workflow",
    price: 10500,
    forWho: "будувати реальний відділ продажів, відстежувати воронку, не втрачати заявки",
    bullets: [
      "CRM для відділу продажів — кожна заявка автоматично у системі",
      "Воронка: нова → у роботі → бронь → оплачено → завершено",
      "Пуш про нову заявку в Telegram з кнопками «взяти / передати»",
      "Дашборд для керівника: конверсія, динаміка цін, середній чек",
      "Сайт сам пише клієнту: підтвердження, нагадування, follow-up",
      "2 онлайн-тренінги (для редакторів + менеджерів продажів)",
      "90 днів безкоштовної підтримки",
    ],
    fullBullets: [
      "CRM для відділу продажів — кожна заявка автоматично у системі, нічого не губиться",
      "Воронка: нова → у роботі → бронь → оплачено → завершено / втрачено",
      "Поля для нотаток, історії дзвінків, статусу клієнта",
      "Безкоштовна CRM включена; за бажанням підключимо вашу (HubSpot, Pipedrive тощо)",
      "Менеджери отримують пуш про нову заявку в Telegram з кнопками «взяти в роботу / передати колезі»",
      "Дашборд для керівника: скільки заявок, конверсія по джерелам, динаміка цін, середній чек — все на одній сторінці",
      "Підтвердження заявки через 5 хвилин — клієнт відчуває, що до нього серйозно",
      "Нагадування через день, якщо менеджер не зв'язався — заявка не «вмирає»",
      "М'який follow-up через тиждень — повертаємо тих, хто думав",
      "2 онлайн-тренінги (1 година для редакторів + 1 година для менеджерів продажів)",
      "90 днів безкоштовної підтримки",
    ],
    notIncluded: ["Прийом оплат на сайті", "Мультимовність"],
    timeline: "7–8 тижнів",
    hosting: 80,
    hostingGift: "1 міс",
    support: "90 днів",
    recommended: false,
  },
  {
    id: "full-stack",
    name: "Full Stack",
    icon: "Layers",
    price: 16500,
    forWho: "повноцінна онлайн-платформа з оплатою на сайті та трьома мовами",
    bullets: [
      "Прийом оплат прямо на сайті — клієнт платить карткою",
      "Передплата 20–30% або повна оплата на вибір клієнта",
      "Автоматична квитанція в PDF, статус автоматично у CRM",
      "Три мови: переклади редагуєте самі в адмінці",
      "Окремий SEO для кожної мови — індексуєтесь у трьох країнах",
      "A/B тестування лендінгів, просунута аналітика без cookie-банерів",
      "3 безкоштовні тури «під ключ» + 6 місяців безкоштовної підтримки",
    ],
    fullBullets: [
      "Прийом оплат прямо на сайті — клієнт платить карткою, ви бачите гроші",
      "Передплата 20–30% або повна оплата на вибір клієнта",
      "Автоматична квитанція в PDF — менеджер не пише її руками",
      "Статус «оплачено» автоматично виставляється у CRM",
      "Регламент обробки повернень — не зависнете на спірних випадках",
      "Три мови: переклади редагуєте самі в адмінці",
      "Сайт сам розуміє, з якої країни прийшов відвідувач",
      "Окремий SEO для кожної мови — індексуєтесь у трьох країнах",
      "Воронка від першого кліку до оплати, звідки приходять клієнти і які канали окупаються",
      "Без cookie-банерів, які лякають відвідувачів (європейський закон не страшний)",
      "A/B тестування лендінгів — пробуєте варіанти і дивитесь, що краще конвертить",
      "3 безкоштовні тури «під ключ» — занесемо контент за вас",
      "6 місяців безкоштовної підтримки",
      "Реакція на критичні проблеми — 4 робочі години",
      "3 місяці хостингу адмінки у подарунок (€360 вартості)",
    ],
    notIncluded: [],
    timeline: "10–12 тижнів",
    hosting: 120,
    hostingGift: "3 міс",
    support: "6 місяців",
    recommended: false,
  },
];

export const COMPARISON_GROUPS = [
  {
    label: "Контент",
    rows: [
      { feature: "Кількість турів", values: ["1–2", "до 50+", "до 50+", "необмежено"] },
      { feature: "CMS — самостійне редагування турів", values: ["—", "✓", "✓", "✓"] },
      { feature: "Шаблон, новий тур за 30 хв", values: ["—", "✓", "✓", "✓"] },
      { feature: "Тренінг для редакторів", values: ["—", "1 год", "2 год", "2 год"] },
    ],
  },
  {
    label: "Заявки і ціни",
    rows: [
      { feature: "Живі ціни на квитки", values: ["✓", "✓", "✓", "✓"] },
      { feature: "Заявки → Telegram + email", values: ["✓", "✓", "✓", "✓"] },
      { feature: "База заявок з історією", values: ["✓", "✓", "✓", "✓"] },
    ],
  },
  {
    label: "Продажі",
    rows: [
      { feature: "CRM-інтеграція + воронка", values: ["—", "—", "✓", "✓"] },
      { feature: "Дашборд для керівника", values: ["—", "—", "✓", "✓"] },
      { feature: "Авто-листи клієнтам", values: ["—", "—", "✓", "✓"] },
    ],
  },
  {
    label: "Платежі і мови",
    rows: [
      { feature: "Прийом онлайн-оплат", values: ["—", "—", "—", "✓"] },
      { feature: "Мультимовність (UA + EN + PL)", values: ["—", "—", "—", "✓"] },
      { feature: "Просунута аналітика продажів", values: ["—", "—", "—", "✓"] },
      { feature: "A/B тестування", values: ["—", "—", "—", "✓"] },
      { feature: "Тури «під ключ»", values: ["—", "—", "—", "3 шт"] },
    ],
  },
  {
    label: "Підтримка і умови",
    rows: [
      { feature: "Технічна підтримка", values: ["30 днів", "60 днів", "90 днів", "6 місяців"] },
      { feature: "Хостинг + підтримка", values: ["€50/міс", "€80/міс", "€80/міс", "€120/міс"] },
      { feature: "Хостинг у подарунок на старті", values: ["1 міс", "1 міс", "1 міс", "3 міс"] },
      { feature: "Термін розробки", values: ["2–3 тиж", "5–6 тиж", "7–8 тиж", "10–12 тиж"] },
      { feature: "Ціна разово", values: ["€4 500", "€6 900", "€10 500", "€16 500"], highlight: true },
    ],
  },
];

export const HOSTING_PLANS = [
  {
    plan: "Тариф 1",
    monthly: 50,
    monthlyHours: "30 хв",
    features: {
      cmsHosting: false,
      payments: false,
      multiLang: false,
      backups: true,
      securityUpdates: true,
      monitoring: true,
      reaction4h: true,
      uaEnSupport: true,
      unlimitedUsers: false,
    },
  },
  {
    plan: "Тарифи 2–3",
    monthly: 80,
    monthlyHours: "1 година",
    features: {
      cmsHosting: true,
      payments: false,
      multiLang: false,
      backups: true,
      securityUpdates: true,
      monitoring: true,
      reaction4h: true,
      uaEnSupport: true,
      unlimitedUsers: true,
    },
  },
  {
    plan: "Тариф 4",
    monthly: 120,
    monthlyHours: "2 години",
    features: {
      cmsHosting: true,
      payments: true,
      multiLang: true,
      backups: true,
      securityUpdates: true,
      monitoring: true,
      reaction4h: true,
      uaEnSupport: true,
      unlimitedUsers: true,
    },
  },
];

export const HOSTING_FEATURE_ROWS = [
  { key: "monthlyHours", label: "Правки контенту у подарунок щомісяця", type: "hours" },
  { key: "cmsHosting", label: "Хостинг адмінки (CMS)", type: "bool" },
  { key: "payments", label: "Підтримка прийому оплат", type: "bool" },
  { key: "multiLang", label: "Підтримка перекладів у кількох мовах", type: "bool" },
  { key: "backups", label: "Щоденні бекапи з історією 14 днів", type: "bool" },
  { key: "securityUpdates", label: "Оновлення безпеки автоматично", type: "bool" },
  { key: "monitoring", label: "Моніторинг доступності цілодобово", type: "bool" },
  { key: "reaction4h", label: "Реакція на критичні проблеми ≤ 4 год", type: "bool" },
  { key: "uaEnSupport", label: "Підтримка українською / англійською", type: "bool" },
  { key: "unlimitedUsers", label: "Без обмежень користувачів / об'єму", type: "bool" },
];

export const ADD_ONS = [
  { service: "Додаткова мова інтерфейсу (після першої)", price: "€1 500 за мову" },
  { service: "Реальне онлайн-бронювання квитків прямо на сайті", price: "€4 000" },
  { service: "Telegram-бот для клієнтів (статус заявки, документи)", price: "€1 800" },
  { service: "Інтеграція з 1С / Бітрікс24 / SAP", price: "від €2 500" },
  { service: "Дизайн нової секції за існуючим стилем", price: "€350–550 за секцію" },
  { service: "Створення тура під ключ нами (тексти + фото + структура)", price: "€200 за тур" },
  { service: "Dev-retainer без хостингу (5 годин/міс на правки + консультації)", price: "€280/міс" },
  { service: "Виправлення / правки поза тарифом і ретейнером", price: "€30/год" },
  { service: "Міграція існуючого сайту на нову платформу", price: "від €1 200" },
  { service: "Налаштування Google Ads / Meta Ads (з нашим маркетологом)", price: "€600–900 разово" },
];

export const UNIVERSAL_BENEFITS = [
  { icon: "UserRound", label: "Особисте управління проектом — менеджер на зв'язку щодня у робочий час" },
  { icon: "Video", label: "Щотижневі демо у Zoom (15 хв) — ви бачите прогрес у реальному часі" },
  { icon: "MessageSquare", label: "Спільний чат для оперативних питань" },
  { icon: "Globe", label: "Демо-середовище — все тестуєте перед запуском" },
  { icon: "Code", label: "Передача всіх вихідних кодів і доступів — сайт ваш, без замків" },
  { icon: "BookOpen", label: "Інструкції з підтримки — щоб не залежати тільки від нас" },
];

export const TERMS = {
  paymentSchedule: [
    { percent: 50, when: "на старті", detail: "після підписання договору" },
    { percent: 30, when: "після першого етапу", detail: "демо-середовище з робочим функціоналом" },
    { percent: 20, when: "після фінального запуску", detail: "і прийняття" },
  ],
  contract: [
    "Перелік задач за обраним тарифом",
    "Критерії приймання",
    "Гарантійні зобов'язання (виправлення дефектів безкоштовно протягом терміну підтримки)",
    "Передачу прав на всі вихідники замовнику",
    "Конфіденційність",
  ],
  changeRequests:
    "Кожен запит, що виходить за межі тарифу, фіксуємо письмово з оцінкою у годинах і ціною. Без письмового погодження зміни в розробку не беруться. Це захищає обидві сторони від «розповзання» термінів і бюджету.",
  workflow: [
    "Підпис договору + перша оплата → старт розробки через 3 робочі дні",
    "Щотижневі демо у Zoom (15 хвилин)",
    "Спільний канал у Telegram / Slack",
    "Перед здачею — повне тестування у присутності замовника",
  ],
  warranty:
    "Гарантійний період: виправлення помилок безкоштовно протягом терміну технічної підтримки (30 / 60 / 90 / 180 днів залежно від тарифу).",
};

export const NOT_INCLUDED = [
  "Створення контенту: написання текстів, фотозйомка, відео-відгуки клієнтів",
  "Платний трафік (Google Ads / Meta Ads) — окремий підрядник, можемо порекомендувати",
  "SEO-просування (контент-маркетинг, лінкбілдінг)",
  "Юридичні документи: оферта, політика конфіденційності, договори з клієнтами",
  "Бухгалтерський облік, реєстрація ФОП, банківські рахунки",
  "Перенесення даних з інших систем — обговорюємо окремо за фактичним обсягом",
];

export const NEXT_STEPS = [
  "Обираєте тариф (або просите модифікацію — комбінації можливі)",
  "Підписуємо договір (зразок надішлемо на прохання)",
  "Перша оплата 50% → старт розробки через 3 робочі дні",
  "Через 2–12 тижнів (залежно від тарифу) → ваш сайт у продакшені",
];

export const FRAMING = {
  title: "Чому це не «новий продукт»",
  paragraph:
    "WOW Tours — паузований, але валідований бізнес із відомим брендом і робочою операційною моделлю. Ми не стартуємо з нуля: ми перебудовуємо платформу на сучасному стеку, зберігаючи юридичну особу, домен і репутацію. Те, на що в типовій IT-агенції піде 6+ місяців, ми робимо за 2–12 тижнів — залежно від амбіції тарифу. Менший ризик, швидший шлях до перших заявок.",
};
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/proposal-data.js
git commit -m "feat(proposal): add proposal data file (tiers, comparison, add-ons, terms)"
```

---

## Task 4: Hero section

**Goal:** Top of the proposal — badge, title, KPI chips for each tier, primary CTAs.

**Files:**
- Create: `src/components/proposal/sections/hero.jsx`
- Modify: `src/proposal.jsx`

- [ ] **Step 1: Write the Hero component**

Create `src/components/proposal/sections/hero.jsx`:

```jsx
import { motion } from "motion/react";
import { ArrowDown, CalendarCheck, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROPOSAL_META, TIERS } from "@/lib/proposal-data";

function formatPrice(n) {
  return `€${n.toLocaleString("uk-UA").replace(/ /g, " ")}`;
}

function KpiChip({ tier }) {
  return (
    <a
      href={`#tier-${tier.id}`}
      className="rounded-xl border border-border bg-white px-4 py-4 ring-1 ring-ink/5 backdrop-blur transition-all hover:-translate-y-0.5 hover:ring-violet/20 text-left"
    >
      <p className="text-[0.65rem] uppercase tracking-wider text-mute">{tier.name}</p>
      <p className="font-display mt-1 text-2xl font-semibold tracking-tight text-ink">
        {formatPrice(tier.price)}
      </p>
      <p className="mt-0.5 text-xs text-mute">{tier.timeline}</p>
    </a>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(124,58,237,0.10),transparent_70%)] print:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-ink/15 to-transparent"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center lg:px-6 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-3"
        >
          <Badge variant="outline" className="px-3 py-1 text-[0.7rem] tracking-wider uppercase">
            WOW Tours · Комерційна пропозиція
          </Badge>
          <p className="text-sm text-mute">
            {PROPOSAL_META.date} · дійсна до {PROPOSAL_META.validUntil} · {PROPOSAL_META.currency} без ПДВ
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="font-display mt-6 text-balance text-4xl font-semibold tracking-tight lg:text-6xl"
        >
          Чотири варіанти запуску —<br className="hidden sm:inline" />{" "}
          <span className="text-mute">від MVP до повноцінної платформи</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-6 max-w-2xl text-balance text-lg text-mute lg:text-xl"
        >
          Кожен тариф включає все з попереднього + нові можливості. Виберіть стартову точку — масштабуєтесь, коли готові.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-3 lg:grid-cols-4"
        >
          {TIERS.map((t) => <KpiChip key={t.id} tier={t} />)}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row print:hidden"
        >
          <Button asChild variant="primary" size="lg">
            <a href={PROPOSAL_META.contact.calendar} target="_blank" rel="noopener noreferrer">
              <CalendarCheck className="size-4" />
              Записатись на 30-хв дзвінок
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#/">
              <ExternalLink className="size-4" />
              Подивитись живе демо
            </a>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <a href="#section-1">
              Прокрутити деталі
              <ArrowDown className="size-4" />
            </a>
          </Button>
        </motion.div>

        {PROPOSAL_META.positioningTagline && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-xs uppercase tracking-[0.2em] text-mute"
          >
            {PROPOSAL_META.positioningTagline}
          </motion.p>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Mount Hero in ProposalPage**

Replace `src/proposal.jsx`:

```jsx
import { useEffect } from "react";
import { Hero } from "@/components/proposal/sections/hero";

export default function ProposalPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "WOW Tours — Комерційна пропозиція";
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <Hero />
    </div>
  );
}
```

- [ ] **Step 3: Verify in browser**

Navigate to `http://localhost:5173/wow-tours/#/proposal`. Confirm:
- Title badge appears, dates render correctly.
- H1 reads "Чотири варіанти запуску — від MVP до повноцінної платформи".
- 4 KPI chips show all four tier names + prices in correct order.
- Three CTAs visible (calendar, demo, scroll).
- No console errors.
- Resize to 360px → KPI chips reflow to 2×2 grid.

- [ ] **Step 4: Commit**

```bash
git add src/components/proposal/sections/hero.jsx src/proposal.jsx
git commit -m "feat(proposal): add Hero section"
```

---

## Task 5: Framing section

**Goal:** Short "Чому це не новий продукт" framing block — one paragraph.

**Files:**
- Create: `src/components/proposal/sections/framing.jsx`
- Modify: `src/proposal.jsx`

- [ ] **Step 1: Write Framing**

Create `src/components/proposal/sections/framing.jsx`:

```jsx
import { FadeIn } from "@/components/proposal/fade-in";
import { SectionHeader } from "@/components/proposal/section-header";
import { FRAMING } from "@/lib/proposal-data";

export function Framing() {
  return (
    <section id="section-1" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-16 lg:px-6 lg:py-24">
      <FadeIn>
        <SectionHeader number="1" title={FRAMING.title} />
        <p className="max-w-3xl text-lg leading-relaxed text-ink lg:ml-[5.5rem]">
          {FRAMING.paragraph}
        </p>
      </FadeIn>
    </section>
  );
}
```

- [ ] **Step 2: Mount in ProposalPage**

Add the import and render it under Hero in `src/proposal.jsx`:

```jsx
import { useEffect } from "react";
import { Hero } from "@/components/proposal/sections/hero";
import { Framing } from "@/components/proposal/sections/framing";

export default function ProposalPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "WOW Tours — Комерційна пропозиція";
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <Hero />
      <Framing />
    </div>
  );
}
```

- [ ] **Step 3: Verify in browser**

Click "Прокрутити деталі" in the Hero → page should smoothly scroll to the framing section. Numbered "1" appears in the section header. Paragraph fades in on view.

- [ ] **Step 4: Commit**

```bash
git add src/components/proposal/sections/framing.jsx src/proposal.jsx
git commit -m "feat(proposal): add Framing section"
```

---

## Task 6: Tiers section (centerpiece)

**Goal:** 4-card pricing grid, CMS Edition visually featured, with collapsible full bullet list.

**Files:**
- Create: `src/components/proposal/sections/tiers.jsx`
- Modify: `src/proposal.jsx`

- [ ] **Step 1: Write Tiers section**

Create `src/components/proposal/sections/tiers.jsx`:

```jsx
import { Check, X, Layers, LayoutDashboard, Rocket, Workflow, Calendar, Server } from "lucide-react";
import { FadeIn } from "@/components/proposal/fade-in";
import { SectionHeader } from "@/components/proposal/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { TIERS } from "@/lib/proposal-data";

const ICON_MAP = { Rocket, LayoutDashboard, Workflow, Layers };

function formatPrice(n) {
  return `€${n.toLocaleString("uk-UA").replace(/ /g, " ")}`;
}

function TierCard({ tier, index }) {
  const Icon = ICON_MAP[tier.icon] || Rocket;
  return (
    <FadeIn delay={index * 0.06}>
      <article
        id={`tier-${tier.id}`}
        className={cn(
          "relative flex h-full scroll-mt-24 flex-col rounded-2xl border border-border bg-white p-6 ring-1 ring-ink/5 transition-all",
          tier.recommended && "ring-2 ring-violet/40 lg:-translate-y-1 shadow-[var(--shadow-violet)]"
        )}
      >
        {tier.recommended && (
          <Badge variant="violet" className="absolute -top-3 right-4 px-3 py-1 text-[0.65rem] uppercase tracking-wider">
            ★ Рекомендуємо
          </Badge>
        )}

        <div className="flex items-center gap-2 text-violet">
          <Icon className="size-5" />
          <h3 className="font-display text-xl font-semibold text-ink">{tier.name}</h3>
        </div>
        <p className="mt-2 text-sm leading-snug text-mute">
          Для тих, хто хоче: <span className="text-ink">{tier.forWho}</span>.
        </p>

        <div className="mt-5 flex items-baseline gap-2">
          <span className="font-display text-4xl font-semibold tracking-tight text-ink">
            {formatPrice(tier.price)}
          </span>
          <span className="text-xs uppercase tracking-wider text-mute">разово</span>
        </div>

        <hr className="my-5 border-border" />

        <ul className="space-y-2.5 text-sm">
          {tier.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-ink">
              <Check className="mt-0.5 size-4 shrink-0 text-success" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <Accordion type="single" collapsible className="mt-3">
          <AccordionItem value="full" className="border-b-0">
            <AccordionTrigger className="py-2 text-sm font-medium text-mute hover:no-underline">
              Подивитись повний список
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 pl-1 text-sm">
                {tier.fullBullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-ink">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-success/70" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {tier.notIncluded.length > 0 && (
          <div className="mt-4 rounded-lg bg-paper/60 p-3">
            <p className="mb-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-mute">
              Що НЕ входить
            </p>
            <ul className="space-y-1 text-xs text-mute">
              {tier.notIncluded.map((b, i) => (
                <li key={i} className="flex gap-1.5">
                  <X className="mt-0.5 size-3 shrink-0 text-mute-soft" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-5 grid grid-cols-1 gap-1.5 text-xs text-mute">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            {tier.timeline}
          </span>
          <span className="flex items-center gap-1.5">
            <Server className="size-3.5" />
            хостинг €{tier.hosting}/міс (перший {tier.hostingGift} у подарунок)
          </span>
        </div>

        <div className="mt-auto pt-5">
          <Button asChild variant={tier.recommended ? "violet" : "outline"} size="md" className="w-full">
            <a href="#section-9">Обрати тариф</a>
          </Button>
          <a
            href="#/"
            className="mt-2 block text-center text-xs text-mute underline-offset-2 hover:text-violet hover:underline"
          >
            Подивитись живе демо →
          </a>
        </div>
      </article>
    </FadeIn>
  );
}

export function Tiers() {
  return (
    <section id="section-2" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 lg:px-6 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          number="2"
          title="Чотири тарифи"
          subtitle="Кожен включає все з попереднього. CMS Edition — наш рекомендований старт для більшості туроператорів."
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 items-stretch">
        {TIERS.map((tier, i) => <TierCard key={tier.id} tier={tier} index={i} />)}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Mount in ProposalPage**

```jsx
import { useEffect } from "react";
import { Hero } from "@/components/proposal/sections/hero";
import { Framing } from "@/components/proposal/sections/framing";
import { Tiers } from "@/components/proposal/sections/tiers";

export default function ProposalPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "WOW Tours — Комерційна пропозиція";
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <Hero />
      <Framing />
      <Tiers />
    </div>
  );
}
```

- [ ] **Step 3: Verify in browser**

- 4 tier cards visible. On wide screens they sit in a single row; on tablet → 2×2; on phone → stacked.
- CMS Edition card has the "★ Рекомендуємо" violet badge, sits slightly higher, has a violet ring.
- Clicking any KPI chip in the Hero scrolls down and lands on the matching card (chip → `#tier-<id>`).
- "Подивитись повний список" accordion opens and shows the full bullet list.
- "Обрати тариф" button on each card → scrolls toward Next Steps anchor (the anchor doesn't exist yet, the URL hash updates).
- "Подивитись живе демо →" link returns to landing.
- Full Stack card has no "Що НЕ входить" block.

- [ ] **Step 4: Commit**

```bash
git add src/components/proposal/sections/tiers.jsx src/proposal.jsx
git commit -m "feat(proposal): add Tiers section (4 cards, CMS featured)"
```

---

## Task 7: Comparison matrix section

**Goal:** Full feature comparison table grouped by topic, sticky first column on mobile.

**Files:**
- Create: `src/components/proposal/sections/comparison.jsx`
- Modify: `src/proposal.jsx`

- [ ] **Step 1: Write Comparison section**

Create `src/components/proposal/sections/comparison.jsx`:

```jsx
import { FadeIn } from "@/components/proposal/fade-in";
import { SectionHeader } from "@/components/proposal/section-header";
import { COMPARISON_GROUPS, TIERS } from "@/lib/proposal-data";
import { cn } from "@/lib/utils";

const RECOMMENDED_INDEX = TIERS.findIndex((t) => t.recommended);

export function Comparison() {
  return (
    <section id="section-3" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 lg:px-6 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          number="3"
          title="Порівняння можливостей"
          subtitle="Повний перелік — щоб не загубити жодну деталь."
        />
      </div>

      <FadeIn>
        <div
          className="overflow-x-auto rounded-2xl border border-border bg-white ring-1 ring-ink/5"
          style={{
            WebkitMaskImage: "linear-gradient(to right, black 92%, transparent)",
            maskImage: "linear-gradient(to right, black 92%, transparent)",
          }}
        >
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="bg-paper">
                <th className="sticky left-0 z-10 bg-paper border-b border-border px-4 py-3 text-left font-semibold text-ink">
                  Можливість
                </th>
                {TIERS.map((t, i) => (
                  <th
                    key={t.id}
                    className={cn(
                      "border-b border-border px-4 py-3 text-center font-semibold text-ink",
                      i === RECOMMENDED_INDEX && "bg-violet/8 text-violet-dark"
                    )}
                  >
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_GROUPS.map((group) => (
                <Group key={group.label} group={group} />
              ))}
            </tbody>
          </table>
        </div>
      </FadeIn>

      <p className="mt-4 max-w-2xl text-sm text-mute lg:ml-[5.5rem]">
        Перейти на вищий тариф можна будь-коли — контент і дані зберігаються.
      </p>
    </section>
  );
}

function Group({ group }) {
  return (
    <>
      <tr>
        <td
          colSpan={TIERS.length + 1}
          className="sticky left-0 bg-ink/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-mute"
        >
          {group.label}
        </td>
      </tr>
      {group.rows.map((row, ri) => (
        <tr key={row.feature} className="border-t border-border/50">
          <th
            scope="row"
            className="sticky left-0 z-10 bg-white border-r border-border px-4 py-2.5 text-left font-medium text-ink"
          >
            {row.feature}
          </th>
          {row.values.map((v, i) => (
            <td
              key={i}
              className={cn(
                "px-4 py-2.5 text-center",
                i === RECOMMENDED_INDEX && "bg-violet/5",
                row.highlight && "font-semibold text-ink",
                v === "✓" && "text-success",
                v === "—" && "text-mute-soft"
              )}
            >
              {v}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
```

- [ ] **Step 2: Mount in ProposalPage**

Add `import { Comparison }` and render under `<Tiers />`.

- [ ] **Step 3: Verify in browser**

- Section header "3 — Порівняння можливостей" renders.
- Table has 4 tier columns + first feature column.
- CMS Edition column has a subtle violet tint.
- Group sub-headers ("Контент", "Заявки і ціни", "Продажі", "Платежі і мови", "Підтримка і умови") render between row groups.
- On a 360px viewport, the table scrolls horizontally and the first column stays sticky.
- "Ціна разово" row is bold.

- [ ] **Step 4: Commit**

```bash
git add src/components/proposal/sections/comparison.jsx src/proposal.jsx
git commit -m "feat(proposal): add Comparison matrix section"
```

---

## Task 8: Hosting section

**Goal:** Hosting + support pricing matrix, "how it works" supporting cards.

**Files:**
- Create: `src/components/proposal/sections/hosting.jsx`
- Modify: `src/proposal.jsx`

- [ ] **Step 1: Write Hosting section**

Create `src/components/proposal/sections/hosting.jsx`:

```jsx
import { Check, MessageSquare, Gift, KeyRound } from "lucide-react";
import { FadeIn } from "@/components/proposal/fade-in";
import { SectionHeader } from "@/components/proposal/section-header";
import { HOSTING_PLANS, HOSTING_FEATURE_ROWS } from "@/lib/proposal-data";

function renderCell(value, type) {
  if (type === "bool") {
    return value ? (
      <Check className="mx-auto size-4 text-success" />
    ) : (
      <span className="text-mute-soft">—</span>
    );
  }
  return <span className="text-ink">{value}</span>;
}

export function Hosting() {
  return (
    <section id="section-4" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-16 lg:px-6 lg:py-24">
      <FadeIn>
        <SectionHeader
          number="4"
          title="Хостинг + підтримка сайту"
          subtitle="Сайт і адмінку тримаємо на нашій інфраструктурі. Ви не думаєте про сервери, оновлення, бекапи — це наша робота."
        />
      </FadeIn>

      <FadeIn>
        <div className="overflow-x-auto rounded-2xl border border-border bg-white ring-1 ring-ink/5">
          <table className="w-full min-w-[600px] border-collapse text-sm">
            <thead>
              <tr className="bg-paper">
                <th className="border-b border-border px-4 py-3 text-left font-semibold text-ink">
                  Що включено
                </th>
                {HOSTING_PLANS.map((p) => (
                  <th key={p.plan} className="border-b border-border px-4 py-3 text-center font-semibold text-ink">
                    {p.plan}
                  </th>
                ))}
              </tr>
              <tr className="bg-paper/60">
                <th className="border-b border-border px-4 py-2 text-left text-xs uppercase tracking-wider text-mute">
                  Ціна за місяць
                </th>
                {HOSTING_PLANS.map((p) => (
                  <td key={p.plan} className="border-b border-border px-4 py-2 text-center font-display text-2xl font-semibold text-ink">
                    €{p.monthly}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {HOSTING_FEATURE_ROWS.map((row) => (
                <tr key={row.key} className="border-t border-border/50">
                  <th scope="row" className="px-4 py-2.5 text-left font-medium text-ink">
                    {row.label}
                  </th>
                  {HOSTING_PLANS.map((p) => (
                    <td key={p.plan} className="px-4 py-2.5 text-center">
                      {renderCell(
                        row.type === "hours" ? p.monthlyHours : p.features[row.key],
                        row.type
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeIn>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <FadeIn delay={0.05}>
          <HostingNote
            icon={MessageSquare}
            title="Як це працює"
            body='Менеджер пише нам у Telegram: «онови фото туру», «додай дату вильоту 15 червня», «зміни ціну з Києва» — робимо за день у межах включених годин. Без чекання девелопера.'
          />
        </FadeIn>
        <FadeIn delay={0.1}>
          <HostingNote
            icon={Gift}
            title="Подарунок на старті"
            body="Перший місяць у подарунок для Quick Launch / CMS / Sales Engine. Три місяці у подарунок для Full Stack (€360 вартості)."
          />
        </FadeIn>
        <FadeIn delay={0.15}>
          <HostingNote
            icon={KeyRound}
            title="Ваші дані — ваші"
            body="У будь-який момент можете запросити повну копію бази та інструкцію для міграції на власний сервер. Без штрафів, без переговорів — пункт у договорі."
          />
        </FadeIn>
      </div>

      <p className="mt-6 text-sm text-mute">
        Потрібно більше годин правок? Підключайте dev-retainer (5 годин за €280/міс) поверх хостингу — або платіть погодинно (€30/год).
      </p>
    </section>
  );
}

function HostingNote({ icon: Icon, title, body }) {
  return (
    <div className="h-full rounded-xl border border-border bg-white p-5 ring-1 ring-ink/5">
      <div className="mb-2 inline-flex items-center justify-center rounded-lg bg-violet/10 p-2 text-violet">
        <Icon className="size-4" />
      </div>
      <h3 className="font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-mute">{body}</p>
    </div>
  );
}
```

- [ ] **Step 2: Mount in ProposalPage**

Add `import { Hosting }` and render under `<Comparison />`.

- [ ] **Step 3: Verify in browser**

- "4 — Хостинг + підтримка сайту" section renders.
- Three plan columns with €50 / €80 / €120 prices in large display font.
- Boolean rows render check (success-green) or em-dash.
- Three "how it works" cards below the table.

- [ ] **Step 4: Commit**

```bash
git add src/components/proposal/sections/hosting.jsx src/proposal.jsx
git commit -m "feat(proposal): add Hosting section"
```

---

## Task 9: What's-included section

**Goal:** Universal benefits available in every tier — icon-chip grid.

**Files:**
- Create: `src/components/proposal/sections/whats-included.jsx`
- Modify: `src/proposal.jsx`

- [ ] **Step 1: Write WhatsIncluded section**

Create `src/components/proposal/sections/whats-included.jsx`:

```jsx
import { UserRound, Video, MessageSquare, Globe, Code, BookOpen } from "lucide-react";
import { FadeIn } from "@/components/proposal/fade-in";
import { SectionHeader } from "@/components/proposal/section-header";
import { UNIVERSAL_BENEFITS } from "@/lib/proposal-data";

const ICON_MAP = { UserRound, Video, MessageSquare, Globe, Code, BookOpen };

export function WhatsIncluded() {
  return (
    <section id="section-5" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-16 lg:px-6 lg:py-24">
      <FadeIn>
        <SectionHeader
          number="5"
          title="Що включено у будь-який тариф"
          subtitle="Те, що ми робимо завжди — не залежно від обраного пакету."
        />
      </FadeIn>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {UNIVERSAL_BENEFITS.map((b, i) => {
          const Icon = ICON_MAP[b.icon] || UserRound;
          return (
            <FadeIn key={b.label} delay={i * 0.04}>
              <div className="flex h-full items-start gap-3 rounded-xl border border-border bg-white p-4 ring-1 ring-ink/5">
                <div className="shrink-0 rounded-lg bg-yellow/20 p-2 text-yellow-dark">
                  <Icon className="size-4" />
                </div>
                <p className="text-sm leading-snug text-ink">{b.label}</p>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Mount and verify**

Add `import { WhatsIncluded }` to `proposal.jsx` and render under `<Hosting />`. Reload — 6 icon-chip cards render in a 1 / 2 / 3 column grid.

- [ ] **Step 3: Commit**

```bash
git add src/components/proposal/sections/whats-included.jsx src/proposal.jsx
git commit -m "feat(proposal): add WhatsIncluded section"
```

---

## Task 10: Add-ons section

**Goal:** Add-on services table.

**Files:**
- Create: `src/components/proposal/sections/add-ons.jsx`
- Modify: `src/proposal.jsx`

- [ ] **Step 1: Write AddOns section**

Create `src/components/proposal/sections/add-ons.jsx`:

```jsx
import { FadeIn } from "@/components/proposal/fade-in";
import { SectionHeader } from "@/components/proposal/section-header";
import { ADD_ONS } from "@/lib/proposal-data";

export function AddOns() {
  return (
    <section id="section-6" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-16 lg:px-6 lg:py-24">
      <FadeIn>
        <SectionHeader
          number="6"
          title="Додаткові послуги"
          subtitle="Опції до будь-якого тарифу. Будь-яку можна додати після старту — оцінимо письмово."
        />
      </FadeIn>

      <FadeIn>
        <div className="overflow-hidden rounded-2xl border border-border bg-white ring-1 ring-ink/5">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-paper">
              <tr>
                <th className="border-b border-border px-5 py-3 text-left font-semibold text-ink">Послуга</th>
                <th className="border-b border-border px-5 py-3 text-right font-semibold text-ink">Ціна</th>
              </tr>
            </thead>
            <tbody>
              {ADD_ONS.map((row) => (
                <tr key={row.service} className="border-t border-border/50">
                  <td className="px-5 py-3 text-ink">{row.service}</td>
                  <td className="px-5 py-3 text-right font-medium text-violet">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeIn>
    </section>
  );
}
```

- [ ] **Step 2: Mount and verify**

Add `import { AddOns }` to `proposal.jsx` under `<WhatsIncluded />`. Reload — 10-row table renders cleanly. Prices right-aligned in violet.

- [ ] **Step 3: Commit**

```bash
git add src/components/proposal/sections/add-ons.jsx src/proposal.jsx
git commit -m "feat(proposal): add AddOns section"
```

---

## Task 11: Terms section

**Goal:** Cooperation terms — payment schedule, contract, change requests, workflow — in a 4-up grid.

**Files:**
- Create: `src/components/proposal/sections/terms.jsx`
- Modify: `src/proposal.jsx`

- [ ] **Step 1: Write Terms section**

Create `src/components/proposal/sections/terms.jsx`:

```jsx
import { Wallet, FileSignature, GitCompareArrows, Workflow as WorkflowIcon } from "lucide-react";
import { FadeIn } from "@/components/proposal/fade-in";
import { SectionHeader } from "@/components/proposal/section-header";
import { TERMS } from "@/lib/proposal-data";

export function Terms() {
  return (
    <section id="section-7" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-16 lg:px-6 lg:py-24">
      <FadeIn>
        <SectionHeader
          number="7"
          title="Умови співпраці"
          subtitle="Прозоро, без сюрпризів. Все, що зазвичай питають перед підписанням договору."
        />
      </FadeIn>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FadeIn delay={0.05}>
          <TermCard icon={Wallet} title="Графік платежів">
            <div className="mb-4 flex h-3 overflow-hidden rounded-full bg-border">
              <span className="bg-violet" style={{ width: "50%" }} />
              <span className="bg-pink" style={{ width: "30%" }} />
              <span className="bg-yellow" style={{ width: "20%" }} />
            </div>
            <ul className="space-y-2 text-sm">
              {TERMS.paymentSchedule.map((p) => (
                <li key={p.percent} className="flex gap-2">
                  <span className="font-display w-10 shrink-0 text-lg font-semibold text-ink">{p.percent}%</span>
                  <span className="text-mute">
                    <span className="text-ink">{p.when}</span> — {p.detail}
                  </span>
                </li>
              ))}
            </ul>
          </TermCard>
        </FadeIn>

        <FadeIn delay={0.1}>
          <TermCard icon={FileSignature} title="Договір">
            <p className="mb-2 text-sm text-mute">Український, із посиланням на чітко прописаний обсяг робіт. Включає:</p>
            <ul className="space-y-1.5 text-sm">
              {TERMS.contract.map((c) => (
                <li key={c} className="flex gap-2 text-ink">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-mute-soft" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </TermCard>
        </FadeIn>

        <FadeIn delay={0.15}>
          <TermCard icon={GitCompareArrows} title="Зміни в обсязі (change requests)">
            <p className="text-sm leading-relaxed text-ink">{TERMS.changeRequests}</p>
          </TermCard>
        </FadeIn>

        <FadeIn delay={0.2}>
          <TermCard icon={WorkflowIcon} title="Робочий процес">
            <ol className="space-y-2 text-sm">
              {TERMS.workflow.map((w, i) => (
                <li key={w} className="flex gap-3">
                  <span className="font-display flex size-6 shrink-0 items-center justify-center rounded-full bg-violet/10 text-xs font-semibold text-violet">
                    {i + 1}
                  </span>
                  <span className="text-ink">{w}</span>
                </li>
              ))}
            </ol>
          </TermCard>
        </FadeIn>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-mute">
        <span className="font-semibold text-ink">Гарантійний період:</span> {TERMS.warranty.replace(/^Гарантійний період: /, "")}
      </p>
    </section>
  );
}

function TermCard({ icon: Icon, title, children }) {
  return (
    <div className="h-full rounded-2xl border border-border bg-white p-6 ring-1 ring-ink/5">
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex items-center justify-center rounded-lg bg-violet/10 p-2 text-violet">
          <Icon className="size-4" />
        </span>
        <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      </div>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Mount and verify**

Add `import { Terms }` to `proposal.jsx` under `<AddOns />`. Reload — 2×2 grid renders. Payment-schedule bar shows violet/pink/yellow segments in 50/30/20 proportions.

- [ ] **Step 3: Commit**

```bash
git add src/components/proposal/sections/terms.jsx src/proposal.jsx
git commit -m "feat(proposal): add Terms section"
```

---

## Task 12: NotIncluded section

**Goal:** Honest "things we don't do" list.

**Files:**
- Create: `src/components/proposal/sections/not-included.jsx`
- Modify: `src/proposal.jsx`

- [ ] **Step 1: Write NotIncluded section**

Create `src/components/proposal/sections/not-included.jsx`:

```jsx
import { X } from "lucide-react";
import { FadeIn } from "@/components/proposal/fade-in";
import { SectionHeader } from "@/components/proposal/section-header";
import { NOT_INCLUDED } from "@/lib/proposal-data";

export function NotIncluded() {
  return (
    <section id="section-8" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-16 lg:px-6 lg:py-24">
      <FadeIn>
        <SectionHeader
          number="8"
          title="Що ми НЕ робимо"
          subtitle="Чесні межі — щоб ви знали, кого ще треба запросити в команду."
        />
      </FadeIn>

      <FadeIn>
        <ul className="grid grid-cols-1 gap-3 lg:ml-[5.5rem] md:grid-cols-2">
          {NOT_INCLUDED.map((item) => (
            <li key={item} className="flex gap-2 rounded-lg border border-border bg-white px-4 py-3 ring-1 ring-ink/5">
              <X className="mt-0.5 size-4 shrink-0 text-mute-soft" />
              <span className="text-sm text-ink">{item}</span>
            </li>
          ))}
        </ul>
      </FadeIn>

      <p className="mt-6 text-sm text-mute lg:ml-[5.5rem]">
        Готові порекомендувати перевірених підрядників за кожним пунктом.
      </p>
    </section>
  );
}
```

- [ ] **Step 2: Mount and verify**

Add `import { NotIncluded }` to `proposal.jsx` under `<Terms />`. Reload — 6 items render in 2 columns on desktop, 1 on mobile.

- [ ] **Step 3: Commit**

```bash
git add src/components/proposal/sections/not-included.jsx src/proposal.jsx
git commit -m "feat(proposal): add NotIncluded section"
```

---

## Task 13: NextSteps section

**Goal:** 4 numbered next-step cards + big CTA panel.

**Files:**
- Create: `src/components/proposal/sections/next-steps.jsx`
- Modify: `src/proposal.jsx`

- [ ] **Step 1: Write NextSteps section**

Create `src/components/proposal/sections/next-steps.jsx`:

```jsx
import { CalendarCheck, Send, Phone } from "lucide-react";
import { FadeIn } from "@/components/proposal/fade-in";
import { SectionHeader } from "@/components/proposal/section-header";
import { Button } from "@/components/ui/button";
import { NEXT_STEPS, PROPOSAL_META } from "@/lib/proposal-data";

export function NextSteps() {
  return (
    <section id="section-9" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-16 lg:px-6 lg:py-24">
      <FadeIn>
        <SectionHeader number="9" title="Наступні кроки" />
      </FadeIn>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {NEXT_STEPS.map((step, i) => (
          <FadeIn key={step} delay={i * 0.05}>
            <div className="flex h-full gap-4 rounded-2xl border border-border bg-white p-5 ring-1 ring-ink/5">
              <span className="font-display flex size-10 shrink-0 items-center justify-center rounded-full bg-violet text-white text-lg font-semibold">
                {i + 1}
              </span>
              <p className="self-center text-base leading-snug text-ink">{step}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn>
        <div className="mt-10 rounded-3xl border border-violet/30 bg-gradient-to-br from-violet/10 via-pink/5 to-yellow/10 p-8 ring-1 ring-violet/10 print:hidden">
          <div className="flex flex-col items-center gap-4 text-center">
            <h3 className="font-display text-2xl font-semibold text-ink lg:text-3xl">
              Готові обговорити деталі?
            </h3>
            <p className="max-w-xl text-mute">
              30-хвилинна зустріч — пройдемось по тарифах, відповімо на питання, узгодимо старт.
            </p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="primary" size="lg">
                <a href={PROPOSAL_META.contact.calendar} target="_blank" rel="noopener noreferrer">
                  <CalendarCheck className="size-4" />
                  Записатись на 30-хв дзвінок
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={PROPOSAL_META.contact.telegramUrl} target="_blank" rel="noopener noreferrer">
                  <Send className="size-4" />
                  Telegram: {PROPOSAL_META.contact.telegram}
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <a href={PROPOSAL_META.contact.phoneHref}>
                  <Phone className="size-4" />
                  {PROPOSAL_META.contact.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
```

- [ ] **Step 2: Mount and verify**

Add `import { NextSteps }` to `proposal.jsx` under `<NotIncluded />`. Reload — 4 numbered steps, big gradient CTA panel below with 3 buttons. Calendar button opens calendar app URL in a new tab; Telegram opens t.me; phone triggers tel: link.

Verify the "Обрати тариф" buttons on the tier cards (from Task 6) now correctly land at this section.

- [ ] **Step 3: Commit**

```bash
git add src/components/proposal/sections/next-steps.jsx src/proposal.jsx
git commit -m "feat(proposal): add NextSteps section with CTA panel"
```

---

## Task 14: Footer section

**Goal:** Contact footer mirroring travel-crm reference, with WOW Tours branding.

**Files:**
- Create: `src/components/proposal/sections/footer.jsx`
- Modify: `src/proposal.jsx`

- [ ] **Step 1: Write Footer**

Create `src/components/proposal/sections/footer.jsx`:

```jsx
import { CalendarCheck, Phone, Send } from "lucide-react";
import { PROPOSAL_META } from "@/lib/proposal-data";

export function Footer() {
  return (
    <footer id="footer" className="border-t border-border bg-paper">
      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-6 lg:py-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-mute">
            Контакт для запитань і підписання
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <a
              href={PROPOSAL_META.contact.calendar}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-paper ring-1 ring-ink/20 transition-all hover:bg-ink-soft"
            >
              <CalendarCheck className="size-4" />
              Записатись на 30-хв зустріч
            </a>
            <a
              href={PROPOSAL_META.contact.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-ink ring-1 ring-ink/5 transition-all hover:bg-paper"
            >
              <Send className="size-4" />
              Telegram: {PROPOSAL_META.contact.telegram}
            </a>
            <a
              href={PROPOSAL_META.contact.phoneHref}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-ink ring-1 ring-ink/5 transition-all hover:bg-paper"
            >
              <Phone className="size-4" />
              {PROPOSAL_META.contact.phoneDisplay}
            </a>
          </div>
          <p className="mt-4 max-w-xl text-balance text-xs italic text-mute">
            Пропозиція дійсна до {PROPOSAL_META.validUntil}. Усі ціни в {PROPOSAL_META.currency}, без ПДВ.
          </p>
          <p className="mt-2 text-xs text-mute-soft">
            © 2026 WOW Tours · Розробка нового сайту
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Mount and verify**

Add `import { Footer }` to `proposal.jsx` and render under `<NextSteps />`. Reload — footer renders 3 contact buttons + validity + copyright.

- [ ] **Step 3: Commit**

```bash
git add src/components/proposal/sections/footer.jsx src/proposal.jsx
git commit -m "feat(proposal): add Footer section"
```

---

## Task 15: Print styles + globals tweaks

**Goal:** PDF-friendly layout when user does Cmd-P. Hide CTAs, prevent card splits, ensure white background.

**Files:**
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Add print rules**

Append to the bottom of `src/styles/globals.css`:

```css
/* Proposal page — print */
@media print {
  html, body {
    background: #ffffff !important;
    color: #000000 !important;
  }

  /* Hide interactive elements that don't belong on paper */
  .print\:hidden { display: none !important; }

  /* Don't split cards / sections across pages */
  article, .term-card, table { break-inside: avoid; page-break-inside: avoid; }

  /* Tighter comparison table for A4 */
  table { font-size: 0.72rem; }

  /* Strip backgrounds from radial gradients etc. */
  section { background: transparent !important; }
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `#/proposal`, hit Cmd-P (Chrome) → preview the document. Confirm:

- No yellow demo banner (we're not on the landing).
- Hero CTAs hidden.
- NextSteps gradient panel hidden.
- Footer contacts visible (they're the takeaway — not marked `print:hidden`).
- Tier cards don't split across pages.
- Comparison table fits roughly within an A4 column without scrollbars.

- [ ] **Step 3: Commit**

```bash
git add src/styles/globals.css
git commit -m "feat(proposal): add print styles for PDF export"
```

---

## Task 16: Full responsive sweep + build verification

**Goal:** Walk every section at four viewport sizes, fix what breaks, then verify a clean production build.

**Files:** depends on what needs fixing.

- [ ] **Step 1: Browser sweep at 4 widths**

Open `#/proposal` and resize via DevTools to: 360, 768, 1280, 1920.

For each size, scroll the entire page and look for:
- Overflowing text or horizontal scrollbars on the outer page (not the comparison table — that one is allowed to scroll).
- Tier cards: readable at every size; 1/2/4 columns at the right breakpoints.
- KPI chips: never crammed (2×2 minimum readability on mobile).
- Comparison: first column sticky on horizontal scroll, fade-mask hint on right edge visible at 360.
- Hosting table: scrolls horizontally on mobile.
- AddOns table: prices stay right-aligned, service text wraps cleanly.
- Terms 2×2 grid: stacks to 1 column under 768; payment-schedule bar stays visible.
- NextSteps CTA panel: buttons stack on mobile.
- Footer: 3 contact buttons stack on mobile.

Document any issues, then fix them with the smallest possible Tailwind class change.

- [ ] **Step 2: Verify production build**

```bash
npm run build
```

Expected: build completes without errors. Bundle size warnings are OK; new errors are not.

```bash
npm run preview
```

Open `http://localhost:4173/wow-tours/#/proposal` and `http://localhost:4173/wow-tours/` — both routes render correctly, demo banner shows, links work.

- [ ] **Step 3: Final route walk-through**

In the running preview, confirm the full happy path:
1. Land on `/wow-tours/` → see demo banner.
2. Click "← Повернутись до пропозиції" → land on proposal.
3. Click a KPI chip in the hero → scroll to tier card.
4. Open the "Подивитись повний список" accordion on the CMS card.
5. Click "Обрати тариф" on the recommended card → scroll to NextSteps.
6. Click "Записатись на 30-хв дзвінок" → opens Google Calendar in a new tab.
7. Click "Подивитись живе демо →" link on any tier card → returns to landing.
8. Cmd-P → preview prints cleanly.

- [ ] **Step 4: Final commit if anything changed**

```bash
git status
# if anything was tweaked during the sweep:
git add <touched files>
git commit -m "fix(proposal): responsive polish + final build verification"
```

If nothing needed fixing, skip the commit.

---

## Self-review

**Spec coverage check.** Every section in the spec maps to a task:

- Routing + DemoBanner → Task 1
- Shared primitives → Task 2
- Data file → Task 3
- Hero → Task 4
- Framing → Task 5
- Tiers (centerpiece) → Task 6
- Comparison → Task 7
- Hosting → Task 8
- WhatsIncluded → Task 9
- AddOns → Task 10
- Terms → Task 11
- NotIncluded → Task 12
- NextSteps → Task 13
- Footer → Task 14
- Print styles → Task 15
- Responsive + build → Task 16

**Naming consistency.** All sections use `id="section-N"` matching the SectionHeader number. Tier cards use `id="tier-<slug>"` and the hero KPI chips link to them. NextSteps anchor `#section-9` matches what tier cards link to.

**Token consistency.** Plan calls out the wow-tours design tokens up front; every code block uses them (no `bg-card`, no `text-foreground`, no `default` Button variant).

**No placeholders left.** Every code block contains complete, copy-pasteable JSX. Data file is fully populated from the source doc.

**Scope.** Single page, no new dependencies, fits in one plan.

---

Plan complete and saved to `docs/superpowers/plans/2026-05-13-proposal-page.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?