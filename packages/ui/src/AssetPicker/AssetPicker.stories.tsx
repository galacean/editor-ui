import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Flex } from "../Flex";
import { AssetItem } from "./AssetItem";
import { styled } from "@galacean/design-system";

export default {
  title: "Display/Asset",
} as Meta;

const Grid = styled("div", {
  display: 'grid',
  gap: '$1',
  width: '100vw',
  justifyContent: 'center',
  padding: '0 40px',
  gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
})

export const Overview: StoryFn = (args) => {
  const [val, setVal] = useState(0);
  const [name, setName] = useState("ScriptController");
  const [selected, setSelected] = useState(false);
  return (
      <AssetItem
        isSelected={selected}
        name={name}
        onClick={() => setSelected(!selected)}
        onRename={(name) => setName(name)}
        thumbnail="https://mdn.alipayobjects.com/huamei_dc3kgb/afts/img/A*rMekSIWSS4oAAAAAAAAAAAAADuiaAQ/original"
      />
  );
}