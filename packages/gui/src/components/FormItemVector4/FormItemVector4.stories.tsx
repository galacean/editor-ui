import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { FormItemVector4 } from "."
import { Flex } from "@galacean/editor-ui";

export default {
  component: FormItemVector4,
} as Meta<typeof FormItemVector4>;

export const Overview: StoryFn<typeof FormItemVector4> = (args) => {
  const [val, setVal] = useState(0);
  return (
    <Flex gap="md" style={{ width: '300px' }}>
      <FormItemVector4 label="transform" value={{ x:0, y: 0, z: 0, w: 0 }} />
    </Flex>
  );
}