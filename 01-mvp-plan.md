# WOW Tours — Tier ladder план: бачення, стек, обсяг, ціна

> **Що це за документ.** Внутрішній робочий референс по переписуванню старого
> проєкту WOW Tours. Версія 4: tier ladder переструктуровано так, що Tier 1 —
> це **single-tour MVP з Travelpayouts widget** (а не статичний 5-туровий
> лендінг). Логіка: одна реальна проба продукту з живими цінами, а не
> «гарна вітрина без УТП». Phase 1 (full MVP) і Phase 2 (агентська мережа)
> лишаються у roadmap і можуть наростити будь-який tier.
> Парний документ — `00-project-overview.md` — описує сам легасі-проєкт
> (контекст, бізнес-модель, що в `/input/`).
> Дата ревізії: 2026-05-13.

---

## Box із цифрами (TL;DR)

```
╔══════════════════════════════════════════════════════════════════╗
║      WOW TOURS — TIER MENU (поточна пропозиція)                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  Tier 1: Single-tour MVP    €4 000  /  2 тижні (1 тур, TP widget)║
║  Tier 2: + Каталог          €5 500  /  3 тижні (5 турів, widget) ║
║  Tier 3: + Custom + Directus €8 000 / 4–5 тижнів (рекомендую)    ║
║  Tier 4: Multi-brand Pack   €14 000 /  8 тижнів                  ║
║                                                                  ║
║  Discovery як перший milestone (входить у ціну tier'а):          ║
║    Tier 1 — €600   / 0.5 тиж                                     ║
║    Tier 2 — €900   / 0.5 тиж                                     ║
║    Tier 3 — €1 500 / 1 тиж                                       ║
║    Tier 4 — €1 500 / 1 тиж                                       ║
║                                                                  ║
║  Walk-away floors: T1 €4 000 / T2 €4 800 / T3 €6 500             ║
║  Ретейнер: €2 500/міс мін. 6 міс                                 ║
║  Rev-share kicker (опційно): 1% × 24 міс, кеп €20k               ║
║                                                                  ║
║  Позиціонування: "Чотири рівні глибини. Вибір — за вами"         ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║      ROADMAP (опційно, поза tier-меню)                           ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  Phase 1 (Full MVP):     +€18-20 000 / 11-13 тижнів              ║
║  Phase 2 (Agent network):+€15-17 000 / 10 тижнів                 ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## 1. Бачення (Vision)

Tier-based підхід: починаємо з найменшого життєздатного, валідуємо, апсейлимо
на основі реальних результатів. Кожен tier — це **не зменшена версія
наступного**, а інший продукт за обсягом цінності.

> **Tier 1 — це проба продукту, не зменшений варіант.** Один тур як приклад —
> з живими цінами через Travelpayouts widget, повноцінним lead-flow, на
> продакшен-інфрі. Клієнт може реально запустити рекламу і виміряти
> конверсію. Якщо зайде — апсейлимо до Tier 2 (+€1.5k за 4 додаткові тури)
> або Tier 3 (+€4k за custom UI + Directus).

> **Логіка ладдера:** клієнт обирає рівень глибини під свій реальний run-rate
> і apetite до ризику. Ми не примушуємо до €36k одразу і не продаємо
> візитку-обманку. Чотири чесні точки входу з тим самим стеком, з тією
> самою фінальною точкою (через Phase 1/2).

**Що змінилося проти попередньої версії плану (важливо).** Стара Tier 1
(5 турів зі статичними цінами) була неоптимальною — клієнт за €4k отримував
гарний лендінг, але без головного УТП (живих цін). Нова Tier 1 (1 тур з TP
widget) — це повноцінний dynamic-pricing продукт у мініатюрі. Клієнт може
справді запустити рекламу і отримати ліди — це валідація, а не «просто
красива сторінка».

Економічна модель проєкту лишається тією самою на всіх tier'ах: бандл
«дешевий рейс + наземний тур». **Travelpayouts включений з Tier 1** (через
widget — їхня готова JS-інтеграція, нуль API-онбордингу для нас). У Tier 3
ми міняємо widget на API + кастомні price tables в Directus — це коли клієнт
хоче власну UI/UX, а не вшиту віджетну.

---

## 2. Що в кожному tier, що в roadmap, чого не буде

### Tier 1 — Single-tour MVP (2 тижні, €4 000)

**Scope IN:**
- 1 Astro-лендінг для одного туру (наприклад «Тур в Ісландію»), 1 мова (українська)
- **Travelpayouts widget** показує живі ціни з кількох міст відправлення (auto-update, їхній JS embed)
- Decap CMS (git-based, безкоштовний) — оператор редагує тур-контент через UI, коміти йдуть у git
- Cloudflare Pages Function для форми заявки → Telegram + email оператору
- Базове SEO: meta-теги + JSON-LD на сторінці туру
- GA4, домен, SSL

**Чому 1 тур, а не 5:** clean validation. 1 тур, реклама на нього, лічимо
ліди. Якщо є — масштабуємо до Tier 2. Якщо немає — не вкладаємо €5.5k у
5 турів навмання.

**Чого нема:** каталогу, real CMS-бази, ролей, кастомного UI цін, дашборду
лідів. Усе вручну.

### Tier 2 — + Каталог (3 тижні, €5 500)

**Scope = Tier 1, плюс:**
- 4 додаткові тур-сторінки на тому самому Astro-шаблоні (разом 5 турів)
- Каталог / grid сторінка зі списком усіх турів + фільтри (країна / тривалість)
- Окремий TP widget config per tour (різні міста відправлення per тур)
- Lead form з `tour_id` роутингом — менеджер бачить, з якого туру лід
- Decap CMS все ще керує контентом усіх 5 турів

**Чого нема:** Directus, кастомного UI цін (widget все ще), мультимовності,
lead workflow зі статусами.

### Tier 3 — + Custom Prices + Directus (4–5 тижнів, €8 000) — РЕКОМЕНДАЦІЯ

**Scope = Tier 2, плюс:**
- **Directus self-hosted** (на Coolify/Hostinger KVM2) — справжня адмінка з Postgres
- Ролі: admin / operator у Directus
- **Travelpayouts Flight Data API замість widget** — affiliate акаунт клієнта
- **Кастомні price tables** на сторінці туру: **сьогодні / +7 днів / +14 днів**, per-city (3-5 «що буде, якщо вилетіти з X»)
- Cloudflare Worker з cron — поллінг Travelpayouts API → Directus/Postgres
- Кешування цінових снапшотів у Postgres (без BRIN-партиціонування — це Phase 1)
- Lead workflow у Directus: статуси (new / contacted / booked / lost), нотатки, фільтри

**Де відбувається upgrade на real product:** саме на Tier 3 widget замінюється
на власну UI/UX, контент переходить у Directus, з'являється повноцінна
адмінка. Клієнт перестає виглядати як «гарна вітрина з чужим віджетом» —
починає виглядати як WOW Tours до 2022.

**Чого нема:** агентського кабінету, мультитенантності, PDF-ваучерів, повної
payment-API, кастомної CRM-UI поверх Directus.

### Tier 4 — Multi-brand Pack (8 тижнів, €14 000)

**Scope = Tier 3, плюс:**
- 4 додаткові Astro-шаблони на тій самій інфрі (Directus + Worker + Postgres переюзаємо)
- Окремі домени / піддомени / SEO-стратегії на кожен лендінг (наприклад: wow-weekend, wooow.tours, regional spin-offs)
- Спільна база турів і лідів — лендінги фільтрують вибірку
- Кожен з 5 брендів × 5 турів (структура «5 × 5», де перший «5» — це бренди, другий — тури на бренд; запозичений каталог Tier 3 → 5 турів на дефолтному бренді)

**Чого нема:** того ж, що в Tier 3 — це не «full MVP», це «scale-out тієї самої моделі».

### Що НІ в жодному tier (тільки через roadmap або ніколи)

**Phase 1 (Full MVP) — окремий контракт, +€18-20 000:**
- Кастомна CRM-UI (React 19 + Vite SPA) поверх Directus
- Повна payment-API (а не payment-link)
- Мультимовність (RU + EN)
- Повне SEO на 10+ типів сторінок (countries grid, multi-day, about, tour agencies, etc.)
- Міграція історичних даних (агенти + каталог турів зі старих MySQL)
- Resend для транзакційного email

**Phase 2 (Agent network) — окремий контракт, +€15-17 000:**
- Мультитенантний кабінет агента (RLS Flavor B, JWT app_metadata, композитні індекси)
- Per-agent markup, баланс / комісійний реєстр (double-entry ledger)
- PDF-ваучери (pdfme + Noto Sans Cyrillic)
- Telegram-бот із inline-кнопками (aiogram через outbox)
- SMS (TurboSMS + Twilio fallback)

**Ніколи (без окремої угоди):**
- Мобільний застосунок
- In-platform чат
- AI-генерація маршрутів
- Динамічне пакетування поза тим, що дає flight-watcher
- Власна онлайн-бронька квитків (потенційно Phase 3 — Duffel migration на 12–18 міс)

---

## 3. Технічні рішення — стек по layer'ах tier'ів

Стек побудований так, щоб **кожен наступний layer додавався, а не замінював попередній** (з одним свідомим винятком: TP widget → TP API на Tier 3). Tier 4 — це Tier 1 + 2 + 3 + 4. Жодних refactor'ів між tier'ами, крім очікуваного widget→API на Tier 3.

### Layer 1 (активно з Tier 1)

- **Astro 5** + React islands + Tailwind v4 — маркетинговий сайт
- **Cloudflare Pages** — хостинг (EU edge, free tier)
- **Cloudflare Pages Functions** — handler форми заявки (Telegram webhook + email)
- **Decap CMS** — git-based CMS, безкоштовна, без бази (контент = MDX-файли в репі)
- **Travelpayouts widget** — їхній готовий JS embed для живих цін з кількох міст
- **GA4** — аналітика
- **GitHub Actions** — CI/CD, PR previews
- **Sentry SaaS EU (free tier)** — моніторинг помилок

### Layer 2 (активно з Tier 2)

- Той самий Layer 1 — просто **5 тур-MDX замість 1**
- **Multi-widget configuration** — окремий TP widget config per tour
- Каталог / grid сторінка з фільтрами

### Layer 3 (активно з Tier 3)

- **Directus self-hosted** — справжня адмінка з ролями та lead workflow
- **Coolify v4 на Hostinger KVM2** — оркестратор для Directus + Postgres
- **Postgres** — керується через Coolify
- **Travelpayouts Flight Data API** (replaces widget) — affiliate акаунт клієнта
- **Cloudflare Worker з cron** — поллінг цін, апсерт у Postgres
- **Кастомні price tables** на сайті — рендеримо самі, не через widget

### Layer 4 (активно з Tier 4)

- Той самий стек — просто **4 додаткові Astro-шаблони** на тій самій інфрі
- Спільна Directus-база + спільний Worker → infra cost не множиться

### Зарезервовано на Phase 1/2 (поза tier-меню, рішення прийняті, реалізація відкладена)

| Компонент | Куди | Чому |
|---|---|---|
| React 19 + Vite SPA для кастомної CRM | Phase 1 | Tier 3+ використовує Directus замість кастомної UI |
| Resend (email) | Phase 1 | Транзакційний, EU residency, DPA |
| TurboSMS + Twilio fallback | Phase 2 | UA delivery rates + intl |
| pdfme + Noto Sans Cyrillic | Phase 2 | PDF-ваучери client-side |
| Python + aiogram Telegram-бот із inline-кнопками | Phase 2 | У Tier 1-4 — простий webhook у канал/чат |
| Multi-tenant RLS Flavor B | Phase 2 | JWT app_metadata claims, композитні індекси |
| Duffel API | Phase 3 (потенційно) | Через 12–18 міс після Phase 2 |

### Чому такий вибір (короткі обгрунтування)

**Travelpayouts з Tier 1 (через widget):**
- Widget — це JS-embed, нуль інфри з нашого боку, ~1 година інтеграції.
- Афілейтна CPA-модель збігається з тим, як суб-агенти продавали.
- **Kiwi.com — як один із партнерів Travelpayouts.** Інвентар доступний, контрактна сторона — TP. Обходимо конфлікт клієнта з Kiwi напряму (sunset Tequila 2023, мінімалки GMV, проблеми UA-payouts після 2022).
- Виплати на UA-рахунки реально працюють.
- Trade-off: ~1–1.6% TP-комісія замість «чистих» 3% Kiwi. Прийнятно.

**Чому widget → API саме на Tier 3:**
- Widget — це чужий iframe/JS з їхньою UX. Виглядає як «вбудований чужий сервіс», не як наш продукт.
- API + кастомні price tables = повноцінний контроль за UI/UX, brand-consistency, SEO (живий HTML, не JS-рендер).
- Tier 3 — це коли клієнт переходить від «спробую запустити» до «будую бренд». Логічна точка апгрейду.

**Чому не Duffel зараз:** T&C забороняє bg-поллінг — ламали б правила з першого дня. Merchant-of-record модель — ми стаємо продавцем, KYC/refunds/CS — окрема операційка.

**Чому Directus, а не Supabase Studio (як було в попередній версії плану):**
- Self-hosted Directus — €0/міс інфра-марджин на додаток (Coolify і так є з Tier 3).
- UX для оператора кращий: реально UI, не SQL-admin.
- Ролі/permissions з коробки.
- Якщо знадобиться кастомна CRM-UI у Phase 1 — Directus тримає API; не переробляємо нічого.

**Чому Decap у Tier 1-2, а не Directus:**
- Tier 1 = €4k = 2 тижні. Stand up Directus + Postgres + Coolify — це мінімум 3-5 днів. Не влізає.
- Decap працює прямо з GitHub-репо, нуль інфри.
- Trade-off: оператор має GitHub-логін і розуміє, що зміни — це commits. Прийнятно для 1-5 турів.

**Маркетинговий сайт на Cloudflare Pages:** CDN-edge, не залежимо від single-VPS uptime, free tier.

**Multi-tenant: RLS Flavor B (Phase 2):** 30 тенантів — той самий патерн, що в reference-стеку (там 4 тенанти), плюс JWT `app_metadata` claims, композитні індекси `(tenant_id, hot_col)`, double-entry ledger.

### SEO на всіх tier'ах — мінімум, але правильний

- Server-rendered HTML (Astro SSG за замовчуванням) — без цього Yandex не індексує
- Meta-теги (title, description, OG) на всіх типах сторінок
- JSON-LD: TouristTrip + Offer на сторінках турів
- Sitemap + robots.txt
- Lighthouse SEO ≥ 90 не таргетимо до Phase 1

### Affiliate-cookie — не для tier'ів

Server-side cookie з `HttpOnly` для обходу Safari ITP — це Phase 1. У Tier 1-2 widget сам обробляє атрибуцію. У Tier 3+ поллінг — server-side, без редіректу клієнта; атрибуція через `marker` в API-запитах.

---

## 4. Milestone-розклад по tier'ах

Кожен tier має власний набір milestone'ів. Discovery — завжди M1, входить у ціну tier'а.

### Tier 1 — Single-tour MVP (€4 000 / 2 тижні)

| # | Назва | Тиждень | Deliverable | Сума |
|---|---|---|---|---|
| M1 | Discovery + design | 0.5 | Scope підписаний, 1 тур обрано, 3-5 міст відправлення зафіксовано, Figma directional adapt, контент прийшов | **€600** |
| M2 | Збірка | 1 | Astro setup, 1 тур як MDX, **TP widget інтеграція**, Decap CMS налаштований, форма → Telegram + email working | **€2 400** |
| M3 | Лонч | 0.5 | Прод-deploy, GA4, базове SEO, 1 тиждень stab | **€1 000** |
| | | **Усього 2 тиж** | | **€4 000** |

### Tier 2 — + Каталог (€5 500 / 3 тижні)

| # | Назва | Тиждень | Deliverable | Сума |
|---|---|---|---|---|
| M1 | Discovery | 0.5 | Scope, 5 турів × N міст зафіксовано, контент-план на 4 нових тури | **€900** |
| M2 | Каталог | 1.5 | 5 тур-сторінок на спільному шаблоні, grid/каталог з фільтрами, 5 widget configs | **€3 200** |
| M3 | Інтеграції | 0.5 | Lead form з `tour_id` роутингом, Telegram + email, GA4 events per tour | **€1 400** |
| M4 | Лонч | 0.5 | Прод-deploy, SEO, 1 тиждень stab | **€1 000** |
| | | **Усього 3 тиж** | | **€5 500** |

### Tier 3 — + Custom Prices + Directus (€8 000 / 4–5 тижнів)

| # | Назва | Тиждень | Deliverable | Сума |
|---|---|---|---|---|
| M1 | Discovery + Directus schema | 1 | Scope, 5 турів × N міст × N дат зафіксовано, Travelpayouts акаунт онбордингу почато, Directus content-model | **€1 500** |
| M2 | Інфра + Travelpayouts API | 1.5 | Coolify + Postgres + Directus stood up, Cloudflare Worker з cron polling, ціни падають у snapshot-таблицю | **€2 700** |
| M3 | Custom price tables | 1.5 | 5 турів з кастомним UI цін (today / +7 / +14 per-city), Astro fetch з Directus на build, lead workflow у Directus | **€2 800** |
| M4 | Лонч | 0.5 | Прод-deploy, GA4, SEO, 1 тиждень stab | **€1 000** |
| | | **Усього 4-5 тиж** | | **€8 000** |

### Tier 4 — Multi-brand Pack (€14 000 / 8 тижнів)

| # | Назва | Тиждень | Deliverable | Сума |
|---|---|---|---|---|
| M1-M4 | = Tier 3 у повному обсязі | 4-5 | Все що в Tier 3 (€8 000) | **€8 000** |
| M5 | 4 додаткові лендінги | 3.5 | 4 нові Astro-шаблони на тій самій інфрі, окремі домени, шаблонізовані; кожен з власним SEO/доменом | **€6 000** |
| | | **Усього 8 тиж** | | **€14 000** |

**Кожен додатковий лендінг після Tier 3** (інфра вже стоїть): €1 500–2 000 за штуку як change-order.

### Послідовність збірки (data first — на всіх tier'ах)

1. Discovery (scope + контент + Travelpayouts widget setup для Tier 1-2 / API онбординг для Tier 3+)
2. Дані: Directus schema (Tier 3+) / MDX-структура (Tier 1-2)
3. Інфра: Coolify + Postgres (Tier 3+) / Cloudflare Pages (Tier 1-2)
4. Воркер + Travelpayouts API (Tier 3+) / Widget embed (Tier 1-2)
5. Astro frontend
6. Форма заявки → Telegram/email
7. SEO + GA4
8. Прод-deploy + 1 тиждень stab

Маркетинговий сайт іде ПІСЛЯ data-моделі — як завжди. Спокуса зробити «frontend перший» хибна навіть на €4k.

---

## 5. Ціноутворення

### Чому саме ці цифри

- **Ставка benchmark UA-senior solo fullstack direct-to-client (травень 2026)**: €55–65/год.
- **Claude Code velocity multiplier**: ~2x на typical web work проти solo без AI.
- Calc:
  - **Tier 1**: 70h × €57/h = **€4 000** ✓
  - **Tier 2**: 95-100h × €55-57/h = **€5 500** ✓
  - **Tier 3**: 140-160h × €52-55/h = **€8 000** ✓
  - **Tier 4**: 260-280h × €50-54/h = **€14 000** ✓
- Pad усередині ціни: **~15% у Tier 1-2** (мало інтеграцій, widget — їхня готова річ), **~20% у Tier 3** (Travelpayouts API integration risk), **~15% у Tier 4** (scope management ризик, а не технічний).
- **Walk-away floors**:
  - Tier 1 — **€4 000** (нижче не йдемо, scope і так стиснений до 1 туру)
  - Tier 2 — **€4 800** (можна стиснути каталог-UI, drop фільтри)
  - Tier 3 — **€6 500** (Travelpayouts онбординг compressed, 3 міста замість 5)
  - Tier 4 — без walk-away. Якщо торгуються — переводимо на Tier 3 + change-order на додаткові лендінги.

### Чому ладдер, а не одна цифра

- Клієнт переїхав із позиції «rebuild ринкового продукту» в позицію «провалідуємо, чи бізнес взагалі живий». Це навіть **не один продукт**, а кілька різних відповідно до того, наскільки він готовий ризикувати.
- Tier 1 існує як «super-floor валідації» — клієнт каже «зараз нуль маркетингу» і ми не намагаємось продати €12k; натомість даємо 1 повноцінний продукт із живими цінами за €4k.
- Tier 3 — наша рекомендація за замовчуванням, бо без кастомного UI цін і Directus це не WOW Tours.
- Tier 4 — для клієнта, який каже «нам треба кілька брендів» (wow-weekend + wooow.tours + regional).

### Структура платежу

Mid-milestone — стандартна формула: `% від ціни tier'а × сума на milestone`. Тригери — acceptance criteria на M1-M5 (див. секцію 4).

