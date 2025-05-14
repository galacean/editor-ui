import { Select, SelectItem } from "@galacean/editor-ui";
import { FormItem, type FormItemSelectableProps } from "../FormItem";

export interface FormItemSelectProps<T extends number | string> extends FormItemSelectableProps<T> {
  open?: boolean;
  multiple?: boolean;
  selectAllText?: string;
  showOptionCloseButton?: boolean;
};

export function FormItemSelect<T extends number | string>(props: FormItemSelectProps<T>) {
  const { value, label, info, disabled, onChange, options, multiple, formEndSlot, formStartSlot, selectAllText, showOptionCloseButton } = props;

  return (
    <FormItem label={label} info={info} formEndSlot={formEndSlot} formStartSlot={formStartSlot}>
      <Select value={value as string} disabled={disabled} onValueChange={onChange} multiple={multiple} selectAllText={selectAllText} showOptionCloseButton={showOptionCloseButton}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </FormItem>
  );
}
