import TaskColumn from "../layout/TaskColumn";
import TaskCard from "../ui/TaskCard";
import CardSkeleton from "../ui/CardSkeleton";
import type { TaskGridProps } from "@types";
import { groupTasksByStatus, formatStatus } from "@/lib/utils";

export default function TaskGridView({ tasks, loading }: TaskGridProps) {
  const groupedTasks = groupTasksByStatus(tasks);

  if (loading) {
    return <CardSkeleton />;
  }

  if (!tasks.length) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
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
