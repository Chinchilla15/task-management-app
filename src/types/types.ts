import * as React from "react";
import type { PointEstimate, Status, Task, TaskTag } from "@graphql/graphql";
import { tagStyles } from "@/config/tagVariants";
import { COLUMN_WIDTHS } from "@/config/tableStyles";
import { UseFormReturn } from "react-hook-form";
import { TaskFormValues } from "./formSchema";

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
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

export type AvatarFallbackProps = React.HTMLAttributes<HTMLDivElement>;

// Table Types

export type TableContextType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  status: string;
  columnWidths: typeof COLUMN_WIDTHS;
};

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  status: string;
}

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

// Task Types
export type TaskStatus = "Working" | "In Progress" | "Completed";

export type ViewType = "list" | "grid" | undefined;

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
  count?: string;
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

export type TaskListProps = TaskContainerProps & {
  loading?: boolean;
  searchQuery?: string;
  error?: Error;
};
export type TaskGridProps = TaskContainerProps & {
  loading?: boolean;
  searchQuery?: string;
  error?: Error;
};
export type TaskTableProps = TaskContainerProps;

export interface TaskRowProps {
  index: number;
  task: Task;
  onAction?: (action: TaskAction) => void;
}
export interface TaskCardProps {
  id: string;
  task: Task;
  onAction?: (action: TaskAction) => void;
  index: number;
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

// Input Types
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | string) => void;
  icon?: boolean;
  error?: string;
  debounceDelay?: number;
}

// Form Types
export interface TaskFormData {
  status: Status;
  name: string;
  pointEstimate: PointEstimate;
  assignee: string | null;
  tags: TaskTag;
  dueDate: string;
}

export interface TaskFormFieldProps<T> {
  tagVariant?: TagVariant;
  icon?: React.ReactNode;
  value: T;
  onValueChange: (value: T) => void;
  placeholder: string;
  title?: string;
  contentClassName?: string;
  options?: Array<{ value: string; label: string; icon?: React.ReactNode }>;
  customContent?: React.ReactNode;
  renderItem?: (option: {
    value: string;
    label: string;
    avatar?: string;
    id?: string;
    fullName?: string;
  }) => React.ReactNode;
}

export interface CustomDatePickerProps {
  value?: string | Date;
  onChange: (date: Date | null) => void;
}

// Dialog Types

// Dialog Primitive Types

export interface DialogContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface DialogRootProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export interface DialogTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// Form Fields
export interface DialogFormFieldsProps {
  form: UseFormReturn<TaskFormValues>;
  pointEstimateOptions: Array<{ value: string; label: string }>;
  assigneeOptions: Array<{ value: string; label: string; avatar?: string }>;
  tagOptions: Array<{ value: string; label: string }>;
}

// Dialog Input
export interface DialogInputProps {
  form: UseFormReturn<TaskFormValues>;
}

// Dialog Footer
export interface TaskDialogFooterProps {
  isSubmitting: boolean;
  onCancel: () => void;
  submitLabel?: string;
}

// Dialog Form Config

export interface TaskFormConfig {
  defaultValues?: {
    name?: string;
    // id: string;
    pointEstimate?: PointEstimate;
    assigneeId?: string | null;
    status?: Status;
    dueDate?: Date;
    tags?: TaskTag[];
  };
}

//Delete Dialog

export interface DeleteDialogProps {
  taskId: string;
  showDeleteDialog: boolean;
  setShowDeleteDialog: (show: boolean) => void;
}

//Edit Dialog

export interface EditTaskDialogProps {
  task: Task;
  open: boolean;
  setOpen: (open: boolean) => void;
}

//Base Dialog

export interface TaskDialogBaseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TaskFormValues) => Promise<void>;
  defaultValues?: Partial<Task>;
  submitLabel?: string;
}

// Select Types

//Dialog Primitive Types
export interface SelectProps {
  value: string | number;
  onValueChange: (value: string | number) => void;
  children: React.ReactNode;
  id?: string;
  name?: string;
  disabled?: boolean;
}

// Select Context
export interface SelectContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string | number;
  onValueChange: (value: string | number) => void;
  listId: string;
  triggerId: string;
  disabled?: boolean;
}

// Select Trigger

export type SelectTriggerProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    placeholder?: string;
    icon?: React.ReactNode;
  };

// Select Content
export type SelectContentProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
};

// Select Item
export type SelectItemProps = React.LiHTMLAttributes<HTMLLIElement> & {
  value: string | number;
};
