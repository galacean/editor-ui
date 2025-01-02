import React from "react";
import { Meta, StoryFn, StoryObj } from "@storybook/react";

import { Flex } from "../Flex";

import { KbdGroup as PrimitiveKbdGroup, Kbd } from ".";

export default {
  title: "Display/Kbd",
  component: Kbd,
  tags: ['autodocs'],
  args: {
    uppercase: false,
  }
} as Meta<typeof Kbd>;

type Story = StoryObj<typeof Kbd>;

export const Overview: Story = {
  args: {
    children: "D"
  },
};

/**
 * The color of the Kbd component is inherited from the parent element. 
 */
export const KbdColor: StoryFn = () => {
  return (
    <Flex gap="xs" align="v">
      <div>
        <Kbd>shift</Kbd>
      </div>
      <div style={{ color: 'var(--colors-red10)' }}>
        <Kbd>Delete</Kbd>
      </div>
      <div style={{ color: 'var(--colors-gray10)' }}>
        <Kbd>Command</Kbd>
      </div>
    </Flex>
  )
}

/**
 * The best way to display multiple keyboard shortcuts is to use the `<KbdGroup />` component.
 */
export const KbdGroup = () => {
  return (
    <Flex gap="sm" style={{ color: 'var(--colors-gray11)' }}>
      <PrimitiveKbdGroup shortcuts={["shift", "d"]} />
      <PrimitiveKbdGroup shortcuts={["⇧", "d"]} />
      <PrimitiveKbdGroup shortcuts="⌘+d+f" />
      <PrimitiveKbdGroup shortcuts="backspace" />
      <PrimitiveKbdGroup shortcuts="⌘+d,backspace" />
    </Flex>
  );
}
