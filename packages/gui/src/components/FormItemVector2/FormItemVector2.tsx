import { InputNumber } from '@galacean/editor-ui'
import { Fragment, type ReactNode } from 'react'
import { withFormItem, type BaseFormItemProps } from '../FormItem'

export type Vector2 = { x: number; y: number }

export interface FormItemVector2Props extends Omit<BaseFormItemProps<Vector2>, 'onChange'> {
  min?: number
  max?: number
  onChange?: (value: Vector2, key: keyof Vector2) => void
  slotMapping?: Record<keyof Vector2, ReactNode>
}

export function _FormItemVector2(props: FormItemVector2Props) {
  const { label, info, value, onChange, min, max, disabled, ...rest } = props
  const {
    slotMapping = {
      x: 'X',
      y: 'Y',
    },
  } = rest

  const handleOnChange = (prefix: keyof Vector2) => (v: number) => {
    if (!onChange) return
    const result = { ...value, [prefix]: v }
    onChange && onChange(result, prefix)
  }

  return (
    [
      <InputNumber
        min={min}
        max={max}
        startSlot={slotMapping?.x}
        disabled={disabled}
        value={value.x}
        onValueChange={handleOnChange('x')}
        key="x"
      />,
      <InputNumber
        min={min}
        max={max}
        startSlot={slotMapping?.y}
        disabled={disabled}
        value={value.y}
        onValueChange={handleOnChange('y')}
        key="y"
      />
    ]
  )
}

export const FormItemVector2 = withFormItem(_FormItemVector2, '2')