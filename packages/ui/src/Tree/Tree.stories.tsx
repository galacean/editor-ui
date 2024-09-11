import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Flex } from "../Flex";

export default {
  title: "Display/Tree"
} as Meta;

/**
 * Tree component might be the most complex component in the React UI library. People have different data structure, different data flow solution like observable or immutable, and different ways to interact with the tree.
 * For that, We don't provide a complete tree component like Ant Design or Material-UI which will have constant rule for define tree data. Instead, we provide a set of low-level styled components and some hooks to help you build your own tree component.
 * You could combine these components according with your actual requirement.
 * 
 * Mostly, a tree component will have these features:
 * 
 * - Drag and drop (reorder, move)
 * - Rename
 * - Delete
 * - Add
 * - Search and filter
 * - Expand and collapse
 * - Selection or multi-selection
 * - Context menu
 * - Customizable style
 * - Customizable data structure
 * - Start slot for custom icon, badge, etc.
 * - End slot for operation buttons
 * - Customizable item content
 */
export const Overview = (args) => {
  const [val, setVal] = useState(0);
  return (
    <Flex gap="md">
      
    </Flex>
  );
}