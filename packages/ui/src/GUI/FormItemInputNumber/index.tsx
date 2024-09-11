import React, { Fragment, useCallback } from "react";
import { IconPlus, IconMinus } from "@tabler/icons-react";

import { FormItem } from "../FormItem";
import { InputNumber, InputNumberProps } from "../../InputNumber";
import { Button } from "../../Button";
import { BaseFormItemProps } from "../FormItem/FormItem";
import { clamp } from "../../../utils";

export interface FormItemInputNumberProps extends BaseFormItemProps<number>, Pick<InputNumberProps, 'dragStep' | 'min' | 'max'> {
  additionalControl?: boolean;
  onChange?: (value: number) => void;
}

export function FormItemInputNumber(props: FormItemInputNumberProps) {
  const {
    label,
    info,
    value,
    disabled,
    onChange,
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

  const handleIncrease = useCallback(() => {
    if (onChange) {
      const ret = clamp(value - dragStep, min, max);
      onChange(ret);
    }
  }, [onChange]);

  const handleDecrease = useCallback(() => {
    if (onChange) {
      const ret = clamp(value + dragStep, min, max);
      onChange(ret);
    }
  }, [onChange]);

  return (
    <FormItem
      label={label}
      info={info}
      fieldColumn={additionalControl ? "number" : 1}
    >
      <InputNumber
        disabled={disabled}
        min={props.min}
        max={props.max}
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
