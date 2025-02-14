import { Fragment, useCallback } from "react";
import { Textarea } from "@galacean/editor-ui";
import { FormItem, withFormItem } from "../FormItem";
import { BaseFormItemProps } from "../FormItem/FormItem";

export interface FormItemTextareaProps extends BaseFormItemProps<string> {
}

function _FormItemTextarea(props: FormItemTextareaProps) {
  const { label, info, formStartSlot, formEndSlot, value, defaultValue, onChange } = props;

  const handleOnChange = useCallback((e) => {
    onChange && onChange(e.target.value);
  }, [onChange]);

  return (
    <FormItem
      label={label}
      info={info}
      formStartSlot={formStartSlot}
      formEndSlot={formEndSlot}
      direction="column"
    >
      <Textarea value={value} onChange={handleOnChange} defaultValue={defaultValue} />
    </FormItem>
  )
}

export const FormItemTextarea = withFormItem(_FormItemTextarea);