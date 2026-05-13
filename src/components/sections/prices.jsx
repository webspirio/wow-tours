import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plane } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionDivider } from "@/components/ui/section-divider";
import { PRICES } from "@/lib/tour-data";
import { useBookingPrefill } from "@/lib/booking-prefill";
import { cn } from "@/lib/utils";

export function Prices() {
  const [activeCity, setActiveCity] = useState(PRICES.cities[0]);
  const { setPrefill } = useBookingPrefill();
  const flights = PRICES.flights[activeCity];
  const minFlight = Math.min(...flights);

  const handlePick = (dep) => {
    setPrefill({ city: activeCity, departureIso: dep.iso });
  };

  return (
    <section className="py-20 md:py-28 px-6 bg-paper">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <SectionDivider title="Розклад і ціни" className="mb-6" />
          <h2 className="font-display text-4xl md:text-5xl mb-3">
            Виліт <em className="text-pink">щосуботи</em>
          </h2>
          <p className="text-mute text-base md:text-lg max-w-2xl mx-auto">
            Базова ціна туру <span className="font-semibold text-ink">€{PRICES.base}</span> — {PRICES.baseIncludes}.
            <br className="hidden md:block" />
            Окремо — квиток на літак з вашого міста (нижче — поточні тарифи).
          </p>
          <Badge variant="success" className="mt-4">
            ↻ Оновлено {PRICES.lastUpdate}
          </Badge>
        </motion.div>

        {/* City tabs */}
        <div
          role="tablist"
          aria-label="Місто вильоту"
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8"
        >
          {PRICES.cities.map((city) => {
            const cityMin = PRICES.base + Math.min(...PRICES.flights[city]);
            const active = activeCity === city;
            return (
              <button
                key={city}
                role="tab"
                aria-selected={active}
                aria-controls="departures-panel"
                onClick={() => setActiveCity(city)}
                className={cn(
                  "inline-flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/40",
                  active
                    ? "bg-violet text-white shadow-[var(--shadow-violet)]"
                    : "bg-ink/5 text-ink hover:bg-ink/10"
                )}
              >
                <Plane className="w-4 h-4" strokeWidth={2.2} />
                <span>{city}</span>
                <span className={cn("text-xs font-medium", active ? "text-white/80" : "text-mute")}>
                  від €{cityMin}
                </span>
              </button>
            );
          })}
        </div>

        {/* Departures list */}
        <div id="departures-panel" role="tabpanel" className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCity}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-border bg-paper shadow-sm overflow-hidden"
            >
              {PRICES.departures.map((dep, idx) => {
                const flight = flights[idx];
                const total = PRICES.base + flight;
                const isMin = flight === minFlight;
                return (
                  <a
                    key={dep.iso}
                    href="#booking"
                    onClick={() => handlePick(dep)}
                    className={cn(
                      "group flex w-full items-center justify-between gap-3 p-4 md:p-5 text-left transition-colors hover:bg-violet/[0.04] focus-visible:outline-none focus-visible:bg-violet/[0.06]",
                      idx !== 0 && "border-t border-border",
                      isMin && "bg-success/[0.04] hover:bg-success/[0.07]"
                    )}
                    aria-label={`Обрати тур: ${dep.weekday}, ${dep.day} ${dep.month} з ${activeCity} за €${total}`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-ink text-base md:text-lg">
                          {dep.weekday}, {dep.day} {dep.month}
                        </span>
                        {isMin && (
                          <span className="text-[10px] uppercase tracking-wider font-bold text-success bg-success/10 px-2 py-0.5 rounded">
                            найдешевший
                          </span>
                        )}
                      </div>
                      <div className="text-xs md:text-sm text-mute mt-0.5 tabular-nums">
                        €{PRICES.base} тур + €{flight} квиток
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div
                        className={cn(
                          "font-display text-2xl md:text-3xl tabular-nums whitespace-nowrap",
                          isMin ? "text-success" : "text-ink"
                        )}
                      >
                        €{total}
                      </div>
                      <span
                        aria-hidden="true"
                        className="text-mute group-hover:text-violet group-hover:translate-x-0.5 transition-all text-xl leading-none"
                      >
                        →
                      </span>
                    </div>
                  </a>
                );
              })}
            </motion.div>
          </AnimatePresence>

          <p className="text-xs text-mute text-center mt-4 max-w-xl mx-auto">
            Клацніть рядок — перенесемо вас до форми із заповненими датою та містом.
            <br className="hidden md:block" />
            Ціни на квитки оновлюються щогодини; фіксуємо тариф під час бронювання.
          </p>

          <div className="text-center mt-6">
            <Button asChild variant="ghost" size="md">
              <a href="#booking">Не визначились з датою? Залиште заявку →</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
