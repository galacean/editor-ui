export const TICK_EPSILON = 1e-8
const DEFAULT_MIN_PRECISION = 1
const DEFAULT_MAX_PRECISION = 2

export function getTickPrecision(
  step: number,
  minPrecision = DEFAULT_MIN_PRECISION,
  maxPrecision = DEFAULT_MAX_PRECISION
): number {
  if (!Number.isFinite(step) || step <= 0) return minPrecision

  for (let precision = 0; precision <= maxPrecision; precision++) {
    const scaledStep = step * Math.pow(10, precision)
    if (Math.abs(scaledStep - Math.round(scaledStep)) < TICK_EPSILON) {
      return Math.max(minPrecision, precision)
    }
  }

  return maxPrecision
}

export function formatTick(value: number, precision: number): string {
  const normalizedValue = Math.abs(value) < TICK_EPSILON ? 0 : value
  return normalizedValue.toFixed(precision)
}

function formatTickMinimal(value: number, precision: number): string {
  return formatTick(value, precision).replace(/\.?0+$/, '')
}

export function getAlignedTickPrecision(values: number[], basePrecision: number): number {
  return values.reduce((maxPrecision, value) => {
    const minimalText = formatTickMinimal(value, basePrecision)
    const dotIndex = minimalText.indexOf('.')
    const minimalPrecision = dotIndex === -1 ? 0 : minimalText.length - dotIndex - 1
    return Math.max(maxPrecision, minimalPrecision)
  }, 0)
}
