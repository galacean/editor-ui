import { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { IconBorderRight } from '@tabler/icons-react'

import { Flex } from '../Flex'

import { InputNumber } from './'
import { Button } from '..'

export default {
  title: 'Inputs/InputNumber',
  component: InputNumber,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      type: {
        name: 'enum',
        value: ['outline', 'soft', 'subtle'],
      },
    },
    state: {
      type: {
        name: 'enum',
        value: ['valid', 'invalid'],
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
    size: 'sm',
    variant: 'soft',
    disabled: false,
  },
} as Meta<typeof InputNumber>

export const Overview: StoryFn<typeof InputNumber> = (args) => {
  return <InputNumber startSlot={<IconBorderRight size="16px" />} placeholder="Variable x..." size="sm" {...args} />
}

export const Controlled: StoryFn<typeof InputNumber> = () => {
  const [val, setVal] = useState(0)

  return (
    <Flex gap="xs">
      <InputNumber variant="soft" size="sm" value={val} onValueChange={setVal} />
      <Button onClick={() => setVal(100)}>Set 100</Button>
      <Button variant="subtle" critical onClick={() => setVal(0)}>
        Reset
      </Button>
    </Flex>
  )
}

export const Uncontrolled: StoryFn<typeof InputNumber> = (args) => {
  return <InputNumber {...args} />
}
