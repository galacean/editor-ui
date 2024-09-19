import React, { useState, useEffect, forwardRef } from "react";

import { useInputNumberState } from "./useInputNumberState";
import { clamp } from "../../utils/math";

import type { VariantProps } from "../../design-system";
import { styled } from "../../design-system";
import { Input } from "../Input";
import { mergeRefs } from "../../utils/merge-refs";

function round(value, precision = 2) {
  const power = Math.pow(10, precision)
  return Math.round((value*power)+(Number.EPSILON*power)) / power
}

function safePlus(a, b): number {
  a = isNaN(Number(a)) ? 0 : Number(a);
  b = isNaN(Number(b)) ? 0 : Number(b);
  return round(a + b);
}

function safeTimes(a, b) {
  a = isNaN(Number(a)) ? 0 : Number(a);
  b = isNaN(Number(b)) ? 0 : Number(b);
  return round(a * b);
}

const StyledNumController = styled("div", {
  visibility: "hidden",
  display: "flex",
  height: "100%",
  alignItems: "center",
  color: "$gray7",
  cursor: "ew-resize",
  "&::after": {
    content: " ",
    height: "68%",
    width: "2px",
    backgroundColor: "$grayA5",
    borderRadius: "1px",
    transition: "height .1s ease"
  },
  "&:hover": {
    visibility: "visible",
    "&::after": {
      backgroundColor: "$grayA9"
    }
  },
  "& > svg": {
    flex: 1
  },
  variants: {
    active: {
      true: {
        "&::after": {
          visibility: "visible",
          backgroundColor: "$gray11"
        }
      }
    },
    tight: {
      true: {
        "&::after": {
          height: "50%"
        }
      }
    }
  },
  defaultVariants: {
    tight: false
  }
});

const StyledInputNumberRoot = styled("div", {
  "&:hover": {
    [`& ${StyledNumController}`]: {
      visibility: "visible"
    }
  }
});

export interface InputNumberProps extends VariantProps<typeof Input>, Omit<React.ComponentProps<typeof Input>, "onChange"> {
  min?: number;
  max?: number;
  step?: number;
  dragStep?: number;
  onValueChange?: (v: number) => void;
  value?: number;
  defaultValue?: number;
};

/**
 * InputNumber is a component extending the Input component to allow for numerical input.
 * 
 * This Component provide controlled and uncontrolled modes.
 */
export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  function InputNumber(props: InputNumberProps, forwardedRef) {
    const {
      size,
      min = -Infinity,
      max = Infinity,
      startSlot,
      dragStep = 0.1,
      step = 0.1,
      disabled,
      onValueChange,
      ...rest
    } = props;

    const [accurateMode, setAccurateMode] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const { ref, value, defaultValue, onBlur, onChange } = useInputNumberState({
      onChange: onValueChange,
      value: props.value,
      fallbackValue: 0,
      min,
      max
    });

    const handleMouseDown = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) setAccurateMode(true);
      setDragging(true);
      setStartX(e.clientX);
    };

    const handleMouseMove = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setAccurateMode(e.ctrlKey || e.metaKey);
      const step = accurateMode ? dragStep / 10 : dragStep;
      if (!dragging) return;
      const diff = safeTimes(safePlus(e.clientX, -startX), step);
      const newValue = clamp(safePlus(props.value, diff), min, max);
      if(onChange) {
        onChange({ target: { value: newValue.toString() } } as React.ChangeEvent<HTMLInputElement>);
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
      setAccurateMode(false);
    };

    useEffect(() => {
      if (dragging) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      } else {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      }
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [dragging, accurateMode]);

    return (
      <StyledInputNumberRoot>
        <Input
          {...rest}
          ref={mergeRefs([ref, forwardedRef])}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          size={size}
          min={min}
          max={max}
          step={step}
          type="number"
          startSlot={startSlot}
          endSlot={
            !disabled && <StyledNumController active={dragging} tight={accurateMode} onMouseDown={handleMouseDown} />
          }
        />
      </StyledInputNumberRoot>
    );
  }
);
