import React, { ChangeEvent, FocusEventHandler, MutableRefObject, useCallback, useEffect } from "react";
import { clamp } from '../../utils/math'

interface InputNumberStateOptions {
  value?: number;
  defaultValue?: string | number;
  onChange?(val: number): void;
  fallbackValue?: number;
  min?: number;
  max?: number;
}

interface InputNumberProps {
  ref: React.MutableRefObject<HTMLInputElement>;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  value?: string;
  defaultValue?: string | number
}

export function useInputNumberState(props: InputNumberStateOptions): InputNumberProps {
  const ref = React.useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
  const [value, setVal] = React.useState(`${props.value}`);
  const { fallbackValue = 0, onChange: onChangeProps, min = -Infinity, max = Infinity } = props;

  const isControlled = props.value !== undefined && props.onChange !== undefined;

  const result: InputNumberProps = { ref, defaultValue: props.defaultValue };

  function triggerOnChange(value: number) {
    if (value !== props.value && onChangeProps) onChangeProps(value);
  }

  let showNumber = value;
  if (isControlled) {
    showNumber = ref.current === document.activeElement ? value : props.value + "";
  } else {
    showNumber = value;
  }

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value !== "") {
        const value = clamp(Number(e.target.value), min, max);
        triggerOnChange(value);
      }
      setVal(e.target.value);
    },
    [onChangeProps]
  );

  const onBlur = useCallback(
    (e) => {
      if (e.target.value === "") {
        triggerOnChange(fallbackValue);
        setVal(fallbackValue.toString());
        return;
      }
      const value = clamp(Number(e.target.value), min, max);
      if (!Number.isNaN(value)) {
        setVal(`${value}`);
      } else {
        setVal(fallbackValue.toString());
      }
    },
    [onChangeProps]
  );

  if (isControlled) {
    result.onChange = onChange;
    result.onBlur = onBlur;
    result.value = showNumber;
  }

  return result;
}
