import { createContext, useContext } from "react";
import type { DialogContextType } from "@types";

export const DialogContext = createContext<DialogContextType | null>(null);

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within a Dialog provider");
  }
  return context;
};
