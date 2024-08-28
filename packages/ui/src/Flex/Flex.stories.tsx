import { Meta, StoryFn } from "@storybook/react";

import { styled } from "@galacean/design-system";

import { Flex } from "./";

const Item = styled(Flex, {
    border: "1px solid $gray5",
    borderRadius: "$2",
    width: "$md",
    height: "$md"
});

export default {
  title: "Container/Flex",
  component: Flex,
  args: {
    gap: "sm",
  }
} as Meta<typeof Flex>;

export const Overview: StoryFn<typeof Flex> = (args) => {
  return (
    <Flex {...args}>
      <Item align="both">F</Item>
      <Item align="both">L</Item>
      <Item align="both">E</Item>
      <Item align="both">X</Item>
    </Flex>
  );
};

Overview.argTypes = {
  gap: {
    type: {
      name: "enum",
      value: ["none", "xs", "sm", "md", "lg"]
    },
    defaultValue: "sm"
  },
  align: {
    type: {
      name: "enum",
      value: ["both", "v", "h"]
    },
    defaultValue: "both"
  },
  end: {
    type: "boolean"
  },
  dir: {
    type: {
      name: "enum",
      value: ["column", "row", "rr", "cr"]
    },
    defaultValue: "both"
  }
};
