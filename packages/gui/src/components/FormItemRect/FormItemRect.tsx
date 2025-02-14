import { FormItem, withFormItem, type BaseFormItemProps, } from "../FormItem";
import { InputNumber } from "@galacean/editor-ui";

export type Rect = { x: number; y: number; width: number; height: number };

export interface FormItemRectProps extends Omit<BaseFormItemProps<Rect>, 'onChange'>  {
  min?: number;
  max?: number;
  disabled?: boolean;
  onChange?: (value: Rect, key: keyof Rect) => void;
};

function _FormItemRect(props: FormItemRectProps) {
  const { value, onChange, min, max, disabled } = props;

  const handleOnChange = (prefix: keyof Rect) => (v: number) => {
    if (!onChange) return;
    const result = { ...value, [prefix]: v };
    onChange && onChange(result, prefix);
  };

  return [
    <InputNumber
      disabled={disabled}
      startSlot="X"
      key="rect-x"
      min={min}
      max={max}
      value={value.x}
      onValueChange={handleOnChange("x")}
    />,
    <InputNumber
      disabled={disabled}
      min={min}
      max={max}
      startSlot="Y"
      key="rect-y"
      value={value.y}
      onValueChange={handleOnChange("y")}
    />,
    <InputNumber
      disabled={disabled}
      min={min}
      max={max}
      startSlot="W"
      key="rect-width"
      value={value.width}
      onValueChange={handleOnChange("width")}
    />,
    <InputNumber
      disabled={disabled}
      min={min}
      max={max}
      startSlot="H"
      key="rect-height"
      value={value.height}
      onValueChange={handleOnChange("height")}
    />
  ]
}


export const FormItemRect = withFormItem(_FormItemRect, "4");