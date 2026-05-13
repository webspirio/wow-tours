import { useEffect } from "react";
import { Hero } from "@/components/proposal/sections/hero";

export default function ProposalPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "WOW Tours — Комерційна пропозиція";
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <Hero />
    </div>
  );
}
