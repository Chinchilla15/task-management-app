import { Button } from "@/components/common/Button";
import { DialogTrigger } from "../index";
import Plus from "@icons/white/Plus.svg?react";

export const TaskDialogTrigger = () => (
  <DialogTrigger asChild>
    <Button variant="primary" className="p-[13px]">
      <Plus width="14px" height="14px" aria-label="Plus Sign" />
    </Button>
  </DialogTrigger>
);
