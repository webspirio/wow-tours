import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { QUICK_INFO } from "@/lib/tour-data";

export function QuickInfo() {
  return (
    <section className="relative -mt-16 md:-mt-20 px-6 z-20">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {QUICK_INFO.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
          >
            <Card className="h-full bg-paper border-pink/10 hover:border-pink/40 hover:shadow-[var(--shadow-pink)] hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-4 md:p-5 flex flex-col items-start gap-2 pt-4">
                <div className="w-10 h-10 rounded-xl bg-pink/10 text-2xl flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="font-display text-lg md:text-xl leading-tight">{item.title}</div>
                <div className="text-xs md:text-sm text-mute">{item.subtitle}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
