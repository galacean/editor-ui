import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { IconVariable } from "@tabler/icons-react";

import { Flex } from "../Flex";

import { InputNumber } from "./";
import { Button } from "..";

export default {
  title: "Inputs/InputNumber",
  component: InputNumber,
  tags: ["autodocs"],
} as Meta<typeof InputNumber>;

export const Overview: StoryFn<typeof InputNumber> = (args) => {
  return (
    <InputNumber
      startSlot={
        <IconVariable size="12px" />
      }
      placeholder="Variable x..."
      size="sm"
      {...args}
    />
  );
};

export const Controlled: StoryFn<typeof InputNumber> = () => {
  const [val, setVal] = useState(0);

  return (
    <Flex gap="xs">
      <InputNumber
        variant="default"
        size="sm"
        value={val}
        onValueChange={setVal}
      />
      <Button onClick={() => setVal(100)}>Set 100</Button>
      <Button variant="subsecondary" critical onClick={() => setVal(0)}>Reset</Button>
    </Flex>
  )
}

export const Uncontrolled: StoryFn<typeof InputNumber> = (args) => {
  return (
    <InputNumber />
  )
}
