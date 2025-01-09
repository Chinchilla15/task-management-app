import Logo from "@icons/Logo.svg?react";
import SidebarNavLink from "@components/common/NavLink";
import { navItems } from "@/config/sidebarNavigation";
import { useLocation } from "react-router";
import { cn } from "@lib/utils";

export default function MasterSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const location = useLocation();

  const getSelectedItem = (pathname: string) => {
    return (
      navItems.find((item) => item.path === pathname)?.id ||
      navItems.find((item) => pathname.startsWith(item.path))?.id ||
      "dashboard"
    );
  };

  const selectedId = getSelectedItem(location.pathname);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform rounded-3xl bg-neutral-4 transition-transform duration-300 md:relative md:translate-x-0",
        {
          "translate-x-0": isOpen,
          "-translate-x-full": !isOpen,
        },
      )}
      aria-label="Main navigation"
    >
      <div className="flex h-full flex-col py-3 pl-4">
        <div className="mb-8 self-center">
          <Logo width="40px" height="40px" aria-label="Ravn logo" />
        </div>
        <nav className="py space-y-2">
          <ul className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <SidebarNavLink
                key={item.id}
                item={item}
                isSelected={selectedId === item.id}
                onSelect={() => onClose()}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
