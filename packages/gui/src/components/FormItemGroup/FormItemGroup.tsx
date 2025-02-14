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
      css={{
        marginTop: '$1',
        $$collapsibleBgColor: "$colors$grayA2",
        '&:first-child': {
          marginTop: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }
      }}
    >
      {props.children}
    </Collapsible>
  );
}

export { FormItemGroup };
