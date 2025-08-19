import React, { useState, useEffect } from 'react'
import { colord } from 'colord'

import { FormItem } from '../FormItem'
import { ColorPicker, Input, InputNumber, Text, styled, useColorSpaceConversion, type ColorSpace } from '@galacean/editor-ui'
import { normalizeColor, denormalizeColor, toNormalizeHexStr, type Color } from '@galacean/editor-ui'

import { BaseFormItemProps } from '../FormItem/FormItem'
import { useControllableState } from '@radix-ui/react-use-controllable-state'

export interface FormItemColorProps extends BaseFormItemProps<Color> {
  mode?: 'constant' | 'hdr';
  colorSpace?: ColorSpace;
  onColorSpaceChange?: (colorSpace: ColorSpace) => void;
}

const ColorSpaceBadge = styled('div', {
  display: 'flex',
  alignItems: 'center',
  height: '$3',
  fontSize: '8px',
  borderRadius: '$round',
  padding: '$1',
  backgroundColor: '$gray3',
  boxShadow: '0 0 0 1px $colors$grayA5',
  strokeWidth: 1.2,
  color: '$grayA11',
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: '$gray6',
    color: '$grayA12',
  }
})

const defaultColor: Color = denormalizeColor({ r: 0, g: 0, b: 0, a: 1 })

export function FormItemColor(props: FormItemColorProps) {
  const { label, info, value, disabled, onChange, mode = 'constant', colorSpace = 'sRGB' } = props

  const [displayColorSpace, setDisplayColorSpace] = useState<ColorSpace>(colorSpace);

  useEffect(() => {
    setDisplayColorSpace(colorSpace)
  }, [colorSpace])

  const [color, setColor] = useControllableState({
    prop: denormalizeColor(value),
    defaultProp: defaultColor,
    onChange: (value) => {
      if (onChange) {
        onChange(normalizeColor(value))
      }
    },
  })

  const { displayValue, convertInputToComponentSpace } = useColorSpaceConversion(
    color,
    colorSpace,
    displayColorSpace
  )

  const [colorStr, setColorStr] = useState(toNormalizeHexStr(displayValue))

  useEffect(() => {
    setColorStr(toNormalizeHexStr(displayValue))
  }, [value, displayColorSpace])

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorStr(e.target.value)
  }

  const handleAlphaChange = (value: number) => {
    setColor({ ...color, a: value / 100 })
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const colordValue = colord(`#${colorStr.replace('#', '')}`)
      if (colordValue.isValid()) {
        onChange && onChange(normalizeColor(
          convertInputToComponentSpace(
            colordValue.toRgb()
          )
        ))
      } else {
        setColorStr(toNormalizeHexStr(color))
      }
    }
  }

  const isHdrMode = mode === 'hdr'

  return (
    <FormItem
      label={label}
      info={info}
      fieldColumn={isHdrMode ? '1' : 'color'}
      // {...rest}
    >
      <ColorPicker
        mode={mode as 'constant'}
        fullsize={isHdrMode}
        disabled={disabled}
        colorSpace={colorSpace}
        displayColorSpace={displayColorSpace}
        onDisplayColorSpaceChange={setDisplayColorSpace}
        value={color}
        onValueChange={setColor}
      />
      {!isHdrMode && (
        <>
          <Input
            disabled={disabled}
            startSlot="#"
            size="sm"
            value={colorStr}
            onChange={inputOnChange}
            onKeyDown={onKeyDown}
            code
            endSlot={
              <ColorSpaceBadge
                onClick={() => {
                  setDisplayColorSpace(displayColorSpace === 'sRGB' ? 'Linear' : 'sRGB')
                }}
              >{displayColorSpace}</ColorSpaceBadge>
            }
          />
          <InputNumber
            name="color alpha"
            disabled={disabled}
            size="sm"
            endSlot={<Text size="0_5">%</Text>}
            value={Math.round(color.a * 100)}
            onValueChange={handleAlphaChange}
            min={0}
            max={100}
          />
        </>
      )}
    </FormItem>
  )
}
