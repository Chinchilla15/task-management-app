import { Table, TableHeader, TableBody } from "../layout/TaskTable";
import { COLUMN_WIDTHS, tableCellStyles } from "@/config/tableStyles";
import { cn } from "@/lib/utils";

export default function ListSkeleton() {
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
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <Table key={index} status="loading" className="pointer-events-none">
            <TableHeader className="pointer-events-none">
              <tr className="border border-neutral-3">
                <td colSpan={5} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-4 w-4 animate-pulse rounded bg-neutral-3" />
                    <div className="h-6 w-32 animate-pulse rounded bg-neutral-3" />
                  </div>
                </td>
              </tr>
            </TableHeader>
            <TableBody>
              {Array(2)
                .fill(null)
                .map((_, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border border-neutral-3 bg-neutral-4"
                  >
                    <td className={cn(COLUMN_WIDTHS.name, tableCellStyles)}>
                      <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-3" />
                    </td>
                    <td className={cn(COLUMN_WIDTHS.tags, tableCellStyles)}>
                      <div className="flex gap-2">
                        <div className="h-6 w-16 animate-pulse rounded bg-neutral-3" />
                        <div className="h-6 w-8 animate-pulse rounded bg-neutral-3" />
                      </div>
                    </td>
                    <td className={cn(COLUMN_WIDTHS.estimate, tableCellStyles)}>
                      <div className="h-4 w-16 animate-pulse rounded bg-neutral-3" />
                    </td>
                    <td className={cn(COLUMN_WIDTHS.assignee, tableCellStyles)}>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 animate-pulse rounded-full bg-neutral-3" />
                        <div className="h-4 w-24 animate-pulse rounded bg-neutral-3" />
                      </div>
                    </td>
                    <td className={cn(COLUMN_WIDTHS.dueDate, tableCellStyles)}>
                      <div className="h-4 w-20 animate-pulse rounded bg-neutral-3" />
                    </td>
                  </tr>
                ))}
            </TableBody>
          </Table>
        ))}
    </div>
  );
}
