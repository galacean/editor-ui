import { FormItem, type FormItemSelectableProps } from "../FormItem";
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

export function FormItemToggleGroup(props: FormItemToggleGroupProps) {
  const { label, info, type, value, defaultValue, onChange: onValueChange, disabled, options } = props;

  const groupProps: any = { type, value, onValueChange, defaultValue }
  
  return (
    <FormItem label={label} info={info} fieldColumn={1}>
      <ToggleGroup {...groupProps} variant="subtle">
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
    </FormItem>
  );
}
