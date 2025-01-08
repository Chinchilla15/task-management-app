import { createContext, useContext } from "react";
import type { SelectContextType } from "@types";

export const openSelectsRef = new Set<string>();

export const SelectContext = createContext<SelectContextType | null>(null);

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within a Select provider");
  }
  return context;
};
