import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
));

DialogDescription.displayName = "DialogDescription";
