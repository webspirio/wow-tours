import { motion } from "motion/react";
import { AuroraBackground } from "@/components/effects/aurora-background";
import { FlipWords } from "@/components/effects/flip-words";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TOUR, FLIGHT_PRICE_MIN } from "@/lib/tour-data";

export function Hero() {
  return (
    <AuroraBackground className="min-h-screen pt-24 pb-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6"
      >
        <Badge variant="yellow" className="text-sm">
          ⭐ {TOUR.badge}
        </Badge>

        <h1 className="font-display text-paper text-[clamp(48px,9vw,120px)] leading-[0.95] tracking-tight">
          Iceland
          <br />
          <em className="not-italic bg-gradient-to-r from-yellow via-pink to-violet bg-clip-text text-transparent">
            awaits.
          </em>
        </h1>

        <div className="text-paper/90 text-lg md:text-xl max-w-2xl flex items-center justify-center gap-2 flex-wrap">
          <span>7 днів між</span>
          <span className="font-semibold text-yellow inline-flex min-w-[180px] justify-center">
            <FlipWords words={TOUR.rotatingWords} />
          </span>
        </div>

        <p className="text-paper/70 text-base md:text-lg max-w-xl">{TOUR.shortDesc}</p>

        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-paper/80 text-sm md:text-base mt-2">
          <span>🗓 {TOUR.days} днів / {TOUR.nights} ночей</span>
          <span className="opacity-50">·</span>
          <span>✈️ виліт з 4 міст</span>
          <span className="opacity-50">·</span>
          <span>💶 від €{FLIGHT_PRICE_MIN}</span>
        </div>

        <Button asChild variant="primary" size="lg" className="mt-4 text-lg">
          <a href="#booking">Хочу в цей тур →</a>
        </Button>
      </motion.div>
    </AuroraBackground>
  );
}
