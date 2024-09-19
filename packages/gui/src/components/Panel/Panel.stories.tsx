import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Panel } from "./"

export default {
  component: Panel,
} as Meta<typeof Panel>;

export const Overview: StoryFn<typeof Panel> = (args) => {
  const [val, setVal] = useState(0);
  return (
    <Panel>
      Panel Content
    </Panel>
  );
}