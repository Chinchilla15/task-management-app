import * as React from "react";
import { cn } from "@/lib/utils";
import { useSelectKeyboard } from "@/hooks/useSelectKeyboard";

interface SelectProps {
  value: string | number;
  onValueChange: (value: string | number) => void;
  children: React.ReactNode;
  id?: string;
  name?: string;
  disabled?: boolean;
}

type SelectItemProps = React.HTMLAttributes<HTMLLIElement> & {
  value: string | number;
  "data-focused"?: boolean;
};

interface SelectContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string | number;
  onValueChange: (value: string | number) => void;
  listId: string;
  triggerId: string;
  disabled?: boolean;
}

const SelectContext = React.createContext<SelectContextType | null>(null);

// Track open selects globally to handle click-outside and multiple selects
const openSelectsRef = new Set<string>();

export function SelectRoot({
  children,
  value,
  onValueChange,
  id = crypto.randomUUID(),
  disabled = false,
  name,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const listId = `select-list-${id}`;
  const triggerId = `select-trigger-${id}`;

  // Handle click outside
  React.useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`#${listId}`) && !target.closest(`#${triggerId}`)) {
        setOpen(false);
      }
    };

    // Close other open selects
    openSelectsRef.forEach((selectId) => {
      if (selectId !== id) {
        const event = new CustomEvent("closeSelect", {
          detail: { id: selectId },
        });
        window.dispatchEvent(event);
      }
    });
    openSelectsRef.add(id);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      openSelectsRef.delete(id);
    };
  }, [open, id, listId, triggerId]);

  React.useEffect(() => {
    const handleCloseSelect = (e: CustomEvent<{ id: string }>) => {
      if (e.detail.id === id) {
        setOpen(false);
      }
    };

    window.addEventListener("closeSelect" as any, handleCloseSelect as any);
    return () =>
      window.removeEventListener(
        "closeSelect" as any,
        handleCloseSelect as any,
      );
  }, [id]);

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        value,
        onValueChange,
        listId,
        triggerId,
        disabled,
      }}
    >
      <div className="relative">
        {children}
        {name && <input type="hidden" name={name} value={value} />}
      </div>
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

  // Handle escape key at this level to prevent propagation
  const handleKeyDown = (e: React.KeyboardEvent) => {
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
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return null;
          return React.cloneElement(child, {
            ...child.props,
            "aria-selected": child.props.value === context.value,
            "data-focused": index === focusedIndex,
            tabIndex: -1,
          });
        })}
      </ul>
    </div>
  );
});

SelectContent.displayName = "SelectContent";

export const SelectItem = React.forwardRef<HTMLLIElement, SelectItemProps>(
  ({ className, children, value, ...props }, ref) => {
    const context = React.useContext(SelectContext);
    if (!context) throw new Error("SelectItem must be used within SelectRoot");

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
          props["data-focused"] && "bg-neutral-4",
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
