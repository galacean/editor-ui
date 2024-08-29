import { Meta, StoryFn } from "@storybook/react";

import { styled } from "@galacean/design-system";

import { Flex } from "./";

const Item = styled(Flex, {
  boxShadow: "inset 0 0 0 1px $colors$border",
  backgroundColor: '$blueA3',
  borderRadius: "$3",
  width: "48px",
  height: "48px",
  fontFamily: '$mono',
  color: '$gray11',
  '&:nth-child(odd)': {
    height: '64px',
  }
});

export default {
  title: "Container/Flex",
  component: Flex,
  argTypes: {
    gap: {
      type: {
        name: "enum",
        value: ["none", "xs", "sm", "md", "lg"]
      }
    },
    align: {
      type: {
        name: "enum",
        value: ["both", "vertical", "horizontal"]
      },
    },
    justifyContent: {
      type: {
        name: "enum",
        value: ["center", "between", "around", "end"]
      },
    },
    direction: {
      type: {
        name: "enum",
        value: ["column", "row", "row-reverse", "column-reverse"]
      },
      defaultValue: "both"
    }
  },
  args: {
    gap: "sm",
    direction: 'row'
  }
} as Meta<typeof Flex>;

export const Overview: StoryFn<typeof Flex> = (args) => {
  return (
    <Flex {...args}>
      {[...Array(8)].map((_, i) => <Item key={i} align="both" />)}
    </Flex>
  );
};
