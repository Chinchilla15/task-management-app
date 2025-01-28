import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import Bell from "@icons/Bell.svg?react";
import { buttonStyles } from "@/config/buttonVariants";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },

  args: {
    children: "Button Text",
  },

  argTypes: {
    variant: {
      control: "select",
      options: Object.keys(buttonStyles.variants),
      description: "Button variant",
    },
    size: {
      control: "select",
      options: Object.keys(buttonStyles.sizes),
      description: "Button size",
    },
    disabled: {
      control: "boolean",
      description: "Button disabled",
    },
    noAnimation: {
      control: "boolean",
      description: "Button noAnimation",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const NeutralLight: Story = {
  args: {
    variant: "neutral-light",
    children: "Neutral Light Button",
  },
};

export const NeutralDark: Story = {
  args: {
    variant: "neutral-dark",
    children: "Neutral Dark Button",
  },
};

export const TransparentWhite: Story = {
  args: {
    variant: "transparent-white",
    children: "Transparent White Button",
  },
};

export const TransparentNeutral: Story = {
  args: {
    variant: "transparent-neutral",
    children: "Transparent Neutral Button",
  },
};

export const Bordered: Story = {
  args: {
    variant: "bordered",
    children: "Bordered Button",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "primary",
    children: "Button with Icon",
    icon: Bell,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const ButtonGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {Object.keys(buttonStyles.variants).map((variant) => (
        <div key={variant}>
          <Button variant={variant as keyof typeof buttonStyles.variants}>
            {variant}
          </Button>
        </div>
      ))}
      {Object.keys(buttonStyles.sizes).map((size) => (
        <div key={size}>
          <Button size={size as keyof typeof buttonStyles.sizes}>{size}</Button>
        </div>
      ))}
    </div>
  ),
};
