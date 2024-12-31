import React, { useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { styled, type StitchesComponent } from "../../design-system";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
// import { Tooltip } from "../Tooltip";

const StyledTrack = styled(SliderPrimitive.Track, {
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  flexGrow: 1,
  borderRadius: "$2",
  overflow: "hidden",
  color: "$gray11",
  '&[data-orientation="horizontal"]': {
    height: "100%"
  },
  '&[data-orientation="vertical"]': {
    width: "100%"
  },
  "&[data-disabled]": {
    backgroundColor: "$grayA3"
  },
});

const StyledRange = styled(SliderPrimitive.Range, {
  position: "absolute",
  backgroundColor: "$grayA4",
  height: "100%",
  transition: "background-color .2s ease",
  '&[data-orientation="vertical"]': {
    width: "100%"
  },
  "&[data-disabled]": {
    backgroundColor: "$grayA2"
  },
});

const StyledThumb = styled(SliderPrimitive.Thumb, {
  all: "unset",
  position: "relative",
  display: "block",
  width: "$0_5",
  height: "100%",
  backgroundColor: '$grayA6',
  transition: "opacity .2s ease, background-color .2s ease, width .2s ease",
  '&[data-orientation="vertical"]': {
    width: "$6",
    height: "$0_5"
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
    height: "$sm",
    backgroundColor: '$grayA3',
    borderRadius: '$2',
  },
  '&[data-orientation="vertical"]': {
    flexDirection: "column",
    width: "$sm"
  },
  cursor: "ew-resize",
  "&:hover": {
    [`& ${StyledRange}`]: {
      backgroundColor: "$blueA10"
    },
    [`& ${StyledThumb}`]: {
      width: '3px',
      backgroundColor: "$white"
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
          borderRadius: "$2"
        },
        [`& ${StyledThumb}`]: {
          width: "14px",
          height: "14px",
          // backgroundColor: "$white",
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
  fontSize: "9px",
  fontFamily: "$mono",
  color: '$grayA10',
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
  /**
   * Whether to show the ruler, default is `false`
   */
  showRuler?: boolean;
  /**
   * You could add some custom slots at the start via this prop. By default it will show the `MIN` when the value is at the minimum.
   */
  startSlot?: React.ReactNode;
  /**
   * You could add some custom slots at the end via this prop. By default it will show the `MAX` when the value is at the maximum.
   */
  endSlot?: React.ReactNode;
};

/**
 * A slider component allows users to select a value from a range of values.
 * 
 * This component is built on top of the `@radix-ui/react-slider`
 * 
 * This component provide controlled and uncontrolled modes.
 */
export function Slider(props: SliderProps) {
  const {
    onValueChange,
    step = 0.1,
    disabled,
    tooltip = true,
    startSlot,
    endSlot,
    compact,
    min = 0,
    max = 100,
    showRuler = false,
    ...rest
  } = props;
  const [value, setValue] = useControllableState({
    prop: props.value,
    defaultProp: props.defaultValue || [0],
    onChange: props.onValueChange
  });
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
        {value![0] === min && <StyledSliderSlot position="start">MIN</StyledSliderSlot>}
        {value![value!.length - 1] === max && <StyledSliderSlot position="end">MAX</StyledSliderSlot>}
        {showRuler && <Ruler length={max} interval={1} majorInterval={Math.round(max / 10)} />}
        {value?.map((v, i) => <StyledThumb key={i} />)}
      </StyledTrack>
      {/* {tooltip ? (
        <Tooltip content={value[0]} arrow open={showTooltip}>
          <StyledThumb />
        </Tooltip>
      ) : ( */}
      {/* )} */}
    </StyledSlider>
  );
}
