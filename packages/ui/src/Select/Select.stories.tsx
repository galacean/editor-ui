import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { IconApple, IconCherry, IconFilterUp } from '@tabler/icons-react'

import { Flex } from '../Flex'
import { Button } from '../Button'

import { Select, SelectItem } from './'

export default {
  title: 'Inputs/Select',
  tags: ['autodocs'],
} as Meta<typeof Select>

const mock_data = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'grapes', label: 'Grapes' },
  { value: 'pineapple', label: 'Pineapple' },
]

/**
 * The Select component consist of `<Select>` and `<SelectItem />`, allow users to select one or multiple options from a list of options.
 *
 * A part of this component built on top of the `@radix-ui/react-select`
 *
 * This component provide controlled and uncontrolled modes.
 */
export const Overview: StoryFn<typeof Select> = () => {
  return (
    <div>
      <Flex css={{ width: '260px' }} direction="column" gap="sm">
        <Select size="md" defaultValue="apple" placeholder="Select Fruits..." startSlot={<IconFilterUp size="12px" />}>
          {mock_data.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
        <Select defaultValue="apple" placeholder="Select Fruits..." startSlot={<IconFilterUp size="12px" />}>
          {mock_data.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
        <Select size="xs" defaultValue="apple" placeholder="Select Fruits..." startSlot={<IconFilterUp size="10px" />}>
          {mock_data.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
      </Flex>
    </div>
  )
}

export const Uncontrolled: StoryFn<typeof Select> = () => {
  return (
    <div>
      <Flex css={{ width: '260px' }} direction="column" gap="sm">
        <Select defaultValue="apple" placeholder="Select Fruits...">
          {mock_data.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
      </Flex>
    </div>
  )
}

export const Controlled: StoryFn<typeof Select> = () => {
  const [value, setValue] = React.useState('apple')

  return (
    <div>
      <Flex css={{ width: '260px' }} direction="column" gap="sm">
        <Button onClick={() => setValue('banana')}>Select Banana</Button>
        <Select value={value} onValueChange={setValue} placeholder="Select Fruits...">
          {mock_data.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
      </Flex>
    </div>
  )
}

/**
 * `Select` support both `string` and `number` value types. It will detect the type of the value by default, but we suggest to explicitly define the `valueType` prop for better control.
 */
export const ValueType: StoryFn<typeof Select> = () => {
  const [value0, setValue0] = React.useState(0)
  const [value1, setValue1] = React.useState('apple')

  return (
    <Flex style={{ width: '300px' }} direction="column" gap="xs">
      <Select placeholder="Select Fruits..." valueType="number" value={value0} onValueChange={setValue0}>
        <SelectItem value={0}>Apple - value 0</SelectItem>
        <SelectItem value={1}>Cherry - value 1</SelectItem>
      </Select>

      <Select placeholder="Select Fruits..." valueType="string" value={value1} onValueChange={setValue1}>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </Select>
    </Flex>
  )
}

/**
 * One of the useful feature of the Select component is the ability to define a custom value renderer.
 */
export const CustomValueRenderer: StoryFn<typeof Select> = () => {
  return (
    <Flex style={{ width: '300px' }}>
      <Select placeholder="Select Fruits..." valueType="number">
        <SelectItem value={0}>
          <Flex align="v" gap="xs">
            <IconApple size="14px" /> Apple
          </Flex>
        </SelectItem>
        <SelectItem value={1}>
          <Flex align="v" gap="xs">
            <IconCherry size="14px" /> Cherry
          </Flex>
        </SelectItem>
      </Select>
    </Flex>
  )
}

export const Multiple: StoryFn<typeof Select> = (args: any) => {
  return (
    <Flex style={{ width: '300px' }}>
      <Select valueRenderer={(val) => val} defaultValue={['apple']} placeholder="Select Fruits..." multiple {...args}>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </Select>
    </Flex>
  )
}

Multiple.argTypes = {
  searchable: {
    control: {
      type: 'boolean',
    },
  },
  autoClose: {
    control: {
      type: 'boolean',
    },
  },
}

Multiple.args = {
  searchable: false,

  autoClose: false,

  maxDisplayCount: 2,

  maxDisplayText: '已选择{count}项',
}
