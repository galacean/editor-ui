import React from "react";
import { Meta, StoryFn, StoryObj } from "@storybook/react";

import { Badge } from ".";
import { Flex } from "../Flex";

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
    children: {
      control: "text",
      description: "The content to display inside the badge"
    },
    color: {
      control: "select",
      options: ["gray", "green", "red", "blue", "orange", "amber", "gold"],
      description: "The color theme of the badge"
    },
    size: {
      control: "select",
      options: ["xs", "sm"],
      description: "The size of the badge"
    },
    closable: {
      control: "boolean",
      description: "Whether the badge can be closed with an X button"
    },
    pill: {
      control: "boolean",
      description: "Whether the badge has rounded pill-style corners"
    },
    code: {
      control: "boolean",
      description: "Whether to use monospace font for code-style badges"
    },
    active: {
      control: "boolean",
      description: "Whether the badge is in an active state"
    },
    onClose: {
      action: "onClose",
      description: "Callback function called when the close button is clicked"
    }
  },
  args: {
    children: "Badge",
    color: "gray",
    size: "sm",
    closable: false,
    pill: false,
    code: false,
    active: false,
  }
} as Meta<typeof Badge>;

type Story = StoryObj<typeof Badge>;

export const Overview = (args) => {
  return (
    <Flex gap="md" direction="column">
      <Badge {...args}>Success</Badge>
    </Flex>
  )
}