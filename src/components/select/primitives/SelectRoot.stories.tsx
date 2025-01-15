import type { Meta, StoryObj } from "@storybook/react";
import { SelectRoot, SelectTrigger, SelectContent, SelectItem } from "../index";
import { useState } from "react";

const meta: Meta<typeof SelectRoot> = {
  title: "Components/SelectRoot",
  component: SelectRoot,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof SelectRoot>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <SelectRoot
        value={value}
        onValueChange={(val) => setValue(val.toString())}
      >
        <SelectTrigger placeholder="Select an option" />
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </SelectRoot>
    );
  },
};
