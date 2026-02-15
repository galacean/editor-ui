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
import { TICK_EPSILON, formatNormalizedCoord, formatTick, getAlignedTickPrecision, getTickPrecision } from './tick'

import { styled } from '../design-system'
import { clamp, mergeRefs } from '../utils'
import { ActionButton, ActionButtonGroup } from '../ActionButton'
import { IconPlayerPlayFilled, IconZoomInFilled, IconZoomOutFilled, IconZoomReset } from '@tabler/icons-react'
import { Flex } from '../Flex'
import { CurveAnimation, CurveAnimationRef } from './CurveAnimation'

const BOUNDARY_SNAP_EPSILON = 1e-4
const DEFAULT_GRID_TICK_Y = 10
const Y_TICK_ANCHOR_X = -10
const Y_TICK_ANCHOR_Y = -3.5

function snapToBounds(value: number, min: number, max: number, epsilon = BOUNDARY_SNAP_EPSILON): number {
  if (Math.abs(value - min) <= epsilon) return min
  if (Math.abs(value - max) <= epsilon) return max
  return value
}

const StyledSvgRoot = styled('svg', {
  overflow: 'unset',
  fontSize: 0,
  userSelect: 'none',
  WebkitUserSelect: 'none',
  backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, $orangeA2 100%)',
  '& g': {
    fontSize: 0,
  },
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
})

const StyledYScaleInputOverlay = styled('div', {
  position: 'absolute',
  left: `${Y_TICK_ANCHOR_X}px`,
  top: `${Y_TICK_ANCHOR_Y}px`,
  transform: 'translateX(-100%)',
  width: '3.2ch',
  height: '10px',
  zIndex: 3,
  pointerEvents: 'auto',
})

