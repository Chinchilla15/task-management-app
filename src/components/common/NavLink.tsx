import { cn } from "@/lib/utils";
import type { NavLinkProps } from "@types";
import { NavLink, useLocation } from "react-router";

export default function SidebarNavLink({ item, isSelected }: NavLinkProps) {
  const location = useLocation();
  const Icon = item.icon;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (item.path === location.pathname) {
      e.preventDefault();
      return;
    }
  };

  return (
    <li className="relative py-4">
      <NavLink
        to={item.path}
        onClick={handleClick}
        className={({ isActive }) =>
          cn(
            "flex w-full items-center justify-start gap-4 transition-colors duration-200",
            "text-neutral-2 hover:text-primary-4",
            (isActive || isSelected) && "text-primary-4",
          )
        }
        aria-current={isSelected ? "page" : undefined}
      >
        <Icon className="h-[18px] w-[18px]" />
        <p className="text-body-m font-semibold">{item.label}</p>
      </NavLink>
      {isSelected && (
        <>
          <div className="absolute right-0 top-0 h-full w-1 bg-primary-4" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-red-500 opacity-10" />
        </>
      )}
    </li>
  );
}
