import { Meta, StoryFn } from "@storybook/react";

import { styled } from "@galacean/design-system";

import { Grid } from "./";

const Item = styled(Grid, {
    border: "1px solid $gray5",
    borderRadius: "$2",
    width: "$md",
    height: "$md"
});

export default {
  title: "Container/Grid",
  component: Grid
} as Meta<typeof Grid>;

export const Overview: StoryFn<typeof Grid> = (args) => {
  return (
    <Grid {...args}>
      <Item>F</Item>
      <Item>L</Item>
      <Item>E</Item>
      <Item>X</Item>
    </Grid>
  );
};
