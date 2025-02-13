import Clip from "@icons/white/Clip.svg?react";
import Message from "@icons/white/Message.svg?react";
import Dots from "@icons/Dots.svg?react";
import Pencil from "@icons/white/Pencil.svg?react";
import Trash from "@icons/white/Trash.svg?react";
import Hierarchy from "@icons/white/Hierarchy.svg?react";
import type { TaskCardProps } from "@types";
import { Avatar, AvatarFallback, AvatarImage } from "@components/common/Avatar";
import {
  getPointEstimateNumber,
  formatDate,
  getTagVariant,
  getRandomNumber,
  setDraggableBackgroundColor,
} from "@/lib/utils";
import { Tag } from "@components/common/Tag";
import ClockDueDate from "@icons/white/ClockDueDate.svg?react";
import {
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectRoot,
} from "@/components/select/index";
import { useState } from "react";
import DeleteTaskDialog from "@/components/dialog/DeleteTaskDialog";
import EditTaskDialog from "@/components/dialog/EditTaskDialog";
import { useTaskDialog } from "@/hooks/useTaskDialog";
import { Draggable } from "@hello-pangea/dnd";

export default function TaskCard({ task, index }: TaskCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { openEditDialog, editingTaskId, closeEditDialog } = useTaskDialog();

  const handleAction = async (value: string | number) => {
    if (value === "delete") {
      setShowDeleteDialog(true);
    } else if (value === "edit") {
      openEditDialog(task.id);
    }
  };

  const points = getPointEstimateNumber(task.pointEstimate);
  const date = formatDate(task.dueDate);
  const randomClipNumber = getRandomNumber();
  const randomHierarchyNumber = getRandomNumber();
  const randomMessageNumber = getRandomNumber();

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <article
          className={`mb-4 rounded-lg text-neutral-1 ${setDraggableBackgroundColor(snapshot)}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex flex-row items-center justify-between space-y-0 p-4">
            <h3 className="text-lg font-semibold">{task.name}</h3>
            <SelectRoot value={""} onValueChange={handleAction}>
              <SelectTrigger icon={<Dots width="18px" height="18px" />} />
              <SelectContent className="flex -translate-x-3/4 transform p-2">
                <SelectItem
                  value={"edit"}
                  className="mb-2 rounded-sm bg-transparent px-4 py-1 text-neutral-1"
                >
                  <Pencil width="18px" height="18px" />
                  Edit
                </SelectItem>
                <SelectItem
                  value={"delete"}
                  className="rounded-sm bg-transparent px-4 py-1 text-neutral-1 hover:bg-primary-4"
                >
                  <Trash width="20px" height="20px" />
                  Delete
                </SelectItem>
              </SelectContent>
            </SelectRoot>
          </div>
          <div className="p-4 pt-0">
            <div className="mb-4 flex items-center justify-between">
              <div className="font-medium">{points} Points</div>
              <div className="text-sm">
                <Tag variant={date === "Yesterday" ? "error" : undefined}>
                  <ClockDueDate />
                  {date.toUpperCase()}
                </Tag>
              </div>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex gap-2">
                {task.tags.slice(0, 2).map((tag) => (
                  <Tag key={tag} variant={getTagVariant(tag)}>
                    {tag}
                  </Tag>
                ))}
              </div>
              {task.tags.length > 2 && (
                <Tag className="p-0">
                  <SelectRoot value={""} onValueChange={() => {}}>
                    <SelectTrigger
                      className="cursor-pointer px-3 py-1 transition-all duration-300 ease-out hover:bg-neutral-2"
                      placeholder={` +${task.tags.length - 2} `}
                    />
                    <SelectContent className="mt-2 -translate-x-14 transform">
                      {task.tags.slice(2).map((tag) => (
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
            <div className="flex items-center justify-between">
              <Avatar>
                <AvatarImage alt={task.assignee?.fullName} />
                <AvatarFallback className="bg-secondary-4 font-bold text-white">
                  {task.assignee?.fullName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Clip className="h-4 w-4" />
                  <span className="text-sm">{randomClipNumber}</span>
                </div>
                <div className="flex items-center gap-1">
                  <p>{randomHierarchyNumber}</p>
                  <Hierarchy className="h-4 w-4" />
                  <span className="text-sm">{}</span>
                </div>
                <div className="flex items-center gap-1">
                  <p>{randomMessageNumber}</p>
                  <Message className="h-4 w-4" />
                  <span className="text-sm">{}</span>
                </div>
              </div>
            </div>
          </div>
          <DeleteTaskDialog
            showDeleteDialog={showDeleteDialog}
            setShowDeleteDialog={setShowDeleteDialog}
            taskId={task.id}
          />

          <EditTaskDialog
            open={editingTaskId === task.id}
            setOpen={() => closeEditDialog()}
            task={task}
          />
        </article>
      )}
    </Draggable>
  );
}
