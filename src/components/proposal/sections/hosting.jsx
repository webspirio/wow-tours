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
                <th scope="col" className="border-b border-border px-4 py-3 text-left font-semibold text-ink">
                  Що включено
                </th>
                {HOSTING_PLANS.map((p) => (
                  <th scope="col" key={p.plan} className="border-b border-border px-4 py-3 text-center font-semibold text-ink">
                    {p.plan}
                  </th>
                ))}
              </tr>
              <tr className="bg-paper/60">
                <th scope="row" className="border-b border-border px-4 py-2 text-left text-xs uppercase tracking-wider text-mute">
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
