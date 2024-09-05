import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";

import { styled } from "@galacean/design-system";
import { Flex } from "../Flex";

import { Collapsible } from "./";
import { Button } from "..";

export default {
  title: "Container/Collapsible",
  component: Collapsible,
  tags: ['autodocs'], 
} as Meta<typeof Collapsible>;

const StyledContent = styled("div", {
  padding: "$2",
  fontSize: "$sm"
});

export const Overview: StoryFn<typeof Collapsible> = (args) => {
  return (
    <Flex gap="md" style={{ width: '300px' }}>
      <Collapsible title="Section 1">
        <StyledContent>
          Collapsible Content
        </StyledContent>
      </Collapsible>
    </Flex>
  );
};

export const Controlled: StoryFn<typeof Collapsible> = (args) => {
  const [open, setOpen] = useState(false);
  return (
    <Flex gap="md" style={{ width: '300px' }}>
      <Button>toggle</Button>
      <Collapsible title="Section 1" open={open} onOpenChange={setOpen}>
        <StyledContent>
          Collapsible Content
        </StyledContent>
      </Collapsible>
    </Flex>
  );
};

export const Uncontrolled: StoryFn<typeof Collapsible> = (args) => {
  return (
    <Flex gap="md" style={{ width: '300px' }}>
      <Collapsible title="Section 1">
        <StyledContent>
          Collapsible Content
        </StyledContent>
      </Collapsible>
    </Flex>
  );
};
