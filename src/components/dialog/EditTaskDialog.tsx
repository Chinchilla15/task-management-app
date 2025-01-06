import { useUpdateTaskMutation } from "@/graphql/graphql";
import { TaskFormValues } from "@/types/formSchema";
import { TaskDialogBase } from "./TaskDialogBase";
import type { EditTaskDialogProps } from "@types";

export default function EditTaskDialog({
  task,
  open,
  setOpen,
}: EditTaskDialogProps) {
  const [updateTask] = useUpdateTaskMutation();

  const handleSubmit = async (data: TaskFormValues) => {
    await updateTask({
      variables: {
        input: {
          id: task.id,
          ...data,
        },
      },
    });
  };

  return (
    <TaskDialogBase
      open={open}
      onOpenChange={setOpen}
      onSubmit={handleSubmit}
      defaultValues={task}
      submitLabel="Save"
    />
  );
}
