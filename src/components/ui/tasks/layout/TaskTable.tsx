import TaskRow from "../ui/TaskRow";
import type { TaskTableProps } from "@types";
import { groupTasksByStatus } from "@/lib/utils";

export default function TaskTable({ tasks, onTaskAction }: TaskTableProps) {
  const groupedTasks = groupTasksByStatus(tasks);

  return (
    <div className="flex flex-col gap-4">
      <table className="w-full overflow-hidden rounded-[4px]">
        <thead className="border border-neutral-3 bg-neutral-4 text-body-m">
          <tr>
            <th className="w-[35%] border-r border-neutral-3 p-4 text-left font-normal text-neutral-1">
              # Task Name
            </th>
            <th className="w-[15%] border-r border-neutral-3 p-4 text-left font-normal text-neutral-1">
              Task Tags
            </th>
            <th className="w-[15%] border-r border-neutral-3 p-4 text-left font-normal text-neutral-1">
              Estimate
            </th>
            <th className="w-[20%] border-r border-neutral-3 p-4 text-left font-normal text-neutral-1">
              Task Assign Name
            </th>
            <th className="w-[15%] border-r border-neutral-3 p-4 text-left font-normal text-neutral-1">
              Due Date
            </th>
          </tr>
        </thead>
      </table>
      {Object.entries(groupedTasks).map(([status, statusTasks]) => (
        <div
          key={status}
          className="overflow-hidden rounded-t-[4px] border border-neutral-3"
        >
          <table className="w-full">
            <tbody>
              <tr className="bg-neutral-4">
                <td colSpan={5}>
                  <h2 className="p-4 text-left text-body-l font-semibold text-neutral-1">
                    {status}{" "}
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
        </div>
      ))}
    </div>
  );
}
