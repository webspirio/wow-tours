import { cn } from "@/lib/utils";

export function SectionDivider({ title, className }) {
  return (
    <div className={cn("flex items-center justify-center gap-4 my-2", className)}>
      <span className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-pink/40" />
      <span className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-pink/10 text-pink text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
        <span className="text-pink">⋆</span>
        {title}
        <span className="text-pink">⋆</span>
      </span>
      <span className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-pink/40" />
    </div>
  );
}
