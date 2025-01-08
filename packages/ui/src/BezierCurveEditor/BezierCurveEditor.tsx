import React, { useMemo, useState, useEffect } from 'react'
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

import { styled } from '../design-system'
import { clamp, mergeRefs } from '../utils'
import { ActionButton, ActionButtonGroup } from '../ActionButton'
import { IconPlayerPlayFilled, IconZoomInFilled, IconZoomOutFilled, IconZoomReset } from '@tabler/icons-react'
import { Flex } from '../Flex'
import { CurveAnimation, CurveAnimationRef } from './CurveAnimation'

const StyledSvgRoot = styled('svg', {
  overflow: 'unset',
  fontSize: 0,
  border: '1px solid $orange7',
  backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, $orangeA2 100%)',
  '& g': {
    fontSize: 0,
  },
})

const BezierCurveContainer = styled('div', {
  position: 'relative',
  marginLeft: '$7',
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
    draggable = true,
    zoomable = true,
    zoomLimit = [0.5, 2],
    zoomSpeed = 0.03,
  } = props

  const svgRef = React.useRef<SVGSVGElement>(null)
  const axisXScale = 1
  // the graduated scale of Y axis is 0.4, case 1 cell indicate 25% of the height
  const axisYScale = 0.4
  // We set default zoom to 1.1 because the default viewport position could not display the full range 0 ~ 1
  const defaultZoom = 1.1
  // We set default viewport offset with the half of the height and 0 for x
  const defaultOffset = getDefaultOffset(props.width, props.height)

  const player = React.useRef<CurveAnimationRef>(null)
  const pointerRef = React.useRef<DOMPoint>(null)
  const [offset, setOffset] = useState<IPoint>(defaultOffset)
  const [startPoint, setStartPoint] = useState<IPoint>(null)
  const [isMoving, setIsMoving] = useState(false)
  const [zoom, setZoom] = useState(defaultZoom)
  const normalizeZoom = zoom
  const denormalizeZoom = 1 / zoom

  const [points, setPoints] = useControllableState<IBezierPoint[]>({
    prop: propPoints
      ? convertPointsToBezierPoints(
          denormalizePoint(propPoints, width * axisXScale, height * axisYScale, denormalizeZoom),
          algo
        )
      : undefined,
    defaultProp: convertPointsToBezierPoints(
      denormalizePoint(propDefaultPoints || defaultPoints, width * axisXScale, height * axisYScale, denormalizeZoom),
      algo
    ),
    onChange: (bezierPoints: IBezierPoint[]) => {
      const ret = normalizePoint(
        convertBezierPointToPoint(bezierPoints, algo),
        width * axisXScale,
        height * axisYScale,
        normalizeZoom
      )
      if (props.onPointsChange) {
        props.onPointsChange(ret)
      }
    },
  })

  const handlePointChange = (index: number, bezierPoint: IBezierPoint) => {
    const newPoints = JSON.parse(JSON.stringify(points))
    newPoints[index] = bezierPoint
    setPoints(newPoints)
  }

  const handleMouseDown = (e: React.MouseEvent<SVGElement>) => {
    setStartPoint({
      x: e.clientX,
      y: e.clientY,
    })
    setIsMoving(true)
  }

  const handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
    if (!startPoint) return

    const movedX = e.clientX - startPoint.x
    const movedY = e.clientY - startPoint.y

    setOffset({ x: offset.x - movedX, y: offset.y - movedY })
  }

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault()
    let newZoom = e.deltaY > 0 ? zoom - zoomSpeed : zoom + zoomSpeed
    newZoom = clamp(newZoom, zoomLimit[0], zoomLimit[1])
    setZoom(newZoom)
  }

  const handleAddPoint = (point: IBezierPoint, index) => {
    setPoints((prevPoints) => {
      const newPoints = [...prevPoints!]
      newPoints.splice(index, 0, point)
      return newPoints
    })
  }

  useEffect(() => {
    pointerRef.current = svgRef.current.createSVGPoint()
  }, [])

  useEffect(() => {
    const onViewMouseUp = () => {
      setIsMoving(false)
    }

    const onViewMouseMove = (event) => {
      if (isMoving && handleMouseMove) {
        handleMouseMove(event)
      }
    }
    if (draggable) {
      if (isMoving) {
        window.addEventListener('mousemove', onViewMouseMove)
        window.addEventListener('mouseup', onViewMouseUp)
      } else {
        window.removeEventListener('mousemove', onViewMouseMove)
        window.removeEventListener('mouseup', onViewMouseUp)
      }
    }
    return () => {
      if (draggable) {
        window.removeEventListener('mousemove', onViewMouseMove)
        window.removeEventListener('mouseup', onViewMouseUp)
      }
    }
  }, [isMoving, draggable])

  useEffect(() => {
    if (svgRef.current) {
      if (zoomable) {
        svgRef.current.addEventListener('wheel', handleWheel)
      } else {
        svgRef.current.removeEventListener('wheel', handleWheel)
      }
    }
    return () => {
      if (svgRef.current && zoomable) {
        svgRef.current.removeEventListener('wheel', handleWheel)
      }
    }
  }, [zoom])

  return (
    <BezierCurveContainer>
      <StyledSvgRoot
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`${offset.x} ${offset.y} ${width} ${height}`}
        width={width}
        height={height}
        ref={mergeRefs([forwardedRef, svgRef])}
        onMouseDown={draggable ? handleMouseDown : undefined}>
        <Grid size={{ width, height }} offset={offset} axisLabel={props.axisLabel} zoom={zoom}>
          <BezierCurve
            algo={algo}
            points={points!}
            zoom={zoom}
            getRoot={() => svgRef.current}
            onAddPoint={handleAddPoint}
          />
          <g className="bezier-curve-points">
            {points.map((bezierPoint, index) => (
              <BezierPoint
                index={index}
                key={index}
                bezierPoint={bezierPoint}
                onPointChange={handlePointChange}
                doublePoint={doubleControlPoint}
                algo={algo}
                zoom={zoom}
              />
            ))}
          </g>
          <CurveAnimation points={points} ref={player} />
        </Grid>
      </StyledSvgRoot>
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
          <ActionButton size="xs" onClick={() => setZoom(zoom - 0.05)} disabled={zoom === zoomLimit[0]}>
            <IconZoomInFilled />
          </ActionButton>
          <ActionButton size="xs" onClick={() => setZoom(zoom + 0.05)} disabled={zoom === zoomLimit[1]}>
            <IconZoomOutFilled />
          </ActionButton>
          <ActionButton size="xs" onClick={() => setZoom(1)} disabled={zoom === 1}>
            <IconZoomReset />
          </ActionButton>
        </ActionButtonGroup>
      </Flex>
    </BezierCurveContainer>
  )
}

export const BezierCurveEditor = React.forwardRef(_BezierCurveEditor)
