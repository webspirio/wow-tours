import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        yellow: "bg-yellow text-ink",
        violet: "bg-violet text-white",
        pink: "bg-pink text-white",
        outline: "border border-border bg-paper text-ink",
        success: "bg-success/15 text-success",
      },
    },
    defaultVariants: { variant: "yellow" },
  }
)

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
