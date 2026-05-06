import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-[18px] w-[18px] shrink-0 rounded-full border-2 border-[#333333] bg-transparent transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c896] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#00c896] data-[state=checked]:border-none data-[state=checked]:text-[#0d0d0d]",
      className
    )}
    {...props}>
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }