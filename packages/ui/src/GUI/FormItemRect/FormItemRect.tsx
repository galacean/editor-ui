import { FormItem } from "../FormItem";
import { InputNumber } from "../../InputNumber";
import { BaseFormItemProps } from "../FormItem/FormItem";

export type Rect = { x: number; y: number; width: number; height: number };

export interface FormItemRectProps extends BaseFormItemProps<Rect> {
  min?: number;
  max?: number;
  value: Rect;
  onChange?: (value: Rect, key: keyof Rect) => void;
  disabled?: boolean;
};

export function FormItemRect(props: FormItemRectProps) {
  const { value, onChange, min, max, disabled } = props;

  const handleOnChange = (prefix: keyof Rect) => (v: number) => {
    if (!onChange) return;
    const result = { ...value, [prefix]: v };
    onChange && onChange(result, prefix);
  };

  return (
    <FormItem name={props.name} info={props.info} fieldColumn={4}>
      <InputNumber
        disabled={disabled}
        startSlot="X"
        min={min}
        max={max}
        value={value.x}
        onValueChange={handleOnChange("x")}
      />
      <InputNumber
        disabled={disabled}
        min={min}
        max={max}
        startSlot="Y"
        value={value.y}
        onValueChange={handleOnChange("y")}
      />
      <InputNumber
        disabled={disabled}
        min={min}
        max={max}
        startSlot="W"
        value={value.width}
        onValueChange={handleOnChange("width")}
      />
      <InputNumber
        disabled={disabled}
        min={min}
        max={max}
        startSlot="H"
        value={value.height}
        onValueChange={handleOnChange("height")}
      />
    </FormItem>
  );
}
