import { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'

import { Slider } from './'
import { Flex } from '../Flex'
import { Button } from '..'

export default {
  title: 'Inputs/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    size: {
      type: {
        name: 'enum',
        value: ['xs', 'sm'],
      },
    },
    orientation: {
      type: {
        name: 'enum',
        value: ['horizontal', 'vertical'],
      },
    },
    defaultValue: {
      description: 'The default value of the slider. Use this if you want an uncontrolled component.',
    },
    step: {
      description:
        "The step size for each thumb movement. This defines the granularity of the slider's value increments.",
      table: {
        defaultValue: { summary: '1' },
      },
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
    size: 'sm',
    orientation: 'horizontal',
  },
} as Meta<typeof Slider>

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
  const [value, setValue] = useState([30])
  return (
    <Flex css={{ width: '300px' }} gap="sm">
      <Button onClick={() => setValue([50])}>Set to 50</Button>
      <Slider {...args} value={value} onValueChange={setValue} />
    </Flex>
  )
}

export const Sizes = (args) => {
  return (
    <Flex css={{ width: '300px' }} direction="column" gap="sm">
      <Slider {...args} size="xs" />
      <Slider {...args} size="sm" />
    </Flex>
  )
}

export const Vertical = (args) => {
  return (
    <Flex css={{ height: '200px' }} gap="lg">
      <Slider {...args} orientation="vertical" defaultValue={[30]} />
      <Slider {...args} orientation="vertical" defaultValue={[50]} size="xs" />
    </Flex>
  )
}

export const Disabled = (args) => {
  return (
    <Flex css={{ width: '300px' }} direction="column" gap="sm">
      <Slider {...args} disabled defaultValue={[30]} />
      <Slider {...args} disabled defaultValue={[30]} compact />
    </Flex>
  )
}

export const Compact = (args) => {
  return (
    <Flex css={{ width: '300px' }} direction="column" gap="sm">
      <Slider {...args} compact />
      <Slider {...args} compact defaultValue={[30, 60]} />
    </Flex>
  )
}

export const WithRuler = (args) => {
  return (
    <Flex css={{ width: '300px' }} direction="column" gap="lg">
      <Slider {...args} showRuler />
    </Flex>
  )
}

export const VerticalWithRuler = (args) => {
  return (
    <Flex css={{ height: '200px' }} gap="lg">
      <Slider {...args} orientation="vertical" showRuler defaultValue={[30]} />
    </Flex>
  )
}
