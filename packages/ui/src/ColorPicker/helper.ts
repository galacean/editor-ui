import { colord } from 'colord'

export type Color = { r: number; g: number; b: number; a: number }

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

/**
 * normalize color from 0-255 to 0-1
 * @param rgba Color
 * @returns Color
 */
export function normalizeColor<T extends Color = Color>(rgba: T): T {
  return { ...rgba, r: rgba.r / 255, g: rgba.g / 255, b: rgba.b / 255, a: rgba.a }
}

/**
 * denormalize color from 0-1 to 0-255
 * @param rgba Color
 * @returns Color
 */
export function denormalizeColor<T extends Color = Color>(rgba: T): T {
  return { ...rgba, r: rgba.r * 255, g: rgba.g * 255, b: rgba.b * 255, a: rgba.a }
}

export function toNormalizeHexStr(color: Color) {
  const ret = colord({ ...color, a: 1 })
    .toHex()
    .slice(1)
  return ret
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
  value: Color | GradientColor | ParticleColor | HDRColor,
  componentColorSpace: ColorSpace,
  displayColorSpace: ColorSpace
): string {
  if (mode === 'constant') {
    value = value as Color
    if (componentColorSpace === 'sRGB' && displayColorSpace === 'Linear') {
      value = srgbColorToLinear(value, false, true)
    }
    if (componentColorSpace === 'Linear' && displayColorSpace === 'sRGB') {
      value = linearColorToSRGB(value, false, true)
    }
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

// Convert sRGB channel to linear
function srgbChannelToLinear(c: number, inputIsNormalized: boolean, outputDenormalize: boolean): number {
  const normalized = inputIsNormalized ? c : c / 255
  let linear: number
  if (normalized <= 0.04045) {
    linear = normalized / 12.92
  } else {
    linear = Math.pow((normalized + 0.055) / 1.055, 2.4)
  }
  return outputDenormalize ? linear * 255 : linear
}

// Convert linear channel to sRGB
function linearChannelToSRGB(c: number, inputIsNormalized: boolean, outputDenormalize: boolean): number {
  const normalized = inputIsNormalized ? c : c / 255
  let srgb: number
  if (normalized <= 0.0031308) {
    srgb = normalized * 12.92
  } else {
    srgb = 1.055 * Math.pow(normalized, 1 / 2.4) - 0.055
  }
  return outputDenormalize ? srgb * 255 : srgb
}

export function srgbColorToLinear(color: Color, inputIsNormalized = true, outputDenormalize = false): Color {
  return {
    r: srgbChannelToLinear(color.r, inputIsNormalized, outputDenormalize),
    g: srgbChannelToLinear(color.g, inputIsNormalized, outputDenormalize),
    b: srgbChannelToLinear(color.b, inputIsNormalized, outputDenormalize),
    a: color.a,
  }
}

export function linearColorToSRGB(color: Color, inputIsNormalized = true, outputDenormalize = false): Color {
  return {
    r: linearChannelToSRGB(color.r, inputIsNormalized, outputDenormalize),
    g: linearChannelToSRGB(color.g, inputIsNormalized, outputDenormalize),
    b: linearChannelToSRGB(color.b, inputIsNormalized, outputDenormalize),
    a: color.a,
  }
}
