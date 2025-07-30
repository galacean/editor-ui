import React, { useState, useEffect } from 'react'
import { colord } from 'colord'

import { FormItem } from '../FormItem'
import { ColorPicker, HDRColor, Input, InputNumber, Kbd, Text, styled } from '@galacean/editor-ui'
import { normalizeColor, denormalizeColor, toNormalizeHexStr, type Color } from '@galacean/editor-ui'
import { BaseFormItemProps } from '../FormItem/FormItem'
import { useControllableState } from '@radix-ui/react-use-controllable-state'

export interface FormItemColorProps extends BaseFormItemProps<Color> {
  mode?: 'constant' | 'hdr'
}

interface HorizontalSliderProps {}

const StyledSliderInner = styled('div', {
  height: '20%',
  width: '100%',
  backgroundColor: '$grayA11',
})

const StyledSlider = styled('div', {
  height: '100%',
  width: '$2',
  backgroundColor: '$grayA4',
  opacity: 0,
})

const StyledSliderRoot = styled('div', {
  position: 'relative',
  height: '100%',
  maxHeight: '100%',
  marginRight: '$0_5',
  padding: '$1 0',
  cursor: 'ns-resize',
  '&::after': {
    content: '%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    color: '$gray11',
    pointerEvents: 'none',
  },
  '&:hover': {
    '&::after': {
      opacity: 0,
    },
    [`& ${StyledSlider}`]: {
      opacity: 1,
    },
  },
})

const defaultColor: Color = denormalizeColor({ r: 0, g: 0, b: 0, a: 1 })

export function FormItemColor(props: FormItemColorProps) {
  const { label, info, value, disabled, onChange, mode = 'constant' } = props
  const [color, setColor] = useControllableState({
    prop: denormalizeColor(props.value),
    defaultProp: defaultColor,
    onChange: (value) => {
      if (onChange) {
        onChange(normalizeColor(value))
      }
    },
  })

  const [colorStr, setColorStr] = useState(toNormalizeHexStr(color))

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorStr(e.target.value)
  }

  const handleAlphaChange = (value: number) => {
    setColor({ ...color, a: value })
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const colordValue = colord(`#${colorStr.replace('#', '')}`)
      if (colordValue.isValid()) {
        onChange && onChange(normalizeColor(colordValue.toRgb()))
      } else {
        setColorStr(toNormalizeHexStr(color))
      }
    }
  }

  useEffect(() => {
    setColorStr(toNormalizeHexStr(value))
  }, [value])

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
        value={color}
        onValueChange={(color) => setColor && setColor(color)}
      />
      {!isHdrMode && (
        <>
          <Input
            disabled={disabled}
            startSlot="#"
            size="sm"
            onChange={inputOnChange}
            onKeyDown={onKeyDown}
            value={colorStr}
            code
            endSlot={<Text size="0_5">HEX</Text>}
          />
          <InputNumber
            name="color alpha"
            disabled={disabled}
            size="sm"
            endSlot={<Text size="0_5">%</Text>}
            value={color.a}
            onValueChange={handleAlphaChange}
          />
        </>
      )}
    </FormItem>
  )
}
