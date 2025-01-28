import { useState } from "react";
import { useCreateTask } from "./hooks/useCreateTask";
import { TaskFormValues } from "@/types/formSchema";
import { Status } from "@/graphql/graphql";
import { TaskDialogTrigger } from "./components/DialogTrigger";
import { TaskDialogBase } from "./TaskDialogBase";
import { Dialog } from ".";

export const CreateTaskDialog = () => {
  const [open, setOpen] = useState(false);
  const createTask = useCreateTask();

  const handleSubmit = async (data: TaskFormValues) => {
    await createTask({
      variables: {
        input: {
          ...data,
          assigneeId: data.assigneeId || null,
          tags: data.tags || [],
          status: Status.Backlog,
        },
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TaskDialogTrigger />
      <TaskDialogBase
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
        submitLabel="Create"
      />
    </Dialog>
  );
};
