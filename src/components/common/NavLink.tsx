import { cn } from "@/lib/utils";
import type { NavLinkProps } from "@types";

export default function SidebarNavLink({
  item,
  isSelected,
  onSelect,
}: NavLinkProps) {
  const Icon = item.icon;

  return (
    <li className="relative py-4">
      <button
        className={cn(
          "flex w-full items-center justify-start gap-4 transition-colors duration-200",
          "text-neutral-2 hover:text-primary-4",
          isSelected && "text-primary-4",
        )}
        onClick={() => onSelect(item.id)}
        aria-current={isSelected ? "page" : undefined}
      >
        <Icon className="h-[18px] w-[18px]" />
        <p className="text-body-m font-semibold">{item.label}</p>
      </button>
      {isSelected && (
        <>
          <div className="bg-primary-4 absolute right-0 top-0 h-full w-1" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-red-500 opacity-10" />
        </>
      )}
    </li>
  );
}
