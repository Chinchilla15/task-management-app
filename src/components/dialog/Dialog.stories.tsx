import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DialogRoot } from "./primitives/DialogRoot";
import { DialogTrigger } from "./primitives/DialogTrigger";
import { DialogContent } from "./primitives/DialogContent";
import { DialogHeader } from "./primitives/DialogHeader";
import { DialogFooter } from "./primitives/DialogFooter";
import { DialogTitle } from "./primitives/DialogTitle";
import { DialogDescription } from "./primitives/DialogDescription";
import { Button } from "../common/Button";

const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
};

const DialogWithState = ({
  trigger = "Open Dialog",
  title = "Dialog Title",
  description = "Dialog Description",
  children,
}: {
  trigger?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
        </Dialog.Header>
        {children}
        <Dialog.Footer>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Save Changes</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};

const meta: Meta<typeof DialogWithState> = {
  title: "Components/Dialog",
  component: DialogWithState,
  parameters: {
    layout: { fullscreen: true },
  },
  argTypes: {
    trigger: {
      control: "text",
      description: "Text content of the trigger button",
    },
    title: {
      control: "text",
      description: "Dialog title text",
    },
    description: {
      control: "text",
      description: "Dialog description text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof DialogWithState>;

export const Default: Story = {
  args: {
    trigger: "Open Dialog",
    title: "Example Dialog",
    description: "This is a basic dialog example.",
  },
};

export const WithCustomContent: Story = {
  args: {
    trigger: "Open Form Dialog",
    title: "Edit Profile",
    description: "Make changes to your profile.",
    children: (
      <div className="py-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-white">
              Name
            </label>
            <input
              id="name"
              className="w-full rounded-md border border-neutral-2 bg-neutral-3 px-3 py-2"
              placeholder="Enter your name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-white">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-md border border-neutral-2 bg-neutral-3 px-3 py-2"
              placeholder="Enter your email"
            />
          </div>
        </div>
      </div>
    ),
  },
};
