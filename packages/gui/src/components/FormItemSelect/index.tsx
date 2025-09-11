import { Select, SelectItem } from "@galacean/editor-ui";
import { FormItem, extractFormItemProps, type FormItemSelectableProps } from "../FormItem";

export interface FormItemSelectProps<T extends number | string> extends FormItemSelectableProps<T> {
  open?: boolean;
  multiple?: boolean;
  selectAllText?: string;
  maxDisplayCount?: number;
  maxDisplayText?: string;
  noneText?: string;
  showSelectAll?: boolean;
  size?: 'sm' | 'md'
};

export function FormItemSelect<T extends number | string>(props: FormItemSelectProps<T>) {
  const { value, disabled, onChange, options, multiple, selectAllText, maxDisplayCount, maxDisplayText, noneText, showSelectAll, size } = props;

  return (
    <FormItem {...extractFormItemProps(props)}>
      <Select value={value as string} disabled={disabled} onValueChange={onChange} multiple={multiple} selectAllText={selectAllText} maxDisplayCount={maxDisplayCount} maxDisplayText={maxDisplayText} noneText={noneText} showSelectAll={showSelectAll}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} size={size}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </FormItem>
  );
}
