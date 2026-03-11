import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'

import { Flex } from '../Flex'

import { Spin } from './'

export default {
  title: 'Display/Spin',
  component: Spin,
  tags: ['autodocs'],
  argTypes: {
    color: {
      type: {
        name: 'enum',
        value: ['primary', 'default', 'inherit'],
      },
    },
    size: {
      type: {
        name: 'enum',
        value: ['xs', 'sm', 'md'],
      },
    },
  },
  args: {
    color: 'primary',
    size: 'md',
  },
} as Meta<typeof Spin>

export const Overview: StoryFn<typeof Spin> = (args) => {
  return (
    <Flex gap="md">
      <Spin {...args}></Spin>
      <div style={{ color: 'var(--colors-gray12)' }}>
        <Spin {...args} color="inherit"></Spin>
      </div>
    </Flex>
  )
}

export const Sizes: StoryFn<typeof Spin> = (args) => {
  return (
    <Flex gap="sm" align="v">
      <Spin {...args} size="xs" />
      <Spin {...args} size="sm" />
      <Spin {...args} size="md" />
    </Flex>
  )
}
