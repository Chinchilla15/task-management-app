import { PointEstimate, Status, TaskTag } from "@/graphql/graphql";
import * as z from "zod";

export const taskFormSchema = z.object({
  name: z.string().nonempty("Title is required"),
  pointEstimate: z.nativeEnum(PointEstimate),
  assignee: z.string().nonempty("Assignee is required"),
  tags: z.nativeEnum(TaskTag),
  dueDate: z.string().nonempty("Due date is required"),
  status: z.nativeEnum(Status),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
