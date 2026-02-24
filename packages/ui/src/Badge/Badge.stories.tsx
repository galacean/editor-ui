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
      options: ["gray", "green", "red", "blue", "orange", "amber", "gold", "violet"],
      description: "The color theme of the badge"
    },
    size: {
      control: "select",
      options: ["xs", "sm"],
      description: "The size of the badge"
    },
    variant: {
      control: "select",
      options: ["solid", "surface"],
      description: "The visual style variant of the badge"
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
    variant: "solid",
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

export const SurfaceVariant: Story = {
  render: () => (
    <Flex gap="md" direction="column">
      <Flex gap="sm" wrap>
        <Badge variant="surface" color="gray">Gray Surface</Badge>
        <Badge variant="surface" color="green">Green Surface</Badge>
        <Badge variant="surface" color="red">Red Surface</Badge>
        <Badge variant="surface" color="blue">Blue Surface</Badge>
        <Badge variant="surface" color="orange">Orange Surface</Badge>
        <Badge variant="surface" color="amber">Amber Surface</Badge>
        <Badge variant="surface" color="gold">Gold Surface</Badge>
        <Badge variant="surface" color="violet">Violet Surface</Badge>
      </Flex>
      <Flex gap="sm" wrap>
        <Badge variant="surface" color="blue" pill>Pill Surface</Badge>
        <Badge variant="surface" color="green" closable>Closable Surface</Badge>
        <Badge variant="surface" color="violet" code>Code Surface</Badge>
      </Flex>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: "Surface variant uses subtle background colors with solid borders and backdrop blur for better text accessibility."
      }
    }
  }
}