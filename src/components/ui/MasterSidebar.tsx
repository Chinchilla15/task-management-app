import Logo from "@icons/Logo.svg?react";
import SidebarNavLink from "@components/common/NavLink";
import { navItems } from "@/config/sidebarNavigation";
import { useLocation } from "react-router";

export default function MasterSidebar() {
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
      className="w-64 rounded-3xl bg-neutral-4"
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
                onSelect={() => {}}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
