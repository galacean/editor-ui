import { Meta, StoryFn } from "@storybook/react";
import { IconSearch, IconCopyCheckFilled, IconMenu3, IconChevronDown } from "@tabler/icons-react";

import { Badge } from "../Badge";
import { Flex } from "../Flex";
import { DropdownMenu, MenuItem } from "../Menu";

import { Input } from "./";
import { ActionButton } from "../ActionButton";
import { styled } from "@galacean/design-system";

export default {
  title: "Inputs/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      type: {
        name: "enum",
        value: ["default", "subtle"],
      },
    },
    size: {
      type: {
        name: "enum",
        value: ["sm", "md"],
      },
    },
  },
  args: {
    placeholder: "Search the components...",
    size: "sm",
    disabled: false,
  }
} as Meta<typeof Input>;


export const Overview: StoryFn<typeof Input> = (args) => {
  return (
    <Flex dir="column" gap="md" css={{ width: '400px' }}>
      <Input startSlot={<IconSearch height={12} width={12} />} placeholder="Search the components..." size="sm" {...args} />
    </Flex>
  );
};



/**
 * You could use the `startSlot` or `endSlot` props to add an icon or any other element to the input.
 */
export const Slot: StoryFn<typeof Input> = (args) => {
  return (
    <Flex dir="column" gap="md" css={{ width: '400px' }}>
      <Input
        startSlot={<IconSearch size="12px" />}
        placeholder="Search the components..."
        size="sm"
        {...args}
      />
      <Input
        placeholder="Search the components..."
        size="sm"
        {...args}
        endSlot={
          <IconCopyCheckFilled size="12px" />
        }
      />
      <Input
        placeholder="Search the components..."
        size="sm"
        {...args}
        startSlot={
          <Badge status="warning" style={{ marginLeft: '-3px' }}>Danger</Badge>
        }
      />
    </Flex>
  );
};

const CustomTrigger = styled(Flex, {
  padding: '0 $2',
  gap: '$1',
  color: '$gray10',
  alignItems: 'center',
  borderRight: '1px solid $grayA3',
  cursor: 'pointer',
  userSelect: 'none',
  '&:hover': {
    color: '$gray11'
  }
});

const DropdownAction = () => {
  return (
    <DropdownMenu
      trigger={
        <CustomTrigger>
          Action
          <IconChevronDown size="12px" />
        </CustomTrigger>
      }
    >
      <MenuItem name="Copy" />
      <MenuItem name="Download" />
      <MenuItem name="Delete" critical />
    </DropdownMenu>
  )
}

/**
 * The Input will wrap the `startSlot` and `endSlot` with a styled slot container by default. If you want to override the slot style, you can set the `overrideStartSlotStyle` or `overrideEndSlotStyle` to `true`.
 */
export const OverrideSlotStyle: StoryFn<typeof Input> = (args) => {
  return (
    <Flex dir="column" gap="md" css={{ width: '400px' }}>
      <Input
        startSlot={<DropdownAction />}
        overrideStartSlotStyle
        placeholder="Search the components..."
        size="sm"
        {...args}
      />
    </Flex>
  );
}