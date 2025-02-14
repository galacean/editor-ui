import React from "react";

import { Checkbox } from "@galacean/editor-ui";
import { FormItem, withFormItem, type BaseFormItemProps } from "../FormItem";

export interface FormItemToggleProps extends BaseFormItemProps<boolean> {
  checkboxLabel?: string | React.ReactNode
  withLabel?: boolean
};

function _FormItemToggle(props: FormItemToggleProps) {
  const { value, disabled, onChange, withLabel = false } = props;

  return (
    <Checkbox
      withLabel={withLabel}
      checked={!!value}
      disabled={disabled}
      onCheckedChange={onChange}
    />
  );
}

export const FormItemToggle = withFormItem(_FormItemToggle);