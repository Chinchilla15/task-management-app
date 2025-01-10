import { Task } from "@/components/tasks/TaskRoot";
import { useLayout } from "@/hooks/useLayout";
import { useFilterTask } from "@/hooks/useFilterTask";

export default function Dashboard() {
  const { viewType } = useLayout();
  const { tasks, loading, error } = useFilterTask();

  return (
    <>
      <Task.Provider viewType={viewType}>
        {viewType === "list" ? (
          <Task.List tasks={tasks} loading={loading} error={error} />
        ) : (
          <Task.Grid tasks={tasks} loading={loading} error={error} />
        )}
      </Task.Provider>
    </>
  );
}
