import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c896] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#00c896] text-[#0d0d0d] hover:brightness-110",
        destructive:
          "bg-[#ff4d4f] text-white hover:brightness-110",
        outline:
          "border border-[#2a2a2a] bg-transparent text-[#888888] hover:border-[#444444] hover:text-[#f0f0f0]",
        secondary:
          "bg-[#222222] text-[#f0f0f0] hover:bg-[#2a2a2a]",
        ghost: "text-[#888888] hover:bg-[#1a1a1a] hover:text-[#f0f0f0]",
        link: "text-[#00c896] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }