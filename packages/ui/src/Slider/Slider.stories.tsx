import { Meta, StoryFn } from "@storybook/react";

import { Slider } from "./";
import { Flex } from "../Flex";

export default {
  title: "Inputs/Slider",
  component: Slider,
  tags: ['autodocs'],
  args: {
    defaultValue: [30],
    step: 1,
    showRuler: false,
    max: 100,
  },
} as Meta<typeof Slider>;

export const Overview = (args) => {
  return (
    <Flex css={{ width: '300px' }}>
      <Slider {...args} />
    </Flex>
  )
}