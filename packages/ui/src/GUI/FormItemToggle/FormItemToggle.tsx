import React from "react";

import { Checkbox } from "../../Checkbox";
import { FormItem } from "../FormItem";
import { BaseFormItemProps } from "../FormItem/FormItem";

export interface FormItemToggleProps extends BaseFormItemProps<boolean> {
  checkboxLabel?: string | React.ReactNode
};

export function FormItemToggle(props: FormItemToggleProps) {
  return (
    <FormItem
      name={props.name}
      info={props.info}
    >
      <Checkbox
        label={props.checkboxLabel}
        checked={props.value}
        disabled={props.disabled}
        onCheckedChange={props.onChange}
      />
    </FormItem>
  );
}
