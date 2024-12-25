import React from "react";

import { FormItem, type BaseFormItemProps, } from "../FormItem";
import { SegmentControl, SegmentControlItem } from "@galacean/editor-ui";

export interface FormItemSegmentControlProps extends BaseFormItemProps<any> {
  options: { value: any; label: React.ReactNode; disabled?: boolean }[];
};

export function FormItemSegmentControl(props: FormItemSegmentControlProps) {
  const { label, info, value, onChange, defaultValue, options = [] } = props;
  return (
    <FormItem label={label} info={info} fieldColumn={1}>
      <SegmentControl size="sm" defaultValue={defaultValue} value={String(value)} onValueChange={(v) => onChange && onChange(isNaN(Number(v)) ? v : Number(v))}>
        {options.map((item) => (
          <SegmentControlItem disabled={item.disabled} value={String(item.value)} key={item.value}>
            {item.label}
          </SegmentControlItem>
        ))}
      </SegmentControl>
    </FormItem>
  );
}
