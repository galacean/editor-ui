import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Flex } from "../Flex";

import { Spin } from "./";

export default {
  title: "Display/Spin",
  component: Spin,
  tags: ["autodocs"],
  argTypes: {
    color: {
      type: {
        name: "enum",
        value: ["primary", "default"]
      },
      defaultValue: "primary"
    },
    size: {
      type: {
        name: "enum",
        value: ["xs", "sm", "md"]
      },
      defaultValue: "md"
    }
  }
} as Meta<typeof Spin>;

export const Overview: StoryFn<typeof Spin> = (args) => {
  return (
    <Flex gap="md">
      <Spin {...args}></Spin>
      <Spin {...args}></Spin>
    </Flex>
  );
};

Overview.argTypes = {
  color: {
    type: {
      name: "enum",
      value: ["primary", "default"]
    },
    defaultValue: "primary"
  },
  size: {
    type: {
      name: "enum",
      value: ["xs", "sm", "md"]
    },
    defaultValue: "md"
  }
};
