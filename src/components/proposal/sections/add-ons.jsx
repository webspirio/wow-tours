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
                <th scope="col" className="border-b border-border px-5 py-3 text-left font-semibold text-ink">Послуга</th>
                <th scope="col" className="border-b border-border px-5 py-3 text-right font-semibold text-ink">Ціна</th>
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
