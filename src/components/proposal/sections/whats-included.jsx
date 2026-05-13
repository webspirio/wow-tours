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
