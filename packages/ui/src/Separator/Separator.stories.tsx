import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Separator } from "./"
import { Flex } from "../Flex";
import { Button } from "../Button";

export default {
  title: "Display/Separator",
  component: Separator,
  tags: ["autodocs"],
} as Meta<typeof Separator>;

export const Overview: StoryFn<typeof Separator> = (args) => {
  const [val, setVal] = useState(0);
  return (
    <Flex gap="md" style={{ width: '100%', height: '24px' }}>
      <Button onClick={() => setVal((prev) => prev + 1)}>Increment</Button>
      <Separator orientation="vertical" />
      <Button onClick={() => setVal((prev) => prev - 1)}>Decrement</Button>
      <Separator orientation="horizontal" />
    </Flex>
  );
}