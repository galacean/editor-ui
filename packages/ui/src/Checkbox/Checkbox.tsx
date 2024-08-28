import React, { forwardRef } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckboxProps as PrimitiveProps } from "@radix-ui/react-checkbox";
import { IconCheck } from "@tabler/icons-react";

import { styled } from "@galacean/design-system";
import { Flex } from "../Flex";

const StyledCheckboxRoot = styled(CheckboxPrimitive.Root, {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "14px",
  height: "14px",
  borderRadius: "$1",
  boxShadow: "$prepend",
  transition: "$shadow",
  backgroundColor: "$gray4",
  border: "1px solid $grayA4",
  padding: 0,
  '&[data-state="checked"]': {
    backgroundColor: "$blue9",
    borderColor: "$blue9",
    color: "white",
    fill: "white"
  },
  "&[disabled]": {
    backgroundColor: "$gray4",
    borderColor: "$gray4",
    color: "$gray9"
  },
  '&[data-focused="true"]': {
    boxShadow: "0 0 0 3px $colors$grayA7"
  },
  "&:focus-visible": {
    outline: "2px solid $blueA7"
  }
});

const StyledCheckboxLabel = styled(LabelPrimitive.Label, {
  fontSize: "$1",
  color: "$gray11",
  marginLeft: "$2",
  userSelect: "none"
});

export interface CheckboxProps extends PrimitiveProps {
  /**
   * The label of the checkbox. You could pass a string or a ReactNode.
   */
  label?: string | React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
}


/**
 * The basic `Checkbox` component.
 *
 * This component built on top of the `@radix-ui/react-checkbox` and you could use `ref` to access the underlying slider DOM element.
 * 
 * This component provide both controlled and uncontrolled modes.
 */
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(props: CheckboxProps, forwardedRef) {
  const { id, label, onCheckedChange, ...rest } = props;

  let handleCheckChange;

  if (onCheckedChange) {
    handleCheckChange = (checked) => {
      if (typeof checked === "boolean") {
        onCheckedChange(checked);
      }
    };
  }

  return (
    <Flex align="v">
      <StyledCheckboxRoot onCheckedChange={handleCheckChange} id={id} {...rest} ref={forwardedRef}>
        <CheckboxPrimitive.Indicator asChild>
          <IconCheck size="10px" strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
      </StyledCheckboxRoot>
      {label &&
        <StyledCheckboxLabel htmlFor={id}>
          {props.label}
        </StyledCheckboxLabel>
      }
    </Flex>
  );
});
