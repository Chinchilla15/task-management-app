import { Button } from "@components/common/Button";
import Grid from "@icons/Grid.svg?react";
import MenuBars from "@icons/MenuBars.svg?react";
import type { TaskViewControlsProps } from "@types";
import { CreateTaskDialog } from "../dialog/CreateTaskDialog";

export function TaskViewControls({
  viewType,
  onViewChange,
}: TaskViewControlsProps) {
  return (
    <div className="my-6 flex items-center justify-between py-1">
      <div className="flex gap-2">
        <Button
          variant={`${viewType === "list" ? "bordered" : "transparent-white"}`}
          className="p-3"
          onClick={() => onViewChange("list")}
          noAnimation
        >
          <MenuBars width="18px" height="18px" aria-label="List View" />
        </Button>
        <Button
          variant={`${viewType === "grid" ? "bordered" : "transparent-white"}`}
          className="p-3"
          onClick={() => onViewChange("grid")}
          noAnimation
        >
          <Grid width="18px" height="16px" aria-label="Grid View" />
        </Button>
      </div>
      <CreateTaskDialog />
    </div>
  );
}
