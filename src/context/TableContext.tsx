import { useContext, createContext } from "react";
import type { TableContextType } from "@types";

export const TableContext = createContext<TableContextType | undefined>(
  undefined,
);

export function useTableContext() {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Table components must be used within Table provider");
  }
  return context;
}
