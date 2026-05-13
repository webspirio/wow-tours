# Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace inline-styles single-tour landing with shadcn/ui + Aceternity + Magic UI redesign in Bold Adventure direction (WOW Original palette, DM Serif Display + DM Sans, medium animation density).

**Architecture:** React 19 + Vite 6 + Tailwind CSS v4 + shadcn/ui primitives + Aceternity (AuroraBackground, FlipWords, TracingBeam) + Magic UI (NumberTicker, Marquee) + motion/react. Section-by-section migration with full commit after each section. Spec at `docs/superpowers/specs/2026-05-13-landing-redesign-design.md`.

**Tech Stack:** React 19, Vite 6, Tailwind CSS v4, tailwindcss-animate, motion (formerly framer-motion), react-hook-form, zod, class-variance-authority, clsx, tailwind-merge, lucide-react, @radix-ui (via shadcn), Aceternity + Magic UI component copies.

---

## Task 1: Initialize git + bootstrap Tailwind v4 and shadcn dependencies

**Files:**
- Modify: `package.json`
- Create: `tailwind.config.js` (NOT NEEDED in v4 — use CSS-only `@theme`)
- Modify: `vite.config.js`
- Create: `.git` (via init)

- [ ] **Step 1: Initialize git repo**

```bash
cd /Users/oleksandrsecond/Projects/wow-tours
git init
git add .gitignore
git commit -m "chore: initial commit (gitignore only)"
```

Expected: `master` (or `main`) branch created with one commit.

- [ ] **Step 2: Install Tailwind v4 + Vite plugin + shadcn deps**

```bash
npm install -D tailwindcss@^4 @tailwindcss/vite tailwindcss-animate
npm install class-variance-authority clsx tailwind-merge lucide-react motion react-hook-form zod @hookform/resolvers
```

Expected: packages added to `package.json`, no errors, lockfile updated.

- [ ] **Step 3: Add shadcn-related Radix primitives**

```bash
npm install @radix-ui/react-slot @radix-ui/react-accordion @radix-ui/react-label @radix-ui/react-select @radix-ui/react-toast
```

Expected: 5 Radix primitives installed.

- [ ] **Step 4: Update `vite.config.js` to add Tailwind plugin**

Replace entire file contents at `/Users/oleksandrsecond/Projects/wow-tours/vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/wow-tours/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 5: Create `jsconfig.json` so `@/` alias resolves in editors**

Create `/Users/oleksandrsecond/Projects/wow-tours/jsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- [ ] **Step 6: Verify install with build**

```bash
npm run build
```

Expected: build still exits 0 (Tailwind not yet imported into any file).

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.js jsconfig.json
git commit -m "feat: bootstrap Tailwind v4 + shadcn deps"
```

---

## Task 2: Design tokens + global styles

**Files:**
- Create: `src/styles/globals.css`
- Modify: `src/main.jsx` (import globals)

- [ ] **Step 1: Create `src/styles/globals.css` with Tailwind v4 + design tokens**

Create `/Users/oleksandrsecond/Projects/wow-tours/src/styles/globals.css`:

```css
@import "tailwindcss";
@import "tailwindcss-animate";

@theme {
  /* Brand colors — WOW Original palette */
  --color-violet: #7c3aed;
  --color-violet-dark: #5b21b6;
  --color-pink: #ec4899;
  --color-pink-dark: #be185d;
  --color-yellow: #fbbf24;
  --color-yellow-dark: #d97706;
  --color-ink: #1a1a2e;
  --color-ink-soft: #2a2a44;
  --color-paper: #fafaf8;
  --color-mute: #6b7280;
  --color-mute-soft: #9ca3af;
  --color-border: #e5e7eb;
  --color-success: #10b981;
  --color-danger: #ef4444;

  /* Typography */
  --font-display: "DM Serif Display", Georgia, serif;
  --font-body: "DM Sans", system-ui, -apple-system, sans-serif;

  /* Shadows */
  --shadow-violet: 0 4px 30px rgb(124 58 237 / 0.25);
  --shadow-pink: 0 4px 30px rgb(236 72 153 / 0.25);
  --shadow-yellow: 0 4px 30px rgb(251 191 36 / 0.4);

  /* Animation */
  --animate-aurora: aurora 60s linear infinite;
  --animate-marquee: marquee var(--duration) linear infinite;
  --animate-marquee-vertical: marquee-vertical var(--duration) linear infinite;
  --animate-shimmer: shimmer 2s linear infinite;
}

@keyframes aurora {
  from { background-position: 50% 50%, 50% 50%; }
  to { background-position: 350% 50%, 350% 50%; }
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-100% - var(--gap))); }
}

@keyframes marquee-vertical {
  from { transform: translateY(0); }
  to { transform: translateY(calc(-100% - var(--gap))); }
}

@keyframes shimmer {
  from { background-position: -200% 0; }
  to { background-position: 200% 0; }
}

