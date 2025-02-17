import React from "react";

import { Flex, Collapsible, type CollapsibleProps } from "@galacean/editor-ui";
import { BaseFormItemProps } from "../FormItem/FormItem";

export interface FormItemGroupProps extends Omit<CollapsibleProps, 'defaultValue'> , Omit<BaseFormItemProps<any>, 'value' | 'onChange'> {
  customTitle?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  collapsible?: boolean;
  nesting?: boolean;
  // children: React.ReactNode;
  children: any;
}

function FormItemGroup(props: FormItemGroupProps) {
  const { label, nesting, collapsible, customTitle, defaultOpen = true, open, onOpenChange } = props;

  return (
    <Collapsible
      title={customTitle ?? label}
      defaultOpen={defaultOpen}
      open={open}
      nesting={nesting}
      onOpenChange={onOpenChange}
      collapsible={collapsible}
      css={{ marginBottom: "2px" }}
    >
      {props.children}
    </Collapsible>
  );
}

export { FormItemGroup };
