import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskFormSchema, TaskFormValues } from "@/types/formSchema";
import { Status } from "@/graphql/graphql";
import { dateUtils } from "@/lib/utils";
import type { TaskFormConfig } from "@types";

export const useTaskForm = (config?: TaskFormConfig) => {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      // id: config?.defaultValues?.id ?? "",
      name: config?.defaultValues?.name ?? "",
      pointEstimate: config?.defaultValues?.pointEstimate ?? undefined,
      assigneeId: config?.defaultValues?.assigneeId ?? null,
      status: config?.defaultValues?.status ?? Status.InProgress,
      dueDate: config?.defaultValues?.dueDate
        ? dateUtils.toAPIFormat(config.defaultValues.dueDate)
        : dateUtils.toAPIFormat(new Date()),
      tags: config?.defaultValues?.tags ?? [],
    },
  });

  return form;
};
