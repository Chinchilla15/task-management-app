import { TaskContext } from "@/context/TaskContext";
import type { TaskProviderProps } from "@types";

export default function TaskProvider({
  viewType,
  children,
}: TaskProviderProps) {
  return (
    <TaskContext.Provider value={{ viewType, isListView: viewType === "list" }}>
      {children}
    </TaskContext.Provider>
  );
}
