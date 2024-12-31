import {
  Table,
  TableHeader,
  TableBody,
} from "@/components/ui/tasks/layout/TaskTable";
import TaskRow from "../ui/TaskRow";
import { groupTasksByStatus, formatStatus, cn } from "@/lib/utils";
import type { TaskListProps } from "@types";
import Arrow from "@icons/DropDown.svg?react";
import { COLUMN_WIDTHS, tableCellStyles } from "@/config/tableStyles";
import ListSkeleton from "../ui/ListSkeleton";

export default function TaskListView({ tasks, loading }: TaskListProps) {
  const groupedTasks = groupTasksByStatus(tasks);

  if (loading) {
    return <ListSkeleton />;
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
    <div className="flex w-full flex-col gap-4">
      <Table status="neutral" className="pointer-events-none">
        <TableHeader>
          <tr className="border border-neutral-3">
            <th className={cn(COLUMN_WIDTHS.name, tableCellStyles)}>
              # Task Name
            </th>
            <th className={cn(COLUMN_WIDTHS.tags, tableCellStyles)}>
              Task Tags
            </th>
            <th className={cn(COLUMN_WIDTHS.estimate, tableCellStyles)}>
              Estimate
            </th>
            <th className={cn(COLUMN_WIDTHS.assignee, tableCellStyles)}>
              Task Assign Name
            </th>
            <th className={cn(COLUMN_WIDTHS.dueDate, tableCellStyles)}>
              Due Date
            </th>
          </tr>
        </TableHeader>
      </Table>
      {Object.entries(groupedTasks).map(([status, statusTasks]) => (
        <Table key={status} status={status}>
          <TableHeader>
            <tr className="border border-neutral-3">
              <td colSpan={5} className="p-4">
                <div className="flex items-center gap-4">
                  <Arrow />
                  <h2 className="flex items-center text-body-l font-semibold text-neutral-1">
                    {formatStatus(status)}
                    <span className="ml-2 text-neutral-2">
                      ({statusTasks.length})
                    </span>
                  </h2>
                </div>
              </td>
            </tr>
          </TableHeader>
          <TableBody>
            {statusTasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </TableBody>
        </Table>
      ))}
    </div>
  );
}
