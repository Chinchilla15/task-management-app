import { DialogFooter } from "../index";
import { Button } from "@/components/common/Button";
import { Spinner } from "@components/ui/Spinner";
import type { TaskDialogFooterProps } from "@types";

export const TaskDialogFooter = ({
  isSubmitting,
  onCancel,
  submitLabel,
}: TaskDialogFooterProps) => (
  <DialogFooter>
    <Button type="button" variant="transparent-white" onClick={onCancel}>
      Cancel
    </Button>
    <Button variant="primary" type="submit" disabled={isSubmitting}>
      {isSubmitting ? (
        <Spinner size="md" variant="light" />
      ) : (
        (submitLabel ?? "Create")
      )}
    </Button>
  </DialogFooter>
);
