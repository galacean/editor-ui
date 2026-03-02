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

function interpolateAlpha(alphaStops: GradientColor, position: number): number {
  if (alphaStops.length === 0) return 1
  if (position <= alphaStops[0].position) return alphaStops[0].value.a
  if (position >= alphaStops[alphaStops.length - 1].position) return alphaStops[alphaStops.length - 1].value.a

  for (let i = 0; i < alphaStops.length - 1; i++) {
    const curr = alphaStops[i]
    const next = alphaStops[i + 1]
    if (position >= curr.position && position <= next.position) {
      const denom = next.position - curr.position
      if (denom === 0) return curr.value.a
      const t = (position - curr.position) / denom
      return curr.value.a + t * (next.value.a - curr.value.a)
    }
  }
  return 1
}

function interpolateColor(colorStops: GradientColor, position: number): Color {
  if (colorStops.length === 0) return { r: 255, g: 255, b: 255, a: 1 }
  if (position <= colorStops[0].position) return colorStops[0].value
  if (position >= colorStops[colorStops.length - 1].position) return colorStops[colorStops.length - 1].value

  for (let i = 0; i < colorStops.length - 1; i++) {
    const curr = colorStops[i]
    const next = colorStops[i + 1]
    if (position >= curr.position && position <= next.position) {
      const denom = next.position - curr.position
      if (denom === 0) return curr.value
      const t = (position - curr.position) / denom
      return {
        r: curr.value.r + t * (next.value.r - curr.value.r),
        g: curr.value.g + t * (next.value.g - curr.value.g),
        b: curr.value.b + t * (next.value.b - curr.value.b),
        a: curr.value.a + t * (next.value.a - curr.value.a),
      }
    }
  }
  return colorStops[colorStops.length - 1].value
}

function mergeStopPositions(colorStops: GradientColor, alphaStops: GradientColor): number[] {
  const posSet = new Set<number>()
  for (const s of colorStops) posSet.add(s.position)
  for (const s of alphaStops) posSet.add(s.position)
  return Array.from(posSet).sort((a, b) => a - b)
}

export function blendParticleStops(colorStops: GradientColor, alphaStops: GradientColor): { colors: Color[]; positions: number[] } {
  const positions = mergeStopPositions(colorStops, alphaStops)
  const colors = positions.map((pos): Color => {
    const c = interpolateColor(colorStops, pos)
    const a = interpolateAlpha(alphaStops, pos)
    return { r: c.r, g: c.g, b: c.b, a }
  })
  return { colors, positions }
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
    const { colors, positions } = blendParticleStops(value.color, value.alpha)
    return generateLinearGradient(colors, positions)
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
