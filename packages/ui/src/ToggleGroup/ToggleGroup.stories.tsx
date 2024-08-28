import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { IconAlignLeft, IconAlignCenter, IconAlignRight, IconAlignJustified, IconItalic, IconBold } from "@tabler/icons-react";

import { Flex } from "../Flex";

import { ToggleGroup, ToggleGroupItem } from "./";

export default {
  title: "Inputs/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
} as Meta<typeof ToggleGroup>;

export const Overview: StoryFn<typeof ToggleGroup> = (args) => {
  const [val, setVal] = useState(0);
  return (
    <Flex gap="md">
      <ToggleGroup type="single">
        <ToggleGroupItem value="left">
          <IconAlignLeft />
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <IconAlignCenter />
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <IconAlignRight />
        </ToggleGroupItem>
        <ToggleGroupItem value="justify">
          <IconAlignJustified />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single">
        <ToggleGroupItem value="left">
          <IconItalic />
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <IconBold />
        </ToggleGroupItem>
      </ToggleGroup>
    </Flex>
  );
};
