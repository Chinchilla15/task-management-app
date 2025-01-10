import { Task, useUpdateTaskMutation } from "@/graphql/graphql";
import { DropResult } from "@hello-pangea/dnd";
import { getDroppableColumnStatus } from "@/lib/utils";

export const useTaskDrag = () => {
  const [updateTaskMutation] = useUpdateTaskMutation();

  const handleDragEnd = async (result: DropResult) => {
    const { destination, draggableId } = result;

    if (!destination) return;

    const updateData = {
      id: draggableId,
      position: destination.index,
      status: getDroppableColumnStatus(destination.droppableId),
    };

    try {
      await updateTaskMutation({
        variables: {
          input: updateData,
        },
        optimisticResponse: {
          __typename: "Mutation",
          updateTask: {
            __typename: "Task",
            ...updateData,
          } as Task,
        },
        update: (cache, { data: mutationData }) => {
          if (!mutationData?.updateTask) return;

          cache.modify({
            id: cache.identify({ __typename: "Mutation", id: draggableId }),
            fields: {
              status: () => destination.index,
              position: () => getDroppableColumnStatus(destination.droppableId),
            },
          });
        },
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  return { handleDragEnd };
};
