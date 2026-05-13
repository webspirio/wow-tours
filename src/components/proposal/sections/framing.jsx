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
