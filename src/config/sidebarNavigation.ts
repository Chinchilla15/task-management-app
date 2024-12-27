import MenuBars from "@icons/MenuBars.svg?react";
import type { NavItem } from "@types";
import Grid from "@icons/Grid.svg?react";

export const navItems: NavItem[] = [
  { id: "dashboard", label: "DASHBOARD", icon: Grid },
  { id: "tasks", label: "MY TASK", icon: MenuBars },
];
