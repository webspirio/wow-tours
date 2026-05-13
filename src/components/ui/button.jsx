import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-yellow text-ink shadow-[var(--shadow-yellow)] hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(251_191_36_/_0.5)]",
        violet: "bg-violet text-white shadow-[var(--shadow-violet)] hover:translate-y-[-2px]",
        ghost: "bg-transparent text-ink hover:bg-ink/5",
        outline: "border border-border bg-paper text-ink hover:bg-ink/5",
        gradient: "bg-gradient-to-r from-violet to-pink text-white hover:opacity-90",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = "Button"

export { Button, buttonVariants }
