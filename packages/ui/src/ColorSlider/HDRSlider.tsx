import React, { useState, useMemo } from 'react'
import { IconBrightness } from '@tabler/icons-react'
import { colord } from 'colord'

import { type Color, type HDRColor } from '../ColorPicker/helper'

import { Slider } from '../Slider'
import { Flex } from '../Flex'
import { styled } from '../design-system'
import { InputNumber } from '../InputNumber'
import { Text } from '../Typography'

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
  '& > span' :{
    color: '$grayA12',
    mixBlendMode: 'color-dodge',
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

const IconIntensity = styled(IconBrightness, {
  color: '$gray10',
  height: '$4',
  width: '$4',
})

interface HDRSliderProps {
  min?: number
  max?: number
  step?: number
  HDRColor: HDRColor
  onChange: (color: HDRColor) => void
}

function mixColorWithIntensity(color: Color, intensity: number) {
  const { r, g, b, a } = color
  const col = colord({ r, g, b, a })
  return col.mix(colord('white'), intensity).toRgb()
}

export function HDRSlider(props: HDRSliderProps) {
  const { HDRColor, min = -10, max = 10, step = 0.1, onChange } = props
  const { r, g, b, a, intensity } = HDRColor
  const colorstr = useMemo(() => {
    const multiplier = Math.pow(2, intensity)
    const newColor: Color = {
      r: Math.round(r * multiplier),
      g: Math.round(g * multiplier),
      b: Math.round(b * multiplier),
      a: a,
    }
    return `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${newColor.a})`
  }, [r, g, b, a, intensity])

  const [range, setRange] = useState<number[]>([min, max])

  const handleIntensityChange = (intensity: number) => {
    if (isNaN(intensity)) return;

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
    const newIntensity = intensity + levelChange
    const clampedIntensity = Math.max(min, Math.min(max, newIntensity))
    onChange({
      ...HDRColor,
      intensity: clampedIntensity,
    })
  }

  const lightenColor = useMemo(() => {
    return [colord(colorstr).lighten(0.1).toRgbString(), colord(colorstr).lighten(0.2).toRgbString()]
  }, [colorstr])

  const darkenColor = useMemo(() => {
    return [colord(colorstr).darken(0.2).toRgbString(), colord(colorstr).darken(0.1).toRgbString()]
  }, [colorstr])

  const previewItems = [
    { level: -2, text: '-2', bgColor: darkenColor[0], change: -2 },
    { level: -1, text: '-1', bgColor: darkenColor[1], change: -1 },
    { level: 0, text: '', bgColor: colorstr, change: 0 },
    { level: +1, text: '+1', bgColor: lightenColor[0], change: 1 },
    { level: +2, text: '+2', bgColor: lightenColor[1], change: 2 },
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
            onClick={() => handlePreviewItemClick(item.change)}
          >
            <span>
              {item.text}
            </span>
          </HDRPreviewItem>
        ))}
      </StyledHDRPreviewRoot>
    </Flex>
  )
}
