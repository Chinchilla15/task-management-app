import Clip from "@icons/white/Clip.svg?react";
import Message from "@icons/white/Message.svg?react";
import Dots from "@icons/Dots.svg?react";
import type { TaskCardProps } from "@types";
import { Avatar, AvatarFallback, AvatarImage } from "@components/common/Avatar";
import { getPointEstimateNumber, formatDate, getTagVariant } from "@/lib/utils";
import { Tag } from "@components/common/Tag";
import ClockDueDate from "@icons/white/ClockDueDate.svg?react";

//WIP: TaskCard component
export default function TaskCard({ task }: TaskCardProps) {
  const points = getPointEstimateNumber(task.pointEstimate);
  const date = formatDate(task.dueDate);

  return (
    <div className="mb-4 rounded-lg bg-neutral-4 text-neutral-1">
      <div className="flex flex-row items-center justify-between space-y-0 p-4">
        <div className="text-lg font-semibold">{task.name}</div>
        <button className="h-8 w-8">
          <Dots className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4 pt-0">
        <div className="mb-4 flex items-center justify-between">
          <div className="font-medium">{points} Points</div>
          <div className="text-muted-foreground text-sm">
            <Tag variant={date === "Yesterday" ? "error" : undefined}>
              <ClockDueDate />
              {date.toUpperCase()}
            </Tag>
          </div>
        </div>
        <div className="mb-4 flex items-center gap-2">
          {task.tags.map((tag) => (
            <Tag key={tag} variant={getTagVariant(tag)}>
              {tag.toUpperCase()}
            </Tag>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <Avatar>
            <AvatarImage alt={task.assignee?.fullName} />
            <AvatarFallback className="bg-secondary-4 font-bold text-white">
              {task.assignee?.fullName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-muted-foreground flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clip className="h-4 w-4" />
              <span className="text-sm">{}</span>
            </div>
            <div className="flex items-center gap-1">
              <Message className="h-4 w-4" />
              <span className="text-sm">{}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
