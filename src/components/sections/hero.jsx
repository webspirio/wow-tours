import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { AuroraBackground } from "@/components/effects/aurora-background";
import { FlipWords } from "@/components/effects/flip-words";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TOUR, TOUR_PRICE_FROM, PRICES } from "@/lib/tour-data";

const schema = z.object({
  name: z.string().min(2, "Принаймні 2 символи"),
  phone: z.string().min(7, "Введіть телефон"),
  city: z.string().min(1),
});

function HeroLeadWidget() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", city: PRICES.cities[0] },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); reset(); }, 5000);
  };

  return (
    <div className="bg-paper rounded-2xl p-6 md:p-7 shadow-2xl border border-ink/5">
      <div className="font-display text-xl text-ink mb-1">Залиште заявку</div>
      <div className="text-xs text-mute mb-4">Менеджер передзвонить за 2 години</div>

      {submitted ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">✅</div>
          <div className="font-semibold text-ink">Дякуємо!</div>
          <div className="text-sm text-mute">Зв'яжемось протягом 2 годин.</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <Label htmlFor="hero-name" className="text-xs">Ім'я</Label>
            <Input id="hero-name" placeholder="Олена" {...register("name")} className="mt-1" />
            {errors.name && <p className="text-xs text-danger mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="hero-phone" className="text-xs">Телефон</Label>
            <Input id="hero-phone" type="tel" placeholder="+380..." {...register("phone")} className="mt-1" />
            {errors.phone && <p className="text-xs text-danger mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <Label htmlFor="hero-city" className="text-xs">Місто вильоту</Label>
            <select
              id="hero-city"
              className="flex h-11 w-full rounded-lg border border-border bg-paper px-4 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/40 mt-1"
              {...register("city")}
            >
              {PRICES.cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <Button type="submit" variant="primary" size="md" className="w-full mt-1" disabled={isSubmitting}>
            {isSubmitting ? "Відправляємо..." : "Хочу в цей тур →"}
          </Button>
          <p className="text-[10px] text-mute text-center">
            Без передоплати. Без спаму.
          </p>
        </form>
      )}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Photo background layer */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${TOUR.cover})` }}
        aria-hidden="true"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/40 to-ink/85" aria-hidden="true" />
      {/* Aurora overlay (subtle) */}
      <AuroraBackground className="absolute inset-0 !bg-transparent opacity-50" showRadialGradient={false}>
        <div />
      </AuroraBackground>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 md:pt-32 pb-32 md:pb-40 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 text-paper flex flex-col items-start gap-5"
        >
          <Badge variant="yellow" className="text-sm">⭐ {TOUR.badge}</Badge>

          <h1 className="font-display text-paper text-[clamp(48px,8vw,108px)] leading-[0.95] tracking-tight">
            Iceland
            <br />
            <em className="not-italic bg-gradient-to-r from-yellow via-pink to-violet bg-clip-text text-transparent">
              awaits.
            </em>
          </h1>

          <div className="text-paper/90 text-lg md:text-xl flex items-center gap-2 flex-wrap">
            <span>7 днів між</span>
            <span className="font-semibold text-yellow inline-flex min-w-[180px] justify-start">
              <FlipWords words={TOUR.rotatingWords} />
            </span>
          </div>

          <p className="text-paper/75 text-base md:text-lg max-w-xl">{TOUR.shortDesc}</p>

          <div className="flex items-center gap-3 mt-2">
            <Button asChild variant="primary" size="lg" className="text-lg">
              <a href="#booking">від €{TOUR_PRICE_FROM} →</a>
            </Button>
            <a href="#itinerary" className="text-paper/80 text-sm font-medium hover:text-yellow transition-colors">
              Подивитись програму ↓
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5"
        >
          <HeroLeadWidget />
        </motion.div>
      </div>
    </section>
  );
}