### Кожен наступний лендінг після Tier 3

Інфра вже стоїть → **€1 500–2 000** як change-order. Чим більше лендінгів — тим краще для нас (low marginal effort). Жорстко фіксувати scope на «4 додаткові Astro-шаблони на тій самій інфрі», а не «4 нових сайти з нуля».

### Phase 1 (€18-20k) і Phase 2 (€15-17k) — окремі контракти

Кожен з власним milestone-розкладом. Не зашиваємо в tier-контракт. Без передзамовлень — клієнт вирішує по факту run-rate.

### Ретейнер €2 500/міс (мін. 6 міс, від моменту лончу будь-якого tier'а)

Покриває: bug-fixes, малі enhancements, monitoring, on-call в EU-business-hours, 1 minor feature/міс. Тариф «Standard» — 50 годин/міс. **Починається на M(остання) acceptance**, не раніше.

### Rev-share kicker (опціональний)

- **Recommend:** повна готівка tier'а + 1% з GMV (gross bookings) за 24 міс, кеп €20k.
- **Чистий rev-share — НІ.** Tier 1 — 2 тижні без гарантії результату; кеш мусить покривати час.

### Market context (anchor)

- EU-агенція за такий Tier 3 квотила б €25–40k. Ти на 60-70% дешевший.
- Template-shops квотять $3–8k за лендинг — це Tier 1 рівень, тільки без TP widget, без Decap, без воронки.
- Якщо клієнт каже «а ось там дешевше за €2k» — пояснити, що без Travelpayouts widget + Decap + Telegram + GA4 + JSON-LD він отримає статичний html без живих цін, без воронки і без можливості редагувати контент.

