import React from "react";

import { Select, SelectItem } from "../../Select";
import { FormItem } from "../FormItem";
import { BaseFormItemProps, FormItemSelectableProps } from "../FormItem/FormItem";

export interface FormItemSelectProps<T extends number | string> extends FormItemSelectableProps<T> {
  open?: boolean;
  multiple?: boolean;
};

export function FormItemSelect<T extends number | string>(props: FormItemSelectProps<T>) {
  const { value, label, info, disabled, onChange, options, multiple } = props;
  return (
    <FormItem label={label} info={info}>
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
