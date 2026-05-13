import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Prices } from "@/components/sections/prices";
import { Included } from "@/components/sections/included";
import { Itinerary } from "@/components/sections/itinerary";
import { Testimonials } from "@/components/sections/testimonials";
import { Booking } from "@/components/sections/booking";
import { Footer } from "@/components/sections/footer";
import { StickyCTA } from "@/components/sections/sticky-cta";

export default function Landing() {
  return (
    <div id="top" className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Prices />
        <Included />
        <Itinerary />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
