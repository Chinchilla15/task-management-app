import TaskColumn from "../layout/TaskColumn";
import TaskCard from "../ui/TaskCard";
import type { TaskGridProps } from "@types";
import { groupTasksByStatus } from "@/lib/utils";

export default function TaskGridView({ tasks }: TaskGridProps) {
  const groupedTasks = groupTasksByStatus(tasks);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {Object.entries(groupedTasks).map(([status, statusTasks]) => (
        <TaskColumn
          key={status}
          title={status}
          count={statusTasks.length.toString()}
        >
          {statusTasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              points={task.points}
              date={task.date}
              assignee={task.assignee}
              status={task.status}
            />
          ))}
        </TaskColumn>
      ))}
    </div>
  );
}
