import type { TaskRowProps } from "@types";

export default function TaskRow({ task }: TaskRowProps) {
  return (
    <tr className="border-y border-neutral-3 bg-neutral-4 text-body-m text-neutral-1">
      <td className="w-[35%] min-w-[200px] border-r border-neutral-3 p-4 text-left font-normal">
        {task.title}
      </td>
      <td className="w-[15%] min-w-[100px] border-r border-neutral-3 p-4 text-left font-normal">
        TAG
      </td>
      <td className="w-[15%] min-w-[100px] border-r border-neutral-3 p-4 text-left font-normal">
        {task.points} Points
      </td>
      <td className="w-[20%] min-w-[150px] border-r border-neutral-3 p-4 text-left font-normal">
        {task.assignee}
      </td>
      <td className="w-[15%] min-w-[100px] border-r border-neutral-3 p-4 text-left font-normal">
        {task.date}
      </td>
    </tr>
  );
}
