import React, { useState, useEffect, forwardRef } from 'react'

import type { IPoint } from './types'

import { styled } from '../design-system'

export const POINT_HIT_RADIUS = 10
const POINT_RING_RADIUS = 5
const POINT_CENTER_RADIUS = 2
const POINT_HOVER_RING_RADIUS = 10
const POINT_HOVER_CENTER_RADIUS = 6

const StyledPoint = styled('circle', {
  fill: '$green9',
  cursor: 'pointer',
  transition: 'r 0.2s ease',
  variants: {
    pointType: {
      main: {
        fill: '$orange9',
        [`&[data-point-type="ring"]`]: {
          fill: '$orange4',
        },
      },
      control: {
        fill: '$green8',
        [`&[data-point-type="ring"]`]: {
          fill: '$green4',
        },
      },
      placeholder: {
        fill: '$amber9',
        [`&[data-point-type="ring"]`]: {
          fill: '$amber4',
        },
      },
    },
  },
  '&[data-point-type="hitpoint"]': {
    stroke: 'transparent',
    fill: 'transparent',
  },
  '&[data-point-type="ring"]': {
    fill: '$green4',
  },
  '&[data-point-type="point"]': {},
})

const StyledPointRoot = styled('g', {
  cursor: 'grab',
  touchAction: 'none',
  '&:hover': {
    [`${StyledPoint}[data-point-type="ring"]`]: {
      r: POINT_HOVER_RING_RADIUS,
    },
    [`${StyledPoint}[data-point-type="point"]`]: {
      r: POINT_HOVER_CENTER_RADIUS,
    },
  },
})

const StyledPointLabel = styled('text', {
  fill: '$gray12',
  fontSize: '10px',
  pointerEvents: 'none',
  userSelect: 'none',
})

const StyledPointLabelBg = styled('rect', {
  fill: '$gray2',
  stroke: '$gray7',
  strokeWidth: 1,
  rx: 3,
  ry: 3,
  pointerEvents: 'none',
})

interface PointProps extends React.SVGProps<SVGCircleElement> {
  point: IPoint
  main?: boolean
  onPointChange: (delta: IPoint) => void
  type?: 'pivot' | 'control'
  hoverLabel?: string
  pointClipPath?: string
}

export const Point = forwardRef<SVGCircleElement, PointProps>(function Point(props: PointProps, forwardedRef) {
  const { point, main, type = 'pivot', onPointChange, hoverLabel, pointClipPath, ...rest } = props
  const [startPos, setStartPos] = useState<IPoint>({
    x: 0,
    y: 0,
  })
  const [moving, setMoving] = useState(false)
  const [hovered, setHovered] = useState(false)

  function handleMouseDown(event: React.MouseEvent<SVGGElement>) {
    event.preventDefault()
    event.stopPropagation()
    window.getSelection()?.removeAllRanges()
    if (!moving) {
      setMoving(true)
      const { clientX, clientY } = event
      setStartPos({ x: clientX, y: clientY })
    }
  }

  useEffect(() => {
    const onViewMouseUp = () => {
      setMoving(false)
    }

    const onViewMouseMove = (event: MouseEvent) => {
      if (moving) {
        event.preventDefault()
        const { clientX, clientY } = event
        const deltaX = clientX - startPos.x
        const deltaY = clientY - startPos.y
        onPointChange({ x: deltaX, y: deltaY })
      }
    }

    if (moving) {
      window.addEventListener('mouseup', onViewMouseUp)
      window.addEventListener('mousemove', onViewMouseMove)
    } else {
      window.removeEventListener('mouseup', onViewMouseUp)
      window.removeEventListener('mousemove', onViewMouseMove)
    }

    return () => {
      window.removeEventListener('mouseup', onViewMouseUp)
      window.removeEventListener('mousemove', onViewMouseMove)
    }
  }, [moving])

  return (
    <>
      <StyledPointRoot onMouseDown={handleMouseDown} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {hoverLabel && (hovered || moving) && (
          <>
            <StyledPointLabelBg
              x={point.x - (hoverLabel.length * 6 + 8) / 2}
              y={point.y - 24}
              width={hoverLabel.length * 6 + 8}
              height={14}
            />
            <StyledPointLabel x={point.x} y={point.y - 14} textAnchor="middle">
              {hoverLabel}
            </StyledPointLabel>
          </>
        )}
        <g style={pointClipPath ? { clipPath: pointClipPath } : undefined}>
          <StyledPoint data-point-type="hitpoint" cx={point.x} cy={point.y} r={POINT_HIT_RADIUS} {...rest} ref={forwardedRef} />
          <StyledPoint
            data-point-type="ring"
            pointType={main ? 'main' : 'control'}
            cx={point.x}
            cy={point.y}
            r={POINT_RING_RADIUS}
          />
          <StyledPoint
            data-point-type="point"
            pointType={main ? 'main' : 'control'}
            type={type}
            cx={point.x}
            cy={point.y}
            r={POINT_CENTER_RADIUS}
          />
        </g>
      </StyledPointRoot>
    </>
  )
})
