import { forwardRef, Fragment, useCallback } from "react";
import { IconPlus, IconMinus } from "@tabler/icons-react";

import { FormItem, withFormItem } from "../FormItem";
import { Input, InputProps } from '@galacean/editor-ui'
import { BaseFormItemProps } from "../FormItem/FormItem";

export interface FormItemInputProps extends BaseFormItemProps<string>, Omit<InputProps, 'defaultValue' | 'value' | 'onChange'> {
}


function _FormItemInput(props: FormItemInputProps) {
  const { label, info, value, defaultValue, onChange, ...rest } = props;

  const handleOnChange = useCallback((e) => {
    onChange && onChange(e.target.value);
  }, [onChange]);

  return (
    <Input
      value={value}
      defaultValue={defaultValue}
      onChange={handleOnChange}
      {...rest}
    />
  )
}

export const FormItemInput = withFormItem(_FormItemInput)