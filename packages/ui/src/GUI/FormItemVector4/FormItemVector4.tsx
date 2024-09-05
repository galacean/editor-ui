import { FormItem, FormItemProps } from "../FormItem";
import { ActionButton } from "../../ActionButton";
import { IconRightBottomCorner } from "../../Icons/IconRightBottomCorner";
import { InputNumber } from "../../InputNumber";
import { BaseFormItemProps } from "../FormItem/FormItem";

export type Rect = { x: number; y: number; z: number; w: number };

export interface FormItemVector4Props extends Omit<BaseFormItemProps<Rect>, 'onChange'> {
  min?: number;
  max?: number;
  disabled?: boolean;
  value: Rect;
  onChange?: (value: Rect, key: keyof Rect) => void;
};

export function FormItemVector4(props: FormItemVector4Props) {
  const { onChange, min, max, disabled, value, ...rest } = props;

  const handleOnChange = (prefix: keyof Rect) => (v: number) => {
    if (!onChange) return;
    const result = { ...value, [prefix]: v };
    onChange && onChange(result, prefix);
  };

  return (
    <FormItem
      {...rest}
      fieldColumn={4}
      formEndSlot={
        <ActionButton size="sm">
          <IconRightBottomCorner />
        </ActionButton>
      }
    >
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
