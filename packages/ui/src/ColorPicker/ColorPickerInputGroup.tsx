import React, { useState, useEffect, useCallback } from 'react'
import { IconSelector } from '@tabler/icons-react'
import { HexColorInput } from 'react-colorful'
import { colord, HslaColor, RgbaColor } from 'colord'
import { styled } from '../design-system'

import { ActionButton } from '../ActionButton'
import { useEventCallback } from '../hooks/useEventCallback'
import { useCycleSwitch } from '../hooks/useCycleSwitch'
import { srgbColorToLinear, type ColorSpace } from './helper'
import { useColorSpaceConversion, createDisplayColorSpaceToggle } from './useColorSpaceConversion'


type HexaColor = string
const colorModes = ['RGBA', 'HSLA', 'HEX'] as const

const ColorSpaceBadge = styled('div', {
  position: 'absolute',
  top: '-$3',
  left: '-$3',
  fontSize: '$0_5',
  transform: 'scale(0.7)',
  borderRadius: '$round',
  padding: '$0_5 $1_5',
  backgroundColor: '$gray3',
  boxShadow: '0 0 0 1px $colors$grayA5',
  strokeWidth: 1.2,
  color: '$gray12',
  cursor: 'pointer',
  userSelect: 'none',
  '&:hover': {
    backgroundColor: '$gray4',
  }
})

const InputGrid = styled('div', {
  position: 'relative',
  display: 'flex',
  gridTemplateRows: '1fr',
  gap: '$2',
  marginTop: '$4',
  alignItems: 'center',
  variants: {
    readonly: {
      true: {
        pointerEvents: 'none',
        opacity: 0.5,
      },
    },
  },
})

const InputItem = styled('div', {
  width: 0,
  maxWidth: '100%',
  flexGrow: 1,
  '& > label': {
    display: 'block',
    textAlign: 'center',
    fontSize: '$1',
    marginTop: '$1',
    color: '$gray11',
    userSelect: 'none',
  },
  '& > input': {
    all: 'unset',
    height: '$6',
    width: '100%',
    fontSize: '$1',
    textAlign: 'center',
    padding: '0 $1_5',
    color: '$gray11',
    borderRadius: '$3',
    backgroundColor: '$grayA3',
    // border: "1px solid $gray5",
    boxSizing: 'border-box',
    userSelect: 'none',
    '&:focus': {
      color: '$hiContrast',
      borderColor: '$gray8',
      '& + label': {
        color: '$gray12',
      },
    },
  },
})

/** the value of rgba is 0~255 */
interface ColorPickerInputProps<T = number> {
  type?: 'text' | 'number'
  label?: string
  min?: number
  max?: number
  step?: number
  value?: T
  defaultValue?: T
  onChange?: (val: T) => void
  onBlur?: (val: T) => void
}

function ColorPickerInput(props: ColorPickerInputProps) {
  const { type = 'number', min = 0, max, label, step = 1, onChange, onBlur } = props
  const id = `ColorPicker${props.label}`
  const onChangeCallback = useEventCallback<number>(onChange)
  const onBlurCallback = useEventCallback<number>(onBlur)
  const [value, setValue] = useState(String(props.value))

  const validate = useCallback((value: string) => value !== '', [])

  // Trigger `onChange` handler only if the input value is a valid color
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      setValue(inputValue)
      const numberd = +inputValue
      if (validate(inputValue)) {
        onChangeCallback(numberd)
      }
    },
    [onChangeCallback]
  )

  const handleBlur = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      setValue(inputValue === '' ? '0' : inputValue)
      const numberd = +inputValue
      onChangeCallback(numberd)
      onBlurCallback(numberd)
    },
    [onChangeCallback, onBlurCallback]
  )

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
    }
  }, [])

  useEffect(() => {
    setValue(String(props.value))
  }, [props.value])

  return (
    <InputItem>
      <input
        id={id}
        step={step}
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      <label htmlFor={id}>{label}</label>
    </InputItem>
  )
}

type ColorInputProps<T = RgbaColor> = {
  alpha: boolean
  value: T
  onChange: (value: T) => void
}

function HSLAColorInput(props: ColorInputProps<HslaColor>) {
  const { value, onChange, alpha } = props

  const handleOnChange = (prefix: keyof HslaColor) => (prefixValue: number) => {
    onChange && onChange({ ...value, [prefix]: prefixValue })
  }

  return (
    <>
      <ColorPickerInput label="H" value={value.h} onChange={handleOnChange('h')} />
      <ColorPickerInput label="S" value={value.s} onChange={handleOnChange('s')} />
      <ColorPickerInput label="L" value={value.l} onChange={handleOnChange('l')} />
      {alpha && <ColorPickerInput label="A" value={value.a} onChange={handleOnChange('a')} />}
    </>
  )
}

