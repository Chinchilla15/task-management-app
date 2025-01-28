import { render, screen } from "@testing-library/react";
import { DialogRoot } from "@/components/dialog/primitives/DialogRoot";
import { DialogContent } from "@/components/dialog/primitives/DialogContent";
import { DialogTitle } from "@/components/dialog/primitives/DialogTitle";
import { DialogDescription } from "@/components/dialog/primitives/DialogDescription";
import { DialogHeader } from "@/components/dialog/primitives/DialogHeader";
import { DialogFooter } from "@/components/dialog/primitives/DialogFooter";

describe("Dialog Primitives", () => {
  test("Dialog content is rendered correctly", () => {
    render(
      <DialogRoot open={true} onOpenChange={() => {}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button>Close</button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>,
    );

    expect(screen.getByText("Dialog Title")).toBeInTheDocument();
    expect(screen.getByText("Dialog Description")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });
});
