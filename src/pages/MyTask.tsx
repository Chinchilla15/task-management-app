import { Task } from "@/components/tasks/TaskRoot";
import { useGetTasksQuery } from "@graphql/graphql";
import { useLayout } from "@/hooks/useLayout";
import { TaskViewControls } from "@/components/common/TaskViewControls";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function MyTask() {
  const { viewType, searchQuery, setViewType } = useLayout();
  const { currentUser } = useUserProfile();
  const { data, loading } = useGetTasksQuery({
    variables: {
      input: {
        assigneeId: currentUser?.id,
      },
    },
  });
  const filteredTasks =
    data?.tasks?.filter((task) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  return (
    <>
      <TaskViewControls viewType={viewType} onViewChange={setViewType} />
      <Task.Provider viewType={viewType}>
        {viewType === "list" ? (
          <Task.List
            tasks={filteredTasks}
            loading={loading}
            searchQuery={searchQuery}
          />
        ) : (
          <Task.Grid
            tasks={filteredTasks}
            loading={loading}
            searchQuery={searchQuery}
          />
        )}
      </Task.Provider>
    </>
  );
}