/* Base */
html { scroll-behavior: smooth; }

body {
  font-family: var(--font-body);
  color: var(--color-ink);
  background: var(--color-paper);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* Reduce motion when user prefers */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Import globals.css in `src/main.jsx`**

Replace entire `src/main.jsx`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/globals.css'
import Landing from './landing.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Landing />
  </React.StrictMode>
)
```

- [ ] **Step 3: Run build to verify Tailwind compiles**

```bash
npm run build
```

Expected: build exits 0, CSS file generated in `dist/assets/`.

- [ ] **Step 4: Commit**

```bash
git add src/styles/globals.css src/main.jsx
git commit -m "feat: add Tailwind v4 theme tokens + WOW palette"
```

---

## Task 3: Create `lib/utils.js` + `lib/tour-data.js`

**Files:**
- Create: `src/lib/utils.js`
- Create: `src/lib/tour-data.js`

- [ ] **Step 1: Create `src/lib/utils.js` (shadcn `cn()` helper)**

```js
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 2: Create `src/lib/tour-data.js` with all mock data**

```js
export const TOUR = {
  name: "Ісландія — країна вулканів і гейзерів",
  badge: "Найкращий маршрут року",
  days: 7,
  nights: 6,
  cover: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=1920&q=85",
  rotatingWords: ["вулканів", "льодовиків", "гейзерів", "північного сяйва"],
  shortDesc: "Незабутня подорож островом крізь чорні пляжі, льодовикові лагуни, водоспади і північне сяйво.",
};

export const PRICES = {
  cities: ["Київ", "Львів", "Одеса", "Варшава"],
  windows: [
    { label: "Сьогодні", days: 0 },
    { label: "Через 7 днів", days: 7 },
    { label: "Через 14 днів", days: 14 },
  ],
  // EUR per person — mock data, would come from Travelpayouts API
  table: {
    "Київ": [420, 380, 410],
    "Львів": [395, 360, 390],
    "Одеса": [440, 405, 425],
    "Варшава": [340, 310, 335],
  },
  lastUpdate: "10 хвилин тому",
};

export const INCLUDED = [
  { icon: "✈️", text: "Авіаквиток в обидва боки (динамічна ціна, ваш вибір міста)" },
  { icon: "🏨", text: "6 ночей у готелі 3*/4* з сніданком" },
  { icon: "🚐", text: "Трансфер з аеропорту і назад" },
  { icon: "🗣️", text: "Гід українською мовою на весь тур" },
  { icon: "🎟️", text: "Всі вхідні квитки за програмою" },
  { icon: "🛡️", text: "Медична страховка на весь період" },
];

export const NOT_INCLUDED = [
  { icon: "🍽️", text: "Обіди і вечері (середній бюджет €25–35/день)" },
  { icon: "💸", text: "Особисті витрати" },
  { icon: "💵", text: "Чайові гіду (рекомендовано €3–5/день)" },
];

export const ITINERARY = [
  { day: 1, title: "Прибуття в Рейк'явік", desc: "Зустріч в аеропорту Кефлавік, трансфер у готель. Вечірня прогулянка центром столиці.", icon: "✈️" },
  { day: 2, title: "Золоте кільце", desc: "Гейзер Strokkur, водоспад Gullfoss, національний парк Þingvellir.", icon: "💧" },
  { day: 3, title: "Південне узбережжя", desc: "Водоспади Seljalandsfoss і Skógafoss, чорний пляж Reynisfjara.", icon: "🌊" },
  { day: 4, title: "Льодовикові лагуни", desc: "Jökulsárlón — лагуна з айсбергами, Diamond Beach.", icon: "🧊" },
  { day: 5, title: "Полярне сяйво", desc: "Денний відпочинок, ввечері — полювання на полярне сяйво (за погодою).", icon: "✨" },
  { day: 6, title: "Блакитна лагуна", desc: "Геотермальні джерела Blue Lagoon, релакс перед від'їздом.", icon: "♨️" },
  { day: 7, title: "Повернення", desc: "Трансфер в аеропорт, виліт додому.", icon: "🛬" },
];

export const TESTIMONIALS = [
  { name: "Ольга К.", city: "Київ", quote: "Найкраща подорож у моєму житті. Гід Олександр — професіонал, кожна локація запам'яталась.", avatar: "🌸" },
  { name: "Дмитро і Анна", city: "Львів", quote: "Полярне сяйво нас просто вразило. Все продумано — від трансферу до останньої деталі.", avatar: "🏔️" },
  { name: "Марія П.", city: "Одеса", quote: "Спочатку боялась що буде дорого, але живі ціни на квитки реально допомогли впіймати вигідний день.", avatar: "✨" },
  { name: "Андрій С.", city: "Дніпро", quote: "Купив тур як подарунок дружині на річницю — досі дякує. Літали з Києва, ціна того дня була нижча на €50.", avatar: "💫" },
  { name: "Катерина і Сергій", city: "Харків", quote: "Усе як в кіно — водоспади, лагуни, гарячі джерела. Дякуємо команді WOW Tours за організацію!", avatar: "🌋" },
  { name: "Юлія Б.", city: "Одеса", quote: "Літала сама, але група була дружньою. Гід знав ідеальні точки для фото.", avatar: "📸" },
];

export const FLIGHT_PRICE_MIN = Math.min(
  ...Object.values(PRICES.table).flat()
);
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/utils.js src/lib/tour-data.js
git commit -m "feat: add cn() helper and tour-data mock"
```

