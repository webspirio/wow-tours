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
      {group.rows.map((row) => (
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
