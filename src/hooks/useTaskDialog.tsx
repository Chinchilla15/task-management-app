import { useSearchParams } from "react-router";

export function useTaskDialog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const editingTaskId = searchParams.get("edit");

  const openEditDialog = (taskId: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("edit", taskId);
      return newParams;
    });
  };

  const closeEditDialog = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete("edit");
      return newParams;
    });
  };

  return {
    editingTaskId,
    openEditDialog,
    closeEditDialog,
    isEditDialogOpen: !!editingTaskId,
  };
}