---

## Task 4: Create shadcn UI primitives (button, card, badge, input, label, accordion)

**Files:**
- Create: `src/components/ui/button.jsx`
- Create: `src/components/ui/card.jsx`
- Create: `src/components/ui/badge.jsx`
- Create: `src/components/ui/input.jsx`
- Create: `src/components/ui/label.jsx`
- Create: `src/components/ui/accordion.jsx`

- [ ] **Step 1: Create `src/components/ui/button.jsx`**

```jsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-yellow text-ink shadow-[var(--shadow-yellow)] hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(251_191_36_/_0.5)]",
        violet: "bg-violet text-white shadow-[var(--shadow-violet)] hover:translate-y-[-2px]",
        ghost: "bg-transparent text-ink hover:bg-ink/5",
        outline: "border border-border bg-paper text-ink hover:bg-ink/5",
        gradient: "bg-gradient-to-r from-violet to-pink text-white hover:opacity-90",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = "Button"

export { Button, buttonVariants }
```

- [ ] **Step 2: Create `src/components/ui/card.jsx`**

```jsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-2xl border border-border bg-paper text-ink shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-xl font-bold leading-tight tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-mute", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
```

- [ ] **Step 3: Create `src/components/ui/badge.jsx`**

```jsx
import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        yellow: "bg-yellow text-ink",
        violet: "bg-violet text-white",
        pink: "bg-pink text-white",
        outline: "border border-border bg-paper text-ink",
        success: "bg-success/15 text-success",
      },
    },
    defaultVariants: { variant: "yellow" },
  }
)

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
```

- [ ] **Step 4: Create `src/components/ui/input.jsx`**

```jsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-11 w-full rounded-lg border border-border bg-paper px-4 py-2 text-base text-ink placeholder:text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/40 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
))
Input.displayName = "Input"

export { Input }
```

- [ ] **Step 5: Create `src/components/ui/label.jsx`**

```jsx
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "@/lib/utils"

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn("text-sm font-semibold text-ink leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
```

- [ ] **Step 6: Create `src/components/ui/accordion.jsx`**

```jsx
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b border-border", className)} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-semibold text-base hover:underline transition-all [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
```

- [ ] **Step 7: Verify build**

```bash
npm run build
```

Expected: build exits 0.

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add shadcn primitives (button, card, badge, input, label, accordion)"
```

---

## Task 5: Effect — AuroraBackground (Aceternity, customized for WOW palette)

**Files:**
- Create: `src/components/effects/aurora-background.jsx`

- [ ] **Step 1: Create `src/components/effects/aurora-background.jsx`**

```jsx
import { cn } from "@/lib/utils";

export const AuroraBackground = ({ children, className, showRadialGradient = true, ...props }) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-ink text-paper transition-bg overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "pointer-events-none absolute -inset-[10px] opacity-60 will-change-transform",
            "[--aurora:repeating-linear-gradient(100deg,#7c3aed_10%,#ec4899_25%,#fbbf24_40%,#7c3aed_55%,#ec4899_70%)]",
            "[--dark-gradient:repeating-linear-gradient(100deg,#1a1a2e_0%,#1a1a2e_7%,transparent_10%,transparent_12%,#1a1a2e_16%)]",
            "[background-image:var(--dark-gradient),var(--aurora)]",
            "[background-size:300%,_200%]",
            "[background-position:50%_50%,50%_50%]",
            "filter blur-[40px]",
            "after:content-[''] after:absolute after:inset-0",
            "after:[background-image:var(--dark-gradient),var(--aurora)]",
            "after:[background-size:200%,_100%]",
            "after:animate-[aurora_60s_linear_infinite]",
            "after:[background-attachment:fixed]",
            "after:mix-blend-screen",
            showRadialGradient && "[mask-image:radial-gradient(ellipse_at_50%_50%,black_30%,transparent_80%)]"
          )}
        />
      </div>
      {children}
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/effects/aurora-background.jsx
git commit -m "feat: add AuroraBackground effect (Aceternity, WOW palette)"
```

---

## Task 6: Effect — FlipWords (rotating headline word)

**Files:**
- Create: `src/components/effects/flip-words.jsx`

- [ ] **Step 1: Create `src/components/effects/flip-words.jsx`**

```jsx
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export const FlipWords = ({ words, duration = 2800, className }) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating) {
      const t = setTimeout(() => startAnimation(), duration);
      return () => clearTimeout(t);
    }
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence onExitComplete={() => setIsAnimating(false)}>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        exit={{ opacity: 0, y: -28, filter: "blur(6px)", position: "absolute" }}
        className={cn("z-10 inline-block relative whitespace-nowrap", className)}
        key={currentWord}
      >
        {currentWord}
      </motion.span>
    </AnimatePresence>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/effects/flip-words.jsx
