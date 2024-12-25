import { Fragment, useCallback } from "react";
import { IconPlus, IconMinus } from "@tabler/icons-react";

import { FormItem } from "../FormItem";
import { Input, InputProps } from '@galacean/editor-ui'
import { BaseFormItemProps } from "../FormItem/FormItem";

export interface FormItemInputProps extends BaseFormItemProps<string>, Omit<InputProps, 'defaultValue' | 'value' | 'onChange'> {
}


export function FormItemInput(props: FormItemInputProps) {
  const { label, info, value, defaultValue, onChange, ...rest } = props;

  const handleOnChange = useCallback((e) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <FormItem label={label} info={info}>
      <Input
        value={value}
        defaultValue={defaultValue}
        onChange={handleOnChange}
        {...rest}
      />
    </FormItem>
  )
}
