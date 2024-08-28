import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Flex } from "../Flex";

import { Triangle } from "./";

export default {
  title: "Symbols/Triangle",
  component: Triangle
} as Meta<typeof Triangle>;

export const Overview: StoryFn<typeof Triangle> = (args) => {
  return (
    <Flex gap="md" css={{ position: "relative" }}>
      <Triangle direction="bottom" />
      <Triangle direction="left" />
      <Triangle direction="right" />
      <Triangle direction="top" />
      <Triangle direction="leftbottom" />
      <Triangle direction="rightbottom" />
      <Triangle direction="lefttop" />
      <Triangle direction="righttop" />
    </Flex>
  );
};
