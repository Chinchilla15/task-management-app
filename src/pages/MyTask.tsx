import { Task } from "@/components/tasks/TaskRoot";
import { useLayout } from "@/hooks/useLayout";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useFilterTask } from "@/hooks/useFilterTask";

export default function MyTask() {
  const { viewType } = useLayout();
  const { currentUser } = useUserProfile();
  const { tasks, loading, error } = useFilterTask(currentUser?.id);

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