---

## 6. Ризики per-tier

| Tier | Основні ризики | Pad |
|---|---|---|
| Tier 1 | Дуже мало ризику (1 тур, готовий стек, TP widget — їхня готова інтеграція, ~1 год embed). Тільки sign-off на контент туру. | ~15% |
| Tier 2 | **Scope creep по кількості турів** (фіксуємо «5 максимум, без +тури»). Multi-widget config — їхня сторона, без сюрпризів. | ~15% |
| Tier 3 | **Travelpayouts API onboarding (3-5 днів)** — треба почати ДО M2. Rate-limits на Flight Data API. Нюанси API (low-cost vs scheduled, IATA mapping). Directus learning curve (мінімальна — open-source, добра дока). | ~20% |
| Tier 4 | **Scope management — головний ризик.** Клієнт захоче «ще один tweak per landing». Жорстка change-order policy (€55/год або mini-fixed-bid). | ~15% |

**Ризики уже всередині ціни кожного tier'а.** Не нараховувати окремо.

(Ризики яких НЕМА в tier-меню, бо scope OUT: multi-tenant RLS coherence, data migration з 5 MySQL, balance-ledger correctness, повна payment-API. Усі — у Phase 1/2 з pad ~25%.)

---

## 7. Decision tree — який tier рекомендую залежно від відповідей клієнта

