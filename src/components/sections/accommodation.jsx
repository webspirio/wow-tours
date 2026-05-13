import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionDivider } from "@/components/ui/section-divider";
import { ACCOMMODATIONS } from "@/lib/tour-data";

export function Accommodation() {
  return (
    <section className="py-20 md:py-28 px-6 bg-gradient-to-br from-violet/[0.03] via-pink/[0.02] to-yellow/[0.03]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <SectionDivider title="Де живемо" className="mb-6" />
          <h2 className="font-display text-4xl md:text-5xl mb-3">
            Перевірені <em className="text-pink">готелі</em>
          </h2>
          <p className="text-mute text-lg max-w-2xl mx-auto">
            Тільки 3*–4* з рейтингом 8.5+ на Booking.com. Сніданок і Wi-Fi усюди.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACCOMMODATIONS.map((hotel, idx) => (
            <motion.div
              key={hotel.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="h-full overflow-hidden group hover:shadow-[var(--shadow-violet)] hover:-translate-y-1 transition-all duration-300 p-0">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={hotel.photo}
                    alt={hotel.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
                <CardContent className="p-5 pt-5">
                  <h3 className="font-display text-xl mb-1">{hotel.name}</h3>
                  <div className="text-sm text-mute mb-3">
                    {hotel.city} · {hotel.nights} {hotel.nights === 1 ? "ніч" : "ночей"}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {hotel.amenities.map((a) => (
                      <span key={a} className="text-xs px-2 py-1 rounded-md bg-ink/5 text-ink">
                        {a}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
