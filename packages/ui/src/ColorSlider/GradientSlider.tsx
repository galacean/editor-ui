import React, { useMemo } from "react";
import { useControllableState } from '@radix-ui/react-use-controllable-state';

import type { GradientColor } from "../ColorPicker/helper";
import { Range } from "./Range";
import { ThumbGroup } from "./Thumb";

import { styled } from "@galacean/design-system";

const StyledGradientSliderRoot = styled("div", {
  position: "relative",
  marginBottom: "$2",
  width: '100%',
});

interface GradientSliderProps {
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  // The `colors` property must contain at least two colors.
  colors?: GradientColor;
  onChange?: (colors: GradientColor) => void;
}


function GradientSlider(props: GradientSliderProps) {
  const [index, setIndex] = useControllableState<number>({
    defaultProp: -1,
    prop: props.selectedIndex,
    onChange: (i) => {
      if(props.onSelect) {
        props.onSelect(i)
      }
    },
  });
  const [colors, setColors] = useControllableState({
    defaultProp: [
      { value: { r: 30, g: 99, b: 238, a: 0.5 }, position: 0 },
      { value: { r: 30, g: 99, b: 238, a: 1 }, position: 1 }
    ],
    prop: props.colors,
    onChange: props.onChange,
  });
  const ref = React.useRef<HTMLDivElement>(null);
  const colorValues = useMemo(() => colors!.map((c) => c.value), [colors]);
  const positionValues = useMemo(() => colors!.map((c) => c.position), [colors]);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const { current } = ref;
    if (!current) return;
    const { right, left } = current.getBoundingClientRect();
    setWidth(right - left);
  }, []);

  return (
    <StyledGradientSliderRoot>
      {width !== 0 &&
        <ThumbGroup
          selectedIndex={index!}
          onSelect={setIndex}
          width={width}
          onChange={setColors}
          colors={colorValues}
          positions={positionValues}
          flipY
        />
      }
      <Range ref={ref} colors={colorValues} positions={positionValues} />
    </StyledGradientSliderRoot>
  );
}

export { GradientSlider };
