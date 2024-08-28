import React, { useState, useEffect } from "react";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { IconVideo, IconVideoPlus, IconMenu, IconApps, IconCircleCheckFilled, IconDownload } from "@tabler/icons-react";

import { Flex } from "../Flex";

import { ActionButton, ActionButtonGroup as PrimitiveActionButtonGroup } from "./";

/**
 * `<ActionButton />` is a Button component but only support icon as children. In addition to apply `HTMLButtonAttribute` props, it also provide some custom props such as `size`, `variant` and `fancy`.
 */
const meta: Meta<typeof ActionButton> = {
  title: "Inputs/ActionButton",
  tags: ['autodocs'],
  parameters: {
    controls: {
      exclude: ["startSlot", "endSlot", "css", 'children']
    }
  },
  args: {
    children: <IconApps />,
    variant: "outline",
    size: "md",
    fancy: false,
    disabled: false,
  },
  argTypes: {
    size: {
      defaultValue: "sm",
      type: {
        name: "enum",
        value: ["xs", "sm", "md", "lg"]
      }
    },
    variant: {
      defaultValue: "outline",
      type: {
        name: "enum",
        value: ["outline", "secondary", "subtle"]
      },
      control: {
        type: "inline-radio"
      }
    },
  },
  component: ActionButton,
}

export default meta;
type Story = StoryObj<typeof ActionButton>;

export const Overview: Story = {}

/**
 * Sometimes you need to use async function to handle some actions by clicking the button.
 * 
 * In this case, you could use `async: () => Promise<unknown>` property to let the button handle the async status automatically.
 */
export const WithAsyncFunction: StoryFn = (args) => {
  const [done, setDone] = useState(false);
  async function upload() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setDone(true);
  }
  return (
    <Flex gap="sm" align="v" style={{ fontSize: '12px' }}>
      <ActionButton
        {...args}
        async={upload}
        >
          {done ?
            <IconCircleCheckFilled /> :
            <IconDownload />
          }
      </ActionButton>
      Download Files
    </Flex>
  )
}


/**
 * `<ActionButtonGroup />` is a styled wrapper component to group multiple ActionButton components. This component could handle `radius` prop correctly so that you can set multi ActionButton Component in a group.
 * 
 * You could use `dir` prop to set the direction of the group.
 */
export const ActionButtonGroup: StoryFn = (args) => {
  const { dir, ...rest } = args;
  return (
    <PrimitiveActionButtonGroup dir={dir}>
      <ActionButton {...rest}>
        <IconVideo />
      </ActionButton>
      <ActionButton {...rest}>
        <IconVideo />
      </ActionButton>
    </PrimitiveActionButtonGroup>
  );
};

ActionButtonGroup.args = {
  dir: "horizontal",
}

ActionButtonGroup.argTypes = {
  dir: {
    type: {
      name: "enum",
      value: ["vertical", "horizontal"]
    },
  }
}