| Що клієнт каже | Що рекомендую |
|---|---|
| «Зараз нуль маркетингу, треба перевірити чи зайде» | **Tier 1 (€4 000)** — 1 тур, реклама, ліди |
| «Маркетинг готовий, продукт треба швидко» | **Tier 2 (€5 500)** — 5 турів, але без кастомного UI ще |
| «Маркетинг готовий + бренд має значення» | **Tier 3 (€8 000)** — custom UI + Directus, рекомендую за замовчуванням |
| «Кілька брендів / напрямків» | **Tier 4 (€14 000)** |
| «Хочу одразу повну CRM кастомну» | **Phase 1 (+€18-20k поверх Tier 3)** |
| «Хочу одразу мережу агентів» | **Phase 2 (+€15-17k поверх Phase 1)** |
| «Все одразу за €4k» | Не погоджуємось. Це Tier 4 за ціною Tier 1. Walk away. |

**Default рекомендація на discovery-дзвінку: Tier 3.** Якщо клієнт reluctant — даун-сейл на Tier 2, не вниз. Tier 1 — тільки якщо клієнт сам так позиціонується («хочу перевірити чи зайде»).

---

## 8. Структура пропозиції клієнту

1. **Executive summary** — tier menu з 4 цифрами + рекомендація Tier 3.
2. **Vision** — секція 1 цього доку, з акцентом «Tier 1 — це проба продукту з живими цінами».
3. **Tier breakdown** — 4 окремі бокси, scope IN на кожен tier.
4. **Roadmap (Phase 1/2)** — окрема секція з тригерами.
5. **Stack & «why this works»** — стек по layer'ах, чому tier-based підхід дешевший за «зробити одразу повний».
6. **Milestone-table per tier** — секція 4 цього доку.
7. **Pricing per tier** — секція 5 з milestone-schedule.
8. **What we need from you** — фінал контенту на 1 тур (Tier 1) або 5 турів (Tier 2+) до кінця тижня 1; Travelpayouts акаунт готовий до M1 для **усіх tier'ів** (для widget теж потрібен marker); ОДИН decision-maker з 48-год reachability; доступи до GA4, домену.
9. **Acceptance criteria** — конкретні чеки на milestone (наприклад: «форма заявки → лід у Telegram-каналі XXX + email, end-to-end на staging; TP widget показує живі ціни з 3 міст»).

