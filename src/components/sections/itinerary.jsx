import { motion } from "motion/react";
import { TracingBeam } from "@/components/effects/tracing-beam";
import { ITINERARY } from "@/lib/tour-data";

export function Itinerary() {
  return (
    <section className="py-20 md:py-28 px-6 bg-paper">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl mb-3">
            Програма <em className="text-violet">туру</em>
          </h2>
          <p className="text-mute text-lg max-w-2xl mx-auto">
            Сім днів між льодом і вогнем, з гідом українською мовою.
          </p>
        </motion.div>

        <TracingBeam className="px-6">
          <div className="space-y-8 md:space-y-12">
            {ITINERARY.map((day, idx) => (
              <motion.article
                key={day.day}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative flex gap-6 md:gap-8 pl-2"
              >
                <div className="flex-shrink-0">
                  <div className="font-display text-violet text-3xl md:text-4xl leading-none">
                    {String(day.day).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-mute uppercase tracking-wider mt-1">
                    день
                  </div>
                </div>
                <div className="flex-1 pb-6 border-b border-border last:border-0">
                  <h3 className="font-display text-2xl md:text-3xl mb-2 flex items-center gap-3">
                    <span className="text-3xl">{day.icon}</span>
                    {day.title}
                  </h3>
                  <p className="text-mute text-base md:text-lg leading-relaxed">{day.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
}
