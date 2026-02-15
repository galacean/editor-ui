import React from 'react'
import { styled } from '../design-system'
import { formatTick, getAlignedTickPrecision, getTickPrecision, isNearlyEqual } from './tick'

const TICK_EDGE_CAPTURE = 8
const X_TICK_CLIP_PADDING_LEFT = TICK_EDGE_CAPTURE
const X_TICK_CLIP_PADDING_RIGHT = 16
const X_TICK_CLIP_PADDING_TOP = 0
const X_TICK_CLIP_HEIGHT = 22
const Y_TICK_CLIP_PADDING_LEFT = 56
const Y_TICK_CLIP_PADDING_TOP = 8
const Y_TICK_CLIP_PADDING_BOTTOM = TICK_EDGE_CAPTURE
const X_TICK_Y_OFFSET = 16
const Y_TICK_X_OFFSET = 12

const StyledTicks = styled('text', {
  fontSize: '10px',
  fill: '$gray10',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  pointerEvents: 'none',
  variants: {
    direction: {
      vertical: {
        textOrientation: 'mixed',
        textAnchor: 'end',
      },
      horizontal: {
        textAnchor: 'middle',
      },
    },
  },
  defaultVariants: {
    direction: 'horizontal',
  },
})

const StyledLabel = styled('text', {
  fontSize: '11px',
  textAnchor: 'middle',
  fill: '$grayA11',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  pointerEvents: 'none',
  variants: {
    vertical: {
      true: {
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        textAnchor: 'start',
      },
    },
  },
})

const StyledGridLine = styled('rect', {
  fill: '$grayA3',
})

const StyledAxis = styled('line', {
  stroke: '$grayA6',
  // stroke: "transparent"
})

interface GridProps {
  children?: React.ReactNode
  overlay?: React.ReactNode
  size: {
    width: number
    height: number
  }
  zoom: number
  yTickScale?: number
  axisYScale?: number
  axisLabel?: string
  offset: {
    x: number
    y: number
  }
  tick?: {
    x: number
    y: number
  }
}

