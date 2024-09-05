import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { FormItemRect } from "."
import { Flex } from "../../Flex";

export default {
  component: FormItemRect,
} as Meta<typeof FormItemRect>;

export const Overview: StoryFn<typeof FormItemRect> = (args) => {
  const [value, setValue] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  return (
    <Flex gap="md" style={{ width: '300px' }}>
      <FormItemRect name="transform" value={value} onChange={(v) => setValue(v)} />
    </Flex>
  );
}