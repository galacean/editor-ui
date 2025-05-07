import React from "react";

import { Checkbox } from "@galacean/editor-ui";
import { FormItem, type BaseFormItemProps } from "../FormItem";

export interface FormItemToggleProps extends BaseFormItemProps<boolean> {
  checkboxLabel?: string | React.ReactNode
  withLabel?: boolean
};

export function FormItemToggle(props: FormItemToggleProps) {
  const { label, info, value, disabled, onChange, withLabel = false } = props;

  return (
    <FormItem
      label={label}
      info={info}
    >
      <Checkbox
        withLabel={withLabel}
        checked={!!value}
        disabled={disabled}
        onCheckedChange={onChange}
      />
    </FormItem>
  );
}
