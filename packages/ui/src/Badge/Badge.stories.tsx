import { Meta, StoryFn, StoryObj } from "@storybook/react";

import { Badge } from ".";

export default {
  title: "Display/Badge",
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "A Badge is used to display a small amount of information."
      },
    },
  },
  argTypes: {
    status: {
      type: {
        name: "enum",
        value: ["info", "failed", "warning", "success"]
      }
    },
    onClose: {
      action: "onClose"
    }
  },
  args: {
    children: "Success",
    code: false,
    closeable: false,
    pill: false,
    status: "info",
  }
} as Meta<typeof Badge>;

type Story = StoryObj<typeof Badge>;

export const Overview: Story = {}