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
  return `€${n.toLocaleString("uk-UA").replace(/ /g, " ")}`;
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
