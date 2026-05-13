export function Footer() {
  return (
    <footer className="bg-ink text-paper py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="font-display text-3xl bg-gradient-to-r from-yellow via-pink to-violet bg-clip-text text-transparent inline-block mb-3">
              WOW Tours
            </div>
            <p className="text-paper/60 text-base max-w-md">
              Європа без переплат — живі ціни, чесні маршрути, гід українською.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end text-paper/80 text-base">
            <a href="tel:+380670000000" className="hover:text-yellow transition-colors">
              📞 +380 67 000 00 00
            </a>
            <a href="mailto:hello@wow-tours.example" className="hover:text-yellow transition-colors">
              ✉️ hello@wow-tours.example
            </a>
            <a href="https://t.me/wowtours" className="hover:text-yellow transition-colors">
              💬 Telegram: @wowtours
            </a>
          </div>
        </div>
        <div className="border-t border-paper/10 pt-6 text-center text-sm text-paper/40">
          © 2026 WOW Tours · Mock-лендінг для демонстрації Tier 1
        </div>
      </div>
    </footer>
  );
}
