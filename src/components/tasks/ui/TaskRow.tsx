import type { TaskRowProps } from "@types";
import {
  getPointEstimateNumber,
  formatDate,
  getTagVariant,
  cn,
  getDueDateStatusClass,
} from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@components/common/Avatar";
import { Tag } from "@components/common/Tag";
import { COLUMN_WIDTHS, tableCellStyles } from "@/config/tableStyles";
import { isBefore } from "date-fns";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from "@/components/select";

export default function TaskRow({ task, index }: TaskRowProps) {
  const pointEstimateNumber = getPointEstimateNumber(task.pointEstimate);
  const formattedDate = formatDate(task.dueDate);

  const dueDateStatusClass = getDueDateStatusClass(new Date(task.dueDate));

  return (
    <tr className="border border-neutral-3 bg-neutral-4 text-body-m text-neutral-1">
      <td
        className={cn(
          COLUMN_WIDTHS.name,
          "relative border-r border-neutral-3 p-4 text-left font-normal text-neutral-1",
        )}
      >
        <span
          className={cn(
            "absolute left-0 top-[8%] h-[85%] w-1",
            dueDateStatusClass,
          )}
        ></span>
        <div className="relative ml-6 flex items-center gap-2">
          <p>{index + 1 < 10 ? `0${index + 1}` : index + 1}</p>{" "}
          <p>{task.name}</p>
        </div>
      </td>
      <td className={cn(COLUMN_WIDTHS.tags, tableCellStyles)}>
        <div className="flex flex-wrap justify-between gap-2">
          <div className="flex">
            <Tag variant={getTagVariant(task.tags[0])}>{task.tags[0]}</Tag>
          </div>
          {task.tags.length > 1 && (
            <Tag className="p-0">
              <SelectRoot value={""} onValueChange={() => {}}>
                <SelectTrigger
                  className="cursor-pointer px-3 py-1 transition-all duration-300 ease-out hover:bg-neutral-2"
                  placeholder={` +${task.tags.length - 1} `}
                />
                <SelectContent className="mt-2 -translate-x-14 transform">
                  {task.tags.slice(1).map((tag) => (
                    <SelectItem
                      className="pointer-events-none cursor-default bg-transparent px-2 py-1 hover:bg-transparent"
                      key={tag}
                      value={tag}
                    >
                      <Tag variant={getTagVariant(tag)}>{tag}</Tag>
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Tag>
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
          className={cn({
            "text-primary-3":
              formattedDate === "Yesterday" ||
              formattedDate === "Today" ||
              isBefore(new Date(task.dueDate), new Date()),
            "text-tertiary-4": formattedDate === "Tomorrow",
          })}
        >
          {formattedDate}
        </span>
      </td>
    </tr>
  );
}
