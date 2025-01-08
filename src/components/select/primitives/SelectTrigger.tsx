import { cn } from "@/lib/utils";
import { useSelectContext } from "../context/SelectContext";
import { SelectTriggerProps } from "@types";
import { forwardRef } from "react";

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, placeholder, icon, ...props }, ref) => {
    const context = useSelectContext();

    return (
      <button
        ref={ref}
        type="button"
        id={context.triggerId}
        disabled={context.disabled}
        aria-haspopup="listbox"
        aria-expanded={context.open}
        aria-controls={context.listId}
        onClick={(e) => {
          e.stopPropagation();
          context.setOpen(!context.open);
        }}
        className={cn(
          "flex w-full items-center justify-between rounded-md bg-transparent",
          context.disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        {...props}
      >
        <span className="flex items-center gap-2 text-body-m">
          {icon && (
            <span className="flex items-center" aria-hidden="true">
              {icon}
            </span>
          )}
          {context.value || placeholder}
        </span>
      </button>
    );
  },
);

SelectTrigger.displayName = "SelectTrigger";
