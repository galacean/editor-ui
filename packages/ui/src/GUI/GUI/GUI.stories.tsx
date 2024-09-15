import React, { useEffect, useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Flex } from "../../Flex";

import { GUIItemConfig, GUIItemTypeEnum, GUI } from './GUI'
import { Textarea } from "../../Textarea";
import { Button } from "../../Button";

export default {
  title: "GUI/Commands"
} as Meta;

class TestData {
  _name: string = 'test'

  constructor() {
    this.name = 'test'
  }

  get name() {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}

const testData = new TestData();

const testItems: GUIItemConfig[] = [
  {
    bindPath: "name",
    label: "Name",
    type: GUIItemTypeEnum.Input,
  },
  {
    bindPath: 'rotation',
    label: 'Rotation',
    type: GUIItemTypeEnum.Vector3,
  }
]


export const Overview = (args) => {
  const guiRef = React.useRef<GUI>(null)
  useEffect(() => {
    const gui = new GUI(testData, testItems)
    guiRef.current = gui
  }, [])
  
  return (
    <Flex gap="md">
      <Textarea value={testData.name} />
      <Button
        onClick={() => {
          guiRef.current.setTheme('light')
        }}
      >light theme</Button>
      <Button onClick={
        () =>{
          guiRef.current.setTheme('dark')
        }
      }>dark theme</Button>
    </Flex>
  );
}