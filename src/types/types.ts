import * as React from "react";
import type { Task } from "@graphql/graphql";
import { tagStyles } from "@/config/tagVariants";

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

export interface NavLinkProps {
  item: NavItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

// Button Types
export type ButtonVariant =
  | "primary"
  | "ghost"
  | "neutral-light"
  | "neutral-dark"
  | "transparent-white"
  | "transparent-neutral"
  | "bordered";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  icon?: React.ElementType;
  noAnimation?: boolean;
}

// Avatar Types
export type AvatarSize = "32" | "40" | "48";

export interface AvatarContextValue {
  size: AvatarSize;
  imageLoaded: boolean;
  setImageLoaded: (loaded: boolean) => void;
}

export type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: AvatarSize;
};

export interface AvatarImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  onLoadingStatusChange?: (status: "loading" | "loaded" | "error") => void;
}

// Task Types
export type TaskStatus = "Working" | "In Progress" | "Completed";

export type ViewType = "list" | "grid";

export type TaskAction =
  | { type: "view"; id: string }
  | { type: "edit"; id: string }
  | { type: "delete"; id: string };

export interface BaseTaskProps {
  id: string;
  title: string;
  points: number;
  date: string;
  assignee: string;
  status: TaskStatus;
}

export interface TaskProps extends BaseTaskProps {
  attachments?: number;
  comments?: number;
}

// Task Components Props
export interface TaskColumnProps {
  title: string;
  count: string;
  children: React.ReactNode;
}

export interface TaskViewControlsProps {
  viewType: ViewType;
  onViewChange: (viewType: ViewType) => void;
}

export interface TaskContextValue {
  viewType: ViewType;
  isListView: boolean;
}

export interface TaskProviderProps {
  viewType: ViewType;
  children: React.ReactNode;
}

export interface TaskContainerProps {
  tasks: Task[];
  onTaskAction?: (action: TaskAction) => void;
}

export type TaskListProps = TaskContainerProps;
export type TaskGridProps = TaskContainerProps;
export type TaskTableProps = TaskContainerProps;

export interface TaskRowProps {
  task: Task;
  onAction?: (action: TaskAction) => void;
}
export interface TaskCardProps {
  id: string;
  task: Task;
  onAction?: (action: TaskAction) => void;
}

// Image Types
export interface UnsplashPhoto {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
}

// Tag Types
export type TagName = "IOS" | "ANDROID" | "RAILS" | "REACT" | "NODE_JS";
export type TagVariant = keyof typeof tagStyles.variants;

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  icon?: React.ElementType;
}
