import Clip from "@icons/white/Clip.svg?react";
import Message from "@icons/white/Message.svg?react";
import Dots from "@icons/Dots.svg?react";
import type { TaskProps } from "@types";
import { Avatar, AvatarFallback } from "@components/common/Avatar";

//WIP: TaskCard component
export default function TaskCard({
  title,
  points,
  date,
  attachments = 5,
  comments = 3,
}: TaskProps) {
  return (
    <div className="mb-4 rounded-lg bg-neutral-4 text-neutral-1">
      <div className="flex flex-row items-center justify-between space-y-0 p-4">
        <div className="text-lg font-semibold">{title}</div>
        <button className="h-8 w-8">
          <Dots className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4 pt-0">
        <div className="mb-4 flex items-center justify-between">
          <div className="font-medium">{points} Points</div>
          <div className="text-muted-foreground text-sm">{date}</div>
        </div>
        <div className="mb-4 flex gap-2">
          <span className="rounded-lg bg-emerald-500/10 p-1 text-emerald-500">
            IOS APP
          </span>
          <span className="rounded-lg bg-amber-500/10 p-1 text-amber-500">
            ANDROID
          </span>
        </div>
        <div className="flex items-center justify-between">
          <Avatar>
            <AvatarFallback className="bg-secondary-4 font-bold text-white">
              U
            </AvatarFallback>
          </Avatar>
          <div className="text-muted-foreground flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clip className="h-4 w-4" />
              <span className="text-sm">{attachments}</span>
            </div>
            <div className="flex items-center gap-1">
              <Message className="h-4 w-4" />
              <span className="text-sm">{comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
