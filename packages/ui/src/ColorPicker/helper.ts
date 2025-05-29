import type { Color } from '../utils'

export type ColorPickerMode = 'constant' | 'gradient' | 'particle' | 'hdr'

export type ColorSpace = 'sRGB' | 'Linear'

export type GradientColor = { value: Color; position: number }[]

export type ParticleColor = {
  color: GradientColor
  alpha: GradientColor
}

export interface HDRColor extends Color {
  intensity: number
}

export function isEqual(color0: Color, color1: Color) {
  if (!color0 || !color1) return false
  return color0.r === color1.r && color0.g === color1.g && color0.b === color1.b && color0.a === color1.a
}

export function generateLinearGradient(colors: Color[], positions: number[]) {
  const stopStrings = colors.map((color, i) => {
    const position = positions[i]
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a}) ${position * 100}%`
  })

  return `linear-gradient(to right, rgba(255,255,255,0), ${stopStrings.join(', ')})`
}

export function generateHDR(color: HDRColor) {
  const newColor: Color = {
    r: Math.round(color.r * color.intensity),
    g: Math.round(color.g * color.intensity),
    b: Math.round(color.b * color.intensity),
    a: color.a,
  }

  return `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${newColor.a})`
}

export function generatePreviewColor(
  mode: ColorPickerMode,
  value: Color | GradientColor | ParticleColor | HDRColor
): string {
  if (mode === 'constant') {
    value = value as Color
    return `rgba(${value.r}, ${value.g}, ${value.b}, ${value.a})`
  }
  if (mode === 'gradient') {
    value = value as GradientColor
    return generateLinearGradient(
      value.map((v) => v.value),
      value.map((v) => v.position)
    )
  }
  if (mode === 'particle') {
    value = value as ParticleColor
    return generateLinearGradient(
      value.color.map((v) => v.value),
      value.color.map((v) => v.position)
    )
  }
  if (mode === 'hdr') {
    return generateHDR(value as HDRColor)
  }

  return ''
}
