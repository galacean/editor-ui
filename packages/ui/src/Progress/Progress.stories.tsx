import React, { useState } from "react";
import { Meta, StoryFn, StoryObj } from "@storybook/react";

import { Flex } from "../Flex";

import { Progress } from "./";

export default {
  title: "Display/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    size: {
      type: {
        name: "enum",
        value: ["sm", "md"]
      }
    },
  },
  args: {
    value: 50,
    size: "md"
  }
} as Meta<typeof Progress>;

type Story = StoryObj<typeof Progress>;


export const Overview: StoryFn<typeof Progress> = (args) => {
  return (
    <Flex style={{ width: '300px' }}>
      <Progress value={20} {...args} />
    </Flex>
  )
}