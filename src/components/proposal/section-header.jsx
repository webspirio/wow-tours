import { cn } from "@/lib/utils";

export function SectionHeader({ number, title, subtitle, className }) {
  return (
    <div className={cn("mb-10 lg:mb-14", className)}>
      <div className="flex items-baseline gap-4 lg:gap-6">
        {number && (
          <span
            aria-hidden
            className="font-display text-5xl font-light tracking-tight text-mute-soft tabular-nums lg:text-7xl"
          >
            {number}
          </span>
        )}
        <h2 className="font-display text-2xl font-semibold tracking-tight text-balance lg:text-4xl">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-3 max-w-3xl text-base text-mute lg:ml-[5.5rem] lg:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
