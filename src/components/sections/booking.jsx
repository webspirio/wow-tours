import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { Calendar, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PRICES } from "@/lib/tour-data";
import { useBookingPrefill } from "@/lib/booking-prefill";

const schema = z.object({
  name: z.string().min(2, "Принаймні 2 символи"),
  phone: z.string().min(7, "Введіть коректний телефон"),
  city: z.string().min(1),
  departureIso: z.string().optional(),
});

function findDeparture(iso) {
  return PRICES.departures.find((d) => d.iso === iso) || null;
}

function formatDeparture(dep) {
  return `${dep.weekday}, ${dep.day} ${dep.month}`;
}

export function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const { prefill, clearPrefill } = useBookingPrefill();
  const nameRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      city: PRICES.cities[0],
      departureIso: "",
    },
  });

  // Sync prefill (from Prices section) into the form whenever it changes
  useEffect(() => {
    if (!prefill.city && !prefill.departureIso) return;
    if (prefill.city) setValue("city", prefill.city, { shouldValidate: false });
    if (prefill.departureIso) setValue("departureIso", prefill.departureIso, { shouldValidate: false });
    // Move focus to the first empty field (name) so the user just types their details.
    // preventScroll avoids fighting the smooth anchor scroll triggered by the row link.
    nameRef.current?.focus({ preventScroll: true });
  }, [prefill, setValue]);

  const watchedCity = watch("city");
  const watchedDeparture = watch("departureIso");
  const selectedDeparture = useMemo(() => findDeparture(watchedDeparture), [watchedDeparture]);
  const flightPrice =
    selectedDeparture && PRICES.flights[watchedCity]
      ? PRICES.flights[watchedCity][PRICES.departures.findIndex((d) => d.iso === selectedDeparture.iso)]
      : null;
  const totalPrice = flightPrice != null ? PRICES.base + flightPrice : null;

  const { ref: nameFieldRef, ...nameRest } = register("name");

  const onSubmit = async () => {
    // UI-only — у продакшені сюди йде Cloudflare Function → Telegram + email
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      reset();
      clearPrefill();
    }, 5000);
  };

  const clearSummary = () => {
    setValue("departureIso", "");
    clearPrefill();
  };

  return (
    <section
      id="booking"
      className="py-20 md:py-28 px-6 bg-gradient-to-br from-violet via-pink to-violet-dark relative overflow-hidden scroll-mt-20"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-paper"
        >
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Залиште <em className="text-yellow">заявку</em>
          </h2>
          <p className="text-paper/90 text-lg mb-6 leading-relaxed">
            Менеджер передзвонить протягом 2 годин, підбере найкращу дату і виліт під ваш бюджет. Без передоплати на цьому етапі.
          </p>
          <div className="flex flex-col gap-3 text-paper/80 text-sm">
            <div className="flex items-center gap-2">⏱️ Відповідь за 2 години у робочий час</div>
            <div className="flex items-center gap-2">💳 Без передоплати при бронюванні</div>
            <div className="flex items-center gap-2">🛡️ Підтримка українською мовою</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-paper rounded-2xl p-6 md:p-8 shadow-2xl"
        >
          {submitted ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-display text-2xl mb-2">Дякуємо!</h3>
              <p className="text-mute">Зв'яжемось з вами протягом 2 годин.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {selectedDeparture && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl bg-gradient-to-br from-violet/8 via-pink/5 to-yellow/8 border border-violet/15 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs uppercase tracking-wider font-semibold text-violet mb-1.5">
                        Ваш тур
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                        <span className="inline-flex items-center gap-1.5 text-ink font-semibold">
                          <Calendar className="w-4 h-4 text-violet" />
                          {formatDeparture(selectedDeparture)}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-ink font-semibold">
                          <MapPin className="w-4 h-4 text-pink" />
                          {watchedCity}
                        </span>
                      </div>
                      {totalPrice != null && (
                        <div className="text-xs text-mute mt-1.5 tabular-nums">
                          €{PRICES.base} тур + €{flightPrice} квиток ={" "}
                          <span className="font-display text-base text-ink">€{totalPrice}</span>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={clearSummary}
                      className="shrink-0 text-mute hover:text-ink transition-colors p-1 -m-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/40"
                      aria-label="Очистити обрану дату"
                      title="Очистити"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Ім'я</Label>
                <Input
                  id="name"
                  placeholder="Олена"
                  {...nameRest}
                  ref={(el) => {
                    nameFieldRef(el);
                    nameRef.current = el;
                  }}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="text-xs text-danger">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" type="tel" placeholder="+380 67 123 45 67" {...register("phone")} aria-invalid={!!errors.phone} />
                {errors.phone && <p className="text-xs text-danger">{errors.phone.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Місто вильоту</Label>
                  <select
                    id="city"
                    className="flex h-11 w-full rounded-lg border border-border bg-paper px-4 text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/40"
                    {...register("city")}
                  >
                    {PRICES.cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="departureIso">Дата вильоту</Label>
                  <select
                    id="departureIso"
                    className="flex h-11 w-full rounded-lg border border-border bg-paper px-4 text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/40"
                    {...register("departureIso")}
                  >
                    <option value="">Підібрати разом з менеджером</option>
                    {PRICES.departures.map((d) => (
                      <option key={d.iso} value={d.iso}>
                        {formatDeparture(d)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button type="submit" variant="violet" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting
                  ? "Відправляємо..."
                  : totalPrice != null
                  ? `Залишити заявку · €${totalPrice}`
                  : "Залишити заявку"}
              </Button>

              <p className="text-xs text-mute text-center">
                Натискаючи кнопку, ви погоджуєтесь з обробкою персональних даних.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
