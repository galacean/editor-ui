import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { AssetItem } from "./"
import { Flex } from "../Flex";
import { styled } from "../../design-system";

export default {
  component: AssetItem,
} as Meta<typeof AssetItem>;

const Grid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
  gap: '$1',
  width: '600px',
  height: '400px',
})

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const Overview: StoryFn<typeof AssetItem> = (args) => {
  const [selectedMap, setSelectedMap] = useState<{ [key: string]: boolean }>({});
  return (
    <Grid>
      <AssetItem
        id="1"
        name="spine_person"
        onRename={async (name) => {
          await wait(1000);
          console.log('rename', name);
        }}
        loadingStatus="success"
        thumbnail="https://mdn.alipayobjects.com/huamei_dc3kgb/afts/img/A*q7BUSabi8scAAAAAAAAAAAAADuiaAQ/original"
        selected={selectedMap["1"]}
        onSelectedChange={() => setSelectedMap({ ...selectedMap, "1": true })}
        onDoubleClick={() => {
          console.log('double click')
        }}
      />
      <AssetItem
        id="2"
        name="helper.ts"
        loadingStatus="success"
        thumbnail="https://mdn.alipayobjects.com/huamei_dc3kgb/afts/img/A*rMekSIWSS4oAAAAAAAAAAAAADuiaAQ/original"
        selected={selectedMap["2"]}
        onSelectedChange={() => setSelectedMap({ ...selectedMap, "2": true })}
      />
      <AssetItem
        name="spine_skeleton"
        readOnly
        thumbnail="https://mdn.alipayobjects.com/huamei_dc3kgb/afts/img/A*UnoLR4LjgcEAAAAAAAAAAAAADuiaAQ/original"
      />
      <AssetItem
        name="car_prefab"
        readOnly
        thumbnail="https://mdn.alipayobjects.com/huamei_dc3kgb/afts/img/A*HQs2QrqBTawAAAAAAAAAAAAADuiaAQ/original"
      />
    </Grid>
  );
}