export function Grid(props: GridProps) {
  const {
    size: { width, height },
    offset,
    zoom,
    yTickScale = 1,
    axisYScale = 0.4,
    tick = { x: 10, y: 10 },
    axisLabel,
  } = props

  const xAxisLength = Math.ceil(tick.x * zoom) + 1
  const xAxisGap = width / (tick.x * zoom)
  const yAxisLength = Math.ceil(tick.y * zoom) + 1
  const yAxisGap = height / (tick.y * zoom)
  const clipIdPrefix = React.useId().replace(/:/g, '')
  const clipGridId = `${clipIdPrefix}-grid`
  const clipXTicksId = `${clipIdPrefix}-x-ticks`
  const clipYTicksId = `${clipIdPrefix}-y-ticks`
  const labelGap = 10
  const xTickPrecision = getTickPrecision(1 / tick.x)
  const yTickPrecision = getTickPrecision(Math.abs(yTickScale / (tick.y * axisYScale)))

  const getNormalizedTickY = (worldY: number) => (-worldY / (height * axisYScale)) * zoom
  const getScaledTickY = (worldY: number) => getNormalizedTickY(worldY) * yTickScale

  function renderYAxis() {
    // When origin is exactly on left border, keep only the orange border to avoid double-line mismatch.
    if (isNearlyEqual(offset.x, 0)) return null
    return <StyledAxis className="y-axis" x1={0} y1={offset.y} x2={0} y2={offset.y + height} strokeWidth="1" />
  }

  function renderHorizontalGridLines() {
    return (
      <g className="grid-x-lines">
        {[...Array(yAxisLength).keys()].map((index) => {
          return (
            <StyledGridLine
              data-index={index}
              key={index}
              x={offset.x}
              y={index * yAxisGap + offset.y - (offset.y % yAxisGap)}
              width={width}
              height={1}
            />
          )
        })}
      </g>
    )
  }

  function renderYAxisTicks(tickXOffset = -16, tickYOffset = 0) {
    const ticks = [...Array(yAxisLength).keys()].map((index) => {
      const worldY = index * yAxisGap + offset.y - (offset.y % yAxisGap)
      return {
        index,
        worldY,
        value: getScaledTickY(worldY),
      }
    })
    const alignedPrecision = getAlignedTickPrecision(
      ticks.map((tickItem) => tickItem.value),
      yTickPrecision
    )

    return (
      <g className="grid-y-ticks" style={{ clipPath: `url(#${clipYTicksId})` }}>
        {ticks.map((tickItem) => {
          return (
            <StyledTicks
              className="y-axis-tick"
              key={`y-${tickItem.index}`}
              x={tickXOffset}
              direction="vertical"
              y={tickItem.worldY + tickYOffset}>
              {formatTick(tickItem.value, alignedPrecision)}
            </StyledTicks>
          )
        })}
      </g>
    )
  }

  function renderXAxisLabel() {
    return (
      <StyledLabel className="x-axis-label" x={offset.x + width / 2} y={offset.y + height - labelGap}>
        {axisLabel ?? 'x'}
      </StyledLabel>
    )
  }

  function renderVerticalGridLines() {
    return (
      <g className="grid-y-lines">
        {[...Array(xAxisLength).keys()].map((index) => {
          const x = index * xAxisGap + offset.x - (offset.x % xAxisGap)

          // Do not draw grid line on panel left boundary; border already represents it.
          if (isNearlyEqual(x, offset.x)) {
            return null
          }

          return (
            <StyledGridLine
              key={index}
              x={x}
              y={offset.y}
              width={1}
              height={height}
            />
          )
        })}
      </g>
    )
  }

  function renderXAxisTicks(tickXOffset = -10, tickYOffset = 100) {
    const axisOffsetIndex = offset.x > 0 ? Math.floor(offset.x / xAxisGap) : Math.ceil(offset.x / xAxisGap)
    const ticks = [...Array(xAxisLength).keys()].map((index) => ({
      index,
      value: (index + axisOffsetIndex) / tick.x,
      x: index * xAxisGap + offset.x - (offset.x % xAxisGap) + tickXOffset,
    }))
    const alignedPrecision = getAlignedTickPrecision(
      ticks.map((tickItem) => tickItem.value),
      xTickPrecision
    )

    return (
      <g className="grid-x-ticks" style={{ clipPath: `url(#${clipXTicksId})` }}>
        {ticks.map((tickItem) => {
          return (
            <StyledTicks className="x-axis-tick" key={`x-${tickItem.index}`} y={tickYOffset} x={tickItem.x}>
              {formatTick(tickItem.value, alignedPrecision)}
            </StyledTicks>
          )
        })}
      </g>
    )
  }

  function renderXAxis() {
    return <StyledAxis className="x-axis" x1={offset.x} y1={0} x2={offset.x + width} y2={0} strokeWidth="1" />
  }

  return (
    <>
      <defs>
        <clipPath id={clipGridId}>
          <rect x={offset.x} y={offset.y} width={width} height={height} />
        </clipPath>
        <clipPath id={clipXTicksId}>
          <rect
            x={offset.x - X_TICK_CLIP_PADDING_LEFT}
            y={offset.y + height - X_TICK_CLIP_PADDING_TOP}
            width={width + X_TICK_CLIP_PADDING_LEFT + X_TICK_CLIP_PADDING_RIGHT}
            height={X_TICK_CLIP_HEIGHT}
          />
        </clipPath>
        <clipPath id={clipYTicksId}>
          <rect
            x={offset.x - Y_TICK_CLIP_PADDING_LEFT}
            y={offset.y - Y_TICK_CLIP_PADDING_TOP}
            width={Y_TICK_CLIP_PADDING_LEFT}
            height={height + Y_TICK_CLIP_PADDING_TOP + Y_TICK_CLIP_PADDING_BOTTOM}
          />
        </clipPath>
      </defs>
      <g
        className="bezier-curve-grid"
        height={height}
        width={width}
        style={{ clipPath: `url(#${clipGridId})`, overflow: 'hidden' }}>
        {renderHorizontalGridLines()}
        {renderVerticalGridLines()}
        {renderXAxis()}
        {renderYAxis()}
        {renderXAxisLabel()}
        {props.children}
      </g>
      {props.overlay}
      {renderYAxisTicks(offset.x - Y_TICK_X_OFFSET, 4)}
      {renderXAxisTicks(0, height + offset.y + X_TICK_Y_OFFSET)}
    </>
  )
}
