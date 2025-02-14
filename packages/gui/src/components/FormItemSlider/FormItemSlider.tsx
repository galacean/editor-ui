
import { FormItem, withFormItem } from "../FormItem";
import { InputNumber, Slider } from "@galacean/editor-ui";
import { FormItemRangeProps } from "../FormItem/FormItem";

export interface FormItemSliderProps extends FormItemRangeProps {
  tooltip?: boolean;
}

function _FormItemSlider(props: FormItemSliderProps) {
  const { label, info, min, max, value, dragStep, onChange, disabled, tooltip = true } = props;

  const handleSliderValueChange = (valueList: number[]) => {
    if (props.onChange) {
      props.onChange(valueList[0]);
    }
  };

  const arrValue = Array.isArray(value) ? value : [value];

  return [
    <InputNumber
      min={min}
      max={max}
      dragStep={dragStep}
      onValueChange={onChange}
      key="slider-input"
      size="sm"
      value={arrValue[0]}
      disabled={disabled}
    />,
    <Slider
      disabled={disabled}
      min={min}
      max={max}
      key="slider"
      tooltip={tooltip}
      step={dragStep}
      value={arrValue}
      onValueChange={handleSliderValueChange}
      css={{ gridColumn: "2 / -1" }}
    />
  ]
}

export const FormItemSlider = withFormItem(_FormItemSlider, "3");