import React from 'react'
import type { Meta, StoryFn } from '@storybook/react'

import { Flex } from '../Flex'

import { Breadcrumbs } from './'

const items = [
  { id: 'assets', label: 'Assets' },
  { id: 'materials', label: 'Materials' },
  { id: 'car-paint', label: 'Car Paint' },
]

export default {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  argTypes: {
    size: {
      type: {
        name: 'enum',
        value: ['sm', 'md'],
      },
    },
  },
  args: {
    size: 'sm',
    items,
  },
} as Meta<typeof Breadcrumbs>

export const Overview: StoryFn<typeof Breadcrumbs> = (args) => {
  return <Breadcrumbs {...args} />
}

export const Sizes: StoryFn<typeof Breadcrumbs> = (args) => {
  return (
    <Flex direction="column" gap="sm">
      <Breadcrumbs {...args} size="sm" />
      <Breadcrumbs {...args} size="md" />
    </Flex>
  )
}
