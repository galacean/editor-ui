import { FormItem } from "../FormItem";
import { InputNumber } from "@galacean/editor-ui";
import { BaseFormItemProps } from "../FormItem/FormItem";

export type Vector4 = { x: number; y: number; z: number; w: number };

export interface FormItemVector4Props extends Omit<BaseFormItemProps<Vector4>, 'onChange'> {
  min?: number;
  max?: number;
  disabled?: boolean;
  onChange?: (value: Vector4, key: keyof Vector4) => void;
};

export function FormItemVector4(props: FormItemVector4Props) {
  const { onChange, min, max, disabled, value, ...rest } = props;

  const handleOnChange = (prefix: keyof Vector4) => (v: number) => {
    if (!onChange) return;
    const result = { ...value, [prefix]: v };
    onChange && onChange(result, prefix);
  };

  return (
    <FormItem {...rest} fieldColumn={4}>
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
        startSlot="Z"
        value={value.z}
        onValueChange={handleOnChange("z")}
      />
      <InputNumber
        disabled={disabled}
        min={min}
        max={max}
        startSlot="W"
        value={value.w}
        onValueChange={handleOnChange("w")}
      />
    </FormItem>
  );
}