const StyledYScaleInputWrap = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: 0,
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
  fontFamily: 'inherit',
  fontVariantNumeric: 'tabular-nums',
  caretColor: '$gray12',
  outline: 'none',
  userSelect: 'text',
  WebkitUserSelect: 'text',
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

  const svgRef = React.useRef<SVGSVGElement>(null)
  const axisYScale = yRangeMode === 'positive' ? 1 : 0.5
  const minNormalizedY = yRangeMode === 'positive' ? 0 : -1
  const maxNormalizedY = 1
  const minZoom = Math.min(zoomLimit[0], zoomLimit[1])
  const maxZoom = Math.max(zoomLimit[0], zoomLimit[1])
  // Keep 0 ~ 1 as the default full-width range on X axis.
  const defaultZoom = clamp(1, minZoom, maxZoom)
  const defaultOffset = yRangeMode === 'positive' ? { x: 0, y: -height } : getDefaultOffset(width, height)

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
  const yTickPrecision = getTickPrecision(Math.abs(yTickScale / (DEFAULT_GRID_TICK_Y * axisYScale)))
  const yAxisLength = Math.ceil(DEFAULT_GRID_TICK_Y * zoom) + 1
  const yAxisGap = height / (DEFAULT_GRID_TICK_Y * zoom)
  const yTickValues = [...Array(yAxisLength).keys()].map((index) => {
    const worldY = index * yAxisGap + offset.y - (offset.y % yAxisGap)
    const normalizedTickY = (-worldY / (height * axisYScale)) * zoom
    return normalizedTickY * yTickScale
  })
  const yAlignedTickPrecision = getAlignedTickPrecision(yTickValues, yTickPrecision)
  const yScaleDisplayValue = formatTick(yTickScale, yAlignedTickPrecision)
  const [yScaleInputText, setYScaleInputText] = useState(yScaleDisplayValue)

  const normalizeInputPoints = (inputPoints: IPoint[]) =>
    inputPoints.map((point) => ({
      x: clamp(point.x, 0, 1),
      y: clamp(point.y, minNormalizedY, maxNormalizedY),
    }))

  const getPointHoverLabel = (point: IPoint): string => {
    const normalizedX = (point.x / width) * zoom
    const normalizedY = (-point.y / (height * axisYScale)) * zoom
    return `${formatNormalizedCoord(normalizedX)}, ${formatNormalizedCoord(normalizedY)}`
  }

  const clampBezierPoint = (bezierPoint: IBezierPoint): IBezierPoint => ({
    ...bezierPoint,
    point: {
      ...bezierPoint.point,
      x: snapToBounds(clamp(bezierPoint.point.x, 0, maxPointX), 0, maxPointX),
      y: snapToBounds(clamp(bezierPoint.point.y, minPointY, maxPointY), minPointY, maxPointY),
    },
  })
  const createPointId = React.useCallback(() => {
    const id = `bezier-point-${pointIdCounterRef.current}`
    pointIdCounterRef.current += 1
    return id
  }, [])

  const ensurePointIds = React.useCallback(
    (length: number): string[] => {
      const ids = pointIdsRef.current
      while (ids.length < length) {
        ids.push(createPointId())
      }
      if (ids.length > length) {
        ids.length = length
      }
      return ids
    },
    [createPointId]
  )

  const [points, setPoints] = useControllableState<IBezierPoint[]>({
    prop: propPoints
      ? convertPointsToBezierPoints(
          denormalizePoint(normalizeInputPoints(propPoints), width, height * axisYScale, denormalizeZoom),
          algo
        )
      : undefined,
    defaultProp: convertPointsToBezierPoints(
      denormalizePoint(
        normalizeInputPoints(propDefaultPoints || defaultPoints),
        width,
        height * axisYScale,
        denormalizeZoom
      ),
      algo
    ),
    onChange: (bezierPoints: IBezierPoint[]) => {
      const ret = normalizePoint(
        convertBezierPointToPoint(bezierPoints, algo),
        width,
        height * axisYScale,
        zoom
      )
      if (props.onPointsChange) {
        props.onPointsChange(ret)
      }
    },
  })

  const handlePointChange = (pointId: string, bezierPoint: IBezierPoint) => {
    setPoints((prevPoints) => {
      if (!prevPoints) return prevPoints
      const pointIds = ensurePointIds(prevPoints.length)
      const targetIndex = pointIds.indexOf(pointId)
      if (targetIndex === -1) return prevPoints

      const clampedPoint = clampBezierPoint(bezierPoint)
      const nextItems = prevPoints.map((point, index) => ({
        point: index === targetIndex ? clampedPoint : point,
        pointId: pointIds[index],
        order: index,
      }))

      nextItems.sort((a, b) => {
        const deltaX = a.point.point.x - b.point.point.x
        if (Math.abs(deltaX) <= TICK_EPSILON) {
          return a.order - b.order
        }
        return deltaX
      })

      pointIdsRef.current = nextItems.map((item) => item.pointId)
      return nextItems.map((item) => item.point)
    })
  }

  const clampOffsetForZoom = React.useCallback(
    (nextOffset: IPoint, targetZoom: number): IPoint => {
      const denormalizeTargetZoom = 1 / targetZoom
      const xMin = 0
      const xMax = Math.max(0, width * denormalizeTargetZoom - width)

      const yPointA = -minNormalizedY * height * axisYScale * denormalizeTargetZoom
      const yPointB = -maxNormalizedY * height * axisYScale * denormalizeTargetZoom
      const yMin = Math.min(yPointA, yPointB)
      const yMax = Math.max(yPointA, yPointB)
      const offsetYMin = yMin
      const offsetYMax = yMax - height

      return {
        x: clamp(nextOffset.x, xMin, xMax),
        y: clamp(nextOffset.y, offsetYMin, offsetYMax),
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

  const handleAddPoint = (point: IBezierPoint, index) => {
    setPoints((prevPoints) => {
      const newPoints = [...prevPoints!]
      newPoints.splice(index, 0, clampBezierPoint(point))
      const nextIds = [...ensurePointIds(prevPoints!.length)]
      nextIds.splice(index, 0, createPointId())
      pointIdsRef.current = nextIds
      return newPoints
    })
  }

  const handleYTickScaleChange = (value: number) => {
    if (!props.onYTickScaleChange || typeof value !== 'number' || Number.isNaN(value)) return
    props.onYTickScaleChange(clamp(value, yTickScaleMin, normalizedMaxScale))
  }

  const commitYScaleInput = () => {
    const value = Number(yScaleInputText.trim() || 0)
    if (Number.isNaN(value)) {
      setYScaleInputText(yScaleDisplayValue)
      return
    }
    handleYTickScaleChange(value)
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
    setYScaleInputText(yScaleDisplayValue)
  }, [yScaleDisplayValue])

  const pointIds = points ? ensurePointIds(points.length) : []

  return (
    <BezierCurveContainer>
      <StyledSvgRoot
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`${offset.x} ${offset.y} ${width} ${height}`}
        width={width}
        height={height}
        ref={mergeRefs([forwardedRef, svgRef])}
        onDragStart={(e) => e.preventDefault()}>
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
          />
          <CurveAnimation points={points} algo={algo} ref={player} />
        </Grid>
      </StyledSvgRoot>
      {props.onYTickScaleChange && (
        <StyledYScaleInputOverlay>
          <StyledYScaleInputWrap>
            <StyledYScaleInput
              type="text"
              inputMode="decimal"
              value={yScaleInputText}
              onBlur={() => {
                commitYScaleInput()
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.currentTarget.blur()
                } else if (event.key === 'Escape') {
                  setYScaleInputText(yScaleDisplayValue)
                  event.currentTarget.blur()
                }
              }}
              onChange={(event) => {
                const nextText = event.target.value
                setYScaleInputText(nextText)
                if (nextText.trim() !== '') {
                  const value = Number(nextText)
                  if (!Number.isNaN(value)) {
                    handleYTickScaleChange(value)
                  }
                }
              }}
            />
          </StyledYScaleInputWrap>
        </StyledYScaleInputOverlay>
      )}
      <Flex gap="xs" style={{ position: 'absolute', bottom: 10, right: 10 }}>
        <ActionButtonGroup>
          <ActionButton
            onClick={() => {
              if (player.current) {
                player.current.play()
              }
            }}
            size="xs">
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
  )
}

export const BezierCurveEditor = React.forwardRef(_BezierCurveEditor)
