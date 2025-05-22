import { createContext, forwardRef, useEffect, useState } from 'react'
import { overrideStyle } from './/override_style'
import { ColorPickerRoot, type ColorPickerRootProps } from './ColorPickerPopoverContent'
import { ColorPickerTrigger } from './ColorPickerTrigger'
import {
  Color,
  ParticleColor,
  HDRColor,
  GradientColor,
  generatePreviewColor,
  linearToSrgb255,
  srgbToLinear255,
} from './helper'

import { Popover } from '../Popover'
import { ColorPickerContext } from './ColorPickerProvider'

type ColorPickerProps = ColorPickerRootProps & {
  disabled?: boolean
  fullsize?: boolean
  colorSpace?: 'sRGB' | 'Linear'
}

/**
 * ColorPicker is a comperhensive color picker component that support you to pick color in different `mode`:
 * - solid: pick a single color
 * - gradient: pick a linear gradient color
 * - particle: pick a particle color. for more information about that mode you could check the [Color Module](https://galacean.antgroup.com/engine/en/docs/graphics/particle/renderer-color-module/) part of the Partical System in Galacean Engine
 *
 * This component only provide **controlled** mode, which means that you have to control the color value by passing the `value` and `onValueChange` props.
 */
const ColorPicker = forwardRef<HTMLButtonElement, ColorPickerProps>(function ColorPicker(props, forwardedRef) {
  const { disabled, fullsize, colorSpace = 'sRGB', ...rest } = props
  const { mode } = props

  let { value, defaultValue, onValueChange } = props
  if (colorSpace === 'Linear') {
    if (mode === 'constant' || mode === 'hdr') {
      if (rest.value) {
        rest.value = {
          ...rest.value,
          ...linearToSrgb255(value as Color),
        }
      }
      if (defaultValue) {
        rest.defaultValue = {
          ...rest.defaultValue,
          ...linearToSrgb255(defaultValue as Color),
        }
      }
      if (onValueChange) {
        rest.onValueChange = (color: Color) => {
          const linearColor = srgbToLinear255(color)
          props.onValueChange?.({
            ...color,
            ...linearColor,
          } as HDRColor)
        }
      }
    }
    if (mode === 'particle') {
      if (value) {
        ;(rest.value as ParticleColor).color = (value as ParticleColor).color.map((c) => {
          return {
            ...c,
            value: linearToSrgb255(c.value),
          }
        })
      }
      if (defaultValue) {
        ;(rest.defaultValue as ParticleColor).color = (defaultValue as ParticleColor).color.map((c) => {
          return {
            ...c,
            value: linearToSrgb255(c.value),
          }
        })
      }
      if (onValueChange) {
        rest.onValueChange = (color: ParticleColor) => {
          const linearColor = {
            ...color,
            color: color.color.map((c) => {
              return {
                ...c,
                value: srgbToLinear255(c.value),
              }
            }),
          }
          props.onValueChange(linearColor)
        }
      }
    }
    if (mode === 'gradient') {
      if (value) {
        rest.value = (value as GradientColor).map((c) => {
          return {
            ...c,
            value: linearToSrgb255(c.value),
          }
        })
      }
      if (defaultValue) {
        rest.defaultValue = (defaultValue as GradientColor).map((c) => {
          return {
            ...c,
            value: linearToSrgb255(c.value),
          }
        })
      }
      if (onValueChange) {
        rest.onValueChange = (color: GradientColor) => {
          const linearColor = color.map((c) => {
            return {
              ...c,
              value: srgbToLinear255(c.value),
            }
          })
          props.onValueChange(linearColor)
        }
      }
    }
  }

  const [_, setPreviewColor] = useState(generatePreviewColor(mode, value))

  const handlePreviewChange = (nextColor) => {
    const colorStr = generatePreviewColor(mode, nextColor)
    setPreviewColor(colorStr)
  }

  useEffect(() => {
    overrideStyle()
  }, [])

  return (
    <Popover
      disabled={disabled}
      sideOffset={4}
      side="bottom"
      align="start"
      open
      trigger={<ColorPickerTrigger ref={forwardedRef} fullsize={fullsize} color={generatePreviewColor(mode, value)} />}>
      <ColorPickerContext.Provider value={{ colorSpace }}>
        <ColorPickerRoot {...rest} onChangePreviewStr={handlePreviewChange} />
      </ColorPickerContext.Provider>
    </Popover>
  )
})

export { ColorPicker }
export type { GradientColor, ParticleColor } from './helper'
