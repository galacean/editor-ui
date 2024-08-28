import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { GalaceanLogo } from "./GalaceanLogo"
import { Flex } from "../Flex";

export default {
  title: "Symbols/GalaceanLogo",
} as Meta;

export const Overview: StoryFn = () => {
  return (
    <GalaceanLogo style={{ fill: 'white' }} />
  );
}