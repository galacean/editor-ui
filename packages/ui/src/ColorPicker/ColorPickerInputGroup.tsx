import React, { useState, useEffect, useCallback } from "react";
import { IconSelector } from "@tabler/icons-react";
import { HexColorInput } from "react-colorful";
import { colord, HslaColor, RgbaColor } from "colord";
import { styled } from "../../design-system";

import { ActionButton } from "../ActionButton";
import { useEventCallback } from "../../hooks/useEventCallback";
import { useCycleSwitch } from "../../hooks/useCycleSwitch";

type HexaColor = string;
const colorModes = ["RGBA", "HSLA", "HEX"] as const;

const InputGrid = styled("div", {
  display: "flex",
  gridTemplateRows: "1fr",
  gap: "$2",
  marginTop: "$4",
  alignItems: "center",
  variants: {
    readonly: {
      true: {
        pointerEvents: "none",
        opacity: 0.5
      }
    }
  }
});

const InputItem = styled("div", {
  width: 0,
  maxWidth: "100%",
  flexGrow: 1,
  "& > label": {
    display: "block",
    textAlign: "center",
    fontSize: "$1",
    marginTop: "$1",
    color: "$gray11",
    userSelect: "none"
  },
  "& > input": {
    all: "unset",
    height: "$6",
    width: "100%",
    fontSize: "$1",
    textAlign: "center",
    padding: "0 $1_5",
    color: "$gray11",
    borderRadius: "$3",
    backgroundColor: "$grayA3",
    // border: "1px solid $gray5",
    boxSizing: "border-box",
    userSelect: "none",
    "&:focus": {
      color: "$hiContrast",
      borderColor: "$gray8",
      "& + label": {
        color: "$gray12"
      }
    }
  }
});

/** the value ofng rgba is normalized(0~1) */
interface ColorPickerInputProps<T = number> {
  type?: "text" | "number";
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: T;
  defaultValue?: T;
  onChange?: (val: T) => void;
  onBlur?: (val: T) => void;
}

function ColorPickerInput(props: ColorPickerInputProps) {
  const { type = "number", min = 0, max, label, step = 1, onChange, onBlur } = props;
  const id = `ColorPicker${props.label}`;
  const onChangeCallback = useEventCallback<number>(onChange);
  const onBlurCallback = useEventCallback<number>(onBlur);
  const [value, setValue] = useState(String(props.value));

  const validate = useCallback((value: string) => value !== "", []);

  // Trigger `onChange` handler only if the input value is a valid color
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setValue(inputValue);
      const numberd = +inputValue;
      if (validate(inputValue)) {
        onChangeCallback(numberd);
      }
    },
    [onChangeCallback]
  );

  const handleBlur = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setValue(inputValue === "" ? "0" : inputValue);
      const numberd = +inputValue;
      onChangeCallback(numberd);
      onBlurCallback(numberd);
    },
    [onChangeCallback, onBlurCallback]
  );

  useEffect(() => {
    setValue(String(props.value));
  }, [props.value]);

  return (
    <InputItem>
      <input
        id={id}
        step={step}
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <label htmlFor={id}>{label}</label>
    </InputItem>
  );
}

type ColorInputProps<T = RgbaColor> = {
  alpha: boolean;
  value: T;
  onChange: (value: T) => void;
};

function HSLAColorInput(props: ColorInputProps<HslaColor>) {
  const { value, onChange, alpha } = props;

  const handleOnChange = (prefix: keyof HslaColor) => (prefixValue) => {
    onChange && onChange({ ...value, [prefix]: prefixValue });
  };

  return (
    <>
      <ColorPickerInput label="H" value={value.h} onChange={handleOnChange("h")} />
      <ColorPickerInput label="S" value={value.s} onChange={handleOnChange("s")} />
      <ColorPickerInput label="L" value={value.l} onChange={handleOnChange("l")} />
      {alpha && <ColorPickerInput label="A" value={value.a} onChange={handleOnChange("a")} />}
    </>
  );
}

function RGBAColorInput(props: ColorInputProps<RgbaColor>) {
  const { value, onChange, alpha } = props;

  const handleOnChange = (prefix: keyof RgbaColor) => (prefixValue) => {
    onChange && onChange({ ...value, [prefix]: prefixValue });
  };

  return (
    <>
      <ColorPickerInput label="R" value={value.r} onChange={handleOnChange("r")} />
      <ColorPickerInput label="G" value={value.g} onChange={handleOnChange("g")} />
      <ColorPickerInput label="B" value={value.b} onChange={handleOnChange("b")} />
      {alpha && <ColorPickerInput label="A" value={value.a} onChange={handleOnChange("a")} />}
    </>
  );
}

function HEXAColorInput(props: ColorInputProps<HexaColor>) {
  const { value, onChange, alpha } = props;

  return (
    <InputItem>
      <HexColorInput prefixed alpha={alpha} id="colorPickerHex" color={value} onChange={onChange} />
      <label htmlFor="colorPickerHex">HEX</label>
    </InputItem>
  );
}

type ColorPickerInputGroupProps = {
  alpha?: boolean;
  value: RgbaColor;
  onChange: (value: RgbaColor) => void;
  readonly?: boolean;
};

export function ColorPickerInputGroup(props: ColorPickerInputGroupProps) {
  const { value, onChange, alpha = true, readonly = false } = props;
  const [mode, switchMode] = useCycleSwitch(colorModes, "RGBA");

  const rgba = value;
  const hexa = colord(value).minify({ alphaHex: true });
  const hsla = colord(value).toHsl();

  const handleInputChange = (type: typeof colorModes[number]) => (value) => {
    if (type === "HEX") {
      onChange(colord(value).toRgb());
    }
    if (type === "HSLA") {
      onChange(colord(value).toRgb());
    }
    if (type === "RGBA") {
      onChange(value);
    }
  };

  return (
    <InputGrid readonly={readonly}>
      {mode === "HEX" && <HEXAColorInput alpha={alpha} value={hexa} onChange={handleInputChange("HEX")} />}
      {mode === "HSLA" && <HSLAColorInput alpha={alpha} value={hsla} onChange={handleInputChange("HSLA")} />}
      {mode === "RGBA" && <RGBAColorInput alpha={alpha} value={rgba} onChange={handleInputChange("RGBA")} />}
      <ActionButton variant="subtle" onClick={() => switchMode()} css={{ alignSelf: "baseline", borderRadius: "$3" }}>
        <IconSelector />
      </ActionButton>
    </InputGrid>
  );
}