**Мова пропозиції**: RU/UA-версія + English attached. Заголовок tier-меню — 4 жирні цифри.

---

## 9. Терміни у контракті (що обов'язково)

- **IP transfer**: повна передача на останній milestone tier'а. До того — non-exclusive license на тест/staging.
- **Scope changes**: тільки через written change-order, **€55/год або mini-fixed-bid**. Безкоштовний бюджет дрібниць — 4 години на milestone.
- **Hosting/infra cost**: billed-through to client at cost, +10% admin fee. **Hostinger + Coolify акаунт (Tier 3+) + Cloudflare Pages + Travelpayouts акаунт — на клієнта**, ти — admin collaborator. Ніколи не на свою картку.
- **Domain + SSL**: тільки в імені клієнта. DNS адмініструєш по делегованому доступу.
- **GitHub org**: власник — клієнт. Ти — admin. Push щодня в приватний реп.
- **Final-payment trigger** (остання M): acceptance criteria → staging → production deploy → **1 тиждень stabilization з зеленим monitoring**. **Не «go-live»**.
- **Termination clauses**:
  - Клієнт зупиняє: оплачує всі завершені milestone + 50% за початий.
  - Розробник зупиняє (не платять / scope abuse): завершені milestone лишаються клієнту тільки в межах оплачених; in-progress повертається тобі.
  - Mutual: 7-day notice, hand-off period billed at retainer rate.
