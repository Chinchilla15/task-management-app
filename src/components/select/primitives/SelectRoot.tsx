import { SelectContext, openSelectsRef } from "../context/SelectContext";
import { SelectProps } from "@types";
import { useEffect, useState } from "react";

export function SelectRoot({
  children,
  value,
  onValueChange,
  id = crypto.randomUUID(),
  disabled = false,
  name,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const listId = `select-list-${id}`;
  const triggerId = `select-trigger-${id}`;

  // Handle click outside
  useEffect(() => {
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

  useEffect(() => {
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
