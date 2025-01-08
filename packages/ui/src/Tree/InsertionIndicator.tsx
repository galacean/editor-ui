import React from 'react'
import { styled } from '../design-system'
import { useDrop } from '../hooks/useDrop'

const IndicatorRoot = styled('div', {
  display: 'flex',
  position: 'absolute',
  width: 'calc(100% - $sizes$8)',
  height: '$1',
  alignItems: 'center',
  marginLeft: '$3',
  marginTop: '-$0_5',
  outline: 'none',
  flexDirection: 'row-reverse',
})

const StyledIndicator = styled('div', {
  position: 'relative',
  height: 1,
  outline: 'none',
  pointerEvents: 'none',
  flexDirection: 'row-reverse',
  // backgroundColor: "#fff",
  [`&[data-drop-target="true"]`]: {
    backgroundColor: '#fff',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: -4,
      left: -8,
      width: 6,
      height: 6,
      borderRadius: '$round',
      border: '1px solid white',
      zIndex: 1,
    },
  },
})

export type TreeItemAcceptDropType<T> = {
  type: string
  value: T
}

export interface InsertionIndicatorProps {
  item: string
  position: 'before' | 'after'
  dropLayer?: any
  level?: number
  onDrop: (e, dragItem, position) => void
  onEnter: (e, dragItem) => void
}

export function InsertionIndicator(props: InsertionIndicatorProps) {
  const { item, position, dropLayer, level, onDrop } = props
  const [isTarget, setIsTarget] = React.useState(false)

  const dropRef = useDrop<HTMLDivElement, TreeItemAcceptDropType<string[]>>({
    accept: dropLayer ?? 0,
    onEnter(e, dragItem) {
      if (!dragItem) return
      setIsTarget(true)
    },
    onLeave() {
      setIsTarget(false)
    },
    onDrop: (e, dragItem) => {
      setIsTarget(false)
      onDrop(e, dragItem, position)
    },
  })

  const style = {
    width: `calc(100% - ${level * 12}px)`,
  }

  return (
    <IndicatorRoot
      ref={dropRef}
      role="option"
      aria-selected="false"
      data-key={`${item}-${position}`}
      aria-level={level}>
      <StyledIndicator style={style} data-drop-target={isTarget} />
    </IndicatorRoot>
  )
}
