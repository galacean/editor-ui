import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { FormItemColor } from "./"
import { Flex } from "@galacean/editor-ui";

export default {
  component: FormItemColor,
} as Meta<typeof FormItemColor>;

export const Overview: StoryFn<typeof FormItemColor> = (args) => {
  const [color, setColor] = useState({
    r: 0,
    g: 0,
    b: 0,
    a: 1
  });
  return (
    <Flex gap="md">
      <FormItemColor
        label="color"
        defaultValue={color}
        onChange={setColor}
      />
    </Flex>
  );
}