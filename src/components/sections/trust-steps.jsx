import { motion } from "motion/react";
import { Search, Phone, Plane } from "lucide-react";
import { SectionDivider } from "@/components/ui/section-divider";
import { TRUST_STEPS } from "@/lib/tour-data";

const ICONS = { Search, Phone, Plane };

export function TrustSteps() {
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
          <SectionDivider title="Як це працює" className="mb-6" />
          <h2 className="font-display text-4xl md:text-5xl mb-3">
            За 3 кроки у <em className="text-violet">WOW тур</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {TRUST_STEPS.map((step, idx) => {
            const Icon = ICONS[step.icon];
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="text-center relative"
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-violet to-pink text-white shadow-[var(--shadow-violet)]">
                  <Icon className="w-8 h-8" strokeWidth={2} />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow text-ink font-bold text-sm flex items-center justify-center shadow-sm">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="font-display text-2xl mb-2">{step.title}</h3>
                <p className="text-mute text-base max-w-xs mx-auto">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
