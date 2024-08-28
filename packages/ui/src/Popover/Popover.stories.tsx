import React, { useState, useEffect } from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Flex } from "../Flex";
import { Button } from "../Button";

import { Popover } from "./";

export default {
  title: "Display/Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {
    side: {
      type: {
        name: "enum",
        value: ["top", "right", "bottom", "left"]
      }
    },
    align: {
      type: {
        name: "enum",
        value: ["start", "center", "end"]
      }
    },
    sideOffset: {
      type: "number",
      defaultValue: 8
    }
  }
} as Meta<typeof Popover>;

function PopoverContent() {
  useEffect(() => {
    console.log("mount");
    return () => {
      console.log("unmount");
    };
  }, []);

  return (
    <div>
      <p>Popover content</p>
    </div>
  );
}

export const Overview: StoryFn<typeof Popover> = (args) => {
  return (
    <Flex gap="md">
      <Popover {...args} trigger={<Button size="sm">Click to show the Popover</Button>}>
        <PopoverContent />
      </Popover>
    </Flex>
  );
};
