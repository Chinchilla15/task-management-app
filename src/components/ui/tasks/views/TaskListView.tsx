import TaskTable from "../layout/TaskTable";
import type { TaskListProps } from "@types";

export default function TaskListView({ tasks, onTaskAction }: TaskListProps) {
  // Transform column tasks into flat array with status
  const tableData = tasks.flatMap((task) => ({
    ...task,
    status: task.status,
  }));

  return (
    <div className="mt-1 w-full">
      <TaskTable tasks={tableData} onTaskAction={onTaskAction} />
    </div>
  );
}
