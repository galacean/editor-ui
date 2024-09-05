import React from "react";

import { FormItem } from "../FormItem";
import { SegmentControl, SegmentControlItem } from "../../SegmentControl";
import { BaseFormItemProps } from "../FormItem/FormItem";

export interface FormItemSegmentControlProps extends BaseFormItemProps<any> {
  options: { value: any; label: React.ReactNode; disabled?: boolean }[];
};

export function FormItemSegmentControl(props: FormItemSegmentControlProps) {
  const { name, info, value, onChange, options = [] } = props;
  return (
    <FormItem name={name} info={info} fieldColumn={1}>
      <SegmentControl size="sm" value={String(value)} onValueChange={(v) => onChange && onChange(isNaN(Number(v)) ? v : Number(v))}>
        {options.map((item) => (
          <SegmentControlItem disabled={item.disabled} value={String(item.value)} key={item.value}>
            {item.label}
          </SegmentControlItem>
        ))}
      </SegmentControl>
    </FormItem>
  );
}