- **Late payment**: 1.5%/місяць інтерес після 14 днів. Stop-work після 21 дня non-payment. Письмово, RU/UA, підписано.
- **NDA**: mutual, two-way, time-limited (3 роки).
- **Jurisdiction**: Україна якщо ФОП; інакше Estonian e-Residency entity для cleaner EU-invoicing.
- **Next-tier right of first refusal**: 60 днів після останньої acceptance клієнт мусить дати тобі шанс квотувати наступний tier / Phase 1 / Phase 2 перед тим, як шукати інших підрядників.

---

## 10. Red flags у клієнта (на чому розвертаємось)

- Просить skip Discovery (M1) → scope-creep гарантований навіть на 2-тижневому Tier 1.
- Хоче оплату «після лончу» → недокапіталізований або планує не заплатити.
- Не називає ОДНОГО decision-maker → кожен мітинг — цирк.
- «Тури готові, контент є, міграція не потрібна» → перевір на M1.
- Тисне на pure-rev-share → нема кешу.
- «Давайте Tier 4 за ціною Tier 1» → walk away.
- «Не хочу Travelpayouts, давайте свою інтеграцію з [random API]» → це не Tier 3, це Phase 1 з ризик-pad'ом 25%.
- «Хочу Tier 1 за €4k, але з 5 турами і кастомним UI цін» → це Tier 3. Або погоджуємось на Tier 1 у новому значенні (1 тур, widget), або переходимо на Tier 3.

