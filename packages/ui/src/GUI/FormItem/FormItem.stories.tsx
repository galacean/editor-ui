import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { FormItem } from "./"
import { Button, Flex } from "../../";

export default {
  component: FormItem,
} as Meta<typeof FormItem>;

export const Overview: StoryFn<typeof FormItem> = (args) => {
  const [val, setVal] = useState(0);
  return (
    <Flex gap="md">
      <FormItem name="position">
        <Button>hello</Button>
      </FormItem>
    </Flex>
  );
}