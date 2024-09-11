import { PropsWithChildren } from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import type { ToggleGroupItemProps as PrimitiveItemProps } from "@radix-ui/react-toggle-group";

import { styled } from "../../design-system";
import { ActionButton } from "../ActionButton";

const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
  display: "flex",
});

const StyledItem = styled(ToggleGroupPrimitive.Item, {
  "& + &": {
    marginLeft: "$1"
  },
  backgroundColor: "transparent",
  "&[data-state=on]": {
    backgroundColor: "$blue9",
    color: "$white"
  },
  "&[data-state=on]:hover": {
    backgroundColor: "$blue9",
    color: "$white"
  },
  "&:focus-visible": {
    position: "relative",
    boxShadow: "0 0 0 3px $colors$grayA7"
  },
  variants: {
    subtle: {
      true: {
        backgroundColor: "transparent"
      }
    }
  }
});

export const ToggleGroup = StyledToggleGroup;

export interface ToggleGroupItemProps extends PrimitiveItemProps {
  fancy?: boolean;
  size?: "s" | "xs" | "sm" | "md" | "lg";
  subtle?: boolean;
}

export function ToggleGroupItem(props: PropsWithChildren<ToggleGroupItemProps>) {
  const { children, fancy, size, ...rest } = props;

  return (
    <StyledItem {...rest} asChild>
      <ActionButton variant="secondary" fancy={fancy} size={size}>
        {children}
      </ActionButton>
    </StyledItem>
  );
}

export type { ToggleGroupSingleProps, ToggleGroupMultipleProps } from "@radix-ui/react-toggle-group";
