import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Pagination } from "./";

export default {
  component: Pagination
} as Meta<typeof Pagination>;

export const Overview: StoryFn<typeof Pagination> = (args) => {
  return <Pagination {...args} />;
};

Overview.args = {
  totalCount: 10,
  pageSize: 1,
  siblingCount: 3
};
