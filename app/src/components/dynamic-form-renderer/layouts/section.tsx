import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function Section({ className, children, ...props }: ComponentProps<'section'>) {
  return (
    <section className={cn('p-4 border', className)} {...props}>
      {children}
    </section>
  )
}