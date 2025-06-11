import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function Row({ className, children, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('flex items-start py-2 mt-2', className)} {...props}>
      {children}
    </div>
  )
}