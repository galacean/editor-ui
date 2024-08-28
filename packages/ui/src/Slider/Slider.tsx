import React, { useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { styled, type StitchesComponent } from "@galacean/design-system";
// import { Tooltip } from "../Tooltip";

const StyledTrack = styled(SliderPrimitive.Track, {
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  flexGrow: 1,
  borderRadius: "$2",
  overflow: "hidden",
  color: "$gra11",
  backgroundColor: "$subtleBg",
  '&[data-orientation="horizontal"]': {
    height: "100%"
  },
  '&[data-orientation="vertical"]': {
    width: "100%"
  },
  "&[data-disabled]": {
    backgroundColor: "$grayA3"
  }
});

const StyledRange = styled(SliderPrimitive.Range, {
  position: "absolute",
  // backgroundColor: "$blue9",
  backgroundColor: "$grayA4",
  height: "100%",
  transition: "background-color .2s ease",
  '&[data-orientation="vertical"]': {
    width: "100%"
  },
  "&[data-disabled]": {
    backgroundColor: "$grayA2"
  }
});

const StyledThumb = styled(SliderPrimitive.Thumb, {
  all: "unset",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "$2",
  height: "$6",
  borderRadius: "$1",
  transition: "opacity .2s ease, background-color .2s ease",
  '&[data-orientation="vertical"]': {
    width: "$6",
    height: "$1_5"
  },
  '&[data-disabled"]': {
    backgroundColor: "$grayA4"
  }
});

const StyledSlider = styled(SliderPrimitive.Root, {
  position: "relative",
  display: "flex",
  alignItems: "center",
  userSelect: "none",
  touchAction: "none",
  width: "100%",
  '&[data-orientation="horizontal"]': {
    height: "$sm"
  },
  '&[data-orientation="vertical"]': {
    flexDirection: "column",
    width: "$sm"
  },
  cursor: "ew-resize",
  "&:hover": {
    [`& ${StyledRange}`]: {
      backgroundColor: "$blue10"
    }
  },
  "&[data-disabled]": {
    pointerEvents: "none",
    color: "$grayA7"
  },
  variants: {
    compact: {
      true: {
        [`& ${StyledTrack}`]: {
          height: "3px",
          borderRadius: "$3"
        },
        [`& ${StyledThumb}`]: {
          width: "14px",
          height: "14px",
          backgroundColor: "$white",
          borderRadius: "$round",
          "&[data-disabled]": {
            backgroundColor: "$gray11"
          }
        },
        [`& ${StyledRange}`]: {
          backgroundColor: "$blue9",
          "&[data-disabled]": {
            backgroundColor: "$blueA8"
          }
        }
      }
    },
    size: {
      xs: {
        '&[data-orientation="horizontal"]': {
          height: "$xs"
        },
        [`& ${StyledTrack}`]: {
          borderRadius: "$2"
        }
      }
    }
  }
});

const StyledSliderSlot = styled("div", {
  position: "absolute",
  pointerEvents: "none",
  top: "50%",
  fontSize: "$0_5",
  fontFamily: "$mono",
  variants: {
    position: {
      start: {
        left: "$1",
        transform: "translateY(-50%)"
      },
      center: {
        left: "50%",
        transform: "translate(-50%, -50%)"
      },
      end: {
        right: "$1",
        transform: "translateY(-50%)"
      }
    }
  },
  defaultVariants: {
    position: "start"
  }
});

const RulerContainer = styled("div", {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  "& svg": {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none"
  }
});

interface RulerProps {
  length: number;
  interval: number;
  majorInterval?: number;
}

const StyledLine = styled('line', {
  stroke: "$grayA6",
})

function Ruler({ length, interval, majorInterval }: RulerProps) {
  const ticks: number[] = [];
  for (let i = 0; i <= length; i += interval) {
    ticks.push(i);
  }

  return (
    <RulerContainer>
      <svg width="100%" height="24px">
        {ticks.map((tick, index, arr) => {
          if(index === 0 || index === arr.length - 1) return null;
          return (
            <StyledLine
              key={index}
              x1={(tick / length) * 100 + "%"}
              y1="24"
              x2={(tick / length) * 100 + "%"}
              y2={majorInterval ? (index % majorInterval === 0 ? "12" : "19") : "19"} // Adjust major tick length
            />
          )
        } )}
      </svg>
    </RulerContainer>
  );
}

export interface SliderProps extends StitchesComponent<typeof StyledSlider> {
  tooltip?: boolean;
  showRuler?: boolean;
  startSlot?: React.ReactNode;
  centerSlot?: React.ReactNode;
  endSlot?: React.ReactNode;
};

export function Slider(props: SliderProps) {
  const {
    onValueChange,
    step = 0.1,
    disabled,
    tooltip = true,
    startSlot,
    centerSlot,
    endSlot,
    compact,
    min = 0,
    max = 100,
    showRuler = false,
    ...rest
  } = props;
  const [value, setValue] = useState(props.value || props.defaultValue || [0]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [accurateMode, setAccurateMode] = useState(false);

  const handleValueChange = (v) => {
    setValue(v);
    if (onValueChange) {
      onValueChange(v);
    }
  };

  const handlePointerDown = (e) => {
    setAccurateMode(e.ctrlKey || e.metaKey);
    setShowTooltip(true);
  };

  const handlePointerUp = () => {
    setShowTooltip(false);
  };

  return (
    <StyledSlider
      max={max}
      min={min}
      step={accurateMode ? step / 10 : step}
      onValueChange={handleValueChange}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      disabled={disabled}
      {...rest}
      compact={compact}
    >
      <StyledTrack className="slider-track">
        <StyledRange className="slider-range" />
        {value[0] === min && <StyledSliderSlot position="start">MIN</StyledSliderSlot>}
        {centerSlot && <StyledSliderSlot position="center">{centerSlot}</StyledSliderSlot>}
        {value[0] === max && <StyledSliderSlot position="end">MAX</StyledSliderSlot>}
        {showRuler && <Ruler length={max} interval={1} majorInterval={Math.round(max / 10)} />}
      </StyledTrack>
      {/* {tooltip ? (
        <Tooltip content={value[0]} arrow open={showTooltip}>
          <StyledThumb />
        </Tooltip>
      ) : ( */}
        <StyledThumb />
      {/* )} */}
    </StyledSlider>
  );
}
