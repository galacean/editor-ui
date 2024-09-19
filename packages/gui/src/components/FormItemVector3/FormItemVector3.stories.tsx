import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { FormItemVector3 } from "."

import { Flex } from "@galacean/editor-ui";

export default {
  title: "GUI/FormItemVector3",
  component: FormItemVector3,
} as Meta<typeof FormItemVector3>;

export const Overview: StoryFn<typeof FormItemVector3> = (args) => {
  const [val, setVal] = useState(0);
  return (
    <Flex gap="md" style={{ width: '300px' }}>
      <FormItemVector3 label="transform" value={{ x:0, y: 0, z: 0 }} constrainable />
    </Flex>
  );
}