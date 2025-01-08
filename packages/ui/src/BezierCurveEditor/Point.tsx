import React, { useState, useEffect, forwardRef } from 'react'

import type { IPoint } from './types'

import { styled } from '../design-system'

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
      r: 10,
    },
    [`${StyledPoint}[data-point-type="point"]`]: {
      r: 6,
    },
  },
})

const StyledPointLabel = styled('text', {
  fill: '$orange11',
  fontSize: '10px',
})

interface PointProps extends React.SVGProps<SVGCircleElement> {
  point: IPoint
  main?: boolean
  onPointChange: (delta: IPoint) => void
  type?: 'pivot' | 'control'
}

export const Point = forwardRef<SVGCircleElement, PointProps>(function Point(props: PointProps, forwardedRef) {
  const { point, main, type = 'pivot', onPointChange, ...rest } = props
  const [startPos, setStartPos] = useState<IPoint>({
    x: 0,
    y: 0,
  })
  const [moving, setMoving] = useState(false)

  function handleMouseDown(event: React.MouseEvent<SVGCircleElement>) {
    event.stopPropagation()
    if (!moving) {
      setMoving(true)
      const { clientX, clientY } = event
      setStartPos({ x: clientX, y: clientY })
    }
  }

  useEffect(() => {
    const onViewMouseUp = (_event: MouseEvent) => {
      setMoving(false)
    }

    const onViewMouseMove = (event: MouseEvent) => {
      if (moving) {
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
      <StyledPointRoot onMouseDown={handleMouseDown}>
        <StyledPoint data-point-type="hitpoint" cx={point.x} cy={point.y} r="10" {...rest} ref={forwardedRef} />
        <StyledPoint data-point-type="ring" pointType={main ? 'main' : 'control'} cx={point.x} cy={point.y} r="5" />
        <StyledPoint
          data-point-type="point"
          pointType={main ? 'main' : 'control'}
          type={type}
          cx={point.x}
          cy={point.y}
          r="2"
        />
      </StyledPointRoot>
    </>
  )
})
