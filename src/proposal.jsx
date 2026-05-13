import { useEffect } from "react";

export default function ProposalPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "WOW Tours — Комерційна пропозиція";
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <div className="mx-auto max-w-4xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">WOW Tours — Комерційна пропозиція</h1>
        <p className="mt-4 text-mute">Placeholder — sections wired in later tasks.</p>
        <a href="#/" className="mt-8 inline-block text-violet underline">← До демо</a>
      </div>
    </div>
  );
}
