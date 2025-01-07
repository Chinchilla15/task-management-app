import MenuBars from "@icons/MenuBars.svg?react";
import type { NavItem } from "@types";
import Grid from "@icons/Grid.svg?react";
import AvatarIcon from "@icons/white/AvatarIcon.svg?react";
import { paths } from "./paths";

export const navItems: NavItem[] = [
  {
    id: "dashboard",
    label: "DASHBOARD",
    icon: Grid,
    path: paths.home,
  },
  {
    id: "tasks",
    label: "MY TASK",
    icon: MenuBars,
    path: paths.tasks.my,
  },
  {
    id: "profile",
    label: "PROFILE",
    icon: AvatarIcon,
    path: paths.profile,
  },
];