function RGBAColorInput(props: ColorInputProps<RgbaColor>) {
  const { value, onChange, alpha } = props

  const handleOnChange = (prefix: keyof RgbaColor) => (prefixValue: number) => {
    onChange && onChange({ ...value, [prefix]: prefixValue })
  }

  const handleBlur = (prefix: keyof RgbaColor) => (prefixValue: number) => {
    if (prefix !== 'a' && prefixValue > 255) {
      onChange({ ...value, [prefix]: 255 })
    }
  }

  return (
    <>
      <ColorPickerInput label="R" value={value.r} max={255} onBlur={handleBlur('r')} onChange={handleOnChange('r')} />
      <ColorPickerInput label="G" value={value.g} max={255} onBlur={handleBlur('g')} onChange={handleOnChange('g')} />
      <ColorPickerInput label="B" value={value.b} max={255} onBlur={handleBlur('b')} onChange={handleOnChange('b')} />
      {alpha && <ColorPickerInput label="A" value={value.a} max={1} onChange={handleOnChange('a')} />}
    </>
  )
}

function HEXAColorInput(props: ColorInputProps<HexaColor>) {
  const { value, onChange, alpha } = props
  const [color, setColor] = useState(value)

  useEffect(() => {
    setColor(value)
  }, [value])

  function submitColor(color: string) {
    const colordInstance = colord(color)
    if (colordInstance.isValid()) {
      onChange(colordInstance.toHex())
    } else {
      // reset
      setColor(value)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitColor(color)
    }
  }

  const handleBlur = () => {
    submitColor(color)
  }

  return (
    <InputItem>
      <HexColorInput prefixed alpha={alpha} id="colorPickerHex" color={color} onChange={setColor} onBlur={handleBlur} onKeyDown={handleKeyDown} />
      <label htmlFor="colorPickerHex">HEX</label>
    </InputItem>
  )
}

type ColorPickerInputGroupProps = {
  alpha?: boolean
  value: RgbaColor
  onChange: (value: RgbaColor) => void
  readonly?: boolean;
  colorSpace: ColorSpace
  displayColorSpace: ColorSpace
  onDisplayColorSpaceChange?: (colorSpace: ColorSpace) => void
}

export function ColorPickerInputGroup(props: ColorPickerInputGroupProps) {
  const { value, onChange, colorSpace, displayColorSpace, onDisplayColorSpaceChange, alpha = true, readonly = false } = props
  const { mode, switchMode } = useCycleSwitch(colorModes, 'RGBA')

  const { displayValue, convertInputToComponentSpace } = useColorSpaceConversion(
    value,
    colorSpace,
    displayColorSpace
  )

  const rgba = displayValue
  const hexa = colord(displayValue).minify({ alphaHex: true })
  const hsla = colord(displayValue).toHsl()

  const handleInputChange = (type: (typeof colorModes)[number]) => (inputValue: any) => {
    let rgbValue: RgbaColor

    if (type === 'HEX') {
      rgbValue = colord(inputValue).toRgb()
    } else if (type === 'HSLA') {
      rgbValue = colord(inputValue).toRgb()
    } else {
      rgbValue = inputValue
    }

    const finalValue = convertInputToComponentSpace(rgbValue)
    console.log('finalValue', finalValue)
    onChange(finalValue)
  }

  const handleColorSpaceToggle = createDisplayColorSpaceToggle(
    displayColorSpace,
    onDisplayColorSpaceChange
  )

  return (
    <InputGrid readonly={readonly}>
      <ColorSpaceBadge onClick={handleColorSpaceToggle}>
        {displayColorSpace}
      </ColorSpaceBadge>
      {mode === 'HEX' && <HEXAColorInput alpha={alpha} value={hexa} onChange={handleInputChange('HEX')} />}
      {mode === 'HSLA' && <HSLAColorInput alpha={alpha} value={hsla} onChange={handleInputChange('HSLA')} />}
      {mode === 'RGBA' && <RGBAColorInput alpha={alpha} value={rgba} onChange={handleInputChange('RGBA')} />}
      <ActionButton variant="subtle" onClick={() => switchMode()} css={{ alignSelf: 'baseline', borderRadius: '$3' }}>
        <IconSelector />
      </ActionButton>
      {/* <DropdownMenu
        size="xs"
        trigger={
          <ActionButton variant="subtle" css={{ alignSelf: 'baseline', borderRadius: '$3' }}>
            <IconSettings />
          </ActionButton>
        }>
        <MenuRadioGroup
          label="Color Space"
          value={mode}
          onValueChange={(value) => setMode(value as typeof colorModes[number])}
          items={[
            { value: 'srgb', name: 'sRGB' },
            { value: 'linear', name: 'Linear' },
          ]}
        />
        <MenuSeparator />
        <MenuRadioGroup
          label="Color Mode"
          value={mode}
          onValueChange={(value) => setMode(value as typeof colorModes[number])}
          items={[
            { value: 'RGBA', name: 'RGBA' },
            { value: 'HSLA', name: 'HSLA' },
            { value: 'HEX', name: 'HEX' },
          ]}
        />
      </DropdownMenu> */}
    </InputGrid>
  )
}
