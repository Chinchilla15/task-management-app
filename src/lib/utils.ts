import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TaskProps } from "@types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupTasksByStatus(
  tasks: TaskProps[],
): Record<string, TaskProps[]> {
  return tasks.reduce<Record<string, TaskProps[]>>((acc, task) => {
    acc[task.status] = acc[task.status] || [];
    acc[task.status].push(task);
    return acc;
  }, {});
}
