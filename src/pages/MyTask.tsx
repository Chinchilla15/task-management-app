import { Task } from "@/components/tasks/TaskRoot";
import { useLayout } from "@/hooks/useLayout";
import { TaskViewControls } from "@/components/common/TaskViewControls";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useFilterTask } from "@/hooks/useFilterTask";

export default function MyTask() {
  const { viewType, setViewType } = useLayout();
  const { currentUser } = useUserProfile();
  const { tasks, loading } = useFilterTask(currentUser?.id);

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
