import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from ".";
import { Button } from "@/components/common/Button";
import { useDeleteTaskMutation } from "@/graphql/graphql";
import type { DeleteDialogProps } from "@types";

export default function DeleteTaskDialog({
  taskId,
  showDeleteDialog,
  setShowDeleteDialog,
}: DeleteDialogProps) {
  const [deleteTask] = useDeleteTaskMutation();

  const handleDelete = async () => {
    try {
      await deleteTask({
        variables: {
          input: {
            id: taskId,
          },
        },
        update(cache) {
          cache.modify({
            fields: {
              tasks(existingTasks = []) {
                return existingTasks.filter(
                  (taskRef: { __ref: string }) =>
                    taskRef.__ref !== `Task:${taskId}`,
                );
              },
            },
          });
        },
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setShowDeleteDialog(false);
    }
  };

  return (
    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <DialogContent className="flex max-w-sm flex-col gap-4">
        <DialogHeader>
          <DialogTitle className="text-body-xl text-neutral-1">
            Delete Task
          </DialogTitle>
        </DialogHeader>
        <p className="text-neutral-1">
          Are you sure you want to delete this task?
        </p>
        <DialogFooter>
          <Button
            variant="transparent-white"
            onClick={() => setShowDeleteDialog(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
