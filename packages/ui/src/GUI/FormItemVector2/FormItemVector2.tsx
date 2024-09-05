import { FormItem } from "../FormItem";
import { InputNumber } from "../../InputNumber";
import { BaseFormItemProps } from "../FormItem/FormItem";

export type Vector2 = { x: number; y: number };

export interface FormItemVector2Props extends Omit<BaseFormItemProps<Vector2>, 'onChange'> {
  min?: number;
  max?: number;
  onChange?: (value: Vector2, key: keyof Vector2) => void;
};

export function FormItemVector2(props: FormItemVector2Props) {
  const { name, info, value, onChange, min, max, disabled } = props;

  const handleOnChange = (prefix: keyof Vector2) => (v: number) => {
    if (!onChange) return;
    const result = { ...value, [prefix]: v };
    onChange && onChange(result, prefix);
  };

  return (
    <FormItem name={name} info={info} fieldColumn={3}>
      <InputNumber
        min={min}
        max={max}
        startSlot="X"
        disabled={disabled}
        value={value.x}
        onValueChange={handleOnChange("x")}
      />
      <InputNumber
        min={min}
        max={max}
        startSlot="Y"
        disabled={disabled}
        value={value.y}
        onValueChange={handleOnChange("y")}
      />
    </FormItem>
  );
}
