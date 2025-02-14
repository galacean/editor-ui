import { Fragment, useCallback } from 'react'
import { IconPlus, IconMinus } from '@tabler/icons-react'

import { FormItem, withFormItem } from '../FormItem'
import { Button, InputNumber, type InputNumberProps } from '@galacean/editor-ui'
import { BaseFormItemProps } from '../FormItem/FormItem'
import { clamp } from '../../utils'

export interface FormItemInputNumberProps
  extends BaseFormItemProps<number>,
    Pick<InputNumberProps, 'step' | 'dragStep' | 'min' | 'max' | 'endSlot' | 'startSlot'> {
  onChange?: (value: number) => void
}

function round(value, precision = 10) {
  const power = Math.pow(10, precision)
  return Math.round(value * power + Number.EPSILON * power) / power
}

function _FormItemInputNumber(props: FormItemInputNumberProps) {
  const {
    label,
    info,
    formStartSlot,
    formEndSlot,
    startSlot,
    endSlot,
    value,
    disabled,
    onChange,
    step,
    dragStep = 1,
    min = -Infinity,
    max = Infinity,
  } = props

  const handleOnBlur = (e) => {
    if (e.target.value === '') {
      onChange && onChange(0)
    }
  }

  const handleIncrease = () => {
    if (onChange) {
      const ret = clamp(round(value + dragStep), min, max)
      onChange(ret)
    }
  }

  const handleDecrease = () => {
    if (onChange) {
      const ret = clamp(round(value - dragStep), min, max)
      onChange(ret)
    }
  }

  return [
    <InputNumber
      startSlot={startSlot}
      endSlot={endSlot}
      disabled={disabled}
      min={props.min}
      max={props.max}
      step={props.step}
      dragStep={props.dragStep}
      value={props.value}
      onBlur={handleOnBlur}
      onValueChange={onChange}
      key="input-number"
    />,
    <Button size="sm" variant="secondary" onClick={handleDecrease} disabled={disabled} key="decrease-button">
      <IconMinus size="14px" />
    </Button>,
    <Button size="sm" variant="secondary" onClick={handleIncrease} disabled={disabled} key="increase-button">
      <IconPlus size="14px" />
    </Button>
  ]
}

export const FormItemInputNumber = withFormItem(_FormItemInputNumber, "number");