import { motion } from "motion/react";
import { Marquee } from "@/components/effects/marquee";
import { Card, CardContent } from "@/components/ui/card";
import { TESTIMONIALS } from "@/lib/tour-data";

function ReviewCard({ name, city, quote, avatar }) {
  return (
    <Card className="w-80 md:w-96 mx-3 bg-paper hover:shadow-[var(--shadow-pink)] transition-shadow duration-300">
      <CardContent className="p-6">
        <p className="text-base text-ink leading-relaxed italic mb-4 line-clamp-4">«{quote}»</p>
        <div className="flex items-center gap-3 pt-3 border-t border-border">
          <span className="text-2xl">{avatar}</span>
          <div>
            <div className="font-semibold text-sm">{name}</div>
            <div className="text-xs text-mute">{city}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Testimonials() {
  const firstHalf = TESTIMONIALS.slice(0, 3);
  const secondHalf = TESTIMONIALS.slice(3);

  return (
    <section className="py-20 md:py-28 bg-ink text-paper overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl mb-3">
            Відгуки наших <em className="text-yellow">туристів</em>
          </h2>
          <p className="text-paper/60 text-lg max-w-2xl mx-auto">
            Шість країн, сотні маршрутів. Ось що кажуть ті, хто вже літали.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <Marquee pauseOnHover className="[--duration:60s]">
          {firstHalf.map((t, idx) => (
            <ReviewCard key={`a-${idx}`} {...t} />
          ))}
        </Marquee>
        <Marquee pauseOnHover reverse className="[--duration:50s] mt-4">
          {secondHalf.map((t, idx) => (
            <ReviewCard key={`b-${idx}`} {...t} />
          ))}
        </Marquee>

        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
      </div>
    </section>
  );
}
