import { Select, SelectItem } from "@galacean/editor-ui";
import { FormItem, withFormItem, type FormItemSelectableProps } from "../FormItem";

export interface FormItemSelectProps<T extends number | string> extends FormItemSelectableProps<T> {
  open?: boolean;
  multiple?: boolean;
};

function _FormItemSelect<T extends number | string>(props: FormItemSelectProps<T>) {
  const { value, label, info, disabled, onChange, options, multiple, formEndSlot, formStartSlot } = props;
  return (
    <Select value={value as string} disabled={disabled} onValueChange={onChange} multiple={multiple}>
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
}


export const FormItemSelect = withFormItem(_FormItemSelect)