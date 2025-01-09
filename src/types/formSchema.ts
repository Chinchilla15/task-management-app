import { PointEstimate, Status, TaskTag } from "@/graphql/graphql";
import * as z from "zod";

export const taskFormSchema = z.object({
  name: z.string().nonempty("Title is required"),
  pointEstimate: z.nativeEnum(PointEstimate),
  assigneeId: z.string().nonempty("Assignee is required"),
  tags: z.array(z.nativeEnum(TaskTag)).nonempty("Tags are required"),
  dueDate: z.string().nonempty("Due date is required"),
  status: z.nativeEnum(Status).nullable(),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
