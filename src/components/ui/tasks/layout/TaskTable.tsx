import TaskRow from "../ui/TaskRow";
import type { TaskTableProps } from "@types";
import { groupTasksByStatus, formatStatus } from "@/lib/utils";

export default function TaskTable({ tasks, onTaskAction }: TaskTableProps) {
  const groupedTasks = groupTasksByStatus(tasks);
  const columnWidths = {
    name: "w-[35%]",
    tags: "w-[15%]",
    estimate: "w-[15%]",
    assignee: "w-[20%]",
    dueDate: "w-[15%]",
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <table className="w-full table-fixed border-collapse overflow-hidden rounded-lg border border-neutral-3">
        <thead className="sticky top-0 z-10 bg-neutral-4 text-body-m">
          <tr>
            <th
              className={`${columnWidths.name} border-r border-neutral-3 p-4 text-left font-normal text-neutral-1`}
            >
              # Task Name
            </th>
            <th
              className={`${columnWidths.tags} border-r border-neutral-3 p-4 text-left font-normal text-neutral-1`}
            >
              Task Tags
            </th>
            <th
              className={`${columnWidths.estimate} border-r border-neutral-3 p-4 text-left font-normal text-neutral-1`}
            >
              Estimate
            </th>
            <th
              className={`${columnWidths.assignee} border-r border-neutral-3 p-4 text-left font-normal text-neutral-1`}
            >
              Task Assign Name
            </th>
            <th
              className={`${columnWidths.dueDate} border-r border-neutral-3 p-4 text-left font-normal text-neutral-1`}
            >
              Due Date
            </th>
          </tr>
        </thead>
      </table>
      {Object.entries(groupedTasks).map(([status, statusTasks]) => (
        <table
          key={status}
          className="table-fixed border-collapse overflow-hidden rounded-lg border border-neutral-3"
        >
          <tbody>
            <tr className="bg-neutral-4">
              <td colSpan={5}>
                <h2 className="p-4 text-left text-body-l font-semibold text-neutral-1">
                  {formatStatus(status)}{" "}
                  <span className="text-muted-foreground text-neutral-2">
                    ({statusTasks.length.toString()})
                  </span>
                </h2>
              </td>
            </tr>
            {statusTasks.map((task) => (
              <TaskRow key={task.id} task={task} onAction={onTaskAction} />
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}
