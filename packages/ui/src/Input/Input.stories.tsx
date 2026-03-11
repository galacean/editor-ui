import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { IconSearch, IconCopyCheckFilled, IconChevronDown } from '@tabler/icons-react'

import { Badge } from '../Badge'
import { Flex } from '../Flex'
import { DropdownMenu, MenuItem } from '../Menu'

import { Input } from './'
import { styled } from '../design-system'

export default {
  title: 'Inputs/Input',
  component: Input,
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
        value: ['xs', 'sm', 'md'],
      },
    },
  },
  args: {
    placeholder: 'Search the components...',
    size: 'sm',
    variant: 'soft',
    disabled: false,
  },
} as Meta<typeof Input>

export const Overview: StoryFn<typeof Input> = (args) => {
  return (
    <Flex direction="column" gap="md" css={{ width: '400px' }}>
      <Input
        startSlot={<IconSearch height={12} width={12} />}
        placeholder="Search the components..."
        size="sm"
        {...args}
      />
    </Flex>
  )
}

export const Sizes: StoryFn<typeof Input> = (args) => {
  return (
    <Flex direction="column" gap="sm" css={{ width: '400px' }}>
      <Input {...args} size="xs" placeholder="Extra small input" startSlot={<IconSearch size="12px" />} />
      <Input {...args} size="sm" placeholder="Small input" startSlot={<IconSearch size="12px" />} />
      <Input {...args} size="md" placeholder="Medium input" startSlot={<IconSearch size="14px" />} />
    </Flex>
  )
}

export const States: StoryFn<typeof Input> = (args) => {
  return (
    <Flex direction="column" gap="sm" css={{ width: '400px' }}>
      <Input {...args} variant="outline" placeholder="Outline input" startSlot={<IconSearch size="12px" />} />
      <Input {...args} variant="soft" placeholder="Soft input" startSlot={<IconSearch size="12px" />} />
      <Input {...args} state="valid" placeholder="Valid input" startSlot={<IconSearch size="12px" />} />
      <Input {...args} state="invalid" placeholder="Invalid input" startSlot={<IconSearch size="12px" />} />
      <Input {...args} variant="subtle" placeholder="Subtle input" startSlot={<IconSearch size="12px" />} />
      <Input {...args} disabled placeholder="Disabled input" startSlot={<IconSearch size="12px" />} />
    </Flex>
  )
}

export const compositeState: StoryFn<typeof Input> = (args) => {
  return (
    <Flex direction="column" gap="md" css={{ width: '420px' }}>
      <Input {...args} variant="outline" placeholder="Outline default" startSlot={<IconSearch size="12px" />} />
      <Input {...args} variant="soft" placeholder="Soft default" startSlot={<IconSearch size="12px" />} />
      <Input {...args} variant="subtle" placeholder="Subtle default" startSlot={<IconSearch size="12px" />} />
      <Input
        {...args}
        variant="outline"
        state="valid"
        placeholder="Outline valid"
        startSlot={<IconSearch size="12px" />}
      />
      <Input {...args} variant="soft" state="valid" placeholder="Soft valid" startSlot={<IconSearch size="12px" />} />
      <Input
        {...args}
        variant="subtle"
        state="invalid"
        placeholder="Subtle invalid"
        startSlot={<IconSearch size="12px" />}
      />
      <Input
        {...args}
        variant="outline"
        disabled
        placeholder="Outline disabled"
        startSlot={<IconSearch size="12px" />}
      />
      <Input {...args} variant="soft" disabled placeholder="Soft disabled" startSlot={<IconSearch size="12px" />} />
      <Input {...args} variant="subtle" disabled placeholder="Subtle disabled" startSlot={<IconSearch size="12px" />} />
    </Flex>
  )
}

/**
 * You could use the `startSlot` or `endSlot` props to add an icon or any other element to the input.
 */
export const Slot: StoryFn<typeof Input> = (args) => {
  return (
    <Flex direction="column" gap="md" css={{ width: '400px' }}>
      <Input startSlot={<IconSearch size="12px" />} placeholder="Search the components..." size="sm" {...args} />
      <Input placeholder="Search the components..." size="sm" {...args} endSlot={<IconCopyCheckFilled size="12px" />} />
      <Input
        placeholder="Search the components..."
        size="sm"
        {...args}
        startSlot={
          <Badge color="orange" style={{ marginLeft: '-3px' }}>
            Danger
          </Badge>
        }
      />
    </Flex>
  )
}

const CustomTrigger = styled(Flex, {
  padding: '0 $2',
  gap: '$1',
  color: '$gray10',
  alignItems: 'center',
  borderRight: '1px solid $grayA3',
  cursor: 'pointer',
  userSelect: 'none',
  '&:hover': {
    color: '$gray11',
  },
})

const DropdownAction = () => {
  return (
    <DropdownMenu
      trigger={
        <CustomTrigger>
          Action
          <IconChevronDown size="12px" />
        </CustomTrigger>
      }>
      <MenuItem name="Copy" />
      <MenuItem name="Download" />
      <MenuItem name="Delete" critical />
    </DropdownMenu>
  )
}

/**
 * The Input will wrap the `startSlot` and `endSlot` with a styled slot container by default. If you want to override the slot style, you can set the `overrideStartSlotStyle` or `overrideEndSlotStyle` to `true`.
 */
export const OverrideSlotStyle: StoryFn<typeof Input> = (args) => {
  return (
    <Flex direction="column" gap="md" css={{ width: '400px' }}>
      <Input
        startSlot={<DropdownAction />}
        overrideStartSlotStyle
        placeholder="Search the components..."
        size="sm"
        {...args}
      />
    </Flex>
  )
}
