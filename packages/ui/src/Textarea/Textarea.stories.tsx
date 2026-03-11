import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'

import { Flex } from '../Flex'

import { Textarea } from './'

export default {
  title: 'Inputs/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      type: {
        name: 'enum',
        value: ['outline', 'soft', 'subtle'],
      },
    },
    size: {
      type: {
        name: 'enum',
        value: ['sm', 'md'],
      },
    },
    state: {
      type: {
        name: 'enum',
        value: ['valid', 'invalid'],
      },
    },
  },
  args: {
    placeholder: 'Just input something...',
    variant: 'soft',
    size: 'sm',
  },
} as Meta<typeof Textarea>

export const Overview: StoryFn<typeof Textarea> = (args) => {
  return (
    <Flex gap="sm" style={{ width: '200px' }}>
      <Textarea {...args} variant="outline" />
      <Textarea {...args} variant="soft" />
      <Textarea {...args} variant="subtle" />
    </Flex>
  )
}

export const Sizes: StoryFn<typeof Textarea> = (args) => {
  return (
    <Flex direction="column" gap="sm" style={{ width: '260px' }}>
      <Textarea {...args} size="sm" placeholder="Small textarea" />
      <Textarea {...args} size="md" placeholder="Medium textarea" />
    </Flex>
  )
}

export const States: StoryFn<typeof Textarea> = (args) => {
  return (
    <Flex direction="column" gap="sm" style={{ width: '260px' }}>
      <Textarea {...args} variant="outline" placeholder="Outline valid" state="valid" />
      <Textarea {...args} variant="soft" placeholder="Soft invalid" state="invalid" />
      <Textarea {...args} variant="subtle" placeholder="Subtle disabled" disabled />
    </Flex>
  )
}

export const Matrix: StoryFn<typeof Textarea> = () => {
  return (
    <Flex direction="column" gap="sm" style={{ width: '320px' }}>
      <Textarea variant="outline" placeholder="Outline default" />
      <Textarea variant="outline" placeholder="Outline valid" state="valid" />
      <Textarea variant="outline" placeholder="Outline invalid" state="invalid" />
      <Textarea variant="soft" placeholder="Soft default" />
      <Textarea variant="soft" placeholder="Soft valid" state="valid" />
      <Textarea variant="soft" placeholder="Soft invalid" state="invalid" />
      <Textarea variant="subtle" placeholder="Subtle default" />
      <Textarea variant="subtle" placeholder="Subtle disabled" disabled />
    </Flex>
  )
}
