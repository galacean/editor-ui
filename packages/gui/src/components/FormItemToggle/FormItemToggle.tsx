import React from "react";

import { Checkbox } from "@galacean/editor-ui";
import { FormItem, extractFormItemProps, type BaseFormItemProps } from "../FormItem";

export interface FormItemToggleProps extends BaseFormItemProps<boolean> {
  checkboxLabel?: string | React.ReactNode
  withLabel?: boolean
};

export function FormItemToggle(props: FormItemToggleProps) {
  const { value, disabled, onChange, withLabel = false } = props;

  return (
    <FormItem {...extractFormItemProps(props)}>
      <Checkbox
        withLabel={withLabel}
        checked={!!value}
        disabled={disabled}
        onCheckedChange={onChange}
      />
    </FormItem>
  );
}
