import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Flex } from "../Flex";

import { InputNumber } from "./";

export default {
  title: "Inputs/InputNumber",
  component: InputNumber,
  tags: ["autodocs"],
} as Meta<typeof InputNumber>;

export const Overview: StoryFn<typeof InputNumber> = (args) => {
  const [val, setVal] = useState(0);
  return (
    <Flex gap="md">
      <InputNumber placeholder="Transform position" label="Uncontrolled" size="sm" />
      <InputNumber placeholder="Transform position" label="Uncontrolled" />
      <InputNumber placeholder="Transform position" label="Uncontrolled" disabled />
      <InputNumber
        label="Controlled"
        value={val}
        onValueChange={(v) => {
          console.log(v)
          setVal(v);
        }}
        onBlur={(e) => {
          console.log("onblur", e.target.value);
        }}
      />
    </Flex>
  );
};

export const Controlled: StoryFn<typeof InputNumber> = (args) => {
  const [val, setVal] = useState(0);

  return (
    <InputNumber
      label="Controlled"
      max={10}
      value={val}
      onValueChange={(v) => {
        setVal(v);
      }}
      onBlur={(e) => {
        console.log("onblur", e.target.value);
      }}
    />
  )
}

export const Uncontrolled: StoryFn<typeof InputNumber> = (args) => {
  return (
    <InputNumber label="Uncontrolled" />
  )
}
