import { forwardRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useDialogContext } from "../context/DialogContext";
import type { DialogContentProps } from "@types";

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className, ...props }, _ref) => {
    const { open, onOpenChange } = useDialogContext();
    const focusTrapRef = useFocusTrap(open, () => onOpenChange(false));
    const previousFocus = useRef<HTMLElement | null>(null);

    const handleBackdropClick = () => {
      onOpenChange(false);
    };

    useEffect(() => {
      if (open) {
        previousFocus.current = document.activeElement as HTMLElement;
        document.body.style.overflow = "hidden";
      } else if (previousFocus.current) {
        previousFocus.current.focus();
        document.body.style.overflow = "";
      }
    }, [open]);

    if (!open) return null;

    return createPortal(
      <div className="fixed inset-0 z-50" role="presentation">
        <div
          className={cn(
            "fixed inset-0 backdrop-blur-sm",
            "animate-in fade-in-0",
          )}
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
        <div
          ref={focusTrapRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
          className={cn(
            "fixed left-[50%] top-[50%] z-50 flex w-full max-w-xl translate-x-[-50%] translate-y-[-50%] gap-4",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] rounded-lg bg-neutral-3 p-4 shadow-lg duration-200",
            className,
          )}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {children}
        </div>
      </div>,
      document.body,
    );
  },
);

DialogContent.displayName = "DialogContent";
