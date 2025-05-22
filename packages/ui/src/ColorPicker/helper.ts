export type ColorPickerMode = 'constant' | 'gradient' | 'particle' | 'hdr'

export type ColorSpace = 'sRGB' | 'Linear'

export type Color = { r: number; g: number; b: number; a: number }

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

export function srgbToLinearChannel255(c_srgb: number): number {
  const c = c_srgb / 255
  let linear: number
  if (c <= 0.04045) {
    linear = c / 12.92
  } else {
    linear = Math.pow((c + 0.055) / 1.055, 2.4)
  }
  return Math.round(linear * 255)
}

export function linearToSrgbChannel255(c_linear: number): number {
  const c = c_linear / 255
  let srgb: number
  if (c <= 0.0031308) {
    srgb = 12.92 * c
  } else {
    srgb = 1.055 * Math.pow(c, 1 / 2.4) - 0.055
  }
  return Math.round(srgb * 255)
}

export function srgbToLinear255(color: Color): Color {
  if (!color) return color
  return {
    ...color,
    r: srgbToLinearChannel255(color.r),
    g: srgbToLinearChannel255(color.g),
    b: srgbToLinearChannel255(color.b),
    a: color.a,
  }
}

export function linearToSrgb255(color: Color): Color {
  if (!color) return color
  return {
    ...color,
    r: linearToSrgbChannel255(color.r),
    g: linearToSrgbChannel255(color.g),
    b: linearToSrgbChannel255(color.b),
    a: color.a,
  }
}
