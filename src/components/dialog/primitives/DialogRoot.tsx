import { DialogContext } from "../context/DialogContext";
import type { DialogRootProps } from "@types";

export const DialogRoot = ({
  children,
  open,
  onOpenChange,
}: DialogRootProps) => {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};
