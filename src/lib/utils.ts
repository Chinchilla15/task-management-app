import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Task } from "@graphql/graphql";
import { PointEstimate, PointEstimateToNumber } from "@graphql/graphql";
import { TagName, TagVariant } from "@types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupTasksByStatus(tasks: Task[]): Record<string, Task[]> {
  return tasks.reduce<Record<string, Task[]>>((acc, task) => {
    acc[task.status] = acc[task.status] || [];
    acc[task.status].push(task);
    return acc;
  }, {});
}

export const getPointEstimateNumber = (point: PointEstimate): number => {
  const mapping: PointEstimateToNumber = {
    [PointEstimate.Eight]: 8,
    [PointEstimate.Four]: 4,
    [PointEstimate.One]: 1,
    [PointEstimate.Two]: 2,
    [PointEstimate.Zero]: 0,
  };
  return mapping[point];
};

export const formatDate = (date: string): string => {
  const inputDate = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (inputDate.toDateString() === today.toDateString()) {
    return "Today";
  }
  if (inputDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }
  if (inputDate.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  }

  return inputDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const TAG_VARIANT_MAP: Record<TagName, TagVariant> = {
  IOS: "success",
  ANDROID: "warning",
  RAILS: "error",
  REACT: "info",
  NODE_JS: "success",
};

export const getTagVariant = (tag: string): TagVariant | undefined => {
  return TAG_VARIANT_MAP[tag as TagName];
};

export const formatStatus = (status: string) => {
  return status
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
