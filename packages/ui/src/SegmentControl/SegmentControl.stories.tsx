import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'

import { Flex } from '../Flex'
import { Button } from '../Button'

import { SegmentControl, SegmentControlItem } from './'

export default {
  title: 'Inputs/SegmentControl',
  tags: ['autodocs'],
  argTypes: {
    size: {
      type: {
        name: 'enum',
        value: ['sm', 'md', 'lg'],
      },
    },
  },
} as Meta<typeof SegmentControl>

/**
 * `<SegmentControl />` consist of `<SegmentControl />` and `<SegmentControlItem />`. You could used to switch between different states.
 *
 * This component built on top of the `@radix-ui/react-radio-group`
 *
 * This component provide controlled and uncontrolled modes.
 */
export const Overview: StoryFn<typeof SegmentControl> = (args) => {
  return (
    <Flex gap="md">
      <SegmentControl defaultValue="enable" {...args}>
        <SegmentControlItem value="enable">Enable</SegmentControlItem>
        <SegmentControlItem value="idle">Idle</SegmentControlItem>
        <SegmentControlItem value="disable">Disable</SegmentControlItem>
      </SegmentControl>
    </Flex>
  )
}

export const Uncontrolled: StoryFn<typeof SegmentControl> = (args) => {
  return (
    <Flex gap="md">
      <SegmentControl defaultValue="enable" {...args}>
        <SegmentControlItem value="enable">Enable</SegmentControlItem>
        <SegmentControlItem value="idle">Idle</SegmentControlItem>
        <SegmentControlItem value="disable">Disable</SegmentControlItem>
      </SegmentControl>
    </Flex>
  )
}

export const Controlled: StoryFn<typeof SegmentControl> = (args) => {
  const [value, setValue] = useState('enable')
  return (
    <Flex gap="md">
      <Button onClick={() => setValue('enable')}>Enable</Button>
      <SegmentControl value={value} onValueChange={setValue} {...args}>
        <SegmentControlItem value="enable">Enable</SegmentControlItem>
        <SegmentControlItem value="idle">Idle</SegmentControlItem>
        <SegmentControlItem value="disable">Disable</SegmentControlItem>
      </SegmentControl>
    </Flex>
  )
}
