import React, { forwardRef } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import type {
  SelectGroupProps as PrimitiveSelectGroupProps,
  SelectProps as PrimitiveSelectProps,
  SelectContentProps
} from "@radix-ui/react-select";
import { IconCheck, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { styled } from "@galacean/design-system"
import { checkboxItemStyle, contentStyle, indicatorStyle, labelStyle } from "@galacean/design-system/recipes";

const SelectTrigger = styled(SelectPrimitive.SelectTrigger, {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 $1_5 0 $2",
  fontSize: "$1",
  height: "$6",
  gap: "$1",
  backgroundColor: "$grayA3",
  color: "$gray11",
  userSelect: "none",
  cursor: "pointer",
  width: "100%",
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "&:disabled": {
    backgroundColor: "$grayA2",
    color: "$grayA8",
    "&:hover": {
      backgroundColor: "$grayA2",
      color: "$grayA8",
      cursor: "default"
    }
  },
  "&:hover": {
    backgroundColor: "$grayA4"
  },
  "&[data-placeholder]": {
    color: "$gray11"
  },
  "& > span:first-child": {
    display: "block",
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  variants: {
    size: {
      xs: {
        height: "$xs",
        borderRadius: "$2"
      },
      sm: {
        height: "$sm",
        borderRadius: "$2"
      },
      md: {
        height: "$8",
        borderRadius: "$4"
      }
    }
  }
});

const SelectIcon = styled(SelectPrimitive.SelectIcon, {
  color: "CurrentColor",
  display: "inline-flex",
  alignItems: "center",
  lineHeight: 1,
  "& > svg": {
    height: "14px",
    width: "14px"
  }
});

const SelectContent = styled(SelectPrimitive.Content, contentStyle, {
  overflow: "hidden",
  borderRadius: "$3",
  width: "var(--radix-select-trigger-width)",
  minWidth: "initial !important",
  maxHeight: "var(--radix-select-content-available-height)",
  variants: {
    width: {
      initial: {
        width: "initial !important"
      }
    }
  }
});

const SelectViewport = styled(SelectPrimitive.Viewport, {
  padding: 0
});

const StyledItem = styled(SelectPrimitive.Item, checkboxItemStyle);

const SelectLabel = styled(SelectPrimitive.Label, labelStyle);

const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator, indicatorStyle);

const scrollButtonStyles = {
  display: "flex",
  height: "$4",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "$2",
  color: "$gray10",
  cursor: "default"
};

const SelectScrollUpButton = styled(SelectPrimitive.ScrollUpButton, scrollButtonStyles);

const SelectScrollDownButton = styled(SelectPrimitive.ScrollDownButton, scrollButtonStyles);

type SelectContextProps = {
  size: "xs" | "sm" | "md";
  valueType: "string" | "number";
};

const SelectContext = React.createContext<SelectContextProps>({
  size: "sm",
  valueType: "string"
});

const StyledSelectItemContent = styled("span", {
  display: "flex",
  alignItems: "center",
  "& > svg": {
    marginRight: "$1_5",
    width: "$4",
    height: "$4"
  }
});

export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: any;
  children?: React.ReactNode;
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem(
  { children, value, ...props },
  forwardedRef
) {
  const { size, valueType } = React.useContext(SelectContext);
  return (
    <StyledItem {...props} value={valueType === "number" ? String(value) : value} ref={forwardedRef} size={size}>
      <StyledItemIndicator>
        <IconCheck />
      </StyledItemIndicator>
      <StyledSelectItemContent>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </StyledSelectItemContent>
    </StyledItem>
  );
});

interface SelectGroupProps extends PrimitiveSelectGroupProps {
  label: string;
  children: React.ReactNode;
  divider?: boolean;
  dividerPosition?: "top" | "bottom";
}

function SelectGroup(props: SelectGroupProps) {
  const { label, children, ...rest } = props;

  return (
    <React.Fragment>
      <SelectPrimitive.Group {...rest}>
        {label && <SelectLabel>{label}</SelectLabel>}
        {children}
      </SelectPrimitive.Group>
    </React.Fragment>
  );
}

export interface SelectProps extends Omit<PrimitiveSelectProps, "value" | "defaultValue"> {
  placeholder?: string;
  position?: SelectContentProps["position"];
  size?: "xs" | "sm" | "md";
  width?: "initial";
  valueType?: "string" | "number";
  value?: string | number;
  defaultValue?: string | number;
  onValueChange?: (value: any) => void;
  id?: string;
  sideOffset?: number;
  children?: React.ReactNode;
}

function Select(props: SelectProps) {
  const {
    placeholder,
    value: propValue,
    defaultValue: propDefaultValue,
    valueType: propValueType,
    position = "popper",
    size = "sm",
    width,
    id,
    sideOffset = 4,
    ...rest
  } = props;

  let valueType = 'string';
  if(propValueType) {
    valueType = propValueType;
  } else {
    if (typeof propValue === "number") {
      valueType = "number";
    } else if (typeof propValue === "string") {
      valueType = "string";
    }
  }

  const [value, setValue] = useControllableState<string>({
    prop: propValue !== undefined && propValue !== null ? String(propValue) : undefined,
    defaultProp: propDefaultValue ? String(propDefaultValue) : undefined,
    onChange: (val) => {
      if (props.onValueChange) {
        if (valueType === "number") {
          return props.onValueChange(Number(val));
        }
        props.onValueChange(val);
      }
    }
  });

  return (
    <SelectContext.Provider value={{ size, valueType: valueType as unknown as ("string" | "number") }}>
      <SelectPrimitive.Root {...rest} value={value} onValueChange={setValue}>
        <SelectTrigger size={size} id={id}>
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectIcon>
            <IconChevronDown />
          </SelectIcon>
        </SelectTrigger>
        <SelectPrimitive.Portal>
          <SelectContent position={position} width={width} sideOffset={sideOffset} collisionPadding={0}>
            <SelectScrollUpButton>
              <IconChevronUp size="14px" />
            </SelectScrollUpButton>
            <SelectViewport>{props.children}</SelectViewport>
            <SelectScrollDownButton>
              <IconChevronDown size="14px" />
            </SelectScrollDownButton>
          </SelectContent>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </SelectContext.Provider>
  );
}

export { Select, SelectLabel, SelectGroup, SelectItem };
