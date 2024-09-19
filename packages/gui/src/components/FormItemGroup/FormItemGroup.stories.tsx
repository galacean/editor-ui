import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { FormItemGroup } from "./"
import { Flex } from "@galacean/editor-ui";

export default {
  component: FormItemGroup,
} as Meta<typeof FormItemGroup>;

export const Overview: StoryFn<typeof FormItemGroup> = (args) => {
  const [val, setVal] = useState(0);
  return (
    <Flex gap="md">
      <FormItemGroup label="transform">
      </FormItemGroup>
    </Flex>
  );
}