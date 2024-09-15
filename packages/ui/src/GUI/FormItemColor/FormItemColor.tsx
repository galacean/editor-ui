import React, { useState, useEffect } from "react";
import { colord } from "colord";

import { FormItem } from "../FormItem";
import { ColorPicker } from "../../ColorPicker";
import { Input } from "../../Input";
import { Kbd } from "../../Kbd";
import { normalizeColor, denormalizeColor, toNormalizeHexStr, type Color } from "../../../utils/colors";
import { BaseFormItemProps } from "../FormItem/FormItem";
import { styled } from "../../../design-system";

export interface FormItemColorProps extends BaseFormItemProps<Color> {
  value: Color;
  disabled?: boolean;
  labelFirst?: boolean;
  onChange?: (value: Color) => void;
}

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

export function FormItemColor(props: FormItemColorProps) {
  const { label, info, value, disabled, labelFirst, onChange, ...rest } = props;
  const [colorStr, setColorStr] = useState(toNormalizeHexStr(value));
  const [dirty, setDirty] = useState(false);

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorStr(e.target.value);
    setDirty(true);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const color = colord(`#${colorStr.replace("#", "")}`);
      if (color.isValid()) {
        onChange && onChange(normalizeColor(color.toRgb()));
        setDirty(false);
      } else {
        setColorStr(toNormalizeHexStr(value));
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
      {...rest}
    >
      <ColorPicker
        mode="constant"
        disabled={disabled}
        value={denormalizeColor(value)}
        defaultValue={denormalizeColor(value)}
        onValueChange={(color) => onChange && onChange(normalizeColor(color))}
      />
      <Input
        disabled={disabled}
        startSlot="#"
        size="sm"
        onChange={inputOnChange}
        onKeyDown={onKeyDown}
        value={colorStr}
        defaultValue={colorStr}
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
