import { createContext, useContext } from "react";
import type { TaskContextValue } from "@types";

export const TaskContext = createContext<TaskContextValue | undefined>(
  undefined,
);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
