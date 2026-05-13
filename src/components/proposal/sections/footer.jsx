import { CalendarCheck, Phone, Send } from "lucide-react";
import { PROPOSAL_META } from "@/lib/proposal-data";

export function Footer() {
  return (
    <footer id="footer" className="border-t border-border bg-paper">
      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-6 lg:py-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-mute">
            Контакт для запитань і підписання
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <a
              href={PROPOSAL_META.contact.calendar}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-paper ring-1 ring-ink/20 transition-all hover:bg-ink-soft"
            >
              <CalendarCheck className="size-4" />
              Записатись на 30-хв зустріч
            </a>
            <a
              href={PROPOSAL_META.contact.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-ink ring-1 ring-ink/5 transition-all hover:bg-paper"
            >
              <Send className="size-4" />
              Telegram: {PROPOSAL_META.contact.telegram}
            </a>
            <a
              href={PROPOSAL_META.contact.phoneHref}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-ink ring-1 ring-ink/5 transition-all hover:bg-paper"
            >
              <Phone className="size-4" />
              {PROPOSAL_META.contact.phoneDisplay}
            </a>
          </div>
          <p className="mt-4 max-w-xl text-balance text-xs italic text-mute">
            Пропозиція дійсна до {PROPOSAL_META.validUntil}. Усі ціни в {PROPOSAL_META.currency}, без ПДВ.
          </p>
          <p className="mt-2 text-xs text-mute-soft">
            © 2026 WOW Tours · Розробка нового сайту
          </p>
        </div>
      </div>
    </footer>
  );
}
