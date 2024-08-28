import React, { useMemo } from "react";
import { useControllableState } from '@radix-ui/react-use-controllable-state';

import type { GradientColor, ParticleColor } from "../ColorPicker/helper";
import { Range } from "./Range";
import { ThumbGroup } from "./Thumb";

import { styled } from "@galacean/design-system";

const StyledParticleSliderRoot = styled("div", {
  width: '100%',
  position: "relative",
  marginBottom: "$2"
});

interface ParticleSliderProps {
  selectedType?: "color" | "alpha";
  selectedIndex?: number;
  colors?: ParticleColor;
  onSelect?: (index: number, type: "color" | "alpha") => void;
  onChange?: (colors: ParticleColor) => void;
}

function ParticleSlider(props: ParticleSliderProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useControllableState<{
    type: "color" | "alpha";
    index: number;
  }>({
    prop: props.selectedType && props.selectedIndex !== undefined ? { type: props.selectedType, index: props.selectedIndex } : undefined,
    defaultProp: { type: 'color', index: -1 },
    onChange: (value) => {
      if (props.onSelect) {
        props.onSelect(value.index, value.type);
      }
    }
  });

  const [colors, setColors] = useControllableState<ParticleColor>({
    prop: props.colors,
    defaultProp: {
      color: [
        { value: { r: 255, g: 255, b: 255, a: 0.5 }, position: 0 },
        { value: { r: 30, g: 99, b: 238, a: 1 }, position: 1 }
      ],
      alpha: [
        { value: { r: 255, g: 255, b: 255, a: 0.5 }, position: 0 },
        { value: { r: 255, g: 255, b: 255, a: 0.5 }, position: 1 }
      ]
    },
    onChange: props.onChange,
  });

  const [width, setWidth] = React.useState(0);
  const colorValues = useMemo(() => colors!.color.map((c) => c.value), [colors]);
  const colorPositionsValues = useMemo(() => colors!.color.map((c) => c.position), [colors]);
  const alphasValues = useMemo(() => colors!.alpha.map((c) => c.value), [colors]);
  const alphaPositionValues = useMemo(() => colors!.alpha.map((c) => c.position), [colors]);

  React.useEffect(() => {
    const { current } = ref;
    if (!current) return;
    const { right, left } = current.getBoundingClientRect();
    setWidth(right - left);
  }, []);

  const handleThumbChange = (type: "alpha" | "color") => (value: GradientColor) => {
    setColors({
      ...colors!,
      [type]: value
    });
  };

  const handleThumbSelect = (type: "alpha" | "color") => (index: number) => {
    setSelected({ type, index });
  };

  return (
    <StyledParticleSliderRoot>
      <ThumbGroup
        selectedIndex={selected?.type === "color" ? selected.index : -1}
        onSelect={handleThumbSelect("color")}
        width={width}
        onChange={handleThumbChange("color")}
        colors={colorValues}
        positions={colorPositionsValues}
        flipY
      />
      <Range ref={ref} colors={colorValues} positions={colorPositionsValues} />
      <ThumbGroup
        selectedIndex={selected?.type === "alpha" ? selected.index : -1}
        onSelect={handleThumbSelect("alpha")}
        width={width}
        onChange={handleThumbChange("alpha")}
        colors={alphasValues}
        positions={alphaPositionValues}
      />
    </StyledParticleSliderRoot>
  );
}

export { ParticleSlider };
