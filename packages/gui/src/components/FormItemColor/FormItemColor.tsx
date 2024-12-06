import React, { useState, useEffect } from "react";
import { colord } from "colord";

import { FormItem } from "../FormItem";
import { ColorPicker, Input, Kbd, styled } from '@galacean/editor-ui'
import { normalizeColor, denormalizeColor, toNormalizeHexStr, type Color } from "@galacean/editor-ui";
import { BaseFormItemProps } from "../FormItem/FormItem";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

export interface FormItemColorProps extends BaseFormItemProps<Color> {}

interface HorizontalSliderProps {
}

const StyledSliderInner = styled('div', {
  height: '20%',
  width: '100%',
  backgroundColor: '$grayA11',
});

const StyledSlider = styled('div', {
  height: '100%',
  width: '$2',
  backgroundColor: '$grayA4',
  opacity: 0,
})

const StyledSliderRoot = styled('div', {
  position: 'relative',
  height: '100%',
  maxHeight: '100%',
  marginRight: '$0_5',
  padding: '$1 0',
  cursor: "ns-resize",
  '&::after': {
    content: '%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    color: '$gray11',
    pointerEvents: 'none',
  },
  '&:hover': {
    '&::after': {
      opacity: 0,
    },
    [`& ${StyledSlider}`]: {
      opacity: 1,
    }
  },
})

function HorizontalSlider() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const thumbRef = React.useRef<HTMLDivElement>(null);

  return (
    <StyledSliderRoot ref={containerRef}>
      <StyledSlider>
        <StyledSliderInner />
      </StyledSlider>
    </StyledSliderRoot>
  );
}

const defaultColor: Color = denormalizeColor({ r: 0, g: 0, b: 0, a: 1 });

export function FormItemColor(props: FormItemColorProps) {
  // const { label, info, value, disabled, onChange, ...rest } = props;
  const { label, info, value, disabled, onChange } = props;
  const [color, setColor] = useControllableState({
    prop: denormalizeColor(props.value),
    defaultProp: defaultColor,
    onChange: (value) => {
      if(onChange) {
        onChange(normalizeColor(value))
      }
    },
  })

  const [colorStr, setColorStr] = useState(toNormalizeHexStr(color));
  const [dirty, setDirty] = useState(false);

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorStr(e.target.value);
    setDirty(true);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const colordValue = colord(`#${colorStr.replace("#", "")}`);
      if (colordValue.isValid()) {
        onChange && onChange(normalizeColor(colordValue.toRgb()));
        setDirty(false);
      } else {
        setColorStr(toNormalizeHexStr(color));
      }
    }
  };

  useEffect(() => {
    setColorStr(toNormalizeHexStr(value));
  }, [value]);

  return (
    <FormItem
      label={label}
      info={info}
      fieldColumn="color"
      // {...rest}
    >
      <ColorPicker
        mode="constant"
        disabled={disabled}
        value={color}
        onValueChange={(color) => setColor && setColor(color)}
      />
      <Input
        disabled={disabled}
        startSlot="#"
        size="sm"
        onChange={inputOnChange}
        onKeyDown={onKeyDown}
        value={colorStr}
        code
        endSlot={
          dirty ? (
            <Kbd css={{ verticalAlign: "text-top" }} size="xs">
              ↵
            </Kbd>
          ) : (
            "HEX"
          )
        }
      />
      <Input code disabled={disabled} endSlot={<HorizontalSlider />} readOnly size="sm" value={`${Math.round(value.a * 100)}`} />
    </FormItem>
  );
}
