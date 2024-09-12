import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Flex } from "../../Flex";
import { Panel } from "../Panel";

import {
  FormItemInput,
  FormItemInputNumber,
  FormItemColor,
  FormItemSlider,
  FormItemButton,
  FormItemRect,
  FormItemVector2,
  FormItemVector3,
  FormItemVector4,
  FormItemSegmentControl,
  FormItemToggle,
  // FormItemToggleGroup,
  FormItemTextarea,
  FormItemArray,
  FormItemGroup,
  FormItemSelect,
  // FormItemEntityPicker
} from "..";

export default {
  title: "GUI/Overview",
} as Meta;

export const Overview: StoryFn = (args) => {
  const [val, setVal] = useState(0);
  return (
    <Flex gap="md">
      <Panel>
          {/* <FormItemParticleProperty label="gravity" /> */}
          <FormItemInput value="name" />
          {/* <FormItemGroup label="Transform">
            <Flex gap="xs" direction="column">
              <FormItemVector3 label="Position" value={{ x: 1, y: 2, z: 4 }}  />
              <FormItemVector3 label="Rotation" value={{ x: 1, y: 2, z: 4 }}  />
              <FormItemVector3 label="Scale" value={{ x: 1, y: 2, z: 4 }} constrainable />
            </Flex>
          </FormItemGroup> */}
          <FormItemInputNumber value={10} label="number" min={10} />
          <FormItemSelect label="Layer" value={0}
            options={[
              { label: "Layer1", value: 0 },
              { label: "Layer2", value: 1 },
              { label: "Layer3", value: 2 },
              { label: "Layer4", value: 3 }
            ]}
          />
          <FormItemSlider value={20} label="age" />
          <FormItemColor label="color" value={{ r: 0.1, g: 0.1, b: 0.1, a: 1 }} />
          <FormItemButton label="button">click</FormItemButton>
          <FormItemRect label="rect" value={{ x: 1, y: 2, width: 3, height: 5 }} />
          <FormItemVector2 label="rect2" value={{ x: 1, y: 2 }} />
          <FormItemVector3 label="rect3" value={{ x: 1, y: 2, z: 4 }} constrainable />
          {/* <FormItemEntityPicker label="entity" value={null} /> */}
          <FormItemVector4 label="rect4" value={{ x: 1, y: 2, z: 4, w: 4 }} />
          <FormItemSegmentControl
            label="segment"
            value="label1"
            options={[
              { label: "label1", value: "label1" },
              { label: "label2", value: "label2" },
              { label: "label3", value: "label3" },
              { label: "label4", value: "label4" }
            ]}
          />
          <FormItemToggle label="boolean" value={true} />
          {/* <FormItemToggleGroup
            type="multiple"
            label="boolean"
            value={["X", "str2"]}
            options={[
              { label: "X", value: "X" },
              { label: "Y", value: "Y" }
            ]}
          /> */}
          <FormItemTextarea label="textarea" value="code" />
          <FormItemArray label="array" items={[{ id: 1, name: "item1", removable: true, children: null }]} addable />
      </Panel>
    </Flex>
  );
}