import { useState } from "react";
import { Meta } from "@storybook/react";

import { Flex } from "../Flex";
import { Button } from "../Button";

import { CascadeSlider } from "./";

export default {
  title: "Inputs/CascadeSlider",
  tags: ["autodocs"],
  component: CascadeSlider,
  argTypes: {
    value: {
      control: false
    },
    defaultValue: {
      control: false
    },
    onValueChange: {
      control: false
    },
    step: {
      table: {
        defaultValue: { summary: "1" },
      },
      control: {
        type: "number",
      },
    },
    unit: {
      table: {
        defaultValue: { summary: "%" },
      }
    }
  }
} satisfies Meta<typeof CascadeSlider>;

export const Overview = (args) => {
  return (
    <Flex css={{ width: "300px" }}>
      <CascadeSlider
        defaultValue={[20, 50, 100]}
        {...args}
      />
    </Flex>
  );
};

export const Uncontrollable = (args) => {
  return (
    <Flex css={{ width: "300px" }}>
      <CascadeSlider
        {...args}
        defaultValue={[20, 50, 100]}
      />
    </Flex>
  );
};

export const Controllable = (args) => {
  const [value, setValue] = useState([50, 50, 100]);

  const handleChange = () => {
    setValue([100, 100, 100]);
  }
  
  return (
    <Flex gap="sm" css={{ width: "300px" }} dir="column">
      <CascadeSlider
        value={value}
        onValueChange={setValue}
        unit="m"
      />
      <Button size="sm" variant="secondary" onClick={handleChange}>click</Button>
    </Flex>
  );
};