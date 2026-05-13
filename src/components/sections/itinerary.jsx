import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Lightbulb } from "lucide-react";
import { TracingBeam } from "@/components/effects/tracing-beam";
import { SectionDivider } from "@/components/ui/section-divider";
import { ITINERARY } from "@/lib/tour-data";
import { cn } from "@/lib/utils";

function DayCard({ day, idx }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
      className="relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start scroll-mt-24"
    >
      {/* Day badge */}
      <div className="md:col-span-2 flex md:flex-col md:items-start gap-3 md:gap-0">
        <div className="font-display text-violet text-4xl md:text-5xl leading-none">
          {String(day.day).padStart(2, "0")}
        </div>
        <div className="text-xs text-mute uppercase tracking-wider md:mt-1">день</div>
      </div>

      {/* Text + disclosure */}
      <div className="md:col-span-5 order-3 md:order-2">
        <h3 className="font-display text-2xl md:text-3xl mb-2 flex items-center gap-3">
          <span className="text-3xl">{day.icon}</span>
          {day.title}
        </h3>
        <p className="text-mute text-base md:text-lg leading-relaxed">{day.desc}</p>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className={cn(
            "mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-violet",
            "hover:text-violet-dark transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/40 rounded px-1 -mx-1"
          )}
        >
          <span>{open ? "Згорнути" : "Деталі програми"}</span>
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-300 motion-reduce:transition-none",
              open && "rotate-180"
            )}
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-4">
                <p className="text-ink/80 text-base leading-relaxed">{day.details}</p>

                {day.highlights?.length > 0 && (
                  <ul className="space-y-2">
                    {day.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-sm text-ink">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet shrink-0"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {day.tip && (
                  <div className="rounded-lg bg-yellow/15 border border-yellow/30 p-3 flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-yellow-dark mt-0.5 shrink-0" strokeWidth={2.2} />
                    <div className="text-sm text-ink leading-relaxed">
                      <span className="font-semibold">Порада: </span>
                      {day.tip}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Photo */}
      <div className="md:col-span-5 order-2 md:order-3">
        <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-lg bg-ink/5 group">
          <img
            src={day.photo}
            alt={day.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>
      </div>
    </motion.article>
  );
}

export function Itinerary() {
  return (
    <section className="py-20 md:py-28 px-6 bg-paper">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <SectionDivider title="Програма туру" className="mb-6" />
          <h2 className="font-display text-4xl md:text-5xl mb-3">
            7 днів між <em className="text-violet">льодом і вогнем</em>
          </h2>
          <p className="text-mute text-lg max-w-2xl mx-auto">
            Натисніть «Деталі програми» під будь-яким днем — побачите розклад, поради та що включено.
          </p>
        </motion.div>

        <TracingBeam className="px-6">
          <div className="space-y-12 md:space-y-16">
            {ITINERARY.map((day, idx) => (
              <DayCard key={day.day} day={day} idx={idx} />
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
}
