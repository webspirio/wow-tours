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
