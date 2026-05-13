import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PRICES } from "@/lib/tour-data";

const schema = z.object({
  name: z.string().min(2, "Принаймні 2 символи"),
  phone: z.string().min(7, "Введіть коректний телефон"),
  city: z.string().min(1),
});

export function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", city: PRICES.cities[0] },
  });

  const onSubmit = async (data) => {
    // UI-only — у продакшені сюди йде Cloudflare Function → Telegram + email
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      reset();
    }, 5000);
  };

  return (
    <section id="booking" className="py-20 md:py-28 px-6 bg-gradient-to-br from-violet via-pink to-violet-dark relative overflow-hidden">
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
          className="bg-paper rounded-2xl p-8 shadow-2xl"
        >
          {submitted ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-display text-2xl mb-2">Дякуємо!</h3>
              <p className="text-mute">Зв'яжемось з вами протягом 2 годин.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Ім'я</Label>
                <Input id="name" placeholder="Олена" {...register("name")} aria-invalid={!!errors.name} />
                {errors.name && <p className="text-xs text-danger">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" type="tel" placeholder="+380 67 123 45 67" {...register("phone")} aria-invalid={!!errors.phone} />
                {errors.phone && <p className="text-xs text-danger">{errors.phone.message}</p>}
              </div>

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

              <Button type="submit" variant="violet" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Відправляємо..." : "Залишити заявку"}
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
