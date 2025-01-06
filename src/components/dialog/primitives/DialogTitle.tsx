import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const DialogTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));

DialogTitle.displayName = "DialogTitle";
