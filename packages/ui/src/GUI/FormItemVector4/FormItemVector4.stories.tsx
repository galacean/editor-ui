import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { FormItemVector4 } from "."
import { Flex } from "../../Flex";

export default {
  component: FormItemVector4,
} as Meta<typeof FormItemVector4>;

export const Overview: StoryFn<typeof FormItemVector4> = (args) => {
  const [val, setVal] = useState(0);
  return (
    <Flex gap="md" style={{ width: '300px' }}>
      <FormItemVector4 name="transform" value={{ x:0, y: 0, width: 0, height: 0 }} />
    </Flex>
  );
}