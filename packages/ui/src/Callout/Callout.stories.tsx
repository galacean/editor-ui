import React, { useState } from "react";
import { Meta, StoryFn, StoryObj } from "@storybook/react";

import { Flex } from "../Flex";

import { Callout } from "./";

export default {
  title: "Display/Callout",
  component: Callout,
  tags: ['autodocs'],
  args: {
    children: "A callout is a short piece of text intended to attract attention.",
    type: "info",
  },
  argTypes: {
    type: {
      type: {
        name: "enum",
        value: ["info", "warning", "error", "success"]
      }
    }
  }
} as Meta<typeof Callout>;

type Story = StoryObj<typeof Callout>;

export const Overview: Story = {}