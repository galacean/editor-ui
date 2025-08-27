import { Fragment, useCallback } from "react";
import { IconPlus, IconMinus } from "@tabler/icons-react";

import { FormItem, extractFormItemProps } from "../FormItem";
import { Input, InputProps } from '@galacean/editor-ui'
import { BaseFormItemProps } from "../FormItem/FormItem";

export interface FormItemInputProps extends BaseFormItemProps<string>, Omit<InputProps, 'defaultValue' | 'value' | 'onChange'> {
}


export function FormItemInput(props: FormItemInputProps) {
  const { value, defaultValue, onChange, ...rest } = props;

  const handleOnChange = useCallback((e) => {
    onChange && onChange(e.target.value);
  }, [onChange]);

  return (
    <FormItem {...extractFormItemProps(props)}>
      <Input
        value={value}
        defaultValue={defaultValue}
        onChange={handleOnChange}
        {...rest}
      />
    </FormItem>
  )
}
