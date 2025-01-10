import { Task } from "@/components/tasks/TaskRoot";
import { useLayout } from "@/hooks/useLayout";
import { useFilterTask } from "@/hooks/useFilterTask";

export default function Dashboard() {
  const { viewType } = useLayout();
  const { tasks, loading } = useFilterTask();

  return (
    <>
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
