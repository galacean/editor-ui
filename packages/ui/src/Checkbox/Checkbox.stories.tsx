import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Flex } from "../Flex";
import { Button } from "../Button";

import { Checkbox } from "./";

export default {
  title: "Inputs/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      type: "boolean"
    },
    label: {
      control: "text"
    },
  }
} satisfies Meta<typeof Checkbox>;

export const Uncontrolled: StoryFn<typeof Checkbox> = (args) => {
  return (
    <Flex gap="md">
      <Checkbox {...args} />
    </Flex>
  );
};

export const Controlled: StoryFn<typeof Checkbox> = (args) => {
  const [checked, setChecked] = useState(true);

  return (
    <Flex gap="md">
      <Button
        size="sm"
        onClick={() => {
          setChecked(!checked);
        }}
      >
        toggle check
      </Button>
      <Checkbox checked={checked} onCheckedChange={setChecked} />
    </Flex>
  );
};

export const WithLabel: StoryFn<typeof Checkbox> = (args) => {
  return (
    <Flex gap="md">
      <Checkbox id="transform" label="transform" {...args} />
    </Flex>
  );
};

export const Disabled: Meta<typeof Checkbox> = {
  args: {
    disabled: true
  }
}