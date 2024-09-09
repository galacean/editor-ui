import React from "react";
import * as Select from "@radix-ui/react-select";
import type { SelectItemProps, SelectProps } from "@radix-ui/react-select";
import { IconChevronDown } from "@tabler/icons-react";
import { IconChevronDownRight } from "@tabler/icons-react";

import { Triangle } from "../Triangle";
import { styled } from "../../design-system";
import { basicItemStyle, selectContent } from "../../design-system/recipes";
import { ActionButton } from "../ActionButton";

const SelectContent = styled(Select.Content, selectContent);

const SelectViewport = styled(Select.Viewport, {
  padding: "$1"
});

const StyledItem = styled(Select.Item, basicItemStyle, {
  "&[data-highlighted]": {
    backgroundColor: "$blue10",
    color: "$white"
  }
});

const StyledItemText = styled("span", {
  display: "flex",
  height: "$6",
  gap: "$1",
  alignItems: "center",
  "& > svg": {
    height: "14px",
    width: "14px"
  }
});

const SelectLabel = styled(Select.Label);

const SelectSeparator = styled(Select.Separator);

const StyledItemIndicator = styled(Select.ItemIndicator);

const StyledScrollButton = styled('button', {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "60px",
  height: "$3",
  backgroundColor: "$grayA3",
  color: "$grayA11",
  cursor: "default",
  borderRadius: "$round",
  margin: "0 auto"
});

const SelectScrollUpButton = styled(Select.ScrollUpButton, StyledScrollButton);

const SelectScrollDownButton = styled(Select.ScrollDownButton, StyledScrollButton);

const SelectTrigger = styled(Select.SelectTrigger, {});

const SelectIcon = styled(Select.SelectIcon, {
  color: "$grayA8",
  position: "absolute",
  bottom: "2px",
  right: "-1px",
  strokeWidth: "3px"
});

interface SimpleSelectItemProps extends SelectItemProps {
  icon?: React.ReactNode;
}

export const SimpleSelectItem = React.forwardRef<HTMLDivElement, SimpleSelectItemProps>(function SelectItem(
  { children, ...props }: SimpleSelectItemProps,
  forwardedRef
) {
  return (
    <StyledItem ref={forwardedRef} {...props}>
      <Select.ItemText>
        <StyledItemText>
          {props.icon}
          {children}
        </StyledItemText>
      </Select.ItemText>
    </StyledItem>
  );
});

export interface SimpleSelectProps extends SelectProps {
  placeholder?: string;
  valueRenderer?: (value?: string) => React.ReactNode;
  // triggerCss?: CSS;
  id?: string;
}

export const SimpleSelect = (props: SimpleSelectProps) => {
  const { placeholder, valueRenderer, ...rest } = props;

  const renderedValue = valueRenderer ? (
    valueRenderer(rest.value || rest.defaultValue)
  ) : (
    <span>{rest.value || rest.defaultValue}</span>
  );

  return (
    <Select.Root {...rest}>
      <SelectTrigger aria-label="Food" asChild>
        <ActionButton css={{ position: "relative" }} id={rest.id} corner>
          <Select.Value placeholder={placeholder}>{renderedValue}</Select.Value>
        </ActionButton>
      </SelectTrigger>
      <Select.Portal>
        <SelectContent>
          <SelectViewport>{props.children}</SelectViewport>
          <SelectScrollDownButton>
            <IconChevronDown />
          </SelectScrollDownButton>
        </SelectContent>
      </Select.Portal>
    </Select.Root>
  );
};
