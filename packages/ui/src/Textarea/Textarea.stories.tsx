import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Flex } from "../Flex";

import { Textarea } from "./";

export default {
  title: "Inputs/Textarea",
  component: Textarea,
  tags: ["autodocs"],
} as Meta<typeof Textarea>;

export const Overview: StoryFn<typeof Textarea> = (args) => {
  return (
    <Flex gap="sm" style={{ width: "200px" }}>
      <Textarea placeholder="Just input something..." variant="default" />
      <Textarea placeholder="Just input something..." variant="subtle" />
    </Flex>
  );
};
