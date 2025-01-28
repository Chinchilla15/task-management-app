import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useCallback } from "react";
import { useTaskDrag } from "./components/tasks/hooks/useTaskDrag";

function App() {
  const { handleDragEnd } = useTaskDrag();
  const onDragEnd = useCallback(
    (result: DropResult) => {
      handleDragEnd(result);
    },
    [handleDragEnd],
  );
  return (
    <DragDropContext
      autoScrollerOptions={{
        ease: (value: number) => value,
      }}
      onDragEnd={onDragEnd}
    >
      <RouterProvider router={router} />
    </DragDropContext>
  );
}

export default App;
