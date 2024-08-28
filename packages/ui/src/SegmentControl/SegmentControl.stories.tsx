import { Meta, StoryFn } from "@storybook/react";

import { Flex } from "../Flex";

import { SegmentControl, SegmentControlItem } from "./";

export default {
  title: "Inputs/SegmentControl",
  tags: ["autodocs"],
} as Meta<typeof SegmentControl>;

export const Overview: StoryFn<typeof SegmentControl> = (args) => {
  return (
    <Flex gap="md">
      <SegmentControl defaultValue="enable">
        <SegmentControlItem value="enable">Enable</SegmentControlItem>
        <SegmentControlItem value="idle">Idle</SegmentControlItem>
        <SegmentControlItem value="disable">Disable</SegmentControlItem>
      </SegmentControl>
    </Flex>
  );
};
