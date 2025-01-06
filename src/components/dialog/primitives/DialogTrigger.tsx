import { Children, cloneElement } from "react";
import { Button } from "@/components/common/Button";
import { useDialogContext } from "../context/DialogContext";
import type { DialogTriggerProps } from "@types";

export const DialogTrigger = ({ asChild, children }: DialogTriggerProps) => {
  const { onOpenChange } = useDialogContext();

  const child = asChild ? Children.only(children) : <Button>{children}</Button>;

  return cloneElement(child as React.ReactElement, {
    onClick: () => onOpenChange(true),
  });
};
