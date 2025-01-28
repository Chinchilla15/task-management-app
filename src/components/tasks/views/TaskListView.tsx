import {
  Table,
  TableHeader,
  TableBody,
} from "@/components/tasks/layout/TaskTable";
import TaskRow from "../ui/TaskRow";
import { groupTasksByStatus, formatStatus, cn } from "@/lib/utils";
import type { TaskListProps } from "@types";
import Arrow from "@icons/DropDown.svg?react";
import { COLUMN_WIDTHS, tableCellStyles } from "@/config/tableStyles";
import ListSkeleton from "../ui/ListSkeleton";
import NoSearchResults from "@/components/errors/NoSearchResults";
import { Droppable } from "@hello-pangea/dnd";

export default function TaskListView({
  tasks,
  loading,
  searchQuery,
  error,
}: TaskListProps) {
  const groupedTasks = groupTasksByStatus(tasks);

  if (loading) {
    return <ListSkeleton />;
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex w-fit flex-col gap-4 sm:w-auto md:w-fit xl:w-auto">
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
      {Object.entries(groupedTasks).map(([status, statusTasks]) => {
        const droppableId = `status-${formatStatus(status)}`;
        return (
          <Droppable key={status} droppableId={droppableId}>
            {(provided) => (
              <Table
                key={status}
                status={status}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
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
                  {statusTasks.map((task, index) => (
                    <TaskRow key={task.id} index={index} task={task} />
                  ))}
                </TableBody>
                {provided.placeholder}
              </Table>
            )}
          </Droppable>
        );
      })}
    </div>
  );
}
