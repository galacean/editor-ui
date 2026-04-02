import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import {
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconAlignJustified,
  IconItalic,
  IconBold,
} from '@tabler/icons-react'

import { Flex } from '../Flex'

import { ToggleGroup, ToggleGroupItem } from './'

export default {
  title: 'Inputs/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  argTypes: {
    size: {
      type: {
        name: 'enum',
        value: ['sm', 'md'],
      },
    },
    variant: {
      type: {
        name: 'enum',
        value: ['primary', 'subtle'],
      },
    },
  },
  args: {
    size: 'sm',
    variant: 'primary',
  },
} as Meta<typeof ToggleGroup>

export const Overview: StoryFn<typeof ToggleGroup> = (args) => {
  return (
    <Flex gap="md">
      <ToggleGroup type="single" {...args}>
        <ToggleGroupItem value="left">
          <IconAlignLeft />
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <IconAlignCenter />
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <IconAlignRight />
        </ToggleGroupItem>
        <ToggleGroupItem value="justify">
          <IconAlignJustified />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" {...args}>
        <ToggleGroupItem value="left">
          <IconItalic />
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <IconBold />
        </ToggleGroupItem>
      </ToggleGroup>
    </Flex>
  )
}

export const Sizes: StoryFn<typeof ToggleGroup> = (args) => {
  return (
    <Flex direction="column" gap="sm">
      <ToggleGroup type="single" {...args} size="sm">
        <ToggleGroupItem value="left">
          <IconAlignLeft />
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <IconAlignCenter />
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <IconAlignRight />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" {...args} size="md">
        <ToggleGroupItem value="left">
          <IconAlignLeft />
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <IconAlignCenter />
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <IconAlignRight />
        </ToggleGroupItem>
      </ToggleGroup>
    </Flex>
  )
}
