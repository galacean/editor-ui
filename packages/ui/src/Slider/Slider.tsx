import React, { useState } from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { styled, type StitchesComponent } from '../design-system'
import { useControllableState } from '@radix-ui/react-use-controllable-state'
// import { Tooltip } from "../Tooltip";

const StyledTrack = styled(SliderPrimitive.Track, {
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  flexGrow: 1,
  borderRadius: '$2',
  // overflow: 'hidden',
  color: '$gray11',
  '&[data-orientation="horizontal"]': {
    height: '100%',
  },
  '&[data-orientation="vertical"]': {
    width: '100%',
  },
  '&[data-disabled]': {
    backgroundColor: '$softBg',
  },
})

const StyledRange = styled(SliderPrimitive.Range, {
  position: 'absolute',
  height: '100%',
  transition: 'background-color .2s ease',
  borderRadius: 'inherit',
  '&[data-orientation="vertical"]': {
    width: '100%',
    height: 'unset',
  },
  '&[data-disabled]': {
    backgroundColor: '$gray6',
  },
})

const StyledThumb = styled(SliderPrimitive.Thumb, {
  // Normal mode: thumb with an icon inside
  // Height matches track height, scale(1.1) makes it slightly overflow
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // Default to sm: width=$5, height=$6 (matches track height)
  width: '$5',
  height: '$6',
  backgroundColor: '$gray4',
  border: '1px solid $grayA2',
  borderRadius: '$2',
  transform: 'scale(1.1)',
  color: '$gray9',
  '&:hover': {
    backgroundColor: '$gray5',
    border: '1px solid $grayA6',
    color: '$gray11',
  },
  '& > svg': {
    transform: 'rotate(90deg)',
  },
  transition: 'opacity .2s ease, background-color .2s ease, width .2s ease, color .2s ease',
  '&:focus-visible': {
    outline: 'none',
  },
  // Vertical orientation: swap width/height
  '&[data-orientation="vertical"]': {
    width: '$6',
    height: '$5',
    '& > svg': {
      transform: 'rotate(0deg)',
    },
  },
  // Disabled state: use solid colors to avoid transparency issues
  '&[data-disabled]': {
    backgroundColor: '$gray6',
    border: '1px solid $grayA6',
    color: '$gray9',
    transform: 'scale(1)',
  },
  // Size variants
  variants: {
    size: {
      xs: {
        width: '$4',
        height: '$5',
        '&[data-orientation="vertical"]': {
          width: '$5',
          height: '$4',
        },
      },
      sm: {
        width: '$5',
        height: '$6',
        '&[data-orientation="vertical"]': {
          width: '$6',
          height: '$5',
        },
      },
    },
    compact: {
      true: {
        // Compact mode: circular white thumb
        width: '16px',
        height: '16px',
        borderRadius: '$round',
        border: 'none',
        transform: 'scale(1)',
        backgroundColor: '$white',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        '& > svg': {
          display: 'none',
        },
        '&:hover': {
          backgroundColor: '$white',
          border: 'none',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
        },
        '&[data-orientation="vertical"]': {
          width: '16px',
          height: '16px',
        },
        '&[data-disabled]': {
          backgroundColor: '$gray10',
        },
      },
    },
  },
  defaultVariants: {
    size: 'sm',
    compact: false,
  },
})

const StyledSlider = styled(SliderPrimitive.Root, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  width: '100%',
  borderRadius: 'inherit',
  '&[data-orientation="horizontal"]': {
    height: '$sm',
    backgroundColor: '$softBg',
    borderRadius: '$2',
    cursor: 'ew-resize',
  },
  '&[data-orientation="vertical"]': {
    flexDirection: 'column',
    width: '$sm',
    height: '100%',
    backgroundColor: '$softBg',
    borderRadius: '$2',
    cursor: 'ns-resize',
  },
  '&:hover': {
    [`& ${StyledRange}`]: {
      backgroundColor: '$selectionBgHover',
    },
  },
  '&[data-disabled]': {
    pointerEvents: 'none',
    color: '$textMuted',
  },
  variants: {
    compact: {
      true: {
        // Compact mode: thin track with circular thumb
        backgroundColor: 'transparent',
        '&[data-orientation="horizontal"]': {
          backgroundColor: 'transparent',
        },
        '&[data-orientation="vertical"]': {
          backgroundColor: 'transparent',
        },
        [`& ${StyledTrack}`]: {
          // Override default height: 100% with fixed 3px and center
          height: '3px',
          alignSelf: 'center',
          borderRadius: '$2',
          backgroundColor: '$softBg',
          '&[data-orientation="vertical"]': {
            width: '3px',
            height: '100%',
            alignSelf: 'unset',
          },
          '&[data-disabled]': {
            backgroundColor: '$gray6',
          },
        },
        [`& ${StyledRange}`]: {
          height: '3px',
          backgroundColor: '$selectionBg',
          '&[data-orientation="vertical"]': {
            width: '3px',
            height: 'unset',
          },
          '&[data-disabled]': {
            backgroundColor: '$gray8',
          },
        },
      },
    },
    size: {
      xs: {
        '&[data-orientation="vertical"]': {
          width: '$xs',
        },
        '&[data-orientation="horizontal"]': {
          height: '$xs',
        },
        [`& ${StyledTrack}`]: {
          borderRadius: '$2',
        },
      },
      sm: {
        '&[data-orientation="vertical"]': {
          width: '$sm',
        },
        '&[data-orientation="horizontal"]': {
          height: '$sm',
        },
        [`& ${StyledTrack}`]: {
          borderRadius: '$2',
        },
      },
    },
  },
})

