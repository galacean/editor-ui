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
  onPointChange: (pointId: string, point: IBezierPoint) => void
}

export function BezierPoint(props: BezierPointProps) {
  const { pointId, bezierPoint, onPointChange, algo, doublePoint = false, pointHoverLabel, pointClipPath } = props
  const { point, controlPoint } = bezierPoint
  const pointClipStyle = pointClipPath ? { clipPath: pointClipPath } : undefined

  const subControlPoint =
    algo === 'bezier'
      ? {
          x: 2 * point.x - controlPoint.x,
          y: 2 * point.y - controlPoint.y,
        }
      : null

  const handlePointChange = (delta: IPoint) => {
    const newPoint = {
      x: point.x + delta.x,
      y: point.y + delta.y,
    }
    onPointChange(pointId, {
      point: newPoint,
      controlPoint:
        algo === 'bezier'
          ? {
              x: controlPoint.x + delta.x,
              y: controlPoint.y + delta.y,
            }
          : null,
    })
  }

  const handleControlPointChange = (delta: IPoint) => {
    const newControlPoint = {
      x: controlPoint.x + delta.x,
      y: controlPoint.y + delta.y,
    }
    onPointChange(pointId, {
      point,
      controlPoint: newControlPoint,
    })
  }

  const handleSubControlPointChange = (delta: IPoint) => {
    handleControlPointChange({
      x: -delta.x,
      y: -delta.y,
    })
  }

  return (
    <>
      {algo === 'bezier' && (
        <>
          <StyledControlLine strokeWidth={1} x1={point.x} y1={point.y} x2={controlPoint.x} y2={controlPoint.y} style={pointClipStyle} />
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
        onPointChange={handlePointChange}
        hoverLabel={pointHoverLabel}
        pointClipPath={pointClipPath}
      />
      {algo === 'bezier' && (
        <>
          <Point type="control" point={controlPoint} onPointChange={handleControlPointChange} pointClipPath={pointClipPath} />
          {doublePoint && (
            <Point type="control" point={subControlPoint} onPointChange={handleSubControlPointChange} pointClipPath={pointClipPath} />
          )}
        </>
      )}
    </>
  )
}
