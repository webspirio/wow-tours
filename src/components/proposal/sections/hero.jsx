import { motion } from "motion/react";
import { ArrowDown, CalendarCheck, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROPOSAL_META, TIERS, formatPrice } from "@/lib/proposal-data";

function KpiChip({ tier }) {
  return (
    <a
      href={`#tier-${tier.id}`}
      className="rounded-xl border border-border bg-white px-4 py-4 ring-1 ring-ink/5 backdrop-blur transition-all hover:-translate-y-0.5 hover:ring-violet/20 text-left"
    >
      <p className="text-[0.65rem] uppercase tracking-wider text-mute">{tier.name}</p>
      <p className="font-display mt-1 text-2xl font-semibold tracking-tight text-ink">
        {formatPrice(tier.price)}
      </p>
      <p className="mt-0.5 text-xs text-mute">{tier.timeline}</p>
    </a>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(124,58,237,0.10),transparent_70%)] print:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-ink/15 to-transparent"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center lg:px-6 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-3"
        >
          <Badge variant="outline" className="px-3 py-1 text-[0.7rem] tracking-wider uppercase">
            WOW Tours · Комерційна пропозиція
          </Badge>
          <p className="text-sm text-mute">
            {PROPOSAL_META.date} · дійсна до {PROPOSAL_META.validUntil} · {PROPOSAL_META.currency} без ПДВ
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="font-display mt-6 text-balance text-4xl font-semibold tracking-tight lg:text-6xl"
        >
          Чотири варіанти запуску —<br className="hidden sm:inline" />{" "}
          <span className="text-mute">від MVP до повноцінної платформи</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-6 max-w-2xl text-balance text-lg text-mute lg:text-xl"
        >
          Кожен тариф включає все з попереднього + нові можливості. Виберіть стартову точку — масштабуєтесь, коли готові.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-3 lg:grid-cols-4"
        >
          {TIERS.map((t) => <KpiChip key={t.id} tier={t} />)}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row print:hidden"
        >
          <Button asChild variant="primary" size="lg">
            <a href={PROPOSAL_META.contact.calendar} target="_blank" rel="noopener noreferrer">
              <CalendarCheck className="size-4" />
              Записатись на 30-хв дзвінок
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#/">
              <ExternalLink className="size-4" />
              Подивитись живе демо
            </a>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <a href="#section-1">
              Прокрутити деталі
              <ArrowDown className="size-4" />
            </a>
          </Button>
        </motion.div>

        {PROPOSAL_META.positioningTagline && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-xs uppercase tracking-[0.2em] text-mute"
          >
            {PROPOSAL_META.positioningTagline}
          </motion.p>
        )}
      </div>
    </section>
  );
}
