import React, { useEffect, useState } from 'react'

import type { IBezierPoint, IPoint } from './types'
import { generateCurve, generateLineByPoints } from './helper'

import { styled } from '../design-system'

const StyledPath = styled('path', {
  strokeWidth: 1,
  stroke: '$orange10',
  fill: 'none',
  variants: {
    hitline: {
      true: {
        strokeWidth: 5,
        stroke: 'transparent',
      },
    },
  },
})

const StyledExtensionPath = styled('path', {
  strokeWidth: 1,
  stroke: '$orange6',
  fill: 'none',
})

const StyledTempPoint = styled('circle', {
  fill: '$orange11',
  r: 3,
  transition: 'transform .1s ease',
  strokeWidth: 1,
  stroke: '$orange12',
})

interface BezierCurveProps {
  algo: 'linear' | 'bezier'
  points: IBezierPoint[]
  zoom: number
  getRoot: () => SVGSVGElement
  // onAddPoint only works when algo is "linear" because svg could not render higher order bezier curve accurately
  onAddPoint?: (point: IBezierPoint, index: number) => void
  extendMinX?: number
  extendMaxX?: number
}

export function BezierCurve(props: BezierCurveProps) {
  const { points, getRoot, zoom = 1, algo = 'bezier', extendMinX, extendMaxX } = props
  const actualAlgorithm = points.length === 2 ? algo : 'linear'
  const generatePath = actualAlgorithm === 'linear' ? generateLineByPoints : generateCurve
  const mainD = generatePath(points)
  const hitD = generatePath(points, 1, extendMinX, extendMaxX)
  const first = points[0].point
  const last = points[points.length - 1].point
  const extensionD = extendMinX !== undefined
    ? `M ${extendMinX} ${first.y} L ${first.x} ${first.y} M ${last.x} ${last.y} L ${extendMaxX} ${last.y}`
    : undefined
  const [hovered, setHovered] = useState(false)
  const pointerRef = React.useRef<DOMPoint>()
  const [matrixedPoint, setMatrixedPoint] = useState<IPoint | null>(null)

  useEffect(() => {
    // Clear temporary add-point preview position when zoom changes to avoid stale projection.
    setMatrixedPoint(null)
  }, [zoom])

  function getCursorPoint(event: React.MouseEvent<SVGPathElement>): { x: number; y: number } {
    if (!pointerRef.current) {
      pointerRef.current = getRoot().createSVGPoint()
    }
    pointerRef.current.x = event.clientX
    pointerRef.current.y = event.clientY
    const ctm = getRoot().getScreenCTM()
    if (!ctm) return { x: 0, y: 0 }
    return pointerRef.current.matrixTransform(ctm.inverse())
  }

  const handleMouseEnter = (e: React.MouseEvent<SVGPathElement>) => {
    setHovered(true)
    setMatrixedPoint(getCursorPoint(e))
  }

  const handleMouseMove = (e: React.MouseEvent<SVGPathElement>) => {
    setMatrixedPoint(getCursorPoint(e))
  }

  const handleAddPoint = () => {
    if (!matrixedPoint) return

    const bezierPoint = {
      point: {
        x: matrixedPoint.x,
        y: matrixedPoint.y,
      },
      controlPoint: {
        x: matrixedPoint.x + 20,
        y: matrixedPoint.y + 20,
      },
    }

    if (algo === 'linear') {
      bezierPoint.controlPoint = null
    }

    let nearestIndex = 0
    for (let i = 1; i < points.length; i++) {
      const currentDistance = Math.sqrt(
        Math.pow(points[i].point.x - bezierPoint.point.x, 2) + Math.pow(points[i].point.y - bezierPoint.point.y, 2)
      )
      const nearestDistance = Math.sqrt(
        Math.pow(points[nearestIndex].point.x - bezierPoint.point.x, 2) +
          Math.pow(points[nearestIndex].point.y - bezierPoint.point.y, 2)
      )
      if (currentDistance < nearestDistance) {
        nearestIndex = i
      }
    }

    if (props.onAddPoint) {
      props.onAddPoint(bezierPoint, nearestIndex)
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<SVGPathElement>) => {
    e.stopPropagation()
    setHovered(false)
    setMatrixedPoint(null)
  }

  return (
    <g className="bezier-path" onMouseLeave={handleMouseLeave}>
      {extensionD && <StyledExtensionPath d={extensionD} />}
      <StyledPath d={mainD} />
      <StyledPath
        hitline
        d={hitD}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
      />
      {actualAlgorithm === 'linear' && hovered && matrixedPoint && (
        <StyledTempPoint cx={matrixedPoint.x} cy={matrixedPoint.y} onClick={handleAddPoint} />
      )}
    </g>
  )
}
