import { Droppable } from "@hello-pangea/dnd";
import type { TaskColumnProps } from "@types";

export default function TaskColumn({
  title,
  count,
  children,
}: TaskColumnProps) {
  const droppableId = `column-${title}`;
  return (
    <Droppable droppableId={droppableId} type="task">
      {(provided) => (
        <section
          className="w-full min-w-[340px] max-w-[348px]"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-body-l text-xl font-semibold text-neutral-1">
              {title}
              {count && (
                <span className="text-muted-foreground">({count})</span>
              )}
            </h2>
          </div>
          <div className="h-[calc(100vh-270px)] overflow-y-auto">
            <div className="space-y-4">{children}</div>
          </div>
          {provided.placeholder}
        </section>
      )}
    </Droppable>
  );
}