git commit -m "feat: add FlipWords effect (Aceternity)"
```

---

## Task 7: Effect — NumberTicker (Magic UI animated counter)

**Files:**
- Create: `src/components/effects/number-ticker.jsx`

- [ ] **Step 1: Create `src/components/effects/number-ticker.jsx`**

```jsx
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

export function NumberTicker({ value, direction = "up", delay = 0, className, decimalPlaces = 0, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
      return () => clearTimeout(t);
    }
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        const formatted = Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(Number(latest.toFixed(decimalPlaces)));
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      }
    });
  }, [springValue, decimalPlaces, prefix, suffix]);

  return (
    <span className={cn("inline-block tabular-nums", className)} ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/effects/number-ticker.jsx
git commit -m "feat: add NumberTicker effect (Magic UI)"
```

---

## Task 8: Effect — TracingBeam (Aceternity scroll-line for itinerary)

**Files:**
- Create: `src/components/effects/tracing-beam.jsx`

- [ ] **Step 1: Create `src/components/effects/tracing-beam.jsx`**

```jsx
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export const TracingBeam = ({ children, className }) => {
  const ref = useRef(null);
  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (contentRef.current) {
      const update = () => setSvgHeight(contentRef.current.offsetHeight);
      update();
      const ro = new ResizeObserver(update);
      ro.observe(contentRef.current);
      return () => ro.disconnect();
    }
  }, []);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), {
    stiffness: 500,
    damping: 90,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]), {
    stiffness: 500,
    damping: 90,
  });

  return (
    <motion.div ref={ref} className={cn("relative w-full max-w-4xl mx-auto h-full", className)}>
      <div className="absolute -left-4 md:-left-10 top-0 hidden md:block">
        <motion.div
          className="ml-[27px] h-4 w-4 rounded-full border border-border bg-paper shadow-sm flex items-center justify-center"
        >
          <div className="h-2 w-2 rounded-full bg-violet" />
        </motion.div>
        <svg viewBox={`0 0 20 ${svgHeight}`} width="20" height={svgHeight} className="ml-4 block" aria-hidden="true">
          <motion.path
            d={`M 1 0 V ${svgHeight}`}
            fill="none"
            stroke="#e5e7eb"
            strokeOpacity="0.5"
            transition={{ duration: 10 }}
          />
          <motion.path
            d={`M 1 0 V ${svgHeight}`}
            fill="none"
            stroke="url(#tracing-gradient)"
            strokeWidth="2"
            className="motion-reduce:hidden"
            transition={{ duration: 10 }}
          />
          <defs>
            <motion.linearGradient
              id="tracing-gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#7c3aed" stopOpacity="0" />
              <stop stopColor="#7c3aed" />
              <stop offset="0.5" stopColor="#ec4899" />
              <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/effects/tracing-beam.jsx
git commit -m "feat: add TracingBeam effect (Aceternity)"
```

---

## Task 9: Effect — Marquee (Magic UI infinite-scroll)

**Files:**
- Create: `src/components/effects/marquee.jsx`

- [ ] **Step 1: Create `src/components/effects/marquee.jsx`**

```jsx
import { cn } from "@/lib/utils";

export function Marquee({ className, reverse = false, pauseOnHover = false, children, vertical = false, repeat = 4, ...props }) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1.5rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-[marquee_var(--duration)_linear_infinite] flex-row": !vertical,
              "animate-[marquee-vertical_var(--duration)_linear_infinite] flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/effects/marquee.jsx
git commit -m "feat: add Marquee effect (Magic UI)"
```

---

## Task 10: Section — Header (sticky nav)

**Files:**
- Create: `src/components/sections/header.jsx`

- [ ] **Step 1: Create `src/components/sections/header.jsx`**

```jsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-paper/95 backdrop-blur-lg border-b border-border py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="font-display text-2xl md:text-3xl bg-gradient-to-r from-violet to-pink bg-clip-text text-transparent leading-none">
          WOW Tours
        </a>
        <Button asChild variant="primary" size="sm">
          <a href="#booking">Залишити заявку</a>
        </Button>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/header.jsx
git commit -m "feat: add Header section"
```

---

## Task 11: Section — Hero (AuroraBackground + FlipWords)

**Files:**
- Create: `src/components/sections/hero.jsx`

- [ ] **Step 1: Create `src/components/sections/hero.jsx`**

```jsx
import { motion } from "motion/react";
import { AuroraBackground } from "@/components/effects/aurora-background";
import { FlipWords } from "@/components/effects/flip-words";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TOUR, FLIGHT_PRICE_MIN } from "@/lib/tour-data";

