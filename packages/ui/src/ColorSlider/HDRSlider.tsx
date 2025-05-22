import React, { useState, useMemo } from 'react'
import { colord } from 'colord'

import {
  ColorSpace,
  linearToSrgb255,
  linearToSrgbChannel255,
  srgbToLinear255,
  type Color,
  type HDRColor,
} from '../ColorPicker/helper'

import { Slider } from '../Slider'
import { Flex } from '../Flex'
import { styled } from '../design-system'
import { InputNumber } from '../InputNumber'
import { useColorPickerContext } from '../ColorPicker/ColorPickerProvider'
import { clamp } from '../utils'

const StyledHDRSliderRoot = styled('div', {
  display: 'grid',
  gridTemplateColumns: '48px 1fr',
  alignItems: 'center',
  gap: '$1_5',
  flexWrap: 'nowrap',
})

const StyledHDRPreviewRoot = styled('div', {
  display: 'grid',
  borderRadius: '$2',
  gridTemplateColumns: 'repeat(5, 1fr)',
  overflow: 'hidden',
  height: '$6',
  backgroundColor: '$grayA3',
})

const HDRPreviewItem = styled(Flex, {
  position: 'relative',
  height: '100%',
  fontSize: '10px',
  lineHeight: 1,
  cursor: 'pointer',
  userSelect: 'none',
  '-webkit-user-select': 'none',
  '-moz-user-select': 'none',
  '-ms-user-select': 'none',

  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundColor: 'transparent',
  },
  '& > span': {
    color: '$grayA12',
    mixBlendMode: 'difference',
  },
  variants: {
    level: {
      '-2': {
        '&::before': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
      },
      '-1': {
        '&::before': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
      },
      '0': {
        '&::before': {
          backgroundColor: 'transparent',
        },
        border: '2px solid #FFFFFF',
      },
      '+1': {
        '&::before': {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        },
      },
      '+2': {
        '&::before': {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  },
})

interface HDRSliderProps {
  min?: number
  max?: number
  step?: number
  HDRColor: HDRColor
  onChange: (color: HDRColor) => void
}

function mixColorWithIntensity(color: Color, intensity: number) {
  const nextLinearColor = {
    r: Math.round(color.r * intensity),
    g: Math.round(color.g * intensity),
    b: Math.round(color.b * intensity),
    a: color.a,
  }
  return linearToSrgb255(nextLinearColor)
}

function colorStringify(color: Color) {
  color = linearToSrgb255(color)
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
}

export function HDRSlider(props: HDRSliderProps) {
  const { HDRColor, min = 0, max = 10, step = 0.1, onChange } = props
  const { r, g, b, a, intensity } = HDRColor
  const linearColor = useMemo(() => srgbToLinear255({ r, g, b, a }), [r, g, b])

  const [range] = useState<number[]>([min, max])

  const handleIntensityChange = (intensity: number) => {
    if (isNaN(intensity)) return

    const clampedValue = Math.max(min, Math.min(max, intensity))
    onChange({
      ...HDRColor,
      intensity: clampedValue,
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputVal = parseFloat(e.target.value)
    handleIntensityChange(inputVal)
  }

  const handlePreviewItemClick = (levelChange: number) => {
    const newIntensity = clamp(intensity + levelChange, min, max)
    const clampedIntensity = Math.max(min, Math.min(max, newIntensity))
    onChange({
      ...HDRColor,
      intensity: clampedIntensity,
    })
  }

  const colorstr = colorStringify(linearToSrgb255(linearColor))

  const lightenColor = [
    colorStringify(mixColorWithIntensity(linearColor, intensity - 2)),
    colorStringify(mixColorWithIntensity(linearColor, intensity - 1)),
  ]

  const darkenColor = [
    colorStringify(mixColorWithIntensity(linearColor, intensity + 1)),
    colorStringify(mixColorWithIntensity(linearColor, intensity + 2)),
  ]

  console.log('lightenColor', lightenColor)
  console.log('darkenColor', darkenColor)

  const previewItems = [
    { level: -2, text: '-2', bgColor: darkenColor[0], change: clamp(intensity - 1, min, max) },
    { level: -1, text: '-1', bgColor: darkenColor[1], change: clamp(intensity - 2, min, max) },
    { level: 0, text: '', bgColor: colorstr, change: 0 },
    { level: +1, text: '+1', bgColor: lightenColor[0], change: clamp(intensity + 1, min, max) },
    { level: +2, text: '+2', bgColor: lightenColor[1], change: clamp(intensity + 2, min, max) },
  ]

  return (
    <Flex gap="sm" direction="column" css={{ marginTop: '$3' }}>
      <StyledHDRSliderRoot>
        <InputNumber
          value={intensity}
          size="sm"
          min={range[0]}
          max={range[1]}
          onValueChange={handleIntensityChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          step={step}
          dragStep={step}
        />
        <Flex>
          <Slider
            step={step}
            value={[intensity]}
            onValueChange={(value) => handleIntensityChange(value[0])}
            min={range[0]}
            max={range[1]}
          />
        </Flex>
      </StyledHDRSliderRoot>
      <StyledHDRPreviewRoot>
        {previewItems.map((item, index) => (
          <HDRPreviewItem
            key={index}
            align="both"
            level={item.level}
            style={{ backgroundColor: item.bgColor }}
            onClick={() => handlePreviewItemClick(item.level)}>
            <span>{item.text}</span>
          </HDRPreviewItem>
        ))}
      </StyledHDRPreviewRoot>
    </Flex>
  )
}
