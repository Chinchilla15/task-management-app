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
      return () => {
        document.body.style.overflow = "";
      };
    }, [open]);

    if (!open) return null;

    return createPortal(
      <div className="fixed inset-0 z-50" role="presentation">
        <div
          className={cn("fixed inset-0 backdrop-blur-sm")}
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
            "fixed left-1/2 top-1/2 z-50 flex w-11/12 max-w-xl translate-x-[-50%] translate-y-[-50%] gap-4",
            "rounded-lg bg-neutral-3 p-4 shadow-lg",
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
