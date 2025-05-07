import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'

import { styled } from '../design-system'

import { ScrollArea } from './'
import { Flex } from '../'

const Item = styled(Flex, {
  boxShadow: 'inset 0 0 0 1px $colors$border',
  backgroundColor: '$blueA3',
  borderRadius: '$3',
  width: '100%',
  height: '48px',
  fontFamily: '$mono',
  color: '$gray11',
  marginBottom: '$2',
})

const TestContainer = styled('div', {
  width: '200px',
  height: '200px',
  padding: '$0_5',
  backgroundColor: '$gray2',
  border: '1px solid $grayA5',
  borderRadius: '$3',
})


export default {
  title: 'Container/ScrollArea',
  component: ScrollArea,
} as Meta<typeof ScrollArea>

export const Overview: StoryFn<typeof ScrollArea> = (args) => {
  return (
    <TestContainer>
      <ScrollArea {...args}>
        {[...Array(8)].map((_, i) => (
          <Item key={i} align="both" />
        ))}
      </ScrollArea>
    </TestContainer>
  )
}
