import { fn } from '@storybook/test';
import { Button } from '.';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Flex } from '../Flex';
import { IconCircleCheckFilled, IconComponents, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

const meta = {
  title: 'Inputs/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    controls: {
      exclude: ["startSlot", "endSlot", "css"]
    }
  },
  argTypes: {
    children: {
      control: 'text',
    },
    size: {
      type: {
        name: "enum",
        value: ["xs", "sm", "md", "lg"]
      }
    },
    critical: {
      control: 'boolean',
    },
    positive: {
      control: 'boolean',
    }, 
    variant: {
      type: {
        name: "enum",
        value: ["default", "outline", "secondary", "subtle", "subsecondary"]
      },
      control: {
        type: "radio"
      }
    },
  },
  args: {
    children: 'Galacean Button',
    size: "md",
    variant: 'secondary',
    onClick: fn(),
    critical: false,
    positive: false,
  },
} satisfies Meta<typeof Button>

export default meta;

export const Overview: StoryFn = (args) => {
  return (
    <Button {...args} />
  )
}

/** You could add icons or extra actions by using `startSlot` and `endSlot` property */
export const WithSlot: StoryFn = (args) => {
  return (
    <Flex gap="sm">
      <Button
        {...args}
        startSlot={<IconComponents size="15px" strokeWidth={1.5} />}
        variant="default"
      >
        Add Component
      </Button>
      <Button
        {...args}
        startSlot={<IconTrash size="15px" strokeWidth={1.5} />}
        variant="primary"
        critical
      >
        Delete
      </Button>
    </Flex>
  )
}

WithSlot.argTypes = {
  title: {
    type: "boolean"
  }
}

WithSlot.args = {
  title: false
}

/**
 * Sometimes you need to use async function to handle some actions by clicking the button.
 * 
 * In this case, you could use `async: () => Promise<unknown>` property to let the button handle the async status automatically.
 */
export const WithAsyncFunction: StoryFn = (args) => {
  const [done, setDone] = useState(false);
  async function upload() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setDone(true);
  }
  return (
    <Button
      {...args}
      startSlot={
        done && <IconCircleCheckFilled size="14px" />
      }
      positive
      variant="primary"
      async={upload}
      >
        {done ? "Uploaded" : "Upload File"}
    </Button>
  )
}