---

## 11. Що треба підтвердити з клієнтом ПЕРЕД підписанням

### Deal-breaker питання

**Загальні:**

1. **Run-rate** — який зараз обсяг бізнесу і коли запускаємо маркетинг? *Від цього залежить, який tier взагалі має сенс.*
2. **Який tier обираємо** — на основі відповіді на №1 + decision tree з секції 7. *Default Tier 3. Tier 1 — тільки якщо клієнт сам так позиціонується.*

**Для Tier 1 (фокус):**

1. **Який тур обираємо як приклад?** (1 з історичних 13? новий? найперспективніший за маржею / попитом?)
2. **Які міста відправлення зробити в TP widget?** (3-5 міст оптимально — Київ + 2-4 регіональні)
3. **Хто пише копію / збирає фото?** (клієнт сам / їхній маркетолог / ми пишемо за €X як change-order)
4. **Куди йдуть ліди?** (Telegram-чат менеджерів — який саме / email на кого)

**Для Tier 2+:**

- **5 турів × N міст × N дат** — конкретно зафіксувати на Discovery. *У Tier 3+ це впливає на кількість Travelpayouts polling-програм і вартість API.*
- **Хто оператор лідів** — одна людина чи команда? *Впливає на ролі в Directus у Tier 3+. Якщо команда — додаємо ролі «контент-менеджер» / «оператор» / «адмін».*

