export function DemoBanner() {
  return (
    <div className="bg-yellow/15 border-b border-yellow-dark/30 text-ink text-sm">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <span>
          <span className="font-semibold">Це швидке демо тарифу Quick Launch.</span>{" "}
          <span className="text-ink-soft">Фінальний сайт може виглядати інакше — функції залежать від обраного тарифу.</span>
        </span>
        <a
          href="#/proposal"
          className="font-semibold underline underline-offset-2 hover:no-underline whitespace-nowrap"
        >
          ← Повернутись до пропозиції
        </a>
      </div>
    </div>
  );
}
