import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import MasterSidebar from "@components/ui/MasterSidebar";
import { cn } from "@lib/utils";
import Plus from "@icons/white/Plus.svg?react";
import type { ViewType } from "@types";
import { Button } from "@components/common/Button";
import Header from "../ui/Header";
import { paths } from "@/config/paths";
import { useDebounce } from "@/hooks/useDebounce";
import { TaskViewControls } from "../common/TaskViewControls";

export default function BaseLayout() {
  const [viewType, setViewType] = useState<ViewType>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const debouncedSetSearchQuery = useDebounce((query: string) => {
    setSearchQuery(query);
  }, 300);

  const handleOnClose = () => {
    setIsSidebarOpen(false);
    setSearchQuery("");
  };

  const shouldShowHeader = ![paths.profile].includes(
    location.pathname as "/profile",
  );

  return (
    <div className="min-h-screen bg-neutral-5">
      <div className="grid h-screen grid-cols-1 p-4 sm:gap-8 md:grid-cols-[auto_1fr] md:p-8">
        <MasterSidebar isOpen={isSidebarOpen} onClose={handleOnClose} />
        <div className="flex flex-1 flex-col overflow-hidden">
          {shouldShowHeader && (
            <>
              <Header
                searchQuery={searchQuery}
                onSearch={debouncedSetSearchQuery}
              />
              <TaskViewControls
                viewType={viewType}
                onViewChange={setViewType}
              />
            </>
          )}
          <Button
            variant="primary"
            className={cn(
              "fixed bottom-4 left-4 z-50 transform rounded-full p-4 transition-transform duration-300 md:hidden",
              {
                "translate-x-64": isSidebarOpen,
                "translate-x-0": !isSidebarOpen,
              },
            )}
            onClick={(e) => {
              e.stopPropagation();
              setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            <span className="sr-only">Toggle sidebar</span>
            <Plus />
          </Button>
          <main className="hide-scrollbar h-[calc(100vh-200px)] flex-1 overflow-y-auto">
            <Outlet
              context={{
                viewType,
                searchQuery,
                setViewType,
                setSearchQuery: debouncedSetSearchQuery,
              }}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