M1 (Discovery) — найдешевший quality-filter на клієнта. Якщо відмовляється платити €600-€1 500 за discovery — за решту теж не заплатить.

---

## 12. Дві найпоширеніші помилки на проєктах такого типу

1. **Дати lean-quote €3k для Tier 1 бо клієнт поторгувався, потім стікати кров'ю на ризик-pad.** Walk-away floor Tier 1 — €4 000, не нижче. Якщо клієнт пресує — **скорочуй scope** (drop GA4, спрости форму, 2 міста в widget замість 5), не ціну. Не пропонуй «1 тур замість 1 туру», бо це вже Tier 1.

2. **Скіпнути M1 (Discovery).** Paid discovery — non-negotiable на будь-якому tier'і. На Tier 3 особливо: без Travelpayouts API онбордингу на M1 проєкт ляже на M2.

---

## 13. Перевірка перед запуском роботи (Pre-flight checklist)

Все вище — план. Поки не зроблено цих пунктів, не починаємо:

- [ ] Розмова з клієнтом, який tier обираємо (10 питань із `00-project-overview.md`, секція «Шпаргалка»).
- [ ] **Якщо Tier 1**: визначити який САМЕ тур як приклад + 3-5 міст відправлення для TP widget.
- [ ] **Якщо Tier 3+**: створено partner-акаунт у Travelpayouts, узгоджено UA-payout, отримано API key + перевірено доступ до Flight Data API. **До підписання Tier 3** — бо якщо Travelpayouts не онбордить, треба перепланувати на Tier 2 або відкласти.
- [ ] **Якщо Tier 2+**: створено Hostinger VPS акаунт (для Tier 2 за бажанням, для Tier 3+ обов'язково — там стоїть Coolify + Postgres + Directus).
- [ ] Підтверджено наявність контенту хоча б на 1 тур (Tier 1) / 3 тури (Tier 2+) — фото, опис, ціна — або зафіксовано, що клієнт згенерує його на тижні 1.
- [ ] Прописана структура milestone-контракту з юристом (1–2 робочі дні) і RU/UA-переклад готовий.

---

## Caveats до самого дослідження

- **Travelpayouts onboarding policy 2026 і UA-payout статус** — на основі даних до січня 2026. Перевір на M1 для **усіх tier'ів** (widget теж вимагає marker → акаунт).
- **Travelpayouts widget customization limits** — наскільки можна стилізувати під бренд. Перевір на M1 Tier 1-2; якщо обмеження критичні — це аргумент за Tier 3 одразу.
- **Cloudflare Pages free tier limits** — перевір build minutes (Tier 4 з 5 лендінгами точно влізе, але про всяк).
- **Directus self-hosted memory footprint** на Hostinger KVM2 — реально потягне Tier 3-4 з 5-50 турами. Перевір на M2 Tier 3.
- **Ставки фрилансу травень 2026** — grounded на DOU/Upwork/Toptal 2024–2025. Рекомендую перевірити DOU salary report 2025 H2 перед фіналом квоти.
- **Decap CMS GitHub OAuth flow** — за 2026 може бути міграція на GitHub Apps. Перевір на M1 Tier 1-2.

Усі ці перевірки мають бути зроблені під час M1 (Discovery), щоб ризик-pad захищав від змін після training-cutoff.
