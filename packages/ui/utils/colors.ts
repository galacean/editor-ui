export type Color = { r: number; g: number; b: number; a: number };

export function rgb2Hex(color: Color) {
  const rgb = ((color.r * 255) << 16) | ((color.g * 255) << 8) | ((color.b * 255) << 0);
  return "#" + (0x1000000 + rgb).toString(16).slice(1);
}

export function rgb2HexWithAlpha1(color: Color) {
  const rgb = ((color.r * 255) << 16) | ((color.g * 255) << 8) | ((color.b * 255) << 0);
  return "#" + (0x1000000 + rgb).toString(16).slice(1);
}

/**
 * normalize color from 0-255 to 0-1
 * @param rgba Color
 * @returns Color
 */
export function normalizeColor(rgba: Color): Color {
  return { r: rgba.r / 255, g: rgba.g / 255, b: rgba.b / 255, a: rgba.a };
}

/**
 * denormalize color from 0-1 to 0-255
 * @param rgba Color
 * @returns Color
 */
export function denormalizeColor(rgba: Color): Color {
  return { r: rgba.r * 255, g: rgba.g * 255, b: rgba.b * 255, a: rgba.a };
}

export function toNormalizeHexStr(color: Color) {
  return rgb2Hex({ ...color, a: 1 }).slice(1);
}
