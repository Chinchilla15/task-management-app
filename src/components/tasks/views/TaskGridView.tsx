import TaskColumn from "../layout/TaskColumn";
import TaskCard from "../ui/TaskCard";
import CardSkeleton from "../ui/CardSkeleton";
import type { TaskGridProps } from "@types";
import { groupTasksByStatus, formatStatus } from "@/lib/utils";
import NoSearchResults from "@/components/errors/NoSearchResults";

export default function TaskGridView({
  tasks,
  loading,
  searchQuery,
}: TaskGridProps) {
  const groupedTasks = groupTasksByStatus(tasks);

  if (loading) {
    return <CardSkeleton />;
  }

  if (!tasks.length) {
    return searchQuery ? (
      <NoSearchResults query={searchQuery} />
    ) : (
      <div className="flex h-full items-center justify-center">
        <p className="text-body-l text-neutral-1">
          No tasks at the moment, you can rest for now
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {Object.entries(groupedTasks).map(([status, statusTasks]) => (
        <TaskColumn
          key={status}
          title={formatStatus(status)}
          count={statusTasks.length.toString()}
        >
          {statusTasks.map((task) => (
            <TaskCard key={task.id} id={task.id} task={task} />
          ))}
        </TaskColumn>
      ))}
    </div>
  );
}
