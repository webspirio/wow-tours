import { useEffect } from "react";
import { Hero } from "@/components/proposal/sections/hero";
import { Framing } from "@/components/proposal/sections/framing";
import { Tiers } from "@/components/proposal/sections/tiers";
import { Comparison } from "@/components/proposal/sections/comparison";
import { Hosting } from "@/components/proposal/sections/hosting";
import { WhatsIncluded } from "@/components/proposal/sections/whats-included";
import { AddOns } from "@/components/proposal/sections/add-ons";
import { Terms } from "@/components/proposal/sections/terms";
import { NotIncluded } from "@/components/proposal/sections/not-included";
import { NextSteps } from "@/components/proposal/sections/next-steps";

export default function ProposalPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "WOW Tours — Комерційна пропозиція";
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <Hero />
      <Framing />
      <Tiers />
      <Comparison />
      <Hosting />
      <WhatsIncluded />
      <AddOns />
      <Terms />
      <NotIncluded />
      <NextSteps />
    </div>
  );
}
