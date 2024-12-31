import TaskColumn from "../layout/TaskColumn";
import TaskCard from "../ui/TaskCard";
import type { TaskGridProps } from "@types";
import { groupTasksByStatus, formatStatus } from "@/lib/utils";

export default function TaskGridView({ tasks }: TaskGridProps) {
  const groupedTasks = groupTasksByStatus(tasks);

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
