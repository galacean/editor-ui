import { useMemo } from 'react'
import { type Color, type ColorSpace, srgbColorToLinear, linearColorToSRGB } from './helper'

/**
 * Hook for handling color space conversions between component color space and display color space
 * 
 * @param value - The color value in component color space, which is always in sRGB format in 0-255 range
 * @param componentColorSpace - The color space that the component expects for input/output
 * @param displayColorSpace - The color space that should be displayed to the user
 * @returns Object with display value and conversion function for user input
 */
export function useColorSpaceConversion(
  value: Color,
  componentColorSpace: ColorSpace,
  displayColorSpace: ColorSpace
) {
  const displayValue = useMemo((): Color => {
    if (componentColorSpace === displayColorSpace) {
      return value
    } else if (componentColorSpace === 'sRGB' && displayColorSpace === 'Linear') {
      return srgbColorToLinear(value, false, true)
    } else if (componentColorSpace === 'Linear' && displayColorSpace === 'sRGB') {
      return linearColorToSRGB(value, false , true)
    } else {
      return value
    }
  }, [value, componentColorSpace, displayColorSpace])

  const convertInputToComponentSpace = useMemo(() => {
    return (inputValue: Color): Color => {
      if (componentColorSpace === displayColorSpace) {
        return inputValue
      } else if (componentColorSpace === 'sRGB' && displayColorSpace === 'Linear') {
        return linearColorToSRGB(inputValue, false, true)
      } else if (componentColorSpace === 'Linear' && displayColorSpace === 'sRGB') {
        return srgbColorToLinear(inputValue, false, true)
      } else {
        return inputValue
      }
    }
  }, [componentColorSpace, displayColorSpace])

  return {
    displayValue,
    convertInputToComponentSpace,
  }
}

/**
 * Utility function to create a display color space toggle handler
 *
 * @param currentDisplayColorSpace - Current display color space
 * @param onDisplayColorSpaceChange - Callback to change display color space
 * @returns Toggle function
 */
export function createDisplayColorSpaceToggle(
  currentDisplayColorSpace: ColorSpace,
  onDisplayColorSpaceChange?: (colorSpace: ColorSpace) => void
) {
  return () => {
    if(!onDisplayColorSpaceChange) return;
    onDisplayColorSpaceChange(currentDisplayColorSpace === 'sRGB' ? 'Linear' : 'sRGB')
  }
}
