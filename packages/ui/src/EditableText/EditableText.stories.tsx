import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Flex } from "../Flex";

import { EditableText } from ".";

export default {
  component: EditableText
} as Meta<typeof EditableText>;

export const Overview: StoryFn<typeof EditableText> = (args) => {
  return (
    <Flex gap="md">
      <EditableText {...args} />
      <EditableText {...args} showIcon />
    </Flex>
  );
};

Overview.argTypes = {
  value: {
    defaultValue: "inline-name"
  }
};
