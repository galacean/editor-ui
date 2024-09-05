import React from "react";

import { Select, SelectItem } from "../../Select";
import { FormItem } from "../FormItem";
import { BaseFormItemProps, FormItemSelectableProps } from "../FormItem/FormItem";

export interface FormItemSelectProps<T extends number | string> extends BaseFormItemProps<T>, FormItemSelectableProps<T> {
  open?: boolean;
  multiple?: boolean;
};

export function FormItemSelect<T extends number | string>(props: FormItemSelectProps<T>) {
  const { value, name, info, disabled, onChange, options, multiple } = props;
  return (
    <FormItem name={name} info={info}>
      <Select value={value as string} disabled={disabled} onValueChange={onChange} multiple={multiple}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </FormItem>
  );
}
