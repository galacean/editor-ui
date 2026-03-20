import React, { useState, useEffect } from 'react'
import { useControllableState } from '@radix-ui/react-use-controllable-state'

import {
  getDefaultOffset,
  convertBezierPointToPoint,
  convertPointsToBezierPoints,
  normalizePoint,
  denormalizePoint,
} from './helper'
import { IBezierPoint, IPoint, BezierCurveEditorProps } from './types'
import { BezierPoint } from './BezierPoint'
import { BezierCurve } from './BezierCurve'
import { Grid } from './Grid'
import { POINT_HIT_RADIUS } from './Point'
import { TICK_EPSILON, formatTick, getTickPrecision } from './tick'

import { styled } from '../design-system'
import { clamp, mergeRefs } from '../utils'
import { ActionButton, ActionButtonGroup } from '../ActionButton'
import { IconPlayerPlayFilled, IconZoomInFilled, IconZoomOutFilled, IconZoomReset } from '@tabler/icons-react'
import { Flex } from '../Flex'
import { CurveAnimation, CurveAnimationRef } from './CurveAnimation'
import { ContextMenu, MenuItem } from '../Menu'

const BOUNDARY_SNAP_EPSILON = 1e-4
const DEFAULT_GRID_TICK_Y = 10
const Y_TICK_ANCHOR_X = -10
const Y_TICK_ANCHOR_Y = -3.5

function clampSnap(value: number, min: number, max: number): number {
  if (value <= min + BOUNDARY_SNAP_EPSILON) return min
  if (value >= max - BOUNDARY_SNAP_EPSILON) return max
  return value
}

function normalizeInputPoints(inputPoints: IPoint[], minY: number, maxY: number): IPoint[] {
  return inputPoints.map((point) => ({
    x: clamp(point.x, 0, 1),
    y: clamp(point.y, minY, maxY),
  }))
}

const StyledSvgRoot = styled('svg', {
  overflow: 'unset',
  fontSize: 0,
  userSelect: 'none',
  backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, $orangeA2 100%)',
})

const StyledPanelBorder = styled('rect', {
  fill: 'none',
  stroke: '$orange7',
  strokeWidth: 1,
  shapeRendering: 'crispEdges',
  pointerEvents: 'none',
})

const BezierCurveContainer = styled('div', {
  position: 'relative',
  marginLeft: '$7',
  outline: 'none',
})

const StyledYScaleInputWrap = styled('div', {
  position: 'absolute',
  left: `${Y_TICK_ANCHOR_X}px`,
  top: `${Y_TICK_ANCHOR_Y}px`,
  transform: 'translateX(-100%)',
  width: '1.2ch',
  height: '10px',
  fontSize: '10px',
  fontVariantNumeric: 'tabular-nums',
  zIndex: 3,
  pointerEvents: 'auto',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '$1',
  backgroundColor: '$gray3',
  boxShadow: 'inset 0 0 0 1px $colors$grayA6',
})

const StyledYScaleInput = styled('input', {
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
  width: '100%',
  height: '100%',
  backgroundColor: '$gray3',
  color: '$gray12',
  fontSize: '10px',
  lineHeight: '10px',
  textAlign: 'right',
  fontVariantNumeric: 'tabular-nums',
  userSelect: 'text',
})

const defaultPoints = [
  { x: 0, y: 0 },
  { x: 0.25, y: 0.25 },
  { x: 0.75, y: 0.75 },
  { x: 1, y: 1 },
]

