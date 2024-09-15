import { Textarea } from "../../Textarea";
import { FormItem } from "../FormItem";
import { BaseFormItemProps } from "../FormItem/FormItem";

export interface FormItemTextareaProps extends BaseFormItemProps<string> {
}

export function FormItemTextarea(props: FormItemTextareaProps) {
  const { label, info, formStartSlot, formEndSlot } = props;
  return (
    <FormItem
      label={label}
      info={info}
      formStartSlot={formStartSlot}
      formEndSlot={formEndSlot}
      labelCss={{
        alignSelf: "flex-start",
      }}
    >
      <Textarea />
    </FormItem>
  )
}