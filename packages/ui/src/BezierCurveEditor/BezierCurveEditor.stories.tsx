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
