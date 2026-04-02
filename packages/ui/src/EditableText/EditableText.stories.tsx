import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'

import { Flex } from '../Flex'

import { EditableText } from '.'

export default {
  title: 'Inputs/EditableText',
  component: EditableText,
} as Meta<typeof EditableText>

export const Overview: StoryFn<typeof EditableText> = (args) => {
  return (
    <Flex gap="md" direction="column">
      <EditableText value="Pam Beesly" {...args} />
      <EditableText value="Jim Halpert" {...args} showIcon />
    </Flex>
  )
}

Overview.argTypes = {
  value: {
    defaultValue: 'inline-name',
  },
}
