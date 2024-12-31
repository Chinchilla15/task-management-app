import type { TaskRowProps } from "@types";
import {
  getPointEstimateNumber,
  formatDate,
  getTagVariant,
  cn,
} from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@components/common/Avatar";
import { Tag } from "@components/common/Tag";
import { Button } from "@components/common/Button";
import { COLUMN_WIDTHS, tableCellStyles } from "@/config/tableStyles";

export default function TaskRow({ task }: TaskRowProps) {
  const pointEstimateNumber = getPointEstimateNumber(task.pointEstimate);
  const formattedDate = formatDate(task.dueDate);

  return (
    <tr className="border border-neutral-3 bg-neutral-4 text-body-m text-neutral-1">
      <td
        className={cn(
          COLUMN_WIDTHS.name,
          "border-r border-neutral-3 p-4 text-left font-normal text-neutral-1",
        )}
      >
        {task.name}
      </td>
      <td className={cn(COLUMN_WIDTHS.tags, tableCellStyles)}>
        <div className="flex flex-wrap justify-between gap-2">
          <div className="flex">
            <Tag variant={getTagVariant(task.tags[0])}>{task.tags[0]}</Tag>
          </div>
          {task.tags.length > 1 && (
            <Button variant="transparent-white" className="rounded-[4px] p-0">
              <Tag variant="neutral">+{task.tags.length - 1}</Tag>
            </Button>
          )}
        </div>
      </td>
      <td className={cn(COLUMN_WIDTHS.estimate, tableCellStyles)}>
        {pointEstimateNumber} Points
      </td>
      <td className={cn(COLUMN_WIDTHS.assignee, tableCellStyles)}>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage alt={task.assignee?.fullName} />
            <AvatarFallback className="bg-secondary-4 font-bold text-white">
              {task.assignee?.fullName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {task.assignee?.fullName}
        </div>
      </td>
      <td className={cn(COLUMN_WIDTHS.dueDate, tableCellStyles)}>
        <span
          className={`${formattedDate === "Yesterday" ? "text-primary-3" : ""}`}
        >
          {formattedDate}
        </span>
      </td>
    </tr>
  );
}
