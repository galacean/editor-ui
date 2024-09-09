import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Flex } from "../Flex";

import { BezierCurveEditor } from "./";

export default {
  title: "Inputs/BezierCurveEditor",
  component: BezierCurveEditor
} as Meta<typeof BezierCurveEditor>;

export const Overview: StoryFn<typeof BezierCurveEditor> = (args) => {
  return (
    <Flex gap="md">
      <BezierCurveEditor algo="bezier" />
    </Flex>
  );
};

export const Controlled: StoryFn<typeof BezierCurveEditor> = (args) => {
  const [points, setPoints] = useState([
    { x: 0, y: 0 },
    { x: 0.15, y: 0.15 },
    { x: 0.75, y: 0.75 },
    { x: 1, y: 1 }
  ]);
  return (
    <Flex gap="md">
      <BezierCurveEditor algo="bezier" value={points} onChange={setPoints} />
    </Flex>
  );
};

export const Uncontrolled: StoryFn<typeof BezierCurveEditor> = (args) => {
  return (
    <Flex gap="md">
      <BezierCurveEditor algo="bezier" />
    </Flex>
  );
};