const StyledSliderSlot = styled('div', {
  position: 'absolute',
  pointerEvents: 'none',
  fontSize: '9px',
  fontFamily: '$mono',
  color: '$textMuted',
  variants: {
    position: {
      start: {
        left: '$1',
        top: '50%',
        transform: 'translateY(-50%)',
      },
      center: {
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      },
      end: {
        right: '$1',
        top: '50%',
        transform: 'translateY(-50%)',
      },
    },
    orientation: {
      horizontal: {},
      vertical: {
        start: {
          bottom: '$1',
          left: '50%',
          top: 'unset',
          transform: 'translateX(-50%)',
        },
        center: {
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        },
        end: {
          top: '$1',
          left: '50%',
          right: 'unset',
          transform: 'translateX(-50%)',
        },
      },
    },
  },
  defaultVariants: {
    position: 'start',
    orientation: 'horizontal',
  },
})

const RulerContainer = styled('div', {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  '& svg': {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
})

interface RulerProps {
  length: number
  interval: number
  majorInterval?: number
  orientation?: 'horizontal' | 'vertical'
}

const StyledLine = styled('line', {
  stroke: '$borderStrong',
})

function Ruler({ length, interval, majorInterval, orientation = 'horizontal' }: RulerProps) {
  const ticks: number[] = []
  for (let i = 0; i <= length; i += interval) {
    ticks.push(i)
  }

  const isVertical = orientation === 'vertical'

  return (
    <RulerContainer>
      <svg width={isVertical ? '24px' : '100%'} height={isVertical ? '100%' : '24px'}>
        {ticks.map((tick, index, arr) => {
          if (index === 0 || index === arr.length - 1) return null
          const position = (tick / length) * 100 + '%'
          const isMajor = majorInterval ? index % majorInterval === 0 : false

          if (isVertical) {
            return <StyledLine key={index} x1="24" y1={position} x2={isMajor ? '12' : '19'} y2={position} />
          }

          return <StyledLine key={index} x1={position} y1="24" x2={position} y2={isMajor ? '12' : '19'} />
        })}
      </svg>
    </RulerContainer>
  )
}

export interface SliderProps extends StitchesComponent<typeof StyledSlider> {
  tooltip?: boolean
  /**
   * Whether to show the ruler, default is `false`
   */
  showRuler?: boolean
  /**
   * You could add some custom slots at the start via this prop. By default it will show the `MIN` when the value is at the minimum.
   */
  startSlot?: React.ReactNode
  /**
   * You could add some custom slots at the end via this prop. By default it will show the `MAX` when the value is at the maximum.
   */
  endSlot?: React.ReactNode
}

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
    size = 'sm',
    orientation = 'horizontal',
    ...rest
  } = props
  const [value, setValue] = useControllableState({
    prop: props.value,
    defaultProp: props.defaultValue || [0],
    onChange: props.onValueChange,
  })
  const [showTooltip, setShowTooltip] = useState(false)
  const [accurateMode, setAccurateMode] = useState(false)

  const handleValueChange = (v) => {
    setValue(v)
    if (onValueChange) {
      onValueChange(v)
    }
  }

  const handlePointerDown = (e) => {
    setAccurateMode(e.ctrlKey || e.metaKey)
    setShowTooltip(true)
  }

  const handlePointerUp = () => {
    setShowTooltip(false)
  }

  return (
    <StyledSlider
      max={max}
      min={min}
      step={accurateMode ? step / 10 : step}
      onValueChange={handleValueChange}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      disabled={disabled}
      orientation={orientation}
      {...rest}
      compact={compact}>
      <StyledTrack className="slider-track">
        <StyledRange className="slider-range" />
        {value![0] === min && (
          <StyledSliderSlot position="start" orientation={orientation}>
            MIN
          </StyledSliderSlot>
        )}
        {value![value!.length - 1] === max && (
          <StyledSliderSlot position="end" orientation={orientation}>
            MAX
          </StyledSliderSlot>
        )}
        {showRuler && (
          <Ruler length={max} interval={1} majorInterval={Math.round(max / 10)} orientation={orientation} />
        )}
      </StyledTrack>
      {value?.map((v, i) => (
        <StyledThumb className="slider-thumb" key={i} size={size} compact={compact}>
          {!compact && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="none"
              id="Menu--Streamline-Majesticons"
              height={12}
              width={12}>
              <desc>{'\n    Menu Streamline Icon: https://streamlinehq.com\n  '}</desc>
              <path
                stroke="CurrentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.3333}
                d="M4 5.333333333333333h8M4 8h8M4 10.666666666666666h8"
              />
            </svg>
          )}
        </StyledThumb>
      ))}
    </StyledSlider>
  )
}
