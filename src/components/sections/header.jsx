import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header({ topSlot = null }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-paper/95 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      )}
    >
      {topSlot}
      <div
        className={cn(
          "max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <a href="#top" className="font-display text-2xl md:text-3xl bg-gradient-to-r from-violet to-pink bg-clip-text text-transparent leading-none">
          WOW Tours
        </a>
        <Button asChild variant="primary" size="sm">
          <a href="#booking">Залишити заявку</a>
        </Button>
      </div>
    </header>
  );
}