function _BezierCurveEditor(props: BezierCurveEditorProps, forwardedRef: React.Ref<SVGSVGElement>) {
  const {
    width = 300,
    height = 300,
    points: propPoints,
    defaultPoints: propDefaultPoints,
    doubleControlPoint = true,
    algo = 'linear',
    zoomable = true,
    zoomLimit = [0.2, 1],
    zoomSpeed = 0.03,
    yRangeMode = 'symmetric',
    yTickScale = 1,
    yTickScaleMin = 0.01,
    yTickScaleMax,
  } = props

  const containerRef = React.useRef<HTMLDivElement>(null)
  const svgRef = React.useRef<SVGSVGElement>(null)
  const axisYScale = yRangeMode === 'positive' ? 1 : 0.5
  const minNormalizedY = yRangeMode === 'positive' ? 0 : -1
  const maxNormalizedY = 1
  const minZoom = Math.min(zoomLimit[0], zoomLimit[1])
  const maxZoom = Math.max(zoomLimit[0], zoomLimit[1])
  // Keep 0 ~ 1 as the default full-width range on X axis.
  const defaultZoom = clamp(1, minZoom, maxZoom)
  const defaultOffset = yRangeMode === 'positive' ? { x: 0, y: -height } : getDefaultOffset(height)

  const player = React.useRef<CurveAnimationRef>(null)
  const pointIdCounterRef = React.useRef(0)
  const pointIdsRef = React.useRef<string[]>([])
  const pointClipId = React.useId().replace(/:/g, '')
  const [zoom, setZoom] = useState(defaultZoom)
  const [offset, setOffset] = useState(defaultOffset)
  const denormalizeZoom = 1 / zoom
  const maxPointX = width * denormalizeZoom
  const yScale = height * axisYScale * denormalizeZoom
  const minPointY = Math.min(-minNormalizedY * yScale, -maxNormalizedY * yScale)
  const maxPointY = Math.max(-minNormalizedY * yScale, -maxNormalizedY * yScale)
  const normalizedMaxScale = yTickScaleMax ?? Number.MAX_VALUE
  const yScaleDisplayValue = formatTick(
    yTickScale,
    getTickPrecision(Math.abs(yTickScale / (DEFAULT_GRID_TICK_Y * axisYScale)), 0)
  )
  const [yScaleInputText, setYScaleInputText] = useState(yScaleDisplayValue)
  const yScaleInputFocusedRef = React.useRef(false)
  const hoveredPointRef = React.useRef<string | null>(null)
  // Snapshot of hoveredPointRef at right-click time, since hover may change before menu item is clicked
  const contextPointRef = React.useRef<string | null>(null)
  const contextMenuOpenRef = React.useRef(false)

  const getPointHoverLabel = (point: IPoint): string => {
    const normalizedX = (point.x / width) * zoom
    const normalizedY = (-point.y / (height * axisYScale)) * zoom
    return `${formatTick(normalizedX, 3)}, ${formatTick(normalizedY, 3)}`
  }

  const clampBezierPoint = (bezierPoint: IBezierPoint): IBezierPoint => ({
    point: {
      x: clampSnap(bezierPoint.point.x, 0, maxPointX),
      y: clampSnap(bezierPoint.point.y, minPointY, maxPointY),
    },
    controlPoint: bezierPoint.controlPoint,
  })
  const createPointId = () => `bezier-point-${pointIdCounterRef.current++}`

  const ensurePointIds = (length: number): string[] => {
    const ids = pointIdsRef.current
    while (ids.length < length) {
      ids.push(createPointId())
    }
    if (ids.length > length) {
      ids.length = length
    }
    return ids
  }

  const [points, setPoints] = useControllableState<IBezierPoint[]>({
    prop: propPoints
      ? convertPointsToBezierPoints(
          denormalizePoint(
            normalizeInputPoints(propPoints, minNormalizedY, maxNormalizedY),
            width,
            height * axisYScale,
            denormalizeZoom
          ),
          algo
        )
      : undefined,
    defaultProp: convertPointsToBezierPoints(
      denormalizePoint(
        normalizeInputPoints(propDefaultPoints || defaultPoints, minNormalizedY, maxNormalizedY),
        width,
        height * axisYScale,
        denormalizeZoom
      ),
      algo
    ),
    onChange: (bezierPoints: IBezierPoint[]) => {
      const ret = normalizePoint(convertBezierPointToPoint(bezierPoints, algo), width, height * axisYScale, zoom)
      props.onPointsChange?.(ret)
    },
  })

  const sortByTime = (points: IBezierPoint[], ids: string[]): IBezierPoint[] => {
    const order = points
      .map((_, i) => i)
      .sort((a, b) => {
        const dx = points[a].point.x - points[b].point.x
        return Math.abs(dx) <= TICK_EPSILON ? a - b : dx
      })
    pointIdsRef.current = order.map((i) => ids[i])
    return order.map((i) => points[i])
  }

  const handlePointChange = (pointId: string, bezierPoint: IBezierPoint) => {
    setPoints((prevPoints) => {
      if (!prevPoints) return prevPoints
      const pointIds = ensurePointIds(prevPoints.length)
      const targetIndex = pointIds.indexOf(pointId)
      if (targetIndex === -1) return prevPoints

      const clampedPoint = clampBezierPoint(bezierPoint)
      const newPoints = prevPoints.map((point, index) => (index === targetIndex ? clampedPoint : point))
      return sortByTime(newPoints, pointIds)
    })
  }

  const clampOffsetForZoom = React.useCallback(
    (nextOffset: IPoint, targetZoom: number): IPoint => {
      const denormalizeTargetZoom = 1 / targetZoom
      const xMax = Math.max(0, width * denormalizeTargetZoom - width)

      const yPointA = -minNormalizedY * height * axisYScale * denormalizeTargetZoom
      const yPointB = -maxNormalizedY * height * axisYScale * denormalizeTargetZoom
      const yMin = Math.min(yPointA, yPointB)
      const yMax = Math.max(yPointA, yPointB)

      return {
        x: clamp(nextOffset.x, 0, xMax),
        y: clamp(nextOffset.y, yMin, yMax - height),
      }
    },
    [axisYScale, height, maxNormalizedY, minNormalizedY, width]
  )

  const applyZoomAtAnchor = React.useCallback(
    (targetZoom: number, anchor: IPoint) => {
      const clampedZoom = clamp(targetZoom, minZoom, maxZoom)
      if (Math.abs(clampedZoom - zoom) < TICK_EPSILON) return

      const ratio = zoom / clampedZoom
      const anchorWorldX = offset.x + anchor.x * width
      const anchorWorldY = offset.y + anchor.y * height

      const nextOffset = {
        x: anchorWorldX * ratio - anchor.x * width,
        y: anchorWorldY * ratio - anchor.y * height,
      }

      setZoom(clampedZoom)
      setOffset(clampOffsetForZoom(nextOffset, clampedZoom))
    },
    [clampOffsetForZoom, height, maxZoom, minZoom, offset.x, offset.y, width, zoom]
  )

  const handleWheel = React.useCallback(
    (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!svgRef.current) return

      const svgRect = svgRef.current.getBoundingClientRect()
      if (!svgRect.width || !svgRect.height) return

      const anchor = {
        x: clamp((e.clientX - svgRect.left) / svgRect.width, 0, 1),
        y: clamp((e.clientY - svgRect.top) / svgRect.height, 0, 1),
      }

      const nextZoom = e.deltaY > 0 ? zoom + zoomSpeed : zoom - zoomSpeed
      applyZoomAtAnchor(nextZoom, anchor)
    },
    [applyZoomAtAnchor, zoom, zoomSpeed]
  )

  const handleAddPoint = (point: IBezierPoint, index: number) => {
    setPoints((prevPoints) => {
      const newPoints = [...prevPoints!]
      newPoints.splice(index, 0, clampBezierPoint(point))
      const nextIds = [...ensurePointIds(prevPoints!.length)]
      nextIds.splice(index, 0, createPointId())
      return sortByTime(newPoints, nextIds)
    })
  }

  // Focus container for keyboard events; skip when context menu is open to avoid stealing its focus
  const focusContainer = () => {
    if (!contextMenuOpenRef.current && !(document.activeElement instanceof HTMLInputElement)) {
      containerRef.current!.focus()
    }
  }

  const handleRemovePoint = (pointId: string) => {
    setPoints((prevPoints) => {
      if (prevPoints!.length <= 1) return prevPoints
      const pointIds = ensurePointIds(prevPoints.length)
      const idx = pointIds.indexOf(pointId)
      if (idx === -1) return prevPoints
      const newPoints = prevPoints.filter((_, i) => i !== idx)
      pointIds.splice(idx, 1)
      return newPoints
    })
    // Deleted point unmounts without onMouseLeave, clear manually
    hoveredPointRef.current = null
  }

  const handlePointHoverChange = (pointId: string, hovered: boolean) => {
    hoveredPointRef.current = hovered ? pointId : null
    if (hovered) focusContainer()
  }

  const handleSvgContextMenu = (event: React.MouseEvent) => {
    contextPointRef.current = hoveredPointRef.current
    // Suppress context menu on empty space
    if (!contextPointRef.current) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.target instanceof HTMLInputElement) return
    if ((event.key === 'Delete' || event.key === 'Backspace') && hoveredPointRef.current && points.length > 1) {
      event.preventDefault()
      handleRemovePoint(hoveredPointRef.current)
    }
  }

  const handleYTickScaleChange = (value: number) => {
    if (!props.onYTickScaleChange || Number.isNaN(value)) {
      return
    }
    const clampedValue = clamp(value, yTickScaleMin, normalizedMaxScale)
    props.onYTickScaleChange(clampedValue)
  }

  useEffect(() => {
    if (!svgRef.current || !zoomable) return

    const svg = svgRef.current
    svg.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      svg.removeEventListener('wheel', handleWheel)
    }
  }, [handleWheel, zoomable])

  useEffect(() => {
    setZoom(defaultZoom)
    setOffset(defaultOffset)
  }, [defaultOffset.x, defaultOffset.y, defaultZoom])

  useEffect(() => {
    if (yScaleInputFocusedRef.current) return
    setYScaleInputText(yScaleDisplayValue)
  }, [yScaleDisplayValue, yTickScale])

  const pointIds = points ? ensurePointIds(points.length) : []

  return (
    <ContextMenu
      onOpenChange={(open: boolean) => {
        contextMenuOpenRef.current = open
        if (!open) containerRef.current!.focus()
      }}
      trigger={
        <BezierCurveContainer ref={containerRef} tabIndex={0} onKeyDown={handleKeyDown}>
          <StyledSvgRoot
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`${offset.x} ${offset.y} ${width} ${height}`}
            width={width}
            height={height}
            ref={mergeRefs([forwardedRef, svgRef])}
            onMouseDown={(e) => e.preventDefault()}
            onContextMenu={handleSvgContextMenu}>
            <defs>
              <clipPath id={pointClipId} clipPathUnits="userSpaceOnUse">
                <rect
                  x={offset.x - POINT_HIT_RADIUS}
                  y={offset.y - POINT_HIT_RADIUS}
                  width={width + POINT_HIT_RADIUS * 2}
                  height={height + POINT_HIT_RADIUS * 2}
                />
              </clipPath>
            </defs>
            <Grid
              size={{ width, height }}
              offset={offset}
              axisLabel={props.axisLabel}
              zoom={zoom}
              yTickScale={yTickScale}
              axisYScale={axisYScale}
              overlay={
                <>
                  <StyledPanelBorder x={offset.x} y={offset.y} width={width} height={height} />
                  <g className="bezier-curve-points">
                    {points.map((bezierPoint, index) => (
                      <BezierPoint
                        pointId={pointIds[index]!}
                        key={pointIds[index]!}
                        bezierPoint={bezierPoint}
                        pointHoverLabel={getPointHoverLabel(bezierPoint.point)}
                        pointClipPath={`url(#${pointClipId})`}
                        onPointChange={handlePointChange}
                        onHoverChange={handlePointHoverChange}
                        getRoot={() => svgRef.current!}
                        doublePoint={doubleControlPoint}
                        algo={algo}
                      />
                    ))}
                  </g>
                </>
              }>
              <BezierCurve
                algo={algo}
                points={points!}
                zoom={zoom}
                getRoot={() => svgRef.current}
                onAddPoint={handleAddPoint}
                extendMinX={offset.x}
                extendMaxX={offset.x + width}
              />
              <CurveAnimation points={points} algo={algo} ref={player} />
            </Grid>
          </StyledSvgRoot>
          {props.onYTickScaleChange && (
            <StyledYScaleInputWrap
              style={{
                width: `${yScaleInputText.length - (yScaleInputText.match(/[.\-]/g) || []).length * 0.5 + 0.2}ch`,
              }}>
              <StyledYScaleInput
                type="text"
                inputMode="decimal"
                value={yScaleInputText}
                onFocus={() => {
                  yScaleInputFocusedRef.current = true
                }}
                onBlur={(event) => {
                  yScaleInputFocusedRef.current = false
                  if (event.currentTarget.dataset.escaping) {
                    delete event.currentTarget.dataset.escaping
                    setYScaleInputText(yScaleDisplayValue)
                    return
                  }
                  const value = Number(yScaleInputText.trim() || 0)
                  if (Number.isNaN(value)) {
                    setYScaleInputText(yScaleDisplayValue)
                  } else {
                    handleYTickScaleChange(value)
                    setYScaleInputText(yScaleDisplayValue)
                  }
                  props.onYTickScaleCommit?.()
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.currentTarget.blur()
                  } else if (event.key === 'Escape') {
                    event.currentTarget.dataset.escaping = '1'
                    event.currentTarget.blur()
                  }
                }}
                onChange={(event) => {
                  const nextText = event.target.value
                  setYScaleInputText(nextText)
                  const trimmed = nextText.trim()
                  const num = Number(trimmed)
                  if (trimmed !== '' && !Number.isNaN(num)) {
                    handleYTickScaleChange(num)
                  }
                }}
              />
            </StyledYScaleInputWrap>
          )}
          <Flex gap="xs" style={{ position: 'absolute', bottom: 10, right: 10 }}>
            <ActionButtonGroup>
              <ActionButton onClick={() => player.current?.play()} size="xs">
                <IconPlayerPlayFilled />
              </ActionButton>
              <ActionButton
                size="xs"
                onClick={() => applyZoomAtAnchor(zoom - 0.05, { x: 0.5, y: 0.5 })}
                disabled={zoom <= minZoom}>
                <IconZoomInFilled />
              </ActionButton>
              <ActionButton
                size="xs"
                onClick={() => applyZoomAtAnchor(zoom + 0.05, { x: 0.5, y: 0.5 })}
                disabled={zoom >= maxZoom}>
                <IconZoomOutFilled />
              </ActionButton>
              <ActionButton
                size="xs"
                onClick={() => {
                  setZoom(defaultZoom)
                  setOffset(defaultOffset)
                }}
                disabled={zoom === defaultZoom}>
                <IconZoomReset />
              </ActionButton>
            </ActionButtonGroup>
          </Flex>
        </BezierCurveContainer>
      }
      asChild>
      <MenuItem
        name="Delete Keyframe"
        disabled={points.length <= 1}
        onSelect={() => contextPointRef.current && handleRemovePoint(contextPointRef.current)}
      />
    </ContextMenu>
  )
}

export const BezierCurveEditor = React.forwardRef(_BezierCurveEditor)
