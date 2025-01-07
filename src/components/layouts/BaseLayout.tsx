import MasterSidebar from "@components/ui/MasterSidebar";
import Header from "@components/ui/Header";
import { useState } from "react";
import type { ViewType } from "@types";
import { Outlet } from "react-router";

export default function BaseLayout() {
  const [viewType, setViewType] = useState<ViewType>("grid");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-neutral-5">
      <div className="grid h-screen grid-cols-[auto_1fr] gap-8 p-8">
        <MasterSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header onSearch={setSearchQuery} />
          <main className="hide-scrollbar h-[calc(100vh-200px)] flex-1 overflow-y-auto">
            <Outlet context={{ viewType, searchQuery, setViewType }} />
          </main>
        </div>
      </div>
    </div>
  );
}
