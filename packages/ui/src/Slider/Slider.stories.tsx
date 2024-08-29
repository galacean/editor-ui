import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Slider } from "./";
import { Flex } from "../Flex";
import { Button } from "..";

export default {
  title: "Inputs/Slider",
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      description: 'The default value of the slider. Use this if you want an uncontrolled component.',
    },
    step: {
      description: 'The step size for each thumb movement. This defines the granularity of the slider\'s value increments.',
      table: {
        defaultValue: { summary: "1" },
      }
    },
    startSlot: {
      control: false,
    },
    endSlot: {
      control: false,
    },
  },
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

export const MultiValue = (args) => {
  return (
    <Flex css={{ width: '300px' }}>
      <Slider {...args} defaultValue={[30, 60]} />
    </Flex>
  )
}

export const Uncontrolled = (args) => {
  return (
    <Flex css={{ width: '300px' }}>
      <Slider {...args} />
    </Flex>
  )
}

export const Controlled = (args) => {
  const [value, setValue] = useState([30]);
  return (
    <Flex css={{ width: '300px' }} gap="sm">
      <Button onClick={() => setValue([50])}>Set to 50</Button>
      <Slider {...args} value={value} onValueChange={setValue} />
    </Flex>
  )
}