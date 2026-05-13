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
