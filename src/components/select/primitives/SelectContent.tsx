import { cn } from "@/lib/utils";
import { useSelectKeyboard } from "@/hooks/useSelectKeyboard";
import { useSelectContext } from "../context/SelectContext";
import { SelectContentProps } from "@types";
import {
  Children,
  forwardRef,
  isValidElement,
  ReactElement,
  KeyboardEvent,
  cloneElement,
} from "react";

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, title, ...props }, ref) => {
    const context = useSelectContext();

    const options = Children.toArray(children)
      .filter((child): child is ReactElement => isValidElement(child))
      .map((child) => ({ value: child.props.value }));

    const { focusedIndex, listRef } = useSelectKeyboard(
      context.open,
      options,
      context.value,
      (value) => {
        context.onValueChange(value);
        context.setOpen(false);
      },
      () => context.setOpen(false),
    );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        context.setOpen(false);
      }
    };

    if (!context.open) return null;

    return (
      <div
        ref={ref}
        id={context.listId}
        role="presentation"
        className={cn(
          "absolute top-full z-50 mt-1 min-w-max rounded-lg border border-neutral-2 bg-neutral-3 py-2 shadow-lg",
          className,
        )}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {title && (
          <div
            className="px-4 text-body-xl font-bold text-neutral-2"
            id={`${context.listId}-title`}
          >
            {title}
          </div>
        )}
        <ul
          ref={listRef}
          role="listbox"
          aria-labelledby={title ? `${context.listId}-title` : undefined}
          tabIndex={-1}
          className="outline-none"
        >
          {Children.map(children, (child, index) => {
            if (!isValidElement(child)) return null;
            return cloneElement(child, {
              ...child.props,
              "aria-selected": child.props.value === context.value,
              "data-focused": index === focusedIndex,
              tabIndex: -1,
            });
          })}
        </ul>
      </div>
    );
  },
);

SelectContent.displayName = "SelectContent";
