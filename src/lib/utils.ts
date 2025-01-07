import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Task, TaskTag } from "@graphql/graphql";
import { PointEstimate, PointEstimateToNumber } from "@graphql/graphql";
import { TagName, TagVariant } from "@types";
import { format } from "date-fns";

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

export const getPointEstimateDisplay = (point: PointEstimate): string => {
  return `${getPointEstimateNumber(point)} Points`;
};

export const getPointEstimateFromNumber = (number: number): PointEstimate => {
  switch (number) {
    case 8:
      return PointEstimate.Eight;
    case 4:
      return PointEstimate.Four;
    case 2:
      return PointEstimate.Two;
    case 1:
      return PointEstimate.One;
    default:
      return PointEstimate.Zero;
  }
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

export const dateUtils = {
  toDisplayFormat: (date: Date | string | null) => {
    if (!date) return "";
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return formatDate(format(dateObj, "MMM d, yyyy"));
  },

  toAPIFormat: (date: Date | string | null): string => {
    if (!date) return new Date().toISOString().split("T")[0];
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toISOString().split("T")[0];
  },
};

export const getTagDisplay = (tag: TaskTag): string => {
  switch (tag) {
    case TaskTag.Android:
      return "ANDROID";
    case TaskTag.Ios:
      return "IOS";
    case TaskTag.NodeJs:
      return "NODE_JS";
    case TaskTag.Rails:
      return "RAILS";
    case TaskTag.React:
      return "REACT";
    default:
      return tag;
  }
};

export const TAG_VARIANT_MAP: Record<TagName, TagVariant> = {
  IOS: "neutral",
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

export const getRandomNumber = () => Math.floor(Math.random() * 10) + 1;

export const getTimeOfDayGreeting = () => {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good afternoon";
  } else if (hour >= 17 && hour < 22) {
    return "Good evening";
  } else {
    return "Good night";
  }
};
