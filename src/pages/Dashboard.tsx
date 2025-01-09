import { Task } from "@/components/tasks/TaskRoot";
import { useGetTasksQuery } from "@graphql/graphql";
import { useLayout } from "@/hooks/useLayout";
import { TaskViewControls } from "@/components/common/TaskViewControls";
import Header from "@/components/ui/Header";

export default function Dashboard() {
  const { setViewType, viewType, searchQuery, setSearchQuery } = useLayout();

  const { data, loading } = useGetTasksQuery({ variables: { input: {} } });
  const filteredTasks =
    data?.tasks?.filter((task) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  return (
    <>
      <Header onSearch={setSearchQuery} />
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
