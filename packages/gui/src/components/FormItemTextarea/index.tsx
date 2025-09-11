import { useCallback } from "react";
import { Textarea } from "@galacean/editor-ui";
import { FormItem, extractFormItemProps } from "../FormItem";
import { BaseFormItemProps } from "../FormItem/FormItem";

export interface FormItemTextareaProps extends BaseFormItemProps<string> {
}

export function FormItemTextarea(props: FormItemTextareaProps) {
  const { value, defaultValue, onChange } = props;

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange && onChange(e.target.value);
  }, [onChange]);

  return (
    <FormItem
      {...extractFormItemProps(props)}
    >
      <Textarea value={value} onChange={handleOnChange} defaultValue={defaultValue} variant="subtle" />
    </FormItem>
  )
}