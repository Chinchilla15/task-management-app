import { cn } from "@/lib/utils";
import { useSelectContext } from "../context/SelectContext";
import { SelectItemProps } from "@types";
import { forwardRef } from "react";

export const SelectItem = forwardRef<HTMLLIElement, SelectItemProps>(
  ({ className, children, value, ...props }, ref) => {
    const context = useSelectContext();
    const isSelected = context.value === value;

    return (
      <li
        ref={ref}
        role="option"
        aria-selected={isSelected}
        className={cn(
          "flex cursor-pointer items-center gap-2 px-4 py-1.5 text-body-m font-normal outline-none",
          "hover:bg-neutral-4 focus:bg-neutral-4",
          isSelected && "bg-neutral-4",
          (props as { "data-focused"?: boolean })["data-focused"] &&
            "bg-neutral-4",
          className,
        )}
        onClick={(e) => {
          e.stopPropagation();
          context.onValueChange(value);
          context.setOpen(false);
        }}
        {...props}
      >
        {children}
      </li>
    );
  },
);

SelectItem.displayName = "SelectItem";
