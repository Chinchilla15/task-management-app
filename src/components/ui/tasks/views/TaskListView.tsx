import TaskTable from "../layout/TaskTable";
import type { TaskListProps } from "@types";

export default function TaskListView({ tasks, onTaskAction }: TaskListProps) {
  // Transform column tasks into flat array with status
  const tableData = tasks.flatMap((task) => ({
    ...task,
    status: task.status,
  }));

  return (
    <div className="p-4">
      <TaskTable tasks={tableData} onTaskAction={onTaskAction} />
    </div>
  );
}