export function Hero() {
  return (
    <AuroraBackground className="min-h-screen pt-24 pb-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6"
      >
        <Badge variant="yellow" className="text-sm">
          ⭐ {TOUR.badge}
        </Badge>

        <h1 className="font-display text-paper text-[clamp(48px,9vw,120px)] leading-[0.95] tracking-tight">
          Iceland
          <br />
          <em className="not-italic bg-gradient-to-r from-yellow via-pink to-violet bg-clip-text text-transparent">
            awaits.
          </em>
        </h1>

        <div className="text-paper/90 text-lg md:text-xl max-w-2xl flex items-center justify-center gap-2 flex-wrap">
          <span>7 днів між</span>
          <span className="font-semibold text-yellow inline-flex min-w-[180px] justify-center">
            <FlipWords words={TOUR.rotatingWords} />
          </span>
        </div>

        <p className="text-paper/70 text-base md:text-lg max-w-xl">{TOUR.shortDesc}</p>

        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-paper/80 text-sm md:text-base mt-2">
          <span>🗓 {TOUR.days} днів / {TOUR.nights} ночей</span>
          <span className="opacity-50">·</span>
          <span>✈️ виліт з 4 міст</span>
          <span className="opacity-50">·</span>
          <span>💶 від €{FLIGHT_PRICE_MIN}</span>
        </div>

        <Button asChild variant="primary" size="lg" className="mt-4 text-lg">
          <a href="#booking">Хочу в цей тур →</a>
        </Button>
      </motion.div>
    </AuroraBackground>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/hero.jsx
git commit -m "feat: add Hero section with AuroraBackground + FlipWords"
```

---

## Task 12: Section — Prices (Card grid with NumberTicker)

**Files:**
- Create: `src/components/sections/prices.jsx`

- [ ] **Step 1: Create `src/components/sections/prices.jsx`**

```jsx
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NumberTicker } from "@/components/effects/number-ticker";
import { PRICES } from "@/lib/tour-data";

export function Prices() {
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
          <h2 className="font-display text-4xl md:text-5xl mb-3">
            Живі ціни на <em className="text-pink">авіаквитки</em>
          </h2>
          <p className="text-mute text-lg max-w-2xl mx-auto">
            Вартість змінюється щодня. Обирайте місто вильоту і дату, що влізе у бюджет.
          </p>
          <Badge variant="success" className="mt-4">
            ↻ Оновлено {PRICES.lastUpdate} · Travelpayouts
          </Badge>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {PRICES.cities.map((city, idx) => {
            const cityPrices = PRICES.table[city];
            const min = Math.min(...cityPrices);
            return (
              <motion.div
                key={city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="h-full hover:shadow-[var(--shadow-violet)] hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display text-2xl">{city}</h3>
                      <span className="text-xs text-mute uppercase tracking-wider">з</span>
                    </div>
                    <div className="space-y-3">
                      {PRICES.windows.map((window, wIdx) => {
                        const price = cityPrices[wIdx];
                        const isBest = price === min;
                        return (
                          <div key={window.label} className="flex items-center justify-between">
                            <span className={`text-sm ${isBest ? "font-semibold text-ink" : "text-mute"}`}>
                              {window.label}
                            </span>
                            <span className={`text-lg font-bold tabular-nums ${isBest ? "text-success" : "text-ink"}`}>
                              €<NumberTicker value={price} delay={idx * 0.1 + wIdx * 0.05} />
                              {isBest && <span className="ml-1.5 text-xs font-medium text-success">мін</span>}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <p className="text-xs text-mute text-center mt-8 max-w-2xl mx-auto">
          * Ціни вказані за людину, в одну сторону. Повна вартість туру (квиток + готель + програма) розраховується індивідуально на консультації.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/prices.jsx
git commit -m "feat: add Prices section with NumberTicker"
```

---

## Task 13: Section — Included / Not included

**Files:**
- Create: `src/components/sections/included.jsx`

- [ ] **Step 1: Create `src/components/sections/included.jsx`**

```jsx
import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { INCLUDED, NOT_INCLUDED } from "@/lib/tour-data";

function List({ items, icon: Icon, iconClass, title, accent }) {
  return (
    <div>
      <h3 className="font-display text-3xl md:text-4xl mb-6">
        {title}
        {accent && <em className={accent}>{accent === "text-success" ? " · так" : " · ні"}</em>}
      </h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <motion.li
            key={item.text}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            className="flex items-start gap-3 py-3 border-b border-border last:border-0"
          >
            <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${iconClass}`}>
              <Icon className="w-4 h-4" strokeWidth={3} />
            </span>
            <div className="flex-1">
              <span className="text-2xl mr-2">{item.icon}</span>
              <span className="text-base">{item.text}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function Included() {
  return (
    <section className="py-20 md:py-28 px-6 bg-gradient-to-br from-violet/[0.03] via-pink/[0.02] to-yellow/[0.03]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        <List
          items={INCLUDED}
          icon={Check}
          iconClass="bg-success/15 text-success"
          title="У вартість входить"
        />
        <List
          items={NOT_INCLUDED}
          icon={X}
          iconClass="bg-danger/15 text-danger"
          title="Окремо оплачуєте"
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/included.jsx
git commit -m "feat: add Included section with check/cross icons"
```

---

## Task 14: Section — Itinerary (TracingBeam + 7 days)

**Files:**
- Create: `src/components/sections/itinerary.jsx`

- [ ] **Step 1: Create `src/components/sections/itinerary.jsx`**

```jsx
import { motion } from "motion/react";
import { TracingBeam } from "@/components/effects/tracing-beam";
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
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl mb-3">
            Програма <em className="text-violet">туру</em>
          </h2>
          <p className="text-mute text-lg max-w-2xl mx-auto">
            Сім днів між льодом і вогнем, з гідом українською мовою.
          </p>
        </motion.div>

        <TracingBeam className="px-6">
          <div className="space-y-8 md:space-y-12">
            {ITINERARY.map((day, idx) => (
              <motion.article
                key={day.day}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative flex gap-6 md:gap-8 pl-2"
              >
                <div className="flex-shrink-0">
                  <div className="font-display text-violet text-3xl md:text-4xl leading-none">
                    {String(day.day).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-mute uppercase tracking-wider mt-1">
                    день
                  </div>
                </div>
                <div className="flex-1 pb-6 border-b border-border last:border-0">
                  <h3 className="font-display text-2xl md:text-3xl mb-2 flex items-center gap-3">
                    <span className="text-3xl">{day.icon}</span>
                    {day.title}
                  </h3>
                  <p className="text-mute text-base md:text-lg leading-relaxed">{day.desc}</p>
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

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/itinerary.jsx
git commit -m "feat: add Itinerary section with TracingBeam"
```

---

## Task 15: Section — Testimonials (Marquee)

**Files:**
- Create: `src/components/sections/testimonials.jsx`

- [ ] **Step 1: Create `src/components/sections/testimonials.jsx`**

```jsx
import { motion } from "motion/react";
import { Marquee } from "@/components/effects/marquee";
import { Card, CardContent } from "@/components/ui/card";
import { TESTIMONIALS } from "@/lib/tour-data";
import { cn } from "@/lib/utils";

function ReviewCard({ name, city, quote, avatar }) {
  return (
    <Card className="w-80 md:w-96 mx-3 bg-paper hover:shadow-[var(--shadow-pink)] transition-shadow duration-300">
      <CardContent className="p-6">
        <p className="text-base text-ink leading-relaxed italic mb-4 line-clamp-4">«{quote}»</p>
        <div className="flex items-center gap-3 pt-3 border-t border-border">
          <span className="text-2xl">{avatar}</span>
          <div>
            <div className="font-semibold text-sm">{name}</div>
            <div className="text-xs text-mute">{city}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Testimonials() {
  const firstHalf = TESTIMONIALS.slice(0, 3);
  const secondHalf = TESTIMONIALS.slice(3);

  return (
    <section className="py-20 md:py-28 bg-ink text-paper overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl mb-3">
            Відгуки наших <em className="text-yellow">туристів</em>
          </h2>
          <p className="text-paper/60 text-lg max-w-2xl mx-auto">
            Шість країн, сотні маршрутів. Ось що кажуть ті, хто вже літали.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <Marquee pauseOnHover className="[--duration:60s]">
          {firstHalf.map((t, idx) => (
            <ReviewCard key={`a-${idx}`} {...t} />
          ))}
        </Marquee>
        <Marquee pauseOnHover reverse className="[--duration:50s] mt-4">
          {secondHalf.map((t, idx) => (
            <ReviewCard key={`b-${idx}`} {...t} />
          ))}
        </Marquee>

        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/testimonials.jsx
git commit -m "feat: add Testimonials section with Marquee"
```

---

## Task 16: Section — Booking form (react-hook-form + zod)

**Files:**
- Create: `src/components/sections/booking.jsx`

- [ ] **Step 1: Create `src/components/sections/booking.jsx`**

```jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PRICES } from "@/lib/tour-data";

const schema = z.object({
  name: z.string().min(2, "Принаймні 2 символи"),
  phone: z.string().min(7, "Введіть коректний телефон"),
  city: z.string().min(1),
});

export function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", city: PRICES.cities[0] },
  });

  const onSubmit = async (data) => {
    // UI-only — у продакшені сюди йде Cloudflare Function → Telegram + email
    await new Promise((r) => setTimeout(r, 600));
    console.log("Lead submitted:", data);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      reset();
    }, 5000);
  };

  return (
    <section id="booking" className="py-20 md:py-28 px-6 bg-gradient-to-br from-violet via-pink to-violet-dark relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-paper"
        >
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Залиште <em className="text-yellow">заявку</em>
          </h2>
          <p className="text-paper/90 text-lg mb-6 leading-relaxed">
            Менеджер передзвонить протягом 2 годин, підбере найкращу дату і виліт під ваш бюджет. Без передоплати на цьому етапі.
          </p>
          <div className="flex flex-col gap-3 text-paper/80 text-sm">
            <div className="flex items-center gap-2">⏱️ Відповідь за 2 години у робочий час</div>
            <div className="flex items-center gap-2">💳 Без передоплати при бронюванні</div>
            <div className="flex items-center gap-2">🛡️ Підтримка українською мовою</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-paper rounded-2xl p-8 shadow-2xl"
        >
          {submitted ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-display text-2xl mb-2">Дякуємо!</h3>
              <p className="text-mute">Зв'яжемось з вами протягом 2 годин.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Ім'я</Label>
                <Input id="name" placeholder="Олена" {...register("name")} aria-invalid={!!errors.name} />
                {errors.name && <p className="text-xs text-danger">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" type="tel" placeholder="+380 67 123 45 67" {...register("phone")} aria-invalid={!!errors.phone} />
                {errors.phone && <p className="text-xs text-danger">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Місто вильоту</Label>
                <select
                  id="city"
                  className="flex h-11 w-full rounded-lg border border-border bg-paper px-4 text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/40"
                  {...register("city")}
                >
                  {PRICES.cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <Button type="submit" variant="violet" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Відправляємо..." : "Залишити заявку"}
              </Button>

              <p className="text-xs text-mute text-center">
                Натискаючи кнопку, ви погоджуєтесь з обробкою персональних даних.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/booking.jsx
git commit -m "feat: add Booking section with react-hook-form + zod"
```

---

## Task 17: Section — Footer + Sticky CTA

**Files:**
- Create: `src/components/sections/footer.jsx`
- Create: `src/components/sections/sticky-cta.jsx`

- [ ] **Step 1: Create `src/components/sections/footer.jsx`**

```jsx
export function Footer() {
  return (
    <footer className="bg-ink text-paper py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="font-display text-3xl bg-gradient-to-r from-yellow via-pink to-violet bg-clip-text text-transparent inline-block mb-3">
              WOW Tours
            </div>
            <p className="text-paper/60 text-base max-w-md">
              Європа без переплат — живі ціни, чесні маршрути, гід українською.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end text-paper/80 text-base">
            <a href="tel:+380670000000" className="hover:text-yellow transition-colors">
              📞 +380 67 000 00 00
            </a>
            <a href="mailto:hello@wow-tours.example" className="hover:text-yellow transition-colors">
              ✉️ hello@wow-tours.example
            </a>
            <a href="https://t.me/wowtours" className="hover:text-yellow transition-colors">
              💬 Telegram: @wowtours
            </a>
          </div>
        </div>
        <div className="border-t border-paper/10 pt-6 text-center text-sm text-paper/40">
          © 2026 WOW Tours · Mock-лендінг для демонстрації Tier 1
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/sticky-cta.jsx`**

```jsx
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-40 hidden md:block"
        >
          <Button asChild variant="primary" size="lg" className="shadow-2xl">
            <a href="#booking">Хочу в цей тур →</a>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/footer.jsx src/components/sections/sticky-cta.jsx
git commit -m "feat: add Footer + StickyCTA"
```

---

## Task 18: Compose new landing.jsx + remove old code

**Files:**
- Modify: `src/landing.jsx` (full replace)

- [ ] **Step 1: Replace `src/landing.jsx` with composition of new sections**

Replace entire contents of `/Users/oleksandrsecond/Projects/wow-tours/src/landing.jsx`:

```jsx
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Prices } from "@/components/sections/prices";
import { Included } from "@/components/sections/included";
import { Itinerary } from "@/components/sections/itinerary";
import { Testimonials } from "@/components/sections/testimonials";
import { Booking } from "@/components/sections/booking";
import { Footer } from "@/components/sections/footer";
import { StickyCTA } from "@/components/sections/sticky-cta";

export default function Landing() {
  return (
    <div id="top" className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Prices />
        <Included />
        <Itinerary />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
```

- [ ] **Step 2: Update `index.html` meta tags for SEO**

Replace entire `/Users/oleksandrsecond/Projects/wow-tours/index.html`:

```html
<!DOCTYPE html>
<html lang="uk">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WOW Tours — Тур в Ісландію · від €420</title>
    <meta name="description" content="Подорож в Ісландію на 7 днів. Виліт з Києва, Львова, Одеси чи Варшави. Живі ціни на авіаквитки оновлюються щодня. Гід українською." />
    <meta name="theme-color" content="#7c3aed" />

    <!-- Open Graph -->
    <meta property="og:title" content="WOW Tours — Тур в Ісландію" />
    <meta property="og:description" content="7 днів між льодовиками, гейзерами і північним сяйвом. Від €420." />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=1200&h=630&fit=crop" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />

    <!-- JSON-LD -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        "name": "Тур в Ісландію — країна вулканів і гейзерів",
        "description": "Незабутня подорож островом крізь чорні пляжі, льодовикові лагуни, водоспади і північне сяйво.",
        "image": "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=1200",
        "touristType": "Sightseeing",
        "offers": {
          "@type": "Offer",
          "price": "420",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        }
      }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: build exits 0. Bundle size ≤ 280 KB gzipped.

- [ ] **Step 4: Commit**

```bash
git add src/landing.jsx index.html
git commit -m "feat: compose new landing + SEO meta + JSON-LD"
```

---

## Task 19: Verify build + bundle size + final commit

**Files:**
- Modify: `src/styles/globals.css` (only if accordion animations needed)

- [ ] **Step 1: Run full production build**

```bash
npm run build
```

Expected: build exits 0. Output shows bundle sizes — verify total JS ≤ 280 KB gzipped, CSS ≤ 50 KB gzipped.

- [ ] **Step 2: Run preview server and verify in browser**

```bash
npm run preview &
sleep 2
curl -sf http://localhost:4173/wow-tours/ > /dev/null && echo "✓ preview responds"
```

Expected: HTTP 200 on `/wow-tours/`.

Manual: open `http://localhost:4173/wow-tours/` in browser, verify:
- Hero loads with animated aurora background
- FlipWords cycles through 4 words
- Scroll into prices section: NumberTicker counts up
- Scroll into itinerary: TracingBeam draws line
- Testimonials: Marquee scrolls horizontally
- Booking form: validation works, success state shows
- Footer + sticky CTA appear

- [ ] **Step 3: Kill preview server**

```bash
pkill -f "vite preview" 2>/dev/null || true
```

- [ ] **Step 4: Verify no leftover `style={{}}` inline styles in sections**

```bash
grep -r "style={{" src/components/sections/ src/landing.jsx || echo "✓ no inline styles found"
```

Expected: `✓ no inline styles found` (or only dynamic-value uses).

- [ ] **Step 5: Final tag**

```bash
git tag -a "v0.2.0" -m "Landing redesign complete: shadcn + Aceternity + Magic UI"
```

- [ ] **Step 6: Cleanup orphaned files (if any)**

```bash
# remove any leftover .DS_Store
find . -name ".DS_Store" -not -path "./node_modules/*" -delete 2>/dev/null || true
```

---

## Notes for executor

- **No tests** required; verification is build + visual QA per spec (section 8 of design doc)
- **Each task commits independently** — if any step fails, fix it before moving to next task
- **Bundle budget**: ≤ 280 KB gzipped JS. If exceeded after Task 19, lazy-load TracingBeam via `React.lazy`
- **Reduced motion**: `prefers-reduced-motion` is handled globally in `globals.css`; no per-component changes needed
- **Animation library**: `motion` package; import from `motion/react` (NOT `framer-motion` — it was renamed)
- **Tailwind v4 specifics**: theme tokens defined in `@theme` CSS block, NO `tailwind.config.js` file
- **Accordion animations**: `data-[state=open]:animate-accordion-down` requires keyframes in `globals.css` — IF accordion is used (currently not used in any section, but may add later)

## Spec coverage check

- ✅ Section 1 Goals: All goals covered (BoldAdventure direction, WOW palette, typography, animation, GitHub Pages)
- ✅ Section 2 Non-goals: Respected (no real TP API, no backend, no CRM)
- ✅ Section 3 Architecture: Implemented in Tasks 3, 4, 10-17
- ✅ Section 4 Tech stack: Tasks 1, 2 install all deps
- ✅ Section 5 Design tokens: Task 2
- ✅ Section 6 Section-by-section design: Tasks 10-17 (one per section)
- ✅ Section 7 Animation strategy: Tasks 5-9 (effects), Tasks 11-17 (consumption)
- ✅ Section 8 Testing strategy: Task 19 (build + bundle + visual)
- ✅ Section 9 Error handling: Task 16 (form validation + success state)
- ✅ Section 10 Deployment: Already configured (Task 1 doesn't break it)
- ✅ Section 12 Migration approach: Section-by-section commits in Tasks 10-17
- ✅ Section 13 Acceptance criteria: All checks in Tasks 18, 19
- ✅ Section 14 Risk register: Mitigations baked in (e.g., `prefers-reduced-motion`, bundle budget check)
