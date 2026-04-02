import React from 'react'
import type { IPoint, IBezierPoint } from './types'
import { Point } from './Point'

import { styled } from '../design-system'

const StyledControlLine = styled('line', {
  stroke: '$gray5',
})

export interface BezierPointProps {
  pointId: string
  bezierPoint: IBezierPoint
  pointHoverLabel?: string
  pointClipPath?: string
  doublePoint?: boolean
  algo: 'linear' | 'bezier'
  getRoot: () => SVGSVGElement
  onPointChange: (pointId: string, point: IBezierPoint) => void
  onHoverChange?: (pointId: string, hovered: boolean) => void
}

export function BezierPoint(props: BezierPointProps) {
  const {
    pointId,
    bezierPoint,
    onPointChange,
    onHoverChange,
    algo,
    doublePoint = false,
    pointHoverLabel,
    pointClipPath,
    getRoot,
  } = props
  const { point, controlPoint } = bezierPoint
  const pointClipStyle = pointClipPath ? { clipPath: pointClipPath } : undefined

  const subControlPoint =
    algo === 'bezier'
      ? {
          x: 2 * point.x - controlPoint.x,
          y: 2 * point.y - controlPoint.y,
        }
      : null

  const handlePointChange = (svgPos: IPoint) => {
    const dx = svgPos.x - point.x
    const dy = svgPos.y - point.y
    onPointChange(pointId, {
      point: svgPos,
      controlPoint: algo === 'bezier' ? { x: controlPoint.x + dx, y: controlPoint.y + dy } : null,
    })
  }

  const handleControlPointChange = (svgPos: IPoint) => {
    onPointChange(pointId, { point, controlPoint: svgPos })
  }

  const handleSubControlPointChange = (svgPos: IPoint) => {
    // sub control point is mirrored: subCP = 2*point - CP, so CP = 2*point - subCP
    onPointChange(pointId, {
      point,
      controlPoint: { x: 2 * point.x - svgPos.x, y: 2 * point.y - svgPos.y },
    })
  }

  return (
    <>
      {algo === 'bezier' && (
        <>
          <StyledControlLine
            strokeWidth={1}
            x1={point.x}
            y1={point.y}
            x2={controlPoint.x}
            y2={controlPoint.y}
            style={pointClipStyle}
          />
          {doublePoint && (
            <StyledControlLine
              strokeWidth={1}
              x1={point.x}
              y1={point.y}
              x2={subControlPoint.x}
              y2={subControlPoint.y}
              style={pointClipStyle}
            />
          )}
        </>
      )}
      <Point
        type="pivot"
        main
        point={point}
        getRoot={getRoot}
        onPointChange={handlePointChange}
        onHoverChange={(h) => onHoverChange?.(pointId, h)}
        hoverLabel={pointHoverLabel}
        pointClipPath={pointClipPath}
      />
      {algo === 'bezier' && (
        <>
          <Point
            type="control"
            point={controlPoint}
            getRoot={getRoot}
            onPointChange={handleControlPointChange}
            pointClipPath={pointClipPath}
          />
          {doublePoint && (
            <Point
              type="control"
              point={subControlPoint}
              getRoot={getRoot}
              onPointChange={handleSubControlPointChange}
              pointClipPath={pointClipPath}
            />
          )}
        </>
      )}
    </>
  )
}
