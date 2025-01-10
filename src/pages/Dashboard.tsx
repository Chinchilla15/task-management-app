import { Task } from "@/components/tasks/TaskRoot";
import { useLayout } from "@/hooks/useLayout";
import { TaskViewControls } from "@/components/common/TaskViewControls";
import { useFilterTask } from "@/hooks/useFilterTask";

export default function Dashboard() {
  const { setViewType, viewType } = useLayout();
  const { tasks, loading } = useFilterTask();

  return (
    <>
      <TaskViewControls viewType={viewType} onViewChange={setViewType} />
      <Task.Provider viewType={viewType}>
        {viewType === "list" ? (
          <Task.List tasks={tasks} loading={loading} />
        ) : (
          <Task.Grid tasks={tasks} loading={loading} />
        )}
      </Task.Provider>
    </>
  );
}
