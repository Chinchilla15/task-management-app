import MasterSidebar from "@components/ui/MasterSidebar";
import Header from "@components/ui/Header";
import { TaskViewControls } from "@components/common/TaskViewControls";
import { useState } from "react";
import { Task } from "../ui/tasks/TaskRoot";
import type { ViewType } from "@types";
import { useGetTasksQuery } from "@graphql/graphql";

export default function DashBoardLayout() {
  const [viewType, setViewType] = useState<ViewType>("grid");

  const { data } = useGetTasksQuery({ variables: { input: {} } });

  return (
    <div className="min-h-screen bg-neutral-5">
      <div className="grid h-screen grid-cols-[auto_1fr] gap-8 p-8">
        <MasterSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <TaskViewControls viewType={viewType} onViewChange={setViewType} />
          <main className="hide-scrollbar h-[calc(100vh-200px)] flex-1 overflow-y-auto">
            <Task.Provider viewType={viewType}>
              {viewType === "list" ? (
                <Task.List tasks={data?.tasks || []} />
              ) : (
                <Task.Grid tasks={data?.tasks || []} />
              )}
            </Task.Provider>
          </main>
        </div>
      </div>
    </div>
  );
}
