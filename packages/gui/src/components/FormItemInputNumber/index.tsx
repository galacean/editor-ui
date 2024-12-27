import { Fragment, useCallback } from "react";
import { IconPlus, IconMinus } from "@tabler/icons-react";

import { FormItem } from "../FormItem";
import { clamp, Button, InputNumber, type InputNumberProps } from '@galacean/editor-ui'
import { BaseFormItemProps } from "../FormItem/FormItem";

export interface FormItemInputNumberProps extends BaseFormItemProps<number>, Pick<InputNumberProps,  'step' | 'dragStep' | 'min' | 'max' | 'endSlot' | 'startSlot'> {
  additionalControl?: boolean;
  onChange?: (value: number) => void;
}

function round(value, precision = 10) {
  const power = Math.pow(10, precision)
  return Math.round((value*power)+(Number.EPSILON*power)) / power
}

export function FormItemInputNumber(props: FormItemInputNumberProps) {
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
    additionalControl = true
  } = props;

  const handleOnBlur = (e) => {
    if (e.target.value === "") {
      onChange && onChange(0);
    }
  };

  const handleIncrease = () => {
    if (onChange) {
      const ret = clamp(round(value + dragStep), min, max);
      onChange(ret);
    }
  };

  const handleDecrease = () => {
    if (onChange) {
      const ret = clamp(round(value - dragStep), min, max);
      onChange(ret);
    }
  }

  return (
    <FormItem
      label={label}
      info={info}
      fieldColumn={additionalControl ? "number" : 1}
      formStartSlot={formStartSlot}
      formEndSlot={formEndSlot}
    >
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
      />
      {additionalControl && (
        <Fragment>
          <Button size="sm" variant="secondary" onClick={handleDecrease} disabled={disabled}>
            <IconMinus size="14px" />
          </Button>
          <Button size="sm" variant="secondary" onClick={handleIncrease} disabled={disabled}>
            <IconPlus size="14px" />
          </Button>
        </Fragment>
      )}
    </FormItem>
  );
}
