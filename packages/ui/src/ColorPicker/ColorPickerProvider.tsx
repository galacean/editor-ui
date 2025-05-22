import { createContext, useContext } from 'react'
import { ColorSpace } from './helper'

interface ColorPickerContextValue {
  colorSpace: ColorSpace
}

export const ColorPickerContext = createContext<ColorPickerContextValue>({
  colorSpace: 'sRGB',
})

export const useColorPickerContext = () => {
  const context = useContext(ColorPickerContext)
  if (!context) {
    throw new Error('useColorPickerContext must be used within a ColorPickerProvider')
  }
  return context
}
