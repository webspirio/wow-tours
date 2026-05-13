import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { QuickInfo } from "@/components/sections/quick-info";
import { Itinerary } from "@/components/sections/itinerary";
import { Accommodation } from "@/components/sections/accommodation";
import { Included } from "@/components/sections/included";
import { Prices } from "@/components/sections/prices";
import { TrustSteps } from "@/components/sections/trust-steps";
import { VideoTestimonials } from "@/components/sections/video-testimonials";
import { Booking } from "@/components/sections/booking";
import { Footer } from "@/components/sections/footer";
import { StickyCTA } from "@/components/sections/sticky-cta";
import { DemoBanner } from "@/components/sections/demo-banner";
import { BookingPrefillProvider } from "@/lib/booking-prefill";

export default function Landing() {
  return (
    <BookingPrefillProvider>
      <div id="top" className="min-h-screen">
        <DemoBanner />
        <Header />
        <main>
          <Hero />
          <QuickInfo />
          <section id="itinerary"><Itinerary /></section>
          <Accommodation />
          <Prices />
          <Included />
          <TrustSteps />
          <VideoTestimonials />
          <Booking />
        </main>
        <Footer />
        <StickyCTA />
      </div>
    </BookingPrefillProvider>
  );
}
