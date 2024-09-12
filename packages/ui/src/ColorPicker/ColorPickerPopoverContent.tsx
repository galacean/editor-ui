import React, { useState, useEffect, useCallback } from "react";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { RgbaColorPicker, RgbColorPicker } from "react-colorful";

import { overrideStyle } from "./override_style";
import { GradientSlider } from "../ColorSlider/GradientSlider";
import { ParticleSlider } from "../ColorSlider/ParticleSlider";
import { ColorPickerInputGroup } from "./ColorPickerInputGroup";
import { ColorPickerTools } from "./ColorPickerTools";
import { type Color, type GradientColor, type ParticleColor } from "./helper";

import { styled } from "../../design-system";

const ConstantColorPickerRoot = styled("div", {
  position: "relative"
});

interface GradientColorPickerProps {
  mode: "gradient";
  value: GradientColor;
  defaultValue?: GradientColor;
  onValueChange: (color: GradientColor) => void;
}

interface ConstantColorPickerProps {
  mode: "constant";
  value: Color;
  defaultValue?: Color;
  onValueChange: (color: Color) => void;
}

/**
 * In this mode, the alpha value of the color is disabled and set to an constant value of 1.
 */
interface ParticleColorPickerProps {
  mode: "particle";
  value: ParticleColor;
  defaultValue?: ParticleColor;
  onValueChange: (color: ParticleColor) => void;
}

export type ColorPickerRootProps = (
  ConstantColorPickerProps |
  GradientColorPickerProps |
  ParticleColorPickerProps
);

const ColorPickerRoot = function ColorPickerRoot(props: ColorPickerRootProps & { onChangePreviewStr: (color: Color | GradientColor | ParticleColor) => void }) {
  const gProps = props as GradientColorPickerProps;
  const cProps = props as ConstantColorPickerProps;
  const pProps = props as ParticleColorPickerProps;

  const { mode, onChangePreviewStr, defaultValue } = props;

  const [gradientColor, setGradientColor] = useControllableState<GradientColor>({
    prop: mode === "gradient" ? gProps.value : undefined,
    defaultProp: (mode === "gradient" && gProps.defaultValue) ? gProps.defaultValue : [],
    onChange: (v) => {
      onChangePreviewStr(v);
      gProps.onValueChange && gProps.onValueChange(v);
    }
  });

  const [particleColor, setParticleColor] = useControllableState<ParticleColor>({
    prop: mode === "particle" ? pProps.value : { color: [], alpha: [] },
    defaultProp: (mode === "particle" && pProps.defaultValue) ? pProps.defaultValue : { color: [], alpha: [] },
    onChange: (v) => {
      onChangePreviewStr(v);
      pProps.onValueChange && pProps.onValueChange(v);
    }
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<"color" | "alpha">("color");

  function getConstantProp() {
    if (mode === "constant") {
      return cProps.value;
    }
    if (mode === "gradient") {
      return gProps.value[selectedIndex].value;
    }
    if (mode === "particle") {
      return pProps.value[selectedType][selectedIndex].value;
    }
  }

  function getConstantDefaultProp() {
    const constantDefaultValue = { r: 0, g: 0, b: 0, a: 1 };

    if (!defaultValue) return constantDefaultValue;

    if (mode === "constant") {
      return cProps.defaultValue;
    }
    if (mode === "gradient" && gradientColor && gradientColor.length > 0) {
      return gradientColor[selectedIndex].value;
    }
    if (mode === "particle" && particleColor && particleColor.color && particleColor.color.length > 0) {
      return particleColor[selectedType][selectedIndex].value;
    }
    return constantDefaultValue;
  }

  function handleConstantColorChange(color) {
    if (mode === "constant") {
      cProps.onValueChange && cProps.onValueChange(color);
    }
    if (mode === "gradient") {
      const newGradientColor = JSON.parse(JSON.stringify(gradientColor));
      newGradientColor[selectedIndex].value = color;
      setGradientColor(newGradientColor);
      gProps.onValueChange && gProps.onValueChange(newGradientColor);
    }
    if (mode === "particle") {
      const newParticleColor = JSON.parse(JSON.stringify(particleColor));
      newParticleColor[selectedType][selectedIndex].value = color;
      setParticleColor(newParticleColor);
      pProps.onValueChange && pProps.onValueChange(newParticleColor);
    }
  }

  const [color, setColor] = useControllableState<Color>({
    prop: getConstantProp(),
    defaultProp: getConstantDefaultProp(),
    onChange: handleConstantColorChange
  });

  const handleSelectGradientColor = (index: number) => {
    setSelectedIndex(index);
  };

  const handleSelectParticleColor = (index: number, type: "color" | "alpha") => {
    setSelectedType(type);
    // Prevent next selected index out of value range
    setSelectedIndex(Math.min(index, particleColor![type].length - 1));
  };

  const handlePickColor = (color: Color) => {
    setColor(color);
  };

  useEffect(() => {
    overrideStyle();
  }, []);

  useEffect(() => {
    if (mode === "gradient") {
      setColor(gradientColor![selectedIndex].value);
    }
  }, []);

  const readonly = mode === "particle" && selectedType === "alpha";

  return (
    <div>
      {mode === "gradient" && (
        <GradientSlider
          selectedIndex={selectedIndex}
          onSelect={handleSelectGradientColor}
          colors={gradientColor}
          onChange={setGradientColor}
        />
      )}
      {mode === "particle" && (
        <ParticleSlider
          selectedIndex={selectedIndex}
          selectedType={selectedType}
          onSelect={handleSelectParticleColor}
          colors={particleColor}
          onChange={setParticleColor}
        />
      )}
      <ConstantColorPickerRoot className="galacecan-color-picker" data-readonly={readonly}>
        {mode === "particle" && selectedType === "alpha" && <RgbaColorPicker color={color} onChange={setColor} />}
        {mode === "particle" && selectedType === "color" && (
          <RgbColorPicker color={color} onChange={(c) => setColor({ ...c, a: 1 })} />
        )}
        {mode !== "particle" && <RgbaColorPicker color={color} onChange={setColor} />}
        <ColorPickerInputGroup alpha={mode !== "particle"} value={color!} onChange={setColor} readonly={readonly} />
        <ColorPickerTools color={color!} onPickColor={handlePickColor} readonly={readonly} />
      </ConstantColorPickerRoot>
    </div>
  );
};

export { ColorPickerRoot };
