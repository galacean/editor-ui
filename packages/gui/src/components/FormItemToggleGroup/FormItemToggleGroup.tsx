import { FormItem, withFormItem, type FormItemSelectableProps } from "../FormItem";
import { ToggleGroupItem, ToggleGroup } from "@galacean/editor-ui";

type SingleProps = {
  type: "single";
  value?: string;
  onChange?: (v: string) => void;
};

type MultiProps = {
  type: "multiple";
  value?: string[];
  onChange?: (v: string[]) => void;
};

export type FormItemToggleGroupProps = (SingleProps | MultiProps) & Omit<FormItemSelectableProps<string>, 'value' | 'onChange'>;

function _FormItemToggleGroup(props: FormItemToggleGroupProps) {
  const { type, value, defaultValue, onChange: onValueChange, disabled, options } = props;

  const groupProps: any = { type, value, onValueChange, defaultValue }
  
  return (
    <ToggleGroup {...groupProps}>
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          disabled={disabled}
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export const FormItemToggleGroup = withFormItem(_FormItemToggleGroup);