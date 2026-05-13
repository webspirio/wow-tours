import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NumberTicker } from "@/components/effects/number-ticker";
import { PRICES } from "@/lib/tour-data";
import { cn } from "@/lib/utils";

export function Prices() {
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
          <h2 className="font-display text-4xl md:text-5xl mb-3">
            Живі ціни на <em className="text-pink">авіаквитки</em>
          </h2>
          <p className="text-mute text-lg max-w-2xl mx-auto">
            Вартість змінюється щодня. Обирайте місто вильоту і дату, що влізе у бюджет.
          </p>
          <Badge variant="success" className="mt-4">
            ↻ Оновлено {PRICES.lastUpdate} · Travelpayouts
          </Badge>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {PRICES.cities.map((city, idx) => {
            const cityPrices = PRICES.table[city];
            const min = Math.min(...cityPrices);
            return (
              <motion.div
                key={city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="h-full hover:shadow-[var(--shadow-violet)] hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display text-2xl">{city}</h3>
                      <span className="text-xs text-mute uppercase tracking-wider">з</span>
                    </div>
                    <div className="space-y-3">
                      {PRICES.windows.map((window, wIdx) => {
                        const price = cityPrices[wIdx];
                        const isBest = price === min;
                        return (
                          <div key={window.label} className="flex items-center justify-between">
                            <span className={cn("text-sm", isBest ? "font-semibold text-ink" : "text-mute")}>
                              {window.label}
                            </span>
                            <span className={cn("text-lg font-bold tabular-nums", isBest ? "text-success" : "text-ink")}>
                              €<NumberTicker value={price} delay={idx * 0.1 + wIdx * 0.05} />
                              {isBest && <span className="ml-1.5 text-xs font-medium text-success">мін</span>}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <p className="text-xs text-mute text-center mt-8 max-w-2xl mx-auto">
          * Ціни вказані за людину, в одну сторону. Повна вартість туру (квиток + готель + програма) розраховується індивідуально на консультації.
        </p>
      </div>
    </section>
  );
}
