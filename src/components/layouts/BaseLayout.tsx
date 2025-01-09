import { useState } from "react";
import { Outlet } from "react-router";
import MasterSidebar from "@components/ui/MasterSidebar";
import { cn } from "@lib/utils";
import Plus from "@icons/white/Plus.svg?react";

import type { ViewType } from "@types";
import { Button } from "@components/common/Button";

export default function BaseLayout() {
  const [viewType, setViewType] = useState<ViewType>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOnClose = () => {
    setIsSidebarOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-neutral-5">
      <div className="grid h-screen grid-cols-1 p-4 sm:gap-8 md:grid-cols-[auto_1fr] md:p-8">
        <MasterSidebar isOpen={isSidebarOpen} onClose={handleOnClose} />
        <div className="flex flex-1 flex-col overflow-hidden">
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
                setSearchQuery,
              }}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
