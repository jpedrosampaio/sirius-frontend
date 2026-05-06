import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-[#2a2a2a] px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider transition-colors duration-150",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#00c896] text-[#0d0d0d]",
        secondary:
          "border-transparent bg-[#1a1a1a] text-[#888888]",
        destructive:
          "border-transparent bg-[#ff4d4f] text-white",
        outline: "text-[#888888] border-[#2a2a2a]",
        success: "border-transparent bg-[#00c896] text-[#0d0d0d]",
        warning: "border-transparent bg-[#f5c542] text-[#0d0d0d]",
        info: "border-transparent bg-[#3b82f6] text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />);
}

export { Badge, badgeVariants }