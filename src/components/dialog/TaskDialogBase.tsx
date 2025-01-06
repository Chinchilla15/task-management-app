import { Dialog, DialogContent } from ".";
import { TaskFormValues } from "@/types/formSchema";
import { useGetUsersQuery } from "@/graphql/graphql";
import { useState } from "react";
import { useTaskForm } from "./hooks/useTaskForm";
import { DialogInput } from "./components/DialogInput";
import { DialogFormFields } from "./components/DialogFormFields";
import { TaskDialogFooter } from "./components/TaskDialogFooter";
import { useAssigneeOptions } from "./hooks/useAssigneeOptions";
import { usePointEstimateOptions } from "./hooks/usePointEstimateOptions";
import { useTagOptions } from "./hooks/useTagOptions";
import type { TaskDialogBaseProps } from "@types";

export const TaskDialogBase = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  submitLabel,
}: TaskDialogBaseProps) => {
  const [date, setDate] = useState<Date>(
    defaultValues?.dueDate ? new Date(defaultValues.dueDate) : new Date(),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: usersData } = useGetUsersQuery();

  const form = useTaskForm({
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          assigneeId: defaultValues.assignee?.id ?? "",
          // id: defaultValues.id ?? "",
        }
      : undefined,
  });

  const assigneeOptions = useAssigneeOptions(usersData);
  const pointEstimateOptions = usePointEstimateOptions();
  const tagOptions = useTagOptions();

  const handleSubmit = async (data: TaskFormValues) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex-1">
          <div className="pb-4">
            <div className="flex flex-col gap-6">
              <DialogInput form={form} />
              <DialogFormFields
                form={form}
                date={date}
                setDate={setDate}
                pointEstimateOptions={pointEstimateOptions}
                assigneeOptions={assigneeOptions}
                tagOptions={tagOptions}
              />
            </div>
          </div>
          <TaskDialogFooter
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
            submitLabel={submitLabel}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};
