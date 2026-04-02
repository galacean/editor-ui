import React from 'react'
import { Meta, StoryFn } from '@storybook/react'

import { Pagination } from './'

export default {
  title: 'Navigation/Pagination',
  tags: ['autodocs'],
  argTypes: {
    size: {
      type: {
        name: 'enum',
        value: ['sm', 'md'],
      },
    },
  },
  component: Pagination,
} as Meta<typeof Pagination>

export const Overview: StoryFn<typeof Pagination> = (args) => {
  return <Pagination {...args} />
}

export const Sizes: StoryFn<typeof Pagination> = (args) => {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <Pagination {...args} size="sm" />
      <Pagination {...args} size="md" />
    </div>
  )
}

Overview.args = {
  totalCount: 10,
  pageSize: 1,
  siblingCount: 3,
  size: 'sm',
}
