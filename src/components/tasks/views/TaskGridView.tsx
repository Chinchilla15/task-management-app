import TaskColumn from "../layout/TaskColumn";
import TaskCard from "../ui/TaskCard";
import CardSkeleton from "../ui/CardSkeleton";
import type { TaskGridProps } from "@types";
import { groupTasksByStatus, formatStatus } from "@/lib/utils";
import NoSearchResults from "@/components/errors/NoSearchResults";
import { Status } from "@/graphql/graphql";
import CardPlaceholder from "../ui/CardPlaceholder";

export default function TaskGridView({
  tasks,
  loading,
  searchQuery,
  error,
}: TaskGridProps) {
  const groupedTasks = groupTasksByStatus(tasks);

  const columnOrder: Status[] = [
    Status.Backlog,
    Status.Todo,
    Status.InProgress,
    Status.Done,
    Status.Cancelled,
  ];

  if (loading) {
    return <CardSkeleton />;
  }

  if (!tasks.length) {
    return searchQuery ? (
      <NoSearchResults query={searchQuery} />
    ) : (
      <div className="flex h-full items-center justify-center">
        <p className="text-body-l text-neutral-1">
          No tasks found. Create a new task to get started.
        </p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex gap-4">
      {columnOrder.map((status) => {
        const statusTasks = groupedTasks[status] || [];
        return (
          <TaskColumn
            key={status}
            title={formatStatus(status)}
            count={statusTasks.length.toString()}
          >
            {statusTasks.length === 0 ? (
              <CardPlaceholder />
            ) : (
              statusTasks
                .sort((a, b) => a.position - b.position)
                .map((task, index) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    task={task}
                    index={index}
                  />
                ))
            )}
          </TaskColumn>
        );
      })}
    </div>
  );
}
