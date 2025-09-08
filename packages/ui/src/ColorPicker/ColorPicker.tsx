import { forwardRef, useEffect, useState } from 'react'
import { overrideStyle } from './/override_style'
import { ColorPickerRoot, type ColorPickerRootProps } from './ColorPickerPopoverContent'
import { ColorPickerTrigger } from './ColorPickerTrigger'
import { Color, generatePreviewColor, type ColorSpace } from './helper'

import { Popover } from '../Popover'
import { useControllableState } from '@radix-ui/react-use-controllable-state'

type ColorPickerProps = ColorPickerRootProps & {
  disabled?: boolean;
  fullsize?: boolean;
  colorSpace?: ColorSpace;
  displayColorSpace?: ColorSpace;
  onDisplayColorSpaceChange?: (colorSpace: ColorSpace) => void;
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
  const { disabled, fullsize, colorSpace: originalColorSpace, displayColorSpace: propDisplayColorSpace, onDisplayColorSpaceChange: propOnDisplayColorSpaceChange, ...rest } = props
  const { mode, value } = props
  const [displayColorSpace, setDisplayColorSpace] = useControllableState({
    prop: propDisplayColorSpace,
    defaultProp: originalColorSpace,
    onChange: propOnDisplayColorSpaceChange,
  })

  const [_, setPreviewColor] = useState(generatePreviewColor(mode, value, originalColorSpace, displayColorSpace))

  const handlePreviewChange = (nextColor: any) => {
    const colorStr = generatePreviewColor(mode, nextColor, originalColorSpace, displayColorSpace)
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
      trigger={
        <ColorPickerTrigger
          ref={forwardedRef}
          fullsize={fullsize}
          color={value as Color}
          colorSpace={originalColorSpace}
          displayColorSpace={displayColorSpace}
          mode={mode}
        />
      }>
      <ColorPickerRoot
        {...rest}
        onChangePreviewStr={handlePreviewChange}
        colorSpace={originalColorSpace}
        displayColorSpace={displayColorSpace}
        onDisplayColorSpaceChange={setDisplayColorSpace}
      />
    </Popover>
  )
})

export { ColorPicker }
export type { GradientColor, ParticleColor } from './helper'
