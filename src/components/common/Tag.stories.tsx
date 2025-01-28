import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";
import { tagStyles } from "@/config/tagVariants";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Tag Text",
    color: "neutral",
  },
  argTypes: {
    variant: {
      control: "select",
      options: Object.keys(tagStyles.variants),
      description: "Tag variant",
    },
    icon: {
      control: false,
      description: "Tag icon",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Neutral: Story = {
  args: {
    variant: "neutral",
    children: "Neutral Tag",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Success Tag",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "Error Tag",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning Tag",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "Info Tag",
  },
};

export const NeutralOutline: Story = {
  args: {
    variant: "neutralOutline",
    children: "Neutral Outline Tag",
    color: "neutral",
  },
};

export const SuccessOutline: Story = {
  args: {
    variant: "successOutline",
    children: "Success Outline Tag",
  },
};

export const ErrorOutline: Story = {
  args: {
    variant: "errorOutline",
    children: "Error Outline Tag",
  },
};

export const WarningOutline: Story = {
  args: {
    variant: "warningOutline",
    children: "Warning Outline Tag",
  },
};

export const InfoOutline: Story = {
  args: {
    variant: "infoOutline",
    children: "Info Outline Tag",
  },
};

export const TagGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {Object.keys(tagStyles.variants).map((variant) => (
        <div key={variant}>
          <Tag variant={variant as keyof typeof tagStyles.variants}>
            {variant}
          </Tag>
        </div>
      ))}
    </div>
  ),
};
