import { cn } from "@/lib/utils";

export const AuroraBackground = ({ children, className, showRadialGradient = true, ...props }) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-ink text-paper transition-bg overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "pointer-events-none absolute -inset-[10px] opacity-60 will-change-transform",
            "[--aurora:repeating-linear-gradient(100deg,#7c3aed_10%,#ec4899_25%,#fbbf24_40%,#7c3aed_55%,#ec4899_70%)]",
            "[--dark-gradient:repeating-linear-gradient(100deg,#1a1a2e_0%,#1a1a2e_7%,transparent_10%,transparent_12%,#1a1a2e_16%)]",
            "[background-image:var(--dark-gradient),var(--aurora)]",
            "[background-size:300%,_200%]",
            "[background-position:50%_50%,50%_50%]",
            "filter blur-[40px]",
            "after:content-[''] after:absolute after:inset-0",
            "after:[background-image:var(--dark-gradient),var(--aurora)]",
            "after:[background-size:200%,_100%]",
            "after:animate-[aurora_60s_linear_infinite]",
            "after:[background-attachment:fixed]",
            "after:mix-blend-screen",
            showRadialGradient && "[mask-image:radial-gradient(ellipse_at_50%_50%,black_30%,transparent_80%)]"
          )}
        />
      </div>
      {children}
    </div>
  );
};
