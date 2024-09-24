import { PropsWithChildren } from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import type { ToggleGroupItemProps as PrimitiveItemProps } from "@radix-ui/react-toggle-group";

import { styled } from "../../design-system";

const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
  display: "flex",
  gap: '$1',
});

const StyledItem = styled(ToggleGroupPrimitive.Item, {
  all: "unset",
  display: "flex",
  height: '$sm',
  aspectRatio: '1/1',
  borderRadius: '$2',
  alignItems: "center",
  justifyContent: "center",
  fontSize: '$1',
  color: '$gray11',
  backgroundColor: "rgba(0, 0, 0, 0)",
  transition: "background-color 0.2s, color .2s",
  '& > svg': {
    width: '$4',
    height: '$4',
  },
  "&[data-state=on]": {
    backgroundColor: "$blue9",
    color: "$blue12",
    fontWeight: 500,
  },
  "&[data-state=on]:hover": {
    backgroundColor: "$blue10",
    color: "$white"
  },
  '&:hover': {
    backgroundColor: '$grayA3',
  },
  "&:focus-visible": {
    position: "relative",
    boxShadow: "inset 0 0 0 1px $colors$blue10"
  }
});

export const ToggleGroup = StyledToggleGroup;

export interface ToggleGroupItemProps extends PrimitiveItemProps {
  fancy?: boolean;
  size?: "s" | "xs" | "sm" | "md" | "lg";
  subtle?: boolean;
}

export function ToggleGroupItem(props: PropsWithChildren<ToggleGroupItemProps>) {
  const { children, fancy, size, subtle, ...rest } = props;

  return (
    <StyledItem {...rest}>
      {children}
    </StyledItem>
  );
}

export type { ToggleGroupSingleProps, ToggleGroupMultipleProps } from "@radix-ui/react-toggle-group";
