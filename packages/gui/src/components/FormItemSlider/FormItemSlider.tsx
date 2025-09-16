import { FormItem, extractFormItemProps } from '../FormItem'
import { InputNumber, Slider } from '@galacean/editor-ui'
import { FormItemRangeProps } from '../FormItem/FormItem'

export interface FormItemSliderProps extends FormItemRangeProps {
  tooltip?: boolean
}

export function FormItemSlider(props: FormItemSliderProps) {
  const { min, max, value, dragStep, onChange, disabled, tooltip = true } = props

  const handleSliderValueChange = (valueList: number[]) => {
    if (props.onChange) {
      props.onChange(valueList[0])
    }
  }

  const arrValue = Array.isArray(value) ? value : [value]

  return (
    <FormItem {...extractFormItemProps(props)} fieldColumn={3}>
      <InputNumber
        min={min}
        max={max}
        dragStep={dragStep}
        onValueChange={onChange}
        size="sm"
        value={arrValue[0]}
        disabled={disabled}
      />
      <Slider
        disabled={disabled}
        min={min}
        max={max}
        tooltip={tooltip}
        step={dragStep}
        value={arrValue}
        onValueChange={handleSliderValueChange}
        css={{ gridColumn: '2 / -1' }}
      />
    </FormItem>
  )
}
