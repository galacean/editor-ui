import { FormItem, extractFormItemProps, type BaseFormItemProps } from '../FormItem'
import { InputNumber } from '@galacean/editor-ui'

export type Rect = { x: number; y: number; width: number; height: number }

export interface FormItemRectProps extends Omit<BaseFormItemProps<Rect>, 'onChange'> {
  min?: number
  max?: number
  disabled?: boolean
  onChange?: (value: Rect, key: keyof Rect) => void
}

export function FormItemRect(props: FormItemRectProps) {
  const { value, onChange, min, max, disabled } = props

  const handleOnChange = (prefix: keyof Rect) => (v: number) => {
    if (!onChange) return
    const result = { ...value, [prefix]: v }
    onChange && onChange(result, prefix)
  }

  return (
    <FormItem {...extractFormItemProps(props)} fieldColumn={4}>
      <InputNumber
        disabled={disabled}
        startSlot="X"
        min={min}
        max={max}
        value={value.x}
        onValueChange={handleOnChange('x')}
      />
      <InputNumber
        disabled={disabled}
        min={min}
        max={max}
        startSlot="Y"
        value={value.y}
        onValueChange={handleOnChange('y')}
      />
      <InputNumber
        disabled={disabled}
        min={min}
        max={max}
        startSlot="W"
        value={value.width}
        onValueChange={handleOnChange('width')}
      />
      <InputNumber
        disabled={disabled}
        min={min}
        max={max}
        startSlot="H"
        value={value.height}
        onValueChange={handleOnChange('height')}
      />
    </FormItem>
  )
}
