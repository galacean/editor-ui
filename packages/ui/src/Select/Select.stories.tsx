import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Icon123, Icon360View } from "@tabler/icons-react";

import { Flex } from "../Flex";

import { Select, SelectItem } from "./";

export default {
  title: "Inputs/Select",
  tags: ["autodocs"],
} as Meta<typeof Select>;

export const Overview: StoryFn<typeof Select> = (args) => {
  const [value, setValue] = React.useState(22);

  const [options, setOptions] = React.useState([
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "blueberry", label: "Blueberry" },
    { value: "grapes", label: "Grapes" },
    { value: "pineapple", label: "Pineapple" }
  ]);

  const handleSearch = async (value) => {
    setTimeout(() => {
      setOptions(options.filter((option) => option.label.toLowerCase().includes(value.toLowerCase())));
    }, 1000);
  };

  return (
    <div>
      <Flex css={{ width: "260px" }} dir="column" gap="sm">
        <Select defaultValue="apple" placeholder="Select Fruits...">
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </Select>
        <Select value={value} onValueChange={setValue} placeholder="Select Fruits..." valueType="number">
          <SelectItem value={11}>Apple</SelectItem>
          <SelectItem value={22}>
            <Flex align="v" wrap={false}>
              <Icon123 /> Banana
            </Flex>
          </SelectItem>
        </Select>
        <Select defaultValue="apple" placeholder="Select Fruits..." multiple>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </Select>
      </Flex>
    </div>
  );
};
