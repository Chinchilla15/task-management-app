import * as React from "react";

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

export interface TaskColumnProps {
  title: string;
  count: string;
  children: React.ReactNode;
}

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
}

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
