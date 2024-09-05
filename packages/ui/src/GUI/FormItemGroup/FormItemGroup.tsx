import React from "react";

import { Collapsible, type CollapsibleProps } from "../../Collapsible";
import { Flex } from "../../Flex";
import { BaseFormItemProps } from "../FormItem/FormItem";

export interface FormItemGroupProps extends CollapsibleProps, Omit<BaseFormItemProps<any>, 'value' | 'onChange'> {
  customTitle?: React.ReactNode;
}

function FormItemGroup(props: FormItemGroupProps) {
  const { name, nesting, collapsible, customTitle, defaultOpen = true, open,  } = props;

  return (
    <Collapsible
      title={customTitle ?? name}
      defaultOpen={defaultOpen}
      open={open}
      nesting={nesting}
      collapsible={collapsible}
      
    >
      <Flex direction="column">{props.children}</Flex>
    </Collapsible>
  );
}

export { FormItemGroup };
