import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-lg border border-[#2a2a2a] bg-[#111111] px-3 py-1 text-sm text-[#f0f0f0] transition-colors placeholder:text-[#555555] focus:outline-none focus:border-[#00c896] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props} />
  );
})
Input.displayName = "Input"

export { Input }