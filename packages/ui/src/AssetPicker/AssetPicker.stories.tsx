import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Flex } from "../Flex";
import { AssetItem } from "./AssetItem";

export default {
  title: "Display/Asset",
} as Meta;

export const Overview: StoryFn = (args) => {
  const [val, setVal] = useState(0);
  return (
    <Flex gap="md">
      <AssetItem
        name="ScriptController"
        thumbnail="https://mdn.alipayobjects.com/huamei_dc3kgb/afts/img/A*rMekSIWSS4oAAAAAAAAAAAAADuiaAQ/original"
      />
    </Flex>
  );
}