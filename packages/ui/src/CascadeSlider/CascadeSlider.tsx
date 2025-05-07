import { forwardRef, useCallback, useRef } from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { useControllableState } from '@radix-ui/react-use-controllable-state'

import { styled } from '../design-system'

const StyledTrack = styled(SliderPrimitive.Track, {
  display: 'flex',
  position: 'relative',
  flexGrow: 1,
  borderRadius: '$2',
  overflow: 'hidden',
  '&[data-orientation="horizontal"]': {
    height: '100%',
  },

  '&[data-orientation="vertical"]': {
    width: '100%',
  },

  '&[data-disabled]': {
    backgroundColor: '$gray2',
  },
})

const StyledThumb = styled(SliderPrimitive.Thumb, {
  all: 'unset',
  position: 'relative',
  display: 'flex',
  width: '1px',
  height: '$sm',
  backgroundColor: '$grayA3',
  cursor: 'ew-resize',
  transition: 'background-color .2s ease',
  // expand the hit area
  '&::after': {
    content: '',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '$2',
    left: '-$1',
  },
  '&:focus': {
    backgroundColor: '$grayA5',
  },
  '&:hover': {
    backgroundColor: '$grayA5',
  },
  '&[data-orientation="vertical"]': {
    width: '$6',
    height: '$1_5',
  },
  '&[data-disabled"]': {
    backgroundColor: '$grayA5',
  },
})

const StyledSlider = styled(SliderPrimitive.Root, {
  display: 'flex',
  position: 'relative',
  width: '100%',
  backgroundColor: '$grayA3',
  borderRadius: '$2',
  '&[data-orientation="horizontal"]': {
    height: '$sm',
  },
  '&[data-orientation="vertical"]': {
    flexDirection: 'column',
    width: '$sm',
  },
})

const StyledColoredRange = styled('div', {
  height: '100%',
  display: 'flex',
  fontSize: '10px',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  color: '$grayA11',
  cursor: 'default',
  '&:hover': {
    color: '$grayA12',
  },
  variants: {
    level: {
      0: {
        backgroundColor: '$blueA2',
      },
      1: {
        backgroundColor: '$blueA3',
      },
      2: {
        backgroundColor: '$blueA4',
      },
      3: {
        backgroundColor: '$blueA5',
      },
      4: {
        backgroundColor: '$blueA6',
      },
      5: {
        backgroundColor: '$blueA7',
      },
    },
  },
})

function transform(values: number[] = []) {
  const arr: number[] = []

  values.reduce((a, b) => {
    const sum = a + b
    arr.push(sum)
    return sum
  }, 0)

  return arr.slice(0, -1)
}

function revert(values: number[], max: number) {
  const arr: number[] = []

  if (values.length === 1) {
    return [values[0], max - values[0]]
  }

  values.reduce((a, b, index) => {
    if (index === 0) {
      arr.push(b)
      return b
    }
    arr.push(b - a)
    if (index === values.length - 1) {
      arr.push(max - b)
    }
    return b
  }, 0)

  return arr
}

export interface CascadeSliderProps {
  /**
   * An array of numbers representing the current values of the thumbs. Each number corresponds to the position of a thumb on the slider.
   */
  value?: number[]
  /**
   * A callback that is called when the value of the slider changes. The callback receives an array of numbers representing the new values of the thumbs.
   */
  defaultValue?: number[]
  /**
   * A callback that is called when the value of the slider changes. The callback receives an array of numbers representing the new values of the thumbs.
   * @param value the new values of the thumbs
   * @returns
   */
  onChange: (value: number[]) => void
  /**
   * The step size for each thumb movement. This defines the granularity of the slider's value increments.
   * @defaultValue 1
   * @default 1
   * @example 0.1
   */
  step?: number
  /**
   * The maximum value of the slider. By default `max` will set to the sum of all values in the `value` prop.
   * You have to keep in mind that the sum of all values in the `value` prop should be equal to the `max` prop.
   */
  max?: number
  /**
   * The unit of the value displayed on the thumb. By default, the unit is set to `%`.
   */
  unit?: string
  /**
   * The `formatter` function is called for each thumb value to format the value before it is displayed on the thumb.
   * @param value the value of the thumb
   * @param index the index of the thumb
   * @param max the maximum value of the slider
   * @returns the formatted value
   */
  formatter?: (value: number, index: number, max: number) => string | number
}

const sum = (v: number[]) => v.reduce((a, b) => a + b, 0)

/**
 * The `CascaderSlider` component is a React component designed to handle multiple thumbs, making it ideal for scenarios such as controlling the Cascade Shadow property in a 3D engine. This component allows users to adjust multiple values simultaneously through a sliding interface, providing a user-friendly way to manage complex settings.
 *
 * This component built on top of the `@radix-ui/react-slider` and you could use `ref` to access the underlying slider DOM element.
 *
 * This Component provide controlled and uncontrolled modes.
 */
const CascadeSlider = forwardRef<HTMLSpanElement, CascadeSliderProps>(function CascadeSlider(
  props: CascadeSliderProps,
  forwardedRef
) {
  const { value, defaultValue, onChange, formatter, step = 1, max: originalMax, unit = '%' } = props
  const [values, setValues] = useControllableState<number[]>({
    prop: value,
    defaultProp: defaultValue ?? [],
    onChange: onChange,
  })

  const calcMax = sum(values!)
  const max = originalMax || calcMax

  const handleSliderChange = useCallback(
    (v: number[]) => {
      setValues(revert(v, max))
    },
    [max, setValues]
  )

  const sliderValue = transform(values)

  return (
    <StyledSlider
      value={sliderValue}
      onValueChange={handleSliderChange}
      step={step}
      minStepsBetweenThumbs={step}
      max={max}
      ref={forwardedRef}>
      <StyledTrack>
        {values!.map((v, i) => {
          return (
            <StyledColoredRange key={i} level={i as any} style={{ width: `${(v / max) * 100}%` }}>
              {formatter ? formatter(v, i, max) : v}
              {unit}
            </StyledColoredRange>
          )
        })}
      </StyledTrack>
      {[...Array(values!.length)].map((_, i) => (
        <StyledThumb key={i} />
      ))}
    </StyledSlider>
  )
})

export { CascadeSlider }
