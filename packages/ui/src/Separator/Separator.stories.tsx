import React from 'react'
import { Meta, StoryFn } from '@storybook/react'

import { Separator } from '.'
import { Flex } from '../Flex'
import { Button } from '../Button'
import { Text } from '../Typography'

export default {
  title: 'Display/Separator',
  component: Separator,
  tags: ['autodocs'],
} as Meta<typeof Separator>

export const Overview: StoryFn<typeof Separator> = (args) => {
  return (
    <Flex gap="md" style={{ width: '100%', height: '28px' }}>
      <Button variant="soft">Left</Button>
      <Separator orientation="vertical" />
      <Button variant="soft">Right</Button>
    </Flex>
  )
}

export const WithText: StoryFn<typeof Separator> = () => {
  return (
    <Flex direction="column" gap="md" style={{ width: '320px' }}>
      <Separator text="Lighting" />
      <Text secondary size="2">
        Group separators should stay quiet and structural instead of competing with surrounding controls.
      </Text>
    </Flex>
  )
}
