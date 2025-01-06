import { PointEstimate, Status, TaskTag } from "@/graphql/graphql";
import * as z from "zod";

export const taskFormSchema = z.object({
  name: z.string().nonempty("Title is required"),
  pointEstimate: z.nativeEnum(PointEstimate),
  assigneeId: z.string().nonempty("Assignee is required").nullable(),
  tags: z.array(z.nativeEnum(TaskTag)),
  dueDate: z.string().nonempty("Due date is required"),
  status: z.nativeEnum(Status).nullable(),
  // id: z.string(),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
