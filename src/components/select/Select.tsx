import * as React from "react";
import { cn } from "@/lib/utils";
import { useSelectKeyboard } from "@/hooks/useSelectKeyboard";
// import { useFocusTrap } from "@/hooks/useFocusTrap";

// WIP: Implement Select component, improve semantics, and accessibility,  add keyboard navigation, improve styling, separate components and context
interface SelectProps {
  value: string | number;
  onValueChange: (value: string | number) => void;
  children: React.ReactNode;
}

type SelectItemProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string | number;
  "data-focused"?: boolean;
};

interface SelectContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string | number;
  onValueChange: (value: string | number) => void;
}

const SelectContext = React.createContext<SelectContextType | null>(null);

export function SelectRoot({ children, value, onValueChange }: SelectProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <SelectContext.Provider value={{ open, setOpen, value, onValueChange }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    placeholder?: string;
    icon?: React.ReactNode;
  }
>(({ className, children, placeholder, icon, ...props }, ref) => {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("SelectTrigger must be used within SelectRoot");

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => context.setOpen(!context.open)}
      className={cn(
        "flex w-full items-center justify-between rounded-md bg-transparent",
        className,
      )}
      {...props}
    >
      <p className="flex items-center gap-2 text-body-m">
        {icon && <span className="flex items-center">{icon}</span>}
        {context.value || placeholder}
      </p>
    </button>
  );
});

SelectTrigger.displayName = "SelectTrigger";

export const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title?: string;
  }
>(({ className, children, title, ...props }, ref) => {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("SelectContent must be used within SelectRoot");

  const options = React.Children.toArray(children)
    .filter((child): child is React.ReactElement => React.isValidElement(child))
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

  if (!context.open) return null;

  return (
    <div
      ref={ref}
      role="listbox"
      aria-labelledby="select-label"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          context.setOpen(false);
        }
      }}
      className={cn(
        "absolute top-full z-50 mt-1 min-w-max rounded-lg border border-neutral-2 bg-neutral-3 py-2 shadow-lg",
        className,
      )}
      {...props}
    >
      <div ref={listRef}>
        {title && (
          <p className="px-4 text-body-xl font-bold text-neutral-2">{title}</p>
        )}
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return null;
          return React.cloneElement(child, {
            ...child.props,
            "aria-selected": child.props.value === context.value,
            "data-focused": index === focusedIndex,
            tabIndex: 0,
          });
        })}
      </div>
    </div>
  );
});

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, value, ...props }, ref) => {
    const context = React.useContext(SelectContext);
    if (!context) throw new Error("SelectItem must be used within SelectRoot");

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={context.value === value}
        className={cn(
          "flex cursor-pointer items-center gap-2 px-4 py-1.5 text-body-m font-normal hover:bg-neutral-4",
          context.value === value && "bg-neutral-4",
          props["data-focused"] && "bg-neutral-4",
          className,
        )}
        onClick={() => {
          context.onValueChange(value);
          context.setOpen(false);
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

SelectItem.displayName = "SelectItem";
