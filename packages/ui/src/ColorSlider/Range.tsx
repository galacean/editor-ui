import { forwardRef, useMemo } from "react";
import { styled } from "@galacean/design-system";

import { generateLinearGradient, type IColor } from "../ColorPicker/helper";

export const StyledTrack = styled("div", {
  position: "relative",
  width: "100%",
  height: "$4",
  borderRadius: "2px",
  boxShadow: "inset 0 0 0 1px $colors$grayA5",
  overflow: "hidden",
  backgroundSize: "100% 100%",
  meshBackground: 10,
  '& > div:nth-child(1)': {
    position: "absolute",
    inset: 0,
  }
});

interface RangeProps {
  colors: IColor[];
  positions: number[];
}

export const Range = forwardRef<HTMLDivElement, RangeProps>(
  function Range(props: RangeProps, forwardedRef) {
    const { colors, positions } = props;

    const backgroundImage = useMemo(() => {
      return generateLinearGradient(colors, positions);
    }, [colors, positions]);

    return (
      <StyledTrack ref={forwardedRef}>
        <div style={{ backgroundImage }} />
      </StyledTrack>
    );
  }
);
