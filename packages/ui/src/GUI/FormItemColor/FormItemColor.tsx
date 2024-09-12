import React, { useState, useEffect } from "react";
import { colord } from "colord";

import { FormItem } from "../FormItem";
import { ColorPicker } from "../../ColorPicker";
import { Input } from "../../Input";
import { Kbd } from "../../Kbd";
import { normalizeColor, denormalizeColor, toNormalizeHexStr, type Color } from "../../../utils/colors";
import { BaseFormItemProps } from "../FormItem/FormItem";

export interface FormItemColorProps extends BaseFormItemProps<Color> {
  value: Color;
  disabled?: boolean;
  labelFirst?: boolean;
  onChange?: (value: Color) => void;
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
        onValueChange={(color) => onChange && onChange(normalizeColor(color))}
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
      <Input code disabled={disabled} endSlot="%" readOnly size="sm" value={`${Math.round(value.a * 100)}`} />
    </FormItem>
  );
}
